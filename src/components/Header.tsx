import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../router.tsx';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo.tsx';

export function Header() {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1) : 0;
      setScrollProgress(progress);
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'What We Do', href: '/what-we-do' },
    { label: 'Industries', href: '/industries' },
    { label: 'How We Work', href: '/approach' },
    { label: 'About', href: '/about' },
    { label: 'Security & Trust', href: '/security' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        scrolled
          ? 'bg-[#050A12]/92 backdrop-blur-md border-white/10 shadow-xl shadow-black/60'
          : 'bg-[#050A12]/70 backdrop-blur-sm border-white/5'
      }`}
    >
      {/* High-Tech HUD Scroll Position Progress Beam */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 pointer-events-none select-none overflow-hidden z-20">
        {/* Active Progress Fill */}
        <div
          className="h-full bg-gradient-to-r from-[#438CFF] via-[#5DD9E8] to-[#5DD9E8] transition-all duration-75 ease-out relative"
          style={{ width: `${scrollProgress * 100}%` }}
        >
          {/* Leading Glowing Laser Spark */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_8px_#5DD9E8,0_0_16px_#5DD9E8]" />
        </div>

        {/* Tactical HUD Telemetry Tick Markers at 25%, 50%, 75% */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <span className="w-[1px] h-full bg-white/30 absolute left-1/4" />
          <span className="w-[1px] h-full bg-white/50 absolute left-1/2" />
          <span className="w-[1px] h-full bg-white/30 absolute left-3/4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Official Orbitron Brand Wordmark */}
        <Logo size="md" />

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300"
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
                  isActive ? 'text-[#5DD9E8] font-semibold' : 'text-[#A6B6C6]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#5DD9E8] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DD9E8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A12]"
          >
            <span>Discuss a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-md border border-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#07090e] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-300 hover:text-cyan-400 py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
