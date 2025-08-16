import { PriceConfig, CityMultipliers, QualityMultipliers, QualityLevel } from '../types';

export const QUALITY_MULTIPLIERS = {
  Ekonomik: 0.85,
  Orta: 1.0,
  Kaliteli: 1.15,
  Lüks: 1.35,
} as const satisfies Record<QualityLevel, number>;
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


