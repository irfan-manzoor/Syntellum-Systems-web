import React, { useEffect } from 'react';
import { RouterProvider, useRouter } from './router.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { WhatWeDoPage } from './pages/WhatWeDoPage.tsx';
import { CapabilityDetailPage } from './pages/CapabilityDetailPage.tsx';
import { IndustriesPage } from './pages/IndustriesPage.tsx';
import { ApproachPage } from './pages/ApproachPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { SecurityPage } from './pages/SecurityPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

import { updateDocumentSEO } from './utils/seo.ts';
import { AnimatePresence } from 'motion/react';
import { PageTransition } from './components/PageTransition.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { InteractiveParticleField } from './components/InteractiveParticleField.tsx';

function AppContent() {
  const { pathname } = useRouter();

  // Dynamic SEO metadata & title update per route context
  useEffect(() => {
    updateDocumentSEO(pathname);
  }, [pathname]);

  // Route routing logic
  const renderRoute = () => {
    if (pathname === '/' || pathname === '') {
      return <HomePage />;
    }
    if (pathname === '/what-we-do' || pathname === '/services') {
      return <WhatWeDoPage />;
    }
    if (pathname.startsWith('/services/')) {
      const slug = pathname.replace('/services/', '').replace(/\/$/, '');
      return <CapabilityDetailPage slug={slug} />;
    }
    if (pathname === '/industries') {
      return <IndustriesPage />;
    }
    if (pathname === '/approach') {
      return <ApproachPage />;
    }
    if (pathname === '/about') {
      return <AboutPage />;
    }
    if (pathname === '/security') {
      return <SecurityPage />;
    }
    if (pathname === '/contact') {
      return <ContactPage />;
    }
    return <NotFoundPage />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050A12] text-[#F2F7FB] selection:bg-[#5DD9E8]/20 selection:text-[#5DD9E8] relative">
      {/* Layer 9999: Custom Precision HUD Magnetic Cursor */}
      <CustomCursor />

      {/* Layer 50: Fixed Global Navigation Header */}
      <Header />

      {/* Main Layout Stacking Context */}
      <main className="flex-grow flex flex-col relative z-0">
        {/* Layer 10: Subtle CSS CRT HUD Scanline & Sweep Atmosphere (Strictly underneath all content) */}
        <div className="crt-overlay pointer-events-none select-none z-10" aria-hidden="true">
          <div className="crt-scanlines" />
          <div className="crt-glow-sweep" />
        </div>

        {/* Layer 10: Subtle Interactive Particle Background (Gravitates to Mouse Cursor & Connects) */}
        <InteractiveParticleField />

        {/* Layer 20: Section Content, Headers, Interactive Affordances, and Canvases */}
        <div className="relative z-20 flex-grow flex flex-col">
          <AnimatePresence mode="wait">
            <PageTransition routeKey={pathname}>
              {renderRoute()}
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>

      {/* Layer 30: Global Footer */}
      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
