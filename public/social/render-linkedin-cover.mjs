/**
 * Renders LinkedIn cover at 10× (11280×1910) for maximum upload sharpness.
 * Scales the HTML layout to native pixels (more reliable than deviceScaleFactor:10).
 *
 * Run: node public/social/render-linkedin-cover.mjs
 */
import { chromium } from "@playwright/test";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const htmlPath = join(here, "linkedin-cover-1128x191.html");

const BASE_W = 1128;
const BASE_H = 191;
const SCALE = 10; // 11280 × 1910
const OUT_W = BASE_W * SCALE;
const OUT_H = BASE_H * SCALE;
const outMax = join(here, `linkedin-cover-${OUT_W}x${OUT_H}.png`);

function localArchivoCss() {
  try {
    const mediaDir = join(root, ".next", "static", "media");
    const woff2 = readdirSync(mediaDir).find((f) => f.endsWith(".p.woff2"));
    if (!woff2) return null;
    const b64 = readFileSync(join(mediaDir, woff2)).toString("base64");
    return `@font-face{font-family:Archivo;font-style:normal;font-weight:400 800;font-display:block;src:url(data:font/woff2;base64,${b64}) format("woff2");}`;
  } catch {
    return null;
  }
}

function pngSize(path) {
  const png = readFileSync(path);
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
    bytes: statSync(path).size,
    mb: (statSync(path).size / (1024 * 1024)).toFixed(2),
  };
}

const browser = await chromium.launch({
  args: ["--disable-dev-shm-usage", "--max-texture-size=16384"],
});
const page = await browser.newPage({
  viewport: { width: OUT_W, height: OUT_H },
  deviceScaleFactor: 1,
});

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "networkidle" });

const fontCss = localArchivoCss();
if (fontCss) await page.addStyleTag({ content: fontCss });

// Scale the 1128×191 design up 10× in-place so every pixel is native (no upscale blur).
await page.addStyleTag({
  content: `
    html, body {
      width: ${OUT_W}px !important;
      height: ${OUT_H}px !important;
      overflow: hidden !important;
      background: #ffffff !important;
    }
    .cover {
      width: ${BASE_W}px !important;
      height: ${BASE_H}px !important;
      transform: scale(${SCALE});
      transform-origin: top left;
      -webkit-font-smoothing: antialiased !important;
      text-rendering: geometricPrecision !important;
    }
    * {
      -webkit-font-smoothing: antialiased !important;
      text-rendering: geometricPrecision !important;
    }
  `,
});

await page.evaluate(async () => {
  await Promise.all([
    document.fonts.load('800 10px "Archivo"'),
    document.fonts.load('700 26px "Archivo"'),
    document.fonts.load('500 12px "Archivo"'),
  ]);
  await document.fonts.ready;
  const img = document.querySelector(".map");
  if (img && !img.complete) {
    await new Promise((r) => {
      img.onload = r;
      img.onerror = r;
    });
  }
});
await page.waitForTimeout(500);

console.log(`Capturing ${OUT_W}×${OUT_H}…`);
await page.screenshot({
  path: outMax,
  type: "png",
  scale: "device",
  clip: { x: 0, y: 0, width: OUT_W, height: OUT_H },
  animations: "disabled",
});
await browser.close();

const info = pngSize(outMax);
console.log(`\n★ UPLOAD THIS:`);
console.log(`  ${outMax}`);
console.log(`  ${info.width}×${info.height} | ${info.mb} MB`);

if (info.width !== OUT_W || info.height !== OUT_H) {
  console.error(`ERROR: expected ${OUT_W}×${OUT_H}, got ${info.width}×${info.height}`);
  process.exit(1);
}

// LinkedIn typically allows ~8 MB for covers
if (info.bytes > 8 * 1024 * 1024) {
  console.warn("WARNING: file is over 8 MB — LinkedIn may reject it.");
}

writeFileSync(
  join(here, "README.md"),
  `# Nexolve Technologies social assets

## LinkedIn company cover — use this

**\`linkedin-cover-11280x1910.png\`** (10× / maximum quality)

- Aspect: LinkedIn 1128×191
- Pixels: **11280×1910** lossless PNG
- Left safe zone for profile logo overlay

If LinkedIn rejects the file size, fall back to:
- \`linkedin-cover-4512x764.png\` (4×)
- \`linkedin-cover-2256x382.png\` (2×)

## Profiles

- LinkedIn: \`linkedin-profile-400.png\`
- Instagram: \`instagram-profile-1080.png\`

\`\`\`bash
node public/social/render-linkedin-cover.mjs
node public/social/render-profiles.mjs
\`\`\`
`,
);
