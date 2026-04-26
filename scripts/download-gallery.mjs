/**
 * download-gallery.mjs
 * Downloads placeholder images into public/gallery/.
 * Run: node scripts/download-gallery.mjs
 *
 * TO USE YOUR OWN INSTAGRAM PHOTOS:
 * 1. Save each photo from @sophiasclean_ directly (right-click > Save Image)
 * 2. Rename them: g1.jpg, g2.jpg ... g9.jpg (and ba-before-1.jpg etc)
 * 3. Drop them into public/gallery/
 * 4. Done — the site will use them automatically.
 */

import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'gallery');

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const FILES = [
  // Gallery grid images
  { name: 'g1.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=88&fit=crop' },
  { name: 'g2.jpg', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&q=88&fit=crop' },
  { name: 'g3.jpg', url: 'https://images.unsplash.com/photo-1527515637462-cff212de5958?w=800&q=88&fit=crop' },
  { name: 'g4.jpg', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=88&fit=crop' },
  { name: 'g5.jpg', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=88&fit=crop' },
  { name: 'g6.jpg', url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=88&fit=crop' },
  { name: 'g7.jpg', url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=88&fit=crop' },
  { name: 'g8.jpg', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=88&fit=crop' },
  { name: 'g9.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=88&fit=crop' },
  // Before/After pairs
  { name: 'ba-before-1.jpg', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=85&fit=crop' },
  { name: 'ba-after-1.jpg',  url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=700&q=85&fit=crop' },
  { name: 'ba-before-2.jpg', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=700&q=85&fit=crop' },
  { name: 'ba-after-2.jpg',  url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=700&q=85&fit=crop' },
  { name: 'ba-before-3.jpg', url: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=700&q=85&fit=crop' },
  { name: 'ba-after-3.jpg',  url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=700&q=85&fit=crop' },
  // Brand strip hero images
  { name: 'brand-1.jpg', url: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=900&q=90&fit=crop' },
  { name: 'brand-2.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90&fit=crop' },
  { name: 'brand-3.jpg', url: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=900&q=90&fit=crop' },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', reject);
  });
}

console.log(`Downloading ${FILES.length} images to public/gallery/ ...\n`);

for (const { name, url } of FILES) {
  const dest = join(OUT, name);
  process.stdout.write(`  ${name} ... `);
  try {
    await download(url, dest);
    console.log('✓');
  } catch (e) {
    console.log(`✗ (${e.message})`);
  }
}

console.log('\nDone! Replace any file with your own Instagram photo to use it.');
