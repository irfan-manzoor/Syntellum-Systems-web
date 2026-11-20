import React from 'react';
import { Link } from '../router.tsx';
import { Mail, ArrowUpRight } from 'lucide-react';
import { CAPABILITY_PILLARS } from '../data/capabilities.ts';
import { Logo } from './Logo.tsx';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050A12] text-[#A6B6C6]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#A6B6C6] max-w-sm leading-relaxed">
              Engineering intelligence. Transforming operations. Syntellum helps organisations turn complex technology challenges into intelligent, scalable solutions through strategic advisory, applied AI, engineering and automation.
            </p>
            <div className="pt-2">
              <a
                href="mailto:info@syntellum.si"
                className="inline-flex items-center gap-2 text-sm text-[#5DD9E8] hover:text-[#438CFF] font-mono transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>info@syntellum.si</span>
              </a>
            </div>
            <div className="text-xs text-[#6F879B] pt-2 space-y-1">
              <p>International AI and technology consultancy and delivery partner.</p>
              <p>Official website: https://syntellum.si</p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F2F7FB] font-semibold">
              Capabilities
            </h4>
            <ul className="space-y-2 text-sm">
              {CAPABILITY_PILLARS.map((cap) => (
                <li key={cap.id}>
                  <Link
                    href={`/services/${cap.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {cap.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F2F7FB] font-semibold">
              Organization
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/what-we-do" className="hover:text-white transition-colors">
                  What We Do
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">
                  Target Industries
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-white transition-colors">
                  How We Work
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Our Practice
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Security & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F2F7FB] font-semibold">
              Engagement
            </h4>
            <p className="text-xs text-[#A6B6C6] leading-relaxed">
              Explore how Syntellum can advise your organization or extend your engineering capacity.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F879B]">
          <div>
            © {new Date().getFullYear()} Syntellum Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/security" className="hover:text-[#A6B6C6] transition-colors">
              Security Principles
            </Link>
            <Link href="/about" className="hover:text-[#A6B6C6] transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-[#A6B6C6] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
