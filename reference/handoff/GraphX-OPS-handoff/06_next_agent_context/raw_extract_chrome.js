const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const sourceCapture = "/Users/cderamos/GraphX_Platform/outputs/ops-admin-deconstruction-2026-07-03/crawl-results.json";
const outRoot = "/Users/cderamos/GraphX_Platform/outputs/GraphX-OPS-raw-extraction-2026-07-03";
const renderedDir = path.join(outRoot, "raw-rendered-html");
const metaDir = path.join(outRoot, "page-metadata");

fs.mkdirSync(renderedDir, { recursive: true });
fs.mkdirSync(metaDir, { recursive: true });

function osa(script) {
  return execFileSync("osascript", ["-e", script], {
    encoding: "utf8",
    maxBuffer: 80 * 1024 * 1024
  }).replace(/\r/g, "");
}

function jsInChrome(js) {
  const escaped = js.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return osa(`tell application "Google Chrome" to execute javascript "${escaped}" in active tab of front window`);
}

function navigate(url) {
  const escaped = url.replace(/"/g, '\\"');
  osa(`tell application "Google Chrome" to set URL of active tab of front window to "${escaped}"`);
}

function waitForLoad(timeoutMs = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const state = jsInChrome("document.readyState");
    if (state.trim() === "complete") return true;
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
  }
  return false;
}

function collectPage() {
  const payload = jsInChrome(`JSON.stringify({
    url: location.href,
    title: document.title,
    readyState: document.readyState,
    html: "<!doctype html>\\n" + document.documentElement.outerHTML,
    assets: {
      stylesheets: Array.from(document.querySelectorAll('link[rel~="stylesheet"], link[href]')).map(el => ({href: el.href, rel: el.rel, media: el.media || ""})),
      scripts: Array.from(document.scripts).map(el => ({src: el.src || "", inlineLength: el.src ? 0 : (el.textContent || "").length, type: el.type || ""})),
      images: Array.from(document.images).map(el => ({src: el.currentSrc || el.src || "", alt: el.alt || "", width: el.naturalWidth || el.width || 0, height: el.naturalHeight || el.height || 0})),
      iframes: Array.from(document.querySelectorAll('iframe')).map(el => ({src: el.src || "", title: el.title || ""}))
    },
    shell: {
      navbarCount: document.querySelectorAll('#navbar, .navbar').length,
      sidebarCount: document.querySelectorAll('#sidebar, .sidebar').length,
      bodyClasses: document.body ? document.body.className : "",
      htmlClasses: document.documentElement.className
    }
  })`);
  return JSON.parse(payload);
}

const crawl = JSON.parse(fs.readFileSync(sourceCapture, "utf8"));
const routes = crawl.results.map(r => ({
  index: r.index,
  slug: r.slug,
  href: r.href,
  priorFinalUrl: r.finalUrl,
  text: r.text
}));

const manifest = {
  capturedAt: new Date().toISOString(),
  source: "Google Chrome active authenticated session via AppleScript",
  sanitization: "none",
  outputRoot: outRoot,
  total: routes.length,
  ok: 0,
  failed: 0,
  results: []
};

for (const route of routes) {
  const started = Date.now();
  try {
    console.log(`[raw] ${route.index}/${routes.length} ${route.slug} ${route.href}`);
    navigate(route.href);
    waitForLoad();
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 900);
    const page = collectPage();
    const htmlPath = path.join(renderedDir, `${route.slug}.html`);
    const metaPath = path.join(metaDir, `${route.slug}.json`);
    fs.writeFileSync(htmlPath, page.html, "utf8");
    fs.writeFileSync(metaPath, JSON.stringify({
      ...route,
      finalUrl: page.url,
      title: page.title,
      readyState: page.readyState,
      shell: page.shell,
      assets: page.assets,
      htmlFile: path.relative(outRoot, htmlPath)
    }, null, 2));
    manifest.ok += 1;
    manifest.results.push({
      ...route,
      status: "ok",
      finalUrl: page.url,
      title: page.title,
      bytes: Buffer.byteLength(page.html),
      elapsedMs: Date.now() - started,
      htmlFile: path.relative(outRoot, htmlPath),
      metaFile: path.relative(outRoot, metaPath)
    });
  } catch (error) {
    manifest.failed += 1;
    manifest.results.push({
      ...route,
      status: "failed",
      error: String(error && error.stack || error),
      elapsedMs: Date.now() - started
    });
  }
  fs.writeFileSync(path.join(outRoot, "raw-crawl-manifest.json"), JSON.stringify(manifest, null, 2));
}

fs.writeFileSync(path.join(outRoot, "raw-crawl-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`Raw extraction complete: ${manifest.ok} ok, ${manifest.failed} failed`);
