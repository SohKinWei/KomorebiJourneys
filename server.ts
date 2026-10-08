import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { healthHandler } from './api/health/index.ts';
import { toursHandler } from './api/tours/index.ts';
import { recommendHandler } from './api/recommend/index.ts';
import { seasonsHandler } from './api/seasons/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // API Route Bindings
  app.get('/api/health', healthHandler);
  app.get('/api/tours', toursHandler);
  app.get('/api/recommend', recommendHandler);
  app.post('/api/recommend', recommendHandler);
  app.get('/api/seasons/live', seasonsHandler);
  app.post('/api/seasons/live', seasonsHandler);

  if (!isProd) {
    // Development mode: Mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static files
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    }
  }

  app.listen(port, '0.0.0.0', () => {
    // Note: Do not print any secret keys or sensitive tokens
    console.log(`Komorebi Journeys server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
