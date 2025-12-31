/**
 * Sentetik Tarım Verisi Üreticisi
 * Tohum Satış, Stok ve Kâr verileri
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SeedSalesRow {
  date: string;
  entity: string;
  category: string;
  metric: string;
  value: number;
  currency?: string;
  unit?: string;
}

function generateSeedSalesData(): SeedSalesRow[] {
  const data: SeedSalesRow[] = [];
  
  const dealers = ['İzmir Bayi', 'Adana Bayi', 'Konya Bayi', 'Bursa Bayi'];
  const seeds = ['Buğday Tohumu', 'Mısır Tohumu', 'Domates Tohumu', 'Biber Tohumu', 'Salatalık Tohumu', 'Patlıcan Tohumu'];
  
  // 24 aylık veri (2023-01 → 2024-12)
  const startDate = new Date('2023-01-01');
  
  for (let month = 0; month < 24; month++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + month);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // Sezonluk faktörler (ilkbahar = yüksek satış)
    const monthNum = currentDate.getMonth() + 1;
    const seasonalFactor = monthNum >= 3 && monthNum <= 5 ? 1.8 : // İlkbahar
                          monthNum >= 9 && monthNum <= 11 ? 1.3 : // Sonbahar
                          0.6; // Kış/Yaz
    
    for (const dealer of dealers) {
      for (const seed of seeds) {
        // Base values with randomness
        const baseUnits = Math.floor(500 + Math.random() * 500);
        const units = Math.floor(baseUnits * seasonalFactor);
        
        const pricePerUnit = seed.includes('Domates') || seed.includes('Biber') ? 25 :
                            seed.includes('Buğday') || seed.includes('Mısır') ? 8 :
                            15;
        
        const revenue = units * pricePerUnit;
        const cogs = revenue * (0.55 + Math.random() * 0.1);
        const grossMargin = revenue - cogs;
        const marginPercent = (grossMargin / revenue) * 100;
        
        // İlkbaharda stok azalır, kış aylarında artar
        const inventoryBase = 2000;
        const inventory = Math.floor(inventoryBase * (2 - seasonalFactor) + Math.random() * 300);
        
        // Add rows
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'units_sold', value: units, unit: 'kg' });
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'revenue', value: Math.round(revenue), currency: 'TL' });
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'cogs', value: Math.round(cogs), currency: 'TL' });
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'gross_margin', value: Math.round(grossMargin), currency: 'TL' });
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'margin_percent', value: Math.round(marginPercent * 10) / 10, unit: '%' });
        data.push({ date: dateStr, entity: dealer, category: seed, metric: 'inventory_on_hand', value: inventory, unit: 'kg' });
      }
    }
  }
  
  return data;
}

// Generate and save
const data = generateSeedSalesData();
const csvHeader = 'date,entity,category,metric,value,currency,unit\n';
const csvRows = data.map(row => 
  `${row.date},${row.entity},${row.category},${row.metric},${row.value},${row.currency || ''},${row.unit || ''}`
).join('\n');

const outputPath = path.join(__dirname, '../../../data/csv-library/datasets/agri-seed-sales-001/data.csv');
fs.writeFileSync(outputPath, csvHeader + csvRows, 'utf-8');

console.log(`✅ Generated ${data.length} rows → ${outputPath}`);

