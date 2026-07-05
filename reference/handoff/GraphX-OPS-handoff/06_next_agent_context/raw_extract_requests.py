#!/usr/bin/env python3
"""
Raw OPS admin extraction from the authenticated Chrome cookie jar.

This intentionally does not sanitize HTML values, inline scripts, form fields,
or asset contents. Keep the output local unless the owner explicitly approves
publishing a redacted derivative.
"""

from __future__ import annotations

import hashlib
import json
import mimetypes
import os
import re
import sys
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

import browser_cookie3
import requests


ROOT = Path("/Users/cderamos/GraphX_Platform")
SOURCE_CAPTURE = ROOT / "outputs/ops-admin-deconstruction-2026-07-03/crawl-results.json"
OUT_ROOT = ROOT / "outputs/GraphX-OPS-raw-extraction-2026-07-03"
RAW_HTML_DIR = OUT_ROOT / "raw-source-html"
RAW_ASSET_DIR = OUT_ROOT / "raw-assets"
META_DIR = OUT_ROOT / "page-metadata"


class AssetParser(HTMLParser):
    def __init__(self, base_url: str):
        super().__init__()
        self.base_url = base_url
        self.assets: list[dict[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr = {k.lower(): v for k, v in attrs if v is not None}
        tag = tag.lower()
        if tag == "script" and attr.get("src"):
            self.assets.append({"tag": tag, "attr": "src", "url": urljoin(self.base_url, attr["src"])})
        elif tag == "link" and attr.get("href"):
            rel = attr.get("rel", "")
            if "stylesheet" in rel.lower() or attr["href"].lower().endswith((".css", ".php")):
                self.assets.append({"tag": tag, "attr": "href", "url": urljoin(self.base_url, attr["href"])})
        elif tag == "img" and attr.get("src"):
            self.assets.append({"tag": tag, "attr": "src", "url": urljoin(self.base_url, attr["src"])})


def load_routes() -> list[dict]:
    capture = json.loads(SOURCE_CAPTURE.read_text())
    return [
        {
            "index": item["index"],
            "slug": item["slug"],
            "href": item["href"],
            "priorFinalUrl": item.get("finalUrl"),
            "text": item.get("text", ""),
        }
        for item in capture["results"]
    ]


def safe_asset_name(url: str, content_type: str = "") -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/") or "index"
    base = re.sub(r"[^A-Za-z0-9._/-]+", "_", f"{parsed.netloc}/{path}")
    if parsed.query:
        base = f"{base}__q_{hashlib.sha1(parsed.query.encode()).hexdigest()[:12]}"
    suffix = Path(path).suffix
    if not suffix:
        guessed = mimetypes.guess_extension(content_type.split(";")[0].strip()) if content_type else None
        if guessed:
            base = f"{base}{guessed}"
    return base


def write_bytes(path: Path, data: bytes) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)


def extract_assets(html: str, base_url: str) -> list[dict[str, str]]:
    parser = AssetParser(base_url)
    parser.feed(html)
    seen: set[str] = set()
    assets = []
    for asset in parser.assets:
        if asset["url"] in seen:
            continue
        seen.add(asset["url"])
        assets.append(asset)
    return assets


def build_session() -> requests.Session:
    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0 Safari/537.36"
            ),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }
    )
    session.cookies.update(browser_cookie3.chrome(domain_name="visualgraphx.com"))
    return session


def main() -> int:
    RAW_HTML_DIR.mkdir(parents=True, exist_ok=True)
    RAW_ASSET_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    routes = load_routes()
    session = build_session()
    manifest = {
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "source": "requests with authenticated Google Chrome cookies for visualgraphx.com",
        "sanitization": "none",
        "warning": "Local raw capture may contain authenticated admin structure, tokens, and internal URLs. Do not publish directly.",
        "outputRoot": str(OUT_ROOT),
        "total": len(routes),
        "ok": 0,
        "failed": 0,
        "assetsOk": 0,
        "assetsFailed": 0,
        "results": [],
        "assets": [],
    }

    asset_seen: set[str] = set()

    for route in routes:
        started = time.time()
        print(f"[raw-html] {route['index']:03d}/{len(routes):03d} {route['slug']} {route['href']}", flush=True)
        try:
            response = session.get(route["href"], allow_redirects=True, timeout=30)
            response.raise_for_status()
            html = response.text
            html_path = RAW_HTML_DIR / f"{route['slug']}.html"
            html_path.write_text(html, encoding=response.encoding or "utf-8")
            assets = extract_assets(html, response.url)
            meta = {
                **route,
                "status": "ok",
                "finalUrl": response.url,
                "httpStatus": response.status_code,
                "contentType": response.headers.get("content-type", ""),
                "encoding": response.encoding,
                "bytes": len(response.content),
                "htmlFile": str(html_path.relative_to(OUT_ROOT)),
                "assetCount": len(assets),
                "assetUrls": [asset["url"] for asset in assets],
                "elapsedMs": round((time.time() - started) * 1000),
            }
            (META_DIR / f"{route['slug']}.json").write_text(json.dumps(meta, indent=2), encoding="utf-8")
            manifest["ok"] += 1
            manifest["results"].append(meta)

            for asset in assets:
                url = asset["url"]
                if url in asset_seen:
                    continue
                asset_seen.add(url)
                parsed = urlparse(url)
                if parsed.scheme not in ("http", "https"):
                    continue
                try:
                    asset_response = session.get(url, allow_redirects=True, timeout=30)
                    asset_response.raise_for_status()
                    rel = safe_asset_name(url, asset_response.headers.get("content-type", ""))
                    asset_path = RAW_ASSET_DIR / rel
                    write_bytes(asset_path, asset_response.content)
                    manifest["assetsOk"] += 1
                    manifest["assets"].append(
                        {
                            **asset,
                            "status": "ok",
                            "finalUrl": asset_response.url,
                            "httpStatus": asset_response.status_code,
                            "contentType": asset_response.headers.get("content-type", ""),
                            "bytes": len(asset_response.content),
                            "file": str(asset_path.relative_to(OUT_ROOT)),
                        }
                    )
                except Exception as error:
                    manifest["assetsFailed"] += 1
                    manifest["assets"].append({**asset, "status": "failed", "error": repr(error)})
        except Exception as error:
            manifest["failed"] += 1
            manifest["results"].append(
                {
                    **route,
                    "status": "failed",
                    "error": repr(error),
                    "elapsedMs": round((time.time() - started) * 1000),
                }
            )

        (OUT_ROOT / "raw-crawl-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    (OUT_ROOT / "raw-crawl-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(
        f"Raw extraction complete: {manifest['ok']} ok, {manifest['failed']} failed, "
        f"{manifest['assetsOk']} assets ok, {manifest['assetsFailed']} assets failed",
        flush=True,
    )
    return 0 if manifest["failed"] == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
