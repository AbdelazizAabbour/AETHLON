import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import Landing from './screens/Landing';
import GameScreen from './screens/GameScreen';
import Dashboard from './screens/Dashboard';
import Shop from './screens/Shop';
import Settings from './screens/Settings';
import Profile from './screens/Profile';
import './App.css';

function App() {
  const [screen, setScreen] = useState('landing');

  const goToDashboard = () => setScreen('dashboard');
  const goToShop = () => setScreen('shop');
  const goToSettings = () => setScreen('settings');
  const goToProfile = () => setScreen('profile');
  const startGame = () => setScreen('game');
  const exitToDashboard = () => setScreen('dashboard');
  const backToLanding = () => setScreen('landing');

  return (
    <GameProvider>
      <div className="App">
        {screen === 'landing' && (
          <Landing
            onStart={goToDashboard}
          />
        )}
        {screen === 'dashboard' && (
          <Dashboard
            onBack={backToLanding}
            onStartGame={startGame}
            onOpenShop={goToShop}
            onOpenSettings={goToSettings}
            onOpenProfile={goToProfile}
          />
        )}
        {screen === 'shop' && (
          <Shop onBack={exitToDashboard} />
        )}
        {screen === 'settings' && (
          <Settings onBack={exitToDashboard} />
        )}
        {screen === 'profile' && (
          <Profile onBack={exitToDashboard} />
        )}
        {screen === 'game' && (
          <GameScreen onExit={exitToDashboard} />
        )}
      </div>
    </GameProvider>
  );
}

export default App;
