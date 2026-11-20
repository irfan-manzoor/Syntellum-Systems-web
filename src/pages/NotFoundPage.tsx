import React from 'react';
import { Link } from '../router.tsx';
import { ArrowLeft, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen pt-36 pb-24 flex items-center justify-center px-6 bg-[#050A12] text-[#F2F7FB]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-xs font-mono uppercase tracking-widest text-[#5DD9E8]">
          Error 404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Page Not Located
        </h1>
        <p className="text-sm text-[#A6B6C6] leading-relaxed">
          The requested system route does not exist or has been relocated.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#050A12] bg-[#5DD9E8] rounded-md hover:bg-[#438CFF] hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            href="/what-we-do"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#A6B6C6] bg-white/5 border border-white/10 rounded-md hover:text-white transition-colors"
          >
            <span>View Capabilities</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
