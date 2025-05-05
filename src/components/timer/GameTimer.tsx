
import React, { useState, useEffect } from 'react';

interface GameTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
  isPlaying: boolean;
}

const GameTimer: React.FC<GameTimerProps> = ({ duration, onTimeUp, isPlaying }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying, onTimeUp]);
  
  // Reset timer when duration changes or game restarts
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const percentage = (timeLeft / duration) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="font-semibold text-primary">{formatTime(timeLeft)}</span>
        <span className="text-sm text-gray-500">Time Remaining</span>
      </div>
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 rounded-full ${
            percentage > 50 ? 'bg-secondary' : percentage > 20 ? 'bg-orange-400' : 'bg-red-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default GameTimer;
