
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { InventoryView } from './components/InventoryView';
import { analyzeWineLabel } from './services/geminiService';
import type { Wine } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

type View = 'home' | 'inventory';

export default function App() {
  const [wines, setWines] = useLocalStorage<Wine[]>('vinoteca_wines', []);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageAnalysis = useCallback(async (imageFile: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = async () => {
        const base64Image = (reader.result as string).split(',')[1];
        if (!base64Image) {
            throw new Error('Failed to read image file.');
        }

        const extractedData = await analyzeWineLabel(base64Image);
        
        const newWine: Wine = {
            id: crypto.randomUUID(),
            imageDataUrl: reader.result as string,
            ...extractedData
        };

        setWines(prevWines => [...prevWines, newWine]);
        setCurrentView('inventory');
      };
      reader.onerror = () => {
        throw new Error('Could not process the selected file.');
      };

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, [setWines]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        {currentView === 'home' && (
          <ImageUploader 
            onImageUpload={handleImageAnalysis} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
        {currentView === 'inventory' && (
          <InventoryView wines={wines} />
        )}
      </main>
    </div>
  );
}
