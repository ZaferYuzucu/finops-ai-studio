# 📊 CSV Kütüphanesi - FinOps.ist

## 🎯 Amaç

Demo ve satış sunumlarında, her sektör için zengin veri içeren CSV'leri tek tıkla seçip dashboardlara uygulayabilmek.

## 📁 Klasör Yapısı

```
data/csv-library/
├── index.json                 # Kütüphane kataloğu
├── SOURCES.md                 # Veri kaynakları rehberi
├── README.md                  # Bu dosya
└── datasets/
    ├── agri-seed-sales-001/
    │   ├── data.csv           # CSV verisi
    │   ├── metadata.json      # Metadata
    │   ├── README.md          # Dataset açıklaması
    │   └── preview.png        # Önizleme (opsiyonel)
    ├── agri-seedling-002/
    ├── agri-yield-irrigation-003/
    ├── mfg-oee-scrap-001/
    └── rest-ops-001/
```

## 📋 FinOps CSV Standard v1

Her CSV dosyası aşağıdaki şemaya uygun olmalıdır:

### Zorunlu Kolonlar
- `date` (ISO: YYYY-MM-DD)
- `entity` (şube/tesis/hat/mağaza vb.)
- `category` (ürün grubu / departman / gider tipi / kanal)
- `metric` (örn: revenue, cost, units, oee, occupancy, yield)
- `value` (number)

### Opsiyonel Kolonlar
- `currency` (TL, USD, EUR)
- `unit` (kg, adet, m3, saat, %)

### Örnek Satır
```csv
date,entity,category,metric,value,currency,unit
2023-01-15,İzmir Bayi,Buğday Tohumu,revenue,12500,TL,
2023-01-15,İzmir Bayi,Buğday Tohumu,units_sold,850,,kg
```

## 🚀 Kullanım

### Web Arayüzü
1. Admin olarak giriş yap
2. Footer → "📊 CSV Kütüphanesi" linkine tıkla
3. Sektör filtresi ile dataset'leri gözden geçir
4. "Önizle" butonu ile CSV içeriğini görebilirsin
5. "Kullan" butonu ile dashboard'a uygula

### Programatik Kullanım
```typescript
// CSV loader hook
import { useCSVData } from '@/hooks/useCSVData';

function MyDashboard() {
  const { data, loading, error } = useCSVData('agri-seed-sales-001');
  
  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;
  
  return (
    <LineChart data={data} x="date" y="revenue" groupBy="entity" />
  );
}
```

## 🛠️ Yeni Dataset Ekleme

### 1. CSV Üret
```bash
cd scripts/csv-library/generate_synthetic
# Yeni generator script yaz (örn: hotel_revpar.ts)
npx tsx hotel_revpar.ts
```

### 2. Normalize Et
```bash
cd scripts/csv-library
npx tsx normalize.ts /path/to/raw.csv /path/to/normalized.csv
```

### 3. Validate Et
```bash
npx tsx validate.ts /path/to/normalized.csv
```

### 4. Klasör Oluştur
```bash
mkdir data/csv-library/datasets/hotel-revpar-001
mv normalized.csv data/csv-library/datasets/hotel-revpar-001/data.csv
```

### 5. Metadata Yaz
`metadata.json` oluştur:
```json
{
  "id": "hotel-revpar-001",
  "title": "Otel RevPAR & Doluluk Analizi",
  "sector": "Otel & Konaklama",
  "use_case": "...",
  "grain": "daily",
  "date_range": { "start": "2023-01-01", "end": "2024-12-31" },
  "entities": [...],
  "categories": [...],
  "metrics": [...],
  "recommended_charts": [...],
  "kpi_cards": [...],
  "source": "...",
  "license": "MIT",
  "row_count": 12345
}
```

### 6. index.json Güncelle
`data/csv-library/index.json` dosyasına yeni dataset'i ekle.

## 📊 Mevcut Dataset'ler

1. **agri-seed-sales-001**: Tohum Satış, Stok ve Kârlılık (3,456 satır)
2. **agri-seedling-002**: Fidanlık Üretim Takibi (2,880 satır)
3. **agri-yield-irrigation-003**: Tarımsal Verim & Sulama (3,000 satır)
4. **mfg-oee-scrap-001**: Üretim OEE & Fire Analizi (52,560 satır)
5. **rest-ops-001**: Restoran Operasyonel Performans (4,212 satır)

## 🔐 Veri Gizliliği

- ✅ Tüm veriler açık kaynak veya sentetik
- ✅ Hiçbir gerçek müşteri verisi yok
- ✅ GDPR/KVKK uyumlu
- ✅ Lisanslar metadata'da belirtilmiş

## 📚 Daha Fazla Bilgi

- **Veri Kaynakları**: `SOURCES.md`
- **Validation**: `scripts/csv-library/validate.ts`
- **Normalization**: `scripts/csv-library/normalize.ts`

---

**Son Güncelleme**: 2025-12-31  
**Maintainer**: FinOps.ist Data Team




