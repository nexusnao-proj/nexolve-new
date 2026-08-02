import fs from "node:fs";
import { chromium } from "playwright";

const buf = fs.readFileSync("public/social/linkedin-cover-1128x191.png");
const b64 = buf.toString("base64");
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(`<img id="i" src="data:image/png;base64,${b64}">`);
const dim = await page.evaluate(() => {
  const i = document.getElementById("i");
  return new Promise((resolve) => {
    const done = () => resolve(`${i.naturalWidth}x${i.naturalHeight}`);
    if (i.complete && i.naturalWidth) done();
    else i.onload = done;
  });
});
console.log("cover", dim, "bytes", buf.length);
await browser.close();

for (const f of [
  "linkedin-profile-300.png",
  "linkedin-profile-400.png",
  "instagram-profile-1080.png",
]) {
  const p = `public/social/${f}`;
  if (fs.existsSync(p)) console.log(f, fs.statSync(p).size);
}
