
import React from 'react';

interface HeaderProps {
    currentView: 'home' | 'inventory';
    setCurrentView: (view: 'home' | 'inventory') => void;
}

const WineGlassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
    const navItemClasses = "cursor-pointer py-2 px-4 rounded-md transition-colors duration-200 ease-in-out";
    const activeClasses = "bg-white/10 text-white font-semibold shadow-inner";
    const inactiveClasses = "text-red-200 hover:bg-white/5";

    return (
        <header className="bg-[#5c1a24] shadow-lg text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                       <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Control de Vinoteca</h1>
                    </div>
                    <nav className="flex items-center space-x-2 sm:space-x-4 bg-[#4a151d] p-1 rounded-lg">
                        <button
                            onClick={() => setCurrentView('home')}
                            className={`${navItemClasses} ${currentView === 'home' ? activeClasses : inactiveClasses}`}
                        >
                            Añadir Vino
                        </button>
                        <button
                            onClick={() => setCurrentView('inventory')}
                            className={`${navItemClasses} ${currentView === 'inventory' ? activeClasses : inactiveClasses}`}
                        >
                            Mi Vinoteca
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};
