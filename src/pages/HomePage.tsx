import React, { useState } from 'react';
import { Link } from '../router.tsx';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
  Workflow,
  Users2,
  CheckCircle,
  Code2,
  Server,
  Sparkles,
  ChevronRight,
  Boxes,
  Lock,
  Binary,
  GitBranch,
  Network,
  Activity,
  FileCheck2,
  TerminalSquare
} from 'lucide-react';
import { CAPABILITY_PILLARS } from '../data/capabilities.ts';
import { INDUSTRY_DOMAINS } from '../data/industries.ts';
import { HeroNeuralNetworkCanvas } from '../components/HeroNeuralNetworkCanvas.tsx';

export function HomePage() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = CAPABILITY_PILLARS[activePillarIndex];

  return (
    <div className="min-h-screen pt-20 bg-[#050A12] text-[#F2F7FB]">
      {/* =========================================================================
          SECTION 1 — HERO: INTELLIGENCE ARCHITECTURE
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center border-b border-white/10 backdrop-blur-[12px] overflow-hidden bg-[#050A12]">
        {/* Layer 1: Ethereal Photographic Architectural Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/images/backgrounds/1_intelligence-in-motion_hero-page-1_e858282f.jpg"
            alt="Syntellum Systems enterprise architecture and intelligence infrastructure"
            className="w-full h-full object-cover object-right lg:object-center opacity-8 select-none"
            referrerPolicy="no-referrer"
          />
          {/* Seamless Top & Bottom Edge Blends (Melt into Header and Section 2) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A12] via-transparent to-[#050A12] opacity-75" />
          {/* Subtle Directional Contrast Scrim specifically protecting text legibility on the left */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_20%_45%,rgba(5,10,18,0.88)_0%,rgba(5,10,18,0.55)_50%,transparent_100%)]" />
        </div>

        {/* Layer 2: Full-Background Interactive 3D WebGL Neural Matrix */}
        <HeroNeuralNetworkCanvas />

        {/* Layer 3: Typography & Content (Spacious, Elegant, Highly Legible) */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-28 lg:py-36 w-full pointer-events-none">
          <div className="max-w-2xl space-y-10 pointer-events-auto">
            {/* Unboxed Minimal Kicker */}
            <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
              <span className="text-[#5DD9E8] font-medium">Syntellum Systems</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Advisory & Engineering</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Global Delivery</span>
            </div>

            {/* Confident, Refined Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.14]">
              Engineering Intelligence.{' '}
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#5DD9E8]">
                Transforming Operations.
              </span>
            </h1>

            {/* Strategic Value Proposition */}
            <p className="text-base sm:text-lg text-[#A6B6C6] leading-relaxed max-w-xl font-normal">
              Syntellum connects strategic technology advisory with deep engineering execution—building resilient systems, applied AI, and scalable enterprise platforms.
            </p>

            {/* Focused Action CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-all duration-150 shadow-lg shadow-cyan-500/15 active:translate-y-px whitespace-nowrap"
              >
                <span>Discuss a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/what-we-do"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#F2F7FB] bg-white/5 hover:bg-white/10 border border-white/10 rounded-md transition-colors whitespace-nowrap"
              >
                <span>Explore Our Capabilities</span>
                <ArrowRight className="w-4 h-4 text-[#5DD9E8]" />
              </Link>
            </div>

            {/* Quiet, Unboxed Delivery Pillars */}
            <div className="pt-10 border-t border-white/10 flex flex-wrap items-center gap-y-3 gap-x-8 text-xs text-[#A6B6C6]">
              <div>
                <span className="text-white font-medium">Strategic Advisory</span>
                <span className="text-white/30 mx-2">/</span>
                <span>Enterprise Architecture</span>
              </div>
              <div>
                <span className="text-white font-medium">Deep Engineering</span>
                <span className="text-white/30 mx-2">/</span>
                <span>Applied AI & Platforms</span>
              </div>
              <div>
                <span className="text-white font-medium">Capability Extension</span>
                <span className="text-white/30 mx-2">/</span>
                <span>Specialist Squads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 — POSITIONING: STRATEGY TO OPERATIONAL IMPACT
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#091321]/90 backdrop-blur-[12px] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              The Strategic Premise
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight leading-snug">
              From Technology Strategy to Operational Impact.
            </h2>
            <p className="text-base sm:text-lg text-[#A6B6C6] leading-relaxed max-w-3xl mx-auto">
              Technology creates value when strategy, engineering and execution work together. Syntellum brings these disciplines together to help organisations design, build and operationalise intelligent technology solutions.
            </p>
          </div>

          {/* 3 Interlocking Disciplines Bento */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#101D2C] border border-white/10 rounded-xl space-y-4 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">01. Strategy & Advisory</h3>
              <p className="text-sm text-[#A6B6C6] leading-relaxed">
                We align commercial goals with architectural decisions, evaluating technical feasibility, governance, and infrastructure investment before committing capital.
              </p>
              <div className="pt-2 text-xs font-mono text-[#6F879B]">
                Focus: Roadmaps · Architecture Review · Governance
              </div>
            </div>

            <div className="p-8 bg-[#101D2C] border border-white/10 rounded-xl space-y-4 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">02. Systems Engineering</h3>
              <p className="text-sm text-[#A6B6C6] leading-relaxed">
                We build enterprise-grade software, high-throughput data platforms, and grounded AI pipelines capable of handling production load, latency SLAs, and strict security perimeters.
              </p>
              <div className="pt-2 text-xs font-mono text-[#6F879B]">
                Focus: LLMOps · Data Platforms · Distributed APIs
              </div>
            </div>

            <div className="p-8 bg-[#101D2C] border border-white/10 rounded-xl space-y-4 hover:border-cyan-500/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white">03. Operationalization</h3>
              <p className="text-sm text-[#A6B6C6] leading-relaxed">
                We embed intelligent workflows directly into business routines, integrating ERPs and core systems with human-in-the-loop controls to drive lasting operational leverage.
              </p>
              <div className="pt-2 text-xs font-mono text-[#6F879B]">
                Focus: Automation · Exception Handling · Adoption
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — CORE CAPABILITIES (Five Pillars)
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#050A12]/90 backdrop-blur-[12px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
                Core Capabilities
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Five pillars connecting strategy to delivery.
              </h2>
            </div>
            <Link
              href="/what-we-do"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
            >
              <span>Full Service Architecture</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Asymmetric Interactive Capability Selector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Pillar List Selection */}
            <div className="lg:col-span-5 space-y-2">
              {CAPABILITY_PILLARS.map((pillar, idx) => {
                const isSelected = idx === activePillarIndex;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActivePillarIndex(idx)}
                    className={`w-full text-left p-5 rounded-lg border transition-all duration-150 flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#101D2C] border-cyan-500/40 text-white shadow-md shadow-cyan-950/40'
                        : 'bg-[#091321]/60 border-white/5 text-[#A6B6C6] hover:text-white hover:border-white/15'
                    }`}
                  >
                    <span className="font-mono text-xs text-[#5DD9E8] pt-0.5 font-semibold">
                      {pillar.index}
                    </span>
                    <div className="flex-1">
                      <div className="text-base font-semibold leading-tight mb-1">
                        {pillar.title}
                      </div>
                      <div className="text-xs text-[#6F879B] line-clamp-1 font-normal">
                        {pillar.shortTitle}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isSelected ? 'rotate-90 text-[#5DD9E8]' : 'text-[#6F879B]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Pillar Showcase Panel */}
            <div className="lg:col-span-7 bg-[#091321] border border-white/10 rounded-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#A6B6C6] border-b border-white/10 pb-4">
                  <span className="text-[#5DD9E8]">Pillar {activePillar.index}</span>
                  <span>{activePillar.shortTitle}</span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {activePillar.title}
                </h3>

                <p className="text-base text-[#A6B6C6] leading-relaxed font-normal">
                  {activePillar.summary}
                </p>

                {/* Key Engagements */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Representative Workstreams
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePillar.typicalEngagements.map((eng, eIdx) => (
                      <div
                        key={eIdx}
                        className="p-3.5 bg-[#050A12] border border-white/5 rounded-lg space-y-1.5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {eng.title}
                        </div>
                        <div className="text-xs text-[#A6B6C6] line-clamp-2 leading-relaxed">
                          {eng.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What We Deliver */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold">
                    Core Deliverables
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A6B6C6]">
                    {activePillar.whatWeDeliver.slice(0, 4).map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#5DD9E8] shrink-0" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Detail Page CTA */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/services/${activePillar.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
                  >
                    <span>Explore Further</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href="/contact"
                    className="text-xs text-[#A6B6C6] hover:text-white underline underline-offset-4"
                  >
                    Discuss this Pillar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — HOW WE WORK: PROCESS SEQUENCE
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#091321]/90 backdrop-blur-[12px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Methodology
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              A disciplined, connected process from discovery to scale.
            </h2>
            <p className="text-base text-[#A6B6C6] leading-relaxed">
              We engineer intelligent systems using an iterative, stage-gated delivery lifecycle that protects investments, ensures compliance, and embeds long-term operational capabilities.
            </p>
          </div>

          {/* Connected Process Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Discover',
                badge: 'Stage 01',
                description: 'Understand the organisation, business context, legacy workflows, data perimeters, and measurable priorities.'
              },
              {
                step: '02',
                title: 'Assess',
                badge: 'Stage 02',
                description: 'Identify opportunities, technical constraints, model suitability, latency targets, and capital requirements.'
              },
              {
                step: '03',
                title: 'Architect',
                badge: 'Stage 03',
                description: 'Design the target solution, enterprise schemas, cloud perimeters, API contracts, and integration harnesses.'
              },
              {
                step: '04',
                title: 'Build',
                badge: 'Stage 04',
                description: 'Engineer the solution using production methods, automated test suites, MLOps harnesses, and defensive APIs.'
              },
              {
                step: '05',
                title: 'Integrate',
                badge: 'Stage 05',
                description: 'Connect the solution to existing ERPs, CRMs, and operational consoles, backed by human-in-the-loop review controls.'
              },
              {
                step: '06',
                title: 'Scale',
                badge: 'Stage 06',
                description: 'Optimise performance, monitor model drift, expand capabilities, and transfer operational ownership to your team.'
              }
            ].map((stage) => (
              <div
                key={stage.step}
                className="p-7 bg-[#101D2C] border border-white/10 rounded-xl space-y-3 relative group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#5DD9E8] font-semibold">
                    {stage.badge}
                  </span>
                  <span className="text-xs font-mono text-[#6F879B]">
                    {stage.step}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/approach"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
            >
              <span>Explore Delivery Governance & Architecture Approach</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — APPLIED INTELLIGENCE (Concrete Enterprise Applications)
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#050A12]/90 backdrop-blur-[12px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Applied Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Real-world systems engineered for production reality.
            </h2>
            <p className="text-base text-[#A6B6C6] leading-relaxed">
              We translate advanced models and data engineering into practical applications that solve tangible operational bottlenecks without speculative hype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FileCheck2,
                title: 'Intelligent Document Processing',
                category: 'Operational Processing',
                desc: 'Parsing multi-lingual technical specs, complex engineering drawings, customs declarations, and invoices with automated verification.'
              },
              {
                icon: Network,
                title: 'Enterprise Knowledge Assistants',
                category: 'Grounded RAG',
                desc: 'Client-isolated retrieval-augmented generation systems operating over internal policies, technical manuals, and audit archives.'
              },
              {
                icon: Activity,
                title: 'Predictive Equipment Telemetry',
                category: 'Industrial IoT',
                desc: 'Streaming sensor analytics detecting anomalous vibration, pressure, and thermal degradation patterns before unplanned downtime.'
              },
              {
                icon: Workflow,
                title: 'Operational Decision Support',
                category: 'Agent Orchestration',
                desc: 'Event-driven agent workflows reconciling complex transactions, drafting advisories, and escalating edge cases to human operators.'
              },
              {
                icon: Binary,
                title: 'Data & Systems Integration',
                category: 'Enterprise Middleware',
                desc: 'Modern edge-to-cloud pipelines and API harnesses extracting legacy database records into real-time analytical lakes.'
              },
              {
                icon: Boxes,
                title: 'Supply Chain Operations',
                category: 'Logistics Intelligence',
                desc: 'Dynamic ETA calibration, container demurrage risk scoring, and automated exception routing across global carrier networks.'
              },
              {
                icon: TerminalSquare,
                title: 'AI-Powered Applications',
                category: 'Full-Stack Software',
                desc: 'Bespoke web applications, customer portals, and internal consoles embedding semantic search and conversational interfaces.'
              },
              {
                icon: GitBranch,
                title: 'Production MLOps & LLMOps',
                category: 'Platform Engineering',
                desc: 'Automated evaluation pipelines, latency caching layers, fallback models, and structured cost-observability dashboards.'
              }
            ].map((app, idx) => {
              const IconComp = app.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#091321] border border-white/10 rounded-xl space-y-3 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="text-[11px] font-mono text-[#5DD9E8] uppercase tracking-wider">
                      {app.category}
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {app.title}
                    </h3>
                    <p className="text-xs text-[#A6B6C6] leading-relaxed">
                      {app.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — TARGET INDUSTRIES
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#091321]/90 backdrop-blur-[12px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
                Target Sectors
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                High-complexity operational environments.
              </h2>
            </div>
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
            >
              <span>Explore All 5 Sectors</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRY_DOMAINS.map((domain) => (
              <div
                key={domain.id}
                className="p-8 bg-[#101D2C] border border-white/10 rounded-xl space-y-4 hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-wider">
                    Sector
                  </div>
                  <h3 className="text-xl font-bold text-white">{domain.name}</h3>
                  <p className="text-sm text-[#A6B6C6] leading-relaxed">
                    {domain.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-xs font-mono text-[#6F879B]">Core Application:</div>
                  <div className="text-xs text-white font-medium">
                    {domain.keyUseCases[0]?.title}
                  </div>
                  <div className="text-xs text-[#A6B6C6]">
                    {domain.keyUseCases[0]?.impact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — COMMERCIAL ENGAGEMENT MODELS
          ========================================================================= */}
      <section className="py-24 border-b border-white/10 bg-[#050A12]/90 backdrop-blur-[12px]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Commercial Models
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Two distinct engagement structures designed for enterprise momentum.
            </h2>
            <p className="text-base text-[#A6B6C6] leading-relaxed">
              We adapt to your governance context: delivering scoped end-to-end initiatives with clear accountability, or embedding specialist engineering squads to multiply your in-house velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Model 1: Project-Based Engagement */}
            <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-widest font-semibold">
                  Model 01 · Scoped Delivery
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Project-Based Consulting & Implementation
                </h3>
                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  For organisations seeking strategic advisory, target architecture, technology due diligence, or complete end-to-end software and AI delivery initiatives with defined milestones.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-[#A6B6C6]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>AI opportunity assessments, technical feasibility & roadmap definition</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Target-state enterprise architecture, cloud design & security reviews</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Custom AI systems, knowledge assistants & workflow orchestration builds</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Fixed-scope deliverables with milestone sign-offs and full IP handover</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#6F879B] font-mono">Best for: Specific initiatives & architecture advisory</span>
                <Link
                  href="/contact"
                  className="text-xs font-semibold uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
                >
                  Scope a Project →
                </Link>
              </div>
            </div>

            {/* Model 2: Resource Augmentation */}
            <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-widest font-semibold">
                  Model 02 · Capacity Extension
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Technology Resource Augmentation
                </h3>
                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  For organisations requiring senior technical specialists, AI/ML engineers, data platform architects, or dedicated pods to integrate directly into active product sprint squads.
                </p>
                <ul className="space-y-3 pt-2 text-sm text-[#A6B6C6]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Specialist AI/ML engineers, data engineers, and distributed systems architects</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Seamless integration into client Jira, Slack, CI/CD, and standup practices</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Flexible scaling from single senior specialists to cohesive technical squads</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#5DD9E8] font-mono text-xs mt-0.5">•</span>
                    <span>Accountable capability extension without recruiting delays</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#6F879B] font-mono">Best for: Scaling technical squads & specialist skills</span>
                <Link
                  href="/services/technology-resource-augmentation"
                  className="text-xs font-semibold uppercase tracking-wider text-[#5DD9E8] hover:text-[#438CFF] transition-colors"
                >
                  Explore Talent Pods →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — FINAL CTA: LET'S ENGINEER WHAT'S NEXT
          ========================================================================= */}
      <section className="relative py-28 bg-[#050A12]/90 border-t border-white/10 backdrop-blur-[12px] overflow-hidden">
        {/* Atmospheric Background Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/backgrounds/7_signal-in-the-dark_8fc55d09.jpg"
            alt="Syntellum Systems technology and intelligence architecture"
            className="w-full h-full object-cover object-center opacity-20 pointer-events-none select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/90 to-[#050A12]/70" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center space-y-8 relative z-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
            Initiate Conversation
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Let's Engineer What's Next.
          </h2>

          <p className="text-base sm:text-lg text-[#A6B6C6] max-w-2xl mx-auto leading-relaxed">
            Whether you are defining an AI strategy, modernising technology or building intelligent operations, let's explore what is possible.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-all duration-150 shadow-xl shadow-cyan-500/20 active:translate-y-px"
            >
              <span>Discuss a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:info@syntellum.si"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#A6B6C6] hover:text-white bg-white/5 border border-white/10 rounded-md transition-colors"
            >
              <span>Email info@syntellum.si</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
