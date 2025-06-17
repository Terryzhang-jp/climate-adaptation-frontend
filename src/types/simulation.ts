/**
 * TypeScript types for Climate Adaptation Simulation
 * Based on the original React frontend
 */

export interface DecisionVar {
  year: number;
  planting_trees_amount: number;
  house_migration_amount: number;
  dam_levee_construction_cost: number;
  paddy_dam_construction_cost: number;
  capacity_building_cost: number;
  transportation_invest: number;
  agricultural_RnD_cost: number;
  cp_climate_params: number;
}

export interface CurrentValues {
  temp: number;
  precip: number;
  municipal_demand: number;
  available_water: number;
  crop_yield: number;
  hot_days: number;
  extreme_precip_freq: number;
  ecosystem_level: number;
  levee_level: number;
  high_temp_tolerance_level: number;
  forest_area: number;
  planting_history: Record<string, number>;
  urban_level: number;
  resident_capacity: number;
  transportation_level: number;
  levee_investment_total: number;
  RnD_investment_total: number;
  risky_house_total: number;
  non_risky_house_total: number;
  resident_burden: number;
  biodiversity_level: number;
}

export interface SimulationRequest {
  scenario_name: string;
  user_name: string;
  mode: 'Monte Carlo Simulation Mode' | 'Sequential Decision-Making Mode' | 'Predict Simulation Mode' | 'Record Results Mode';
  decision_vars: DecisionVar[];
  num_simulations: number;
  current_year_index_seq: CurrentValues;
}

export interface SimulationData {
  Year: number;
  'Temperature (℃)': number;
  'Precipitation (mm)': number;
  'Available Water': number;
  'Crop Yield': number;
  'Municipal Demand': number;
  'Flood Damage': number;
  'Levee Level': number;
  'High Temp Tolerance Level': number;
  'Hot Days': number;
  'Extreme Precip Frequency': number;
  'Extreme Precip Events': number;
  'Ecosystem Level': number;
  'Municipal Cost': number;
  'Urban Level': number;
  'Resident Burden': number;
  'Forest Area': number;
  [key: string]: number | string;
}

export interface BlockScore {
  period: string;
  raw: Record<string, number>;
  score: Record<string, number>;
  total_score: number;
}

export interface SimulationResponse {
  scenario_name: string;
  data: SimulationData[];
  block_scores: BlockScore[];
}

export interface LineChartIndicator {
  labelTitle: string;
  max: number;
  min: number;
  unit: string;
}

export interface RankingData {
  rank: number;
  user_name: string;
  total_score: number;
}

export interface AdaptationStrategy {
  key: keyof DecisionVar;
  label: string;
  icon: string;
  min: number;
  max: number;
  marks: number[];
  color: string;
}
