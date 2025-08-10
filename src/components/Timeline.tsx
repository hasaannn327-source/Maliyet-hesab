import React from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, startOfMonth } from 'date-fns';
import tr from 'date-fns/locale/tr';
import { TimelineItem } from '../types';
import { Card } from './ui/Card';

interface TimelineProps {
  timeline: TimelineItem[];
  startDate?: Date;
}

export const Timeline: React.FC<TimelineProps> = ({ 
  timeline, 
  startDate = new Date() 
}) => {
  return (
    <Card title="📅 Proje Zaman Çizelgesi" className="mt-6">
      <div className="space-y-4">
        {timeline.map((item, index) => {
          const phaseStartDate = addMonths(startOfMonth(startDate), item.startMonth);
          const phaseEndDate = addMonths(startOfMonth(startDate), item.endMonth);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 pb-6 border-l-2 border-indigo-200 dark:border-indigo-700 last:border-l-0"
            >
              <div className="absolute -left-2 top-0 w-4 h-4 bg-indigo-600 rounded-full border-2 border-white dark:border-gray-800"></div>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100">
                    {item.phase}
                  </h4>
                  <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                    {item.duration} ay
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Başlangıç:</span>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {format(phaseStartDate, 'MMMM yyyy', { locale: tr })}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Bitiş:</span>
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {format(phaseEndDate, 'MMMM yyyy', { locale: tr })}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <span className="text-gray-600 dark:text-gray-400">Bütçe:</span>
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                      {item.cost.toLocaleString('tr-TR')} TL
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>İlerleme</span>
                    <span>{((item.cost / timeline.reduce((sum, t) => sum + t.cost, 0)) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.cost / timeline.reduce((sum, t) => sum + t.cost, 0)) * 100}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      className="bg-indigo-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Özet */}
      <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg">
        <h5 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">📊 Proje Özeti</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Toplam Süre:</span>
            <div className="font-bold text-indigo-600 dark:text-indigo-400">
              {Math.max(...timeline.map(t => t.endMonth))} ay
            </div>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">Toplam Bütçe:</span>
            <div className="font-bold text-indigo-600 dark:text-indigo-400">
              {timeline.reduce((sum, t) => sum + t.cost, 0).toLocaleString('tr-TR')} TL
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};