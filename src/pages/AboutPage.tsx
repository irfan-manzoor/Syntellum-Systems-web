import React from 'react';
import { Link } from '../router.tsx';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Cpu, Target, Network, Layers } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#5DD9E8]">About</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Engineering Intelligence. Transforming Operations.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            Syntellum Systems is an international AI and technology consultancy and delivery partner. We connect technology strategy with practical implementation—helping organisations advise, architect, engineer and operationalise intelligent systems.
          </p>
        </div>

        {/* Visual Hero Banner with Official Architecture Asset */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[380px]">
          <img
            src="/assets/images/backgrounds/2_architecture-of-decisions-1_6b683854.jpg"
            alt="Syntellum Systems architecture and technology consulting"
            className="w-full h-full object-cover object-center max-h-[380px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#A6B6C6]">
            <span className="text-[#5DD9E8]">Architectural Discipline</span>
            <span>Client-Controlled Environments</span>
          </div>
        </div>

        {/* Philosophy & Operating Model */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-4">
            <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-wider">
              Our Positioning & Philosophy
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Technology creates value when strategy and execution work together.
            </h2>
            <p className="text-sm text-[#A6B6C6] leading-relaxed">
              In an industry crowded with superficial AI wrappers and disconnected management slide decks, we believe enduring competitive advantage requires rigorous systems thinking, verified data foundations, and disciplined engineering execution. We are not an automation vendor or tools reseller; we are a serious technology partner that can advise, architect, build, integrate and scale.
            </p>
            <p className="text-sm text-[#A6B6C6] leading-relaxed">
              We evaluate genuine operational context, design architectures that respect privacy, compliance and infrastructure cost constraints, and engineer software that performs with deterministic reliability.
            </p>
          </div>

          <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-4">
            <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-wider">
              Operating Model
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Senior leadership directing specialist engineering squads.
            </h2>
            <p className="text-sm text-[#A6B6C6] leading-relaxed">
              Syntellum operates with an agile, high-trust model: experienced practice leadership directly oversees engagements while deploying senior specialist engineering pods assembled for the precise technical demands of each initiative.
            </p>
            <p className="text-sm text-[#A6B6C6] leading-relaxed">
              Clients work directly with practitioners who understand enterprise governance and also write production code, test models, and architect high-concurrency backends.
            </p>
          </div>
        </div>

        {/* Practice Structure & Delivery Organization (No personal names) */}
        <div className="mb-20 space-y-12">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Practice Structure
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              How our practice is organized.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Advisory Practice */}
            <div className="p-8 sm:p-12 bg-[#101D2C] border border-white/10 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Strategic Advisory & Architecture</h3>
                    <div className="text-xs font-mono text-[#5DD9E8]">Executive Alignment & Technical Blueprints</div>
                  </div>
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B]">
                  Strategic Advisory · Enterprise Architecture · Technical Due Diligence
                </div>

                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  Direct engagement leadership connecting executive business priorities with resilient software and intelligence architecture. Guiding enterprise leadership teams through AI opportunity assessments, platform evaluation, operating model design, and technical risk audits.
                </p>

                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  Ensures all technological investments are backed by clear business metrics, defensible cost curves, and verifiable compliance boundaries before capital is committed.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-[#6F879B] font-mono">
                Focus: Architecture Roadmaps, Cloud Design, Vendor Assessment, Delivery Governance.
              </div>
            </div>

            {/* Engineering & Delivery Squads */}
            <div className="p-8 sm:p-12 bg-[#101D2C] border border-white/10 rounded-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Engineering & Delivery Squads</h3>
                    <div className="text-xs font-mono text-[#5DD9E8]">Hands-On Software, AI & Data Systems</div>
                  </div>
                </div>

                <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B]">
                  Production ML · Data Platforms · Distributed APIs · MLOps
                </div>

                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  Cross-functional squads of senior AI/ML engineers, data platform specialists, and full-stack software architects who build production software, robust pipelines, and grounded intelligence loops.
                </p>

                <p className="text-sm text-[#A6B6C6] leading-relaxed">
                  Working either as full-lifecycle turnkey delivery teams or embedding directly into client sprint squads, our engineers deliver code with automated regression tests, MLOps harnesses, and clean documentation.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 text-xs text-[#6F879B] font-mono">
                Focus: Applied AI Engineering, Streaming Pipelines, Enterprise Integration, Team Augmentation.
              </div>
            </div>
          </div>
        </div>

        {/* Principles of Engagement */}
        <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Core Commitments
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Our principles of engagement
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white">1. Direct Candor</div>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                If a proposed AI use case is impractical, uneconomic, or ungrounded, we will say so immediately and suggest a viable engineering alternative.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-white">2. Full IP Ownership</div>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                All custom code, pipeline configurations, prompts, and architectures engineered during the engagement belong 100% to the client.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-white">3. Zero Vendor Lock-In</div>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                We document everything cleanly and train your team so that your organisation can independently operate and evolve the systems we build.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-[#101D2C] border border-white/10 rounded-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Connect directly with Syntellum leadership
          </h2>
          <p className="text-sm text-[#A6B6C6] max-w-xl mx-auto leading-relaxed">
            Discuss your technical strategy or schedule an introductory briefing with our senior practice leadership.
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
