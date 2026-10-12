import { createApp, clientDist } from './app.js';
import { env } from './config/env.js';
import { existsSync } from 'node:fs';

const app = createApp();
const server = app.listen(env.port, () => {
  console.log(`Portfolio API: http://localhost:${env.port}/api/health`);
  if (env.serveClient && existsSync(`${clientDist}/index.html`)) {
    console.log(`Built portfolio: http://localhost:${env.port}`);
  } else {
    console.log('Use npm run dev from the root to start the React client, or npm run build first.');
  }
});

server.on('error', (error) => {
  console.error(`Server could not start: ${error.message}`);
  process.exitCode = 1;
});
function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 8000).unref();
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
