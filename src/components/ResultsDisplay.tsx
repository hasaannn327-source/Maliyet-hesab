import React from 'react';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartPieIcon,
  CalendarIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { CalculationResult, CalculationInput } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface ResultsDisplayProps {
  result: CalculationResult;
  input: CalculationInput;
  onSave: () => void;
  onShowHistory: () => void;
  savedCount: number;
}

interface CostItemProps {
  title: string;
  cost: number;
  icon: string;
}

const CostItem: React.FC<CostItemProps> = ({ title, cost, icon }) => (
  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium text-gray-900 dark:text-gray-100">{title}</span>
      </div>
      <span className="font-bold text-indigo-600 dark:text-indigo-400">
        {cost.toLocaleString('tr-TR')} TL
      </span>
    </div>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  input,
  onSave,
  onShowHistory,
  savedCount
}) => {
  const kabaMaliyetItems = [
    { title: 'Beton', cost: result.betonFiyat, icon: '🧱' },
    { title: 'Demir', cost: result.demirFiyat, icon: '🔩' },
    { title: 'Kalıp/Demir İşçilik', cost: result.kalipDemirIscilik, icon: '👷' },
    { title: 'Çatı', cost: result.cati, icon: '🏠' },
    { title: 'Duvar', cost: result.duvarFiyat, icon: '🧱' },
  ];

  const inceMaliyetItems = [
    { title: 'İnşaat Öncesi Giderler', cost: result.oncesiGider, icon: '📄' },
    { title: 'Alçı - Sıva - Boya', cost: result.alciBoyaSivaFiyat, icon: '🎨' },
    { title: 'Mekanik Tesisat', cost: result.mekanik, icon: '🚿' },
    { title: 'Zemin Kaplama', cost: result.zeminKaplama, icon: '🧼' },
    { title: 'Doğrama', cost: result.dogramaFiyat, icon: '🚪' },
    { title: 'Dış Cephe', cost: result.disCepheFiyat, icon: '🏢' },
    { title: 'Banyo + Mutfak', cost: result.montajFiyat, icon: '🛁' },
    { title: 'Asansör Boşluğu', cost: result.asansorBoslugu, icon: '🚧' },
    { title: 'Asansör Cihazı', cost: result.asansorCihazFiyat, icon: '🛗' },
    { title: 'Peyzaj', cost: result.peyzajFiyat, icon: '🌿' },
    { title: 'Öngörülmeyen Giderler', cost: result.ongorulmayanGiderler, icon: '💼' },
    { title: 'Resmi İşlemler', cost: result.resmiIslemler, icon: '🏛️' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl space-y-6"
    >
      {/* Ana Sonuç */}
      <Card className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white border-0">
        <div className="text-center">
          <CurrencyDollarIcon className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-2">Toplam Proje Maliyeti</h2>
          <div className="text-5xl font-extrabold mb-4">
            {result.finalTotal.toLocaleString('tr-TR')} TL
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm opacity-90">
            <div>
              <div className="font-semibold">📍 Şehir</div>
              <div>{input.selectedCity}</div>
            </div>
            <div>
              <div className="font-semibold">🏆 Kalite</div>
              <div>{input.qualityLevel}</div>
            </div>
            <div>
              <div className="font-semibold">💰 Kâr Marjı</div>
              <div>%{input.profitMargin}</div>
            </div>
            <div>
              <div className="font-semibold">⏱️ Süre</div>
              <div>{input.projectDuration} ay</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Maliyet Dökümü */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kaba Maliyet */}
        {input.kabaMaliyet && (
          <Card title="🧱 Kaba Maliyet" className="h-fit">
            <div className="space-y-3">
              {kabaMaliyetItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CostItem {...item} />
                </motion.div>
              ))}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between font-bold text-lg text-indigo-600 dark:text-indigo-400">
                  <span>Toplam Kaba Maliyet:</span>
                  <span>{result.toplamKaba.toLocaleString('tr-TR')} TL</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* İnce Maliyet */}
        {input.inceMaliyet && (
          <Card title="🎨 İnce Maliyet" className="h-fit">
            <div className="space-y-3">
              {inceMaliyetItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CostItem {...item} />
                </motion.div>
              ))}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                <div className="flex justify-between font-bold text-lg text-indigo-600 dark:text-indigo-400">
                  <span>Toplam İnce Maliyet:</span>
                  <span>{result.toplamInce.toLocaleString('tr-TR')} TL</span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Maliyet Analizi */}
      <Card title="📊 Maliyet Analizi">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {result.toplam.toLocaleString('tr-TR')} TL
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Temel Maliyet</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {result.hataPayi.toLocaleString('tr-TR')} TL
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hata Payı (%5)</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {result.profitAmount.toLocaleString('tr-TR')} TL
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Kâr Marjı</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {(result.finalTotal / parseInt(input.insaatM2)).toLocaleString('tr-TR')} TL
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">TL/m²</div>
          </div>
        </div>
      </Card>

      {/* Aksiyon Butonları */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onSave}
          variant="success"
          className="flex-1 flex items-center justify-center space-x-2"
        >
          <BookmarkIcon className="h-5 w-5" />
          <span>💾 Hesaplamayı Kaydet</span>
        </Button>
        
        <Button
          onClick={onShowHistory}
          variant="secondary"
          className="flex-1 flex items-center justify-center space-x-2"
        >
          <CalendarIcon className="h-5 w-5" />
          <span>📝 Geçmiş ({savedCount})</span>
        </Button>
      </div>
    </motion.div>
  );
};