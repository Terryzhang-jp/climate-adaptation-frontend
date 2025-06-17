import React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  marks?: number[];
  className?: string;
  disabled?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  marks = [],
  className,
  disabled = false
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={cn('relative w-full', className)}>
      {/* Slider track */}
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
            'slider-thumb:appearance-none slider-thumb:h-4 slider-thumb:w-4',
            'slider-thumb:rounded-full slider-thumb:bg-blue-600',
            'slider-thumb:cursor-pointer slider-thumb:border-0',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Marks */}
        {marks.length > 0 && (
          <div className="absolute top-3 left-0 right-0 flex justify-between px-1">
            {marks.map((mark, index) => {
              const markPercentage = ((mark - min) / (max - min)) * 100;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ left: `${markPercentage}%`, position: 'absolute', transform: 'translateX(-50%)' }}
                >
                  <div className="w-1 h-1 bg-gray-400 rounded-full mb-1" />
                  <span className="text-xs text-gray-500">{mark}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Value display */}
      <div className="mt-6 text-center">
        <span className="text-sm font-medium text-gray-700">{value}</span>
      </div>
    </div>
  );
};

export default Slider;
