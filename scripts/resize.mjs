/**
 * Make phone-sized and tablet-sized copies of every job photo.
 *
 *   node scripts/resize.mjs
 *
 * The site was shipping one 1400 to 1800 pixel wide file to every visitor,
 * including a phone that only has room for about 400. This writes a -640 and
 * a -1024 next to each original so the img tags can offer a real choice.
 *
 * Originals are never touched. Re-run this after scripts/photos.mjs.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const DIR = resolve("public/img");
const WIDTHS = [640, 1024];

const sources = readdirSync(DIR).filter(
  (f) => f.endsWith(".webp") && !/-\d+\.webp$/.test(f), // skip files we made
);

let made = 0;
let saved = 0;

for (const file of sources) {
  const src = join(DIR, file);
  const base = file.replace(/\.webp$/, "");
  const original = statSync(src).size;

  // What is it actually? Skip anything already small enough to bother with.
  let width = 0;
  try {
    const probe = execFileSync(
      "ffprobe",
      ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width", "-of", "csv=p=0", src],
      { encoding: "utf8" },
    );
    width = parseInt(probe.trim(), 10) || 0;
  } catch {
    // no ffprobe, fall through and just try the resizes
  }

  for (const w of WIDTHS) {
    if (width && width <= w) continue; // never upscale
    const out = join(DIR, `${base}-${w}.webp`);
    try {
      execFileSync(
        "ffmpeg",
        ["-y", "-loglevel", "error", "-i", src, "-vf", `scale=${w}:-2`, "-quality", "78", out],
        { stdio: "pipe" },
      );
      const size = statSync(out).size;
      made++;
      if (w === 640) saved += original - size;
      console.log(`${base}-${w}.webp  ${(size / 1024).toFixed(0)} KB   (was ${(original / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`failed on ${base} at ${w}:`, String(err).slice(0, 120));
    }
  }
}

console.log(`\nwrote ${made} files`);
console.log(`a phone now saves roughly ${(saved / 1024 / 1024).toFixed(1)} MB across the set`);
