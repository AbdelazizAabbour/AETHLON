import React from 'react';

const GlassButton = ({ children, onClick, variant = 'cyan', className = '' }) => {
    const variants = {
        cyan: 'neon-border-cyan neon-text-cyan hover:bg-cyan-500/10',
        magenta: 'border-magenta-500 neon-text-magenta border hover:bg-magenta-500/10',
        ghost: 'border-white/10 text-white hover:bg-white/5 border'
    };

    return (
        <button
            onClick={onClick}
            className={`px-8 py-3 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 glass ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default GlassButton;
