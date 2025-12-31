import Papa from 'papaparse';

/**
 * Generic CSV Loader for Demo Data
 * Loads CSV files from /public/demo-data/ directory
 */
export async function loadCSV<T = any>(
  sector: string,
  filename: string
): Promise<T[]> {
  try {
    const response = await fetch(`/demo-data/${sector}/${filename}.csv`);
    
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${sector}/${filename}.csv`);
    }
    
    const csvText = await response.text();
    
    const result = Papa.parse<T>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });
    
    if (result.errors.length > 0) {
      console.warn(`CSV parsing warnings for ${filename}:`, result.errors);
    }
    
    return result.data;
  } catch (error) {
    console.error(`Error loading CSV ${sector}/${filename}:`, error);
    return [];
  }
}

/**
 * Load multiple CSVs in parallel
 */
export async function loadMultipleCSVs<T = any>(
  sector: string,
  filenames: string[]
): Promise<Record<string, T[]>> {
  const promises = filenames.map(async (filename) => {
    const data = await loadCSV<T>(sector, filename);
    return { filename, data };
  });
  
  const results = await Promise.all(promises);
  
  return results.reduce((acc, { filename, data }) => {
    acc[filename] = data;
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Manufacturing CSV Types
 */
export interface ManufacturingProduction {
  date: string;
  plant: string;
  line: string;
  shift: string;
  product_sku: string;
  planned_units: number;
  units_produced: number;
  units_good: number;
}

export interface ManufacturingScrap {
  date: string;
  line: string;
  shift: string;
  product_sku: string;
  scrap_units: number;
  scrap_reason: string;
}

export interface ManufacturingInventory {
  date: string;
  warehouse: string;
  item_sku: string;
  item_type: string;
  qty_on_hand: number;
  unit_cost: number;
}

export interface ManufacturingMachine {
  date: string;
  line: string;
  planned_minutes: number;
  runtime_minutes: number;
  downtime_minutes: number;
  oee: number;
}

export interface ManufacturingCosts {
  date: string;
  product_sku: string;
  material_cost: number;
  labor_cost: number;
  overhead_cost: number;
  energy_cost: number;
}

export interface ManufacturingOrders {
  date: string;
  product_sku: string;
  product_name: string;
  units_ordered: number;
  unit_price: number;
  channel: string;
}



