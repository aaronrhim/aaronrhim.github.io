import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Match next.config.ts. Originals remain available for full-size viewing.
const widths = [64, 256, 640, 1080, 1920];
const root = path.resolve("public");

async function optimize(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const source = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await optimize(source);
      continue;
    }
    if (!/\.(png|jpe?g)$/i.test(entry.name)) continue;
    const destination = path.join(root, "optimized", path.relative(root, source));
    await mkdir(path.dirname(destination), { recursive: true });
    // Lossless encoding keeps diagram text and equation symbols crisp.
    const lossless = /^hmi-(architecture|dwindle|equations)\.png$/.test(entry.name);
    await Promise.all(
      widths.map((width) =>
        sharp(source)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 82, lossless })
          .toFile(`${destination}.${width}.webp`)
      )
    );
  }
}

await optimize(path.join(root, "images"));
console.log("Generated responsive WebP images; originals preserved.");
