import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);
const proxyBase = argValue("--proxy-base") || process.env.OPS_STAGING_PROXY || "http://127.0.0.1:4182";
const outputRoot = path.resolve(root, argValue("--output-root") || `reference/extractions/GraphX-OPS-staging-extraction-${today}`);
const limit = Number(argValue("--limit") || "0");
const includeAliases = !process.argv.includes("--menu-only");
const routeAliases = readRouteAliases();

const pageContentDir = path.join(outputRoot, "page-content-html");
const breadcrumbsDir = path.join(outputRoot, "breadcrumbs-html");
const indexesDir = path.join(outputRoot, "indexes");
fs.mkdirSync(pageContentDir, { recursive: true });
fs.mkdirSync(breadcrumbsDir, { recursive: true });
fs.mkdirSync(indexesDir, { recursive: true });

const startedAt = new Date().toISOString();
const seeds = await discoverSeeds();
const targets = limit > 0 ? seeds.slice(0, limit) : seeds;
const manifest = [];

for (let index = 0; index < targets.length; index += 1) {
  const target = targets[index];
  const number = String(index + 1).padStart(3, "0");
  const filename = `${number}-${target.slug}.html`;
  try {
    const response = await fetch(target.url, {
      redirect: "follow",
      headers: { "User-Agent": "OPS-Simulator-Staging-Extractor/1.0" }
    });
    const html = await response.text();
    const pageContent = sanitizeHtml(extractPageContent(html));
    const breadcrumbs = sanitizeHtml(extractDivById(html, "breadcrumbs"));
    const title = titleFromHtml(pageContent || html, target.slug);
    const loginRedirect = /<input[^>]+name=["'](?:username|password)["']/i.test(html) || /Admin\s*Login/i.test(title);

    fs.writeFileSync(path.join(pageContentDir, filename), `${pageContent}\n`);
    fs.writeFileSync(path.join(breadcrumbsDir, filename), `${breadcrumbs}\n`);

    manifest.push({
      index: index + 1,
      status: loginRedirect ? "login-or-denied" : "ok",
      httpStatus: response.status,
      slug: target.slug,
      route: routeAliases[target.slug] || fallbackRoute(target.slug),
      title,
      url: target.url,
      source: target.source,
      file: filename,
      pageContentBytes: pageContent.length,
      breadcrumbsBytes: breadcrumbs.length
    });
    console.log(`${number} ${response.status} ${target.slug} ${title}`);
  } catch (error) {
    manifest.push({
      index: index + 1,
      status: "error",
      slug: target.slug,
      route: routeAliases[target.slug] || fallbackRoute(target.slug),
      url: target.url,
      source: target.source,
      error: error.message
    });
    console.warn(`${number} ERR ${target.slug} ${error.message}`);
  }
  await sleep(150);
}

const completedAt = new Date().toISOString();
const captureManifest = {
  startedAt,
  completedAt,
  proxyBase,
  outputRoot,
  discovered: seeds.length,
  captured: manifest.length,
  ok: manifest.filter(item => item.status === "ok").length,
  loginOrDenied: manifest.filter(item => item.status === "login-or-denied").length,
  errors: manifest.filter(item => item.status === "error").length,
  includeAliases,
  pages: manifest
};

fs.writeFileSync(path.join(outputRoot, "capture_manifest.json"), `${JSON.stringify(captureManifest, null, 2)}\n`);
fs.writeFileSync(path.join(indexesDir, "pages.csv"), toCsv(manifest), "utf8");
console.log(`Captured ${captureManifest.ok}/${manifest.length} pages into ${outputRoot}`);
console.log(`Rebuild command: OPS_EXTRACTION_ROOT=${path.relative(root, outputRoot)} node scripts/build-extracted-pages.mjs`);

async function discoverSeeds() {
  const discovered = new Map();
  const welcome = await fetchText(`${proxyBase}/admin/welcome.php`);
  for (const href of extractAdminPhpHrefs(welcome)) addTarget(discovered, href, "staging-menu");

  if (includeAliases) {
    for (const slug of Object.keys(routeAliases)) {
      addTarget(discovered, `${proxyBase}/admin/${slug}.php`, "route-alias");
    }
  }

  addTarget(discovered, `${proxyBase}/admin/quote_action.php`, "staging-extra");
  return [...discovered.values()].sort((a, b) => a.slug.localeCompare(b.slug));
}

function addTarget(map, href, source) {
  const url = normalizeAdminUrl(href);
  if (!url) return;
  const slug = slugFromUrl(url);
  if (!slug || shouldSkipSlug(slug, url)) return;
  if (!map.has(slug)) map.set(slug, { slug, url, source });
  else if (map.get(slug).source !== "staging-menu" && source === "staging-menu") map.set(slug, { slug, url, source });
}

function normalizeAdminUrl(href) {
  if (!href || href === "#" || href.startsWith("javascript:")) return "";
  try {
    const url = new URL(href, `${proxyBase}/admin/`);
    if (url.pathname.includes("..") || !url.pathname.startsWith("/admin/") || !url.pathname.endsWith(".php")) return "";
    url.search = "";
    url.hash = "";
    return `${proxyBase}${url.pathname}`;
  } catch {
    return "";
  }
}

function shouldSkipSlug(slug, url) {
  if (url.includes("Action=Logout")) return true;
  return [
    "admin_pin_unpin_link",
    "autocomplete_search",
    "clear_cache",
    "cron",
    "livechat",
    "logout",
    "quick_search",
    "upload_endpoint"
  ].some(blocked => slug.includes(blocked));
}

function extractAdminPhpHrefs(html) {
  const hrefs = [];
  for (const match of html.matchAll(/\bhref=(["'])(.*?)\1/gi)) hrefs.push(match[2]);
  return hrefs;
}

function slugFromUrl(url) {
  return path.basename(new URL(url).pathname, ".php");
}

function fallbackRoute(slug) {
  return slug.replace(/_/g, "-").toLowerCase();
}

function readRouteAliases() {
  const script = fs.readFileSync(path.join(root, "scripts/build-extracted-pages.mjs"), "utf8");
  const block = script.match(/const routeAliases = \{([\s\S]*?)\n\};/);
  if (!block) return {};
  const aliases = {};
  for (const match of block[1].matchAll(/^\s*([a-zA-Z0-9_]+):\s*"([^"]+)"/gm)) aliases[match[1]] = match[2];
  return aliases;
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow" });
  return response.text();
}

function extractPageContent(html) {
  const marker = html.search(/<div[^>]*class=["'][^"']*\bpage-content\b[^"']*["'][^>]*>/i);
  if (marker === -1) return extractDivByIdInner(html, "page-wrapper") || extractStandaloneBody(html);
  const openEnd = html.indexOf(">", marker);
  if (openEnd === -1) return "";

  let depth = 1;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = openEnd + 1;
  let match;
  while ((match = tagRe.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag) && !/\/>$/.test(tag)) depth += 1;
    if (/^<\/div/i.test(tag)) depth -= 1;
    if (depth === 0) return html.slice(openEnd + 1, match.index).trim();
  }
  return html.slice(openEnd + 1).trim();
}

function extractDivById(html, id) {
  const marker = html.search(new RegExp(`<div[^>]*id=["']${id}["'][^>]*>`, "i"));
  if (marker === -1) return "";
  let depth = 0;
  const tagRe = /<\/?div\b[^>]*>/gi;
  tagRe.lastIndex = marker;
  let match;
  while ((match = tagRe.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag) && !/\/>$/.test(tag)) depth += 1;
    if (/^<\/div/i.test(tag)) depth -= 1;
    if (depth === 0) return html.slice(marker, tagRe.lastIndex).trim();
  }
  return html.slice(marker).trim();
}

function extractDivByIdInner(html, id) {
  const outer = extractDivById(html, id);
  if (!outer) return "";
  const openEnd = outer.indexOf(">");
  const closeStart = outer.lastIndexOf("</div>");
  if (openEnd === -1 || closeStart === -1 || closeStart <= openEnd) return "";
  return outer.slice(openEnd + 1, closeStart).trim();
}

function extractStandaloneBody(html) {
  return html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]?.trim() || "";
}

function sanitizeHtml(html) {
  return String(html || "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)="[^"]*"/gi, "")
    .replace(/\s(?:onclick|onchange|onsubmit|onload|onmouseover|onmouseout|onblur|onfocus)='[^']*'/gi, "")
    .replace(/\sdata-cf-modified-[^=]+="[^"]*"/gi, "")
    .replace(/(<meta[^>]+name=["']csrf-token["'][^>]+content=["'])[^"']+(["'][^>]*>)/gi, "$1[redacted]$2")
    .replace(/(<input[^>]+name=["'](?:ops_csrf_token|csrf_token|csrf)["'][^>]+value=["'])[^"']+(["'][^>]*>)/gi, "$1[redacted]$2")
    .replace(/\bhttps:\/\/staging\.visualgraphx\.com\b/g, proxyBase)
    .replace(/\bhttps:\/\/visualgraphx\.com\b/g, proxyBase)
    .trim();
}

function titleFromHtml(html, slug) {
  const h1 = html.match(/<h1[^>]*>\s*([\s\S]*?)\s*<\/h1>/i)?.[1];
  const title = h1 || html.match(/<title[^>]*>\s*(?:Admin\s*::\s*)?([\s\S]*?)\s*<\/title>/i)?.[1];
  return (title || slug.replace(/[-_]/g, " "))
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toCsv(rows) {
  const columns = ["index", "status", "httpStatus", "slug", "route", "title", "source", "file", "pageContentBytes", "breadcrumbsBytes", "url", "error"];
  return `${columns.join(",")}\n${rows.map(row => columns.map(column => csvCell(row[column])).join(",")).join("\n")}\n`;
}

function csvCell(value) {
  const string = value == null ? "" : String(value);
  return /[",\n]/.test(string) ? `"${string.replace(/"/g, '""')}"` : string;
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? "" : process.argv[index + 1] || "";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
