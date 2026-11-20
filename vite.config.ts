import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function phpContactDevPlugin(): Plugin {
  return {
    name: 'php-contact-dev-mock',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/contact.php' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              success: true,
              message: 'Thank you for reaching out to Syntellum Systems. We have received your enquiry and will respond promptly.',
              devNotice: 'Simulated response in development server. On Hostinger production, processed by PHP mail transport.'
            }));
          });
          return;
        }
        next();
      });
    }
  };
}

function dynamicSitemapPlugin(): Plugin {
  return {
    name: 'dynamic-sitemap-generator',
    async buildStart() {
      try {
        const { generateSitemap } = await import('./scripts/generate-sitemap.mjs');
        generateSitemap();
      } catch (err) {
        console.warn('Dynamic sitemap generator error:', err);
      }
    },
  };
}

import { fileURLToPath } from 'url';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), phpContactDevPlugin(), dynamicSitemapPlugin()],
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});


