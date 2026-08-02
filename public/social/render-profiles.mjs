/**
 * Renders the Nexolve Matrix O profile mark on white for LinkedIn + Instagram.
 * Run from project root: node public/social/render-profiles.mjs
 */
import { chromium } from "@playwright/test";
import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const htmlPath = join(here, "profile-1080.html");

async function render(outName, size) {
  const outPath = join(here, outName);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(htmlPath).href);
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: size, height: size },
  });
  await browser.close();

  const png = readFileSync(outPath);
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  const kb = (statSync(outPath).size / 1024).toFixed(1);
  console.log(`${outName}: ${width}x${height} (${kb} KB)`);
  if (width !== size || height !== size) {
    throw new Error(`${outName} dimensions mismatch`);
  }
}

await render("linkedin-profile-300.png", 300);
await render("linkedin-profile-400.png", 400);
await render("instagram-profile-1080.png", 1080);
