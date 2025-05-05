
import React, { useState, useEffect } from 'react';
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';
import GameTimer from '../timer/GameTimer';
import { scenarios, features, getMedalForScore, Feature, Provider } from '../../data/gameData';
import { useIsMobile } from '@/hooks/use-mobile';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Clock } from 'lucide-react';

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
  const [totalScore, setTotalScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [matches, setMatches] = useState<Match[]>([]);
  const [availableFeatures, setAvailableFeatures] = useState<Feature[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
  const isMobile = useIsMobile();
  
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
    
    // Check if all providers have matches
    const allMatched = matches.every(match => 
      match.providerId === providerId ? true : match.featureId !== null
    );
    
    // If all providers have matches, check if scenario is complete
    if (allMatched) {
      completeScenario();
    }
  };

  const completeScenario = () => {
    setIsComplete(true);
    setIsPlaying(false);
    
    // Calculate if all matches in the current scenario are correct
    const allCorrect = matches.every(match => match.isCorrect);
    
    // Only add to score if all matches are correct
    if (allCorrect) {
      setTotalScore(prev => prev + 1);
    }
    
    // Add delay before moving to next scenario
    setTimeout(() => {
      if (currentScenarioIndex < scenarios.length - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
      } else {
        // Game is complete - pass the final score
        onGameComplete(totalScore, scenarios.length);
      }
    }, 2000);
  };
  
  const getFeatureById = (id: string | null): Feature | null => {
    if (!id) return null;
    return features.find(f => f.id === id) || null;
  };
  
  const handleTimeUp = () => {
    setIsPlaying(false);
    setShowTimeUpDialog(true);
  };
  
  const handleTimeUpContinue = () => {
    setShowTimeUpDialog(false);
    
    // Calculate if all matches in the current scenario are correct
    const allCorrect = matches.every(match => match.isCorrect);
    
    // Only add to score if all matches are correct
    if (allCorrect) {
      setTotalScore(prev => prev + 1);
    }
    
    // Move to next scenario or end the game
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      // Game is complete
      onGameComplete(totalScore, scenarios.length);
    }
  };
  
  if (!currentScenario) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-xl p-3 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <GameTimer 
          duration={60} 
          onTimeUp={handleTimeUp} 
          isPlaying={isPlaying} 
        />
      </div>
      
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">
          Scenario: {currentScenario.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-600">{currentScenario.description}</p>
      </div>
      
      <div className={`grid grid-cols-1 ${isMobile ? 'space-y-6' : 'md:grid-cols-3 gap-4 sm:gap-8'}`}>
        {/* Left panel - Service providers */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-3 sm:mb-4 text-center">Service Providers</h3>
          <div className="space-y-2 sm:space-y-3">
            {currentScenario.providers.map(provider => (
              <div 
                key={provider.id}
                className="bg-primary-light text-white p-2 sm:p-3 rounded-lg shadow flex items-center"
              >
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">{provider.icon}</span>
                <span className="font-medium text-sm sm:text-base">{provider.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Center panel - Draggable features */}
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-3 sm:mb-4 text-center">Dazzify Features</h3>
          <div className="space-y-2 sm:space-y-3">
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
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <h3 className="font-bold text-primary mb-3 sm:mb-4 text-center">Match the Best Feature</h3>
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
      
      <div className="mt-4 sm:mt-6 flex justify-between text-sm sm:text-base">
        <div className="text-gray-600">
          Scenario {currentScenarioIndex + 1} of {scenarios.length}
        </div>
        <div className="font-bold text-primary">
          Score: {totalScore}
        </div>
      </div>

      {/* Time Up Alert Dialog */}
      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-red-500">
              <Clock className="w-5 h-5 mr-2" />
              Time's Up!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your time for this scenario has ended. Let's see how you did and move on to the next challenge!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleTimeUpContinue} 
              className="bg-primary hover:bg-primary-dark"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default GameBoard;
