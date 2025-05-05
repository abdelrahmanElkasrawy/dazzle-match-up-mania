
import React, { useState } from 'react';
import HomeScreen from '../components/screens/HomeScreen';
import GameScreen from '../components/screens/GameScreen';
import ResultScreen from '../components/screens/ResultScreen';
import ServicesScreen from '../components/screens/ServicesScreen';

type GameState = 'home' | 'playing' | 'result' | 'services';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('home');
  const [score, setScore] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  
  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
  };
  
  const handleGameComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalRounds(total);
    setGameState('result');
  };
  
  const handlePlayAgain = () => {
    setGameState('playing');
    setScore(0);
  };
  
  const handleDiscoverServices = () => {
    setGameState('services');
  };
  
  return (
    <div className="min-h-screen">
      {gameState === 'home' && (
        <HomeScreen onStartGame={handleStartGame} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen onGameComplete={handleGameComplete} />
      )}
      
      {gameState === 'result' && (
        <ResultScreen 
          score={score} 
          total={totalRounds} 
          onPlayAgain={handlePlayAgain}
          onDiscoverServices={handleDiscoverServices}
        />
      )}
      
      {gameState === 'services' && (
        <ServicesScreen onPlayAgain={handlePlayAgain} />
      )}
    </div>
  );
};

export default Index;
