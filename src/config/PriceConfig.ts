import { type PriceConfig, type CityMultipliers, type QualityLevel } from '../types';

// Fiyat yapılandırma dosyası
export const PRICES: PriceConfig = {
  beton: {
    m3Fiyat: 3000,
    m3PerM2: 0.35
  },
  demir: {
    tonFiyat: 27000,
    tonPerM2: 0.04
  }
};

// Şehir çarpanları
export const CITY_MULTIPLIERS: CityMultipliers = {
  'İstanbul': 1.25,
  'Ankara': 1.15,
  'İzmir': 1.20,
  'Antalya': 1.18,
  'Bursa': 1.12,
  'Adana': 1.08,
  'Gaziantep': 1.05,
  'Konya': 1.03,
  'Diğer': 1.0
};

// Kalite çarpanları
export const QUALITY_MULTIPLIERS: Record<QualityLevel, number> = {
  'Ekonomik': 0.85,
  'Standart': 1.0,
  'Lüks': 1.35,
};
