// Phone / tablet / desktop proof shots + the social share card.
// Uses the headless Chromium shell already on this machine (no npx playwright install).
//   node scripts/shots.mjs http://localhost:5177 ../proof
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(
  "C:/Users/theor/AppData/Local/Temp/claude/C--Users-theor-Downloads--claude/f7e19af6-13aa-45d4-adba-3c3cf240cdd8/scratchpad/package.json",
);
const { chromium } = require("playwright-core");

const BASE = process.argv[2] ?? "http://localhost:5177";
const OUT = resolve(process.argv[3] ?? "proof");
mkdirSync(OUT, { recursive: true });
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EXE =
  "C:/Users/theor/AppData/Local/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-win64/chrome-headless-shell.exe";

const SIZES = [
  { name: "phone-390", width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "tablet-820", width: 820, height: 1180, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: "desktop-1280", width: 1280, height: 800, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];

const PAGES = [
  ["home", "/"],
  ["services", "/services"],
  ["service-detach", "/services/solar-panel-removal-and-reinstall"],
  ["areas", "/service-areas"],
  ["city-boca", "/service-areas/boca-raton"],
  ["about", "/about"],
  ["contact", "/contact"],
];

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const problems = [];

for (const size of SIZES) {
  const ctx = await browser.newContext({
    viewport: { width: size.width, height: size.height },
    isMobile: size.isMobile,
    hasTouch: size.hasTouch,
    deviceScaleFactor: size.deviceScaleFactor,
  });
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const wide = doc.scrollWidth > doc.clientWidth + 1;
      const bad = [];
      if (wide) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 && r.width > 0) {
            bad.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)} right=${Math.round(r.right)}`);
            if (bad.length > 5) break;
          }
        }
      }
      return { wide, scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, bad, h1: document.querySelector("h1")?.textContent?.trim().slice(0, 80) ?? "(no h1)", title: document.title };
    });
    if (overflow.wide) problems.push(`${size.name} ${path}: sideways scroll ${overflow.scrollWidth}>${overflow.clientWidth} ${overflow.bad.join(" | ")}`);
    await page.screenshot({ path: join(OUT, `${size.name}-${name}.png`), fullPage: true });
    await page.screenshot({ path: join(OUT, `top-${size.name}-${name}.png`), fullPage: false });
    console.log(`${size.name} ${path} -> ${overflow.title} | h1: ${overflow.h1}${overflow.wide ? "  !! SIDEWAYS SCROLL" : ""}`);
  }
  await ctx.close();
}

// Social card
{
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(join(root, "public", "img", "og-source.html")).href, { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(root, "public", "img", "og.png"), type: "png" });
  console.log("og.png written");
  await ctx.close();
}

await browser.close();
if (problems.length) {
  console.log("\nPROBLEMS:\n" + problems.join("\n"));
  process.exitCode = 2;
} else {
  console.log("\nNo sideways scroll on any page at any size.");
}
