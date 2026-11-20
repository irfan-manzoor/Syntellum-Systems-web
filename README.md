# Syntellum Systems

Enterprise AI & Technology Consultancy and Delivery Platform (`syntellum.si`).

Syntellum Systems advises executive leadership, architects intelligent systems, and engineers resilient enterprise software, applied AI, and scalable data platforms. This repository contains the interactive web application featuring custom Three.js WebGL neural visualizations, D3 enterprise topology graphs, velocity-reactive HUD canvas effects, dynamic per-route SEO, and a Hostinger-ready production build pipeline.

---

## Key Features

- **Full-Bleed WebGL Neural Topology (`HeroNeuralNetworkCanvas`)**: Stationary, evenly distributed 3D neural lattice built with Three.js featuring localized pointer proximity activation and subtle synaptic signal packets.
- **Velocity-Reactive Ambient Particle Mesh (`InteractiveParticleField`)**: Full-viewport HTML5 Canvas particle network that gently gravitates toward and tethers to a calm cursor, dynamically switching to radial + directional-wake repulsion when the cursor sweeps quickly.
- **Precision HUD Cursor (`CustomCursor`)**: Hardware-accelerated pointer ribbon with micro-sparks and magnetic lock-on ripples with cardinal HUD ticks over interactive links and buttons (automatically disabled on touch devices).
- **Enterprise Topology Visualization (`EnterpriseTopologyGraph`)**: D3.js force-directed architectural graph illustrating multi-layer enterprise AI system dependencies.
- **Explicit Z-Index HUD Layering**: Structured depth stack separating background CRT scanline/glow overlays (`z-10`), interactive particle meshes (`z-10`), primary page content (`z-20`), navigation (`z-50`), footer (`z-30`), and custom pointer (`z-9999`).
- **Automated SEO & Sitemap Generation**: Per-route metadata, canonical URLs, OpenGraph/Twitter tags, Schema.org JSON-LD (`src/utils/seo.ts`), and automated `sitemap.xml` generation (`scripts/generate-sitemap.mjs`) integrated into Vite builds.
- **Hostinger Production Readiness**: Includes `.htaccess` SPA rewrite rules, PHP mail contact endpoint (`public/contact.php`) with a local Vite dev middleware mock (`vite.config.ts`), and `robots.txt`.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **3D Graphics** | Three.js |
| **Data Visualization** | D3.js (`d3`) |
| **Motion & Transitions** | Motion (`motion/react`) |
| **Icons** | Lucide React |

---

## Project Structure

```text
├── public/
│   ├── .htaccess                  # Apache/Hostinger SPA routing & caching rules
│   ├── contact.php                # Production contact form mail handler
│   ├── favicon.svg                # Brand icon
│   ├── robots.txt                 # Crawler directives
│   ├── sitemap.xml                # Auto-generated sitemap
│   └── assets/                    # Static imagery & visual assets
├── scripts/
│   └── generate-sitemap.mjs       # Generates public/sitemap.xml & dist/sitemap.xml
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx
│   │   ├── CustomCursor.tsx       # HUD cursor trail & magnetic interaction ripples
│   │   ├── EnterpriseTopologyGraph.tsx # D3 force-directed architecture graph
│   │   ├── Footer.tsx
│   │   ├── Header.tsx             # Navigation & top scroll progress HUD bar
│   │   ├── HeroNeuralNetworkCanvas.tsx # Three.js stationary 3D neural network
│   │   ├── InteractiveParticleField.tsx # Velocity-reactive attraction/repulsion mesh
│   │   ├── Logo.tsx
│   │   └── PageTransition.tsx
│   ├── data/
│   │   ├── capabilities.ts        # Service pillars & technical capability specs
│   │   └── industries.ts          # Domain solutions data
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── WhatWeDoPage.tsx
│   │   ├── CapabilityDetailPage.tsx
│   │   ├── IndustriesPage.tsx
│   │   ├── ApproachPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── SecurityPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── utils/
│   │   └── seo.ts                 # Route-level head metadata & canonical management
│   ├── App.tsx                    # Root layout, router & z-index stacking context
│   ├── index.css                  # Tailwind v4 setup & CRT/HUD utility styles
│   ├── main.tsx                   # React entry point
│   └── router.tsx                 # Lightweight client-side history router
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts                 # Vite config, PHP contact dev mock & sitemap plugin
```

---

## Application Routes

| Route | View |
| --- | --- |
| `/` | Landing page with WebGL neural topology & capabilities overview |
| `/what-we-do` | Service pillars & enterprise capability breakdown |
| `/services/:slug` | Deep-dive pages for each of the 5 core capability pillars |
| `/industries` | Target industries & operational problem domains |
| `/approach` | 6-stage architecture & engineering delivery lifecycle |
| `/about` | Practice overview, purpose, and operating model |
| `/security` | Privacy, VPC isolation, RBAC, and human-in-the-loop governance |
| `/contact` | Project enquiry brief form (`/contact.php` transport) |

---

## Getting Started

### Prerequisites

- **Node.js** 20+ (with `npm` or `bun`)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` if environment configuration is required for local integrations:

```bash
cp .env.example .env
```

See `.env.example` for documented variables (`GEMINI_API_KEY`, `APP_URL`). Never commit `.env` or secret credentials.

### Development Server

Starts the Vite development server on port `3000` (with `/contact.php` simulated via `phpContactDevPlugin` in `vite.config.ts`):

```bash
npm run dev
```

### Type-Checking & Linting

```bash
npm run lint
```

### Production Build

Generates the dynamic `sitemap.xml` and compiles optimized production assets into `dist/`:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

---

## Deployment (Hostinger / Static + PHP Hosting)

1. Run `npm run build` to generate the `dist/` bundle (including `.htaccess`, `contact.php`, `robots.txt`, `sitemap.xml`, `index.html`, and `assets/`).
2. Upload the contents of `dist/` directly into your web root (e.g., `public_html/`).
3. Ensure PHP mail transport is enabled on the host so `contact.php` can process form submissions from `/contact`.
