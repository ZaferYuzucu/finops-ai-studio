# 📊 CSV Kütüphanesi - Tam Kullanım Rehberi

## 🎯 Genel Bakış

CSV Kütüphanesi, FinOps.ist için demo ve satış sunumlarında kullanılmak üzere hazır veri setleri sağlayan, offline çalışabilen ve genişletilebilir bir sistemdir.

---

## 🚀 Hızlı Başlangıç

### 1️⃣ **CSV Kütüphanesi'ni Aç**
```
http://localhost:5173/admin-login
Şifre: finops2025
→ Footer → "📊 CSV Kütüphanesi"
```

### 2️⃣ **Dataset Seç**
- Sektör filtresi ile arama yap
- "Önizle" butonuna tıkla → Grafikler + KPI'lar + Tablo
- "Kullan" butonuna tıkla → Dashboard'a uygula

### 3️⃣ **Dashboard'da Gör**
```
Platform Analitikleri → B2B Demo sekmesi
→ "Seçili Dataset Demo" otomatik gösterilir
```

---

## 📊 Mevcut Özellikler

### ✅ **1. CSV Kütüphanesi Sayfası**
- **Sektör Filtreleri**: Tarım, Üretim, Restoran, vb.
- **Dataset Kartları**: Başlık, tarih aralığı, satır sayısı, etiketler
- **Önizleme Modalı**:
  - ✅ 2 Örnek Grafik (LineChart/BarChart)
  - ✅ KPI Kartları (toplam, ortalama, vb.)
  - ✅ İlk 20 satır tablo görünümü
- **Kullan Butonu**: Dataset'i localStorage'a kaydedip dashboard'a yönlendirir

### ✅ **2. CSV Upload**
- Drag & Drop veya dosya seçimi
- **Validasyon**:
  - Gerekli kolonlar: `date, entity, category, metric, value`
  - Eksik kolon kontrolü
  - Otomatik parse ve kayıt
- **Limit**: Max 10,000 satır (performans için)
- **Storage**: localStorage (tarayıcı kapandığında kaybolur)

### ✅ **3. useCSVData Hook**
React hook ile CSV verilerini yükle:

```typescript
import { useCSVData } from '@/hooks/useCSVData';

function MyDashboard() {
  const { 
    data, 
    metadata, 
    loading, 
    error,
    getMetricData,
    aggregateMetric,
    getUniqueEntities 
  } = useCSVData('agri-seed-sales-001');

  if (loading) return <p>Yükleniyor...</p>;
  
  const totalRevenue = aggregateMetric('revenue', 'sum');
  const entities = getUniqueEntities();
  
  return <div>Toplam Ciro: ₺{totalRevenue}</div>;
}
```

### ✅ **4. Demo Dashboard Component**
Otomatik dashboard oluşturma:

```typescript
import DemoDashboardFromCSV from '@/components/DemoDashboardFromCSV';

<DemoDashboardFromCSV 
  datasetId="agri-seed-sales-001"
  onClose={() => console.log('Kapatıldı')}
/>
```

**Özellikler**:
- Otomatik KPI hesaplama
- Metadata'dan grafik oluşturma
- Responsive tasarım
- Tablo önizleme

### ✅ **5. Dashboard Entegrasyonu**
Platform Analitikleri → B2B Demo sekmesinde:
- Seçili dataset otomatik gösterilir
- "Kapat" butonu ile temizlenir
- localStorage üzerinden çalışır

---

## 📁 Mevcut Veri Setleri

| ID | Başlık | Sektör | Satır | Özellik |
|----|--------|--------|-------|---------|
| `agri-seed-sales-001` | Tohum Satış & Kâr | Tarım | 3,456 | Sezonluk trend, 24 ay |
| `agri-seedling-002` | Fidanlık Üretim | Tarım | 2,880 | Çimlenme oranı, 18 ay |
| `agri-yield-irrigation-003` | Verim & Sulama | Tarım | 3,000 | İlişki analizi, 24 ay |
| `mfg-oee-scrap-001` | OEE & Fire | Üretim | 52,560 | Günlük veri, 365 gün |
| `rest-ops-001` | Restoran Ops | Restoran | 4,212 | Haftalık veri, 78 hafta |

---

## 🛠️ Yeni Dataset Ekleme

### Adım 1: CSV Üret
```bash
cd scripts/csv-library/generate_synthetic
# Yeni generator script yaz
nano hotel_revpar.ts
npx tsx hotel_revpar.ts
```

### Adım 2: Validate Et
```bash
cd scripts/csv-library
npx tsx validate.ts /path/to/new_data.csv
```

### Adım 3: Klasör Oluştur
```bash
mkdir data/csv-library/datasets/hotel-revpar-001
mv new_data.csv data/csv-library/datasets/hotel-revpar-001/data.csv
```

### Adım 4: Metadata Yaz
`data/csv-library/datasets/hotel-revpar-001/metadata.json`:

```json
{
  "id": "hotel-revpar-001",
  "title": "Otel RevPAR & Doluluk",
  "sector": "Otel & Konaklama",
  "use_case": "...",
  "grain": "daily",
  "date_range": { "start": "2023-01-01", "end": "2024-12-31" },
  "metrics": [...],
  "recommended_charts": [
    {
      "type": "LineChart",
      "title": "Günlük RevPAR Trendi",
      "x": "date",
      "y": "revpar_tl"
    }
  ],
  "kpi_cards": [
    {
      "title": "Ortalama Doluluk",
      "metric": "occupancy_percent",
      "aggregate": "avg",
      "format": "percentage"
    }
  ],
  "source": "Sentetik veri",
  "license": "MIT",
  "row_count": 12000
}
```

### Adım 5: index.json Güncelle
`data/csv-library/index.json` dosyasına ekle:

```json
{
  "id": "hotel-revpar-001",
  "title": "Otel RevPAR & Doluluk",
  "sector": "Otel & Konaklama",
  "tags": ["otel", "revpar", "doluluk"],
  "date_range": "2023-01 → 2024-12",
  "row_count": 12000,
  "file_size_kb": 800
}
```

### Adım 6: Sektör Ekle (gerekirse)
Eğer yeni bir sektörse, `sectors` array'ine ekle:

```json
{
  "name": "Otel & Konaklama",
  "count": 1,
  "icon": "🏨"
}
```

---

## 🎨 UI Customization

### Önizleme Modalında Grafik Sayısı Değiştir
`CSVLibraryPage.tsx` içinde:

```typescript
{previewMetadata.recommended_charts.slice(0, 2).map(...)}
//                                              ↑
// 2'yi 3 veya 4 yapabilirsin
```

### KPI Format Özelleştir
`DemoDashboardFromCSV.tsx` içinde:

```typescript
<p className="text-3xl font-black text-green-900">
  {kpi.format === 'currency' && '₺'}
  {value.toLocaleString('tr-TR', { 
    maximumFractionDigits: kpi.format === 'percentage' ? 1 : 0 
  })}
  {kpi.format === 'percentage' && '%'}
</p>
```

---

## 🔧 Gelişmiş Kullanım

### Custom Aggregation
```typescript
const { data } = useCSVData('agri-seed-sales-001');

// Özel hesaplama
const totalRevenue = data
  .filter(row => row.metric === 'revenue' && row.entity === 'İzmir Bayi')
  .reduce((sum, row) => sum + parseFloat(String(row.value)), 0);
```

### Dinamik Filtre
```typescript
const { getMetricData } = useCSVData('agri-seed-sales-001');

// Sadece belirli entity ve category
const izmir Domates = getMetricData('units_sold', 'İzmir Bayi', 'Domates Tohumu');
```

---

## 🐛 Sorun Giderme

### Dataset Görünmüyor
1. Browser cache'i temizle (`Cmd + Shift + R`)
2. `data/csv-library/index.json` dosyasında dataset var mı kontrol et
3. Console'da hata var mı bak

### Grafik Çıkmıyor
1. `metadata.json` içinde `recommended_charts` array'i dolu mu?
2. CSV'de ilgili metric var mı?
3. `prepareChartData` fonksiyonunun doğru çalıştığından emin ol

### Upload Çalışmıyor
1. Dosya CSV mi? (.csv uzantısı)
2. Gerekli kolonlar var mı? (`date, entity, category, metric, value`)
3. Browser localStorage dolu mu? (Max 5-10MB)

---

## 📚 API Referansı

### `useCSVData(datasetId)`

**Parametreler:**
- `datasetId`: `string | null` - Dataset ID'si

**Dönüş:**
```typescript
{
  data: CSVRow[];
  metadata: Metadata | null;
  loading: boolean;
  error: string | null;
  getMetricData: (metric, entity?, category?) => CSVRow[];
  getUniqueEntities: () => string[];
  getUniqueCategories: () => string[];
  getUniqueMetrics: () => string[];
  getDateRange: () => { start: string; end: string };
  aggregateMetric: (metric, aggregation) => number;
}
```

---

## 🎯 İyi Pratikler

1. **Veri Boyutu**: Her dataset max 100,000 satır (performans için)
2. **Tarih Formatı**: YYYY-MM-DD (ISO 8601)
3. **Naming**: `sector-type-nnn` formatı (örn: `agri-seed-sales-001`)
4. **Metadata**: Her zaman eksiksiz doldur
5. **Tags**: 3-5 anahtar kelime yeterli
6. **README**: Her dataset için kısa açıklama

---

## 📞 Destek

Sorunlar için:
- `data/csv-library/README.md` dosyasını oku
- `SOURCES.md` dosyasında veri kaynaklarını gör
- `scripts/csv-library/validate.ts` ile CSV'ni kontrol et

---

**Son Güncelleme**: 2025-12-31  
**Versiyon**: 1.0.0  
**Maintainer**: FinOps.ist Data Team

