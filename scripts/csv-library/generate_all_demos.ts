/**
 * Tüm Demo Dataset'leri Üreten Script
 * 5 dataset: 3 tarım + 1 üretim + 1 restoran
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATASETS_DIR = path.join(__dirname, '../../data/csv-library/datasets');

// ===== DATASET 2: FİDANLIK ÜRETİM TAKİBİ =====
function generateSeedlingProductionData() {
  const data: any[] = [];
  const greenhouses = ['Sera-1', 'Sera-2', 'Sera-3', 'Sera-4'];
  const seedlingTypes = ['Domates Fidanı', 'Biber Fidanı', 'Patlıcan Fidanı', 'Hıyar Fidanı', 'Kabak Fidanı'];
  
  // 18 ay (Ocak 2023 → Haziran 2024)
  const startDate = new Date('2023-01-01');
  
  for (let month = 0; month < 18; month++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + month);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // İlkbahar yüksek üretim
    const monthNum = currentDate.getMonth() + 1;
    const seasonalFactor = monthNum >= 2 && monthNum <= 4 ? 1.6 : 
                          monthNum >= 8 && monthNum <= 10 ? 1.3 : 0.7;
    
    for (const greenhouse of greenhouses) {
      for (const seedling of seedlingTypes) {
        const basePlanted = Math.floor(5000 + Math.random() * 2000);
        const planted = Math.floor(basePlanted * seasonalFactor);
        const germinationRate = 75 + Math.random() * 15; // %75-90
        const germinated = Math.floor(planted * (germinationRate / 100));
        const lossRate = 5 + Math.random() * 10; // %5-15
        const ready = Math.floor(germinated * (1 - lossRate / 100));
        const daysToReady = Math.floor(25 + Math.random() * 15); // 25-40 gün
        const costPerSeedling = 0.8 + Math.random() * 0.4; // 0.8-1.2 TL
        const totalCost = ready * costPerSeedling;
        
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'planted', value: planted, unit: 'adet' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'germinated', value: germinated, unit: 'adet' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'germination_rate', value: Math.round(germinationRate * 10) / 10, unit: '%' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'loss_rate', value: Math.round(lossRate * 10) / 10, unit: '%' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'ready_seedlings', value: ready, unit: 'adet' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'days_to_ready', value: daysToReady, unit: 'gün' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'cost_per_seedling', value: Math.round(costPerSeedling * 100) / 100, currency: 'TL' });
        data.push({ date: dateStr, entity: greenhouse, category: seedling, metric: 'total_cost', value: Math.round(totalCost), currency: 'TL' });
      }
    }
  }
  
  return data;
}

// ===== DATASET 3: TARIMSAL VERİM & SULAMA =====
function generateYieldIrrigationData() {
  const data: any[] = [];
  const parcels = ['Parsel-A', 'Parsel-B', 'Parsel-C', 'Parsel-D', 'Parsel-E'];
  const crops = ['Domates', 'Biber', 'Patlıcan', 'Hıyar', 'Mısır'];
  
  // 24 ay
  const startDate = new Date('2023-01-01');
  
  for (let month = 0; month < 24; month++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + month);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // Yaz ayları yüksek verim + yüksek sulama
    const monthNum = currentDate.getMonth() + 1;
    const summerFactor = monthNum >= 5 && monthNum <= 9 ? 1.5 : 0.8;
    
    for (const parcel of parcels) {
      for (const crop of crops) {
        const baseYield = crop === 'Mısır' ? 8000 : 5000;
        const yieldKg = Math.floor((baseYield + Math.random() * 2000) * summerFactor);
        const irrigationM3 = Math.floor((300 + Math.random() * 200) * summerFactor);
        const fertilizerKg = Math.floor(50 + Math.random() * 30);
        const weatherIndex = Math.floor(60 + Math.random() * 35); // 60-95 (iyi hava)
        
        // Sulama ile verim arasında korelasyon
        const yieldPerM3 = yieldKg / irrigationM3;
        
        data.push({ date: dateStr, entity: parcel, category: crop, metric: 'yield_kg', value: yieldKg, unit: 'kg' });
        data.push({ date: dateStr, entity: parcel, category: crop, metric: 'irrigation_m3', value: irrigationM3, unit: 'm3' });
        data.push({ date: dateStr, entity: parcel, category: crop, metric: 'fertilizer_kg', value: fertilizerKg, unit: 'kg' });
        data.push({ date: dateStr, entity: parcel, category: crop, metric: 'weather_index', value: Math.round(weatherIndex), unit: 'index' });
        data.push({ date: dateStr, entity: parcel, category: crop, metric: 'yield_per_m3', value: Math.round(yieldPerM3 * 100) / 100, unit: 'kg/m3' });
      }
    }
  }
  
  return data;
}

// ===== DATASET 4: ÜRETİM OEE & FIRE =====
function generateManufacturingOEEData() {
  const data: any[] = [];
  const lines = ['Hat-1', 'Hat-2', 'Hat-3'];
  const products = ['Ürün-A', 'Ürün-B', 'Ürün-C'];
  const shifts = ['Gündüz', 'Gece'];
  
  // 12 ay (günlük veri)
  const startDate = new Date('2024-01-01');
  
  for (let day = 0; day < 365; day++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + day);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    for (const line of lines) {
      for (const product of products) {
        for (const shift of shifts) {
          const availability = 85 + Math.random() * 10; // %85-95
          const performance = 80 + Math.random() * 15; // %80-95
          const quality = 90 + Math.random() * 8; // %90-98
          const oee = (availability * performance * quality) / 10000;
          
          const productionUnits = Math.floor(800 + Math.random() * 400);
          const scrapUnits = Math.floor(productionUnits * (1 - quality / 100));
          const scrapCostTL = scrapUnits * (10 + Math.random() * 20);
          const downtimeHours = Math.round((1 - availability / 100) * 8 * 10) / 10;
          
          const entity = `${line}-${shift}`;
          
          data.push({ date: dateStr, entity, category: product, metric: 'oee_percent', value: Math.round(oee * 10) / 10, unit: '%' });
          data.push({ date: dateStr, entity, category: product, metric: 'availability_percent', value: Math.round(availability * 10) / 10, unit: '%' });
          data.push({ date: dateStr, entity, category: product, metric: 'performance_percent', value: Math.round(performance * 10) / 10, unit: '%' });
          data.push({ date: dateStr, entity, category: product, metric: 'quality_percent', value: Math.round(quality * 10) / 10, unit: '%' });
          data.push({ date: dateStr, entity, category: product, metric: 'production_units', value: productionUnits, unit: 'adet' });
          data.push({ date: dateStr, entity, category: product, metric: 'scrap_units', value: scrapUnits, unit: 'adet' });
          data.push({ date: dateStr, entity, category: product, metric: 'scrap_cost_tl', value: Math.round(scrapCostTL), currency: 'TL' });
          data.push({ date: dateStr, entity, category: product, metric: 'downtime_hours', value: downtimeHours, unit: 'saat' });
        }
      }
    }
  }
  
  return data;
}

// ===== DATASET 5: RESTORAN OPS =====
function generateRestaurantOpsData() {
  const data: any[] = [];
  const branches = ['Kadıköy Şubesi', 'Beşiktaş Şubesi', 'Nişantaşı Şubesi'];
  const dayTypes = ['Hafta İçi', 'Hafta Sonu'];
  
  // 18 ay (haftalık veri)
  const startDate = new Date('2023-01-01');
  
  for (let week = 0; week < 78; week++) { // 18 ay = ~78 hafta
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + (week * 7));
    const dateStr = currentDate.toISOString().split('T')[0];
    
    for (const branch of branches) {
      for (const dayType of dayTypes) {
        const isWeekend = dayType === 'Hafta Sonu';
        const coversBase = isWeekend ? 450 : 280;
        const covers = Math.floor(coversBase + Math.random() * 100);
        const avgCheckTL = 180 + Math.random() * 70;
        const revenueTL = covers * avgCheckTL;
        const foodCostPercent = 28 + Math.random() * 5;
        const foodCostTL = revenueTL * (foodCostPercent / 100);
        const laborHours = covers * 0.4; // 0.4 saat/masa
        const laborCostTL = laborHours * 45; // 45 TL/saat
        const grossProfitTL = revenueTL - foodCostTL - laborCostTL;
        const grossProfitPercent = (grossProfitTL / revenueTL) * 100;
        
        const entity = `${branch} - ${dayType}`;
        
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'covers', value: covers, unit: 'masa' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'avg_check_tl', value: Math.round(avgCheckTL), currency: 'TL' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'revenue_tl', value: Math.round(revenueTL), currency: 'TL' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'food_cost_tl', value: Math.round(foodCostTL), currency: 'TL' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'food_cost_percent', value: Math.round(foodCostPercent * 10) / 10, unit: '%' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'labor_hours', value: Math.round(laborHours), unit: 'saat' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'labor_cost_tl', value: Math.round(laborCostTL), currency: 'TL' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'gross_profit_tl', value: Math.round(grossProfitTL), currency: 'TL' });
        data.push({ date: dateStr, entity: branch, category: dayType, metric: 'gross_profit_percent', value: Math.round(grossProfitPercent * 10) / 10, unit: '%' });
      }
    }
  }
  
  return data;
}

// ===== CSV YAZMA FONKSİYONU =====
function writeCSV(datasetId: string, data: any[]) {
  const csvHeader = 'date,entity,category,metric,value,currency,unit\n';
  const csvRows = data.map(row => 
    `${row.date},${row.entity},${row.category},${row.metric},${row.value},${row.currency || ''},${row.unit || ''}`
  ).join('\n');
  
  const outputPath = path.join(DATASETS_DIR, datasetId, 'data.csv');
  fs.writeFileSync(outputPath, csvHeader + csvRows, 'utf-8');
  console.log(`✅ ${datasetId}: ${data.length} rows → ${outputPath}`);
}

// ===== ANA FONKSİYON =====
async function main() {
  console.log('🚀 Tüm demo datasets oluşturuluyor...\n');
  
  // Dataset 2: Fidanlık
  const seedlingData = generateSeedlingProductionData();
  writeCSV('agri-seedling-002', seedlingData);
  
  // Dataset 3: Verim & Sulama
  const yieldData = generateYieldIrrigationData();
  writeCSV('agri-yield-irrigation-003', yieldData);
  
  // Dataset 4: OEE & Fire
  const oeeData = generateManufacturingOEEData();
  writeCSV('mfg-oee-scrap-001', oeeData);
  
  // Dataset 5: Restoran
  const restaurantData = generateRestaurantOpsData();
  writeCSV('rest-ops-001', restaurantData);
  
  console.log('\n✅ Tüm datasets başarıyla oluşturuldu!');
}

main();

