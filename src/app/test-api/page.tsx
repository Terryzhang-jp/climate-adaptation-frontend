'use client';

import React, { useState, useEffect } from 'react';
import { simulationAPI } from '@/services/api';

export default function TestAPIPage() {
  const [healthStatus, setHealthStatus] = useState<string>('Testing...');
  const [scenarios, setScenarios] = useState<string>('Testing...');
  const [ranking, setRanking] = useState<string>('Testing...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testAPIs = async () => {
      try {
        // Test health endpoint
        const health = await simulationAPI.healthCheck();
        setHealthStatus(JSON.stringify(health, null, 2));
      } catch (err) {
        setHealthStatus(`Error: ${err}`);
      }

      try {
        // Test scenarios endpoint
        const scenariosData = await simulationAPI.getScenarios();
        setScenarios(JSON.stringify(scenariosData, null, 2));
      } catch (err) {
        setScenarios(`Error: ${err}`);
      }

      try {
        // Test ranking endpoint
        const rankingData = await simulationAPI.getRanking();
        setRanking(JSON.stringify(rankingData, null, 2));
      } catch (err) {
        setRanking(`Error: ${err}`);
      }
    };

    testAPIs();
  }, []);

  const testSimulation = async () => {
    try {
      setError('');
      const testData = {
        scenario_name: "test_scenario",
        user_name: "test_user",
        mode: "Predict Simulation Mode" as const,
        decision_vars: [{
          year: 2026,
          planting_trees_amount: 100,
          house_migration_amount: 50,
          dam_levee_construction_cost: 1.0,
          paddy_dam_construction_cost: 0.5,
          capacity_building_cost: 0.3,
          transportation_invest: 0.2,
          agricultural_RnD_cost: 0.4,
          cp_climate_params: 4.5
        }],
        num_simulations: 1,
        current_year_index_seq: {
          temp: 15.0,
          precip: 1700.0,
          municipal_demand: 100.0,
          available_water: 3000.0,
          crop_yield: 5000.0,
          hot_days: 30.0,
          extreme_precip_freq: 0.1,
          ecosystem_level: 100.0,
          levee_level: 0.0,
          high_temp_tolerance_level: 0.0,
          forest_area: 0.0,
          planting_history: {},
          urban_level: 100.0,
          resident_capacity: 0.0,
          transportation_level: 0.0,
          levee_investment_total: 0.0,
          RnD_investment_total: 0.0,
          risky_house_total: 10000.0,
          non_risky_house_total: 0.0,
          resident_burden: 0.0,
          biodiversity_level: 100.0
        }
      };

      const result = await simulationAPI.simulate(testData);
      alert(`Simulation successful! Got ${result.data.length} data points`);
    } catch (err) {
      setError(`Simulation error: ${err}`);
    }
  };

  const testSequentialSimulation = async () => {
    try {
      setError('');
      const testData = {
        scenario_name: "test_scenario",
        user_name: "test_user",
        mode: "Sequential Decision-Making Mode" as const,
        decision_vars: [{
          year: 2026,
          planting_trees_amount: 0,
          house_migration_amount: 0,
          dam_levee_construction_cost: 0,
          paddy_dam_construction_cost: 0,
          capacity_building_cost: 0,
          transportation_invest: 0,
          agricultural_RnD_cost: 0,
          cp_climate_params: 4.5
        }],
        num_simulations: 1,
        current_year_index_seq: {
          temp: 15.0,
          precip: 1700.0,
          municipal_demand: 100.0,
          available_water: 3000.0,
          crop_yield: 5000.0,
          hot_days: 30.0,
          extreme_precip_freq: 0.1,
          ecosystem_level: 100.0,
          levee_level: 0.0,
          high_temp_tolerance_level: 0.0,
          forest_area: 0.0,
          planting_history: {},
          urban_level: 100.0,
          resident_capacity: 0.0,
          transportation_level: 0.0,
          levee_investment_total: 0.0,
          RnD_investment_total: 0.0,
          risky_house_total: 10000.0,
          non_risky_house_total: 0.0,
          resident_burden: 0.0,
          biodiversity_level: 100.0
        }
      };

      const result = await simulationAPI.simulate(testData);
      alert(`Sequential simulation successful! Got ${result.data.length} data points. First result: ${JSON.stringify(result.data[0])}`);
    } catch (err) {
      setError(`Sequential simulation error: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">API Connection Test</h1>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Backend URL</h2>
            <p className="text-gray-600">{process.env.NEXT_PUBLIC_BACKEND_URL}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Health Check</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {healthStatus}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Scenarios</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {scenarios}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Ranking</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {ranking}
            </pre>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Test Simulation</h2>
            <div className="space-y-4">
              <button
                onClick={testSimulation}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
              >
                Run Test Simulation
              </button>
              <button
                onClick={testSequentialSimulation}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Test Sequential Simulation
              </button>
            </div>
            {error && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
