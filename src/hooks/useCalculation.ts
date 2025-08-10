import { useState, useCallback } from 'react';
import { CalculationInput, CalculationResult, TimelineItem } from '../types';
import { CITY_MULTIPLIERS, QUALITY_MULTIPLIERS } from '../config/PriceConfig';

export const useCalculation = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTimeline = useCallback((insaatM2: number, totalCost: number, duration: number): TimelineItem[] => {
    const phases = [
      { phase: 'Hazırlık ve Temel', duration: Math.ceil(duration * 0.2), cost: totalCost * 0.15 },
      { phase: 'Kaba İnşaat', duration: Math.ceil(duration * 0.4), cost: totalCost * 0.45 },
      { phase: 'İnce İnşaat', duration: Math.ceil(duration * 0.3), cost: totalCost * 0.30 },
      { phase: 'Son İşler', duration: Math.ceil(duration * 0.1), cost: totalCost * 0.10 }
    ];

    let currentMonth = 0;
    return phases.map(phase => {
      const startMonth = currentMonth;
      const endMonth = currentMonth + phase.duration;
      currentMonth = endMonth;
      
      return {
        ...phase,
        startMonth,
        endMonth
      };
    });
  }, []);

  const calculate = useCallback((input: CalculationInput) => {
    setIsCalculating(true);
    
    try {
      const a = parseFloat(input.arsaM2);
      const i = parseFloat(input.insaatM2);
      
      // Temel validasyon (form'da da kontrol ediliyor ama güvenlik için)
      if (isNaN(a) || isNaN(i) || a <= 0 || i <= 0) {
        throw new Error("Geçersiz alan değerleri!");
      }

      // Kaba maliyet hesaplamaları
      const betonM3 = i * 0.35;
      const betonFiyat = betonM3 * 3000;

      const demirTon = i * 0.04;
      const demirFiyat = demirTon * 27000;

      const kalipDemirIscilik = i * 1500;
      const cati = i * 1500;

      const duvarM2 = i - i * 0.2;
      const duvarFiyat = duvarM2 * 250;

      // İnce maliyet hesaplamaları
      const alciBoyaSivaM2 = duvarM2 * 3;
      const alciBoyaSivaFiyat = alciBoyaSivaM2 * 350;

      const mekanik = duvarM2 * 500;
      const zeminKaplama = i * 0.6 * 1200;

      const ortalamaDaireM2 = 100;
      const daireSayisi = Math.ceil(i / ortalamaDaireM2);
      const pencereAdet = daireSayisi * 6;
      const kapiAdet = daireSayisi * 5;
      const celikKapiAdet = daireSayisi;
      const dogramaFiyat = pencereAdet * 7000 + kapiAdet * 10000 + celikKapiAdet * 25000;

      const disCepheM2 = i / 6.25;
      const disCepheFiyat = disCepheM2 * 2200;

      const oncesiGider = (i / 1000) * 700000;

      const banyoSayisi = Math.ceil(i / 100);
      const montajFiyat = banyoSayisi * 15000;

      const asansorBoslugu = 35000;
      const katSayisi = Math.ceil(i / a / 0.4);
      const asansorAdet = Math.ceil(katSayisi / 4);
      const asansorCihazFiyat = asansorAdet * (i * 700);

      const peyzajAlan = a * 0.2;
      const peyzajFiyat = peyzajAlan * 300;

      const ongorulmayanGiderler = 1000000;
      const resmiIslemler = i * 83;

      // Toplam hesaplamaları
      const toplamKaba = betonFiyat + demirFiyat + kalipDemirIscilik + cati + duvarFiyat;
      const toplamInce = alciBoyaSivaFiyat + mekanik + zeminKaplama + dogramaFiyat + 
                        disCepheFiyat + oncesiGider + montajFiyat + asansorBoslugu + 
                        asansorCihazFiyat + peyzajFiyat + ongorulmayanGiderler + resmiIslemler;

      const toplam = (input.kabaMaliyet ? toplamKaba : 0) + (input.inceMaliyet ? toplamInce : 0);
      
      // Çarpanları uygula
      const cityMultiplier = CITY_MULTIPLIERS[input.selectedCity] || 1;
      const qualityMultiplier = QUALITY_MULTIPLIERS[input.qualityLevel as keyof typeof QUALITY_MULTIPLIERS];
      const toplamCarpanli = toplam * cityMultiplier * qualityMultiplier;

      const hataPayi = toplamCarpanli * 0.05;
      const toplamHataPayli = toplamCarpanli + hataPayi;

      // Kar marjı hesaplama
      const profitAmount = toplamHataPayli * (input.profitMargin / 100);
      const finalTotal = toplamHataPayli + profitAmount;

      // Zaman çizelgesi
      const timeline = calculateTimeline(i, finalTotal, input.projectDuration);

      const calculationResult: CalculationResult = {
        betonFiyat,
        demirFiyat,
        kalipDemirIscilik,
        cati,
        duvarFiyat,
        alciBoyaSivaFiyat,
        mekanik,
        zeminKaplama,
        dogramaFiyat,
        disCepheFiyat,
        oncesiGider,
        montajFiyat,
        asansorBoslugu,
        asansorCihazFiyat,
        peyzajFiyat,
        ongorulmayanGiderler,
        resmiIslemler,
        toplamKaba,
        toplamInce,
        toplam,
        toplamCarpanli,
        hataPayi,
        toplamHataPayli,
        profitAmount,
        finalTotal,
        timeline
      };

      setResult(calculationResult);
      return calculationResult;
    } catch (error) {
      throw error;
    } finally {
      setIsCalculating(false);
    }
  }, [calculateTimeline]);

  return {
    result,
    calculate,
    isCalculating,
    setResult
  };
};