
import React from 'react';

interface DraggableItemProps {
  id: string;
  text: string;
  icon: string;
  type: 'provider' | 'feature';
  onDragStart: (e: React.DragEvent, id: string, type: 'provider' | 'feature') => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, text, icon, type, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id, type)}
      className={`
        p-3 rounded-lg shadow-md cursor-grab flex items-center mb-3
        hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200
        ${type === 'provider' 
          ? 'bg-primary text-white border-2 border-primary-light' 
          : 'bg-secondary border-2 border-secondary-light text-primary-dark'}
      `}
    >
      <span className="text-2xl mr-3">{icon}</span>
      <div>
        <p className="font-semibold">{text}</p>
      </div>
    </div>
  );
};

export default DraggableItem;
