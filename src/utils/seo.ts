import seoConfig from '../data/seoRoutes.json';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogType?: string;
  schemaType?: string;
  serviceType?: string;
  image?: string;
  imageCaption?: string;
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

export const SITE_BASE_URL = seoConfig.baseUrl;
export const DEFAULT_OG_IMAGE = seoConfig.defaultImage;

export const ROUTE_METADATA: Record<string, PageMetadata> = {};

for (const route of seoConfig.routes) {
  ROUTE_METADATA[route.path] = {
    title: route.title,
    description: route.description,
    path: route.path,
    ogType: route.ogType,
    schemaType: route.schemaType,
    serviceType: route.serviceType,
    image: route.image,
    imageCaption: route.imageCaption,
    breadcrumbs: route.breadcrumbs,
  };
}

// Alias /services -> canonical /what-we-do
ROUTE_METADATA['/services'] = {
  ...ROUTE_METADATA['/what-we-do'],
};

export const NOT_FOUND_METADATA: PageMetadata = {
  title: 'Page Not Located | Syntellum Systems',
  description: 'The requested page could not be located. Explore Syntellum Systems enterprise AI advisory, engineering, and automation capabilities.',
  path: '/404',
  ogType: 'website',
  image: DEFAULT_OG_IMAGE,
  imageCaption: 'Syntellum Systems enterprise AI and engineering platform',
  noindex: true,
};

function resolveOrigin(): string {
  if (typeof window === 'undefined') return SITE_BASE_URL;
  const { hostname, origin } = window.location;
  if (hostname === 'syntellum.si' || hostname === 'www.syntellum.si') {
    return SITE_BASE_URL;
  }
  return origin || SITE_BASE_URL;
}

function buildRouteJsonLd(meta: PageMetadata, origin: string, canonicalUrl: string): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [];

  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: meta.breadcrumbs.map((crumb, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: crumb.name,
        item: `${origin}${crumb.path === '/' ? '/' : crumb.path}`,
      })),
    });
  }

  const imageUrl = `${origin}${meta.image || DEFAULT_OG_IMAGE}`;

  if (meta.schemaType === 'Service') {
    graph.push({
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: meta.serviceType || meta.title,
      serviceType: meta.serviceType || meta.title,
      description: meta.description,
      url: canonicalUrl,
      image: imageUrl,
      areaServed: {
        '@type': 'Place',
        name: 'Global',
      },
      provider: {
        '@id': `${SITE_BASE_URL}/#organization`,
      },
    });
  } else {
    graph.push({
      '@type': meta.schemaType || 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title,
      description: meta.description,
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      isPartOf: {
        '@id': `${SITE_BASE_URL}/#website`,
      },
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function updateDocumentSEO(pathname: string): void {
  if (typeof document === 'undefined') return;

  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const meta = ROUTE_METADATA[normalizedPath] || NOT_FOUND_METADATA;
  const origin = resolveOrigin();
  const canonicalPath = meta.path === '/404' ? (normalizedPath || '/') : (meta.path === '/' ? '/' : meta.path);
  const canonicalUrl = `${origin}${canonicalPath}`;
  const imageUrl = `${origin}${meta.image || DEFAULT_OG_IMAGE}`;

  // 1. Update <title>
  document.title = meta.title;

  const setOrCreateMeta = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', contentVal);
  };

  // 2. Robots Directive (prevent soft-404 indexing)
  setOrCreateMeta(
    'meta[name="robots"]',
    'name',
    'robots',
    meta.noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
  );

  // 3. Standard Meta Description
  setOrCreateMeta('meta[name="description"]', 'name', 'description', meta.description);

  // 4. OpenGraph Tags
  setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
  setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setOrCreateMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setOrCreateMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', meta.imageCaption || meta.title);

  // 5. Twitter Cards
  setOrCreateMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
  setOrCreateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
  setOrCreateMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', meta.imageCaption || meta.title);

  // 6. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 7. Dynamic Per-Route Schema.org JSON-LD (Breadcrumbs + Service/WebPage)
  const routeLdId = 'route-structured-data';
  let scriptEl = document.getElementById(routeLdId) as HTMLScriptElement | null;
  if (meta.noindex) {
    if (scriptEl) scriptEl.remove();
  } else {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = routeLdId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(buildRouteJsonLd(meta, origin, canonicalUrl));
  }
}
