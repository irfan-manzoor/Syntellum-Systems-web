import React from 'react';
import { Link } from '../router.tsx';
import { ArrowUpRight, CheckCircle2, Factory, Truck, Briefcase, Terminal, Building2 } from 'lucide-react';
import { INDUSTRY_DOMAINS } from '../data/industries.ts';

export function IndustriesPage() {
  const icons = [Factory, Truck, Briefcase, Terminal, Building2];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#5DD9E8]">Industries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            High-Impact Problem Domains.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            Syntellum architects intelligent software and data platforms for sectors where reliability, document complexity, and workflow latency directly impact commercial margins.
          </p>

          <div className="p-4 bg-[#091321] border border-white/10 rounded-lg text-xs text-[#A6B6C6] leading-relaxed">
            <span className="font-mono text-[#5DD9E8] uppercase font-semibold block mb-0.5">
              Domain Scope & Rigor:
            </span>
            These industry sectors represent our core architectural focus areas. We evaluate each engagement against sector-specific compliance, latency, and data governance perimeters.
          </div>
        </div>

        {/* Visual Hero Banner */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[360px]">
          <img
            src="/assets/images/backgrounds/4_systems-in-depth_7ab74aab.jpg"
            alt="Syntellum Systems sector-specific systems architecture and operational environments"
            className="w-full h-full object-cover object-center max-h-[360px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#A6B6C6]">
            <span className="text-[#5DD9E8]">Domain-Specific Engineering</span>
            <span>Industrial · Logistics · Financial · Tech · Shared Services</span>
          </div>
        </div>

        {/* Sectors List */}
        <div className="space-y-16">
          {INDUSTRY_DOMAINS.map((domain, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={domain.id}
                id={domain.slug}
                className="p-8 sm:p-12 bg-[#091321] border border-white/10 rounded-xl space-y-8 hover:border-cyan-500/30 transition-all"
              >
                {/* Sector Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#5DD9E8]">
                      <Icon className="w-4 h-4" />
                      <span>Domain 0{idx + 1}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {domain.name}
                    </h2>
                    <p className="text-sm text-[#A6B6C6] max-w-2xl font-normal">
                      {domain.tagline}
                    </p>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors whitespace-nowrap self-start md:self-auto"
                  >
                    <span>Discuss {domain.name.split('&')[0].trim()}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Challenge Overview */}
                <div className="text-sm text-[#A6B6C6] leading-relaxed max-w-4xl">
                  <span className="font-semibold text-white">The Operational Reality: </span>
                  {domain.challengeOverview}
                </div>

                {/* Key Use Cases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {domain.keyUseCases.map((uc, uIdx) => (
                    <div
                      key={uIdx}
                      className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-white">
                          {uc.title}
                        </h3>
                        <p className="text-xs text-[#A6B6C6] leading-relaxed">
                          {uc.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 text-xs">
                        <span className="text-[#5DD9E8] font-mono block mb-0.5">Target Impact:</span>
                        <span className="text-slate-200">{uc.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture Highlights */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Architectural Approaches:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {domain.architectureHighlights.map((arch, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-3 py-1 bg-[#101D2C] border border-white/10 rounded text-[#A6B6C6]"
                      >
                        {arch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-[#101D2C] border border-white/10 rounded-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Have a domain-specific engineering challenge?
          </h2>
          <p className="text-sm text-[#A6B6C6] max-w-xl mx-auto leading-relaxed">
            Schedule an initial technical conversation with our practice leaders to evaluate your operational requirements.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
