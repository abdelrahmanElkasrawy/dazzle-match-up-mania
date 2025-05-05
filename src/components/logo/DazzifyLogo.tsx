
import React from 'react';

interface DazzifyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DazzifyLogo: React.FC<DazzifyLogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <span className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary ${sizeClasses[size]}`}>
        Dazzify
      </span>
      <span className="ml-1 text-secondary font-bold">Match-Up</span>
    </div>
  );
};

export default DazzifyLogo;
