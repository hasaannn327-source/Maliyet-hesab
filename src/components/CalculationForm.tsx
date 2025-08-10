import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { BuildingOfficeIcon, HomeIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { CalculationInput, QualityLevel } from '../types';
import { CITY_MULTIPLIERS, QUALITY_MULTIPLIERS } from '../config/PriceConfig';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Switch } from './ui/Switch';

interface CalculationFormProps {
  onSubmit: (data: CalculationInput) => void;
  isLoading?: boolean;
}

export const CalculationForm: React.FC<CalculationFormProps> = ({
  onSubmit,
  isLoading = false
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<CalculationInput>({
    defaultValues: {
      arsaM2: '',
      insaatM2: '',
      kabaMaliyet: true,
      inceMaliyet: true,
      selectedCity: 'Diğer',
      qualityLevel: 'Standart',
      profitMargin: 20,
      projectDuration: 12
    },
    mode: 'onChange' // Anlık validasyon için
  });

  const watchedValues = watch();

  const handleFormSubmit = (data: CalculationInput) => {
    console.log('Form submitted with data:', data); // Debug için
    onSubmit(data);
  };

  return (
    <Card title="🏗️ Maliyet Hesaplama" className="w-full max-w-2xl">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Alan Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="🏠 Arsa Alanı (m²)"
            type="number"
            placeholder="Arsa alanını giriniz"
            icon={<HomeIcon className="h-5 w-5 text-gray-400" />}
            error={errors.arsaM2?.message}
            {...register('arsaM2', {
              required: 'Arsa alanı gereklidir',
              validate: {
                positive: (value) => {
                  const num = parseFloat(value);
                  return !isNaN(num) && num > 0 || 'Arsa alanı 0\'dan büyük olmalıdır';
                }
              }
            })}
          />

          <Input
            label="🏢 İnşaat Alanı (m²)"
            type="number"
            placeholder="İnşaat alanını giriniz"
            icon={<BuildingOfficeIcon className="h-5 w-5 text-gray-400" />}
            error={errors.insaatM2?.message}
            {...register('insaatM2', {
              required: 'İnşaat alanı gereklidir',
              validate: {
                positive: (value) => {
                  const num = parseFloat(value);
                  return !isNaN(num) && num > 0 || 'İnşaat alanı 0\'dan büyük olmalıdır';
                },
                ratio: (value) => {
                  const insaat = parseFloat(value);
                  const arsa = parseFloat(watchedValues.arsaM2);
                  if (!isNaN(insaat) && !isNaN(arsa) && arsa > 0) {
                    return insaat <= arsa * 5 || 'İnşaat alanı, arsa alanının 5 katından fazla olamaz';
                  }
                  return true;
                }
              }
            })}
          />
        </div>

        {/* Şehir ve Kalite Seçimi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              📍 Şehir
            </label>
            <select
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register('selectedCity')}
            >
              {Object.entries(CITY_MULTIPLIERS).map(([city, multiplier]) => (
                <option key={city} value={city}>
                  {city} {multiplier !== 1 && `(${multiplier > 1 ? '+' : ''}${((multiplier - 1) * 100).toFixed(0)}%)`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              🏆 Kalite Seviyesi
            </label>
            <select
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              {...register('qualityLevel')}
            >
              {Object.entries(QUALITY_MULTIPLIERS).map(([quality, multiplier]) => (
                <option key={quality} value={quality}>
                  {quality} {multiplier !== 1 && `(${multiplier > 1 ? '+' : ''}${((multiplier - 1) * 100).toFixed(0)}%)`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Kâr Marjı ve Proje Süresi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="💰 Kâr Marjı (%)"
            type="number"
            min="0"
            max="100"
            step="0.1"
            icon={<CurrencyDollarIcon className="h-5 w-5 text-gray-400" />}
            error={errors.profitMargin?.message}
            {...register('profitMargin', {
              required: 'Kâr marjı gereklidir',
              validate: {
  range: (value) => {
    const num = parseFloat(String(value)); // Burada String() ekle
    return (!isNaN(num) && num >= 0 && num <= 100) || 'Kâr marjı 0-100 arasında olmalıdır';
  }
              }
            })}
          />

          <Input
            label="⏱️ Proje Süresi (ay)"
            type="number"
            min="1"
            max="60"
            icon={<ClockIcon className="h-5 w-5 text-gray-400" />}
            error={errors.projectDuration?.message}
            {...register('projectDuration', {
              required: 'Proje süresi gereklidir',
              validate: {
                range: (value) => {
                  const num = parseFloat(value);
                  return (!isNaN(num) && num >= 1 && num <= 60) || 'Proje süresi 1-60 ay arasında olmalıdır';
                }
              }
            })}
          />
        </div>

        {/* Maliyet Türü Seçimi */}
        <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white">Maliyet Türleri</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Switch
              checked={watchedValues.kabaMaliyet}
              onChange={(checked) => setValue('kabaMaliyet', checked)}
              label="🧱 Kaba Maliyet"
              description="Temel yapı elemanları"
            />

            <Switch
              checked={watchedValues.inceMaliyet}
              onChange={(checked) => setValue('inceMaliyet', checked)}
              label="🎨 İnce Maliyet"
              description="Tamamlama işleri"
            />
          </div>
        </div>

        {/* Hesapla Butonu */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
            disabled={!watchedValues.kabaMaliyet && !watchedValues.inceMaliyet}
          >
            {isLoading ? 'Hesaplanıyor...' : '🧮 Hesapla'}
          </Button>
        </motion.div>

        {(!watchedValues.kabaMaliyet && !watchedValues.inceMaliyet) && (
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            En az bir maliyet türü seçmelisiniz
          </p>
        )}
      </form>
    </Card>
  );
};
