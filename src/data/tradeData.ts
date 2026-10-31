import {
  CommodityDivision,
  PortRoute,
  ProcurementCategory,
  ConsignmentRecord,
  TradeTestimonial,
} from '../types';

export const COMMODITY_DIVISIONS: CommodityDivision[] = [
  {
    id: 'div1',
    category: 'div1',
    categoryLabel: '01 · Machinery & Industrial Equipment',
    title: 'Industrial Equipment, Food Grade Machinery & Belting',
    hsCode: 'HS 8438 · 3926 · 8422',
    stockStatus: 'Active Buy & Export Desk',
    description:
      'Precision AISI 304/316 stainless steel food processing lines, automated rotary bottling and aseptic packaging assemblies, heavy-duty multi-ply polyester conveyor belting, and motorized drive drums engineered for continuous Caribbean and Latin American processing plants.',
    origin: 'Japan, Germany & South Korea',
    packaging: '20ft / 40ft FCL & ISPM-15 Heat-Treated Crates',
    minOrder: '1 Metric Ton / 1 Production Line Unit',
    indicativeRate: 'FOB / CIF Project Quoted per Bill of Materials',
    inspectionProtocol: 'SGS Pre-Shipment Mechanical & Operational Load Test',
    keySpecs: [
      'AISI 304 & 316L Stainless Food-Contact Assemblies',
      'FDA, CE & JIS B-8802 Machinery Safety Compliance',
      'EP-400/3 to EP-800/4 Oil & Heat Resistant Belting',
      'Complete Wiring Schematics, PLC Logs & Spare Kits',
    ],
    weBuySpec:
      'Direct cash and LC off-take of surplus factory equipment, decommissioned bottling plants, unused OEM conveyor rolls, and stainless jacketed kettles.',
    weSellSpec:
      'Turn-key export of inspected food-grade machinery, custom-vulcanized conveyor belts, and critical plant spares with crated ocean protection.',
  },
  {
    id: 'div2',
    category: 'div2',
    categoryLabel: '02 · Agricultural Nutrients & Nitrogen',
    title: 'Agricultural Fertilizers, Nitrogen Compounds & Soil Nutrients',
    hsCode: 'HS 3102 · 3105 · 2834',
    stockStatus: 'Active Buy & Export Desk',
    description:
      'Point Lisas petrochemical corridor synthesized Granular & Prilled Urea (46% Nitrogen min), Diammonium Phosphate (DAP 18-46-0), and custom tropical NPK blends formulated for commercial sugar, rice, citrus, and row-crop estates.',
    origin: 'Trinidad & Tobago (Point Lisas) & Black Sea / Middle East',
    packaging: '50kg Woven PP Bags with PE Liner & 1,000kg FIBC Bulk Bags',
    minOrder: '24 Metric Tons (1 x 20ft FCL) up to 5,000 MT Parcel',
    indicativeRate: 'USD $365 – $440 / MT FOB Point Lisas (Volume Indexed)',
    inspectionProtocol: 'SGS / Bureau Veritas Batch Assay & Moisture Seal',
    keySpecs: [
      'Total Nitrogen: 46.0% min · Biuret: 1.0% max',
      'Moisture Content: 0.5% max · Granulometry 2.0–4.0mm (90% min)',
      'Formaldehyde Anti-Caking Treated for Humid Ocean Transit',
      'Batch Certificate of Analysis (COA) & Phytosanitary Clearance',
    ],
    weBuySpec:
      'Contracted off-take of bulk urea allocations, ammonium sulphate, DAP, and muriate of potash (MOP) from petrochemical producers and international traders.',
    weSellSpec:
      'Containerized 20ft FCL (24 MT) and breakbulk barge/vessel charters delivered CIF/CFR to agricultural cooperatives, ministries, and agro-distributors.',
  },
  {
    id: 'div3',
    category: 'div3',
    categoryLabel: '03 · Lubricants, Base Oils & Chemicals',
    title: 'Industrial Lubricants, Virgin Base Oils & Process Chemicals',
    hsCode: 'HS 2710 · 3403 · 2814',
    stockStatus: 'Active Buy & Export Desk',
    description:
      'API CK-4/CI-4 heavy-duty diesel engine oils, ISO VG 46/68 anti-wear hydraulic fluids, marine cylinder lubricants, Group II/III paraffinic base oils, and high-drop-point lithium complex greases for marine fleets and energy infrastructure.',
    origin: 'United States (Gulf Coast), Japan & Trinidad',
    packaging: '208L (55 US Gal) New Steel Drums & 1,000L Caged IBC Totes',
    minOrder: '16 Drums (Palletized LCL) / 80 Drums per 20ft FCL',
    indicativeRate: 'USD $495 – $680 / 208L Drum FOB (Grade Dependent)',
    inspectionProtocol: 'ASTM D-445 Kinematic Viscosity & Flash Point COA',
    keySpecs: [
      'API CK-4 / CI-4 Plus & ACEA E9 Heavy-Duty Approvals',
      'NAS 1638 / ISO 4406 Cleanliness Code 16/14/11 Verified',
      'Virgin Group II+ Base Stock with High Oxidation Stability',
      'GHS-Compliant 16-Section SDS & Marine Non-DG Stowing',
    ],
    weBuySpec:
      'Bulk flexitank and drum procurement of Group I/II/III base oils, viscosity index improvers, industrial glycols, and refinery surplus lubricant lots.',
    weSellSpec:
      'Export of palletized 208L steel drums and 1,000L IBC totes to commercial shipping lines, bauxite/gold mining fleets, and regional power plants.',
  },
  {
    id: 'div4',
    category: 'div4',
    categoryLabel: '04 · Automotive Safety Glass & Fleet Spares',
    title: 'Automotive Safety Glass, Commercial Spares & Fleet Supplies',
    hsCode: 'HS 7007 · 8708 · 4016',
    stockStatus: 'Active Buy & Export Desk',
    description:
      'OEM-grade laminated acoustic front windshields, tempered curved side and rear glazing, heavy commercial truck suspension leaf springs, air brake assemblies, and Japanese commercial vehicle filtration kits.',
    origin: 'Japan, Taiwan & North America',
    packaging: 'Fumigated ISPM-15 Plywood Crates with High-Density Foam',
    minOrder: '1 Export Crate (35–50 Windshields) or Mixed 20ft FCL',
    indicativeRate: 'FOB / CIF Assortment Matrix per OEM Part List',
    inspectionProtocol: 'Optical Distortion, DOT-563 & ECE R43 Stamp Audit',
    keySpecs: [
      'DOT, ANSI Z26.1 & European ECE R43 Certified Glazing',
      '0.76mm PVB Acoustic & UV-99% Blocking Interlayer',
      'Direct Fitment for Japanese (Isuzu, Hino, Toyota, Nissan) Fleets',
      '100% Marine Breakage Coverage under CIF Consignments',
    ],
    weBuySpec:
      'Factory lot purchases of laminated automotive glass, surplus OEM Japanese commercial truck parts, and heavy fleet maintenance inventories.',
    weSellSpec:
      'Securely crated wholesale glass assortments and commercial fleet spares shipped to auto-glass distributors and transport authorities.',
  },
];

export const PROCUREMENT_WANTED: ProcurementCategory[] = [
  {
    id: 'proc-1',
    title: 'Bulk Urea 46% N, DAP & NPK Allocations',
    description:
      'Direct mill and petrochemical off-take of prilled/granular Urea (46% N), DAP (18-46-0), and ammonium sulphate in bulk or 1,000kg FIBC bags.',
    preferredTerms: 'FOB Origin Port · CIF Point Lisas · EXW Plant',
    volumeNeeded: '500 MT to 15,000 MT Vessel Parcels',
    settlementTerms: 'Irrevocable DLC at Sight (Top-50 Bank) or TT against SGS B/L',
    specs: ['Nitrogen 46.0% min', 'Moisture < 0.5%', '2–4mm Granulometry', 'Independent SGS Load Port Assay'],
  },
  {
    id: 'proc-2',
    title: 'Group II/III Base Oils & Drummed Lubricants',
    description:
      'Purchasing virgin paraffinic base stocks (150N, 500N, 4cSt/6cSt), finished SAE 15W-40 diesel oils, and ISO VG 68 hydraulic drums.',
    preferredTerms: '24,000L Flexitanks · ISO Tanks · 208L Steel Drums',
    volumeNeeded: '2 to 12 x 20ft FCL Containers Monthly',
    settlementTerms: '100% TT upon SGS Tank/Container Seal Verification',
    specs: ['ASTM D-1500 Color < 0.5', 'Sulfur < 0.03%', 'Certificate of Origin', 'Full 16-Point GHS SDS'],
  },
  {
    id: 'proc-3',
    title: 'Surplus Food Processing & Bottling Machinery',
    description:
      'Acquiring well-maintained stainless steel food processing lines, rotary fillers, shrink-wrappers, and virgin conveyor belt rolls.',
    preferredTerms: 'EXW Factory Floor · FOB Nearest Deepwater Port',
    volumeNeeded: 'Individual Machines to Complete Plant Liquidations',
    settlementTerms: 'Escrow / Documentary Collection or Staged Wire Transfer',
    specs: ['AISI 304/316 Construction', 'OEM Serial Plates Intact', '380V/440V 50/60Hz Motors', 'Clean Decommission Log'],
  },
  {
    id: 'proc-4',
    title: 'Japanese Commercial Vehicle Glass & Spares',
    description:
      'Procuring container lots of laminated front windshields and heavy-duty suspension/brake components for Hino, Isuzu, Mitsubishi Fuso, and Toyota.',
    preferredTerms: 'FOB Yokohama / Nagoya / Kaohsiung · CIF Point Lisas',
    volumeNeeded: '1 to 4 x 20ft / 40ft FCL Crated Lots per Quarter',
    settlementTerms: 'Irrevocable LC at Sight or 30/70 Documentary Wire',
    specs: ['DOT / JIS R3211 Marked', 'ISPM-15 Export Crated', 'Zero Delamination Warranty', 'VIN/OEM Cross-Reference List'],
  },
];

export const PORT_ROUTES: PortRoute[] = [
  {
    portName: 'Port of Point Lisas (PLIPDECO)',
    country: 'Trinidad & Tobago',
    corridor: 'Primary Origin & Consolidation Hub',
    transitDays: '0 Days (Berths #1–#5)',
    departureFrequency: 'Daily Bulk & Container Berthing',
    recommendedIncoterm: 'FOB / EXW / FAS',
    vesselClass: 'Panamax Bulk & Geared Feeder',
  },
  {
    portName: 'Port of Georgetown',
    country: 'Guyana',
    corridor: 'Guiana Shield Energy & Agro Corridor',
    transitDays: '3 – 4 Business Days',
    departureFrequency: '3x Weekly Direct Feeder & Barge',
    recommendedIncoterm: 'CIF / CFR Georgetown',
    vesselClass: 'Shallow-Draft Geared Container',
  },
  {
    portName: 'Port of Bridgetown',
    country: 'Barbados',
    corridor: 'Eastern Caribbean Distribution Hub',
    transitDays: '2 – 3 Business Days',
    departureFrequency: '3x Weekly Scheduled Sailings',
    recommendedIncoterm: 'CIF Bridgetown',
    vesselClass: 'Regional Lo-Lo / Ro-Ro Feeder',
  },
  {
    portName: 'Port of Kingston (KFTL)',
    country: 'Jamaica',
    corridor: 'Northern CARICOM Transshipment Hub',
    transitDays: '4 – 6 Business Days',
    departureFrequency: 'Twice Weekly Direct Service',
    recommendedIncoterm: 'CIF / CFR Kingston',
    vesselClass: 'Sub-Panamax Container Vessel',
  },
  {
    portName: 'Port of Miami / Port Everglades',
    country: 'United States',
    corridor: 'North American Atlantic Corridor',
    transitDays: '7 – 9 Business Days',
    departureFrequency: 'Weekly Fixed-Day Liner Call',
    recommendedIncoterm: 'CIF Miami / FOB Point Lisas',
    vesselClass: '1,700–2,500 TEU Liner',
  },
  {
    portName: 'Port of Houston (Barbours Cut)',
    country: 'United States',
    corridor: 'US Gulf Petrochemical & Machinery Hub',
    transitDays: '8 – 10 Business Days',
    departureFrequency: 'Weekly Gulf Express Service',
    recommendedIncoterm: 'FOB Houston / CIF Point Lisas',
    vesselClass: 'Geared Container & Chemical Parcel',
  },
  {
    portName: 'Port of Rotterdam (Europoort)',
    country: 'Netherlands',
    corridor: 'European Transatlantic Gateway',
    transitDays: '18 – 21 Business Days',
    departureFrequency: 'Weekly Europe-Caribbean Liner',
    recommendedIncoterm: 'CIF / CFR Rotterdam',
    vesselClass: 'Deepsea Post-Panamax Liner',
  },
  {
    portName: 'Port of Yokohama / Kobe',
    country: 'Japan',
    corridor: 'East Asia OEM Machinery & Spares Lane',
    transitDays: '34 – 40 Business Days',
    departureFrequency: 'Bi-Weekly via Panama Canal',
    recommendedIncoterm: 'FOB Yokohama / CIF Point Lisas',
    vesselClass: 'Transpacific Container / Ro-Ro',
  },
];

export const RECENT_CONSIGNMENTS: ConsignmentRecord[] = [
  {
    manifestId: 'BOL-PL-2026-0841',
    date: 'Oct 2026',
    direction: 'EXPORT (SOLD)',
    commodity: 'Granular Urea 46% N (1,000kg FIBC Bulk Bags)',
    volume: '480 MT (20 x 20ft FCL)',
    originPort: 'Point Lisas, T&T',
    dischargePort: 'Georgetown, Guyana',
    incoterm: 'CIF Georgetown',
    verification: 'SGS Cert #TT-99412',
  },
  {
    manifestId: 'BOL-YK-2026-0794',
    date: 'Sep 2026',
    direction: 'IMPORT (PURCHASED)',
    commodity: 'AISI 316 Rotary Bottling Line & EP-600 Belting',
    volume: '38 MT (2 x 40ft HC)',
    originPort: 'Yokohama, Japan',
    dischargePort: 'Point Lisas, T&T',
    incoterm: 'FOB Yokohama',
    verification: 'Bureau Veritas #JP-4481',
  },
  {
    manifestId: 'BOL-PL-2026-0752',
    date: 'Sep 2026',
    direction: 'EXPORT (SOLD)',
    commodity: 'API CK-4 SAE 15W-40 Diesel Oil & ISO VG 68',
    volume: '320 Drums (4 x 20ft FCL)',
    originPort: 'Point Lisas, T&T',
    dischargePort: 'Kingston, Jamaica',
    incoterm: 'CFR Kingston',
    verification: 'ASTM Batch COA #LB-209',
  },
  {
    manifestId: 'BOL-HS-2026-0688',
    date: 'Aug 2026',
    direction: 'IMPORT (PURCHASED)',
    commodity: 'Virgin Group II Base Oil (500N) Flexitank Lot',
    volume: '144 MT (6 x 24,000L Flexi)',
    originPort: 'Houston, TX, USA',
    dischargePort: 'Point Lisas, T&T',
    incoterm: 'CIF Point Lisas',
    verification: 'SGS Assay #US-81024',
  },
  {
    manifestId: 'BOL-PL-2026-0619',
    date: 'Jul 2026',
    direction: 'EXPORT (SOLD)',
    commodity: 'DOT Laminated Commercial Truck Windshields',
    volume: '1,400 Units (2 x 20ft Crated)',
    originPort: 'Point Lisas, T&T',
    dischargePort: 'Bridgetown, Barbados',
    incoterm: 'CIF Bridgetown',
    verification: 'Zero-Breakage Seal #CR-551',
  },
];

export const TRADE_TESTIMONIALS: TradeTestimonial[] = [
  {
    id: 'test-1',
    quote:
      'Prior to partnering with Jel Japan Enterprise, seasonal urea procurement from outside the basin took 38+ days and suffered caking losses. Their Point Lisas staging desk delivered 480 MT of anti-caking treated Granular Urea 46% to our Demerara wharf in 4 days with full SGS batch certification.',
    outcomeMetric: '4-Day Feeder Transit · 0% Moisture Caking Loss across 480 MT',
    signatory: 'Devindra Persaud',
    role: 'Director of Agro-Inputs & Supply Chain',
    organization: 'Demerara Valley Agricultural Co-op',
    location: 'Georgetown, Guyana',
  },
  {
    id: 'test-2',
    quote:
      'When we decommissioned two stainless steel beverage bottling lines in Kanagawa, Jel Japan Enterprise executed an immediate FOB Yokohama purchase order, handled SGS mechanical inspection within 72 hours, and settled our Documentary Letter of Credit on first presentation.',
    outcomeMetric: '72-Hour Inspection · 100% Sight LC Settlement on Presentation',
    signatory: 'Kenji Takahashi',
    role: 'General Manager, Industrial Asset Divestiture',
    organization: 'Kanto Precision Food Machinery Co., Ltd.',
    location: 'Yokohama, Japan',
  },
  {
    id: 'test-3',
    quote:
      'Consolidating API CK-4 fleet lubricants and crated OEM windshields on a single CIF Kingston Bill of Lading reduced our landed container freight costs by 22% over the past three quarters while maintaining zero glass breakage.',
    outcomeMetric: '22% Reduction in Landed Freight · 100% Intact Crated Delivery',
    signatory: 'Marcus Thorne',
    role: 'VP of Fleet Operations & Procurement',
    organization: 'Antilles Heavy Haulage & Logistics Ltd.',
    location: 'Kingston, Jamaica',
  },
];

export const INCOTERMS_INFO = [
  {
    code: 'FOB · Free On Board',
    title: 'Free On Board (Port of Point Lisas)',
    desc: 'Jel Japan Enterprise clears goods for export and loads cargo past the vessel rail at Point Lisas Terminal. Buyer nominates ocean carrier and covers main carriage and insurance.',
    bestFor: 'Importers with established regional feeder contracts or chartered vessels.',
  },
  {
    code: 'CIF · Cost, Insurance & Freight',
    title: 'Cost, Insurance & Freight (Named Discharge Port)',
    desc: 'Turn-key export execution: we arrange origin terminal handling, ocean freight, and ICC Clause (A) marine cargo insurance directly to your discharge port.',
    bestFor: 'Distributors and agro-estates requiring guaranteed landed cost and marine cover.',
  },
  {
    code: 'CFR · Cost & Freight',
    title: 'Cost and Freight (Named Discharge Port)',
    desc: 'We contract and pay for ocean carriage to the destination port; risk transfers once containers or bulk bags are stowed on board at Point Lisas.',
    bestFor: 'Commercial buyers holding annual open marine cargo policies with domestic insurers.',
  },
  {
    code: 'EXW / FCA · Staging Warehouse',
    title: 'Ex Works / Free Carrier (Penal / Point Lisas)',
    desc: 'Cargo is staged, palletized, and SGS-sealed at our bonded Point Lisas facility for collection by buyer-appointed customs brokers or hauliers.',
    bestFor: 'Trinidad & Tobago industrial operators and regional LCL consolidators.',
  },
];
