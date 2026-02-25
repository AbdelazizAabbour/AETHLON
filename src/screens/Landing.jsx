import React from 'react';
import GlassButton from '../components/UI/GlassButton';

const Landing = ({ onStart }) => {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05060f] p-6 text-center">
            {/* Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 -right-20 w-64 h-64 md:w-96 md:h-96 bg-magenta-500/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-10 md:opacity-20" style={{
                backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
                backgroundSize: '30px 30px md:40px 40px'
            }}></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black mb-4 tracking-tighter italic">
                    <span className="neon-text-cyan">AETH</span>
                    <span className="text-white">LON</span>
                </h1>

                <p className="text-gray-400 text-sm md:text-xl mb-12 max-w-2xl mx-auto tracking-[0.2em] md:tracking-[0.4em] uppercase font-light">
                    Sync the Core. Rule the Grid.
                </p>

                <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center">
                    <GlassButton className="w-full md:w-auto text-xs md:text-sm px-10" onClick={onStart} variant="cyan">
                        Initialize Core
                    </GlassButton>
                    <GlassButton className="w-full md:w-auto text-xs md:text-sm px-10" variant="ghost">
                        View Archives
                    </GlassButton>
                </div>

                <div className="mt-12 md:mt-20 flex justify-center gap-6 md:gap-12 text-[10px] md:text-sm text-gray-500 tracking-[0.2em] md:tracking-[0.4em] uppercase">
                    <div className="flex flex-col items-center">
                        <span className="neon-text-cyan font-bold text-base md:text-lg">2,412</span>
                        <span>Active Cores</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="neon-text-magenta font-bold text-base md:text-lg">14.2M</span>
                        <span>Grid Syncs</span>
                    </div>
                </div>
            </div>

            {/* Footer Meta */}
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 text-[8px] md:text-[10px] text-gray-600 tracking-[0.4em] uppercase italic">
                Ver: 1.0.26 // System-Online
            </div>
        </div>
    );
};

export default Landing;
