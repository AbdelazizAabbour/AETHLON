import React, { useState } from 'react';
import GlassButton from '../components/UI/GlassButton';

const Settings = ({ onBack }) => {
    const [settings, setSettings] = useState({
        audio: true,
        haptics: true,
        darkMode: true,
        motionReduction: false,
        fontSize: 'medium'
    });

    const toggle = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

    const SettingRow = ({ label, description, active, onToggle }) => (
        <div className="flex justify-between items-center p-6 glass rounded-2xl mb-4 group hover:border-white/20 transition-all">
            <div>
                <div className="text-lg font-bold tracking-widest uppercase italic">{label}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{description}</div>
            </div>
            <button
                onClick={onToggle}
                className={`w-14 h-8 rounded-full transition-all duration-300 relative ${active ? 'bg-cyan-500 shadow-[0_0_15px_rgba(0,242,255,0.5)]' : 'bg-white/10'}`}
            >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${active ? 'left-7' : 'left-1'}`}></div>
            </button>
        </div>
    );

    return (
        <div className="relative min-h-screen w-full bg-[#05060f] flex flex-col p-8 items-center">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl font-black italic tracking-widest uppercase mb-1">Configuration</h2>
                        <div className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">System Parameters // Tuning</div>
                    </div>
                    <GlassButton variant="ghost" onClick={onBack}>Save & Exit</GlassButton>
                </div>

                {/* Categories */}
                <div className="space-y-8">
                    <section>
                        <h3 className="text-xs text-cyan-400 font-bold uppercase tracking-[0.4em] mb-4 ml-2">Neural Interface</h3>
                        <SettingRow
                            label="Haptic Sync"
                            description="Simulate tactile feedback through UI pulses"
                            active={settings.haptics}
                            onToggle={() => toggle('haptics')}
                        />
                        <SettingRow
                            label="Audio Resonator"
                            description="Enable immersive soundscaping (v1.0.26)"
                            active={settings.audio}
                            onToggle={() => toggle('audio')}
                        />
                    </section>

                    <section>
                        <h3 className="text-xs text-magenta-400 font-bold uppercase tracking-[0.4em] mb-4 ml-2">Visual Processing</h3>
                        <SettingRow
                            label="Motion Compression"
                            description="Reduce complex background animations"
                            active={settings.motionReduction}
                            onToggle={() => toggle('motionReduction')}
                        />
                        <div className="p-6 glass rounded-2xl flex justify-between items-center">
                            <div>
                                <div className="text-lg font-bold tracking-widest uppercase italic">Text Scaling</div>
                                <div className="text-xs text-gray-500 uppercase tracking-widest">Adjust interface legibility</div>
                            </div>
                            <div className="flex gap-2">
                                {['small', 'medium', 'large'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSettings(prev => ({ ...prev, fontSize: size }))}
                                        className={`px-4 py-2 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all ${settings.fontSize === size ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-white'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 p-8 border border-white/5 rounded-3xl text-center">
                    <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-4">Core Identification</div>
                    <div className="text-xs font-mono text-gray-400 select-all">ADDR: 0x71Ae...F82B</div>
                    <div className="mt-4 text-[10px] text-red-500/50 uppercase tracking-[0.2em] cursor-pointer hover:text-red-500 transition-colors">Terminate Session (Clear Data)</div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
