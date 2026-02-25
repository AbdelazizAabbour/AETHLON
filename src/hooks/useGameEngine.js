import { useState, useCallback, useEffect } from 'react';

export const useGameEngine = () => {
    const [gameState, setGameState] = useState({
        energy: 100,
        depth: 0,
        syncRate: 0,
        isGameOver: false,
        status: 'idle', // idle, active, syncing, de-synced
        history: []
    });

    const triggerPulse = useCallback(() => {
        if (gameState.isGameOver || gameState.energy <= 0) return;

        setGameState(prev => {
            // Logic: As depth increases, risk of de-sync increases
            const entropy = Math.random() * (prev.depth * 0.5);
            const isDeSynced = entropy > 75; // 75% threshold for failure at higher depths

            if (isDeSynced) {
                return {
                    ...prev,
                    status: 'de-synced',
                    isGameOver: true,
                    history: [...prev.history, { type: 'failure', depth: prev.depth }]
                };
            }

            const syncGain = Math.max(1, 15 - Math.floor(prev.depth / 5));
            const energyCost = 5 + Math.floor(prev.depth / 10);

            return {
                ...prev,
                energy: Math.max(0, prev.energy - energyCost),
                depth: prev.depth + 1,
                syncRate: Math.min(100, prev.syncRate + syncGain),
                status: 'active'
            };
        });
    }, [gameState.isGameOver, gameState.energy, gameState.depth]);

    const resetGame = () => {
        setGameState({
            energy: 100,
            depth: 0,
            syncRate: 0,
            isGameOver: false,
            status: 'active',
            history: []
        });
    };

    return { gameState, triggerPulse, resetGame };
};
