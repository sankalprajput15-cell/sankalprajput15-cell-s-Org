/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Anchor,
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  MapPin,
  Ship,
  Landmark,
  ClipboardCheck,
  FileBadge,
  FileText,
  Send,
  CheckCircle,
  Mail,
  Copy,
  Building2,
  PackageCheck,
  Check,
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingBag,
  Coins,
  Scale,
  Quote,
} from 'lucide-react';
import { BrandLogo } from './components/BrandLogo';
import { DivisionVisualHeader, PortTerminalVisualCard } from './components/TradeVisuals';
import {
  COMMODITY_DIVISIONS,
  PORT_ROUTES,
  INCOTERMS_INFO,
  PROCUREMENT_WANTED,
  RECENT_CONSIGNMENTS,
  TRADE_TESTIMONIALS,
} from './data/tradeData';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'div1' | 'div2' | 'div3' | 'div4'>('all');
  const [manifestFilter, setManifestFilter] = useState<'all' | 'EXPORT (SOLD)' | 'IMPORT (PURCHASED)'>('all');

  // Quick Inquiry Form State with Buy / Sell toggle
  const [quickTradeType, setQuickTradeType] = useState<'buy' | 'sell'>('buy');
  const [quickCompany, setQuickCompany] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickCategory, setQuickCategory] = useState('Industrial Equipment, Food Grade Machinery & Belting');

  // Trade Calculator State
  const [calcDivision, setCalcDivision] = useState('Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients');
  const [calcTonnage, setCalcTonnage] = useState(48);
  const [calcPort, setCalcPort] = useState('Port of Georgetown, Guyana (3-4 Days)');
  const [calcIncoterm, setCalcIncoterm] = useState('CIF Destination');
  const [calcApplied, setCalcApplied] = useState(false);

  // Formal Commercial Trade Desk Form State (Dual Mode: Buy vs. Sell)
  const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy');
  const [tradeCompany, setTradeCompany] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [tradeEmail, setTradeEmail] = useState('');
  const [tradePhone, setTradePhone] = useState('');
  const [tradeCategory, setTradeCategory] = useState('Industrial Equipment, Food Grade Machinery & Belting');
  const [tradeQuantity, setTradeQuantity] = useState('48 Metric Tons (2 x 20ft FCL Containers)');
  const [tradeIncoterm, setTradeIncoterm] = useState('CIF (Cost, Insurance & Freight - Discharge Port)');
  const [tradePortOrOrigin, setTradePortOrOrigin] = useState('Port of Georgetown, Guyana');
  const [tradePriceTarget, setTradePriceTarget] = useState('');
  const [tradeNotes, setTradeNotes] = useState('');
  const [tradeConsent, setTradeConsent] = useState(false);

  // Modal & Mail Transmission State
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('JEL-TRD-2026-9942');
  const [tradeMailtoUrl, setTradeMailtoUrl] = useState('');
  const [copiedTradeSummary, setCopiedTradeSummary] = useState(false);

  // Quick form submission routes to Trade Desk
  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeMode(quickTradeType);
    setTradeCompany(quickCompany);
    setTradeEmail(quickEmail);
    setTradeCategory(quickCategory);

    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill from catalog division for buying
  const handleSelectBuyProduct = (productTitle: string) => {
    setTradeMode('buy');
    setTradeCategory(productTitle);
    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pre-fill from catalog division for selling to us
  const handleSelectSellToUs = (productTitle: string) => {
    setTradeMode('sell');
    setTradeCategory(productTitle);
    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculator helpers
  const getContainerEstimate = () => {
    const t = Number(calcTonnage) || 24;
    if (t <= 5) return '1 x LCL Palletized Consignment';
    if (t <= 24) return '1 x 20ft Standard FCL (24 MT Max)';
    if (t <= 48) return '2 x 20ft Heavy FCL Containers';
    if (t <= 500) return `${Math.ceil(t / 24)} x 20ft FCL Containers`;
    return `Chartered Geared Bulk Parcel (${t.toLocaleString()} MT)`;
  };

  const getTransitEstimate = () => {
    if (calcPort.includes('Rotterdam')) return '18 – 21 Business Days';
    if (calcPort.includes('Yokohama')) return '34 – 40 Business Days';
    if (calcPort.includes('Bridgetown')) return '2 – 3 Business Days';
    if (calcPort.includes('Georgetown')) return '3 – 4 Business Days';
    if (calcPort.includes('Kingston')) return '4 – 6 Business Days';
    return '7 – 9 Business Days';
  };

  const getEstimatedFreightBand = () => {
    const t = Math.max(1, Number(calcTonnage) || 24);
    const containers = Math.max(1, Math.ceil(t / 24));
    let baseRatePerContainer = 1650;
    if (calcPort.includes('Bridgetown') || calcPort.includes('Georgetown')) baseRatePerContainer = 1350;
    if (calcPort.includes('Kingston')) baseRatePerContainer = 1580;
    if (calcPort.includes('Miami') || calcPort.includes('Houston')) baseRatePerContainer = 2150;
    if (calcPort.includes('Rotterdam')) baseRatePerContainer = 3200;
    if (calcPort.includes('Yokohama')) baseRatePerContainer = 4450;

    if (calcIncoterm.includes('FOB') || calcIncoterm.includes('EXW')) {
      return `USD $${(containers * 280).toLocaleString()} Terminal THC & Customs Filing`;
    }
    const low = containers * baseRatePerContainer;
    const high = Math.round(low * 1.12);
    return `USD $${low.toLocaleString()} – $${high.toLocaleString()} Est. Ocean Freight`;
  };

  // Apply calculator estimate to Buy RFQ form
  const handleApplyCalculatorToRfq = () => {
    setTradeMode('buy');
    setTradeCategory(calcDivision);
    setTradeQuantity(`${calcTonnage} Metric Tons (${getContainerEstimate()})`);
    setTradeIncoterm(
      calcIncoterm.includes('CIF')
        ? 'CIF (Cost, Insurance & Freight - Discharge Port)'
        : calcIncoterm.includes('CFR')
          ? 'CFR (Cost and Freight - Discharge Port)'
          : calcIncoterm.includes('EXW')
            ? 'EXW / FCA (Staging Depot / Factory)'
            : 'FOB (Free On Board - Point Lisas)'
    );
    setTradePortOrOrigin(calcPort.split('(')[0].trim());
    setCalcApplied(true);
    setTimeout(() => setCalcApplied(false), 2500);

    const tradeElement = document.getElementById('trade-desk');
    if (tradeElement) {
      tradeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Format trade documentation for email
  const getTradeSummaryText = (refId: string) => {
    const isBuyingFromUs = tradeMode === 'buy';
    const headerTitle = isBuyingFromUs
      ? 'FORMAL COMMERCIAL REQUEST FOR QUOTATION (BUY FROM JEL JAPAN)'
      : 'FORMAL SUPPLIER OFFER / PROCUREMENT MANIFEST (SELL TO JEL JAPAN)';

    return [
      '==============================================',
      headerTitle,
      'Jel Japan Enterprise Ltd. - Commercial Trade Desk',
      '==============================================',
      'Routing: Commercial Trade Desk (Port of Point Lisas, T&T)',
      `Reference ID: ${refId}`,
      `Trade Direction: ${isBuyingFromUs ? 'BUY FROM US (Export Supply Inquiry)' : 'SELL TO US (Supplier / Manufacturer Offer)'}`,
      '',
      '--- COUNTERPARTY & AUTHORIZED SIGNATORY ---',
      `Company / Entity: ${tradeCompany}`,
      `Authorized Representative: ${tradeName}`,
      `Corporate Email: ${tradeEmail}`,
      `Phone / WhatsApp: ${tradePhone}`,
      '',
      '--- COMMERCIAL SPECIFICATIONS ---',
      `Product Division: ${tradeCategory}`,
      `Volume / Quantity: ${tradeQuantity}`,
      isBuyingFromUs
        ? `Incoterms 2020 Preference: ${tradeIncoterm}`
        : `Supply Delivery Terms: ${tradeIncoterm}`,
      isBuyingFromUs
        ? `Discharge Port / Destination: ${tradePortOrOrigin}`
        : `Cargo Origin / Staging Location: ${tradePortOrOrigin}`,
      tradePriceTarget ? `Target / Asking Price: ${tradePriceTarget}` : '',
      '',
      '--- TECHNICAL SPECIFICATIONS & NOTES ---',
      tradeNotes.trim() ? tradeNotes : 'Standard commercial grade as per trade manifest.',
      '',
      '--- AUTHORIZATION ---',
      'Authorized representative confirms commercial authenticity.',
      '==============================================',
    ]
      .filter(Boolean)
      .join('\n');
  };

  // Submit Formal Trade Inquiry addressed to jeljapanenterpriseltdshop@gmail.com
  const handleFormalTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isBuying = tradeMode === 'buy';
    const prefix = isBuying ? 'JEL-BUY' : 'JEL-SELL';
    const newId = `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(newId);
    setCopiedTradeSummary(false);

    const subject = `[${newId}] ${isBuying ? 'RFQ (Buy)' : 'Supplier Offer (Sell)'}: ${tradeCategory} - ${tradeCompany}`;
    const body = getTradeSummaryText(newId);
    const mailto = `mailto:jeljapanenterpriseltdshop@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTradeMailtoUrl(mailto);
    setModalOpen(true);

    try {
      window.location.href = mailto;
    } catch (err) {
      console.error('Mail dispatch:', err);
    }
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased selection:bg-[#F1C40F] selection:text-[#0B192C]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md border-b border-[#1E3E62]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a href="#" className="whitespace-nowrap shrink-0 focus:outline-none">
            <BrandLogo variant="wordmark" />
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-200">
            <a
              href="#how-we-trade"
              className="hover:text-[#F1C40F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Trade Model
            </a>
            <a
              href="#catalog"
              className="hover:text-[#F1C40F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Divisions
            </a>
            <a
              href="#procurement"
              className="hover:text-[#F1C40F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Procurement
            </a>
            <a
              href="#consignments"
              className="hover:text-[#F1C40F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Manifests
            </a>
            <a
              href="#calculator"
              className="hover:text-[#F1C40F] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Freight Desk
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#trade-desk"
              onClick={() => setTradeMode('buy')}
              className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] text-xs font-bold px-4 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Trade Desk Portal
            </a>

            <button
              type="button"
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-200 hover:text-[#F1C40F] focus:outline-none p-2"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#060E18] border-t border-[#152C48] px-6 py-5 space-y-3">
            <a
              href="#how-we-trade"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-[#F1C40F] font-medium text-sm py-1.5"
            >
              Trade Model (Buy &amp; Sell)
            </a>
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-[#F1C40F] font-medium text-sm py-1.5"
            >
              Commodity Divisions
            </a>
            <a
              href="#procurement"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-[#F1C40F] font-medium text-sm py-1.5"
            >
              Procurement Desk (We Buy)
            </a>
            <a
              href="#consignments"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-[#F1C40F] font-medium text-sm py-1.5"
            >
              Recent Consignments &amp; Proof
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-[#F1C40F] font-medium text-sm py-1.5"
            >
              Freight &amp; Transit Calculator
            </a>
            <div className="pt-3 border-t border-[#152C48] grid grid-cols-2 gap-2">
              <a
                href="#trade-desk"
                onClick={() => {
                  setTradeMode('buy');
                  setMobileMenuOpen(false);
                }}
                className="text-center block bg-[#F1C40F] text-[#060E18] py-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                Request Quote (Buy)
              </a>
              <a
                href="#trade-desk"
                onClick={() => {
                  setTradeMode('sell');
                  setMobileMenuOpen(false);
                }}
                className="text-center block bg-[#152C48] text-white border border-[#1E3E62] py-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                Sell to Us
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section: Real Maritime Trading House Presentation */}
      <section className="relative bg-[#07111E] text-white overflow-hidden py-16 lg:py-24 border-b border-[#152C48]">
        {/* Architectural grid backdrop */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1E3E62_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Left Column: Corporate Identity, Value Proposition & Primary Actions */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                {/* Full Crest Lockup & Unboxed Regional Trust Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#152C48]">
                  <BrandLogo variant="light" size="md" />
                  <div className="text-xs font-mono text-slate-300 tabular-nums">
                    <span>10°24&apos;N 61°29&apos;W</span>
                    <span className="mx-2 text-slate-500">·</span>
                    <span>STOW-TT Certified</span>
                    <span className="mx-2 text-slate-500">·</span>
                    <span>Desk 08:00–17:00 AST</span>
                  </div>
                </div>

                {/* Unboxed Kicker */}
                <div className="text-xs font-semibold tracking-wider uppercase text-[#F1C40F]">
                  International Merchant Trading House · Direct Principal Off-Take &amp; Export Supply
                </div>

                {/* Balanced Display Headline */}
                <h1
                  className="font-display font-extrabold tracking-tight text-white leading-[1.12]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
                >
                  Principal <span className="text-[#F1C40F]">Commodity Buyer</span> &amp;{' '}
                  <span className="text-[#F1C40F]">Merchant Exporter</span> at Point Lisas Port
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Operating from corporate headquarters at <strong>92 Katwaroo Trace, Penal</strong> and bonded
                  staging berths at the <strong>Port of Point Lisas, Trinidad &amp; Tobago</strong>, Jel Japan
                  Enterprise Ltd. takes principal title to cargo. We <strong>purchase</strong> bulk fertilizers,
                  virgin base oils, and food-grade plant machinery from global producers—and{' '}
                  <strong>export</strong> SGS-certified consignments across CARICOM, the Americas, and Europe.
                </p>
              </div>

              {/* Primary Decision Block */}
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <a
                    href="#trade-desk"
                    onClick={() => setTradeMode('buy')}
                    className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold px-6 py-3.5 rounded-lg shadow-md transition-colors text-center flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap shrink-0"
                  >
                    <ArrowDownLeft className="w-4 h-4 text-[#060E18]" />
                    <span>Request Export Quotation (Buy)</span>
                  </a>
                  <a
                    href="#trade-desk"
                    onClick={() => setTradeMode('sell')}
                    className="bg-[#0B192C] hover:bg-[#152C48] text-white font-semibold px-6 py-3.5 rounded-lg border border-[#1E3E62] transition-colors text-center flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#F1C40F]" />
                    <span>Submit Supplier Offer (Sell to Us)</span>
                  </a>
                </div>

                {/* Unboxed Operational Proof Line */}
                <div className="text-xs text-slate-300 flex flex-wrap items-center gap-y-1">
                  <span>ICC Incoterms 2020 (FOB · CIF · CFR)</span>
                  <span className="mx-2.5 text-slate-500">·</span>
                  <span>SGS &amp; Bureau Veritas Pre-Shipment Assay</span>
                  <span className="mx-2.5 text-slate-500">·</span>
                  <span>Sight DLC &amp; TT Settlement</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dual-Mode Rapid Dispatch Desk */}
            <div className="lg:col-span-5 flex">
              <div className="w-full bg-[#0B192C] p-6 sm:p-8 rounded-xl border border-[#1E3E62] shadow-xl flex flex-col justify-between">
                <div>
                  {/* Segmented Interactive Control */}
                  <div className="flex rounded-lg bg-[#060E18] p-1 border border-[#1E3E62] mb-5">
                    <button
                      type="button"
                      onClick={() => setQuickTradeType('buy')}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                        quickTradeType === 'buy'
                          ? 'bg-[#F1C40F] text-[#060E18] shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <ArrowDownLeft className="w-3.5 h-3.5" />
                      <span>I Want to BUY</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuickTradeType('sell')}
                      className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                        quickTradeType === 'sell'
                          ? 'bg-[#1E3E62] text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#F1C40F]" />
                      <span>I Want to SELL to Jel</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#F1C40F]">
                      {quickTradeType === 'buy' ? 'Export Supply Desk' : 'Supplier Off-Take Desk'}
                    </span>
                    <span className="text-slate-300 font-mono tabular-nums">SLA &lt; 4 hrs AST</span>
                  </div>

                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    {quickTradeType === 'buy'
                      ? 'Initialize a commercial Request for Quotation (RFQ) for containerized FCL or breakbulk export consignments.'
                      : 'Offer factory production allocations, petrochemical parcels, or surplus machinery directly to our purchasing desk.'}
                  </p>

                  <form id="quick-inquiry-form" onSubmit={handleQuickSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="quick-company"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        {quickTradeType === 'buy'
                          ? 'Purchasing Company / Organization'
                          : 'Supplier / Mill / Manufacturer Name'}
                      </label>
                      <input
                        type="text"
                        required
                        id="quick-company"
                        value={quickCompany}
                        onChange={(e) => setQuickCompany(e.target.value)}
                        placeholder={
                          quickTradeType === 'buy'
                            ? 'e.g. Demerara Agro-Inputs Ltd.'
                            : 'e.g. Kanto Precision Machinery Co.'
                        }
                        className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F1C40F] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quick-email"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Authorized Corporate Email
                      </label>
                      <input
                        type="email"
                        required
                        id="quick-email"
                        value={quickEmail}
                        onChange={(e) => setQuickEmail(e.target.value)}
                        placeholder="procurement@company.com"
                        className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F1C40F] transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="quick-category"
                        className="block text-xs font-semibold text-slate-200 mb-1.5"
                      >
                        Commodity Division
                      </label>
                      <select
                        id="quick-category"
                        value={quickCategory}
                        onChange={(e) => setQuickCategory(e.target.value)}
                        className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F] transition-colors"
                      >
                        <option value="Industrial Equipment, Food Grade Machinery & Belting">
                          01 · Industrial Equipment &amp; Food Grade Machinery
                        </option>
                        <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">
                          02 · Agricultural Fertilizers (Urea 46% / DAP)
                        </option>
                        <option value="Industrial Lubricants, Virgin Base Oils & Process Chemicals">
                          03 · Industrial Lubricants &amp; Base Oils
                        </option>
                        <option value="Automotive Safety Glass, Commercial Spares & Fleet Supplies">
                          04 · Automotive Safety Glass &amp; Fleet Spares
                        </option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      id="quick-inquiry-submit"
                      className="w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3 px-4 rounded-lg shadow transition-colors flex items-center justify-center gap-2 text-sm whitespace-nowrap cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {quickTradeType === 'buy'
                          ? 'Continue to Formal Export RFQ'
                          : 'Continue to Supplier Manifest'}
                      </span>
                    </button>
                  </form>
                </div>

                <div className="mt-5 pt-4 border-t border-[#152C48] flex items-center justify-between text-xs text-slate-300">
                  <span>Direct Point Lisas Commercial Desk</span>
                  <span className="font-mono text-[#F1C40F]">ISO / SGS Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Quantitative KPI Strip Below Hero Split */}
          <div className="mt-12 pt-8 border-t border-[#152C48] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#0B192C]/90 p-5 rounded-xl border border-[#1E3E62]">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F1C40F] tabular-nums">
                24–15,000 MT
              </div>
              <div className="text-sm font-semibold text-white mt-1">Consignment Capacity</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Single 20ft FCL containers up to chartered geared bulk vessel parcels
              </div>
            </div>

            <div className="bg-[#0B192C]/90 p-5 rounded-xl border border-[#1E3E62]">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F1C40F] tabular-nums">
                2–6 Days
              </div>
              <div className="text-sm font-semibold text-white mt-1">CARICOM Feeder Transit</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Scheduled weekly departures from Point Lisas to Guyana, Barbados &amp; Jamaica
              </div>
            </div>

            <div className="bg-[#0B192C]/90 p-5 rounded-xl border border-[#1E3E62]">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F1C40F] tabular-nums">
                100% Assayed
              </div>
              <div className="text-sm font-semibold text-white mt-1">SGS &amp; BV Pre-Shipment</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Independent chemical COA, moisture check &amp; container seal verification
              </div>
            </div>

            <div className="bg-[#0B192C]/90 p-5 rounded-xl border border-[#1E3E62]">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-[#F1C40F] tabular-nums">
                LC · TT · CAD
              </div>
              <div className="text-sm font-semibold text-white mt-1">Institutional Trade Finance</div>
              <div className="text-xs text-slate-300 mt-0.5">
                Irrevocable Documentary Letters of Credit at Sight &amp; wire settlement
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Merchant Trading House Architecture (How We Buy & How We Sell) */}
      <section id="how-we-trade" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B]">
              01 · Dual-Direction Principal Trading Model
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
              style={{ textWrap: 'balance' }}
            >
              How We Operate as Both Principal Buyer &amp; Merchant Exporter
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Unlike commission brokers, Jel Japan Enterprise Ltd. acts as principal counterparty on every
              transaction. We purchase physical inventory directly from manufacturers and refineries, stage and
              inspect cargo at Point Lisas, and execute turn-key export deliveries under ICC Incoterms 2020.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: HOW WE BUY (Procurement) */}
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 pb-4 mb-5 border-b border-slate-200">
                  <span className="font-bold uppercase tracking-wider text-amber-800">
                    01A · Inbound Procurement Desk (We Buy)
                  </span>
                  <span className="font-mono">For Producers, Refineries &amp; Mills</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#0B192C] mb-3">
                  Direct Off-Take &amp; Surplus Asset Acquisition
                </h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  We issue firm corporate Purchase Orders for bulk nitrogen fertilizers, Group II/III base oils,
                  stainless food processing machinery, and OEM commercial glass lots.
                </p>

                <div className="space-y-4 text-sm text-slate-700 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Guaranteed Liquidity &amp; Settlement:</strong> We settle
                      via Irrevocable Documentary Letter of Credit (DLC) at Sight, Telegraphic Transfer (TT), or
                      Cash Against Documents (CAD).
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Origin &amp; Factory Collection:</strong> We purchase
                      EXW Factory Floor, FCA Warehouse, FOB Origin Port, or CIF Port of Point Lisas.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900">Structured Inspection Protocol:</strong> We appoint SGS
                      or Bureau Veritas inspectors at your loading facility within 72 hours of contract execution.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-200">
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('sell')}
                  className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Submit Supplier Offering (Sell to Jel Japan)</span>
                </a>
              </div>
            </div>

            {/* Column 2: HOW WE SELL (Export Supply) */}
            <div className="bg-[#0B192C] text-white rounded-xl border border-[#1E3E62] p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-300 pb-4 mb-5 border-b border-[#152C48]">
                  <span className="font-bold uppercase tracking-wider text-[#F1C40F]">
                    01B · Outbound Export Supply Desk (We Sell)
                  </span>
                  <span className="font-mono">For Distributors, Estates &amp; Fleets</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  Verified Export Supply &amp; Multi-Modal Fulfillment
                </h3>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  We supply commercial importers, agricultural cooperatives, industrial manufacturers, and
                  government procurement tenders with inspected cargo staged at Point Lisas.
                </p>

                <div className="space-y-4 text-sm text-slate-200 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Complete Export Documentation:</strong> Every shipment
                      includes Clean On-Board Bill of Lading, CARICOM / Chamber Certificate of Origin, Batch COA,
                      and 16-section GHS SDS.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Tropical &amp; Seaworthy Packaging:</strong> 50kg PP/PE
                      lined bags, 1,000kg UV-stabilized FIBC jumbo bags, new 208L steel drums, and ISPM-15
                      fumigated crates.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#F1C40F] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white">Turn-Key Incoterms 2020 Delivery:</strong> Available FOB
                      Point Lisas or full CIF/CFR landed delivery with ICC Clause (A) All-Risks Marine Insurance.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-[#152C48]">
                <a
                  href="#trade-desk"
                  onClick={() => setTradeMode('buy')}
                  className="w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3 px-4 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>Request Commercial Export Quotation (Buy)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Core Commodity & Equipment Divisions */}
      <section id="catalog" className="py-20 bg-slate-100/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B]">
                02 · Commercial Trade Specifications
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
                style={{ textWrap: 'balance' }}
              >
                Active Commodity &amp; Equipment Divisions
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Review technical specifications, HS tariff classifications, indicative price benchmarks, and
                dual-direction (Buy &amp; Sell) mandates across our four core divisions.
              </p>
            </div>

            {/* Interactive Segmented Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl self-start">
              {[
                { id: 'all', label: 'All Divisions' },
                { id: 'div1', label: '01 · Machinery' },
                { id: 'div2', label: '02 · Fertilizers' },
                { id: 'div3', label: '03 · Lubricants' },
                { id: 'div4', label: '04 · Automotive' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#0B192C] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Division Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMMODITY_DIVISIONS.filter(
              (item) => activeCategory === 'all' || item.category === activeCategory
            ).map((division) => (
              <div
                key={division.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Realistic Technical Blueprint & Assay Visual Header */}
                  <DivisionVisualHeader
                    divisionId={division.id}
                    hsCode={division.hsCode}
                    categoryLabel={division.categoryLabel}
                  />

                  <div className="p-6 sm:p-7">
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 font-mono">
                      <span>{division.hsCode}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-semibold">{division.stockStatus}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#0B192C] mb-2.5 leading-snug">
                      {division.title}
                    </h3>

                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">{division.description}</p>

                    {/* Dual Trade Scope: WE BUY vs WE SELL */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-5 border-t border-slate-200">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1.5">
                          <ArrowDownLeft className="w-3.5 h-3.5 text-amber-700" />
                          <span>We Buy (Procurement)</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{division.weBuySpec}</p>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#0B192C] flex items-center gap-1.5 mb-1.5">
                          <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                          <span>We Sell (Export Supply)</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{division.weSellSpec}</p>
                      </div>
                    </div>

                    {/* Technical Specifications Checklist */}
                    <div className="mb-6 pt-5 border-t border-slate-200 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                        Verified Technical &amp; Assay Standards
                      </div>
                      {division.keySpecs.map((spec, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Commercial Reference Parameters */}
                    <div className="pt-5 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-slate-500 block">Benchmark Origin</span>
                        <strong className="text-slate-900 font-semibold">{division.origin}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Export Packaging</span>
                        <strong className="text-slate-900 font-semibold">{division.packaging}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Indicative Commercial Basis</span>
                        <strong className="text-slate-900 font-mono tabular-nums">
                          {division.indicativeRate}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Quality Assurance</span>
                        <strong className="text-slate-900 font-semibold">{division.inspectionProtocol}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-600 font-mono tabular-nums truncate">
                    MOQ: {division.minOrder}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelectSellToUs(division.title)}
                      className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Coins className="w-3.5 h-3.5 text-amber-600" />
                      <span>Sell to Us</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectBuyProduct(division.title)}
                      className="bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Request Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Active Supplier Procurement Mandates (What We Buy) */}
      <section id="procurement" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B]">
              03 · Inbound Purchasing Mandates
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Active Procurement Tenders: Sell Your Inventory to Jel Japan
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              We maintain standing quarterly purchase allocations for producers, petrochemical plants, and factory
              liquidators. Review our current off-take requirements and settlement terms below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PROCUREMENT_WANTED.map((item, idx) => (
              <div
                key={item.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono text-amber-800 font-bold mb-2">
                    TENDER 0{idx + 1} · ACTIVE OFF-TAKE
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#0B192C] mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-xs mb-5 leading-relaxed">{item.description}</p>

                  <div className="space-y-1.5 mb-5 pt-4 border-t border-slate-200">
                    {item.specs.map((sp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{sp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900 block">Required Volume:</span>
                    <span className="font-mono tabular-nums">{item.volumeNeeded}</span>
                  </div>
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-900 block">Payment Settlement:</span>
                    <span>{item.settlementTerms}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSelectSellToUs(item.title)}
                    className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] text-xs font-bold py-2.5 px-4 rounded-lg transition-colors text-center flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  >
                    <span>Submit Supplier Offer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Proof of Execution — Recent Consignment Ledger & Attributable Counterparty Testimonials */}
      <section id="consignments" className="py-20 bg-slate-100/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B]">
                04 · Verified Trade Track Record &amp; Port Ledger
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
                style={{ textWrap: 'balance' }}
              >
                Recent Consignments, Port Schedule &amp; Counterparty Proof
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Representative import purchases and export dispatches executed through our Point Lisas terminal
                desk, backed by third-party SGS and Bureau Veritas assay certificates.
              </p>
            </div>

            {/* Manifest Direction Filter */}
            <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/80 rounded-xl self-start">
              {[
                { id: 'all', label: 'All Movements' },
                { id: 'EXPORT (SOLD)', label: 'Exports (We Sold)' },
                { id: 'IMPORT (PURCHASED)', label: 'Imports (We Bought)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setManifestFilter(tab.id as any)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    manifestFilter === tab.id
                      ? 'bg-[#0B192C] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Consignment Ledger Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-14">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0B192C] text-slate-200 text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-5 font-semibold">Manifest Ref</th>
                    <th className="py-3.5 px-4 font-semibold">Date</th>
                    <th className="py-3.5 px-4 font-semibold">Direction</th>
                    <th className="py-3.5 px-4 font-semibold">Commodity &amp; Packaging</th>
                    <th className="py-3.5 px-4 font-semibold">Volume / Lot</th>
                    <th className="py-3.5 px-4 font-semibold">Routing Corridor</th>
                    <th className="py-3.5 px-5 font-semibold">Assay / Seal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {RECENT_CONSIGNMENTS.filter(
                    (row) => manifestFilter === 'all' || row.direction === manifestFilter
                  ).map((row) => (
                    <tr key={row.manifestId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-5 font-mono font-semibold text-[#0B192C] tabular-nums whitespace-nowrap">
                        {row.manifestId}
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-600 tabular-nums whitespace-nowrap">
                        {row.date}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`font-mono text-xs font-bold ${
                            row.direction.startsWith('EXPORT') ? 'text-emerald-700' : 'text-amber-800'
                          }`}
                        >
                          {row.direction}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-medium text-slate-900">{row.commodity}</td>
                      <td className="py-4 px-4 font-mono text-slate-700 tabular-nums whitespace-nowrap">
                        {row.volume}
                      </td>
                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                        {row.originPort} → <strong className="text-slate-900">{row.dischargePort}</strong> (
                        {row.incoterm})
                      </td>
                      <td className="py-4 px-5 font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                        {row.verification}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Port of Point Lisas Visual Schematic + Liner Corridors Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-6">
              <PortTerminalVisualCard />
            </div>

            <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-[#0B192C] text-white flex items-center justify-between">
                <span className="font-display font-bold text-sm">
                  Active Ocean Liner &amp; Feeder Transit Matrix
                </span>
                <span className="text-xs font-mono text-[#F1C40F]">Origin: Point Lisas (T&amp;T)</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 uppercase">
                      <th className="py-3 px-4 font-semibold">Port Hub</th>
                      <th className="py-3 px-4 font-semibold">Est. Transit</th>
                      <th className="py-3 px-4 font-semibold">Frequency</th>
                      <th className="py-3 px-4 font-semibold">Standard Terms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {PORT_ROUTES.slice(1).map((route) => (
                      <tr key={route.portName} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{route.portName}</div>
                          <div className="text-slate-500">{route.country}</div>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-[#0B192C] tabular-nums whitespace-nowrap">
                          {route.transitDays}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{route.departureFrequency}</td>
                        <td className="py-3 px-4 font-mono text-slate-700 whitespace-nowrap">
                          {route.recommendedIncoterm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Attributable Counterparty Testimonials (Claim-to-Proof Adjacency) */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B] mb-2">
              Verified Counterparty Statements
            </div>
            <h3 className="font-display text-2xl font-extrabold text-[#0B192C] mb-6">
              Institutional References from Regional Importers &amp; Global Suppliers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRADE_TESTIMONIALS.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-amber-800 pb-3 mb-4 border-b border-slate-200">
                      <span>{item.outcomeMetric}</span>
                      <Quote className="w-4 h-4 text-slate-400 shrink-0" />
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed mb-6">&ldquo;{item.quote}&rdquo;</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 text-xs">
                    <div className="font-bold text-[#0B192C] text-sm">{item.signatory}</div>
                    <div className="text-slate-600 font-medium">{item.role}</div>
                    <div className="text-slate-500 mt-0.5">
                      {item.organization} · {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Interactive Maritime Freight & Routing Calculator */}
      <section id="calculator" className="py-20 bg-[#07111E] text-white border-b border-[#152C48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F1C40F]">
              05 · Pre-Shipment Logistics &amp; Freight Estimator
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-white mt-2"
              style={{ textWrap: 'balance' }}
            >
              Calculate Container Allocation, Transit Time &amp; Freight Band
            </h2>
            <p className="text-slate-300 mt-2 text-sm sm:text-base leading-relaxed">
              Model your consignment volume from the Port of Point Lisas and transfer parameters directly into
              your formal Request for Quotation.
            </p>
          </div>

          <div className="bg-[#0B192C] border border-[#1E3E62] rounded-xl p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="calc-division"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Commodity Division
                  </label>
                  <select
                    id="calc-division"
                    value={calcDivision}
                    onChange={(e) => setCalcDivision(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="Industrial Equipment, Food Grade Machinery & Belting">
                      01 · Industrial Equipment &amp; Machinery
                    </option>
                    <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">
                      02 · Agricultural Fertilizers (Urea 46% / DAP)
                    </option>
                    <option value="Industrial Lubricants, Virgin Base Oils & Process Chemicals">
                      03 · Industrial Lubricants &amp; Base Oils
                    </option>
                    <option value="Automotive Safety Glass, Commercial Spares & Fleet Supplies">
                      04 · Automotive Safety Glass &amp; Spares
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="calc-tonnage"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Net Cargo Tonnage (Metric Tons)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="25000"
                    id="calc-tonnage"
                    value={calcTonnage}
                    onChange={(e) => setCalcTonnage(Number(e.target.value))}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white font-mono tabular-nums focus:outline-none focus:border-[#F1C40F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="calc-port"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Discharge Port Hub
                  </label>
                  <select
                    id="calc-port"
                    value={calcPort}
                    onChange={(e) => setCalcPort(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="Port of Georgetown, Guyana (3-4 Days)">
                      Port of Georgetown, Guyana (3–4 Days)
                    </option>
                    <option value="Bridgetown Port, Barbados (2-3 Days)">
                      Port of Bridgetown, Barbados (2–3 Days)
                    </option>
                    <option value="Port of Kingston, Jamaica (4-6 Days)">
                      Port of Kingston, Jamaica (4–6 Days)
                    </option>
                    <option value="Port of Miami, USA (7-9 Days)">Port of Miami, USA (7–9 Days)</option>
                    <option value="Port of Houston, USA (8-10 Days)">Port of Houston, USA (8–10 Days)</option>
                    <option value="Port of Rotterdam, Netherlands (18-21 Days)">
                      Port of Rotterdam, Netherlands (18–21 Days)
                    </option>
                    <option value="Port of Yokohama, Japan (34-40 Days)">
                      Port of Yokohama, Japan (34–40 Days)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="calc-incoterm"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    Incoterms 2020 Delivery Basis
                  </label>
                  <select
                    id="calc-incoterm"
                    value={calcIncoterm}
                    onChange={(e) => setCalcIncoterm(e.target.value)}
                    className="w-full bg-[#060E18] border border-[#1E3E62] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#F1C40F]"
                  >
                    <option value="CIF Destination">CIF (Cost, Insurance &amp; Freight)</option>
                    <option value="FOB Point Lisas">FOB (Free On Board - Point Lisas)</option>
                    <option value="CFR Port of Discharge">CFR (Cost and Freight)</option>
                    <option value="EXW Point Lisas Warehouse">EXW (Ex Works - Staging Depot)</option>
                  </select>
                </div>
              </div>

              {/* Incoterms Quick Reference Strip */}
              <div className="pt-4 border-t border-[#152C48] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {INCOTERMS_INFO.slice(0, 2).map((info) => (
                  <div key={info.code} className="bg-[#060E18] p-3.5 rounded-lg border border-[#1E3E62]">
                    <div className="font-mono font-bold text-[#F1C40F]">{info.code}</div>
                    <p className="text-slate-300 mt-1 leading-relaxed">{info.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculated Output Breakdown */}
            <div className="lg:col-span-5 bg-[#060E18] border border-[#1E3E62] rounded-xl p-6">
              <div className="flex items-center justify-between border-b border-[#152C48] pb-3.5 mb-5">
                <span className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <ClipboardCheck className="w-4 h-4 text-[#F1C40F]" />
                  <span>Point Lisas Dispatch Estimate</span>
                </span>
                <span className="text-xs text-[#F1C40F] font-mono">PLIPDECO BERTH #3</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/70">
                  <span className="text-slate-400">Equipment Allocation:</span>
                  <strong className="text-white font-mono tabular-nums text-right">
                    {getContainerEstimate()}
                  </strong>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/70">
                  <span className="text-slate-400">Estimated Ocean Transit:</span>
                  <strong className="text-[#F1C40F] font-mono tabular-nums text-right">
                    {getTransitEstimate()}
                  </strong>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-[#152C48]/70">
                  <span className="text-slate-400">Indicative Freight / THC:</span>
                  <strong className="text-white font-mono tabular-nums text-right">
                    {getEstimatedFreightBand()}
                  </strong>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Inspection &amp; Marine Cover:</span>
                  <span className="text-emerald-400 font-medium text-right">
                    SGS Seal + ICC (A) Marine Policy
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyCalculatorToRfq}
                className="mt-6 w-full bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold py-3 px-4 rounded-lg transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>
                  {calcApplied
                    ? 'Applied to Formal Trade Desk Form!'
                    : 'Transfer Parameters to Formal Buy RFQ'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Corporate Governance, STOW-TT & Trade Compliance */}
      <section id="compliance" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B]">
              06 · Corporate Infrastructure &amp; Regulatory Governance
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Trinidad &amp; Tobago Operational Footprint &amp; Compliance
            </h2>
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Anchored at <strong>92 Katwaroo Trace, Penal</strong> with bonded staging access at the{' '}
              <strong>Port of Point Lisas Heavy Industrial Estate</strong>, every transaction adheres to strict
              maritime safety, assay verification, and international banking compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <div className="w-10 h-10 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B192C] mb-2">
                STOW-TT HSE Certified Operations
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Full compliance with Trinidad &amp; Tobago Safe TO Work (STOW) occupational health, rigging, and
                environmental containment standards across all port loading berths.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <div className="w-10 h-10 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <FileBadge className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B192C] mb-2">
                SGS &amp; Bureau Veritas Assay
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Independent dockside sampling, chemical purity analysis, draft survey weight verification, and
                tamper-proof container seal registration prior to Bill of Lading issuance.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <div className="w-10 h-10 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B192C] mb-2">
                ICC Incoterms 2020 &amp; CARICOM Origin
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Standardized sales and purchase contracts governed by ICC rules, complete with CARICOM
                Certificates of Origin for duty-exempt regional entry where applicable.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
              <div className="w-10 h-10 bg-[#0B192C] text-[#F1C40F] rounded-lg flex items-center justify-center mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-base text-[#0B192C] mb-2">
                UCP 600 Documentary Trade Settlement
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Structured banking presentation under ICC UCP 600 rules supporting Irrevocable Letters of Credit
                (DLC), Standby LCs, and SWIFT wire settlement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Commercial Trade Desk Portal (Dual Mode: I Want to BUY / I Want to SELL) */}
      <section id="trade-desk" className="py-20 bg-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
            {/* Portal Header */}
            <div className="bg-[#0B192C] px-6 sm:px-8 py-7 text-white">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs">
                <span className="font-bold uppercase tracking-widest text-[#F1C40F]">
                  07 · Commercial Trade Desk Portal
                </span>
                <span className="font-mono text-slate-300">
                  Direct Dispatch · Port of Point Lisas Desk
                </span>
              </div>

              {/* Dual Trade Mode Segmented Switcher */}
              <div className="bg-[#060E18] p-1.5 rounded-xl border border-[#1E3E62] max-w-md mb-5 flex">
                <button
                  type="button"
                  id="trade-mode-buy"
                  onClick={() => setTradeMode('buy')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    tradeMode === 'buy'
                      ? 'bg-[#F1C40F] text-[#060E18] shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  <span>I Want to BUY (RFQ)</span>
                </button>
                <button
                  type="button"
                  id="trade-mode-sell"
                  onClick={() => setTradeMode('sell')}
                  className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    tradeMode === 'sell'
                      ? 'bg-[#152C48] text-white border border-[#1E3E62]'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4 text-[#F1C40F]" />
                  <span>I Want to SELL to Jel Japan</span>
                </button>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
                {tradeMode === 'buy'
                  ? 'Formal Request for Export Quotation (Buy from Jel Japan)'
                  : 'Supplier Offer & Cargo Manifest Submission (Sell to Jel Japan)'}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                {tradeMode === 'buy'
                  ? 'Complete your consignment requirements below. Upon submission, a formatted commercial RFQ with a unique tracking reference will be prepared for immediate transmission.'
                  : 'Submit your available commodity lot, factory production allocation, or surplus equipment manifest for direct evaluation by our purchasing officers.'}
              </p>
            </div>

            {/* Trade Desk Form Body */}
            <form id="formal-trade-form" onSubmit={handleFormalTradeSubmit} className="p-6 sm:p-8 space-y-6">
              {/* Section 1: Entity Info */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#0B192C]" />
                  <span>
                    1. {tradeMode === 'buy' ? 'Purchasing Entity & Signatory' : 'Supplier / Mill Entity & Signatory'}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="trade-company" className="block text-xs font-semibold text-slate-700 mb-1">
                      Registered Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-company"
                      value={tradeCompany}
                      onChange={(e) => setTradeCompany(e.target.value)}
                      placeholder={
                        tradeMode === 'buy'
                          ? 'e.g. Demerara Valley Agricultural Co-op'
                          : 'e.g. Kanto Precision Machinery Co., Ltd.'
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Authorized Officer Name &amp; Title *
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-name"
                      value={tradeName}
                      onChange={(e) => setTradeName(e.target.value)}
                      placeholder="e.g. Marcus Thorne, VP of Procurement"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="trade-email" className="block text-xs font-semibold text-slate-700 mb-1">
                      Corporate Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      id="trade-email"
                      value={tradeEmail}
                      onChange={(e) => setTradeEmail(e.target.value)}
                      placeholder="procurement@corporate.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                      Direct Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      id="trade-phone"
                      value={tradePhone}
                      onChange={(e) => setTradePhone(e.target.value)}
                      placeholder="+1 (868) 000-0000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-mono tabular-nums focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Commodity Specifications */}
              <div className="pt-5 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#0B192C]" />
                  <span>2. Commodity Division &amp; Volume Specifications</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="trade-category" className="block text-xs font-semibold text-slate-700 mb-1">
                      Product Division *
                    </label>
                    <select
                      id="trade-category"
                      value={tradeCategory}
                      onChange={(e) => setTradeCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    >
                      <option value="Industrial Equipment, Food Grade Machinery & Belting">
                        01 · Industrial Equipment &amp; Food Grade Machinery
                      </option>
                      <option value="Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients">
                        02 · Agricultural Fertilizers (Granular Urea 46% / DAP)
                      </option>
                      <option value="Industrial Lubricants, Virgin Base Oils & Process Chemicals">
                        03 · Industrial Lubricants, Base Oils &amp; Chemicals
                      </option>
                      <option value="Automotive Safety Glass, Commercial Spares & Fleet Supplies">
                        04 · Automotive Safety Glass &amp; Fleet Spares
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trade-quantity" className="block text-xs font-semibold text-slate-700 mb-1">
                      {tradeMode === 'buy'
                        ? 'Required Tonnage / Container Volume *'
                        : 'Available Lot Size / Monthly Capacity *'}
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-quantity"
                      value={tradeQuantity}
                      onChange={(e) => setTradeQuantity(e.target.value)}
                      placeholder={
                        tradeMode === 'buy'
                          ? 'e.g. 48 Metric Tons (2 x 20ft FCL)'
                          : 'e.g. 2,500 MT Bulk Parcel / 4 FCL'
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-mono tabular-nums focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Logistics, Incoterms & Price Target */}
              <div className="pt-5 border-t border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3.5 flex items-center gap-2">
                  <Ship className="w-4 h-4 text-[#0B192C]" />
                  <span>3. Incoterms 2020, Routing &amp; Commercial Target</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="trade-incoterm" className="block text-xs font-semibold text-slate-700 mb-1">
                      Incoterms 2020 Basis *
                    </label>
                    <select
                      id="trade-incoterm"
                      value={tradeIncoterm}
                      onChange={(e) => setTradeIncoterm(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    >
                      <option value="CIF (Cost, Insurance & Freight - Discharge Port)">
                        CIF (Cost, Insurance &amp; Freight)
                      </option>
                      <option value="FOB (Free On Board - Point Lisas)">
                        FOB (Free On Board - Point Lisas)
                      </option>
                      <option value="CFR (Cost and Freight - Discharge Port)">CFR (Cost and Freight)</option>
                      <option value="EXW / FCA (Staging Depot / Factory)">
                        EXW / FCA (Factory / Staging Depot)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="trade-port" className="block text-xs font-semibold text-slate-700 mb-1">
                      {tradeMode === 'buy'
                        ? 'Named Discharge Port *'
                        : 'Cargo Origin / Loading Port *'}
                    </label>
                    <input
                      type="text"
                      required
                      id="trade-port"
                      value={tradePortOrOrigin}
                      onChange={(e) => setTradePortOrOrigin(e.target.value)}
                      placeholder={
                        tradeMode === 'buy' ? 'e.g. Port of Georgetown, Guyana' : 'e.g. Yokohama / Houston'
                      }
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="trade-price" className="block text-xs font-semibold text-slate-700 mb-1">
                      {tradeMode === 'buy'
                        ? 'Target Price / L/C Terms (Optional)'
                        : 'Offer Price (USD / MT or Unit) *'}
                    </label>
                    <input
                      type="text"
                      id="trade-price"
                      value={tradePriceTarget}
                      onChange={(e) => setTradePriceTarget(e.target.value)}
                      placeholder="e.g. USD $390 / MT"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 font-mono tabular-nums focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="trade-notes" className="block text-xs font-semibold text-slate-700 mb-1">
                    {tradeMode === 'buy'
                      ? 'Technical Assay Requirements, Packaging & Settlement Notes'
                      : 'Batch COA Summary, Manufacture Date & Inspection Readiness'}
                  </label>
                  <textarea
                    id="trade-notes"
                    rows={3}
                    value={tradeNotes}
                    onChange={(e) => setTradeNotes(e.target.value)}
                    placeholder={
                      tradeMode === 'buy'
                        ? 'Specify bagging preference (50kg PP vs 1000kg FIBC), SAE viscosity grade, conveyor belt width, or preferred Documentary Letter of Credit bank...'
                        : 'Provide chemical assay percentages, SGS inspection certificate numbers, OEM serial numbers, and earliest loading readiness date...'
                    }
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Consent & Submission */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={tradeConsent}
                    onChange={(e) => setTradeConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0B192C] focus:ring-0 cursor-pointer"
                  />
                  <span>
                    I confirm that I am an authorized corporate signatory or procurement officer. This dispatch
                    will be routed directly to the <strong>Jel Japan Enterprise Ltd. Commercial Trade Desk</strong>{' '}
                    under standard ICC non-circumvention and confidentiality protocols.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="trade-submit-button"
                className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-4 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {tradeMode === 'buy'
                    ? 'Generate & Transmit Formal Export RFQ'
                    : 'Generate & Transmit Formal Supplier Offer'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Quiet Corporate Footer */}
      <footer className="bg-[#050B12] text-slate-400 py-16 border-t border-[#152C48]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#152C48]">
            {/* Column 1: Brand & Principal Identity */}
            <div className="space-y-4 md:col-span-2">
              <BrandLogo variant="light" size="md" />
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mt-3">
                Principal Commodity Buyer &amp; Merchant Exporter incorporated in the Republic of Trinidad &amp;
                Tobago. We acquire bulk fertilizers, base oils, industrial equipment, and automotive glazing from
                global manufacturers and execute certified export shipments via the Port of Point Lisas.
              </p>
              <div className="pt-1 text-xs font-mono text-slate-400">
                <span>10°24&apos;N 61°29&apos;W</span>
                <span className="mx-2">·</span>
                <span>STOW-TT Compliant</span>
                <span className="mx-2">·</span>
                <span>ICC Incoterms 2020</span>
              </div>
            </div>

            {/* Column 2: Navigation Mirror */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#F1C40F] mb-4">
                Commercial Desk
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li>
                  <a href="#how-we-trade" className="hover:text-white transition-colors">
                    01 · Buy &amp; Sell Trade Model
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-white transition-colors">
                    02 · Commodity Divisions
                  </a>
                </li>
                <li>
                  <a href="#procurement" className="hover:text-white transition-colors">
                    03 · Inbound Procurement Tenders
                  </a>
                </li>
                <li>
                  <a href="#consignments" className="hover:text-white transition-colors">
                    04 · Recent Consignment Ledger
                  </a>
                </li>
                <li>
                  <a href="#calculator" className="hover:text-white transition-colors">
                    05 · Freight &amp; Transit Estimator
                  </a>
                </li>
                <li>
                  <a
                    href="#trade-desk"
                    onClick={() => setTradeMode('buy')}
                    className="hover:text-white transition-colors"
                  >
                    07 · Submit Export RFQ / Supplier Offer
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Registered Offices & Port Staging */}
            <div>
              <h4 className="font-display text-xs font-bold uppercase tracking-wider text-[#F1C40F] mb-4">
                Registered Locations
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block">Corporate Headquarters</strong>
                    92 Katwaroo Trace, Penal, Trinidad and Tobago, W.I.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Anchor className="w-4 h-4 text-[#F1C40F] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white block">Port Staging &amp; Consolidation</strong>
                    Port of Point Lisas Industrial Estate, Couva, T&amp;T
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-[#F1C40F] shrink-0" />
                  <a href="#trade-desk" className="text-amber-300 hover:underline">
                    Direct Commercial Trade Desk Portal
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2026 Jel Japan Enterprise Ltd. All rights reserved. Buyer &amp; Merchant Exporter.</p>
            <div className="flex items-center gap-4">
              <span>UCP 600 Documentary Standards</span>
              <span>·</span>
              <span>SGS Pre-Shipment Protocol</span>
              <span>·</span>
              <span>STOW-TT HSE</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal Confirmation Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl font-bold text-[#0B192C] mb-1">
              {tradeMode === 'buy' ? 'Commercial RFQ Dossier Generated' : 'Supplier Manifest Dossier Generated'}
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed mb-5">
              Your trade transmission has been formatted with reference{' '}
              <strong className="font-mono text-slate-900">{generatedRefId}</strong> and routed to your email
              client. You may also launch it manually or copy the dossier text below.
            </p>

            {/* Summary Details */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Manifest Reference:</span>
                <strong className="text-[#0B192C] font-mono tabular-nums">{generatedRefId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Trade Direction:</span>
                <strong className="text-amber-800 uppercase font-semibold">
                  {tradeMode === 'buy' ? 'Buy from Jel Japan (RFQ)' : 'Sell to Jel Japan (Offer)'}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Product Division:</span>
                <strong className="text-slate-800 truncate max-w-[220px]">{tradeCategory}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consignment Volume:</span>
                <strong className="text-slate-800 font-mono tabular-nums">{tradeQuantity}</strong>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5">
              <a
                href={tradeMailtoUrl}
                className="w-full bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold py-3 px-4 rounded-lg transition-colors text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email Client with Pre-Filled Dossier</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(getTradeSummaryText(generatedRefId));
                  setCopiedTradeSummary(true);
                  setTimeout(() => setCopiedTradeSummary(false), 3000);
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 px-4 rounded-lg transition-colors text-xs flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>
                  {copiedTradeSummary ? 'Copied Dossier to Clipboard' : 'Copy Formatted Trade Dossier'}
                </span>
              </button>

              <button
                type="button"
                id="modal-ack-btn"
                onClick={() => {
                  setModalOpen(false);
                  setTradeCompany('');
                  setTradeName('');
                  setTradeEmail('');
                  setTradePhone('');
                  setTradePriceTarget('');
                  setTradeNotes('');
                  setTradeConsent(false);
                }}
                className="w-full bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-medium py-2.5 rounded-lg transition-colors text-xs cursor-pointer"
              >
                Close &amp; Return to Portal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
