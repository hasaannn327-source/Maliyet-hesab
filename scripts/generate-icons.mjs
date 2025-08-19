import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const inputSvgPath = path.join(projectRoot, 'public', 'icon.svg');
const out192Path = path.join(projectRoot, 'public', 'icon-192.png');
const out512Path = path.join(projectRoot, 'public', 'icon-512.png');

async function generate() {
  const svgBuffer = fs.readFileSync(inputSvgPath);
  await sharp(svgBuffer).resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out192Path);
  await sharp(svgBuffer).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out512Path);
  console.log('Generated icons:', path.relative(projectRoot, out192Path), path.relative(projectRoot, out512Path));
}

generate().catch((err) => {
  console.error('Failed to generate icons:', err);
  process.exit(1);
});

