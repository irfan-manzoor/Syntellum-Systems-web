import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const BASE_URL = 'https://syntellum.si';
const TODAY = new Date().toISOString().split('T')[0];

/**
 * All production routes defined in App.tsx
 */
export const ROUTES = [
  {
    path: '/',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/what-we-do',
    changefreq: 'weekly',
    priority: '0.9',
  },
  {
    path: '/services/ai-technology-advisory',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    path: '/services/generative-applied-ai',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    path: '/services/ai-data-engineering',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    path: '/services/intelligent-operations',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    path: '/services/technology-resource-augmentation',
    changefreq: 'weekly',
    priority: '0.85',
  },
  {
    path: '/industries',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/approach',
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/about',
    changefreq: 'monthly',
    priority: '0.75',
  },
  {
    path: '/security',
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/contact',
    changefreq: 'weekly',
    priority: '0.85',
  },
];

export function buildSitemapXml(routes = ROUTES, baseUrl = BASE_URL, lastmod = TODAY) {
  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${baseUrl}${route.path === '/' ? '/' : route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

export function generateSitemap() {
  const xml = buildSitemapXml();

  const publicDir = path.join(rootDir, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, xml, 'utf-8');
  console.log(`[sitemap] Successfully generated dynamic sitemap at ${publicSitemapPath}`);

  const distDir = path.join(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemapPath, xml, 'utf-8');
    console.log(`[sitemap] Updated sitemap in dist at ${distSitemapPath}`);
  }

  return xml;
}

// Auto-run when executed directly via node
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
