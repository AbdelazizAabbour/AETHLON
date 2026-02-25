import React from 'react';
import { useProgress } from '../context/GameContext';
import GlassButton from '../components/UI/GlassButton';

const Dashboard = ({ onBack, onStartGame, onOpenShop, onOpenSettings, onOpenProfile }) => {
    const { user } = useProgress();

    const nextLevelXP = user.level * 1000;
    const progressPercent = (user.xp / nextLevelXP) * 100;

    return (
        <div className="relative min-h-screen w-full bg-[#05060f] flex flex-col p-4 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12 text-center md:text-left">
                <div
                    onClick={onOpenProfile}
                    className="flex items-center gap-3 md:gap-4 cursor-pointer group w-full md:w-auto justify-center md:justify-start"
                >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full glass flex items-center justify-center border-2 border-cyan-500/50 group-hover:neon-border-cyan transition-all shrink-0">
                        <span className="text-xl md:text-2xl font-black neon-text-cyan">{user.level}</span>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-bold tracking-widest uppercase group-hover:text-cyan-400 transition-colors truncate">Operator Core</h2>
                        <div className="text-[8px] md:text-[10px] text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase italic">Status: Sync-Active</div>
                    </div>
                </div>
                <div className="flex gap-2 md:gap-4 w-full md:w-auto justify-center">
                    <button
                        onClick={onOpenSettings}
                        className="w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-all text-gray-400 hover:text-white shrink-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    <GlassButton className="text-[10px] md:text-sm px-4 md:px-8" variant="ghost" onClick={onOpenShop}>Exchange</GlassButton>
                    <GlassButton className="text-[10px] md:text-sm px-4 md:px-8" variant="ghost" onClick={onBack}>Back</GlassButton>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto w-full">
                {/* Progress Card */}
                <div className="lg:col-span-2 glass p-6 md:p-8 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                        <div className="text-7xl md:text-9xl font-black italic">XP</div>
                    </div>

                    <h3 className="text-gray-500 uppercase tracking-[0.2em] text-[10px] md:text-sm mb-4 md:mb-6">Evolution Progress</h3>
                    <div className="flex justify-between items-end mb-2">
                        <div className="text-2xl md:text-4xl font-black neon-text-cyan italic">{user.xp.toLocaleString()} <span className="text-[10px] md:text-sm text-gray-500 font-normal not-italic">/ {nextLevelXP.toLocaleString()} XP</span></div>
                        <div className="text-[10px] md:text-xs text-gray-400 font-mono">LEVEL {user.level}</div>
                    </div>

                    <div className="w-full bg-white/5 h-3 md:h-4 rounded-full overflow-hidden mb-6 md:mb-8">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
                        <div className="bg-white/5 p-3 md:p-4 rounded-xl">
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase mb-1">Total Syncs</div>
                            <div className="text-lg md:text-xl font-bold font-mono">{user.stats.totalSyncs}</div>
                        </div>
                        <div className="bg-white/5 p-3 md:p-4 rounded-xl">
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase mb-1">Max Depth</div>
                            <div className="text-lg md:text-xl font-bold font-mono text-magenta-400">{user.stats.maxDepth}</div>
                        </div>
                        <div className="bg-white/5 p-3 md:p-4 rounded-xl">
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase mb-1">Essence</div>
                            <div className="text-lg md:text-xl font-bold font-mono text-yellow-400">{user.essence}</div>
                        </div>
                        <div className="bg-white/5 p-3 md:p-4 rounded-xl">
                            <div className="text-[8px] md:text-[10px] text-gray-500 uppercase mb-1">Shells</div>
                            <div className="text-lg md:text-xl font-bold font-mono">{user.shells.length}</div>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Active Shell */}
                <div className="glass p-6 md:p-8 rounded-3xl flex flex-col items-center justify-between min-h-[350px] md:min-h-[400px]">
                    <h3 className="text-gray-500 uppercase tracking-[0.2em] text-[10px] md:text-sm mb-4 md:mb-6 w-full text-left">Active Shell</h3>

                    <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center scale-90 md:scale-100">
                        <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-magenta-500 blur-xl opacity-20 animate-pulse"></div>
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full glass border-2 border-white/20 flex items-center justify-center">
                            <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <div className="text-lg md:text-xl font-black italic tracking-widest uppercase mb-1">{user.activeShell}</div>
                        <div className="text-[8px] md:text-[10px] text-cyan-400 tracking-[0.2em] uppercase">Ready for Deployment</div>
                    </div>

                    <button
                        className="w-full mt-6 md:mt-12 py-3 md:py-4 rounded-xl font-black tracking-[0.3em] uppercase bg-cyan-500 text-black hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] text-xs md:text-sm"
                        onClick={onStartGame}
                    >
                        Begin Sync
                    </button>
                </div>
            </div>

            {/* Decorative Label */}
            <div className="mt-8 text-center text-[8px] md:text-[10px] text-gray-700 tracking-[0.4em] md:tracking-[0.5em] uppercase">
                Memory-Node-Alpha-7 // Local-Cache-Verified
            </div>
        </div>
    );
};

export default Dashboard;
