import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  ShieldCheck,
  Search,
  ExternalLink,
  Mail,
  Building2,
  Ship,
  Award,
  HelpCircle,
  ArrowRight,
  X,
  Clock,
  Tag,
} from 'lucide-react';
import { SEO_ARTICLES, SEO_FAQS, OFFICIAL_ENTITY_FACTS, SeoArticle } from '../data/seoArticles';

interface SeoKnowledgeHubProps {
  onSelectBuyProduct: (productTitle: string) => void;
  onSelectSellToUs: (productTitle: string) => void;
}

export const SeoKnowledgeHub: React.FC<SeoKnowledgeHubProps> = ({
  onSelectBuyProduct,
  onSelectSellToUs,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<SeoArticle | null>(null);
  const [expandedArticleIds, setExpandedArticleIds] = useState<Record<string, boolean>>({
    'art-01': true,
    'art-02': true,
  });
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1');

  // Deep-link support for ?article=slug or ?section=... from Google Search / Sitemap
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const articleSlug = params.get('article');
      const sectionParam = params.get('section');

      if (articleSlug) {
        const matched = SEO_ARTICLES.find((a) => a.slug === articleSlug);
        if (matched) {
          setActiveArticle(matched);
          document.title = `${matched.title} | Jel Japan Enterprise Ltd.`;
        }
      } else if (sectionParam) {
        const sectionMap: Record<string, string> = {
          products: 'catalog',
          shipments: 'consignments',
          articles: 'articles',
          reviews: 'consignments',
          contact: 'faq',
        };
        const targetId = sectionMap[sectionParam];
        if (targetId) {
          setTimeout(() => {
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
          }, 250);
        }
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  const handleOpenArticleModal = (article: SeoArticle) => {
    setActiveArticle(article);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('article', article.slug);
      window.history.replaceState({}, '', url.toString());
      document.title = `${article.title} | Jel Japan Enterprise Ltd.`;
    } catch {
      // Ignore history API restrictions in sandboxed environments
    }
  };

  const handleCloseArticleModal = () => {
    setActiveArticle(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('article');
      window.history.replaceState({}, '', url.toString());
      document.title =
        'Jel Japan Enterprise Ltd. | Official Import & Export, Heavy Lift & Products (Trinidad & Tobago)';
    } catch {
      // Ignore history API restrictions
    }
  };

  const toggleInlineExpand = (id: string) => {
    setExpandedArticleIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const categories = [
    'All',
    'Corporate Profile',
    'Products & Catalog',
    'Heavy Lift & Contracts',
    'Shipment Records',
    'Logistics Corridor',
    'Reviews & Contact',
  ];

  const filteredArticles = SEO_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    const hay = `${article.title} ${article.subtitle} ${article.summary} ${article.targetKeywords.join(' ')}`.toLowerCase();
    return matchesCategory && hay.includes(q);
  });

  return (
    <>
      {/* SECTION 05: TRADE INTELLIGENCE, BLOG ARTICLES & CORPORATE PUBLICATIONS */}
      <section
        id="articles"
        aria-label="Jel Japan Enterprise Ltd. Trade Intelligence Articles and Corporate Publications"
        className="py-16 sm:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div className="max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B] flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>05 · Official Publications, Trade Briefs &amp; Corporate Knowledge Base</span>
              </div>
              <h2
                className="font-display text-2xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
                style={{ textWrap: 'balance' }}
              >
                Jel Japan Enterprise Ltd. — Products, Shipment Records, Heavy Lift &amp; Trinidad Operations
              </h2>
              <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
                Authoritative corporate publications covering <strong>Jel Japan Enterprise Ltd. products</strong>,{' '}
                <strong>22+ verified import &amp; export shipments</strong>,{' '}
                <strong>heavy lift &amp; transport services</strong>,{' '}
                <strong>contract &amp; procurement management</strong>, and operations at{' '}
                <strong>92 Katwaroo Trace, Penal</strong> and the <strong>Port of Point Lisas</strong>.
              </p>
            </div>

            {/* Article Search Input */}
            <div className="w-full lg:w-80 shrink-0">
              <label htmlFor="article-search" className="sr-only">
                Search corporate articles and product guides
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="article-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, Penal, shipments..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0B192C] focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-slate-200">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-[#F1C40F] shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid (Full Schema.org BlogPosting markup + crawlable full text) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArticles.map((article) => {
              const isExpanded = !!expandedArticleIds[article.id];
              return (
                <article
                  key={article.id}
                  itemScope
                  itemType="https://schema.org/BlogPosting"
                  className="bg-slate-50 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Meta Strip */}
                  <div>
                    <div className="bg-[#0B192C] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span
                        itemProp="articleSection"
                        className="font-mono font-bold uppercase tracking-wider text-[#F1C40F]"
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-3 text-slate-300 font-mono text-[11px]">
                        <time itemProp="datePublished" dateTime="2026-11-12">
                          {article.publishDate}
                        </time>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#F1C40F]" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-7">
                      <h3
                        itemProp="headline"
                        className="font-display text-lg sm:text-xl font-extrabold text-[#0B192C] leading-snug mb-2.5"
                      >
                        <button
                          type="button"
                          onClick={() => handleOpenArticleModal(article)}
                          className="text-left hover:text-[#1E3E62] transition-colors cursor-pointer"
                        >
                          {article.title}
                        </button>
                      </h3>

                      <p
                        itemProp="description"
                        className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4"
                      >
                        {article.summary}
                      </p>

                      {/* Key Takeaways Box */}
                      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-5">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#0B192C] mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Key Executive Takeaways</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {article.keyTakeaways.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#B7950B] font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Full Article Body — Always present in DOM for search crawlers, collapsible for clean UX */}
                      <div
                        itemProp="articleBody"
                        className={isExpanded ? 'space-y-4 mt-4 pt-4 border-t border-slate-200' : 'sr-only'}
                      >
                        {article.sections.map((sec, sIdx) => (
                          <div key={sIdx} className="space-y-2">
                            <h4 className="font-display text-sm font-bold text-[#0B192C]">{sec.heading}</h4>
                            {sec.paragraphs.map((p, pIdx) => (
                              <p key={pIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {p}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>

                      {/* Indexed Keywords Footer */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-4">
                        <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
                        {article.targetKeywords.map((kw) => (
                          <span
                            key={kw}
                            itemProp="keywords"
                            className="text-[11px] font-mono bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="px-5 sm:px-7 py-3.5 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleInlineExpand(article.id)}
                      className="text-xs font-bold text-[#0B192C] hover:text-[#1E3E62] flex items-center gap-1.5 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>Collapse Inline Text</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>Expand Full Article Inline</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenArticleModal(article)}
                      className="bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Dossier Reader</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 07: OFFICIAL CORPORATE DIRECTORY, VERIFICATION & SEARCH FAQ */}
      <section
        id="faq"
        itemScope
        itemType="https://schema.org/FAQPage"
        aria-label="Jel Japan Enterprise Ltd. Official Directory, Contact Information, Reviews and Frequently Asked Questions"
        className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#B7950B] flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              <span>07 · Official Corporate Verification, Contact Details &amp; Search FAQ</span>
            </div>
            <h2
              className="font-display text-2xl sm:text-4xl font-extrabold text-[#0B192C] mt-2"
              style={{ textWrap: 'balance' }}
            >
              Verified Corporate Profile, Products, Reviews &amp; Direct Contact Directory
            </h2>
            <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
              Direct answers for procurement officers, customs brokers, and global suppliers searching for{' '}
              <strong>Jel Japan Enterprise Ltd. products</strong>,{' '}
              <strong>Jel Japan Enterprise Ltd. contact number &amp; email</strong>,{' '}
              <strong>Jel Japan Enterprise Ltd. reviews</strong>, and our{' '}
              <strong>22+ import/export shipment records</strong> at <strong>92 Katwaroo Trace, Penal</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5 cols): Official Corporate Entity Record (Google Knowledge Panel Mirror) */}
            <div
              itemScope
              itemType="https://schema.org/Corporation"
              className="lg:col-span-5 bg-[#0B192C] text-white rounded-xl border border-[#1E3E62] p-6 sm:p-7 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#1E3E62] pb-4 mb-5">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#F1C40F] block">
                    Official Registered Entity
                  </span>
                  <h3 itemProp="name" className="font-display text-xl font-extrabold text-white mt-0.5">
                    {OFFICIAL_ENTITY_FACTS.legalName}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#152C48] border border-[#1E3E62] flex items-center justify-center text-[#F1C40F] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <dl className="space-y-4 text-xs">
                <div className="pb-3 border-b border-[#152C48]">
                  <dt className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>Registered Headquarters Address</span>
                  </dt>
                  <dd
                    itemProp="address"
                    itemScope
                    itemType="https://schema.org/PostalAddress"
                    className="text-white font-medium leading-relaxed"
                  >
                    <span itemProp="streetAddress">92 Katwaroo Trace, Penal / Katwaroo</span>,{' '}
                    <span itemProp="addressLocality">Penal</span>,{' '}
                    <span itemProp="addressCountry">Trinidad and Tobago</span>, W.I.
                  </dd>
                </div>

                <div className="pb-3 border-b border-[#152C48]">
                  <dt className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>Port Terminal &amp; Consolidation Hub</span>
                  </dt>
                  <dd className="text-slate-200 leading-relaxed">
                    {OFFICIAL_ENTITY_FACTS.portStagingTerminal} (10°24&apos;N 61°29&apos;W)
                  </dd>
                </div>

                <div className="pb-3 border-b border-[#152C48]">
                  <dt className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>Core Operations &amp; Capabilities</span>
                  </dt>
                  <dd itemProp="description" className="text-slate-200 leading-relaxed">
                    {OFFICIAL_ENTITY_FACTS.primaryOperations}
                  </dd>
                </div>

                <div className="pb-3 border-b border-[#152C48]">
                  <dt className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>Customs &amp; Shipment Track Record</span>
                  </dt>
                  <dd className="text-amber-300 font-mono leading-relaxed">
                    {OFFICIAL_ENTITY_FACTS.verifiedShipmentTrackRecord}
                  </dd>
                </div>

                <div className="pb-3 border-b border-[#152C48]">
                  <dt className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#F1C40F]" />
                    <span>Direct Commercial Trade Desk Contact</span>
                  </dt>
                  <dd className="text-white font-mono break-all">
                    <a
                      itemProp="email"
                      href="mailto:jeljapanenterpriseltdshop@gmail.com"
                      className="text-[#F1C40F] hover:underline"
                    >
                      {OFFICIAL_ENTITY_FACTS.officialEmail}
                    </a>
                    <span className="block text-slate-400 text-[11px] mt-1 font-sans">
                      Operating Hours: {OFFICIAL_ENTITY_FACTS.operatingHours}
                    </span>
                  </dd>
                </div>
              </dl>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="#trade-desk"
                  onClick={() => onSelectBuyProduct('Industrial Equipment, Food Grade Machinery & Belting')}
                  className="bg-[#F1C40F] hover:bg-[#F4D03F] text-[#060E18] font-bold text-xs py-3 px-4 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Request Export Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="#trade-desk"
                  onClick={() =>
                    onSelectSellToUs('Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients')
                  }
                  className="bg-[#152C48] hover:bg-[#1E3E62] text-white border border-[#1E3E62] font-bold text-xs py-3 px-4 rounded-lg text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Submit Supplier Offer</span>
                </a>
              </div>
            </div>

            {/* Right Column (7 cols): Structured FAQPage Accordion */}
            <div className="lg:col-span-7 space-y-3.5">
              {SEO_FAQS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                    className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded inline-block mb-1.5">
                          {faq.category}
                        </span>
                        <h3 itemProp="name" className="font-display text-sm sm:text-base font-bold text-[#0B192C]">
                          {faq.question}
                        </h3>
                      </div>
                      <span className="mt-1 text-slate-400 shrink-0">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* Always kept in DOM for Schema.org FAQPage crawlers */}
                    <div
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                      className={isOpen ? 'px-5 sm:px-6 pb-5 pt-2 border-t border-slate-100 block' : 'sr-only'}
                    >
                      <div itemProp="text" className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <p className="font-semibold text-[#0B192C]">{faq.shortAnswer}</p>
                        <p>{faq.detailedAnswer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* EXECUTIVE ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Modal Top Header */}
            <div className="bg-[#0B192C] text-white px-5 sm:px-8 py-5 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#F1C40F] mb-1.5">
                  <span>{activeArticle.category}</span>
                  <span>·</span>
                  <span>{activeArticle.publishDate}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h2
                  id="modal-article-title"
                  className="font-display text-lg sm:text-2xl font-extrabold leading-snug"
                >
                  {activeArticle.title}
                </h2>
                <p className="text-xs text-slate-300 mt-1">{activeArticle.authorRole}</p>
              </div>
              <button
                type="button"
                onClick={handleCloseArticleModal}
                aria-label="Close article reader"
                className="p-2 rounded-lg bg-[#152C48] text-slate-200 hover:text-[#F1C40F] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-800">
              <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border-l-4 border-[#F1C40F]">
                {activeArticle.subtitle}
              </p>

              {/* Key Takeaways */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B192C] mb-3">
                  Executive Summary &amp; Key Verification Points
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                  {activeArticle.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Sections */}
              <div className="space-y-6">
                {activeArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h3 className="font-display text-base sm:text-lg font-extrabold text-[#0B192C]">
                      {section.heading}
                    </h3>
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="text-sm text-slate-700 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="bg-slate-100 px-5 sm:px-8 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-600">
                <strong>Jel Japan Enterprise Ltd.</strong> · 92 Katwaroo Trace, Penal &amp; Port of Point Lisas, T&amp;T
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="#trade-desk"
                  onClick={() => {
                    handleCloseArticleModal();
                    onSelectBuyProduct('Industrial Equipment, Food Grade Machinery & Belting');
                  }}
                  className="bg-[#0B192C] hover:bg-[#152C48] text-[#F1C40F] font-bold text-xs px-4 py-2.5 rounded-lg transition-colors"
                >
                  Proceed to Trade Desk (Buy / Sell)
                </a>
                <button
                  type="button"
                  onClick={handleCloseArticleModal}
                  className="bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                  Close Reader
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
