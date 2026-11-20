import React from 'react';
import { Link } from '../router.tsx';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'stacked' | 'horizontal';
}

export function Logo({ className = '', size = 'md', variant = 'stacked' }: LogoProps) {
  if (variant === 'horizontal') {
    return (
      <Link
        href="/"
        className={`inline-flex items-baseline gap-3.5 sm:gap-4 group select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DD9E8] rounded-sm ${className}`}
        aria-label="Syntellum Systems Home"
      >
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="font-black text-white text-lg tracking-[0.08em] group-hover:text-[#5DD9E8] transition-colors"
        >
          SYNTELLUM
        </span>
        <span
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          className="font-bold text-[#5DD9E8] text-xs tracking-[0.28em]"
        >
          SYSTEMS
        </span>
      </Link>
    );
  }

  // Stacked mode (Official layout matching the master logo asset with elegant breathing room)
  const sizeStyles = {
    sm: {
      brand: 'text-base tracking-[0.07em]',
      descriptor: 'text-[9px] tracking-[0.28em] mt-1.5',
    },
    md: {
      brand: 'text-xl sm:text-2xl tracking-[0.08em]',
      descriptor: 'text-[10px] sm:text-[11px] tracking-[0.32em] mt-2 sm:mt-2.5',
    },
    lg: {
      brand: 'text-3xl sm:text-4xl tracking-[0.09em]',
      descriptor: 'text-xs sm:text-sm tracking-[0.34em] mt-2.5 sm:mt-3',
    },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DD9E8] rounded-sm ${className}`}
      aria-label="Syntellum Systems Home"
    >
      <span
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        className={`font-black text-white leading-none ${sizeStyles.brand} group-hover:text-[#5DD9E8] transition-colors`}
      >
        SYNTELLUM
      </span>
      <span
        style={{ fontFamily: "'Orbitron', sans-serif" }}
        className={`font-bold text-[#5DD9E8] uppercase leading-none ${sizeStyles.descriptor}`}
      >
        SYSTEMS
      </span>
    </Link>
  );
}
