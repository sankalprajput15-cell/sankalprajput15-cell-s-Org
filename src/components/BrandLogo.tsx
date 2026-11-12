import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'mark' | 'wordmark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  // Single-element wordmark strictly for the Top Bar Contract
  if (variant === 'wordmark') {
    return (
      <span className={`font-display text-sm sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 ${className}`}>
        Jel Japan Enterprise <span className="text-[#F1C40F]">Ltd.</span>
      </span>
    );
  }

  const markDimensions = {
    sm: { size: 36, viewBox: '0 0 100 100' },
    md: { size: 48, viewBox: '0 0 100 100' },
    lg: { size: 64, viewBox: '0 0 100 100' },
  }[size];

  const emblem = (
    <div
      className="relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
      style={{ width: markDimensions.size, height: markDimensions.size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="50%" stopColor="#F1C40F" />
            <stop offset="100%" stopColor="#D4AC0D" />
          </linearGradient>
          <linearGradient id="goldGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F1C40F" />
            <stop offset="100%" stopColor="#B7950B" />
          </linearGradient>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B192C" />
            <stop offset="100%" stopColor="#060E18" />
          </linearGradient>
        </defs>

        {/* Outer Circular Rim with Gold Border */}
        <circle cx="50" cy="50" r="47" fill="url(#navyGrad)" stroke="url(#goldGradPrimary)" strokeWidth="2.5" />
        
        {/* Inner Fine Compass Ring */}
        <circle cx="50" cy="50" r="42" stroke="url(#goldGradDark)" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.8" />

        {/* Compass Cardinal Points / Tick Marks */}
        <line x1="50" y1="3" x2="50" y2="7" stroke="url(#goldGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="50" y1="93" x2="50" y2="97" stroke="url(#goldGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="3" y1="50" x2="7" y2="50" stroke="url(#goldGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="93" y1="50" x2="97" y2="50" stroke="url(#goldGradPrimary)" strokeWidth="1.8" strokeLinecap="round" />

        {/* Navigation Star at 12 O'Clock */}
        <path
          d="M50 11 L52 16 L57 18 L52 20 L50 25 L48 20 L43 18 L48 16 Z"
          fill="url(#goldGradPrimary)"
        />

        {/* Anchor Ring */}
        <circle cx="50" cy="30" r="5" stroke="url(#goldGradPrimary)" strokeWidth="2" fill="none" />
        
        {/* Central Vertical Stock / Shaft */}
        <rect x="48.5" y="35" width="3" height="34" rx="1.5" fill="url(#goldGradPrimary)" />

        {/* Horizontal Crossbeam / Yardarm */}
        <rect x="36" y="42" width="28" height="2.8" rx="1.4" fill="url(#goldGradPrimary)" />
        <circle cx="36" cy="43.4" r="1.8" fill="url(#goldGradPrimary)" />
        <circle cx="64" cy="43.4" r="1.8" fill="url(#goldGradPrimary)" />

        {/* Maritime Vessel Bow / Ocean Waves Curve */}
        <path
          d="M26 58 C34 74 66 74 74 58 C68 66 58 69 50 69 C42 69 32 66 26 58 Z"
          fill="url(#goldGradDark)"
        />

        {/* Anchor Flukes */}
        <path
          d="M25 56 C28 73 72 73 75 56"
          stroke="url(#goldGradPrimary)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        <polygon points="23,54 28,58 24,62" fill="url(#goldGradPrimary)" />
        <polygon points="77,54 72,58 76,62" fill="url(#goldGradPrimary)" />

        {/* Maritime Latitude Coordinates */}
        <text
          x="50"
          y="83"
          textAnchor="middle"
          fill="#F1C40F"
          fontSize="4.8"
          fontWeight="700"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="1.2"
          opacity="0.95"
        >
          10°N • 61°W
        </text>

        <text
          x="50"
          y="89"
          textAnchor="middle"
          fill="#94A3B8"
          fontSize="3.8"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="0.8"
        >
          POINT LISAS
        </text>
      </svg>
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{emblem}</div>;
  }

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 group select-none min-w-0 ${className}`}>
      {emblem}
      <div className="flex flex-col min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-1.5 leading-tight">
          <span
            className={`font-display font-extrabold tracking-tight ${
              isLight ? 'text-white' : 'text-[#060E18]'
            } ${
              size === 'sm' ? 'text-sm sm:text-base' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base sm:text-xl'
            }`}
          >
            JEL JAPAN ENTERPRISE
          </span>
          <span
            className={`font-display font-extrabold ${
              size === 'sm' ? 'text-sm sm:text-base' : size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base sm:text-xl'
            } text-[#F1C40F]`}
          >
            LTD.
          </span>
        </div>
        <span
          className={`font-medium mt-0.5 leading-snug ${
            isLight ? 'text-slate-300' : 'text-slate-600'
          } ${size === 'sm' ? 'text-[10px]' : 'text-[11px] sm:text-xs'}`}
        >
          Buyer &amp; Merchant Exporter · Port of Point Lisas, T&amp;T
        </span>
      </div>
    </div>
  );
};
