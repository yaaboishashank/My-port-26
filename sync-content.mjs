import { copyFile } from 'node:fs/promises';
// Keep the frontend fallback identical to the API content before dev/build.
await copyFile(
  new URL('./server/src/data/portfolio.json', import.meta.url),
  new URL('./client/src/data/portfolio.json', import.meta.url),
);
console.log('Portfolio content synced.');
