import React from 'react';
import { Link } from '../router.tsx';
import { Mail, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { ContactForm } from '../components/ContactForm.tsx';

export function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb & Title */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#A6B6C6]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[#5DD9E8]">Contact</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Discuss a Project.
          </h1>

          <p className="text-lg text-[#A6B6C6] leading-relaxed font-normal">
            Whether you are assessing an initial technology roadmap, evaluating an enterprise AI system, or seeking specialist engineering talent—we look forward to reviewing your brief.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-8">
            <ContactForm />
          </div>

          {/* Right Column: Direct Info & Engagement Expectations */}
          <div className="lg:col-span-4 space-y-8">
            {/* Direct Email Card */}
            <div className="p-6 bg-[#091321] border border-white/10 rounded-xl space-y-3">
              <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-widest font-semibold">
                Direct Contact
              </div>
              <h2 className="text-lg font-bold text-white">General & Business Enquiries</h2>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                If you prefer communicating directly via email or have an existing technical specification or RFP document to share:
              </p>
              <div className="pt-2">
                <a
                  href="mailto:info@syntellum.si"
                  className="inline-flex items-center gap-2 text-sm text-[#5DD9E8] hover:text-[#438CFF] font-mono font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>info@syntellum.si</span>
                </a>
              </div>
            </div>

            {/* Engagement Process */}
            <div className="p-6 bg-[#091321] border border-white/10 rounded-xl space-y-4">
              <div className="text-xs font-mono text-[#5DD9E8] uppercase tracking-widest font-semibold">
                What to Expect
              </div>
              <ul className="space-y-3 text-xs text-[#A6B6C6]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#5DD9E8] font-mono font-bold">1.</span>
                  <span>Brief reviewed directly by our senior leadership team.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#5DD9E8] font-mono font-bold">2.</span>
                  <span>Initial technical alignment call or scoping discussion scheduled.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#5DD9E8] font-mono font-bold">3.</span>
                  <span>Mutual NDA executed prior to reviewing sensitive data or proprietary architectures.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#5DD9E8] font-mono font-bold">4.</span>
                  <span>Structured proposal, technical scope, or team composition presented.</span>
                </li>
              </ul>
            </div>

            {/* Privacy & Confidentiality Guarantee */}
            <div className="p-6 bg-[#091321] border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5DD9E8] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Confidentiality Safeguard</span>
              </div>
              <p className="text-xs text-[#A6B6C6] leading-relaxed">
                All communications and project specifications submitted through this form are treated as confidential business information and will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
