import React, { useEffect, useState } from 'react';
import { useGameEngine } from '../hooks/useGameEngine';
import { useProgress } from '../context/GameContext';
import GlassButton from '../components/UI/GlassButton';

const GameScreen = ({ onExit }) => {
    const { gameState, triggerPulse, resetGame } = useGameEngine();
    const { addXP, addEssence, updateStats } = useProgress();
    const [pulseAnimation, setPulseAnimation] = useState(false);
    const [rewardClaimed, setRewardClaimed] = useState(false);

    const handlePulse = () => {
        setPulseAnimation(true);
        triggerPulse();
        setTimeout(() => setPulseAnimation(false), 500);
    };

    const isSyncComplete = gameState.syncRate >= 100;

    useEffect(() => {
        if ((isSyncComplete || gameState.isGameOver) && !rewardClaimed) {
            if (isSyncComplete) {
                addXP(500 + (gameState.depth * 10));
                addEssence(50 + gameState.depth);
            } else {
                addXP(gameState.depth * 5); // Consolation XP
            }
            updateStats(gameState.depth);
            setRewardClaimed(true);
        }
    }, [isSyncComplete, gameState.isGameOver, addXP, addEssence, updateStats, gameState.depth, rewardClaimed]);

    return (
        <div className="relative min-h-screen w-full bg-[#05060f] flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden">
            {/* HUD - Top Bar */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-center md:items-start gap-4 z-20">
                <div className="glass p-3 md:p-4 rounded-xl border-l-4 border-l-cyan-500 w-full md:w-auto md:min-w-[200px]">
                    <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1">Energy Levels</div>
                    <div className="w-full bg-white/5 h-1.5 md:h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 transition-all duration-500"
                            style={{ width: `${gameState.energy}%` }}
                        ></div>
                    </div>
                    <div className="text-right text-[10px] md:text-xs mt-1 neon-text-cyan font-mono">{gameState.energy}%</div>
                </div>

                <div className="text-center order-first md:order-none">
                    <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-1">Grid Depth</div>
                    <div className="text-4xl md:text-5xl font-black italic text-white tracking-widest leading-none">
                        {gameState.depth.toString().padStart(3, '0')}
                    </div>
                </div>

                <div className="glass p-3 md:p-4 rounded-xl border-r-4 border-r-magenta-500 w-full md:w-auto md:min-w-[200px]">
                    <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-1 text-center md:text-right">Sync Rate</div>
                    <div className="w-full bg-white/5 h-1.5 md:h-2 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-magenta-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${gameState.syncRate}%` }}
                        ></div>
                    </div>
                    <div className="text-center md:text-left text-[10px] md:text-xs mt-1 neon-text-magenta font-mono">{gameState.syncRate.toFixed(1)}%</div>
                </div>
            </div>

            {/* Central Visual: The Grid & Core */}
            <div className="relative flex-1 flex items-center justify-center w-full max-w-4xl scale-75 md:scale-100">
                {/* Decorative Rings */}
                <div className="absolute w-[280px] h-[280px] md:w-[500px] md:h-[500px] border border-white/5 rounded-full"></div>
                <div className="absolute w-[220px] h-[220px] md:w-[400px] md:h-[400px] border border-white/10 rounded-full animate-spin-slow"></div>
                <div className="absolute w-[180px] h-[180px] md:w-[300px] md:h-[300px] border border-cyan-500/20 rounded-full"></div>

                {/* The Core */}
                <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full glass flex items-center justify-center transition-all duration-300 ${pulseAnimation ? 'scale-125 shadow-[0_0_50px_rgba(0,242,255,0.5)]' : 'shadow-[0_0_20px_rgba(0,242,255,0.2)]'}`}>
                    <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-400 rounded-full blur-[2px] animate-pulse"></div>

                    {/* Pulse Ripple Effect */}
                    {pulseAnimation && (
                        <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-ping opacity-75"></div>
                    )}
                </div>

                {/* Sync Complete Overlay */}
                {isSyncComplete && (
                    <div className="absolute inset-0 glass z-50 flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl animate-in fade-in duration-500">
                        <h2 className="text-4xl md:text-6xl font-black neon-text-cyan mb-4 italic uppercase text-center">Sync Complete</h2>
                        <p className="text-gray-400 mb-2 tracking-[0.3em] uppercase text-xs md:text-sm">Core Integrity: 100%</p>
                        <p className="text-cyan-400 mb-8 font-mono text-lg md:text-xl">+{(500 + (gameState.depth * 10))} XP | +{50 + gameState.depth} Essence</p>
                        <GlassButton onClick={onExit} variant="cyan">Return to Base</GlassButton>
                    </div>
                )}

                {/* Game Over Overlay */}
                {gameState.isGameOver && !isSyncComplete && (
                    <div className="absolute inset-0 glass z-50 flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl animate-in fade-in duration-500 border border-red-500/20">
                        <h2 className="text-4xl md:text-6xl font-black neon-text-magenta mb-4 italic">DE-SYNCED</h2>
                        <p className="text-gray-400 mb-8 tracking-widest uppercase text-center text-xs md:text-sm">Grid Integrity Compromised at Depth {gameState.depth}<br /><span className="text-[10px]">Extracted {gameState.depth * 5} XP</span></p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <GlassButton onClick={() => { resetGame(); setRewardClaimed(false); }} variant="cyan">Retry Sync</GlassButton>
                            <GlassButton onClick={onExit} variant="ghost">Abort</GlassButton>
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="w-full max-w-2xl flex justify-center gap-8 mb-4 md:mb-8 z-20">
                {!gameState.isGameOver && (
                    <button
                        onClick={handlePulse}
                        disabled={gameState.energy <= 0}
                        className="group relative flex items-center justify-center"
                    >
                        <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-500/40 transition-all duration-500"></div>
                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full glass border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 font-bold tracking-widest uppercase text-[10px] md:text-xs group-hover:scale-110 active:scale-95 transition-all duration-300">
                            Pulse
                        </div>
                    </button>
                )}
            </div>

            {/* Meta Labels */}
            <div className="w-full flex justify-between text-[6px] md:text-[8px] text-gray-700 tracking-[0.3em] md:tracking-[0.5em] uppercase">
                <span>Node-0x41</span>
                <span>Aethlon-v1.0.26</span>
                <span>Sync-Enable</span>
            </div>
        </div>
    );
};

export default GameScreen;
