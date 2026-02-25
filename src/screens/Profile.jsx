import React from 'react';
import { useProgress } from '../context/GameContext';
import GlassButton from '../components/UI/GlassButton';

const Profile = ({ onBack }) => {
    const { user } = useProgress();

    const ACHIEVEMENTS = [
        { title: 'First Pulse', desc: 'Complete your first grid sync', earned: true, icon: '⚡' },
        { title: 'Deep Diver', desc: 'Reach depth 50 in a single run', earned: user.stats.maxDepth >= 50, icon: '🌊' },
        { title: 'Collector', desc: 'Own 3 or more shells', earned: user.shells.length >= 3, icon: '💎' },
        { title: 'Void Master', desc: 'Sync at 100% capacity 10 times', earned: user.stats.totalSyncs >= 10, icon: '🌌' },
    ];

    return (
        <div className="relative min-h-screen w-full bg-[#05060f] flex flex-col p-4 md:p-8 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 md:mb-12 text-center md:text-left">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-widest uppercase mb-1">Neural Profile</h2>
                    <div className="text-[8px] md:text-[10px] text-gray-500 tracking-[0.2em] md:tracking-[0.3em] uppercase">Operator-Identity // Historical-Data</div>
                </div>
                <GlassButton className="w-full md:w-auto text-xs md:text-sm" variant="ghost" onClick={onBack}>Back</GlassButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto w-full mb-8">
                {/* Achievements */}
                <div className="space-y-4 md:space-y-6">
                    <h3 className="text-[10px] md:text-xs text-cyan-400 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 text-center md:text-left">Milestone Logs</h3>
                    {ACHIEVEMENTS.map((ach, idx) => (
                        <div key={idx} className={`glass p-4 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 border-l-4 ${ach.earned ? 'border-l-cyan-500 shadow-[inset_10px_0_15px_-10px_rgba(0,242,255,0.1)]' : 'border-l-white/10 opacity-50'}`}>
                            <div className="text-2xl md:text-3xl shrink-0">{ach.icon}</div>
                            <div className="overflow-hidden">
                                <div className="font-bold tracking-widest uppercase italic text-sm md:text-base truncate">{ach.title}</div>
                                <div className="text-[8px] md:text-xs text-gray-500 uppercase tracking-widest truncate">{ach.desc}</div>
                            </div>
                            {ach.earned && <div className="ml-auto text-cyan-400 text-[8px] md:text-xs font-mono font-bold shrink-0">EARNED</div>}
                        </div>
                    ))}
                </div>

                {/* Global Standings (Simulated) */}
                <div className="space-y-6">
                    <h3 className="text-[10px] md:text-xs text-magenta-400 font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4 text-center md:text-left">Global Resonance</h3>
                    <div className="glass rounded-3xl overflow-hidden border border-white/5">
                        <div className="bg-white/5 p-3 md:p-4 text-[8px] md:text-[10px] text-gray-500 uppercase tracking-widest flex justify-between font-bold">
                            <span>Rank</span>
                            <span>Operator</span>
                            <span>Depth</span>
                        </div>
                        <div className="divide-y divide-white/5 font-bold">
                            {[
                                { rank: 1, name: 'X_AETHER_X', depth: 412, me: false },
                                { rank: 2, name: 'VOID_WALKER', depth: 389, me: false },
                                { rank: 3, name: 'OPERATOR_42', depth: user.stats.maxDepth, me: true },
                                { rank: 4, name: 'CYBER_PULSE', depth: 212, me: false },
                            ].sort((a, b) => b.depth - a.depth).map((player, idx) => (
                                <div key={idx} className={`p-4 md:p-6 flex justify-between items-center ${player.me ? 'bg-cyan-500/10' : 'hover:bg-white/5 transition-colors'}`}>
                                    <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                                        <span className={`font-mono text-xs md:text-sm shrink-0 ${idx < 3 ? 'neon-text-cyan' : 'text-gray-600'}`}>#{(idx + 1).toString().padStart(2, '0')}</span>
                                        <span className={`tracking-widest uppercase italic text-xs md:text-sm truncate ${player.me ? 'text-white' : 'text-gray-400'}`}>{player.me ? 'YOU' : player.name}</span>
                                    </div>
                                    <span className="font-mono text-magenta-400 text-xs md:text-base shrink-0">{player.depth}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass p-6 md:p-8 rounded-3xl text-center space-y-3 md:space-y-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]">
                        <div className="text-[8px] md:text-[10px] text-gray-500 uppercase tracking-[0.3em]">Session Summary</div>
                        <div className="text-3xl md:text-4xl font-black neon-text-cyan italic">TOP 4.2%</div>
                        <div className="text-[8px] md:text-xs text-gray-500 uppercase tracking-widest italic">Global Synchronization Tier</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
