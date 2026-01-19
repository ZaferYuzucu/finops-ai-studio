/**
 * Multi-source Join Logic (Dashboard Runtime)
 * Non-destructive joins at query time
 */

import { ParsedCSVData } from './csvParser';
import { SemanticMapping } from '../types/semanticLayer';

export interface JoinConfig {
  leftDatasetId: string;
  rightDatasetId: string;
  joinKeys: {
    left: string;  // Column or semantic field
    right: string;
  }[];
  joinType: 'inner' | 'left' | 'right' | 'full';
}

export interface JoinedDataset {
  rows: Record<string, any>[];
  headers: string[];
  sourceDatasets: string[];
  joinConfigs: JoinConfig[];
}

/**
 * Perform simple join between two datasets
 */
export function joinDatasets(
  left: ParsedCSVData,
  right: ParsedCSVData,
  config: JoinConfig
): JoinedDataset {
  const joined: Record<string, any>[] = [];
  
  // Build lookup map for right dataset
  const rightLookup = new Map<string, Record<string, any>[]>();
  
  right.rows.forEach(row => {
    const key = config.joinKeys.map(jk => row[jk.right]).join('|');
    if (!rightLookup.has(key)) {
      rightLookup.set(key, []);
    }
    rightLookup.get(key)!.push(row);
  });
  
  // Join operation
  left.rows.forEach(leftRow => {
    const key = config.joinKeys.map(jk => leftRow[jk.left]).join('|');
    const rightMatches = rightLookup.get(key) || [];
    
    if (rightMatches.length > 0 || config.joinType === 'left' || config.joinType === 'full') {
      if (rightMatches.length === 0) {
        // Left join with no match
        joined.push({ ...leftRow });
      } else {
        rightMatches.forEach(rightRow => {
          joined.push({
            ...leftRow,
            ...Object.fromEntries(
              Object.entries(rightRow).map(([k, v]) => [`${config.rightDatasetId}_${k}`, v])
            )
          });
        });
      }
    }
  });
  
  // Right/Full join unmatched rows
  if (config.joinType === 'right' || config.joinType === 'full') {
    const matchedKeys = new Set(
      left.rows.map(row => config.joinKeys.map(jk => row[jk.left]).join('|'))
    );
    
    right.rows.forEach(rightRow => {
      const key = config.joinKeys.map(jk => rightRow[jk.right]).join('|');
      if (!matchedKeys.has(key)) {
        joined.push({
          ...Object.fromEntries(
            Object.entries(rightRow).map(([k, v]) => [`${config.rightDatasetId}_${k}`, v])
          )
        });
      }
    });
  }
  
  const allHeaders = [
    ...left.headers,
    ...right.headers.map(h => `${config.rightDatasetId}_${h}`)
  ];
  
  return {
    rows: joined,
    headers: Array.from(new Set(allHeaders)),
    sourceDatasets: [config.leftDatasetId, config.rightDatasetId],
    joinConfigs: [config]
  };
}

/**
 * Join multiple datasets sequentially
 */
export function joinMultiple(
  datasets: { id: string; data: ParsedCSVData }[],
  configs: JoinConfig[]
): JoinedDataset {
  if (datasets.length === 0) throw new Error('No datasets provided');
  if (datasets.length === 1) {
    return {
      rows: datasets[0].data.rows,
      headers: datasets[0].data.headers,
      sourceDatasets: [datasets[0].id],
      joinConfigs: []
    };
  }
  
  let result: JoinedDataset = {
    rows: datasets[0].data.rows,
    headers: datasets[0].data.headers,
    sourceDatasets: [datasets[0].id],
    joinConfigs: []
  };
  
  for (let i = 1; i < datasets.length; i++) {
    const config = configs.find(
      c => c.leftDatasetId === datasets[0].id && c.rightDatasetId === datasets[i].id
    );
    
    if (!config) continue;
    
    result = joinDatasets(
      { ...result, rows: result.rows, headers: result.headers } as any,
      datasets[i].data,
      config
    );
  }
  
  return result;
}

// TODO: AI-assisted join key suggestion
// TODO: Semantic field-based join (instead of column names)
// TODO: Join validation & preview
