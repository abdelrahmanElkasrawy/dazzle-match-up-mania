
import React from 'react';

interface MedalProps {
  type: 'dazzify-star' | 'smart-planner' | 'first-booking';
  className?: string;
  animate?: boolean;
}

const Medal: React.FC<MedalProps> = ({ type, className = '', animate = false }) => {
  const baseClasses = `relative rounded-full flex items-center justify-center ${
    animate ? 'animate-spin-slow' : ''
  } ${className}`;
  
  const medals = {
    'dazzify-star': {
      container: `${baseClasses} bg-gradient-to-r from-yellow-300 to-yellow-500 border-4 border-yellow-600`,
      icon: '🌟',
      name: 'Dazzify Star User Medal',
      description: "Perfect matching skills! You're a Dazzify pro!"
    },
    'smart-planner': {
      container: `${baseClasses} bg-gradient-to-r from-blue-300 to-purple-500 border-4 border-blue-600`,
      icon: '🧠',
      name: 'Smart Planner Medal',
      description: 'Great work! You have excellent planning instincts.'
    },
    'first-booking': {
      container: `${baseClasses} bg-gradient-to-r from-green-300 to-teal-500 border-4 border-green-600`,
      icon: '🎯',
      name: 'First Booking Medal',
      description: 'Good start! Keep practicing to improve your matches.'
    }
  };
  
  const medal = medals[type];
  
  return (
    <div className={`flex flex-col items-center justify-center ${animate ? 'animate-float' : ''}`}>
      <div className={medal.container}>
        <span className="text-4xl">{medal.icon}</span>
        <div className="absolute inset-0 rounded-full border-4 border-white opacity-20"></div>
      </div>
      {!animate && (
        <div className="mt-4 text-center">
          <h3 className="font-bold text-lg text-primary">{medal.name}</h3>
          <p className="text-sm text-gray-600">{medal.description}</p>
        </div>
      )}
    </div>
  );
};

export default Medal;
