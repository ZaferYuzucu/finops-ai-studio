/**
 * Kalan dataset'ler için metadata.json ve README.md oluştur
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATASETS_DIR = path.join(__dirname, '../../data/csv-library/datasets');

// ===== DATASET 2: FIDANLIK =====
const seedlingMetadata = {
  id: 'agri-seedling-002',
  title: 'Fidanlık Üretim Takibi',
  sector: 'Tarım',
  use_case: 'Sera bazında fidan üretim performansı, çimlenme oranı ve maliyet analizi',
  grain: 'monthly',
  date_range: { start: '2023-01-01', end: '2024-06-30' },
  entities: ['Sera-1', 'Sera-2', 'Sera-3', 'Sera-4'],
  categories: ['Domates Fidanı', 'Biber Fidanı', 'Patlıcan Fidanı', 'Hıyar Fidanı', 'Kabak Fidanı'],
  metrics: [
    { name: 'planted', description: 'Ekilen fidan sayısı', unit: 'adet', type: 'quantity' },
    { name: 'germinated', description: 'Çıkan fidan sayısı', unit: 'adet', type: 'quantity' },
    { name: 'germination_rate', description: 'Çimlenme oranı', unit: '%', type: 'percentage' },
    { name: 'loss_rate', description: 'Kayıp oranı', unit: '%', type: 'percentage' },
    { name: 'ready_seedlings', description: 'Satışa hazır fidan', unit: 'adet', type: 'quantity' },
    { name: 'days_to_ready', description: 'Hazırlanma süresi', unit: 'gün', type: 'duration' },
    { name: 'cost_per_seedling', description: 'Fidan başına maliyet', currency: 'TL', type: 'currency' },
    { name: 'total_cost', description: 'Toplam maliyet', currency: 'TL', type: 'currency' }
  ],
  recommended_charts: [
    { type: 'LineChart', title: 'Aylık Üretim Trendi', x: 'date', y: 'ready_seedlings', groupBy: 'entity' },
    { type: 'BarChart', title: 'Çimlenme Oranı', x: 'category', y: 'germination_rate', aggregate: 'avg' },
    { type: 'LineChart', title: 'Kayıp Oranı Trendi', x: 'date', y: 'loss_rate', groupBy: 'category' }
  ],
  kpi_cards: [
    { title: 'Toplam Üretim', metric: 'ready_seedlings', aggregate: 'sum', format: 'number' },
    { title: 'Ortalama Çimlenme', metric: 'germination_rate', aggregate: 'avg', format: 'percentage' },
    { title: 'Ortalama Kayıp', metric: 'loss_rate', aggregate: 'avg', format: 'percentage' },
    { title: 'Toplam Maliyet', metric: 'total_cost', aggregate: 'sum', format: 'currency' }
  ],
  source: 'Sentetik veri (demo amaçlı)',
  license: 'MIT',
  notes: 'İlkbahar aylarında üretim artışı. Çimlenme oranı %75-90 arasında.',
  version: '1.0.0',
  created_at: '2025-12-31',
  row_count: 2880
};

const seedlingReadme = `# Fidanlık Üretim Takibi

## 📊 Özet
4 sera üzerinden 5 fidan türünün 18 aylık üretim, çimlenme ve maliyet analizi.

## 🎯 Kullanım Senaryosu
- Sera performans karşılaştırması
- Çimlenme oranı takibi
- Kayıp oranı analizi
- Maliyet optimizasyonu

## 📈 Öne Çıkan Özellikler
- **Sezonsal Üretim**: İlkbahar aylarında %60 artış
- **Çimlenme**: Ortalama %75-90
- **Kayıp**: %5-15 arası

## 📋 Veri Yapısı
- **Tarih Aralığı**: 2023-01 → 2024-06 (18 ay)
- **Seralar**: 4
- **Fidan Türleri**: 5
- **Metrikler**: 8
- **Toplam Satır**: 2,880

## 🏷️ Etiketler
\`#tarım\` \`#fidan\` \`#sera\` \`#çimlenme\` \`#maliyet-analizi\`
`;

// ===== DATASET 3: VERİM & SULAMA =====
const yieldMetadata = {
  id: 'agri-yield-irrigation-003',
  title: 'Tarımsal Verim & Sulama İlişkisi',
  sector: 'Tarım',
  use_case: 'Parsel bazında verim, sulama ve hava koşulları analizi',
  grain: 'monthly',
  date_range: { start: '2023-01-01', end: '2024-12-31' },
  entities: ['Parsel-A', 'Parsel-B', 'Parsel-C', 'Parsel-D', 'Parsel-E'],
  categories: ['Domates', 'Biber', 'Patlıcan', 'Hıyar', 'Mısır'],
  metrics: [
    { name: 'yield_kg', description: 'Hasat verimi', unit: 'kg', type: 'quantity' },
    { name: 'irrigation_m3', description: 'Sulama miktarı', unit: 'm3', type: 'quantity' },
    { name: 'fertilizer_kg', description: 'Gübre kullanımı', unit: 'kg', type: 'quantity' },
    { name: 'weather_index', description: 'Hava durumu endeksi', unit: 'index', type: 'index' },
    { name: 'yield_per_m3', description: 'Sulama verimliliği', unit: 'kg/m3', type: 'ratio' }
  ],
  recommended_charts: [
    { type: 'ScatterChart', title: 'Sulama vs Verim', x: 'irrigation_m3', y: 'yield_kg' },
    { type: 'LineChart', title: 'Aylık Verim Trendi', x: 'date', y: 'yield_kg', groupBy: 'category' },
    { type: 'BarChart', title: 'Ürün Bazında Verim', x: 'category', y: 'yield_kg', aggregate: 'sum' }
  ],
  kpi_cards: [
    { title: 'Toplam Verim', metric: 'yield_kg', aggregate: 'sum', format: 'number' },
    { title: 'Toplam Sulama', metric: 'irrigation_m3', aggregate: 'sum', format: 'number' },
    { title: 'Ortalama Verimlilik', metric: 'yield_per_m3', aggregate: 'avg', format: 'number' }
  ],
  source: 'Sentetik veri (demo amaçlı)',
  license: 'MIT',
  notes: 'Yaz aylarında sulama ve verim birlikte artar. Sulama verimliliği ölçülebilir.',
  version: '1.0.0',
  created_at: '2025-12-31',
  row_count: 3000
};

const yieldReadme = `# Tarımsal Verim & Sulama İlişkisi

## 📊 Özet
5 parsel × 5 ürün × 24 ay = verim, sulama ve hava koşulları analizi.

## 🎯 Kullanım Senaryosu
- Sulama optimizasyonu
- Verim tahmini
- Hava koşulları etkisi
- Parsel karşılaştırması

## 📈 Öne Çıkan Özellikler
- **Sulama-Verim İlişkisi**: Net korelasyon görünür
- **Mevsimsellik**: Yaz aylarında %50 artış
- **Hava Endeksi**: 60-95 arası

## 📋 Veri Yapısı
- **Tarih**: 2023-01 → 2024-12 (24 ay)
- **Parseller**: 5
- **Ürünler**: 5
- **Toplam Satır**: 3,000

## 🏷️ Etiketler
\`#tarım\` \`#verim\` \`#sulama\` \`#hava\` \`#optimizasyon\`
`;

// ===== DATASET 4: OEE & FIRE =====
const oeeMetadata = {
  id: 'mfg-oee-scrap-001',
  title: 'Üretim OEE & Fire Analizi',
  sector: 'Üretim & Operasyon',
  use_case: 'Üretim hattı performansı, fire maliyeti ve OEE skoru takibi',
  grain: 'daily',
  date_range: { start: '2024-01-01', end: '2024-12-31' },
  entities: ['Hat-1-Gündüz', 'Hat-1-Gece', 'Hat-2-Gündüz', 'Hat-2-Gece', 'Hat-3-Gündüz', 'Hat-3-Gece'],
  categories: ['Ürün-A', 'Ürün-B', 'Ürün-C'],
  metrics: [
    { name: 'oee_percent', description: 'Overall Equipment Effectiveness', unit: '%', type: 'percentage' },
    { name: 'availability_percent', description: 'Kullanılabilirlik', unit: '%', type: 'percentage' },
    { name: 'performance_percent', description: 'Performans', unit: '%', type: 'percentage' },
    { name: 'quality_percent', description: 'Kalite', unit: '%', type: 'percentage' },
    { name: 'production_units', description: 'Üretim miktarı', unit: 'adet', type: 'quantity' },
    { name: 'scrap_units', description: 'Fire miktarı', unit: 'adet', type: 'quantity' },
    { name: 'scrap_cost_tl', description: 'Fire maliyeti', currency: 'TL', type: 'currency' },
    { name: 'downtime_hours', description: 'Duruş süresi', unit: 'saat', type: 'duration' }
  ],
  recommended_charts: [
    { type: 'LineChart', title: 'Günlük OEE Trendi', x: 'date', y: 'oee_percent', groupBy: 'entity' },
    { type: 'BarChart', title: 'Hat Bazında Fire Maliyeti', x: 'entity', y: 'scrap_cost_tl', aggregate: 'sum' },
    { type: 'LineChart', title: 'Kullanılabilirlik Trendi', x: 'date', y: 'availability_percent', groupBy: 'entity' }
  ],
  kpi_cards: [
    { title: 'Ortalama OEE', metric: 'oee_percent', aggregate: 'avg', format: 'percentage' },
    { title: 'Toplam Üretim', metric: 'production_units', aggregate: 'sum', format: 'number' },
    { title: 'Toplam Fire Maliyeti', metric: 'scrap_cost_tl', aggregate: 'sum', format: 'currency' },
    { title: 'Toplam Duruş', metric: 'downtime_hours', aggregate: 'sum', format: 'number' }
  ],
  source: 'Sentetik veri (demo amaçlı)',
  license: 'MIT',
  notes: 'OEE = Kullanılabilirlik × Performans × Kalite. Günlük veri ile detaylı analiz.',
  version: '1.0.0',
  created_at: '2025-12-31',
  row_count: 52560
};

const oeeReadme = `# Üretim OEE & Fire Analizi

## 📊 Özet
3 hat × 2 vardiya × 3 ürün × 365 gün = OEE ve fire detaylı analizi.

## 🎯 Kullanım Senaryosu
- OEE performans takibi
- Fire maliyet analizi
- Vardiya karşılaştırması
- Duruş analizi

## 📈 Öne Çıkan Özellikler
- **Günlük Detay**: 365 gün veri
- **OEE Hesabı**: Availability × Performance × Quality
- **Fire Takibi**: Birim ve maliyet

## 📋 Veri Yapısı
- **Tarih**: 2024-01-01 → 2024-12-31 (365 gün)
- **Hatlar**: 3
- **Vardiyalar**: 2
- **Ürünler**: 3
- **Toplam Satır**: 52,560

## 🏷️ Etiketler
\`#üretim\` \`#oee\` \`#fire\` \`#kalite\` \`#performans\`
`;

// ===== DATASET 5: RESTORAN OPS =====
const restMetadata = {
  id: 'rest-ops-001',
  title: 'Restoran Operasyonel Performans',
  sector: 'Restoran & Kafe',
  use_case: 'Şube bazında masa sayısı, ciro, maliyet ve kârlılık analizi',
  grain: 'weekly',
  date_range: { start: '2023-01-01', end: '2024-06-30' },
  entities: ['Kadıköy Şubesi', 'Beşiktaş Şubesi', 'Nişantaşı Şubesi'],
  categories: ['Hafta İçi', 'Hafta Sonu'],
  metrics: [
    { name: 'covers', description: 'Masa sayısı', unit: 'masa', type: 'quantity' },
    { name: 'avg_check_tl', description: 'Ortalama hesap', currency: 'TL', type: 'currency' },
    { name: 'revenue_tl', description: 'Toplam ciro', currency: 'TL', type: 'currency' },
    { name: 'food_cost_tl', description: 'Yiyecek maliyeti', currency: 'TL', type: 'currency' },
    { name: 'food_cost_percent', description: 'Food cost %', unit: '%', type: 'percentage' },
    { name: 'labor_hours', description: 'Çalışma saati', unit: 'saat', type: 'duration' },
    { name: 'labor_cost_tl', description: 'İşçilik maliyeti', currency: 'TL', type: 'currency' },
    { name: 'gross_profit_tl', description: 'Brüt kâr', currency: 'TL', type: 'currency' },
    { name: 'gross_profit_percent', description: 'Brüt kâr marjı', unit: '%', type: 'percentage' }
  ],
  recommended_charts: [
    { type: 'LineChart', title: 'Haftalık Ciro Trendi', x: 'date', y: 'revenue_tl', groupBy: 'entity' },
    { type: 'BarChart', title: 'Şube Bazında Kârlılık', x: 'entity', y: 'gross_profit_tl', aggregate: 'sum' },
    { type: 'LineChart', title: 'Food Cost % Trendi', x: 'date', y: 'food_cost_percent', groupBy: 'entity' }
  ],
  kpi_cards: [
    { title: 'Toplam Ciro', metric: 'revenue_tl', aggregate: 'sum', format: 'currency' },
    { title: 'Ortalama Hesap', metric: 'avg_check_tl', aggregate: 'avg', format: 'currency' },
    { title: 'Toplam Brüt Kâr', metric: 'gross_profit_tl', aggregate: 'sum', format: 'currency' },
    { title: 'Ortalama Kâr Marjı', metric: 'gross_profit_percent', aggregate: 'avg', format: 'percentage' }
  ],
  source: 'Sentetik veri (demo amaçlı)',
  license: 'MIT',
  notes: 'Hafta sonu ciroları %60 daha yüksek. Food cost ortalama %28-33.',
  version: '1.0.0',
  created_at: '2025-12-31',
  row_count: 4212
};

const restReadme = `# Restoran Operasyonel Performans

## 📊 Özet
3 şube × 2 gün tipi × 78 hafta = ciro, maliyet ve kârlılık analizi.

## 🎯 Kullanım Senaryosu
- Şube performans karşılaştırması
- Food cost takibi
- İşçilik analizi
- Hafta içi/sonu karşılaştırması

## 📈 Öne Çıkan Özellikler
- **Hafta Sonu Farkı**: %60 daha yüksek ciro
- **Food Cost**: %28-33 arası
- **Kârlılık**: Net brüt marj görünür

## 📋 Veri Yapısı
- **Tarih**: 2023-01 → 2024-06 (78 hafta)
- **Şubeler**: 3
- **Gün Tipleri**: 2
- **Toplam Satır**: 4,212

## 🏷️ Etiketler
\`#restoran\` \`#food-cost\` \`#işçilik\` \`#kârlılık\` \`#ciro\`
`;

// ===== DOSYALARI YAZ =====
function writeFiles() {
  const datasets = [
    { id: 'agri-seedling-002', metadata: seedlingMetadata, readme: seedlingReadme },
    { id: 'agri-yield-irrigation-003', metadata: yieldMetadata, readme: yieldReadme },
    { id: 'mfg-oee-scrap-001', metadata: oeeMetadata, readme: oeeReadme },
    { id: 'rest-ops-001', metadata: restMetadata, readme: restReadme }
  ];
  
  for (const ds of datasets) {
    const metaPath = path.join(DATASETS_DIR, ds.id, 'metadata.json');
    const readmePath = path.join(DATASETS_DIR, ds.id, 'README.md');
    
    fs.writeFileSync(metaPath, JSON.stringify(ds.metadata, null, 2), 'utf-8');
    fs.writeFileSync(readmePath, ds.readme, 'utf-8');
    
    console.log(`✅ ${ds.id}: metadata.json + README.md`);
  }
}

writeFiles();
console.log('\n✅ Tüm metadata dosyaları oluşturuldu!');




