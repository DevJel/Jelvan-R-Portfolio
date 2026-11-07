import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const directory = path.join(root, 'public/assets/portfolio/projects');
const artwork = [
  '01-master-ai-dashboard',
  '02-knowledge-center-dashboard',
  '03-internal-email-dashboard',
  '04-hris-dashboard',
  '05-bolekpad-dashboard',
  '06-printing-store-dashboard',
  '07-devai-dashboard',
];

await mkdir(directory, { recursive: true });

for (const name of artwork) {
  const source = path.join(directory, name + '.svg');
  const destination = path.join(directory, name + '.webp');

  await access(source);
  await sharp(source, { density: 144 })
    .webp({ quality: 90, alphaQuality: 100, effort: 6, smartSubsample: true })
    .toFile(destination);

  const metadata = await sharp(destination).metadata();
  if (metadata.format !== 'webp' || !metadata.width || !metadata.height) {
    throw new Error(`Generated dashboard image failed validation: ${destination}`);
  }

  console.log(`Generated ${path.relative(root, destination)} (${metadata.width}x${metadata.height})`);
}
