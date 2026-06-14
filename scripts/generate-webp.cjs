const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function walk(dir) {
  const entries = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      entries.push(...walk(fullPath));
    } else if (/\.(jpg|jpeg|png)$/i.test(entry)) {
      entries.push(fullPath);
    }
  }
  return entries;
}

async function main() {
  const images = walk(PUBLIC_DIR);
  let created = 0;
  let skipped = 0;

  for (const imagePath of images) {
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    if (fs.existsSync(webpPath)) {
      skipped++;
      continue;
    }

    await sharp(imagePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
    created++;
    console.log(`Created: ${path.relative(PUBLIC_DIR, webpPath)}`);
  }

  console.log(`\nCreated ${created} WebP files, skipped ${skipped} existing.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
