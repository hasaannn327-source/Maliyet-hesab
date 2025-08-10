import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { SavedCalculation } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface CalculationHistoryProps {
  calculations: SavedCalculation[];
  isOpen: boolean;
  onClose: () => void;
  onDelete?: (id: number) => void;
  onLoad?: (calculation: SavedCalculation) => void;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({
  calculations,
  isOpen,
  onClose,
  onDelete,
  onLoad
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                📊 Hesaplama Geçmişi
              </h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={onClose}
                className="!p-2"
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
              {calculations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Henüz kaydedilmiş hesaplama yok
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    İlk hesaplamanızı yapın ve kaydedin
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {calculations.map((calc, index) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        hover
                        className="h-full cursor-pointer relative group"
                        onClick={() => onLoad && onLoad(calc)}
                      >
                        {/* Delete Button */}
                        {onDelete && (
                          <Button
                            variant="danger"
                            size="sm"
                            className="!p-1 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(calc.id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}

                        <div className="space-y-3">
                          {/* Date */}
                          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <span>📅</span>
                            <span>{calc.date}</span>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">🏠 Arsa:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {calc.arsaM2} m²
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">🏢 İnşaat:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {calc.insaatM2} m²
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">📍 Şehir:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {calc.selectedCity}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">🏆 Kalite:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {calc.qualityLevel}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">💰 Kâr:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                %{calc.profitMargin}
                              </span>
                            </div>
                          </div>

                          {/* Cost Types */}
                          <div className="flex space-x-2">
                            {calc.kabaMaliyet && (
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                                🧱 Kaba
                              </span>
                            )}
                            {calc.inceMaliyet && (
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                                🎨 İnce
                              </span>
                            )}
                          </div>

                          {/* Total Cost */}
                          <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {calc.result.finalTotal.toLocaleString('tr-TR')} TL
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {(calc.result.finalTotal / parseInt(calc.insaatM2)).toLocaleString('tr-TR')} TL/m²
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {calculations.length > 0 && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Toplam {calculations.length} hesaplama</span>
                  <span>Bir hesaplamayı tekrar yüklemek için üzerine tıklayın</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};