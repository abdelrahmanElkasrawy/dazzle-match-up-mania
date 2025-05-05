
import React, { useState, useEffect } from 'react';
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';
import GameTimer from '../timer/GameTimer';
import { scenarios, features, getMedalForScore, Feature, Provider } from '../../data/gameData';

interface GameBoardProps {
  onGameComplete: (score: number, total: number) => void;
}

interface Match {
  providerId: string;
  featureId: string | null;
  isCorrect: boolean | null;
}

const GameBoard: React.FC<GameBoardProps> = ({ onGameComplete }) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<Feature[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const currentScenario = scenarios[currentScenarioIndex];
  
  // Initialize matches and available features when scenario changes
  useEffect(() => {
    if (!currentScenario) return;
    
    // Reset matches for new scenario
    setMatches(
      currentScenario.providers.map((provider) => ({
        providerId: provider.id,
        featureId: null,
        isCorrect: null,
      }))
    );
    
    // Set available features
    setAvailableFeatures([...currentScenario.features]);
    
    // Reset game state
    setIsComplete(false);
    setIsPlaying(true);
  }, [currentScenarioIndex]);
  
  const handleDragStart = (
    e: React.DragEvent, 
    id: string, 
    type: 'provider' | 'feature'
  ) => {
    e.dataTransfer.setData('id', id);
    e.dataTransfer.setData('type', type);
  };
  
  const handleDrop = (e: React.DragEvent, providerId: string) => {
    e.preventDefault();
    
    const featureId = e.dataTransfer.getData('id');
    const type = e.dataTransfer.getData('type');
    
    // Only allow features to be dropped
    if (type !== 'feature') return;
    
    // Check if feature is already matched
    const featureAlreadyMatched = matches.some(match => match.featureId === featureId);
    if (featureAlreadyMatched) return;
    
    // Check if provider already has a match
    const providerMatch = matches.find(match => match.providerId === providerId);
    if (!providerMatch) return;
    
    // If provider already has a correct match, don't allow changes
    if (providerMatch.isCorrect === true) return;
    
    // Check if the match is correct
    const isCorrect = currentScenario.correctMatches[providerId] === featureId;
    
    // Update matches
    setMatches(matches.map(match => {
      if (match.providerId === providerId) {
        return {
          ...match,
          featureId,
          isCorrect,
        };
      }
      return match;
    }));
    
    // Update score if correct
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Check if all providers have matches
    const allMatched = matches.every(match => 
      match.providerId === providerId ? true : match.featureId !== null
    );
    
    // If all providers have matches, check if scenario is complete
    if (allMatched) {
      setIsComplete(true);
      setIsPlaying(false);
      
      // Add delay before moving to next scenario
      setTimeout(() => {
        if (currentScenarioIndex < scenarios.length - 1) {
          setCurrentScenarioIndex(currentScenarioIndex + 1);
        } else {
          // Game is complete
          onGameComplete(score + (isCorrect ? 1 : 0), scenarios.length);
        }
      }, 2000);
    }
  };
  
  const getFeatureById = (id: string | null): Feature | null => {
    if (!id) return null;
    return features.find(f => f.id === id) || null;
  };
  
  const handleTimeUp = () => {
    setIsPlaying(false);
    setIsComplete(true);
    
    // Move to next scenario after delay
    setTimeout(() => {
      if (currentScenarioIndex < scenarios.length - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
      } else {
        // Game is complete
        onGameComplete(score, scenarios.length);
      }
    }, 2000);
  };
  
  if (!currentScenario) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <GameTimer 
          duration={60} 
          onTimeUp={handleTimeUp} 
          isPlaying={isPlaying} 
        />
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Scenario: {currentScenario.title}
        </h2>
        <p className="text-gray-600">{currentScenario.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left panel - Service providers */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-4 text-center">Service Providers</h3>
          <div className="space-y-3">
            {currentScenario.providers.map(provider => (
              <div 
                key={provider.id}
                className="bg-primary-light text-white p-3 rounded-lg shadow flex items-center"
              >
                <span className="text-2xl mr-3">{provider.icon}</span>
                <span className="font-medium">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Center panel - Draggable features */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-4 text-center">Dazzify Features</h3>
          <div className="space-y-3">
            {availableFeatures.map(feature => {
              // Check if this feature is already matched
              const isMatched = matches.some(match => match.featureId === feature.id);
              if (isMatched) return null;
              
              return (
                <DraggableItem
                  key={feature.id}
                  id={feature.id}
                  text={feature.name}
                  icon={feature.icon}
                  type="feature"
                  onDragStart={handleDragStart}
                />
              );
            })}
          </div>
        </div>
        
        {/* Right panel - Drop zones */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-4 text-center">Match the Best Feature</h3>
          {currentScenario.providers.map(provider => {
            const match = matches.find(m => m.providerId === provider.id);
            
            return (
              <DropZone
                key={provider.id}
                providerId={provider.id}
                providerName={provider.name}
                providerIcon={provider.icon}
                currentFeature={match ? getFeatureById(match.featureId) : null}
                isCorrect={match ? match.isCorrect : null}
                onDrop={handleDrop}
              />
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="text-gray-600">
          Scenario {currentScenarioIndex + 1} of {scenarios.length}
        </div>
        <div className="font-bold text-primary">
          Score: {score}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
