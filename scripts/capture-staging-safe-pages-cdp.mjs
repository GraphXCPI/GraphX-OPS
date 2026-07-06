import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultQueue = "reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/expanded-safe-page-capture-2026-07-06/indexes/canonical-safe-page-capture-queue.csv";
const queuePath = path.resolve(root, argValue("--queue") || defaultQueue);
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outputRoot = path.resolve(root, argValue("--output-root") || `reference/extractions/GraphX-OPS-staging-extraction-2026-07-06/expanded-safe-page-capture-2026-07-06/live-capture-cdp-${stamp}`);
const cdpPort = Number(argValue("--cdp-port") || "9222");
const limit = Number(argValue("--limit") || "0");
const start = Math.max(1, Number(argValue("--start") || "1"));
const onlySlug = argValue("--slug") || "";
const overrideUrl = argValue("--override-url") || "";
const waitMs = Number(argValue("--wait-ms") || "45000");
const dryRun = process.argv.includes("--dry-run");
const screenshotsEnabled = !process.argv.includes("--no-screenshots");
const cdpTimeoutMs = Number(argValue("--cdp-timeout-ms") || "120000");
const serverFetchTimeoutMs = Number(argValue("--server-fetch-timeout-ms") || "8000");
const networkQuietMs = Number(argValue("--network-quiet-ms") || "2500");
const settleMs = Number(argValue("--settle-ms") || "2000");
const stablePolls = Number(argValue("--stable-polls") || "5");
const forceNewTab = process.argv.includes("--new-tab");
const domOnly = process.argv.includes("--dom-only");
const safeUrlOverrides = {
  order_action: "https://staging.visualgraphx.com/admin/order_action.php?Action=edit_order&OrderId=2636"
};

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
targets = targets.map(target => (
  safeUrlOverrides[target.slug]
    ? { ...target, url: safeUrlOverrides[target.slug], overrideUrl: true }
    : target
));
if (overrideUrl) {
  if (!onlySlug || targets.length !== 1) throw new Error("--override-url requires --slug and exactly one selected target");
  targets = targets.map(target => ({ ...target, url: overrideUrl, overrideUrl: true }));
}

const captureManifest = {
  startedAt: new Date().toISOString(),
  source: `Chrome DevTools Protocol on 127.0.0.1:${cdpPort}`,
  queuePath,
  outputRoot,
  requested: { start, limit, onlySlug, overrideUrl, waitMs, screenshotsEnabled, dryRun, cdpPort, cdpTimeoutMs, serverFetchTimeoutMs, networkQuietMs, settleMs, stablePolls, forceNewTab, domOnly },
  totalQueued: queue.length,
  totalSelected: targets.length,
  ok: 0,
  loginOrDenied: 0,
  timedOut: 0,
  errors: 0,
  pages: []
};

console.log(`Safe staging CDP capture queue: ${targets.length}/${queue.length} selected`);
console.log(`Output: ${outputRoot}`);

if (dryRun) {
  writeManifest(captureManifest);
  console.log("Dry run complete; no browser navigation performed.");
  process.exit(0);
}

let cdp = await connectToStagingPage(cdpPort);
await prepareCdp(cdp);

try {
  for (const target of targets) {
    const started = Date.now();
    const number = String(target.queueIndex).padStart(3, "0");
    const fileName = `${number}-${target.slug}.html`;
    const screenshotName = `${number}-${target.slug}.png`;
    console.log(`[safe-capture-cdp] ${number}/${queue.length} ${target.slug} ${target.url}`);

    try {
      await navigate(cdp, target.url, waitMs);
      const idle = await waitForRenderedIdle(cdp, waitMs);
      const page = await collectPage(cdp);
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
          const imageBase64 = await captureScreenshot(cdp);
          fs.writeFileSync(screenshotPath, Buffer.from(imageBase64, "base64"));
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
        overrideUrl: Boolean(target.overrideUrl),
        status,
        finalUrl: page.url,
        title: page.title,
        heading: page.state.heading,
        captureMode: page.captureMode || "runtime",
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
      writeManifest({ ...captureManifest, updatedAt: new Date().toISOString() });

      if (loginOrDenied) {
        console.warn(`Stopped at ${target.slug}: staging returned login/denied screen. Log in to the debug Chrome profile and rerun with --start ${target.queueIndex}.`);
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
      writeManifest({ ...captureManifest, updatedAt: new Date().toISOString() });
      console.warn(`[safe-capture-cdp] ${target.slug} error: ${error.message}`);
      if (/timed out|WebSocket|closed|detached/i.test(error.message)) {
        try {
          cdp.close();
        } catch {
          // Best-effort cleanup only.
        }
        cdp = await connectToStagingPage(cdpPort);
        await prepareCdp(cdp);
      }
    }

    await sleep(250);
  }
} finally {
  captureManifest.completedAt = new Date().toISOString();
  writeManifest(captureManifest);
  cdp.close();
}

console.log(`Captured ${captureManifest.ok}/${captureManifest.pages.length} selected pages. loginOrDenied=${captureManifest.loginOrDenied} timedOut=${captureManifest.timedOut} errors=${captureManifest.errors}`);

async function connectToStagingPage(port) {
  const targets = await getJson(`http://127.0.0.1:${port}/json/list`);
  let target = targets.find(item => item.type === "page" && item.url?.startsWith("https://staging.visualgraphx.com/admin/"));
  if (forceNewTab || !target) {
    target = await getJson(`http://127.0.0.1:${port}/json/new?${encodeURIComponent("https://staging.visualgraphx.com/admin/welcome.php")}`, { method: "PUT" });
  }
  if (!target?.webSocketDebuggerUrl) throw new Error(`No debuggable staging page found on 127.0.0.1:${port}`);
  return new CdpClient(target.webSocketDebuggerUrl, cdpTimeoutMs);
}

async function prepareCdp(cdp) {
  attachNetworkTracker(cdp);
  await cdp.send("Network.enable");
  await cdp.send("Page.enable");
  await cdp.send("DOM.enable");
  await cdp.send("Runtime.enable");
}

async function navigate(cdp, url, timeoutMs) {
  resetNetworkTracker(cdp);
  await cdp.send("Page.navigate", { url });
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const state = await collectState(cdp);
    if (state.readyState === "interactive" || state.readyState === "complete" || state.loginForm) return;
    await sleep(250);
  }
  throw new Error(`Navigation did not reach interactive state within ${timeoutMs}ms`);
}

async function waitForRenderedIdle(cdp, timeoutMs) {
  const started = Date.now();
  let lastSignature = "";
  let stableCount = 0;
  let lastState = await collectState(cdp);

  while (Date.now() - started < timeoutMs) {
    const state = await collectState(cdp);
    if (state.loginForm) return { ok: false, blockedByLogin: true, elapsedMs: Date.now() - started, state };

    const signature = JSON.stringify({
      readyState: state.readyState,
      ajaxActive: state.ajaxActive,
      networkInflight: cdp.network?.inflight || 0,
      visibleLoaders: state.visibleLoaders,
      tableStats: state.tableStats.map(table => [table.id, table.rows, table.cells, table.textLength]),
      bodyTextLength: state.bodyTextLength
    });
    stableCount = signature === lastSignature ? stableCount + 1 : 0;
    lastSignature = signature;
    lastState = state;

    const networkIdle = !cdp.network || (cdp.network.inflight === 0 && Date.now() - cdp.network.lastActivityAt >= networkQuietMs);
    const idle = state.readyState === "complete" && state.ajaxActive === 0 && networkIdle && state.visibleLoaders.length === 0;
    const tableSatisfied = !state.hasDataTableWrapper || state.tableStats.some(table => table.rows > 0 || table.cells > 0) || Date.now() - started > 12000;
    if (idle && tableSatisfied && stableCount >= stablePolls) {
      await sleep(settleMs);
      const settledState = await collectState(cdp);
      const settledNetworkIdle = !cdp.network || (cdp.network.inflight === 0 && Date.now() - cdp.network.lastActivityAt >= networkQuietMs);
      if (settledState.readyState === "complete" && settledState.ajaxActive === 0 && settledNetworkIdle && settledState.visibleLoaders.length === 0) {
        return { ok: true, elapsedMs: Date.now() - started, state: settledState, networkQuietMs, settleMs, stablePolls };
      }
    }

    await sleep(500);
  }

  return { ok: false, blockedByLogin: false, elapsedMs: Date.now() - started, state: lastState };
}

async function collectState(cdp) {
  return await evaluateJson(cdp, `
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
      loginForm: /admin\s*::\s*login/i.test(document.title) || Boolean(document.querySelector(".login-container, .login-box, .login-layout")),
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

async function collectPage(cdp) {
  if (domOnly) return await collectPageFromDom(cdp, new Error("DOM-only capture requested"));
  try {
    return await collectPageRuntime(cdp);
  } catch (error) {
    if (!/Runtime\.evaluate timed out|Runtime evaluation failed|Promise was collected|Object reference chain is too long/i.test(error.message)) {
      throw error;
    }
    return await collectPageFromDom(cdp, error);
  }
}

async function collectPageRuntime(cdp) {
  return await evaluateJson(cdp, `
    const sanitize = (html) => String(html || "")
      .replace(/(<input[^>]+name=["']ops_csrf_token["'][^>]+value=["'])[^"']*(["'])/gi, "$1[redacted]$2")
      .replace(/(["']csrf[_-]?token["']\\s*:\\s*["'])[^"']*(["'])/gi, "$1[redacted]$2");
    let serverHtml = "";
    try {
      const controller = new AbortController();
      const serverFetchTimer = setTimeout(() => controller.abort(), ${JSON.stringify(serverFetchTimeoutMs)});
      serverHtml = await fetch(location.href, { credentials: "include", signal: controller.signal }).then(response => response.text());
      clearTimeout(serverFetchTimer);
    } catch (error) {
      serverHtml = "";
    }
    const canvasSnapshots = [];
    document.querySelectorAll("canvas").forEach((canvas, index) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      try {
        const dataUrl = canvas.toDataURL("image/png");
        if (!dataUrl || dataUrl.length < 100) return;
        canvas.setAttribute("data-ops-canvas-snapshot", dataUrl);
        canvas.setAttribute("data-ops-canvas-index", String(index));
        canvas.setAttribute("data-ops-canvas-css-width", String(Math.round(rect.width)));
        canvas.setAttribute("data-ops-canvas-css-height", String(Math.round(rect.height)));
        canvasSnapshots.push({
          index,
          width: canvas.width,
          height: canvas.height,
          cssWidth: Math.round(rect.width),
          cssHeight: Math.round(rect.height),
          bytes: dataUrl.length
        });
      } catch {
        canvasSnapshots.push({
          index,
          width: canvas.width,
          height: canvas.height,
          cssWidth: Math.round(rect.width),
          cssHeight: Math.round(rect.height),
          bytes: 0,
          tainted: true
        });
      }
    });
    const pageContent = document.querySelector(".page-content");
    const breadcrumbs = document.querySelector("#breadcrumbs");
    return {
      captureMode: "runtime",
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
        loginForm: /admin\s*::\s*login/i.test(document.title) || Boolean(document.querySelector(".login-container, .login-box, .login-layout")),
        hasPageContent: Boolean(document.querySelector(".page-content")),
        hasDataTableWrapper: Boolean(document.querySelector(".dataTables_wrapper")),
        tableCount: document.querySelectorAll("table").length,
        assetCounts: {
          stylesheets: document.querySelectorAll('link[rel~="stylesheet"], link[href]').length,
          scripts: document.scripts.length,
          images: document.images.length
        },
        canvasSnapshots
      }
    };
  `);
}

async function collectPageFromDom(cdp, runtimeError) {
  const state = await collectState(cdp);
  const documentNode = await cdp.send("DOM.getDocument", { depth: 1, pierce: false });
  const documentNodeId = documentNode.root?.nodeId;
  if (!documentNodeId) throw runtimeError;
  const htmlNode = await cdp.send("DOM.querySelector", { nodeId: documentNodeId, selector: "html" });
  const pageContentNode = await cdp.send("DOM.querySelector", { nodeId: documentNodeId, selector: ".page-content" });
  const breadcrumbsNode = await cdp.send("DOM.querySelector", { nodeId: documentNodeId, selector: "#breadcrumbs" });

  const htmlOuter = htmlNode.nodeId ? await getOuterHtml(cdp, htmlNode.nodeId) : "";
  const pageContentOuter = pageContentNode.nodeId ? await getOuterHtml(cdp, pageContentNode.nodeId) : "";
  const breadcrumbsOuter = breadcrumbsNode.nodeId ? await getOuterHtml(cdp, breadcrumbsNode.nodeId) : "";
  const sanitizedHtml = sanitizeHtml("<!doctype html>\n" + htmlOuter);
  const sanitizedPageContentOuter = sanitizeHtml(pageContentOuter);
  return {
    captureMode: "dom-fallback",
    url: state.url,
    title: state.title,
    html: sanitizedHtml,
    pageContentHtml: innerHtmlFromOuter(sanitizedPageContentOuter) || sanitizedPageContentOuter,
    pageContentOuterHtml: sanitizedPageContentOuter,
    breadcrumbsHtml: sanitizeHtml(breadcrumbsOuter),
    serverHtml: "",
    state
  };
}

async function getOuterHtml(cdp, nodeId) {
  const result = await cdp.send("DOM.getOuterHTML", { nodeId });
  return result.outerHTML || "";
}

function sanitizeHtml(html) {
  return String(html || "")
    .replace(/(<input[^>]+name=["']ops_csrf_token["'][^>]+value=["'])[^"']*(["'])/gi, "$1[redacted]$2")
    .replace(/(["']csrf[_-]?token["']\s*:\s*["'])[^"']*(["'])/gi, "$1[redacted]$2")
    .replace(/(<meta[^>]+name=["']csrf-token["'][^>]+content=["'])[^"']*(["'])/gi, "$1[redacted]$2");
}

function innerHtmlFromOuter(html) {
  const openEnd = String(html || "").indexOf(">");
  const closeStart = String(html || "").lastIndexOf("</");
  if (openEnd === -1 || closeStart === -1 || closeStart <= openEnd) return "";
  return html.slice(openEnd + 1, closeStart).trim();
}

async function captureScreenshot(cdp) {
  const metrics = await cdp.send("Page.getLayoutMetrics");
  const width = Math.max(1, Math.ceil(metrics.contentSize?.width || 1440));
  const height = Math.max(1, Math.ceil(metrics.contentSize?.height || 900));
  const screenshot = await cdp.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width, height, scale: 1 }
  });
  return screenshot.data;
}

async function evaluateJson(cdp, body, fallback = null) {
  const expression = `(async function(){${body}})()`;
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true
  });
  if (result.exceptionDetails) {
    if (fallback !== null) return fallback;
    throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  }
  return result.result?.value ?? fallback;
}

function CdpClient(url, timeoutMs) {
  this.url = url;
  this.nextId = 1;
  this.pending = new Map();
  this.socket = new WebSocket(url);
  this.ready = new Promise((resolve, reject) => {
    this.socket.addEventListener("open", resolve, { once: true });
    this.socket.addEventListener("error", reject, { once: true });
  });
  this.socket.addEventListener("message", event => {
    const message = JSON.parse(String(event.data));
    if (!message.id) {
      this.onEvent?.(message);
      return;
    }
    const pending = this.pending.get(message.id);
    if (!pending) return;
    this.pending.delete(message.id);
    if (message.error) pending.reject(new Error(message.error.message || JSON.stringify(message.error)));
    else pending.resolve(message.result || {});
  });
  this.send = async (method, params = {}) => {
    await this.ready;
    const id = this.nextId++;
    this.socket.send(JSON.stringify({ id, method, params }));
    return await new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        reject(new Error(`CDP ${method} timed out`));
      }, timeoutMs);
    });
  };
  this.close = () => {
    try {
      this.socket.close();
    } catch {
      // Nothing to clean up.
    }
  };
}

function attachNetworkTracker(cdp) {
  const requestIds = new Set();
  cdp.network = {
    inflight: 0,
    lastActivityAt: Date.now(),
    requestIds
  };
  cdp.onEvent = message => {
    const method = message.method || "";
    const params = message.params || {};
    if (method === "Network.requestWillBeSent") {
      requestIds.add(params.requestId);
      cdp.network.inflight = requestIds.size;
      cdp.network.lastActivityAt = Date.now();
    } else if (method === "Network.loadingFinished" || method === "Network.loadingFailed") {
      requestIds.delete(params.requestId);
      cdp.network.inflight = requestIds.size;
      cdp.network.lastActivityAt = Date.now();
    } else if (method.startsWith("Network.")) {
      cdp.network.lastActivityAt = Date.now();
    }
  };
}

function resetNetworkTracker(cdp) {
  if (!cdp.network) return;
  cdp.network.requestIds.clear();
  cdp.network.inflight = 0;
  cdp.network.lastActivityAt = Date.now();
}

async function getJson(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`GET ${url} failed: ${response.status}`);
  return await response.json();
}

function writeManifest(manifest) {
  fs.writeFileSync(path.join(outputRoot, "safe_page_capture_manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  fs.writeFileSync(path.join(indexesDir, "captured-pages.csv"), toCsv(manifest.pages || []), "utf8");
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1 || index + 1 >= process.argv.length) return "";
  return process.argv[index + 1];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
