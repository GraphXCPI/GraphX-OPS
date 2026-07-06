import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultQueue = "reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/expanded-safe-page-capture-2026-07-06/indexes/canonical-safe-page-capture-queue.csv";
const queuePath = path.resolve(root, argValue("--queue") || defaultQueue);
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outputRoot = path.resolve(root, argValue("--output-root") || `reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/expanded-safe-page-capture-2026-07-06/live-capture-${stamp}`);
const limit = Number(argValue("--limit") || "0");
const start = Math.max(1, Number(argValue("--start") || "1"));
const onlySlug = argValue("--slug") || "";
const waitMs = Number(argValue("--wait-ms") || "45000");
const dryRun = process.argv.includes("--dry-run");
const screenshotsEnabled = !process.argv.includes("--no-screenshots");

const fullRenderedDir = path.join(outputRoot, "full-rendered-dom-html");
const pageContentDir = path.join(outputRoot, "page-content-rendered-html");
const breadcrumbsDir = path.join(outputRoot, "breadcrumbs-rendered-html");
const serverHtmlDir = path.join(outputRoot, "server-html");
const screenshotDir = path.join(outputRoot, "screenshots-full-page");
const manifestsDir = path.join(outputRoot, "page-manifests");
const indexesDir = path.join(outputRoot, "indexes");
for (const dir of [fullRenderedDir, pageContentDir, breadcrumbsDir, serverHtmlDir, screenshotDir, manifestsDir, indexesDir]) {
  fs.mkdirSync(dir, { recursive: true });
}

const queue = readCsv(queuePath).filter(row => row.safe === "true" || row.safe === true);
let targets = queue.map((row, index) => ({ ...row, queueIndex: index + 1 }));
if (onlySlug) targets = targets.filter(row => row.slug === onlySlug);
targets = targets.filter(row => row.queueIndex >= start);
if (limit > 0) targets = targets.slice(0, limit);

const captureManifest = {
  startedAt: new Date().toISOString(),
  source: "Google Chrome front-window authenticated staging session via AppleScript",
  queuePath,
  outputRoot,
  requested: { start, limit, onlySlug, waitMs, screenshotsEnabled, dryRun },
  totalQueued: queue.length,
  totalSelected: targets.length,
  ok: 0,
  loginOrDenied: 0,
  timedOut: 0,
  errors: 0,
  pages: []
};

console.log(`Safe staging capture queue: ${targets.length}/${queue.length} selected`);
console.log(`Output: ${outputRoot}`);

if (dryRun) {
  fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify(captureManifest, null, 2)}\n`);
  fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(captureManifest.pages), "utf8");
  console.log("Dry run complete; no browser navigation performed.");
  process.exit(0);
}

ensureChromeWindow();
try {
  assertChromeJavascriptAccess();
} catch (error) {
  captureManifest.blocked = true;
  captureManifest.blocker = error.message;
  captureManifest.completedAt = new Date().toISOString();
  fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify(captureManifest, null, 2)}\n`);
  fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(captureManifest.pages), "utf8");
  console.error(error.message);
  process.exit(2);
}

for (const target of targets) {
  const started = Date.now();
  const number = String(target.queueIndex).padStart(3, "0");
  const fileName = `${number}-${target.slug}.html`;
  const screenshotName = `${number}-${target.slug}.png`;
  console.log(`[safe-capture] ${number}/${queue.length} ${target.slug} ${target.url}`);

  try {
    navigate(target.url);
    const idle = waitForRenderedIdle(waitMs);
    const page = collectPage();
    const loginOrDenied = page.state.loginForm || /admin\s*::\s*login/i.test(page.title) || /login/i.test(page.state.heading || "");
    const status = loginOrDenied ? "login-or-denied" : idle.ok ? "ok" : "timed-out-captured";

    const fullRenderedPath = path.join(fullRenderedDir, fileName);
    const pageContentPath = path.join(pageContentDir, fileName);
    const breadcrumbsPath = path.join(breadcrumbsDir, fileName);
    const serverHtmlPath = path.join(serverHtmlDir, fileName);
    const screenshotPath = path.join(screenshotDir, screenshotName);
    const manifestPath = path.join(manifestsDir, `${number}-${target.slug}.json`);

    fs.writeFileSync(fullRenderedPath, page.html, "utf8");
    fs.writeFileSync(pageContentPath, page.pageContentHtml || page.pageContentOuterHtml || "", "utf8");
    fs.writeFileSync(breadcrumbsPath, page.breadcrumbsHtml || "", "utf8");
    fs.writeFileSync(serverHtmlPath, page.serverHtml || page.html, "utf8");

    let screenshotStatus = "skipped";
    let screenshotError = "";
    if (screenshotsEnabled && !loginOrDenied) {
      try {
        captureChromeWindowScreenshot(screenshotPath);
        screenshotStatus = "ok";
      } catch (error) {
        screenshotStatus = "error";
        screenshotError = error.message;
      }
    }

    const pageManifest = {
      queueIndex: target.queueIndex,
      slug: target.slug,
      url: target.url,
      safe: target.safe,
      reason: target.reason,
      sourcePages: target.sourcePages,
      status,
      finalUrl: page.url,
      title: page.title,
      heading: page.state.heading,
      idle,
      state: page.state,
      bytes: {
        fullRenderedDomHtml: Buffer.byteLength(page.html),
        pageContentRenderedHtml: Buffer.byteLength(page.pageContentHtml || page.pageContentOuterHtml || ""),
        breadcrumbsRenderedHtml: Buffer.byteLength(page.breadcrumbsHtml || ""),
        serverHtml: Buffer.byteLength(page.serverHtml || page.html),
        fullPageScreenshot: screenshotStatus === "ok" && fs.existsSync(screenshotPath) ? fs.statSync(screenshotPath).size : 0
      },
      files: {
        fullRenderedDomHtml: path.relative(outputRoot, fullRenderedPath),
        pageContentRenderedHtml: path.relative(outputRoot, pageContentPath),
        breadcrumbsRenderedHtml: path.relative(outputRoot, breadcrumbsPath),
        serverHtml: path.relative(outputRoot, serverHtmlPath),
        fullPageScreenshot: screenshotStatus === "ok" ? path.relative(outputRoot, screenshotPath) : ""
      },
      screenshotStatus,
      screenshotError,
      elapsedMs: Date.now() - started,
      capturedAt: new Date().toISOString()
    };
    fs.writeFileSync(manifestPath, `${JSON.stringify(pageManifest, null, 2)}\n`);

    if (status === "ok") captureManifest.ok += 1;
    else if (status === "login-or-denied") captureManifest.loginOrDenied += 1;
    else captureManifest.timedOut += 1;
    captureManifest.pages.push({ ...pageManifest, manifestFile: path.relative(outputRoot, manifestPath) });

    fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify({ ...captureManifest, updatedAt: new Date().toISOString() }, null, 2)}\n`);
    fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(captureManifest.pages), "utf8");

    if (loginOrDenied) {
      console.warn(`Stopped at ${target.slug}: staging returned login/denied screen. Log in to Chrome and rerun with --start ${target.queueIndex}.`);
      break;
    }
  } catch (error) {
    captureManifest.errors += 1;
    captureManifest.pages.push({
      queueIndex: target.queueIndex,
      slug: target.slug,
      url: target.url,
      status: "error",
      error: error.message,
      elapsedMs: Date.now() - started,
      capturedAt: new Date().toISOString()
    });
    fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify({ ...captureManifest, updatedAt: new Date().toISOString() }, null, 2)}\n`);
    fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(captureManifest.pages), "utf8");
    console.warn(`[safe-capture] ${target.slug} error: ${error.message}`);
  }

  sleep(300);
}

captureManifest.completedAt = new Date().toISOString();
fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify(captureManifest, null, 2)}\n`);
fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(captureManifest.pages), "utf8");
console.log(`Captured ${captureManifest.ok}/${captureManifest.pages.length} selected pages. loginOrDenied=${captureManifest.loginOrDenied} timedOut=${captureManifest.timedOut} errors=${captureManifest.errors}`);

function argValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) return "";
  return process.argv[index + 1];
}

function osa(script, maxBuffer = 256 * 1024 * 1024) {
  return execFileSync("osascript", ["-e", script], { encoding: "utf8", maxBuffer }).replace(/\r/g, "");
}

function escapeAppleScriptString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function jsInChrome(js) {
  return osa(`tell application "Google Chrome" to execute javascript "${escapeAppleScriptString(js)}" in active tab of front window`);
}

function assertChromeJavascriptAccess() {
  try {
    jsInChrome("document.title");
  } catch (error) {
    if (/Access not allowed|execute javascript/i.test(error.message)) {
      throw new Error("Google Chrome denied JavaScript from Apple Events. In Chrome, enable View > Developer > Allow JavaScript from Apple Events, log in to https://staging.visualgraphx.com/admin, then rerun this script.");
    }
    throw error;
  }
}

function ensureChromeWindow() {
  osa(`tell application "Google Chrome"
    activate
    if not (exists window 1) then make new window
  end tell`);
}

function navigate(url) {
  osa(`tell application "Google Chrome" to set URL of active tab of front window to "${escapeAppleScriptString(url)}"`);
}

function collectState() {
  return safeJsonEval(`
    const visible = (el) => {
      if (!el) return false;
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0" && rect.width > 0 && rect.height > 0;
    };
    const loaderSelectors = [".dataTables_processing", ".ajax_loader", ".ajax-loader", ".loader", ".loading", ".blockUI", ".fa-spinner", ".fa-sync.fa-spin", ".spinner", ".pace-active"];
    const tableStats = Array.from(document.querySelectorAll("table")).map((table, index) => ({
      index,
      id: table.id || "",
      classes: table.className || "",
      rows: table.querySelectorAll("tbody tr").length,
      cells: table.querySelectorAll("tbody td").length,
      textLength: (table.innerText || "").trim().length
    }));
    const bodyText = (document.body?.innerText || "").replace(/\\s+/g, " ").trim();
    return {
      readyState: document.readyState,
      url: location.href,
      title: document.title,
      heading: document.querySelector("h1")?.innerText?.replace(/\\s+/g, " ").trim() || "",
      ajaxActive: window.jQuery ? Number(window.jQuery.active || 0) : 0,
      visibleLoaders: loaderSelectors.flatMap(selector => Array.from(document.querySelectorAll(selector)).filter(visible).map(() => selector)),
      tableStats,
      bodyTextLength: bodyText.length,
      bodyTextSample: bodyText.slice(0, 500),
      loginForm: Boolean(document.querySelector('input[type="password"], input[name="password"], form[action*="login"], form[action*="index.php"] input[name="username"]')),
      hasPageContent: Boolean(document.querySelector(".page-content")),
      hasDataTableWrapper: Boolean(document.querySelector(".dataTables_wrapper"))
    };
  `, {
    readyState: "unknown",
    url: "",
    title: "",
    ajaxActive: -1,
    visibleLoaders: ["state-error"],
    tableStats: [],
    bodyTextLength: 0,
    bodyTextSample: "",
    loginForm: false
  });
}

function waitForRenderedIdle(timeoutMs) {
  const started = Date.now();
  let lastSignature = "";
  let stableCount = 0;
  let lastState = collectState();

  while (Date.now() - started < timeoutMs) {
    const state = collectState();
    if (state.loginForm) return { ok: false, blockedByLogin: true, elapsedMs: Date.now() - started, state };

    const signature = JSON.stringify({
      readyState: state.readyState,
      ajaxActive: state.ajaxActive,
      visibleLoaders: state.visibleLoaders,
      tableStats: state.tableStats.map(table => [table.id, table.rows, table.cells, table.textLength]),
      bodyTextLength: state.bodyTextLength
    });
    stableCount = signature === lastSignature ? stableCount + 1 : 0;
    lastSignature = signature;
    lastState = state;

    const idle = state.readyState === "complete" && state.ajaxActive === 0 && state.visibleLoaders.length === 0;
    const tableSatisfied = !state.hasDataTableWrapper || state.tableStats.some(table => table.rows > 0 || table.cells > 0) || Date.now() - started > 12000;
    if (idle && tableSatisfied && stableCount >= 3) return { ok: true, elapsedMs: Date.now() - started, state };

    sleep(500);
  }

  return { ok: false, blockedByLogin: false, elapsedMs: Date.now() - started, state: lastState };
}

function collectPage() {
  return safeJsonEval(`
    const sanitize = (html) => String(html || "")
      .replace(/(<input[^>]+name=["']ops_csrf_token["'][^>]+value=["'])[^"']*(["'])/gi, "$1[redacted]$2")
      .replace(/(["']csrf[_-]?token["']\\s*:\\s*["'])[^"']*(["'])/gi, "$1[redacted]$2");
    let serverHtml = "";
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", location.href, false);
      xhr.withCredentials = true;
      xhr.send(null);
      serverHtml = xhr.responseText || "";
    } catch (error) {
      serverHtml = "";
    }
    const pageContent = document.querySelector(".page-content");
    const breadcrumbs = document.querySelector("#breadcrumbs");
    return {
      url: location.href,
      title: document.title,
      html: sanitize("<!doctype html>\\n" + document.documentElement.outerHTML),
      pageContentHtml: sanitize(pageContent ? pageContent.innerHTML : ""),
      pageContentOuterHtml: sanitize(pageContent ? pageContent.outerHTML : ""),
      breadcrumbsHtml: sanitize(breadcrumbs ? breadcrumbs.outerHTML : ""),
      serverHtml: sanitize(serverHtml),
      state: {
        readyState: document.readyState,
        url: location.href,
        title: document.title,
        heading: document.querySelector("h1")?.innerText?.replace(/\\s+/g, " ").trim() || "",
        ajaxActive: window.jQuery ? Number(window.jQuery.active || 0) : 0,
        visibleLoaders: [".dataTables_processing", ".ajax_loader", ".ajax-loader", ".loader", ".loading", ".blockUI", ".fa-spinner", ".fa-sync.fa-spin", ".spinner", ".pace-active"].flatMap(selector => Array.from(document.querySelectorAll(selector)).filter(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0" && rect.width > 0 && rect.height > 0;
        }).map(() => selector)),
        tableStats: Array.from(document.querySelectorAll("table")).map((table, index) => ({
          index,
          id: table.id || "",
          classes: table.className || "",
          rows: table.querySelectorAll("tbody tr").length,
          cells: table.querySelectorAll("tbody td").length,
          textLength: (table.innerText || "").trim().length
        })),
        bodyTextLength: (document.body?.innerText || "").replace(/\\s+/g, " ").trim().length,
        bodyTextSample: (document.body?.innerText || "").replace(/\\s+/g, " ").trim().slice(0, 500),
        loginForm: Boolean(document.querySelector('input[type="password"], input[name="password"], form[action*="login"], form[action*="index.php"] input[name="username"]')),
        hasPageContent: Boolean(document.querySelector(".page-content")),
        hasDataTableWrapper: Boolean(document.querySelector(".dataTables_wrapper")),
        tableCount: document.querySelectorAll("table").length,
        assetCounts: {
          stylesheets: document.querySelectorAll('link[rel~="stylesheet"], link[href]').length,
          scripts: document.scripts.length,
          images: document.images.length
        }
      }
    };
  `);
}

function safeJsonEval(js, fallback = null) {
  const raw = jsInChrome(`JSON.stringify((function(){${js}})())`);
  try {
    return JSON.parse(raw);
  } catch (error) {
    if (fallback !== null) return fallback;
    throw new Error(`Chrome JSON eval failed: ${error.message}`);
  }
}

function captureChromeWindowScreenshot(filePath) {
  const bounds = osa(`tell application "System Events" to tell process "Google Chrome" to tell front window to return (position as text) & "|" & (size as text)`);
  const [position, size] = bounds.trim().split("|");
  const [x, y] = position.split(",").map(value => Number(value.trim()));
  const [width, height] = size.split(",").map(value => Number(value.trim()));
  if (![x, y, width, height].every(Number.isFinite)) throw new Error(`Unable to parse Chrome window bounds: ${bounds}`);
  execFileSync("screencapture", ["-x", "-R", `${x},${y},${width},${height}`, filePath], { stdio: "ignore" });
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function readCsv(filePath) {
  const text = fs.readFileSync(filePath, "utf8").trim();
  const [headerLine, ...lines] = text.split(/\r?\n/);
  const headers = parseCsvLine(headerLine);
  return lines.filter(Boolean).map(line => {
    const cells = parseCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] || ""]));
  });
}

function parseCsvLine(line) {
  const cells = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(value);
      value = "";
    } else {
      value += char;
    }
  }
  cells.push(value);
  return cells;
}

function toCsv(rows) {
  if (!rows.length) return "";
  const columns = Array.from(rows.reduce((set, row) => {
    Object.keys(row).forEach(key => {
      if (typeof row[key] !== "object") set.add(key);
    });
    return set;
  }, new Set()));
  const escape = value => {
    const raw = String(value ?? "");
    return /[",\n]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw;
  };
  return `${columns.join(",")}\n${rows.map(row => columns.map(column => escape(row[column])).join(",")).join("\n")}\n`;
}
