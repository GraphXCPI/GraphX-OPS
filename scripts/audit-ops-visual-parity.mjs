import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultRunId = new Date().toISOString().slice(0, 10);
const args = parseArgs(process.argv.slice(2));
const runId = args["run-id"] || defaultRunId;
const outputRoot = path.resolve(root, args.out || `raw-reference/visual-audit-${runId}`);
const baseUrl = args["base-url"] || "http://127.0.0.1:4179/index.html";
const shouldCapture = Boolean(args.capture);
const shouldWriteDocs = args["write-docs"] !== false;
const viewportHeight = Number(args["viewport-height"] || 900);
const routeFilter = new Set(String(args.routes || "").split(",").map(item => item.trim()).filter(Boolean));
const limit = Number(args.limit || 0);

const pages = loadExtractedPages();
const referenceIndex = buildReferenceIndex();
const screenshotDims = loadScreenshotDimensions(referenceIndex);
const rows = buildRows(pages, referenceIndex, screenshotDims);
const selectedRows = rows
  .filter(row => !routeFilter.size || routeFilter.has(row.route))
  .slice(0, limit > 0 ? limit : undefined);

if (shouldCapture) {
  await captureAndCompare(selectedRows);
} else {
  await compareExistingLocalScreenshots(selectedRows);
}

writeAuditOutputs(rows);

console.log(`Audited ${rows.length} built Current OPS routes`);
console.log(`Reference screenshots: ${rows.filter(row => row.referenceScreenshot).length}`);
console.log(`Pixel comparisons: ${rows.filter(row => isPixelComparisonStatus(row.visualStatus)).length}`);
console.log(`PII risk high/medium/low: ${countBy(rows, "piiRisk")}`);
console.log(`Outputs: ${path.relative(root, outputRoot)}`);

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
    } else {
      parsed[key] = next;
      index += 1;
    }
  }
  return parsed;
}

function loadExtractedPages() {
  const source = fs.readFileSync(path.join(root, "ops-extracted-pages.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { timeout: 20000 });
  return sandbox.window.OPS_EXTRACTED_PAGES || {};
}

function buildRows(extractedPages, refs, dims) {
  return Object.values(extractedPages)
    .map(page => {
      const ref = findReferenceForPage(page, refs);
      const html = collectPageHtml(page);
      const pii = detectPii(html, page);
      const referenceScreenshot = ref?.screenshotPath || "";
      const refDims = referenceScreenshot ? dims.get(referenceScreenshot) : null;
      return {
        route: page.route,
        title: cleanText(page.title),
        slug: page.slug,
        sourceFile: page.sourceFile,
        sourceKind: page.sourceKind,
        tabStateCount: Array.isArray(page.tabStates) ? page.tabStates.length : 0,
        referenceStatus: referenceScreenshot ? "available" : "missing",
        referenceSource: ref?.captureKind || "",
        referenceScreenshot,
        referenceWidth: refDims?.width || "",
        referenceHeight: refDims?.height || "",
        localScreenshot: "",
        visualStatus: "not-run",
        visualDiffRatio: "",
        visualMismatchPixels: "",
        comparedWidth: "",
        comparedHeight: "",
        dimensionDelta: "",
        piiRisk: pii.risk,
        piiCategories: pii.categories.join("|"),
        piiSignals: pii.signalCount,
        anonymizationPriority: pii.priority,
        anonymizationAction: pii.action,
        anonymizationStatus: pii.priority === "P2" ? "defer" : "queued"
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));
}

function collectPageHtml(page) {
  const chunks = [page.title, page.slug, page.breadcrumbsHtml, page.bodyHtml];
  for (const tab of page.tabStates || []) {
    chunks.push(tab.text, tab.href, tab.dataUrl, tab.breadcrumbsHtml, tab.bodyHtml);
  }
  return chunks.filter(Boolean).join("\n");
}

function detectPii(html, page) {
  const text = String(html || "");
  const categories = new Set();
  let signalCount = 0;

  const checks = [
    ["email", /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, match => !/@example\.test$/i.test(match) && !/^support@onprintshop\.com$/i.test(match)],
    ["phone", /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}\b/g, (match, offset) => !isInsideUrlLikeToken(text, offset)],
    ["admin_relogin_token", /relogin\.php|user_login_type|[?&]s=[0-9a-fA-F]{40,}/g],
    ["order_customer_context", /\b(Order Name|Customer|Company Name|Contact|Billing|Shipping|Payment:|Admin:|PO:|Order No\.?|OrderId)\b/gi],
    ["address_fields", /\b(Address|City|State|Zip|Postal|Country)\b/gi],
    ["user_admin_identity", /\b(username|mail_id|Admin User|Workflow Admin|Login as)\b/gi],
    ["customer_artwork_asset", /ops-remote-images\/files\/[^"')\s]+(?:thumb|Qnty|pdf|c_)/gi]
  ];

  for (const [category, pattern, filter] of checks) {
    const matches = Array.from(text.matchAll(pattern))
      .map(match => ({ value: match[0], index: match.index || 0 }))
      .filter(match => !filter || filter(match.value, match.index));
    if (matches?.length) {
      categories.add(category);
      signalCount += matches.length;
    }
  }

  const routeText = `${page.route} ${page.slug} ${page.title}`.toLowerCase();
  if (/\b(order|quote|customer|user|admin|report|sales|payment|workflow|subscriber|store)\b/.test(routeText)) {
    categories.add("sensitive_business_context");
  }

  const hasHardPii = ["email", "phone", "admin_relogin_token", "customer_artwork_asset"].some(category => categories.has(category));
  const hasLikelyPii = categories.has("order_customer_context") || categories.has("address_fields") || categories.has("user_admin_identity");
  const risk = hasHardPii ? "high" : hasLikelyPii ? "medium" : "low";
  const priority = risk === "high" ? "P0" : risk === "medium" ? "P1" : "P2";
  const action = priority === "P0"
    ? "anonymize before next public deploy"
    : priority === "P1"
      ? "anonymize during route parity pass"
      : "no immediate anonymization needed";

  return {
    risk,
    priority,
    action,
    categories: Array.from(categories).sort(),
    signalCount
  };
}

function isInsideUrlLikeToken(text, offset) {
  const start = Math.max(0, offset - 120);
  const end = Math.min(text.length, offset + 120);
  const context = text.slice(start, end);
  return /https?:\/\/|assets\/|data:image|\.png|\.jpe?g|\.gif|\.svg|\.webp/i.test(context);
}

function buildReferenceIndex() {
  const candidates = [];
  const stagingRoot = path.join(root, "reference/extractions/GraphX-OPS-staging-extraction-2026-07-06");
  collectManifests(path.join(stagingRoot, "full-source-cdp-capture-2026-07-06"), "full-source", candidates);
  collectCaptureRoots(path.join(stagingRoot, "expanded-safe-page-capture-2026-07-06"), candidates);

  const byRoute = new Map();
  const bySlug = new Map();
  const bySourceStem = new Map();

  for (const item of candidates) {
    setPreferredReference(byRoute, item.route, item);
    setPreferredReference(bySlug, item.slug, item);
    setPreferredReference(bySourceStem, item.sourceStem, item);
  }

  return { candidates, byRoute, bySlug, bySourceStem };
}

function setPreferredReference(map, key, item) {
  if (!key) return;
  const existing = map.get(key);
  if (!existing || (!existing.screenshotPath && item.screenshotPath)) {
    map.set(key, item);
  }
}

function collectCaptureRoots(searchRoot, candidates) {
  if (!fs.existsSync(searchRoot)) return;
  for (const entry of fs.readdirSync(searchRoot, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith("live-capture")) continue;
    collectManifests(path.join(searchRoot, entry.name), entry.name.includes("live-template") ? "live-template" : "safe-capture", candidates);
  }
}

function collectManifests(captureRoot, captureKind, candidates) {
  const manifestsDir = path.join(captureRoot, "page-manifests");
  if (!fs.existsSync(manifestsDir)) return;
  for (const file of fs.readdirSync(manifestsDir).filter(name => name.endsWith(".json")).sort()) {
    const manifestPath = path.join(manifestsDir, file);
    const manifest = readJson(manifestPath);
    if (!manifest) continue;
    const screenshotRel = manifest.files?.fullPageScreenshot || "";
    const screenshotPath = screenshotRel ? path.join(captureRoot, screenshotRel) : "";
    const sourceStem = file.replace(/\.json$/, "");
    candidates.push({
      route: manifest.route || "",
      slug: manifest.slug || sourceStem.replace(/^\d+-/, ""),
      title: manifest.heading || manifest.sourceTitle || manifest.title || "",
      sourceStem,
      captureKind,
      manifestPath,
      screenshotPath: screenshotPath && fs.existsSync(screenshotPath) ? screenshotPath : ""
    });
  }
}

function findReferenceForPage(page, refs) {
  const sourceStem = String(page.sourceFile || "").replace(/\.html$/, "");
  return refs.bySourceStem.get(sourceStem)
    || refs.bySlug.get(page.slug)
    || refs.byRoute.get(page.route)
    || null;
}

function loadScreenshotDimensions(refs) {
  const dimensions = new Map();

  for (const item of refs.candidates) {
    if (!item.screenshotPath || dimensions.has(item.screenshotPath)) continue;
    dimensions.set(item.screenshotPath, imageDimensions(item.screenshotPath) || {});
  }
  return dimensions;
}

function imageDimensions(file) {
  try {
    const header = fs.readFileSync(file);
    if (header[0] === 0xff && header[1] === 0xd8) return jpegDimensions(header);
    if (header.toString("ascii", 12, 16) !== "IHDR") return null;
    return {
      width: header.readUInt32BE(16),
      height: header.readUInt32BE(20)
    };
  } catch {
    return null;
  }
}

function jpegDimensions(buffer) {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) return null;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if ((marker >= 0xc0 && marker <= 0xc3) || (marker >= 0xc5 && marker <= 0xc7) || (marker >= 0xc9 && marker <= 0xcb) || (marker >= 0xcd && marker <= 0xcf)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7)
      };
    }
    offset += 2 + length;
  }
  return null;
}

async function captureAndCompare(targetRows) {
  const { chromium } = require("playwright");
  fs.mkdirSync(path.join(outputRoot, "local-screenshots"), { recursive: true });
  fs.mkdirSync(path.join(outputRoot, "diffs"), { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1688, height: viewportHeight } });
  page.setDefaultTimeout(45000);
  page.setDefaultNavigationTimeout(60000);

  for (const row of targetRows) {
    const width = Number(row.referenceWidth || 1688);
    if (width > 0) await page.setViewportSize({ width, height: viewportHeight });
    const localPath = path.join(outputRoot, "local-screenshots", `${safeName(row.route)}.png`);
    row.localScreenshot = localPath;
    try {
      await page.goto(`${baseUrl}#current/${row.route}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(600);
      await page.screenshot({ path: localPath, fullPage: true });
      if (row.referenceScreenshot) {
        Object.assign(row, await compareScreenshots(row.referenceScreenshot, localPath, path.join(outputRoot, "diffs", `${safeName(row.route)}.png`)));
      } else {
        row.visualStatus = "missing-reference";
      }
    } catch (error) {
      row.visualStatus = "capture-error";
      row.dimensionDelta = String(error?.message || error).replace(/\s+/g, " ").slice(0, 180);
    }
  }
  await browser.close();
}

async function compareExistingLocalScreenshots(targetRows) {
  for (const row of targetRows) {
    const localPath = path.join(outputRoot, "local-screenshots", `${safeName(row.route)}.png`);
    if (!fs.existsSync(localPath)) continue;
    row.localScreenshot = localPath;
    if (row.referenceScreenshot) {
      Object.assign(row, await compareScreenshots(row.referenceScreenshot, localPath, path.join(outputRoot, "diffs", `${safeName(row.route)}.png`)));
    } else {
      row.visualStatus = "missing-reference";
    }
  }
}

async function compareScreenshots(referencePath, localPath, diffPath) {
  const sharp = require("sharp");
  const pixelmatchModule = require("pixelmatch");
  const pixelmatch = pixelmatchModule.default || pixelmatchModule;
  const referenceDims = imageDimensions(referencePath);
  const localDims = imageDimensions(localPath);
  const width = Math.min(referenceDims?.width || 0, localDims?.width || 0);
  const height = Math.min(referenceDims?.height || 0, localDims?.height || 0);
  const comparedPixels = width * height;
  if (!width || !height) {
    return {
      visualStatus: "compare-error",
      dimensionDelta: "unable to read image dimensions"
    };
  }
  if (comparedPixels > 80_000_000) {
    return {
      visualStatus: "too-large",
      comparedWidth: width,
      comparedHeight: height,
      dimensionDelta: `${localDims.width}x${localDims.height} vs ${referenceDims.width}x${referenceDims.height}`
    };
  }
  const reference = await loadRawRgba(referencePath, width, height);
  const local = await loadRawRgba(localPath, width, height);
  const referenceCrop = cropRaw(reference.data, reference.info.width, width, height);
  const localCrop = cropRaw(local.data, local.info.width, width, height);
  const diff = Buffer.alloc(width * height * 4);
  const mismatch = pixelmatch(referenceCrop, localCrop, diff, width, height, { threshold: 0.12 });
  fs.mkdirSync(path.dirname(diffPath), { recursive: true });
  await sharp(diff, { raw: { width, height, channels: 4 } }).png().toFile(diffPath);
  const ratio = mismatch / (width * height);
  return {
    visualStatus: ratio <= 0.015 && reference.info.width === local.info.width && reference.info.height === local.info.height ? "match"
      : ratio <= 0.08 ? "review"
        : "mismatch",
    visualDiffRatio: ratio.toFixed(5),
    visualMismatchPixels: mismatch,
    comparedWidth: width,
    comparedHeight: height,
    dimensionDelta: `${local.info.width}x${local.info.height} vs ${reference.info.width}x${reference.info.height}`
  };
}

async function loadRawRgba(file, width, height) {
  return require("sharp")(file, { limitInputPixels: false })
    .extract({ left: 0, top: 0, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
}

function cropRaw(source, sourceWidth, width, height) {
  if (sourceWidth === width && source.length === width * height * 4) return source;
  const out = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    const sourceStart = (y * sourceWidth) * 4;
    const targetStart = (y * width) * 4;
    source.copy(out, targetStart, sourceStart, sourceStart + width * 4);
  }
  return out;
}

function writeAuditOutputs(allRows) {
  fs.mkdirSync(outputRoot, { recursive: true });
  fs.writeFileSync(path.join(outputRoot, "ops-visual-audit.json"), `${JSON.stringify({
    generatedAt: new Date().toISOString(),
    baseUrl,
    routeCount: allRows.length,
    referenceScreenshotCount: allRows.filter(row => row.referenceScreenshot).length,
    pixelComparisonCount: allRows.filter(row => isPixelComparisonStatus(row.visualStatus)).length,
    visualStatusCounts: makeCounts(allRows, "visualStatus"),
    piiRiskCounts: makeCounts(allRows, "piiRisk"),
    anonymizationPriorityCounts: makeCounts(allRows, "anonymizationPriority"),
    rows: allRows.map(row => ({
      ...row,
      referenceScreenshot: row.referenceScreenshot ? path.relative(root, row.referenceScreenshot) : "",
      localScreenshot: row.localScreenshot ? path.relative(root, row.localScreenshot) : ""
    }))
  }, null, 2)}\n`);
  fs.writeFileSync(path.join(outputRoot, "ops-visual-audit.csv"), toCsv(allRows.map(row => ({
    ...row,
    referenceScreenshot: row.referenceScreenshot ? path.relative(root, row.referenceScreenshot) : "",
    localScreenshot: row.localScreenshot ? path.relative(root, row.localScreenshot) : ""
  }))));

  if (shouldWriteDocs) {
    writeTrackedDocs(allRows);
  }
}

function writeTrackedDocs(allRows) {
  const docPath = path.join(root, `docs/ops-visual-audit-${runId}.md`);
  const csvPath = path.join(root, `docs/ops-visual-audit-${runId}.csv`);
  const high = allRows.filter(row => row.piiRisk === "high");
  const missingRefs = allRows.filter(row => row.referenceStatus === "missing");
  const compared = allRows.filter(row => isPixelComparisonStatus(row.visualStatus));
  const mismatches = compared.filter(row => row.visualStatus === "mismatch");
  const review = compared.filter(row => row.visualStatus === "review");
  const tooLarge = allRows.filter(row => row.visualStatus === "too-large");
  const compareErrors = allRows.filter(row => row.visualStatus === "compare-error" || row.visualStatus === "capture-error");
  const p0 = allRows.filter(row => row.anonymizationPriority === "P0");
  const p1 = allRows.filter(row => row.anonymizationPriority === "P1");

  const body = [
    "# OPS Visual Parity And PII Audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Scope",
    "",
    `- Built Current OPS routes audited: ${allRows.length}`,
    `- Routes with source reference screenshots: ${allRows.filter(row => row.referenceScreenshot).length}`,
    `- Routes pixel-compared in this run: ${compared.length}`,
    `- PII risk counts: ${countBy(allRows, "piiRisk")}`,
    `- Anonymization priority counts: ${countBy(allRows, "anonymizationPriority")}`,
    "",
    "Raw screenshots and pixel diffs are intentionally written under ignored `raw-reference/` only. This tracked report does not include raw PII samples.",
    "",
    "## Visual Status",
    "",
    `- Match: ${compared.filter(row => row.visualStatus === "match").length}`,
    `- Needs review: ${review.length}`,
    `- Mismatch: ${mismatches.length}`,
    `- Too large for pixel diff: ${tooLarge.length}`,
    `- Capture/compare errors: ${compareErrors.length}`,
    `- Missing reference screenshot: ${missingRefs.length}`,
    "",
    "Highest priority visual review routes:",
    "",
    ...topVisualRows([...mismatches, ...review]).map(row => `- \`${row.route}\` (${row.slug}): ${row.visualStatus}, diff ${row.visualDiffRatio || "n/a"}, ${row.dimensionDelta || "no dimensions"}`),
    "",
    "## PII Status",
    "",
    `- P0, anonymize before next public deploy: ${p0.length}`,
    `- P1, anonymize during route parity pass: ${p1.length}`,
    `- High-risk PII routes: ${high.length}`,
    "",
    "P0 anonymization queue, first 30:",
    "",
    ...(p0.length ? p0.slice(0, 30).map(row => `- \`${row.route}\` (${row.slug}): ${row.piiCategories || "pii"}`) : ["- None."]),
    "",
    "## Anonymization Schedule",
    "",
    "- 2026-07-07: Generator-level anonymization is active for published extracted pages by default.",
    "- 2026-07-07: Static checks require zero non-demo emails, zero relogin/session URLs, zero customer artwork asset paths, zero live admin URLs, and zero known captured-name terms in `ops-extracted-pages.js`.",
    "- 2026-07-08: Continue reducing P1 category risk during route parity passes by replacing remaining customer/company/address context where it is not structurally required.",
    "- 2026-07-08: Resume one-screen visual parity fixes, starting with `orders`.",
    "",
    "## Notes",
    "",
    "- Visual comparison is only conclusive where both a reference screenshot and a local screenshot exist.",
    "- PII detection is conservative and category-based; it avoids writing detected values into tracked docs.",
    "- See the CSV for the full route queue."
  ].join("\n");

  fs.writeFileSync(docPath, `${body}\n`);
  fs.writeFileSync(csvPath, toCsv(allRows.map(row => ({
    route: row.route,
    slug: row.slug,
    sourceKind: row.sourceKind,
    tabStateCount: row.tabStateCount,
    referenceStatus: row.referenceStatus,
    referenceSource: row.referenceSource,
    visualStatus: row.visualStatus,
    visualDiffRatio: row.visualDiffRatio,
    dimensionDelta: row.dimensionDelta,
    piiRisk: row.piiRisk,
    piiCategories: row.piiCategories,
    piiSignals: row.piiSignals,
    anonymizationPriority: row.anonymizationPriority,
    anonymizationAction: row.anonymizationAction,
    anonymizationStatus: row.anonymizationStatus
  }))));
}

function topVisualRows(rows) {
  return rows
    .slice()
    .sort((a, b) => Number(b.visualDiffRatio || 0) - Number(a.visualDiffRatio || 0))
    .slice(0, 20);
}

function cropLong(value, max = 180) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function cleanText(value) {
  return cropLong(String(value || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim(), 120);
}

function safeName(value) {
  return String(value || "route").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function toCsv(rows) {
  if (!rows.length) return "";
  const columns = Object.keys(rows[0]);
  const escape = value => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return `${columns.join(",")}\n${rows.map(row => columns.map(column => escape(row[column])).join(",")).join("\n")}\n`;
}

function makeCounts(rows, key) {
  return rows.reduce((acc, row) => {
    acc[row[key] || ""] = (acc[row[key] || ""] || 0) + 1;
    return acc;
  }, {});
}

function countBy(rows, key) {
  const counts = makeCounts(rows, key);
  return Object.keys(counts).sort().map(item => `${item}=${counts[item]}`).join(", ");
}

function isPixelComparisonStatus(status) {
  return status === "match" || status === "review" || status === "mismatch";
}
