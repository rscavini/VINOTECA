
import React from 'react';
import type { Wine } from '../types';
import { WineCard } from './WineCard';

interface InventoryViewProps {
    wines: Wine[];
}

export const InventoryView: React.FC<InventoryViewProps> = ({ wines }) => {
    if (wines.length === 0) {
        return (
            <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M8 7h8m-8 10h8M9 4h6m-3 16h.01" />
                </svg>
                <h3 className="mt-2 text-2xl font-semibold text-gray-900">Tu vinoteca está vacía</h3>
                <p className="mt-1 text-md text-gray-500">
                    Empieza añadiendo tu primera botella desde la pestaña "Añadir Vino".
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Mi Vinoteca ({wines.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {wines.map(wine => (
                    <WineCard key={wine.id} wine={wine} />
                ))}
            </div>
        </div>
    );
};
