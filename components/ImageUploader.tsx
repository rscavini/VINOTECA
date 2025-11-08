import React, { useRef } from 'react';

interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
    isLoading: boolean;
    error: string | null;
}

const EmojiIcon = () => (
    <span className="text-8xl transition-transform duration-300 ease-in-out group-hover:scale-110" role="img" aria-label="Añadir botella de vino">
        🍾
    </span>
);

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-[#5c1a24]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-4 text-lg text-gray-600">Analizando etiqueta... Esto puede tardar unos segundos.</p>
    </div>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading, error }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onImageUpload(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="text-center py-16 sm:py-24 px-4">
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Añade un nuevo vino a tu colección</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                        Selecciona una foto de la etiqueta de tu vino desde la galería para que la inteligencia artificial extraiga sus datos automáticamente.
                    </p>
                    
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />

                    <button
                        onClick={handleClick}
                        aria-label="Añadir una nueva imagen de vino"
                        className="group mx-auto flex h-64 w-full max-w-md cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white transition-all duration-300 ease-in-out hover:border-[#8c2a39] hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-[#5c1a24] focus:ring-offset-2"
                    >
                        <EmojiIcon />
                    </button>

                    {error && <p className="mt-6 text-red-600 bg-red-100 p-3 rounded-md max-w-md mx-auto">{error}</p>}
                </>
            )}
        </div>
    );
};