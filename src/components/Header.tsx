import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/Button';
import { usePwaInstall } from '../hooks/usePwaInstall';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isInstallable, isInstalled, promptInstall } = usePwaInstall();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
              <CalculatorIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                İmar Hesap Modülü
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                İnşaat Maliyet Hesaplama
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Install PWA */}
            {!isInstalled && isInstallable && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  void promptInstall();
                }}
              >
                Yükle
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleTheme}
              className="!p-2"
              aria-label={theme === 'dark' ? 'Açık moda geç' : 'Koyu moda geç'}
            >
              {theme === 'dark' ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};