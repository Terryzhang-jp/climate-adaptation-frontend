import React from 'react';
import Slider from '@/components/ui/Slider';
import { AdaptationStrategy } from '@/types/simulation';

interface StrategySliderProps {
  strategy: AdaptationStrategy;
  value: number;
  onChange: (value: number) => void;
}

const StrategySlider: React.FC<StrategySliderProps> = ({
  strategy,
  value,
  onChange
}) => {
  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-50 border-green-200',
      blue: 'bg-blue-50 border-blue-200',
      orange: 'bg-orange-50 border-orange-200'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-gray-50 border-gray-200';
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getColorClasses(strategy.color)} shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{strategy.icon}</span>
        <span className="font-medium text-gray-800">{strategy.label}</span>
      </div>
      
      <Slider
        value={value}
        onChange={onChange}
        min={strategy.min}
        max={strategy.max}
        marks={strategy.marks}
        className="mt-2"
      />
    </div>
  );
};

export default StrategySlider;
