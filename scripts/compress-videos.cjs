const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg-static');

const videosDir = path.join(__dirname, '..', 'public', 'videos');

const configs = [
  {
    input: 'hero-train.mp4',
    base: 'hero-train',
    width: 1280, // 720p width, maintain aspect
  },
  {
    input: 'global-logistics.mp4',
    base: 'global-logistics',
    width: 1280,
  },
];

function runFfmpeg(args) {
  console.log(`Running: ffmpeg ${args.join(' ')}`);
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`ffmpeg exited with code ${result.status}`);
  }
}

for (const config of configs) {
  const inputPath = path.join(videosDir, config.input);
  if (!fs.existsSync(inputPath)) {
    console.warn(`Skipping ${config.input}: not found`);
    continue;
  }

  const mp4Output = path.join(videosDir, `${config.base}-720p.mp4`);
  const webmOutput = path.join(videosDir, `${config.base}-720p.webm`);

  // H.264 720p MP4 with faststart (moov atom at front) for web streaming
  runFfmpeg([
    '-i', inputPath,
    '-vf', `scale=${config.width}:-2`,
    '-c:v', 'libx264',
    '-crf', '26',
    '-preset', 'medium',
    '-movflags', '+faststart',
    '-an', // no audio
    '-y',
    mp4Output,
  ]);

  // VP9 720p WebM
  runFfmpeg([
    '-i', inputPath,
    '-vf', `scale=${config.width}:-2`,
    '-c:v', 'libvpx-vp9',
    '-crf', '35',
    '-b:v', '0', // use CRF mode
    '-deadline', 'good',
    '-cpu-used', '2',
    '-an',
    '-y',
    webmOutput,
  ]);

  const inputSize = fs.statSync(inputPath).size;
  const mp4Size = fs.statSync(mp4Output).size;
  const webmSize = fs.statSync(webmOutput).size;
  console.log(`\n${config.base}:`);
  console.log(`  original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  720p mp4: ${(mp4Size / 1024 / 1024).toFixed(2)} MB (${(mp4Size / inputSize * 100).toFixed(1)}%)`);
  console.log(`  720p webm: ${(webmSize / 1024 / 1024).toFixed(2)} MB (${(webmSize / inputSize * 100).toFixed(1)}%)`);
}

console.log('\nDone');
