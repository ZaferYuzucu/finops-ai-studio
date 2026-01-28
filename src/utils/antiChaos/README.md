# 🛡️ ANTI-CHAOS SYSTEM

## Genel Bakış

FinOps AI Studio için production-grade hata yönetimi ve veri işleme sistemi. Kullanıcı hatalarına, bozuk CSV/Excel dosyalarına, yanlış numeric inference'a, locale farklarına ve AI belirsizliklerine karşı sistemin kendini korumasını sağlar.

## Temel Prensipler

1. **HIÇBIR KULLANICI HATASI SISTEM HATASI OLARAK DISARI YANSIMAYACAK**
2. Beyaz sayfa (white screen) = KESİNLİKLE YASAK
3. "Numeric sütun bulunamadı" gibi suçlayıcı hata = YASAK
4. Varsayım (assumption) ile otomatik karar = YASAK
5. Kullanıcı ASLA suçlanmaz

## Katmanlar

### 1. Input Shield (`inputShield.ts`)
- CSV/Excel dosyaları GÜVENSİZ kabul edilir
- UTF-8 BOM temizleme
- Delimiter auto-detect (',', ';', '\t')
- Locale-aware decimal detection (1.234,56 / 1,234.56)
- Column profiling (her sütun için confidence score)

### 2. Assumption Killer (`assumptionKiller.ts`)
- Numeric inference için confidence scoring
- confidenceScore < 0.8 ise kullanıcıya seçenek sun
- Otomatik KPI üretimi engellenir

### 3. User Dignity Guard (`userDignityGuard.ts`)
- Teknik hataları kullanıcı dostu mesajlara çevir
- Kullanıcı ASLA suçlanmaz
- Yardımcı öneriler sunar

### 4. Fail-Soft Dashboard Engine (`failSoftDashboard.ts`)
- 3 aşamalı dashboard üretimi:
  1. Veri keşfi (column profiler)
  2. Taslak KPI önerileri
  3. Final dashboard
- Her aşama render edilebilir
- Fallback UI zorunlu

### 5. Self-Diagnosis & Risk Engine (`selfDiagnosis.ts`)
- Dashboard confidence scoring
- Risk flag'leri
- Admin paneli için loglama
- Öneriler üretimi

### 6. Global Error Boundary (`globalErrorBoundary.tsx`)
- Beyaz sayfa önleme
- Graceful degradation
- Friendly error mesajları

### 7. Firestore Integration (`firestoreIntegration.ts`)
- Firestore = TEK SOURCE OF TRUTH
- IndexedDB = SADECE CLIENT CACHE
- Büyük dosyalar Firebase Storage'a

## Kullanım

### Basit Kullanım (Master Pipeline)

```typescript
import { runAntiChaosPipeline } from './utils/antiChaos';

const result = await runAntiChaosPipeline(file);

if (result.success) {
  // Dashboard hazır
  console.log('Dashboard:', result.dashboard);
  console.log('Confidence:', result.diagnosis?.confidenceScore);
} else {
  // Hata var, ama kullanıcı dostu mesaj
  console.error('Error:', result.error?.message);
}
```

### Adım Adım Kullanım

```typescript
import {
  parseCSVSafe,
  inferNumericColumns,
  stage1_DataDiscovery,
  stage2_DraftKPIs,
  stage3_FinalDashboard,
  diagnoseDashboard,
} from './utils/antiChaos';

// 1. Input Shield
const parseResult = await parseCSVSafe(file);

// 2. Assumption Killer
const assumptionResult = inferNumericColumns(
  parseResult.columnProfiles,
  parseResult.data
);

// 3. Fail-Soft Dashboard
const discovery = stage1_DataDiscovery(parseResult.data, parseResult.columnProfiles);
const draft = stage2_DraftKPIs(parseResult.data, parseResult.columnProfiles, assumptionResult);
const final = stage3_FinalDashboard(draft, assumptionResult);

// 4. Self-Diagnosis
const diagnosis = diagnoseDashboard(final, parseResult.data, parseResult.columnProfiles, assumptionResult);
```

## Test Senaryoları

1. **TR CSV (; ,)** - Türkçe locale, noktalı virgül delimiter
2. **EN CSV (, .)** - İngilizce locale, virgül delimiter
3. **Bozuk numeric** - Belirsiz sayısal sütunlar
4. **Refresh sonrası devam** - Sayfa yenileme sonrası veri kaybı yok
5. **Farklı cihazdan login** - Firestore sync

## Entegrasyon

### Mevcut CSV Parser'ı Değiştirme

```typescript
// ESKİ (csvParser.ts)
import { parseCSVFile } from './utils/csvParser';

// YENİ (anti-chaos)
import { parseCSVSafe } from './utils/antiChaos/inputShield';
```

### Error Boundary Güncelleme

```typescript
// App.tsx
import { GlobalErrorBoundary } from './utils/antiChaos/globalErrorBoundary';

<GlobalErrorBoundary>
  <App />
</GlobalErrorBoundary>
```

## Güvenlik

- Tüm veriler Firestore Security Rules ile korunur
- Kullanıcılar sadece kendi verilerini görebilir
- Büyük dosyalar Firebase Storage'da şifrelenir
- Checksum ile veri bütünlüğü kontrol edilir

## Performans

- Küçük dosyalar (<1MB) → Firestore
- Büyük dosyalar (>1MB) → Firebase Storage
- IndexedDB cache ile offline destek
- Lazy loading ile performans optimizasyonu

## Sonraki Adımlar

1. ✅ Input Shield - Tamamlandı
2. ✅ Assumption Killer - Tamamlandı
3. ✅ User Dignity Guard - Tamamlandı
4. ✅ Fail-Soft Dashboard Engine - Tamamlandı
5. ✅ Self-Diagnosis - Tamamlandı
6. ✅ Global Error Boundary - Tamamlandı
7. ✅ Firestore Integration - Tamamlandı
8. ⏳ Test Senaryoları - Devam ediyor
9. ⏳ Mevcut sistem entegrasyonu - Devam ediyor
