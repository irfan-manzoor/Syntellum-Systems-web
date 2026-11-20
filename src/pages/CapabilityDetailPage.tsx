import React from 'react';
import { Link, useRouter } from '../router.tsx';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Layers,
  Workflow,
  Users2,
  AlertCircle,
} from 'lucide-react';
import { CAPABILITY_PILLARS, CapabilityPillar } from '../data/capabilities.ts';
import { ContactForm } from '../components/ContactForm.tsx';

export function CapabilityDetailPage({ slug }: { slug: string }) {
  const pillar = CAPABILITY_PILLARS.find((p) => p.slug === slug);

  if (!pillar) {
    return (
      <div className="min-h-screen pt-36 pb-24 text-center px-6 bg-[#050A12] text-[#F2F7FB]">
        <h1 className="text-3xl font-bold text-white mb-4">Capability Not Found</h1>
        <p className="text-[#A6B6C6] mb-6">
          The requested capability area does not exist.
        </p>
        <Link
          href="/what-we-do"
          className="text-[#5DD9E8] hover:text-[#438CFF] font-mono text-sm underline"
        >
          Return to Capabilities Overview
        </Link>
      </div>
    );
  }

  // Other pillars for navigation
  const otherPillars = CAPABILITY_PILLARS.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6] mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/what-we-do" className="hover:text-white transition-colors">What We Do</Link>
          <span aria-hidden="true">/</span>
          <span className="text-[#5DD9E8]">{pillar.shortTitle}</span>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#5DD9E8] font-semibold">
            <span>Capability Pillar {pillar.index}</span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Scope</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            {pillar.title}
          </h1>

          <p className="text-xl text-[#F2F7FB] leading-relaxed font-normal">
            {pillar.tagline}
          </p>

          <p className="text-base text-[#A6B6C6] leading-relaxed">
            {pillar.summary}
          </p>

          <div className="pt-2 flex items-center gap-4">
            <a
              href="#contact-section"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors"
            >
              <span>Discuss {pillar.shortTitle}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* High-Fidelity Asset Visual */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[460px]">
          <img
            src={pillar.image}
            alt={`${pillar.title} architectural visualization`}
            className="w-full h-full object-cover object-center max-h-[460px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-transparent to-transparent opacity-80" />
        </div>

        {/* 2-Column Core Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Problems & Typical Engagements */}
          <div className="lg:col-span-7 space-y-12">
            {/* Problems Addressed */}
            <div className="p-8 bg-[#091321] border border-white/10 rounded-xl space-y-4">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#5DD9E8]" />
                <span>The Operational Challenges We Address</span>
              </h2>
              <ul className="space-y-3 pt-2 text-sm text-[#A6B6C6]">
                {pillar.problemsAddressed.map((prob, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span className="leading-relaxed">{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Typical Engagements & Workstreams */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Typical Engagements & Workstreams
              </h2>
              <div className="space-y-4">
                {pillar.typicalEngagements.map((eng, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-[#101D2C] border border-white/10 rounded-lg space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[#5DD9E8] font-semibold">
                      <span>Stream {String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {eng.title}
                    </h3>
                    <p className="text-sm text-[#A6B6C6] leading-relaxed">
                      {eng.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Deliverables, Governance, Outcomes */}
          <div className="lg:col-span-5 space-y-8">
            {/* What Syntellum Delivers */}
            <div className="p-8 bg-[#091321] border border-white/10 rounded-xl space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono text-xs text-[#6F879B]">
                Core Deliverables
              </h2>
              <ul className="space-y-3 text-sm text-[#A6B6C6]">
                {pillar.whatWeDeliver.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#5DD9E8] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Governance & Control */}
            <div className="p-8 bg-[#091321] border border-white/10 rounded-xl space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono text-xs text-[#6F879B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#5DD9E8]" />
                <span>Governance & Integration Controls</span>
              </h2>
              <ul className="space-y-2.5 text-xs text-[#A6B6C6]">
                {pillar.governanceAndControls.map((gov, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#5DD9E8] font-mono text-xs">/</span>
                    <span>{gov}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Outcome Categories */}
            <div className="p-8 bg-[#091321] border border-white/10 rounded-xl space-y-4">
              <h2 className="text-base font-bold text-white tracking-tight uppercase font-mono text-xs text-[#6F879B]">
                Verifiable Outcome Categories
              </h2>
              <ul className="space-y-2.5 text-xs text-[#A6B6C6]">
                {pillar.outcomeCategories.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#5DD9E8] font-mono text-xs">→</span>
                    <span className="font-medium text-[#F2F7FB]">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Embedded Contact Form Jump Section */}
        <div id="contact-section" className="pt-12 mb-20 border-t border-white/10">
          <div className="max-w-3xl mx-auto">
            <ContactForm defaultInterest={pillar.title} />
          </div>
        </div>

        {/* Explore Other Capabilities */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#6F879B] mb-6">
            Explore Other Capabilities
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherPillars.map((other) => (
              <Link
                key={other.id}
                href={`/services/${other.slug}`}
                className="p-5 bg-[#091321] border border-white/10 rounded-lg hover:border-cyan-500/40 transition-colors group"
              >
                <div className="text-xs font-mono text-[#5DD9E8] mb-1">
                  Pillar {other.index}
                </div>
                <div className="text-sm font-semibold text-white group-hover:text-[#5DD9E8] transition-colors mb-2">
                  {other.title}
                </div>
                <div className="text-xs text-[#A6B6C6] line-clamp-2">
                  {other.tagline}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
