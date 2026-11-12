import React from 'react';

interface DivisionGraphicProps {
  divisionId: string;
  hsCode: string;
  categoryLabel: string;
}

export const DivisionVisualHeader: React.FC<DivisionGraphicProps> = ({
  divisionId,
  hsCode,
  categoryLabel,
}) => {
  return (
    <div className="relative h-44 sm:h-48 w-full bg-[#07111E] overflow-hidden border-b border-slate-200 select-none">
      {/* Subtle architectural blueprint grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1E3E62 1px, transparent 1px), linear-gradient(to bottom, #1E3E62 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient industrial lighting gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050B12] via-[#0B192C]/85 to-[#152C48]/70" />

      {/* Division-specific realistic technical SVG schematic */}
      <div className="absolute inset-0 flex items-center justify-end pr-2 sm:pr-6 opacity-40 sm:opacity-90">
        {divisionId === 'div1' && (
          <svg viewBox="0 0 320 160" className="w-44 sm:w-64 h-28 sm:h-36" fill="none">
            {/* Industrial Stainless Conveyor & Food Processing Line Schematic */}
            <rect x="20" y="95" width="280" height="18" rx="9" stroke="#F1C40F" strokeWidth="2" fill="#0B192C" />
            <circle cx="35" cy="104" r="6" fill="#F1C40F" />
            <circle cx="95" cy="104" r="6" fill="#64748B" />
            <circle cx="155" cy="104" r="6" fill="#64748B" />
            <circle cx="215" cy="104" r="6" fill="#64748B" />
            <circle cx="285" cy="104" r="6" fill="#F1C40F" />
            {/* Stainless Processing Hoppers & Gauges */}
            <path d="M55 32 H115 L103 82 H67 Z" stroke="#94A3B8" strokeWidth="2" fill="#152C48" />
            <rect x="65" y="24" width="40" height="8" fill="#F1C40F" />
            <rect x="155" y="38" width="68" height="46" rx="3" stroke="#94A3B8" strokeWidth="2" fill="#152C48" />
            <circle cx="177" cy="58" r="10" stroke="#F1C40F" strokeWidth="1.8" fill="#060E18" />
            <path d="M177 58 L183 52" stroke="#F1C40F" strokeWidth="1.8" />
            <rect x="197" y="48" width="16" height="22" stroke="#64748B" strokeWidth="1.5" />
            {/* Bottling / Packaging Vertical Head */}
            <rect x="250" y="28" width="32" height="42" stroke="#F1C40F" strokeWidth="1.8" fill="#152C48" />
            <line x1="258" y1="70" x2="258" y2="90" stroke="#F1C40F" strokeWidth="2" />
            <line x1="274" y1="70" x2="274" y2="90" stroke="#F1C40F" strokeWidth="2" />
            {/* Structural Support Legs */}
            <line x1="45" y1="113" x2="45" y2="145" stroke="#94A3B8" strokeWidth="3" />
            <line x1="160" y1="113" x2="160" y2="145" stroke="#94A3B8" strokeWidth="3" />
            <line x1="275" y1="113" x2="275" y2="145" stroke="#94A3B8" strokeWidth="3" />
            <line x1="20" y1="145" x2="300" y2="145" stroke="#475569" strokeWidth="2" />
          </svg>
        )}

        {divisionId === 'div2' && (
          <svg viewBox="0 0 320 160" className="w-44 sm:w-64 h-28 sm:h-36" fill="none">
            {/* 1000kg FIBC Bulk Bags & Granular Urea Assay Diagram */}
            {/* Pallet Base */}
            <rect x="35" y="130" width="170" height="10" fill="#1E3E62" stroke="#F1C40F" strokeWidth="1.5" />
            <rect x="45" y="140" width="20" height="6" fill="#F1C40F" />
            <rect x="110" y="140" width="20" height="6" fill="#F1C40F" />
            <rect x="175" y="140" width="20" height="6" fill="#F1C40F" />
            {/* FIBC Bulk Bag 1 */}
            <rect x="45" y="54" width="70" height="76" rx="6" fill="#152C48" stroke="#E2E8F0" strokeWidth="2" />
            <path d="M52 54 V36 C52 32 62 32 62 36 V54" stroke="#F1C40F" strokeWidth="2" />
            <path d="M98 54 V36 C98 32 108 32 108 36 V54" stroke="#F1C40F" strokeWidth="2" />
            <text x="80" y="88" textAnchor="middle" fill="#F1C40F" fontSize="11" fontWeight="bold" fontFamily="monospace">
              UREA 46%
            </text>
            <text x="80" y="103" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontFamily="monospace">
              1000 KG FIBC
            </text>
            {/* FIBC Bulk Bag 2 */}
            <rect x="125" y="54" width="70" height="76" rx="6" fill="#0B192C" stroke="#94A3B8" strokeWidth="2" />
            <path d="M132 54 V36 C132 32 142 32 142 36 V54" stroke="#F1C40F" strokeWidth="2" />
            <path d="M178 54 V36 C178 32 188 32 188 36 V54" stroke="#F1C40F" strokeWidth="2" />
            <text x="160" y="88" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="monospace">
              DAP 18-46
            </text>
            <text x="160" y="103" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              STOW CERTIFIED
            </text>
            {/* Chemical Assay Callout Ring */}
            <circle cx="260" cy="82" r="38" fill="#060E18" stroke="#F1C40F" strokeWidth="2" strokeDasharray="4 2" />
            <text x="260" y="76" textAnchor="middle" fill="#F1C40F" fontSize="14" fontWeight="bold" fontFamily="monospace">
              N 46.2%
            </text>
            <text x="260" y="92" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">
              PRILLED / GRANULAR
            </text>
          </svg>
        )}

        {divisionId === 'div3' && (
          <svg viewBox="0 0 320 160" className="w-44 sm:w-64 h-28 sm:h-36" fill="none">
            {/* 208L Steel Drums & 1000L Caged IBC Tote */}
            {/* IBC Caged Tote */}
            <rect x="35" y="42" width="96" height="92" rx="4" fill="#152C48" stroke="#94A3B8" strokeWidth="2" />
            {/* Steel Cage Grid */}
            <line x1="35" y1="65" x2="131" y2="65" stroke="#64748B" strokeWidth="1.5" />
            <line x1="35" y1="88" x2="131" y2="88" stroke="#64748B" strokeWidth="1.5" />
            <line x1="35" y1="111" x2="131" y2="111" stroke="#64748B" strokeWidth="1.5" />
            <line x1="67" y1="42" x2="67" y2="134" stroke="#64748B" strokeWidth="1.5" />
            <line x1="99" y1="42" x2="99" y2="134" stroke="#64748B" strokeWidth="1.5" />
            <rect x="73" y="34" width="20" height="8" fill="#F1C40F" />
            <rect x="52" y="70" width="62" height="28" fill="#060E18" stroke="#F1C40F" strokeWidth="1.2" />
            <text x="83" y="87" textAnchor="middle" fill="#F1C40F" fontSize="9" fontWeight="bold" fontFamily="monospace">
              1000L IBC TOTE
            </text>
            {/* 208L Steel Drum 1 */}
            <rect x="155" y="48" width="58" height="86" rx="4" fill="#0B192C" stroke="#F1C40F" strokeWidth="2" />
            <line x1="152" y1="74" x2="216" y2="74" stroke="#F1C40F" strokeWidth="2.5" />
            <line x1="152" y1="106" x2="216" y2="106" stroke="#F1C40F" strokeWidth="2.5" />
            <text x="184" y="94" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">
              SAE 15W-40
            </text>
            {/* 208L Steel Drum 2 */}
            <rect x="228" y="48" width="58" height="86" rx="4" fill="#152C48" stroke="#94A3B8" strokeWidth="2" />
            <line x1="225" y1="74" x2="289" y2="74" stroke="#94A3B8" strokeWidth="2.5" />
            <line x1="225" y1="106" x2="289" y2="106" stroke="#94A3B8" strokeWidth="2.5" />
            <text x="257" y="94" textAnchor="middle" fill="#F1C40F" fontSize="9" fontWeight="bold" fontFamily="monospace">
              ISO VG 68
            </text>
          </svg>
        )}

        {divisionId === 'div4' && (
          <svg viewBox="0 0 320 160" className="w-44 sm:w-64 h-28 sm:h-36" fill="none">
            {/* Laminated Automotive Safety Glass & Export Crating Schematic */}
            {/* Export Crate Outline */}
            <rect x="30" y="34" width="135" height="102" fill="#0B192C" stroke="#94A3B8" strokeWidth="2" />
            <line x1="30" y1="34" x2="165" y2="136" stroke="#1E3E62" strokeWidth="2" />
            <line x1="165" y1="34" x2="30" y2="136" stroke="#1E3E62" strokeWidth="2" />
            {/* Curved Laminated Windshield Inside Crate */}
            <path
              d="M46 56 C75 44 120 44 149 56 L138 116 C112 108 83 108 57 116 Z"
              fill="#152C48"
              stroke="#F1C40F"
              strokeWidth="2"
            />
            <line x1="65" y1="68" x2="85" y2="96" stroke="#FFF275" strokeWidth="1.5" opacity="0.7" />
            <line x1="78" y1="66" x2="94" y2="88" stroke="#FFF275" strokeWidth="1.5" opacity="0.5" />
            {/* Heavy Duty Commercial Suspension / Rotor Assembly */}
            <circle cx="238" cy="85" r="40" fill="#060E18" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="238" cy="85" r="24" fill="#152C48" stroke="#F1C40F" strokeWidth="2" />
            <circle cx="238" cy="85" r="8" fill="#F1C40F" />
            <circle cx="238" cy="53" r="3" fill="#94A3B8" />
            <circle cx="238" cy="117" r="3" fill="#94A3B8" />
            <circle cx="206" cy="85" r="3" fill="#94A3B8" />
            <circle cx="270" cy="85" r="3" fill="#94A3B8" />
          </svg>
        )}
      </div>

      {/* Readability protection gradient for mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050B12] via-[#07111E]/90 to-transparent sm:via-[#07111E]/60 pointer-events-none" />

      {/* Left Overlay: Clean Technical Metadata */}
      <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col justify-between max-w-[78%] sm:max-w-[60%]">
        <div className="text-[11px] sm:text-xs font-mono text-amber-300 tracking-wide">
          {hsCode}
        </div>
        <div>
          <div className="text-[10px] sm:text-[11px] font-mono text-slate-300">
            PORT OF POINT LISAS · STAGING GATEWAY
          </div>
          <div className="text-xs sm:text-sm font-bold text-white mt-0.5 leading-snug">
            {categoryLabel}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PortTerminalVisualCard: React.FC = () => {
  return (
    <div className="bg-[#060E18] border border-[#1E3E62] rounded-xl overflow-hidden shadow-lg">
      {/* Terminal Schematic Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0B192C] border-b border-[#1E3E62] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
        <span className="font-semibold text-white">Port of Point Lisas · Deepwater Terminal Blueprint</span>
        <span className="font-mono text-[11px] sm:text-xs text-slate-300 tabular-nums">10°24&apos;18&quot;N · 61°29&apos;42&quot;W</span>
      </div>

      {/* High-precision SVG Maritime Port & Vessel Berthing Illustration */}
      <div className="relative p-3 sm:p-6 bg-gradient-to-b from-[#071324] to-[#050B12]">
        <svg viewBox="0 0 800 260" className="w-full h-auto" fill="none">
          {/* Grid lines */}
          <line x1="0" y1="60" x2="800" y2="60" stroke="#152C48" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="130" x2="800" y2="130" stroke="#152C48" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="200" x2="800" y2="200" stroke="#1E3E62" strokeWidth="1.5" />

          {/* Deepwater Channel Water Line */}
          <rect x="0" y="200" width="800" height="60" fill="#09192F" />
          <path d="M0 215 Q 100 208, 200 215 T 400 215 T 600 215 T 800 215" stroke="#1E3E62" strokeWidth="1.5" fill="none" />

          {/* Port Quay Wall (Left Side Staging Terminal) */}
          <rect x="0" y="165" width="330" height="45" fill="#152C48" stroke="#475569" strokeWidth="2" />
          <text x="20" y="190" fill="#94A3B8" fontSize="11" fontFamily="monospace" fontWeight="bold">
            BERTH #3 &amp; #4 · BONDED EXPORT QUAY (12.8m DRAFT)
          </text>

          {/* Gantry Crane 1 */}
          <path d="M110 165 L125 45 L155 45 L170 165" stroke="#F1C40F" strokeWidth="3" fill="none" />
          <line x1="80" y1="65" x2="390" y2="65" stroke="#F1C40F" strokeWidth="4" />
          <line x1="140" y1="45" x2="340" y2="65" stroke="#D4AC0D" strokeWidth="1.5" />
          <line x1="140" y1="45" x2="90" y2="65" stroke="#D4AC0D" strokeWidth="1.5" />
          {/* Spreader & Hoist */}
          <line x1="310" y1="65" x2="310" y2="115" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="2 2" />
          <rect x="290" y="115" width="40" height="18" fill="#F1C40F" stroke="#060E18" strokeWidth="1.5" />

          {/* Stacked Containers on Quay */}
          <rect x="20" y="143" width="42" height="22" fill="#1E3E62" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="20" y="121" width="42" height="22" fill="#0B192C" stroke="#F1C40F" strokeWidth="1.2" />
          <rect x="66" y="143" width="42" height="22" fill="#0B192C" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Bulk Cargo / FCL Vessel at Berth */}
          <path
            d="M360 155 L750 155 L725 208 L380 208 Z"
            fill="#0B192C"
            stroke="#F1C40F"
            strokeWidth="2.5"
          />
          {/* Vessel Bridge Superstructure */}
          <rect x="660" y="95" width="52" height="60" fill="#152C48" stroke="#CBD5E1" strokeWidth="1.8" />
          <rect x="652" y="82" width="68" height="14" fill="#E2E8F0" />
          <rect x="675" y="62" width="8" height="20" fill="#F1C40F" />

          {/* Container Stacks on Vessel Deck */}
          <rect x="405" y="133" width="48" height="22" fill="#1E3E62" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="405" y="111" width="48" height="22" fill="#F1C40F" stroke="#060E18" strokeWidth="1.2" />
          <rect x="458" y="133" width="48" height="22" fill="#152C48" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="458" y="111" width="48" height="22" fill="#1E3E62" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="511" y="133" width="48" height="22" fill="#0B192C" stroke="#F1C40F" strokeWidth="1.2" />
          <rect x="511" y="111" width="48" height="22" fill="#152C48" stroke="#94A3B8" strokeWidth="1.2" />
          <rect x="564" y="133" width="48" height="22" fill="#1E3E62" stroke="#94A3B8" strokeWidth="1.2" />

          {/* Telemetry Annotations */}
          <text x="410" y="92" fill="#F1C40F" fontSize="10" fontFamily="monospace">
            FCL / BREAKBULK CHARTER LOADING
          </text>
          <text x="385" y="238" fill="#CBD5E1" fontSize="11" fontFamily="monospace">
            CARICOM FEEDER: 2–6 DAYS  ·  MIAMI / HOUSTON: 7–10 DAYS  ·  ROTTERDAM: 18–22 DAYS
          </text>
        </svg>
      </div>
    </div>
  );
};
