
import React from 'react';
import { Button } from '@/components/ui/button';
import DazzifyLogo from '../logo/DazzifyLogo';
import Medal from '../medal/Medal';

interface HomeScreenProps {
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col items-center shadow-2xl border border-white/20">
        <DazzifyLogo size="lg" className="mb-8" />
        
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          🎉 Welcome to Dazzify Match-Up!
        </h1>
        
        <p className="text-xl mb-8 opacity-90">
          Think like a planner. Match like a pro. Dazzle your way through the event chaos!
        </p>
        
        <div className="mb-10 relative">
          <Medal type="dazzify-star" className="w-32 h-32" animate />
          <div className="absolute -top-4 -right-4 animate-pulse-light">
            <span className="text-3xl">✨</span>
          </div>
          <div className="absolute -bottom-2 -left-4 animate-bounce-light">
            <span className="text-3xl">🎊</span>
          </div>
        </div>
        
        <Button 
          onClick={onStartGame}
          className="bg-secondary hover:bg-secondary-light text-primary font-bold text-lg px-8 py-6 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg group"
        >
          <span className="mr-2 group-hover:animate-spin-slow">🔑</span>
          Start Game
        </Button>
        
        <p className="mt-6 text-sm opacity-70">
          Match service providers with the perfect Dazzify features to earn medals!
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
