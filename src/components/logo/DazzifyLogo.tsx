
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DazzifyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  useImageLogo?: boolean;
}

const DazzifyLogo: React.FC<DazzifyLogoProps> = ({ 
  size = 'md', 
  className = '',
  useImageLogo = true
}) => {
  const isMobile = useIsMobile();
  const sizeClasses = {
    sm: 'text-xl h-8',
    md: 'text-3xl h-12',
    lg: 'text-5xl h-16'
  };
  
  if (useImageLogo) {
    return (
      <div className={`flex items-center ${className}`}>
        <img 
          src="/lovable-uploads/c38f0126-8835-48ad-b6c7-1cd970492633.png" 
          alt="Dazzify Logo" 
          className={`${sizeClasses[size]}`} 
        />
        <span className="ml-2 text-secondary font-bold">
          {!isMobile ? 'Match-Up' : ''}
        </span>
      </div>
    );
  }
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-secondary-light ${sizeClasses[size]}`}>
        Dazzify
      </span>
      <span className="ml-1 text-secondary font-bold">
        {!isMobile ? 'Match-Up' : ''}
      </span>
    </div>
  );
};

export default DazzifyLogo;
