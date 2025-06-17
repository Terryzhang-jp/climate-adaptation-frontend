import React from 'react';
import Gauge from '@/components/ui/Gauge';
import { CurrentValues } from '@/types/simulation';
import { INDICATOR_CONVERSION } from '@/utils/constants';

interface GaugePanelProps {
  currentValues: CurrentValues;
  currentYear: number;
}

const GaugePanel: React.FC<GaugePanelProps> = ({ currentValues, currentYear }) => {
  const gaugeData = [
    {
      label: '年平均気温',
      value: Math.round(currentValues.temp * 100) / 100,
      max: 40,
      min: 0,
      unit: '℃',
      color: '#ef4444'
    },
    {
      label: '年降水量',
      value: Math.round(currentValues.precip * 10) / 10,
      max: 2000,
      min: 500,
      unit: 'mm',
      color: '#3b82f6'
    },
    {
      label: '大雨の頻度',
      value: Math.round(currentValues.extreme_precip_freq),
      max: 10,
      min: 0,
      unit: '回/年',
      color: '#8b5cf6'
    },
    {
      label: '住民の負担',
      value: currentValues.resident_burden * INDICATOR_CONVERSION["Municipal Cost"],
      max: 10,
      min: 0,
      unit: '万円',
      color: '#f59e0b'
    },
    {
      label: '生物多様性',
      value: currentValues.ecosystem_level,
      max: 100,
      min: 0,
      unit: '－',
      color: '#10b981'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {currentYear - 1}年の気象条件と将来影響予測
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {gaugeData.map((gauge, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-sm font-medium text-gray-700 mb-2 text-center">
              {gauge.label}
            </div>
            <Gauge
              value={gauge.value}
              min={gauge.min}
              max={gauge.max}
              width={100}
              height={100}
              color={gauge.color}
            />
            <div className="text-xs text-gray-500 mt-1">
              {gauge.unit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GaugePanel;
