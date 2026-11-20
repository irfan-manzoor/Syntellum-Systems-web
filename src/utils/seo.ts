export interface PageMetadata {
  title: string;
  description: string;
  path: string;
  ogType?: string;
}

export const ROUTE_METADATA: Record<string, PageMetadata> = {
  '/': {
    title: 'Syntellum Systems | AI & Technology Advisory and Engineering',
    description: 'Syntellum Systems advises executive leadership, architects intelligent systems, and engineers scalable enterprise software and data platforms.',
    path: '/',
    ogType: 'website',
  },
  '/what-we-do': {
    title: 'Enterprise AI & Technology Capabilities | Syntellum Systems',
    description: 'Explore our 5 core capability pillars: strategic AI advisory, generative AI systems, data engineering, process automation, and talent augmentation.',
    path: '/what-we-do',
    ogType: 'website',
  },
  '/services': {
    title: 'Enterprise AI & Technology Capabilities | Syntellum Systems',
    description: 'Explore our 5 core capability pillars: strategic AI advisory, generative AI systems, data engineering, process automation, and talent augmentation.',
    path: '/what-we-do',
    ogType: 'website',
  },
  '/services/ai-technology-advisory': {
    title: 'AI & Technology Advisory | Syntellum Systems',
    description: 'Strategic AI opportunity assessment, enterprise architecture blueprints, technical due diligence, and executive roadmap advisory.',
    path: '/services/ai-technology-advisory',
    ogType: 'article',
  },
  '/services/generative-applied-ai': {
    title: 'Generative AI & Enterprise LLMs | Syntellum Systems',
    description: 'Enterprise RAG knowledge assistants, multi-agent workflows, and document intelligence engineered with human-in-the-loop controls.',
    path: '/services/generative-applied-ai',
    ogType: 'article',
  },
  '/services/ai-data-engineering': {
    title: 'AI, Data & Software Engineering | Syntellum Systems',
    description: 'Resilient cloud backends, streaming lakehouses, high-throughput microservices, and automated MLOps/LLMOps pipelines.',
    path: '/services/ai-data-engineering',
    ogType: 'article',
  },
  '/services/intelligent-operations': {
    title: 'Intelligent Operations & Automation | Syntellum Systems',
    description: 'Automate industrial RFQ processing, invoice reconciliation, and cross-platform ERP/CRM workflows with measurable throughput.',
    path: '/services/intelligent-operations',
    ogType: 'article',
  },
  '/services/technology-resource-augmentation': {
    title: 'Technology Resource Augmentation | Syntellum Systems',
    description: 'Accelerate roadmap velocity with senior, pre-vetted AI/ML engineers, data platform architects, and fractional technical leaders.',
    path: '/services/technology-resource-augmentation',
    ogType: 'article',
  },
  '/industries': {
    title: 'Target Problem Domains & Industries | Syntellum Systems',
    description: 'Tailored architecture for manufacturing, logistics, financial services, software companies, and enterprise shared operations.',
    path: '/industries',
    ogType: 'website',
  },
  '/approach': {
    title: 'Delivery Lifecycle & Approach | Syntellum Systems',
    description: 'A disciplined 6-stage lifecycle from discovery and feasibility modeling through architecture, engineering, and knowledge transfer.',
    path: '/approach',
    ogType: 'website',
  },
  '/about': {
    title: 'About Our Practice & Purpose | Syntellum Systems',
    description: 'Learn about our purpose, operating model, enterprise architecture practice, and senior engineering delivery capabilities.',
    path: '/about',
    ogType: 'website',
  },
  '/security': {
    title: 'Security, Privacy & Governance | Syntellum Systems',
    description: 'Privacy-aware architecture, client VPC isolation, least-privilege RBAC, and strict human-in-the-loop governance safeguards.',
    path: '/security',
    ogType: 'website',
  },
  '/contact': {
    title: 'Discuss a Project | Syntellum Systems',
    description: 'Submit your project brief or technical challenge for direct review by Syntellum Systems practice leadership. Reach us at info@syntellum.si.',
    path: '/contact',
    ogType: 'website',
  },
};

export const NOT_FOUND_METADATA: PageMetadata = {
  title: 'Page Not Located | Syntellum Systems',
  description: 'The requested system route does not exist. Return to the Syntellum Systems homepage to explore our capabilities.',
  path: '/404',
  ogType: 'website',
};

export function updateDocumentSEO(pathname: string): void {
  if (typeof document === 'undefined') return;

  const normalizedPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const meta = ROUTE_METADATA[normalizedPath] || NOT_FOUND_METADATA;

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

  // 2. Standard Meta Description
  setOrCreateMeta('meta[name="description"]', 'name', 'description', meta.description);

  // 3. OpenGraph Tags
  setOrCreateMeta('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setOrCreateMeta('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setOrCreateMeta('meta[property="og:type"]', 'property', 'og:type', meta.ogType || 'website');
  setOrCreateMeta('meta[property="og:url"]', 'property', 'og:url', `https://syntellum.si${meta.path === '/404' ? '' : meta.path}`);

  // 4. Twitter Tags
  setOrCreateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setOrCreateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', `https://syntellum.si${meta.path === '/404' ? '/' : meta.path}`);
}
