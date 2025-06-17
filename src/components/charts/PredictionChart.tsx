import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SimulationData } from '@/types/simulation';
import { LINE_CHART_INDICATORS } from '@/utils/constants';

interface PredictionChartProps {
  simulationData: SimulationData[];
  predictData: [SimulationData[], SimulationData[]]; // [lower, upper]
  selectedIndicator: string;
  onIndicatorChange: (indicator: string) => void;
}

const PredictionChart: React.FC<PredictionChartProps> = ({
  simulationData,
  predictData,
  selectedIndicator,
  onIndicatorChange
}) => {
  const currentIndicator = LINE_CHART_INDICATORS[selectedIndicator];

  // Generate years from 2026 to 2100
  const xAxisYears = Array.from({ length: 2100 - 2025 + 1 }, (_, i) => 2026 + i);

  // Create chart data - COMPLETELY REWRITTEN FOR CLARITY
  const chartData = xAxisYears.map(year => {
    // Find data for this year
    const simData = simulationData.find(d => d.Year === year);
    const lowerData = predictData[0]?.find(d => d.Year === year);
    const upperData = predictData[1]?.find(d => d.Year === year);

    // Extract values DIRECTLY - no conversion, no Number() wrapper
    const simValue = simData?.[selectedIndicator] ?? null;
    const lowerValue = lowerData?.[selectedIndicator] ?? null;
    const upperValue = upperData?.[selectedIndicator] ?? null;

    // Debug log for verification
    if (year <= 2028 && simValue !== null) {
      console.log(`[NEW CHART] Year ${year}, ${selectedIndicator}: ${simValue} (type: ${typeof simValue})`);
    }

    return {
      year,
      actual: simValue,
      lower: lowerValue,
      upper: upperValue
    };
  });

  // Filter out completely empty years
  const filteredData = chartData.filter(d =>
    d.actual !== null || d.lower !== null || d.upper !== null
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Indicator selector */}
      <div className="mb-4">
        <label htmlFor="indicator-select" className="block text-sm font-medium text-gray-700 mb-2">
          縦軸を選択
        </label>
        <select
          id="indicator-select"
          value={selectedIndicator}
          onChange={(e) => onIndicatorChange(e.target.value)}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {Object.entries(LINE_CHART_INDICATORS).map(([key, indicator]) => (
            <option key={key} value={key}>
              {indicator.labelTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Debug info */}
      <div className="mb-2 text-xs text-gray-500">
        データ点数: {filteredData.length} |
        実測値: {filteredData.filter(d => d.actual !== null).length} |
        予測値: {filteredData.filter(d => d.lower !== null || d.upper !== null).length}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="year"
              domain={[2026, 2100]}
              type="number"
              scale="linear"
              tickCount={8}
              stroke="#666"
            />
            <YAxis
              stroke="#666"
              label={{
                value: `${currentIndicator.labelTitle}（${currentIndicator.unit}）`,
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip
              labelFormatter={(value) => `年: ${value}`}
              formatter={(value, name) => {
                if (value === null || value === undefined) return ['--', name];
                return [typeof value === 'number' ? value.toFixed(2) : String(value), name];
              }}
            />
            <Legend />

            {/* Prediction lines */}
            <Line
              type="monotone"
              dataKey="lower"
              stroke="#cccccc"
              strokeDasharray="5 5"
              dot={false}
              name="下限値予測"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="upper"
              stroke="#cccccc"
              strokeDasharray="5 5"
              dot={false}
              name="上限値予測"
              connectNulls={false}
            />

            {/* Actual data line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#ff5722"
              strokeWidth={2}
              dot={false}
              name="実測値"
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PredictionChart;
