
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Medal from '../medal/Medal';
import Confetti from '../confetti/Confetti';
import { getMedalForScore } from '../../data/gameData';

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
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex flex-col items-center justify-center p-6 text-white">
      {showConfetti && <Confetti />}
      
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col items-center shadow-2xl border border-white/20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Game Complete!
        </h1>
        
        <div className="text-2xl mb-8">
          You scored <span className="font-bold text-secondary">{score}/{total}!</span> 🎯
        </div>
        
        <div className="mb-8">
          <Medal type={medalType} className="w-40 h-40" />
        </div>
        
        <h2 className="text-2xl font-bold mb-4">
          You earned the {medalType === 'dazzify-star' 
            ? 'Dazzify Star User Medal! 🌟✨' 
            : medalType === 'smart-planner' 
              ? 'Smart Planner Medal! 🧠✨' 
              : 'First Booking Medal! 🎯✨'}
        </h2>
        
        <p className="text-lg mb-10 opacity-90">
          {getMedalMessage()}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={onPlayAgain}
            className="bg-secondary hover:bg-secondary-light text-primary font-bold px-6 py-4 rounded-lg"
          >
            <span className="mr-2">🔁</span>
            Play Again
          </Button>
          
          <Button 
            onClick={onDiscoverServices}
            variant="outline"
            className="border-white text-white hover:bg-white/20 font-bold px-6 py-4 rounded-lg"
          >
            <span className="mr-2">📦</span>
            Discover Dazzify Services
          </Button>
        </div>
        
        <button className="mt-6 text-sm opacity-70 hover:opacity-100 transition-opacity duration-200">
          <span className="mr-1">💬</span>
          Send Feedback
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
