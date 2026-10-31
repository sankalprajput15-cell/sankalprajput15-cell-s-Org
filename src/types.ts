export interface CommodityDivision {
  id: string;
  category: 'div1' | 'div2' | 'div3' | 'div4';
  categoryLabel: string;
  title: string;
  hsCode: string;
  stockStatus: string;
  description: string;
  origin: string;
  packaging: string;
  minOrder: string;
  indicativeRate: string;
  inspectionProtocol: string;
  keySpecs: string[];
  weBuySpec: string;
  weSellSpec: string;
}

export interface ProcurementCategory {
  id: string;
  title: string;
  description: string;
  preferredTerms: string;
  volumeNeeded: string;
  settlementTerms: string;
  specs: string[];
}

export interface PortRoute {
  portName: string;
  country: string;
  corridor: string;
  transitDays: string;
  departureFrequency: string;
  recommendedIncoterm: string;
  vesselClass: string;
}

export interface ConsignmentRecord {
  manifestId: string;
  date: string;
  direction: 'EXPORT (SOLD)' | 'IMPORT (PURCHASED)';
  commodity: string;
  volume: string;
  originPort: string;
  dischargePort: string;
  incoterm: string;
  verification: string;
}

export interface TradeTestimonial {
  id: string;
  quote: string;
  outcomeMetric: string;
  signatory: string;
  role: string;
  organization: string;
  location: string;
}
