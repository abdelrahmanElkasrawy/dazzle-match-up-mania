
import React from 'react';
import { Button } from '@/components/ui/button';
import DazzifyLogo from '../logo/DazzifyLogo';
import Medal from '../medal/Medal';
import { useIsMobile } from '@/hooks/use-mobile';

interface HomeScreenProps {
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center p-4 sm:p-6 text-white">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 text-center flex flex-col items-center shadow-2xl border border-white/20">
        <DazzifyLogo size={isMobile ? "md" : "lg"} className="mb-6 sm:mb-8" useImageLogo={true} />
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
          🎉 Welcome to Dazzify Match-Up!
        </h1>
        
        <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90">
          Think like a planner. Match like a pro. Dazzle your way through the event chaos!
        </p>
        
        <div className="mb-8 sm:mb-10 relative">
          <Medal type="dazzify-star" className="w-24 h-24 sm:w-32 sm:h-32" animate />
          <div className="absolute -top-4 -right-4 animate-pulse-light">
            <span className="text-2xl sm:text-3xl">✨</span>
          </div>
          <div className="absolute -bottom-2 -left-4 animate-bounce-light">
            <span className="text-2xl sm:text-3xl">🎊</span>
          </div>
        </div>
        
        <Button 
          onClick={onStartGame}
          className="bg-secondary hover:bg-secondary-light text-primary font-bold text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg group"
        >
          <span className="mr-2 group-hover:animate-spin-slow">🔑</span>
          Start Game
        </Button>
        
        <p className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-70">
          Match service providers with the perfect Dazzify features to earn medals!
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
