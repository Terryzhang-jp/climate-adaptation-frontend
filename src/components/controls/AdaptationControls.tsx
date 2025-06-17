import React from 'react';
import StrategySlider from './StrategySlider';
import { DecisionVar } from '@/types/simulation';
import { ADAPTATION_STRATEGIES } from '@/utils/constants';

interface AdaptationControlsProps {
  decisionVar: DecisionVar;
  onUpdate: (key: keyof DecisionVar, value: number) => void;
}

const AdaptationControls: React.FC<AdaptationControlsProps> = ({
  decisionVar,
  onUpdate
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        適応策の設定
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ADAPTATION_STRATEGIES.map((strategy) => (
          <StrategySlider
            key={strategy.key}
            strategy={strategy}
            value={decisionVar[strategy.key] as number}
            onChange={(value) => onUpdate(strategy.key, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdaptationControls;
