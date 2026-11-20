import React from 'react';
import { Link } from '../router.tsx';
import { ArrowUpRight, ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2 } from 'lucide-react';

export function SecurityPage() {
  const principles = [
    {
      icon: Server,
      title: 'Client-Controlled Environments',
      description: 'Where required, we architect solutions to run entirely inside your own Virtual Private Cloud (AWS VPC, GCP VPC, Azure VNet) or dedicated enterprise tenancy. Data never crosses outside your authorised network boundaries without explicit encryption and access controls.'
    },
    {
      icon: EyeOff,
      title: 'Zero Data Retention & Minimisation',
      description: 'When integrating with commercial model providers, we configure zero-data-retention (ZDR) agreements and enterprise API tiers to ensure that client data is never stored, indexed, or used to train third-party foundation models.'
    },
    {
      icon: Lock,
      title: 'Least-Privilege & Role-Based Access Control',
      description: 'All system components, vector search indexes, API routes, and database connections are governed by strict RBAC and fine-grained IAM policies. Credentials are never hardcoded and are rotated via secrets management vaults.'
    },
    {
      icon: ShieldCheck,
      title: 'Defensive Prompt & Input Sanitisation',
      description: 'Every user-facing and document-processing pipeline includes multi-stage sanitisation layers designed to detect and block prompt injection, system prompt leakage, and unauthorized data exfiltration attempts.'
    },
    {
      icon: CheckCircle2,
      title: 'Human-in-the-Loop Safeguards',
      description: 'We enforce automated confidence scoring. Any transaction, classification, or extraction falling below strict certainty thresholds is automatically isolated and routed to authorised human personnel for review.'
    },
    {
      icon: FileText,
      title: 'Contractual & NDA Safeguards',
      description: 'All engagements operate under bilateral non-disclosure agreements (NDAs) and clear contractual terms guaranteeing full client intellectual property ownership and confidentiality for all custom code and configurations.'
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
            <span className="text-[#5DD9E8]">Security & Trust</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Security, Privacy & Responsible Governance.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            Enterprise AI cannot rely on good intentions. We build defensive architectures, enforce least-privilege data boundaries, and maintain auditable transparency across every intelligent pipeline.
          </p>

          <div className="p-4 bg-[#091321] border border-white/10 rounded-lg text-xs text-[#A6B6C6] leading-relaxed">
            <span className="font-mono text-[#5DD9E8] uppercase font-semibold block mb-0.5">
              Honest Compliance Posture:
            </span>
            Syntellum Systems designs systems to support enterprise compliance regimes (including GDPR alignment, SOC 2 controls, and HIPAA data segregation patterns). We explain concrete architectural mechanisms rather than claiming unverified third-party certifications.
          </div>
        </div>

        {/* Visual Hero Banner */}
        <div className="mb-20 rounded-xl overflow-hidden border border-white/10 relative max-h-[360px]">
          <img
            src="/assets/images/backgrounds/7_signal-in-the-dark_8fc55d09.jpg"
            alt="Syntellum Systems enterprise security perimeters and defensive infrastructure"
            className="w-full h-full object-cover object-center max-h-[360px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A12] via-[#050A12]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#A6B6C6]">
            <span className="text-[#5DD9E8]">Defensive Enterprise Perimeters</span>
            <span>Client VPC Isolation · Zero Data Retention · Least Privilege</span>
          </div>
        </div>

        {/* 6 Core Security Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#091321] border border-white/10 rounded-xl space-y-4 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#5DD9E8]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#A6B6C6] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Architecture Safeguards */}
        <div className="p-8 sm:p-10 bg-[#091321] border border-white/10 rounded-xl space-y-8 mb-20">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
              Defensive Engineering
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Technical Controls by Architectural Layer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-3">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Layer 01</span>
              <h3 className="text-base font-semibold text-white">Network & Compute</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                VPC peering, private endpoints, TLS 1.3 in-transit encryption, and strict ingress/egress firewall allowlisting.
              </p>
            </div>

            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-3">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Layer 02</span>
              <h3 className="text-base font-semibold text-white">Data & Embeddings</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                AES-256 at-rest encryption, tenant-isolated vector namespaces, and automated PII anonymisation filters.
              </p>
            </div>

            <div className="p-6 bg-[#101D2C] border border-white/5 rounded-lg space-y-3">
              <span className="text-xs font-mono text-[#5DD9E8] font-semibold block">Layer 03</span>
              <h3 className="text-base font-semibold text-white">Application & APIs</h3>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                Rate limiting, cryptographically signed webhooks, automated audit logging, and deterministic fallback logic.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 bg-[#101D2C] border border-white/10 rounded-xl text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Need to review our technical security posture?
          </h2>
          <p className="text-sm text-[#A6B6C6] max-w-xl mx-auto leading-relaxed">
            Our principal architects are available for architecture reviews and vendor risk assessment calls under bilateral NDA.
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
