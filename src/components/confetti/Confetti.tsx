
import React, { useEffect, useState } from 'react';

interface ConfettiPieceProps {
  color: string;
  delay: number;
  left: string;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ color, delay, left }) => {
  return (
    <div 
      className="absolute top-0 w-2 h-2 rounded-sm animate-confetti z-50"
      style={{ 
        backgroundColor: color, 
        left: left,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const colors = ['#4B108D', '#3FD6A6', '#7336b5', '#6eedc2', '#ffd700'];
    const newPieces = [];
    
    for (let i = 0; i < 50; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 0.5;
      const left = `${Math.random() * 100}%`;
      
      newPieces.push(
        <ConfettiPiece 
          key={i} 
          color={color} 
          delay={delay} 
          left={left} 
        />
      );
    }
    
    setPieces(newPieces);
    
    // Clean up confetti after animation completes
    const timer = setTimeout(() => {
      setPieces([]);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return <div className="fixed inset-0 pointer-events-none">{pieces}</div>;
};

export default Confetti;
