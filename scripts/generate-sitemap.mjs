import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const seoConfigPath = path.join(rootDir, 'src', 'data', 'seoRoutes.json');
const seoConfig = JSON.parse(fs.readFileSync(seoConfigPath, 'utf-8'));

const BASE_URL = seoConfig.baseUrl || 'https://syntellum.si';
const TODAY = new Date().toISOString().split('T')[0];

export const ROUTES = seoConfig.routes;

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(routes = ROUTES, baseUrl = BASE_URL, lastmod = TODAY) {
  const urlEntries = routes
    .map((route) => {
      const loc = `${baseUrl}${route.path === '/' ? '/' : route.path}`;
      const imageBlock = route.image
        ? `\n    <image:image>\n      <image:loc>${escapeXml(`${baseUrl}${route.image}`)}</image:loc>\n      <image:title>${escapeXml(route.title)}</image:title>${
            route.imageCaption
              ? `\n      <image:caption>${escapeXml(route.imageCaption)}</image:caption>`
              : ''
          }\n    </image:image>`
        : '';

      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>${imageBlock}
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateSitemap();
}
