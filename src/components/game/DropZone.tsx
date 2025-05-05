
import React from 'react';
import { Feature } from '../../data/gameData';

interface DropZoneProps {
  providerId: string;
  providerName: string;
  providerIcon: string;
  currentFeature: Feature | null;
  isCorrect: boolean | null;
  onDrop: (e: React.DragEvent, providerId: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({
  providerId,
  providerName,
  providerIcon,
  currentFeature,
  isCorrect,
  onDrop,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="text-2xl mr-2">{providerIcon}</span>
        <h3 className="font-semibold text-lg">{providerName}</h3>
      </div>
      
      <div
        onDrop={(e) => onDrop(e, providerId)}
        onDragOver={handleDragOver}
        className={`
          border-2 border-dashed rounded-lg p-4 h-32 flex items-center justify-center
          transition-all duration-200
          ${!currentFeature 
            ? 'border-gray-300 bg-gray-50' 
            : isCorrect === true 
              ? 'border-green-500 bg-green-50' 
              : isCorrect === false 
                ? 'border-red-500 bg-red-50' 
                : 'border-blue-300 bg-blue-50'}
        `}
      >
        {!currentFeature ? (
          <p className="text-gray-400 text-center">Drop a Dazzify feature here</p>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <span className="text-xl mr-2">{currentFeature.icon}</span>
              <span className="font-medium">{currentFeature.name}</span>
            </div>
            
            {isCorrect !== null && (
              <div className="mt-2">
                {isCorrect ? (
                  <span className="text-green-600 flex items-center">
                    <span className="mr-1">✅</span> Perfect match!
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <span className="mr-1">❌</span> Try another feature
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropZone;
