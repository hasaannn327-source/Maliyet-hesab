import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { CalculationInput, CalculationResult, SavedCalculation } from './types';
import { useCalculation } from './hooks/useCalculation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ThemeProvider } from './context/ThemeContext';

// Components
import { Header } from './components/Header';
import { CalculationForm } from './components/CalculationForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Timeline } from './components/Timeline';
import { CalculationHistory } from './components/CalculationHistory';

function AppContent() {
  const { result, calculate, isCalculating, setResult } = useCalculation();
  const [savedCalculations, setSavedCalculations] = useLocalStorage<SavedCalculation[]>('calculations', []);
  const [showHistory, setShowHistory] = useState(false);
  const [currentInput, setCurrentInput] = useState<CalculationInput | null>(null);

  const handleCalculation = async (input: CalculationInput) => {
    try {
      setCurrentInput(input);
      const calculationResult = calculate(input);
      toast.success('Hesaplama başarıyla tamamlandı!', {
        icon: '🎉',
        duration: 3000,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Hesaplama sırasında bir hata oluştu');
      setResult(null);
    }
  };

  const handleSaveCalculation = () => {
    if (!result || !currentInput) {
      toast.error('Kaydedilecek hesaplama bulunamadı');
      return;
    }

    const calculation: SavedCalculation = {
      id: Date.now(),
      date: new Date().toLocaleDateString('tr-TR'),
      ...currentInput,
      result
    };

    setSavedCalculations(prev => [calculation, ...prev]);
    toast.success('Hesaplama başarıyla kaydedildi!', {
      icon: '💾',
      duration: 3000,
    });
  };

  const handleDeleteCalculation = (id: number) => {
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
    toast.success('Hesaplama silindi', {
      icon: '🗑️',
    });
  };

  const handleLoadCalculation = (calculation: SavedCalculation) => {
    const input: CalculationInput = {
      arsaM2: calculation.arsaM2,
      insaatM2: calculation.insaatM2,
      kabaMaliyet: calculation.kabaMaliyet,
      inceMaliyet: calculation.inceMaliyet,
      selectedCity: calculation.selectedCity,
      qualityLevel: calculation.qualityLevel,
      profitMargin: calculation.profitMargin,
      projectDuration: 12 // Default value for older calculations
    };
    
    setCurrentInput(input);
    setResult(calculation.result);
    setShowHistory(false);
    toast.success('Hesaplama yüklendi', {
      icon: '📥',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Form */}
          <CalculationForm 
            onSubmit={handleCalculation}
            isLoading={isCalculating}
          />

          {/* Results */}
          {result && currentInput && (
            <>
              <ResultsDisplay
                result={result}
                input={currentInput}
                onSave={handleSaveCalculation}
                onShowHistory={() => setShowHistory(true)}
                savedCount={savedCalculations.length}
              />
              
              {/* Timeline */}
              <div className="w-full max-w-4xl">
                <Timeline timeline={result.timeline} />
              </div>
            </>
          )}
        </div>
      </main>

      {/* History Modal */}
      <CalculationHistory
        calculations={savedCalculations}
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onDelete={handleDeleteCalculation}
        onLoad={handleLoadCalculation}
      />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}