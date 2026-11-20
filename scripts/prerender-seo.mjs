import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const distDir = path.join(rootDir, 'dist');
const seoConfigPath = path.join(rootDir, 'src', 'data', 'seoRoutes.json');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildRouteJsonLd(route, baseUrl, canonicalUrl, imageUrl) {
  const graph = [];

  if (Array.isArray(route.breadcrumbs) && route.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: route.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.path === '/' ? '/' : crumb.path}`,
      })),
    });
  }

  if (route.schemaType === 'Service') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: route.serviceType || route.title,
      serviceType: route.serviceType || route.title,
      description: route.description,
      url: canonicalUrl,
      image: imageUrl,
      areaServed: {
        '@type': 'Place',
        name: 'Global',
      },
      provider: {
        '@id': `${baseUrl}/#organization`,
      },
    });
  } else {
    graph.push({
      '@type': route.schemaType || 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: route.title,
      description: route.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      isPartOf: {
        '@id': `${baseUrl}/#website`,
      },
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}

export function prerenderSeoRoutes() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`Cannot prerender SEO routes: ${indexHtmlPath} not found. Run vite build first.`);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const seoConfig = JSON.parse(fs.readFileSync(seoConfigPath, 'utf-8'));
  const baseUrl = seoConfig.baseUrl || 'https://syntellum.si';
  const defaultImage = seoConfig.defaultImage || '/assets/images/hero_systems_architecture_1793879195919.jpg';

  let generatedCount = 0;

  for (const route of seoConfig.routes) {
    if (route.path === '/') continue;

    const cleanPath = route.path.replace(/^\/+|\/+$/g, '');
    const canonicalUrl = `${baseUrl}/${cleanPath}`;
    const imageUrl = `${baseUrl}${route.image || defaultImage}`;
    const safeTitle = escapeHtml(route.title);
    const safeDesc = escapeHtml(route.description);
    const safeCaption = escapeHtml(route.imageCaption || route.title);
    const jsonLd = buildRouteJsonLd(route, baseUrl, canonicalUrl, imageUrl);

    let routeHtml = baseHtml;

    routeHtml = routeHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`);
    routeHtml = routeHtml.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${safeDesc}" />`
    );
    routeHtml = routeHtml.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:type" content="${escapeHtml(route.ogType || 'website')}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${safeTitle}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${safeDesc}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${imageUrl}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image:alt" content="${safeCaption}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${safeTitle}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${safeDesc}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${imageUrl}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta\s+name="twitter:image:alt"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image:alt" content="${safeCaption}" />`
    );

    // Inject route-specific JSON-LD script right before </head>
    const routeLdTag = `    <script id="route-structured-data" type="application/ld+json">${jsonLd}</script>\n  </head>`;
    routeHtml = routeHtml.replace('</head>', routeLdTag);

    // Update <noscript> block with route-specific H1 and summary for crawlers
    const routeNoscript = `<noscript>
      <main style="max-width: 960px; margin: 40px auto; padding: 24px; font-family: sans-serif; color: #F2F7FB; background: #050A12;">
        <h1>${escapeHtml(route.h1 || route.title)}</h1>
        <p>${escapeHtml(route.summary || route.description)}</p>
        <p><a href="/">Return to Syntellum Systems Home</a> | <a href="/what-we-do">Capabilities</a> | <a href="/contact">Contact Us</a></p>
      </main>
    </noscript>`;
    routeHtml = routeHtml.replace(/<noscript>[\s\S]*?<\/noscript>/, routeNoscript);

    // Write as clean .html snapshot (e.g., dist/what-we-do.html, dist/services/generative-applied-ai.html)
    // Served cleanly via .htaccess internal rewrite without directory trailing-slash redirects
    const outPath = path.join(distDir, `${cleanPath}.html`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, routeHtml, 'utf-8');
    generatedCount++;
  }

  console.log(`[seo-prerender] Generated ${generatedCount} static route SEO snapshots in dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderSeoRoutes();
}
