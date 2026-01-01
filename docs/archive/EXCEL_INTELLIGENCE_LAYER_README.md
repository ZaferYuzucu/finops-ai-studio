# 📊 Excel Intelligence Layer - Documentation

## 🎯 Proje Hedefi

**Excel Intelligence Layer**, FinOps.ist kullanıcılarının kendi Excel/CSV dosyalarını sisteme yükleyip dashboard'larda kullanmalarını sağlayan akıllı bir veri dönüşüm katmanıdır.

### Kullanım Senaryoları
- 📝 Restoran: Adisyon kayıtları → Günlük satış analizleri
- 🛒 E-ticaret: Ödeme gateway raporları → Sipariş analizleri
- 🏭 Üretim: ERP çıktıları → Üretim maliyetleri
- 💰 Finans: Muhasebe yazılımı raporları → Nakit akışı

---

## 🏗️ Mimari Yapı

```
src/modules/data-ingestion/
├── types.ts                    # TypeScript interface'ler
├── constants.ts                # Sabitler (sütun pattern'leri, dosya türleri)
│
├── utils/
│   ├── excelParser.ts          # Excel/CSV okuma (SheetJS)
│   ├── columnMapper.ts         # Otomatik sütun eşleştirme
│   └── normalizer.ts           # Veri normalize etme
│
├── services/
│   └── storageService.ts       # localStorage CRUD işlemleri
│
├── components/
│   ├── DataIngestionWizard.tsx # Ana wizard orchestrator
│   └── steps/
│       ├── StepUpload.tsx      # 1. Dosya yükle
│       ├── StepSheetSelect.tsx # 2. Sayfa seç (Excel)
│       ├── StepHeaderDetection.tsx # 3. Başlık satırı tespit
│       ├── StepColumnMapping.tsx   # 4. Sütun eşleştirme
│       ├── StepValidation.tsx      # 5. Veri doğrulama
│       └── StepPreview.tsx         # 6. Önizleme & kaydet
│
└── hooks/
    └── useIngestedData.ts      # Dashboard entegrasyon hook'u
```

---

## 🔄 Veri Akışı (6 Adım)

### 1️⃣ **Dosya Yükle**
- Kullanıcı Excel/CSV dosyasını sürükleyip bırakır
- Veri seti türünü seçer (Satış, Gider, Stok, vb.)
- İsim verir (örn: "2024 Satış Verileri")

**Desteklenen Formatlar:**
- `.xlsx`, `.xls`, `.csv`, `.tsv`
- Max 10 MB

### 2️⃣ **Sayfa Seç** (Multi-sheet Excel için)
- Excel'de birden fazla sayfa varsa kullanıcı seçer
- Her sayfa için önizleme gösterilir
- CSV/TSV için otomatik geçilir

### 3️⃣ **Başlık Satırı Tespit**
- **Otomatik tespit:** İlk metin içeren satır
- Kullanıcı manuel düzeltme yapabilir
- Tabloda highlight ile gösterilir

### 4️⃣ **Sütun Eşleştirme** (En kritik adım)
Excel sütunları → FinOps standart alanları

**Standart FinOps Alanları:**
| Alan | Zorunlu? | Tür |
|------|----------|-----|
| `date` | ✅ Evet | Date |
| `value` | ✅ Evet | Number |
| `entity` | ❌ Hayır | String |
| `category` | ❌ Hayır | String |
| `sub_category` | ❌ Hayır | String |
| `metric` | ❌ Hayır | String |
| `currency` | ❌ Hayır | String |
| `unit` | ❌ Hayır | String |
| `source` | ❌ Hayır | String |
| `notes` | ❌ Hayır | String |

**Otomatik Eşleştirme Logic:**
- Pattern matching (örn: "tarih" → `date`)
- Örnek veri analizi (sayısal → `value`)
- Güven skoru (0-100%) gösterilir

### 5️⃣ **Doğrulama**
Veri kalitesi kontrolleri:
- ✅ **Başarılı:** Tüm zorunlu alanlar dolu
- ⚠️ **Uyarı:** Eksik opsiyonel alanlar
- ❌ **Hata:** Geçersiz tarih/sayı formatı

**Metrikler:**
- Başarı oranı (%)
- Hata/uyarı sayısı
- Sorun detayları (satır/sütun)

### 6️⃣ **Önizleme & Kaydet**
- Normalize edilmiş veri tablosu gösterilir
- localStorage'a kaydedilir
- Dashboard'larda kullanıma hazır

---

## 💾 Veri Saklama

### localStorage Yapısı

```typescript
// finops_ingested_data
[
  {
    id: "ds_1234567890_abc123",
    name: "2024 Satış Verileri",
    type: "Sales",
    rows: [ { date, entity, category, value, ... }, ... ],
    uploadDate: "2024-01-15T10:30:00.000Z",
    fileName: "satis_raporu.xlsx",
    sheetName: "Sheet1",
    rowCount: 245
  },
  ...
]

// finops_ingestion_history
[
  {
    id: "ds_1234567890_abc123",
    fileName: "satis_raporu.xlsx",
    sheetName: "Sheet1",
    datasetType: "Sales",
    rowCount: 245,
    timestamp: "2024-01-15T10:30:00.000Z",
    status: "success"
  },
  ...
]
```

### API (localStorage)

```typescript
import { 
  saveIngestedData, 
  getAllDatasets, 
  getDatasetsByType,
  deleteDataset 
} from '@/modules/data-ingestion/services/storageService';

// Kaydet
const dataset = saveIngestedData(name, type, rows, fileName, sheetName);

// Oku
const allDatasets = getAllDatasets();
const salesData = getDatasetsByType('Sales');

// Sil
deleteDataset(datasetId);
```

---

## 🔗 Dashboard Entegrasyonu

### React Hook Kullanımı

```tsx
import { useIngestedData, useAggregatedData } from '@/modules/data-ingestion/hooks/useIngestedData';

function SalesDashboard() {
  // Tüm satış veri setlerini getir
  const { datasets, loading, refresh } = useIngestedData('Sales');
  
  // Agregasyon
  const aggregated = useAggregatedData('Sales', '2024-01-01', '2024-12-31');
  
  return (
    <div>
      <h2>Toplam Satış: {aggregated?.totalValue} TRY</h2>
      <p>Veri Kaynağı: {datasets.length} dosya</p>
    </div>
  );
}
```

### Örnek: Kategori Bazlı Grafik

```tsx
const { datasets } = useIngestedData('Sales');
const allRows = datasets.flatMap(d => d.rows);

// Kategoriye göre grupla
const categoryTotals = allRows.reduce((acc, row) => {
  const cat = row.category || 'Diğer';
  acc[cat] = (acc[cat] || 0) + (row.value || 0);
  return acc;
}, {} as Record<string, number>);

// Recharts ile görselleştir
<BarChart data={Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))}>
  ...
</BarChart>
```

---

## 🎨 UI/UX Özellikleri

### Wizard Progress Indicator
6 adımlı progress bar:
- Tamamlananlar: Yeşil ✅
- Aktif adım: Mavi 🔵
- Bekleyenler: Gri ⚪

### Drag & Drop Upload
- Modern sürükle-bırak arayüzü
- Dosya türü validasyonu
- Boyut kontrolü (max 10 MB)

### Otomatik Tespit Güven Skoru
- 🟢 **Yüksek (>80%)**: "Tarih" → `date`
- 🟡 **Orta (60-80%)**: "Miktar" → `value`
- 🔴 **Düşük (<60%)**: Manuel kontrol gerekir

### Validation Issue Görselleştirme
- Hata/uyarı tablosu
- Satır-sütun referansı
- Açıklayıcı mesajlar

---

## 📦 Dependencies

```json
{
  "xlsx": "^0.18.5",          // Excel okuma/yazma
  "papaparse": "^5.4.1",      // CSV parsing
  "lucide-react": "^0.263.1"  // İkonlar
}
```

### Installation

```bash
npm install xlsx papaparse
```

---

## 🧪 Test Senaryoları

### ✅ Happy Path
1. Sample CSV dosyası yükle (`sample_sales_data.csv`)
2. Otomatik kolon eşleşmelerini onayla
3. Doğrulamayı geç
4. Kaydet

### ⚠️ Edge Cases
- **Multi-sheet Excel:** 2. sayfayı seçme
- **Yanlış başlık satırı:** Manuel düzeltme
- **Türkçe tarih formatı:** `01.01.2024` → `2024-01-01`
- **Binlik ayraç:** `15.000` → `15000`
- **Eksik değerler:** Boş hücreler

### 🐛 Error Handling
- Desteklenmeyen dosya türü
- Bozuk Excel dosyası
- 10 MB'dan büyük dosya
- Zorunlu kolon eksik

---

## 🚀 Production Roadmap

### Faz 1 (Mevcut - Beta)
- ✅ localStorage bazlı
- ✅ 6 adımlı wizard
- ✅ Otomatik kolon tespiti
- ✅ Veri normalizasyonu
- ✅ Dashboard hook'ları

### Faz 2 (Enterprise)
- 🔄 **Backend Entegrasyonu:**
  - API endpoint'leri (`POST /api/data/ingest`)
  - PostgreSQL/MongoDB veri saklama
  - Kullanıcı bazlı veri izolasyonu
  
- 🤖 **AI Geliştirmeleri:**
  - GPT-4 ile akıllı kolon eşleştirme
  - Anomali tespiti
  - Otomatik kategorizasyon
  
- 👥 **Collaboration:**
  - Veri setlerini ekip ile paylaşma
  - Yorum & etiketleme
  - Versiyon yönetimi
  
- 📊 **Advanced Features:**
  - Scheduled import (Google Sheets, API)
  - Veri merge/join
  - Transform pipeline builder

---

## 📚 Örnek Dosyalar

### `sample_sales_data.csv`
30 satırlık örnek satış verisi:
- Tarih, Firma, Kategori, Tutar, Ödeme Türü, Notlar
- Türkçe içerik
- Farklı sektörler (Teknoloji, Perakende, Otel, vb.)

Konum: `/public/sample-data/sample_sales_data.csv`

---

## 🔐 Güvenlik & Gizlilik

### Beta Sürümü (localStorage)
- ✅ Veriler sadece tarayıcıda saklanır
- ✅ Sunucuya hiçbir veri gönderilmez
- ⚠️ Tarayıcı cache temizlenirse veriler kaybolur
- ⚠️ Cihazlar arası senkronizasyon yok

### Production (Backend)
- 🔒 AES-256 şifreleme
- 🔑 Kullanıcı bazlı access control
- 📝 Audit log (kim, ne zaman, hangi veriyi yükledi)
- 🇪🇺 GDPR uyumlu

---

## 🎓 Kullanıcı Eğitim İçeriği

### Video Anlatım (Önerilen)
1. **Dosya Yükleme (1 dk)**
2. **Kolon Eşleştirme (2 dk)**
3. **Dashboard Kullanımı (2 dk)**

### Tooltip Mesajları
- "Başlık satırı: Kolon isimlerinin bulunduğu satır"
- "Güven skoru: Otomatik eşleştirme doğruluğu"
- "Tarih & Değer: Zorunlu alanlar"

### Help Center Makalesi
- **Başlık:** "Excel Dosyanızı FinOps.ist'e Nasıl Aktarırsınız?"
- **İçerik:** Step-by-step screenshots
- **FAQ:** Sık sorulan sorular

---

## 👨‍💻 Development Notes

### Kod Standartları
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Component prop validasyonu
- ✅ Error boundary'ler

### Performance
- Chunk-based processing (büyük dosyalar için)
- Virtual scrolling (10K+ satır preview için)
- Debounced validation

### Accessibility
- Keyboard navigation
- Screen reader uyumlu
- ARIA labels

---

## 📞 Destek & Feedback

### Bug Report
- GitHub Issues
- Email: support@finops.ist

### Feature Request
- Community Forum
- Beta tester anketi

---

**🎉 Excel Intelligence Layer v1.0 - FinOps.ist Exclusive Feature**

Built with ❤️ by FinOps AI Studio Team



