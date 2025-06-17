import axios from 'axios';
import { BACKEND_URL } from '@/utils/constants';
import { SimulationRequest, SimulationResponse, RankingData, BlockScore } from '@/types/simulation';

// Create axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API service functions
export const simulationAPI = {
  // Run simulation
  simulate: async (data: SimulationRequest): Promise<SimulationResponse> => {
    const response = await api.post('/simulate', data);
    return response.data;
  },

  // Compare scenarios
  compare: async (scenarioNames: string[], variables: string[]) => {
    const response = await api.post('/compare', {
      scenario_names: scenarioNames,
      variables: variables
    });
    return response.data;
  },

  // Get scenarios list
  getScenarios: async (): Promise<{ scenarios: string[] }> => {
    const response = await api.get('/scenarios');
    return response.data;
  },

  // Export scenario data
  exportScenario: async (scenarioName: string): Promise<Blob> => {
    const response = await api.get(`/export/${scenarioName}`, {
      responseType: 'blob'
    });
    return response.data;
  },

  // Get ranking data
  getRanking: async (): Promise<RankingData[]> => {
    const response = await api.get('/ranking');
    return response.data;
  },

  // Get block scores
  getBlockScores: async (): Promise<BlockScore[]> => {
    const response = await api.get('/block_scores');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Ping
  ping: async () => {
    const response = await api.get('/ping');
    return response.data;
  }
};

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`API Error: ${error.response.status} - ${error.response.data?.detail || error.message}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network Error: Unable to connect to server');
    } else {
      // Something else happened
      throw new Error(`Request Error: ${error.message}`);
    }
  }
);

export default api;
