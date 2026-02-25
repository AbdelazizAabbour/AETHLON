import React, { useState } from 'react';
import { useProgress } from '../context/GameContext';
import GlassButton from '../components/UI/GlassButton';

const Shop = ({ onBack }) => {
    const { user, setUser } = useProgress();
    const [purchaseStep, setPurchaseStep] = useState(null);

    const ITEMS = [
        { id: 'shell_neon', name: 'Neon Prism Shell', type: 'Shell', cost: 250, rarity: 'Common', color: 'cyan' },
        { id: 'shell_vortex', name: 'Vortex Core', type: 'Shell', cost: 1200, rarity: 'Epic', color: 'magenta' },
        { id: 'theme_matrix', name: 'Matrix Grid', type: 'Theme', cost: 500, rarity: 'Rare', color: 'green' },
        { id: 'shell_solar', name: 'Solaris Shell', type: 'Shell', cost: 2500, rarity: 'Legendary', color: 'amber' },
    ];

    const handlePurchase = (item) => {
        if (user.essence >= item.cost) {
            setUser(prev => ({
                ...prev,
                essence: prev.essence - item.cost,
                shells: item.type === 'Shell' ? [...prev.shells, item.name] : prev.shells
            }));
            setPurchaseStep(`Synchronized: ${item.name}`);
            setTimeout(() => setPurchaseStep(null), 2000);
        } else {
            setPurchaseStep('Insufficient Essence');
            setTimeout(() => setPurchaseStep(null), 2000);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-[#05060f] flex flex-col p-4 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-widest uppercase mb-1">Exchange</h2>
                    <div className="text-[8px] md:text-[10px] text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase">Convert Essence into Hardware</div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="glass px-6 py-2 rounded-full border border-yellow-500/30 w-full md:w-auto text-center">
                        <span className="text-[10px] text-gray-400 mr-4 uppercase tracking-widest font-bold">Essence</span>
                        <span className="text-lg md:text-xl font-bold font-mono text-yellow-400">{user.essence}</span>
                    </div>
                    <GlassButton className="w-full md:w-auto text-xs md:text-sm" variant="ghost" onClick={onBack}>Return</GlassButton>
                </div>
            </div>

            {purchaseStep && (
                <div className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 glass px-6 md:px-12 py-3 md:py-4 rounded-full border-cyan-500/50 z-[100] animate-in fade-in transition-all">
                    <span className="neon-text-cyan font-bold tracking-widest uppercase text-xs md:text-sm">{purchaseStep}</span>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto w-full mb-8">
                {ITEMS.map(item => {
                    const isOwned = item.type === 'Shell' && user.shells.includes(item.name);

                    return (
                        <div key={item.id} className="glass p-6 md:p-8 rounded-3xl flex flex-col group hover:neon-border-cyan transition-all duration-500">
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">{item.rarity} {item.type}</div>
                            <h4 className="text-lg md:text-xl font-bold mb-6 md:mb-8 italic">{item.name}</h4>

                            <div className="flex-1 flex items-center justify-center py-8 md:py-12">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/20 relative flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    <div className="absolute inset-0 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: item.color === 'cyan' ? '#00f2ff' : item.color === 'magenta' ? '#ff00e5' : '#fbbf24' }}></div>
                                    <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white"></div>
                                </div>
                            </div>

                            <button
                                disabled={isOwned}
                                onClick={() => handlePurchase(item)}
                                className={`w-full py-3 md:py-4 rounded-xl font-black tracking-widest uppercase transition-all text-[10px] md:text-xs ${isOwned ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black border border-cyan-500/20 shadow-[0_0_15px_rgba(0,242,255,0.1)]'}`}
                            >
                                {isOwned ? 'Synchronized' : `${item.cost} Essence`}
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto pt-8 flex justify-center text-[8px] md:text-[10px] text-gray-700 tracking-[0.4em] md:tracking-[0.5em] uppercase text-center">
                Encrypted-Transaction-Confirmed // Secure-Terminal-0x2
            </div>
        </div>
    );
};

export default Shop;
