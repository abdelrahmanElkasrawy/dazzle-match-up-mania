
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Medal from '../medal/Medal';
import Confetti from '../confetti/Confetti';
import { getMedalForScore } from '../../data/gameData';
import { useIsMobile } from '@/hooks/use-mobile';
import DazzifyLogo from '../logo/DazzifyLogo';
import { Trophy, Star, Award } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  total: number;
  onPlayAgain: () => void;
  onDiscoverServices: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  total,
  onPlayAgain,
  onDiscoverServices,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const medalType = getMedalForScore(score);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Show confetti after a short delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getMedalMessage = () => {
    switch (medalType) {
      case 'dazzify-star':
        return "Perfect matching! You're a Dazzify pro!";
      case 'smart-planner':
        return "Great work! You have excellent planning instincts.";
      case 'first-booking':
        return "Good start! Keep practicing to improve your matches.";
    }
  };

  const getMedalIcon = () => {
    switch (medalType) {
      case 'dazzify-star':
        return <Trophy className="h-12 w-12 text-yellow-500" />;
      case 'smart-planner':
        return <Star className="h-12 w-12 text-blue-500" />;
      case 'first-booking':
        return <Award className="h-12 w-12 text-green-500" />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center p-4 sm:p-6 text-white">
      {showConfetti && <Confetti />}
      
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-8 text-center flex flex-col items-center shadow-2xl border border-white/20">
        <DazzifyLogo size={isMobile ? "md" : "lg"} className="mb-6" useImageLogo={false} />
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Game Complete!
        </h1>
        
        <div className="text-xl sm:text-2xl mb-6 sm:mb-8 bg-white/20 px-6 py-3 rounded-full">
          You scored <span className="font-bold text-secondary">{score}/{total}</span> 🎯
        </div>
        
        <div className="mb-6 sm:mb-8 flex flex-col items-center">
          <div className="mb-4">
            {getMedalIcon()}
          </div>
          <Medal type={medalType} className="w-32 h-32 sm:w-40 sm:h-40" />
        </div>
        
        <div className="relative mb-6 sm:mb-8 p-6 rounded-xl bg-white/20 max-w-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            {medalType === 'dazzify-star' 
              ? 'Dazzify Star User Medal! 🌟' 
              : medalType === 'smart-planner' 
                ? 'Smart Planner Medal! 🧠' 
                : 'First Booking Medal! 🎯'}
          </h2>
          
          <p className="text-base sm:text-lg opacity-90">
            {getMedalMessage()}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button 
            onClick={onPlayAgain}
            className="bg-secondary hover:bg-secondary-light text-primary font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-lg flex-1"
          >
            <span className="mr-2">🔄</span>
            Play Again
          </Button>
          
          <Button 
            onClick={onDiscoverServices}
            variant="outline"
            className="border-white text-white hover:bg-white/20 font-bold px-4 sm:px-6 py-3 sm:py-4 rounded-lg flex-1"
          >
            <span className="mr-2">📦</span>
            Discover Services
          </Button>
        </div>
        
        <button className="mt-4 sm:mt-6 text-xs sm:text-sm opacity-70 hover:opacity-100 transition-opacity duration-200">
          <span className="mr-1">💬</span>
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
