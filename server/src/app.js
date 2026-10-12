import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import apiRoutes from './routes/api.routes.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import { env } from './config/env.js';

export const clientDist = fileURLToPath(new URL('../../client/dist/', import.meta.url));

export function createApp({
  serveClient = env.serveClient,
  allowedOrigins = env.allowedOrigins,
} = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: env.nodeEnv === 'production' ? [] : null,
        },
      },
      strictTransportSecurity: env.nodeEnv === 'production',
    }),
  );
  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'HEAD', 'OPTIONS'] }));
  app.use(express.json({ limit: '16kb' }));
  app.use('/api', apiRoutes, notFound);

  if (serveClient && existsSync(`${clientDist}/index.html`)) {
    app.use(express.static(clientDist, { index: 'index.html', maxAge: 0 }));
  }
  app.use(notFound);
  app.use(errorHandler);
  return app;
}
