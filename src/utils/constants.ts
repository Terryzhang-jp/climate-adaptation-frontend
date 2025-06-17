import { LineChartIndicator, AdaptationStrategy } from '@/types/simulation';

// Backend URL configuration
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Simulation configuration
export const SIMULATION_YEARS = 25;
export const LINE_CHART_DISPLAY_INTERVAL = 100; // ms

// Line chart indicators configuration
export const LINE_CHART_INDICATORS: Record<string, LineChartIndicator> = {
  'Crop Yield': { labelTitle: '収穫量', max: 5, min: 0, unit: 'ton/ha' },
  'Flood Damage': { labelTitle: '洪水被害', max: 10000, min: 0, unit: '万円' },
  'Ecosystem Level': { labelTitle: '生態系', max: 100, min: 0, unit: '-' },
  'Urban Level': { labelTitle: '都市利便性', max: 100, min: 0, unit: '-' },
  'Municipal Cost': { labelTitle: '予算', max: 100000, min: 0, unit: '万円' },
  'Temperature (℃)': { labelTitle: '年平均気温', max: 18, min: 12, unit: '℃' },
  'Precipitation (mm)': { labelTitle: '年降水量', max: 3000, min: 0, unit: 'mm' },
  'Available Water': { labelTitle: '利用可能な水量', max: 3000, min: 0, unit: 'mm' }
};

// Indicator conversion factors
export const INDICATOR_CONVERSION: Record<string, number> = {
  'Municipal Cost': 1 / 10000, // 円 → 万円
  'Flood Damage': 1 / 10000, // 円 → 万円
  'Crop Yield': 1 / 1000, // kg → ton
  'Resident Burden': 1 / 10000 // 円 → 万円
};

// Adaptation strategies configuration
export const ADAPTATION_STRATEGIES: AdaptationStrategy[] = [
  {
    key: 'planting_trees_amount',
    label: '植林・森林保全',
    icon: '🌳',
    min: 0,
    max: 200,
    marks: [0, 100, 200],
    color: 'green'
  },
  {
    key: 'transportation_invest',
    label: '公共バス',
    icon: '🚌',
    min: 0,
    max: 10,
    marks: [0, 5, 10],
    color: 'blue'
  },
  {
    key: 'dam_levee_construction_cost',
    label: '河川堤防',
    icon: '🌊',
    min: 0,
    max: 2,
    marks: [0, 1, 2],
    color: 'blue'
  },
  {
    key: 'agricultural_RnD_cost',
    label: '高温耐性品種',
    icon: '🧬',
    min: 0,
    max: 10,
    marks: [0, 5, 10],
    color: 'green'
  },
  {
    key: 'house_migration_amount',
    label: '住宅移転',
    icon: '🏠',
    min: 0,
    max: 10,
    marks: [0, 5, 10],
    color: 'blue'
  },
  {
    key: 'paddy_dam_construction_cost',
    label: '田んぼダム',
    icon: '🌾',
    min: 0,
    max: 10,
    marks: [0, 5, 10],
    color: 'green'
  },
  {
    key: 'capacity_building_cost',
    label: '防災訓練・啓発',
    icon: '📚',
    min: 0,
    max: 10,
    marks: [0, 5, 10],
    color: 'orange'
  }
];

// Default values
export const DEFAULT_DECISION_VAR = {
  year: 2026,
  planting_trees_amount: 0,
  house_migration_amount: 0,
  dam_levee_construction_cost: 0,
  paddy_dam_construction_cost: 0,
  capacity_building_cost: 0,
  transportation_invest: 0,
  agricultural_RnD_cost: 0,
  cp_climate_params: 4.5
};

export const DEFAULT_CURRENT_VALUES = {
  temp: 15,
  precip: 1700,
  municipal_demand: 100,
  available_water: 1000,
  crop_yield: 100,
  hot_days: 30,
  extreme_precip_freq: 0.1,
  ecosystem_level: 100,
  levee_level: 0.5,
  high_temp_tolerance_level: 0,
  forest_area: 0,
  planting_history: {},
  urban_level: 100,
  resident_capacity: 0,
  transportation_level: 0,
  levee_investment_total: 0,
  RnD_investment_total: 0,
  risky_house_total: 10000,
  non_risky_house_total: 0,
  resident_burden: 5.379 * 10**8,
  biodiversity_level: 100,
};
