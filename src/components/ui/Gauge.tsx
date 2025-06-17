import React from 'react';

interface GaugeProps {
  value: number;
  min?: number;
  max: number;
  width?: number;
  height?: number;
  color?: string;
  backgroundColor?: string;
}

const Gauge: React.FC<GaugeProps> = ({
  value,
  min = 0,
  max,
  width = 100,
  height = 100,
  color = '#3b82f6',
  backgroundColor = '#e5e7eb'
}) => {
  const radius = Math.min(width, height) / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {/* Value text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">
          {typeof value === 'number' ? value.toFixed(1) : value}
        </span>
      </div>
    </div>
  );
};

export default Gauge;
