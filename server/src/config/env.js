import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Resolve .env relative to server/, so commands also work from the root folder.
dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)), quiet: true });
const port = Number(process.env.PORT || 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535)
  throw new Error('PORT must be between 1 and 65535.');

export const env = {
  port,
  nodeEnv: process.env.NODE_ENV || 'development',
  serveClient: process.env.SERVE_CLIENT !== 'false',
  allowedOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean),
};
