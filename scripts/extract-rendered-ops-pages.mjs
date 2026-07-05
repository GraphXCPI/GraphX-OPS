import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const sourceCapture = "/Users/cderamos/GraphX_Platform/outputs/ops-admin-deconstruction-2026-07-03/crawl-results.json";
const outRoot = "/Users/cderamos/GraphX_Platform/outputs/GraphX-OPS-rendered-extraction-2026-07-04";
const renderedDir = path.join(outRoot, "rendered-source-html");
const pageContentDir = path.join(outRoot, "page-content-html");
const metaDir = path.join(outRoot, "page-metadata");

for (const dir of [renderedDir, pageContentDir, metaDir]) fs.mkdirSync(dir, { recursive: true });

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith("--")) continue;
  const key = arg.slice(2);
  const value = process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[++i] : "true";
  args.set(key, value);
}

const onlySlug = args.get("slug");
const limit = args.has("limit") ? Number(args.get("limit")) : 0;
const tableOnly = args.get("table-only") === "true";

function osa(script) {
  return execFileSync("osascript", ["-e", script], {
    encoding: "utf8",
    maxBuffer: 160 * 1024 * 1024
  }).replace(/\r/g, "");
}

function escapeAppleScriptString(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function jsInChrome(js) {
  const escaped = escapeAppleScriptString(js);
  return osa(`tell application "Google Chrome" to execute javascript "${escaped}" in active tab of front window`);
}

function navigate(url) {
  const escaped = escapeAppleScriptString(url);
  osa(`tell application "Google Chrome" to set URL of active tab of front window to "${escaped}"`);
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function safeJsonEval(js, fallback = null) {
  const raw = jsInChrome(`JSON.stringify((function(){${js}})())`);
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function collectState() {
  return safeJsonEval(`
    const visible = (el) => {
      if (!el) return false;
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0" && rect.width > 0 && rect.height > 0;
    };
    const loaderSelectors = [
      ".dataTables_processing", ".ajax_loader", ".ajax-loader", ".loader", ".loading", ".blockUI",
      ".fa-spinner", ".fa-sync.fa-spin", ".spinner", ".pace-active"
    ];
    const tableStats = Array.from(document.querySelectorAll("table")).map((table, index) => ({
      index,
      id: table.id || "",
      classes: table.className || "",
      rows: table.querySelectorAll("tbody tr").length,
      cells: table.querySelectorAll("tbody td").length,
      textLength: (table.innerText || "").trim().length
    }));
    const ajaxActive = window.jQuery ? Number(window.jQuery.active || 0) : 0;
    const visibleLoaders = loaderSelectors.flatMap(selector =>
      Array.from(document.querySelectorAll(selector)).filter(visible).map(el => selector)
    );
    const bodyText = (document.body && document.body.innerText || "").replace(/\\s+/g, " ").trim();
    return {
      readyState: document.readyState,
      url: location.href,
      title: document.title,
      ajaxActive,
      visibleLoaders,
      tableStats,
      bodyTextLength: bodyText.length,
      bodyTextSample: bodyText.slice(0, 500),
      hasOpsTable: Boolean(document.querySelector("#ops-table")),
      hasDataTableWrapper: Boolean(document.querySelector(".dataTables_wrapper")),
      performanceEntries: performance.getEntriesByType("resource").length
    };
  `, {
    readyState: "unknown",
    ajaxActive: -1,
    visibleLoaders: ["state-error"],
    tableStats: [],
    bodyTextLength: 0,
    bodyTextSample: ""
  });
}

function stateSignature(state) {
  return JSON.stringify({
    readyState: state.readyState,
    ajaxActive: state.ajaxActive,
    visibleLoaders: state.visibleLoaders,
    tableStats: state.tableStats.map(table => [table.id, table.rows, table.cells, table.textLength]),
    bodyTextLength: state.bodyTextLength
  });
}

function waitForRenderedIdle(route, timeoutMs = 45000) {
  const started = Date.now();
  let lastSignature = "";
  let stableCount = 0;
  let lastState = collectState();

  while (Date.now() - started < timeoutMs) {
    const state = collectState();
    const signature = stateSignature(state);
    const hasTable = state.tableStats.length > 0 || state.hasOpsTable || state.hasDataTableWrapper;
    const hasRows = state.tableStats.some(table => table.rows > 0 || table.cells > 0);
    const productListingNeedsRows = route.slug === "product_listing";
    const tableSatisfied = !hasTable || hasRows || (!productListingNeedsRows && Date.now() - started > 12000);
    const idle = state.readyState === "complete" &&
      state.ajaxActive === 0 &&
      state.visibleLoaders.length === 0 &&
      tableSatisfied;

    if (signature === lastSignature) stableCount += 1;
    else stableCount = 0;

    lastSignature = signature;
    lastState = state;

    if (idle && stableCount >= 3) {
      return { ok: true, elapsedMs: Date.now() - started, state };
    }

    sleep(500);
  }

  return { ok: false, elapsedMs: Date.now() - started, state: lastState };
}

function collectPage() {
  const payload = jsInChrome(`JSON.stringify((function(){
    const pageContent = document.querySelector(".page-content");
    const html = "<!doctype html>\\n" + document.documentElement.outerHTML;
    return {
      url: location.href,
      title: document.title,
      readyState: document.readyState,
      html,
      pageContentHtml: pageContent ? pageContent.innerHTML : "",
      pageContentOuterHtml: pageContent ? pageContent.outerHTML : "",
      state: {
        tableCount: document.querySelectorAll("table").length,
        tableRows: Array.from(document.querySelectorAll("table")).map(table => ({
          id: table.id || "",
          rows: table.querySelectorAll("tbody tr").length,
          textLength: (table.innerText || "").trim().length
        })),
        bodyTextLength: (document.body && document.body.innerText || "").replace(/\\s+/g, " ").trim().length
      },
      assets: {
        stylesheets: Array.from(document.querySelectorAll('link[rel~="stylesheet"], link[href]')).map(el => ({href: el.href, rel: el.rel, media: el.media || ""})),
        scripts: Array.from(document.scripts).map(el => ({src: el.src || "", inlineLength: el.src ? 0 : (el.textContent || "").length, type: el.type || ""})),
        images: Array.from(document.images).map(el => ({src: el.currentSrc || el.src || "", alt: el.alt || "", width: el.naturalWidth || el.width || 0, height: el.naturalHeight || el.height || 0}))
      }
    };
  })())`);
  return JSON.parse(payload);
}

function isLikelyTableRoute(route) {
  const rawPath = path.join("/Users/cderamos/GraphX_Platform/outputs/GraphX-OPS-raw-extraction-2026-07-03/raw-source-html", `${String(route.index).padStart(3, "0")}-${route.slug}.html`);
  if (!fs.existsSync(rawPath)) return true;
  const raw = fs.readFileSync(rawPath, "utf8");
  return /<table\b|OPSTable|DataTable|dataTables/i.test(raw);
}

const crawl = JSON.parse(fs.readFileSync(sourceCapture, "utf8"));
let routes = crawl.results.map(r => ({
  index: r.index,
  slug: r.slug,
  href: r.href,
  priorFinalUrl: r.finalUrl,
  text: r.text
}));

if (onlySlug) routes = routes.filter(route => route.slug === onlySlug || route.slug.endsWith(`-${onlySlug}`));
if (tableOnly) routes = routes.filter(isLikelyTableRoute);
if (limit > 0) routes = routes.slice(0, limit);

const manifestPath = path.join(outRoot, "rendered-crawl-manifest.json");
const manifest = {
  capturedAt: new Date().toISOString(),
  source: "Google Chrome active authenticated session via AppleScript; rendered DOM after ajax/table idle",
  sanitization: "none",
  outputRoot: outRoot,
  requested: { onlySlug, limit, tableOnly },
  total: routes.length,
  ok: 0,
  failed: 0,
  timedOut: 0,
  results: []
};

for (const route of routes) {
  const started = Date.now();
  try {
    console.log(`[rendered] ${route.index}/${crawl.results.length} ${route.slug} ${route.href}`);
    navigate(route.href);
    const wait = waitForRenderedIdle(route);
    const page = collectPage();
    const fileName = `${String(route.index).padStart(3, "0")}-${route.slug}.html`;
    const htmlPath = path.join(renderedDir, fileName);
    const pageContentPath = path.join(pageContentDir, fileName);
    const metaPath = path.join(metaDir, `${String(route.index).padStart(3, "0")}-${route.slug}.json`);

    fs.writeFileSync(htmlPath, page.html, "utf8");
    fs.writeFileSync(pageContentPath, page.pageContentHtml || page.pageContentOuterHtml || page.html, "utf8");
    fs.writeFileSync(metaPath, JSON.stringify({
      ...route,
      finalUrl: page.url,
      title: page.title,
      readyState: page.readyState,
      wait,
      state: page.state,
      assets: page.assets,
      htmlFile: path.relative(outRoot, htmlPath),
      pageContentFile: path.relative(outRoot, pageContentPath)
    }, null, 2));

    if (wait.ok) manifest.ok += 1;
    else manifest.timedOut += 1;

    manifest.results.push({
      ...route,
      status: wait.ok ? "ok" : "timed-out-captured",
      finalUrl: page.url,
      title: page.title,
      bytes: Buffer.byteLength(page.html),
      pageContentBytes: Buffer.byteLength(page.pageContentHtml || ""),
      elapsedMs: Date.now() - started,
      waitElapsedMs: wait.elapsedMs,
      tableRows: page.state.tableRows,
      bodyTextLength: page.state.bodyTextLength,
      htmlFile: path.relative(outRoot, htmlPath),
      pageContentFile: path.relative(outRoot, pageContentPath),
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

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Rendered extraction complete: ${manifest.ok} ok, ${manifest.timedOut} timed-out captures, ${manifest.failed} failed`);
