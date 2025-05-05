
import React from 'react';
import GameBoard from '../game/GameBoard';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameScreenProps {
  onGameComplete: (score: number, total: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameComplete }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary flex flex-col items-center justify-center p-2 sm:p-4">
      <div className={`container mx-auto ${isMobile ? 'px-0' : 'px-4'}`}>
        <GameBoard onGameComplete={onGameComplete} />
      </div>
    </div>
  );
};

export default GameScreen;
