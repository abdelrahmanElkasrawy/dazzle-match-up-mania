
import React from 'react';
import GameBoard from '../game/GameBoard';

interface GameScreenProps {
  onGameComplete: (score: number, total: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary flex flex-col items-center justify-center p-4">
      <div className="container mx-auto">
        <GameBoard onGameComplete={onGameComplete} />
      </div>
    </div>
  );
};

export default GameScreen;
