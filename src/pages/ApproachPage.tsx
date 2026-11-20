import React from 'react';
import { Link } from '../router.tsx';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Layers, GitBranch, Terminal } from 'lucide-react';

export function ApproachPage() {
  const stages = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Context, workflows, data availability, and business constraints.',
      body: 'We begin by conducting thorough technical discovery workshops with domain stakeholders. Rather than jumping directly to models or code, we map existing business processes, identify structural bottlenecks, inspect sample data distributions, and quantify target success criteria.',
      activities: [
        'Stakeholder and domain operator interviews',
        'Process flow and data pipeline discovery',
        'Regulatory, privacy, and infrastructure constraint audit',
        'Commercial metric definition (cycle times, error rates, throughput)'
      ]
    },
    {
      num: '02',
      title: 'Assess',
      tagline: 'Feasibility modeling, model selection, and risk quantification.',
      body: 'We test whether AI is genuinely the optimal solution or if modern deterministic software engineering is more reliable and cost-effective. We evaluate model performance limits, compute cost projections, and potential operational failure modes.',
      activities: [
        'Technical feasibility benchmarking against baseline datasets',
        'Build vs. buy vs. open-source model evaluation',
        'Compute, token, and infrastructure cost curve modeling',
        'Risk classification and governance perimeter definition'
      ]
    },
    {
      num: '03',
      title: 'Architect',
      tagline: 'Target-state systems, data schemas, security, and API contracts.',
      body: 'We produce detailed engineering specifications and system architecture blueprints. This covers data pipelines, schema contracts, security perimeters, retrieval indexing strategies, and fail-safe integration hooks into your existing enterprise software stack.',
      activities: [
        'Target-state enterprise architecture diagrams',
        'Database, vector index, and API contract specifications',
        'Human-in-the-loop review mechanism architecture',
        'Security boundary, encryption, and access control design'
      ]
    },
    {
      num: '04',
      title: 'Build',
      tagline: 'Iterative engineering sprints, unit testing, and rigorous evaluation.',
      body: 'Our engineers build production-ready code with comprehensive automated tests, deterministic regression harnesses, and model evaluation suites. We work in disciplined two-week sprints with transparent code reviews and staging deployments.',
      activities: [
        'Production backend, pipeline, and UI engineering',
        'Automated ground-truth evaluation suites and latency benchmarks',
        'CI/CD pipeline configuration with zero-downtime rollouts',
        'Defensive error handling and automated fallback logic'
      ]
    },
    {
      num: '05',
      title: 'Integrate',
      tagline: 'Enterprise systems, operational consoles, and team adoption.',
      body: 'We embed the new systems into your operational reality: connecting APIs to ERPs, CRMs, document repositories, and communication hubs. We build operator consoles that give your team total visibility and decisive control over automated actions.',
      activities: [
        'ERP, CRM, and database connector deployment',
        'Human operator triage and exception management console',
        'User acceptance testing with frontline operational staff',
        'End-to-end telemetry and tracing instrumentation'
      ]
    },
    {
      num: '06',
      title: 'Scale',
      tagline: 'Monitoring, drift detection, continuous tuning, and knowledge transfer.',
      body: 'An intelligent system requires ongoing observation. We instrument real-time drift detection, query telemetry, and cost tracing. Simultaneously, we execute structured capability transfer to ensure your permanent team possesses full operational autonomy.',
      activities: [
        '24/7 telemetry for accuracy, latency, and token consumption',
        'Automated drift alerting and dataset re-indexing triggers',
        'Comprehensive technical documentation and runbooks',
        'Engineering pair programming and knowledge handoff'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Title */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#5DD9E8]">How We Work</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Disciplined Delivery. Flexible Engagement.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            We avoid rigid dogmatism and theoretical frameworks that delay execution. Our approach connects strategic intent directly to verified, production-grade software.
          </p>
        </div>

        {/* Visual Hero Banner */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[360px]">
          <img
            src="/assets/images/backgrounds/3_the-intelligence-field_9109da48.jpg"
            alt="Syntellum Systems delivery methodology and connected systems"
            className="w-full h-full object-cover object-center max-h-[360px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#A6B6C6]">
            <span className="text-[#5DD9E8]">Structured Delivery Lifecycle</span>
            <span>Discover → Assess → Architect → Build → Integrate → Scale</span>
          </div>
        </div>

        {/* Flexible Entry Points */}
        <div className="mb-20 p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Entry Models
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Where can Syntellum enter your initiative?
            </h2>
            <p className="text-sm text-[#A6B6C6] max-w-3xl leading-relaxed">
              Every organisation has different internal capability. We adapt our engagement model to where your team needs the most leverage:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Entry A</span>
              <h3 className="text-base font-semibold text-white">Strategic Advisory</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                Evaluating opportunities, building business cases, and creating the target architecture roadmap.
              </p>
            </div>

            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Entry B</span>
              <h3 className="text-base font-semibold text-white">Architectural Review</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                Auditing existing designs, performing due diligence, and fixing bottlenecks before scale.
              </p>
            </div>

            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Entry C</span>
              <h3 className="text-base font-semibold text-white">Turnkey Delivery</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                Full-lifecycle engineering from architecture through deployment and operator enablement.
              </p>
            </div>

            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Entry D</span>
              <h3 className="text-base font-semibold text-white">Team Augmentation</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                Senior specialist AI/ML and data engineers embedded directly into your ongoing sprint squads.
              </p>
            </div>
          </div>
        </div>

        {/* 6-Stage Delivery Timeline */}
        <div className="space-y-12">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              The Lifecycle
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Six stages from concept to production stability.
            </h2>
          </div>

          <div className="space-y-8">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:border-cyan-500/30 transition-all"
              >
                <div className="lg:col-span-4 space-y-3">
                  <div className="text-xs font-mono text-[#5DD9E8] font-semibold">
                    Stage {stage.num}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-[#5DD9E8]/80 font-mono">
                    {stage.tagline}
                  </p>
                </div>

                <div className="lg:col-span-8 space-y-6">
                  <p className="text-sm text-[#A6B6C6] leading-relaxed">
                    {stage.body}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#6F879B] font-semibold mb-3">
                      Key Activities & Outputs:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#A6B6C6]">
                      {stage.activities.map((act, aIdx) => (
                        <div key={aIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5DD9E8] shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Systems Architecture Lattice Crosslink */}
        <div className="mt-16 p-8 bg-[#091321] border border-[#5DD9E8]/30 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_20px_rgba(93,217,232,0.08)]">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5DD9E8] shadow-[0_0_8px_#5DD9E8]" />
              Interactive Architecture Topology
            </div>
            <h3 className="text-xl font-bold text-white">
              Explore Syntellum's Dynamic Multi-Tier AI Systems Lattice
            </h3>
            <p className="text-xs sm:text-sm text-[#A6B6C6] max-w-2xl leading-relaxed">
              Inspect how our delivery lifecycle maps into active production nodes—from strategic governance and multi-model runtime to streaming pipelines and enterprise ERP buses.
            </p>
          </div>
          <Link
            href="/what-we-do"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors whitespace-nowrap"
          >
            <span>Launch Systems Topology</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-[#101D2C] border border-white/10 rounded-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Discuss how this lifecycle applies to your project
          </h2>
          <p className="text-sm text-[#A6B6C6] max-w-xl mx-auto leading-relaxed">
            Every engagement starts with a direct conversation about your objectives, timeline, and current system architecture.
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
