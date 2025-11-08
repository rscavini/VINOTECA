
import React from 'react';
import type { Wine } from '../types';

interface WineCardProps {
    wine: Wine;
}

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold text-gray-500">{label}:</span>
        <span className="text-gray-800 text-right">{value || 'N/A'}</span>
    </div>
);

export const WineCard: React.FC<WineCardProps> = ({ wine }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                 <img src={wine.imageDataUrl} alt={`Etiqueta de ${wine.nombre_vino}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[#5c1a24] mb-3 truncate">{wine.nombre_vino}</h3>
                    <div className="space-y-1">
                        <InfoRow label="Añada" value={wine.anada} />
                        <InfoRow label="Uva" value={wine.uva} />
                        <InfoRow label="Región" value={wine.region} />
                    </div>
                </div>
            </div>
        </div>
    );
};
