const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Top 10 largest images to optimize + convert to WebP
const TOP_10 = [
  'images/certificates/brcgs-grade-a.png',
  'images/news/srp-certification-2026.jpg',
  'images/aerial-farms.jpg',
  'images/products/broken-rice.jpg',
  'images/csr-school.jpg',
  'images/news/philippines-shipment-2026.jpg',
  'images/products/red-jasmine.jpg',
  'images/news/cambodia-export-5months-2026.jpg',
  'images/brcgs-logo.png',
  'images/botanical-rice.jpg',
];

async function optimizeImage(relativePath) {
  const inputPath = path.join(PUBLIC_DIR, relativePath);
  const ext = path.extname(relativePath).toLowerCase();
  const baseName = relativePath.slice(0, -ext.length);
  const webpPath = path.join(PUBLIC_DIR, `${baseName}.webp`);

  console.log(`Optimizing: ${relativePath}`);

  const pipeline = sharp(inputPath);

  // Create WebP version
  await pipeline
    .clone()
    .webp({ quality: 80, effort: 6 })
    .toFile(webpPath);

  // Also re-compress original format with TinyIMG-style settings
  const optimizedOriginalPath = path.join(PUBLIC_DIR, `${baseName}-optimized${ext}`);
  if (ext === '.png') {
    await pipeline
      .clone()
      .png({ quality: 85, compressionLevel: 9, effort: 10 })
      .toFile(optimizedOriginalPath);
  } else if (ext === '.jpg' || ext === '.jpeg') {
    await pipeline
      .clone()
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toFile(optimizedOriginalPath);
  }

  const originalSize = fs.statSync(inputPath).size;
  const webpSize = fs.statSync(webpPath).size;
  const optimizedSize = fs.statSync(optimizedOriginalPath).size;

  console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`  WebP:     ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize / originalSize) * 100).toFixed(1)}% smaller)`);
  console.log(`  Optimized original: ${(optimizedSize / 1024).toFixed(2)} KB (${((1 - optimizedSize / originalSize) * 100).toFixed(1)}% smaller)`);
}

async function optimizeFavicon() {
  const inputPath = path.join(PUBLIC_DIR, 'images/khmer-logo-favicon.png');
  const outputPath = path.join(PUBLIC_DIR, 'images/khmer-logo-favicon.png');
  const backupPath = path.join(PUBLIC_DIR, 'images/khmer-logo-favicon-original.png');

  console.log('Optimizing favicon...');

  // Backup original
  fs.copyFileSync(inputPath, backupPath);

  await sharp(inputPath)
    .resize(64, 64, { fit: 'inside' })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(outputPath + '.tmp');

  fs.renameSync(outputPath + '.tmp', outputPath);

  const originalSize = fs.statSync(backupPath).size;
  const newSize = fs.statSync(outputPath).size;
  console.log(`  Original: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`  Optimized: ${(newSize / 1024).toFixed(2)} KB (${((1 - newSize / originalSize) * 100).toFixed(1)}% smaller)`);
}

async function main() {
  for (const img of TOP_10) {
    await optimizeImage(img);
  }
  await optimizeFavicon();
  console.log('\nDone!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
