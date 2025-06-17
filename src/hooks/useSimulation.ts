import { useState, useRef, useCallback } from 'react';
import { simulationAPI } from '@/services/api';
import { 
  DecisionVar, 
  CurrentValues, 
  SimulationData, 
  BlockScore,
  SimulationRequest 
} from '@/types/simulation';
import { 
  DEFAULT_DECISION_VAR, 
  DEFAULT_CURRENT_VALUES, 
  SIMULATION_YEARS,
  LINE_CHART_DISPLAY_INTERVAL,
  INDICATOR_CONVERSION
} from '@/utils/constants';

export const useSimulation = () => {
  // State
  const [decisionVar, setDecisionVar] = useState<DecisionVar>(DEFAULT_DECISION_VAR);
  const [currentValues, setCurrentValues] = useState<CurrentValues>(DEFAULT_CURRENT_VALUES);
  const [simulationData, setSimulationData] = useState<SimulationData[]>([]);
  const [chartPredictData, setChartPredictData] = useState<[SimulationData[], SimulationData[]]>([[], []]);
  const [blockScores, setBlockScores] = useState<BlockScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showResultButton, setShowResultButton] = useState(false);

  // Refs for real-time updates
  const isRunningRef = useRef(false);
  const currentValuesRef = useRef(currentValues);
  const decisionVarRef = useRef(decisionVar);

  // Update refs when state changes
  const updateDecisionVar = useCallback((key: keyof DecisionVar, value: number) => {
    setDecisionVar(prev => {
      const updated = { ...prev, [key]: value };
      decisionVarRef.current = updated;
      return updated;
    });
  }, []);

  const updateCurrentValues = useCallback((newDict: SimulationData) => {
    const updated: Partial<CurrentValues> = {
      temp: Number(newDict['Temperature (℃)']) || 0,
      precip: Number(newDict['Precipitation (mm)']) || 0,
      municipal_demand: Number(newDict['Municipal Demand']) || 0,
      available_water: Number(newDict['Available Water']) || 0,
      crop_yield: Number(newDict['Crop Yield']) || 0,
      hot_days: Number(newDict['Hot Days']) || 0,
      extreme_precip_freq: Number(newDict['Extreme Precip Frequency']) || 0,
      ecosystem_level: Number(newDict['Ecosystem Level']) || 0,
      levee_level: Number(newDict['Levee Level']) || 0,
      high_temp_tolerance_level: Number(newDict['High Temp Tolerance Level']) || 0,
      forest_area: Number(newDict['Forest Area']) || 0,
      resident_capacity: Number(newDict['Resident capacity']) || 0,
      transportation_level: Number(newDict['transportation_level']) || 0,
      levee_investment_total: Number(newDict['Levee investment total']) || 0,
      RnD_investment_total: Number(newDict['RnD investment total']) || 0,
      risky_house_total: Number(newDict['risky_house_total']) || 0,
      non_risky_house_total: Number(newDict['non_risky_house_total']) || 0,
      resident_burden: Number(newDict['Resident Burden']) || 0,
      biodiversity_level: Number(newDict['biodiversity_level']) || Number(newDict['Ecosystem Level']) || 0,
      planting_history: currentValues.planting_history
    };

    setCurrentValues(prev => ({ ...prev, ...updated }));
    currentValuesRef.current = { ...currentValuesRef.current, ...updated };
  }, [currentValues.planting_history]);

  // Process indicator data with conversion factors
  const processIndicatorData = useCallback((rawData: SimulationData[]) => {
    return rawData.map(item => {
      const newItem = { ...item };

      Object.entries(INDICATOR_CONVERSION).forEach(([key, factor]) => {
        if (typeof newItem[key] === 'number') {
          newItem[key] = newItem[key] * factor;
        }
      });

      return newItem;
    });
  }, []);

  // Single simulation execution
  const handleSimulate = useCallback(async (userName: string, scenarioName: string) => {
    setLoading(true);
    setError('');

    try {
      const body: SimulationRequest = {
        scenario_name: scenarioName,
        user_name: userName,
        mode: "Sequential Decision-Making Mode",
        decision_vars: [decisionVarRef.current],
        num_simulations: 1,
        current_year_index_seq: currentValuesRef.current
      };

      const response = await simulationAPI.simulate(body);
      
      if (response && response.data) {
        const processedData = processIndicatorData(response.data);
        setSimulationData(prev => [...prev, ...processedData]);
        updateCurrentValues(response.data[0]);
      }
    } catch (err) {
      console.error('Simulation error:', err);
      setError(err instanceof Error ? err.message : 'シミュレーションに失敗しました');
    } finally {
      setLoading(false);
    }
  }, [processIndicatorData, updateCurrentValues]);

  // Multi-year simulation
  const handleClickCalc = useCallback(async (userName: string, scenarioName: string) => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    let nextYear = decisionVar.year;
    let count = 0;

    while (count < SIMULATION_YEARS) {
      await handleSimulate(userName, scenarioName);
      
      count += 1;
      nextYear += 1;
      
      updateDecisionVar("year", nextYear);
      
      // Pause for smooth display
      await new Promise(res => setTimeout(res, LINE_CHART_DISPLAY_INTERVAL));
    }

    isRunningRef.current = false;
    if (nextYear > 2100) {
      setShowResultButton(true);
    }
  }, [decisionVar.year, handleSimulate, updateDecisionVar]);

  // Fetch forecast data for predictions
  const fetchForecastData = useCallback(async (userName: string, scenarioName: string) => {
    try {
      // Upper prediction (RCP 8.5)
      const upperDecisionVar = { ...decisionVarRef.current, cp_climate_params: 8.5 };
      const upperBody: SimulationRequest = {
        user_name: userName,
        scenario_name: scenarioName,
        mode: "Predict Simulation Mode",
        decision_vars: [upperDecisionVar],
        num_simulations: 1,
        current_year_index_seq: currentValuesRef.current
      };

      const upperResponse = await simulationAPI.simulate(upperBody);
      if (upperResponse && upperResponse.data) {
        const processedUpperData = processIndicatorData(upperResponse.data);
        setChartPredictData(prev => {
          const updated = [...prev] as [SimulationData[], SimulationData[]];
          updated[1] = processedUpperData;
          return updated;
        });
      }

      // Lower prediction (RCP 1.9)
      const lowerDecisionVar = { ...decisionVarRef.current, cp_climate_params: 1.9 };
      const lowerBody: SimulationRequest = {
        user_name: userName,
        scenario_name: scenarioName,
        mode: "Predict Simulation Mode",
        decision_vars: [lowerDecisionVar],
        num_simulations: 1,
        current_year_index_seq: currentValuesRef.current
      };

      const lowerResponse = await simulationAPI.simulate(lowerBody);
      setBlockScores(prev => [...prev, ...lowerResponse.block_scores]);

      if (lowerResponse && lowerResponse.data) {
        const processedLowerData = processIndicatorData(lowerResponse.data);
        setChartPredictData(prev => {
          const updated = [...prev] as [SimulationData[], SimulationData[]];
          updated[0] = processedLowerData;
          return updated;
        });
      }
    } catch (error) {
      console.error("Forecast data fetch error:", error);
    }
  }, []);

  // Save results
  const handleShowResult = useCallback(async (userName: string, scenarioName: string) => {
    try {
      await simulationAPI.simulate({
        scenario_name: scenarioName,
        user_name: userName,
        mode: "Record Results Mode",
        decision_vars: [decisionVar],
        num_simulations: 1,
        current_year_index_seq: currentValues
      });
      
      // Redirect to results page
      window.location.href = `${window.location.origin}/results/index.html`;
    } catch (err) {
      console.error("Result save error:", err);
      alert("結果保存に失敗しました");
    }
  }, [decisionVar, currentValues]);

  return {
    // State
    decisionVar,
    currentValues,
    simulationData,
    chartPredictData,
    blockScores,
    loading,
    error,
    showResultButton,
    
    // Actions
    updateDecisionVar,
    handleSimulate,
    handleClickCalc,
    fetchForecastData,
    handleShowResult,
    
    // Refs
    isRunningRef
  };
};
