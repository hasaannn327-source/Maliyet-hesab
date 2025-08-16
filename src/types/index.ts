export type QualityMultipliers = Record<QualityLevel, number>;

export interface CalculationInput {
  arsaM2: string;
  insaatM2: string;
  kabaMaliyet: boolean;
  inceMaliyet: boolean;
  selectedCity: string;
  qualityLevel: QualityLevel;
  profitMargin: number;
  projectDuration: number;
}

export interface CalculationResult {
  betonFiyat: number;
  demirFiyat: number;
  kalipDemirIscilik: number;
  cati: number;
  duvarFiyat: number;
  alciBoyaSivaFiyat: number;
  mekanik: number;
  zeminKaplama: number;
  dogramaFiyat: number;
  disCepheFiyat: number;
  oncesiGider: number;
  montajFiyat: number;
  asansorBoslugu: number;
  asansorCihazFiyat: number;
  peyzajFiyat: number;
  ongorulmayanGiderler: number;
  resmiIslemler: number;
  toplamKaba: number;
  toplamInce: number;
  toplam: number;
  toplamCarpanli: number;
  hataPayi: number;
  toplamHataPayli: number;
  profitAmount: number;
  finalTotal: number;
  timeline: TimelineItem[];
}

export interface TimelineItem {
  phase: string;
  duration: number;
  cost: number;
  startMonth: number;
  endMonth: number;
}

export interface SavedCalculation {
  id: number;
  date: string;
  arsaM2: string;
  insaatM2: string;
  kabaMaliyet: boolean;
  inceMaliyet: boolean;
  selectedCity: string;
  qualityLevel: QualityLevel;
  profitMargin: number;
  result: CalculationResult;
}

export type QualityLevel = 'Ekonomik' | 'Orta' | 'Kaliteli' | 'Lüks';
export type Theme = 'light' | 'dark';

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface PriceConfig {
  beton: {
    m3Fiyat: number;
    m3PerM2: number;
  };
  demir: {
    tonFiyat: number;
    tonPerM2: number;
  };
}

export interface CityMultipliers {
  [key: string]: number;
}

