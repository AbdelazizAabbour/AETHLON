import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('aethlon_user');
        return saved ? JSON.parse(saved) : {
            xp: 0,
            level: 1,
            essence: 100,
            shells: ['Default Core'],
            activeShell: 'Default Core',
            stats: {
                totalSyncs: 0,
                maxDepth: 0
            }
        };
    });

    useEffect(() => {
        localStorage.setItem('aethlon_user', JSON.stringify(user));
    }, [user]);

    const addEssence = (amount) => {
        setUser(prev => ({ ...prev, essence: prev.essence + amount }));
    };

    const addXP = (amount) => {
        setUser(prev => {
            const newXP = prev.xp + amount;
            const nextLevelExp = prev.level * 1000;
            if (newXP >= nextLevelExp) {
                return { ...prev, xp: newXP - nextLevelExp, level: prev.level + 1 };
            }
            return { ...prev, xp: newXP };
        });
    };

    const updateStats = (depth) => {
        setUser(prev => ({
            ...prev,
            stats: {
                totalSyncs: prev.stats.totalSyncs + 1,
                maxDepth: Math.max(prev.stats.maxDepth, depth)
            }
        }));
    };

    return (
        <GameContext.Provider value={{ user, setUser, addEssence, addXP, updateStats }}>
            {children}
        </GameContext.Provider>
    );
};

export const useProgress = () => useContext(GameContext);
