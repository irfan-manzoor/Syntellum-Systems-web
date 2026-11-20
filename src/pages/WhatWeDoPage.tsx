import React from 'react';
import { Link } from '../router.tsx';
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { CAPABILITY_PILLARS } from '../data/capabilities.ts';
import { EnterpriseTopologyGraph } from '../components/EnterpriseTopologyGraph.tsx';

export function WhatWeDoPage() {
  const getPillarCtaText = (slug: string): string => {
    switch (slug) {
      case 'ai-technology-advisory':
        return 'Explore Advisory Practice';
      case 'generative-applied-ai':
        return 'Explore Applied AI Systems';
      case 'ai-data-engineering':
        return 'Explore Engineering Scope';
      case 'intelligent-operations':
        return 'Explore Operations Automation';
      case 'technology-resource-augmentation':
        return 'Explore Talent Augmentation';
      default:
        return 'Explore Pillar Scope';
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Breadcrumb & Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#5DD9E8]">What We Do</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            End-to-End Capability: Strategy to Systems.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            Syntellum Systems combines technology advisory with production engineering and specialist talent augmentation. We partner with organisations to solve complex architecture challenges, deploy intelligent software, and modernize operations.
          </p>
        </div>

        {/* Visual Hero Banner */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[360px]">
          <img
            src="/assets/images/backgrounds/6_blueprint-to-execution_d2a87b42.jpg"
            alt="Syntellum Systems capability architecture from blueprint to execution"
            className="w-full h-full object-cover object-center max-h-[360px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#A6B6C6]">
            <span className="text-[#5DD9E8]">Comprehensive Capability Framework</span>
            <span>5 Core Pillars · Strategy to Production</span>
          </div>
        </div>

        {/* Interactive Systems Topology Lattice (D3 Force Simulation) */}
        <section className="mb-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5DD9E8] shadow-[0_0_8px_#5DD9E8]" />
                Dynamic Systems Lattice
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Enterprise AI Architecture & Connected Data Topology
              </h2>
              <p className="text-sm text-[#A6B6C6] max-w-2xl leading-relaxed">
                Explore how Syntellum orchestrates strategic governance, multi-model generative intelligence, high-throughput streaming platforms, and deterministic enterprise execution in production.
              </p>
            </div>
            <div className="text-xs font-mono text-[#6F879B] hidden sm:block">
              Interactive: Click nodes to inspect telemetry · Drag to reconfigure
            </div>
          </div>

          <EnterpriseTopologyGraph />
        </section>

        {/* 5 Core Pillars Full Breakdown */}
        <div className="space-y-12">
          {CAPABILITY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              id={pillar.slug}
              className="p-8 sm:p-12 bg-[#091321] border border-white/10 rounded-xl relative overflow-hidden hover:border-cyan-500/30 transition-all"
            >
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 pb-8 border-b border-white/10">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#5DD9E8] font-semibold">
                    <span>Pillar {pillar.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pillar.shortTitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {pillar.title}
                  </h2>
                  <p className="text-base text-[#A6B6C6] leading-relaxed max-w-2xl">
                    {pillar.tagline}
                  </p>
                </div>

                <div className="lg:col-span-4 flex lg:justify-end">
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span>{getPillarCtaText(pillar.slug)}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Problems Addressed */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Problems We Address
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#A6B6C6]">
                    {pillar.problemsAddressed.slice(0, 4).map((prob, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Deliver */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Tangible Deliverables
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#A6B6C6]">
                    {pillar.whatWeDeliver.slice(0, 4).map((deliv, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#5DD9E8] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome Categories */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Expected Outcomes
                  </h3>
                  <ul className="space-y-2.5 text-sm text-[#A6B6C6]">
                    {pillar.outcomeCategories.map((outcome, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">→</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-[#6F879B] block mb-1">
                      Target Stack:
                    </span>
                    <span className="text-xs text-[#A6B6C6]">
                      {pillar.coreTechnologies.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-10 bg-[#101D2C] border border-white/10 rounded-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Unsure which capability fits your current challenge?
          </h2>
          <p className="text-sm text-[#A6B6C6] max-w-xl mx-auto leading-relaxed">
            We frequently run introductory scoping conversations to help executives determine whether they need strategic advisory, direct engineering, or embedded team extension.
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
