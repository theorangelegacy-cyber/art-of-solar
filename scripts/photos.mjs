// Turns the Facebook originals in public/img/fb into the lean .webp files the
// site uses. Re-run any time a photo in the map below changes.
//   node scripts/photos.mjs
import { createRequire } from "node:module";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(
  "C:/Users/theor/AppData/Local/Temp/claude/C--Users-theor-Downloads--claude/f7e19af6-13aa-45d4-adba-3c3cf240cdd8/scratchpad/package.json",
);
const { chromium } = require("playwright-core");

const FB = resolve("public/img/fb");
const OUT = resolve("public/img");
const files = readdirSync(FB).filter((f) => f.endsWith(".jpg")).sort();
const byNum = (n) => files.find((f) => f.startsWith(String(n).padStart(2, "0") + "-"));

/** output name -> [photo number, max width, quality] */
const MAP = {
  hero: [5, 1800, 0.8],
  rerack: [16, 1400, 0.8],
  orphan: [34, 1400, 0.8],
  leak: [18, 1400, 0.8],
  inspect: [10, 1400, 0.8],
  storm: [22, 1400, 0.8],
  "new-install": [29, 1400, 0.8],
  crew: [33, 1400, 0.8],
  "logo-photo": [27, 1200, 0.85],
  before: [1, 1200, 0.8],
  after: [3, 1200, 0.8],
  g1: [25, 1200, 0.78],
  g2: [12, 1200, 0.78],
  g3: [20, 1200, 0.78],
  g4: [4, 1200, 0.78],
  g5: [8, 1200, 0.78],
  g6: [24, 1200, 0.78],
  g7: [26, 1200, 0.78],
  g8: [30, 1200, 0.78],
  g9: [32, 1200, 0.78],
  g10: [13, 1200, 0.78],
};

const browser = await chromium.launch({
  executablePath:
    "C:/Users/theor/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe",
});
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve("proof/contact-sheet.html")).href);

for (const [name, [num, maxW, q]] of Object.entries(MAP)) {
  const src = byNum(num);
  if (!src) {
    console.log("MISSING photo", num, "for", name);
    continue;
  }
  const url = "data:image/jpeg;base64," + readFileSync(join(FB, src)).toString("base64");
  const dataUrl = await page.evaluate(
    async ({ url, maxW, q }) => {
      const im = new Image();
      await new Promise((res, rej) => {
        im.onload = res;
        im.onerror = rej;
        im.src = url;
      });
      const W = Math.min(maxW, im.naturalWidth);
      const H = Math.round((im.naturalHeight * W) / im.naturalWidth);
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      c.getContext("2d").drawImage(im, 0, 0, W, H);
      return c.toDataURL("image/webp", q);
    },
    { url, maxW, q },
  );
  const buf = Buffer.from(dataUrl.split(",")[1], "base64");
  writeFileSync(join(OUT, `${name}.webp`), buf);
  console.log(`${name}.webp  <- #${num}  ${Math.round(buf.length / 1024)} KB`);
}

await browser.close();
