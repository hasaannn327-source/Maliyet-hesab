import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const inputSvgPath = path.join(projectRoot, 'public', 'icon.svg');
const out192Path = path.join(projectRoot, 'public', 'icon-192.v2.png');
const out512Path = path.join(projectRoot, 'public', 'icon-512.v2.png');
const appleTouchPath = path.join(projectRoot, 'public', 'apple-touch-icon.png');

async function generate() {
  const svgBuffer = fs.readFileSync(inputSvgPath);
  await sharp(svgBuffer).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out192Path);
  await sharp(svgBuffer).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out512Path);
  await sharp(svgBuffer).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile(appleTouchPath);
  console.log('Generated icons:', path.relative(projectRoot, out192Path), path.relative(projectRoot, out512Path), path.relative(projectRoot, appleTouchPath));
}

generate().catch((err) => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});

