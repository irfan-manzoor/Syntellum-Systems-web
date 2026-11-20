import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  company: string;
  role: string;
  interest: string;
  message: string;
  hp_field: string;
}

export function ContactForm({ defaultInterest = '' }: { defaultInterest?: string }) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    company: '',
    role: '',
    interest: defaultInterest || 'AI & Technology Advisory',
    message: '',
    hp_field: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please provide your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email.trim())) {
      errs.email = 'Please provide a valid business email address.';
    }
    if (!form.company.trim() || form.company.trim().length < 2) {
      errs.company = 'Please provide your company or organisation name.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = 'Please provide details about your project or initiative (minimum 10 characters).';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.hp_field) {
      // Bot trapped
      setStatus('success');
      setSuccessMessage('Thank you for reaching out. We will get in touch shortly.');
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus('success');
        setSuccessMessage(
          data.message ||
            'Thank you for reaching out to Syntellum Systems. We have received your brief and will respond promptly.'
        );
        setForm({
          name: '',
          email: '',
          company: '',
          role: '',
          interest: 'AI & Technology Advisory',
          message: '',
          hp_field: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(
          data?.message ||
            'We were unable to process your enquiry. Please email us directly at info@syntellum.si.'
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        'A network connection error occurred. Please contact us directly at info@syntellum.si.'
      );
    }
  };

  return (
    <div className="bg-[#0b1018] border border-white/10 rounded-xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Subtle top hairline gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0" />

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight mb-2">
          Start a Conversation
        </h3>
        <p className="text-sm text-slate-400 leading-relaxed">
          Tell us about your strategic priorities, technical architecture, or delivery challenges. Our leadership team reviews every brief directly.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-8 text-center bg-cyan-950/30 border border-cyan-500/30 rounded-lg space-y-4 animate-in fade-in">
          <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
          <h4 className="text-lg font-bold text-white">Message Transmitted</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {successMessage}
          </p>
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field (hidden from genuine users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_field">Leave this field blank</label>
            <input
              type="text"
              id="hp_field"
              name="hp_field"
              tabIndex={-1}
              autoComplete="off"
              value={form.hp_field}
              onChange={(e) => setForm({ ...form, hp_field: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-lg flex items-start gap-3 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="text-xs text-red-300">
                  Direct contact:{' '}
                  <a href="mailto:info@syntellum.si" className="underline font-mono">
                    info@syntellum.si
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Your Full Name <span className="text-cyan-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                }}
                placeholder="e.g. Elena Vance"
                className={`w-full bg-[#07090e] border ${
                  fieldErrors.name ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
                } rounded-md px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
              />
              {fieldErrors.name && (
                <p className="text-xs text-red-400 mt-1.5">{fieldErrors.name}</p>
              )}
            </div>

            {/* Business Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Business Email <span className="text-cyan-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                }}
                placeholder="elena@enterprise.com"
                className={`w-full bg-[#07090e] border ${
                  fieldErrors.email ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
                } rounded-md px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
              />
              {fieldErrors.email && (
                <p className="text-xs text-red-400 mt-1.5">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Organisation / Company <span className="text-cyan-400">*</span>
              </label>
              <input
                id="company"
                type="text"
                required
                value={form.company}
                onChange={(e) => {
                  setForm({ ...form, company: e.target.value });
                  if (fieldErrors.company) setFieldErrors({ ...fieldErrors, company: '' });
                }}
                placeholder="e.g. Apex Industrial Systems"
                className={`w-full bg-[#07090e] border ${
                  fieldErrors.company ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
                } rounded-md px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
              />
              {fieldErrors.company && (
                <p className="text-xs text-red-400 mt-1.5">{fieldErrors.company}</p>
              )}
            </div>

            {/* Role / Function */}
            <div>
              <label htmlFor="role" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Your Role / Title <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                id="role"
                type="text"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. VP Engineering, CTO, COO"
                className="w-full bg-[#07090e] border border-white/10 focus:border-cyan-400 rounded-md px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Area of Interest */}
          <div>
            <label htmlFor="interest" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Primary Area of Engagement
            </label>
            <select
              id="interest"
              value={form.interest}
              onChange={(e) => setForm({ ...form, interest: e.target.value })}
              className="w-full bg-[#07090e] border border-white/10 focus:border-cyan-400 rounded-md px-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
            >
              <option value="AI & Technology Advisory">AI & Technology Advisory</option>
              <option value="Generative AI & Applied AI">Generative AI & Applied AI Systems</option>
              <option value="AI, Data & Software Engineering">AI, Data & Software Engineering</option>
              <option value="Intelligent Operations & Automation">Intelligent Operations & Automation</option>
              <option value="Technology Resource Augmentation">Technology Resource Augmentation</option>
              <option value="Enterprise Architecture Assessment">Enterprise Architecture Assessment</option>
              <option value="Other / Comprehensive Transformation">Other / Comprehensive Transformation</option>
            </select>
          </div>

          {/* Message / Brief */}
          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Project Overview or Problem Statement <span className="text-cyan-400">*</span>
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => {
                setForm({ ...form, message: e.target.value });
                if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
              }}
              placeholder="Outline your current technical environment, business objectives, timeline, or capability requirements..."
              className={`w-full bg-[#07090e] border ${
                fieldErrors.message ? 'border-red-500' : 'border-white/10 focus:border-cyan-400'
              } rounded-md px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors leading-relaxed`}
            />
            {fieldErrors.message && (
              <p className="text-xs text-red-400 mt-1.5">{fieldErrors.message}</p>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold uppercase tracking-wider text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 disabled:opacity-50 transition-all duration-150 shadow-md shadow-cyan-500/20 active:translate-y-px"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <span>Transmit Brief</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Or email directly: <a href="mailto:info@syntellum.si" className="text-slate-300 hover:text-cyan-400 underline font-mono">info@syntellum.si</a></span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
