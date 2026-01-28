# 🧪 Dashboard Confidence/Risk Indicator Test Senaryoları

## Test Senaryoları

### Senaryo 1: Yüksek Confidence (%90+)
**Durum:** İyi CSV, temiz veri

**Beklenen Sonuç:**
- ✅ Yeşil gösterge (%90+)
- ✅ CheckCircle2 icon
- ✅ Risk flag yok
- ✅ Dashboard normal çalışır
- ✅ Hiçbir buton kilitlenmez

---

### Senaryo 2: Orta Confidence (%60-84)
**Durum:** Bazı belirsizlikler var

**Beklenen Sonuç:**
- ⚠️ Sarı gösterge (%60-84)
- ⚠️ Info icon
- ⚠️ Risk flag sayısı gösterilir (varsa)
- ✅ Dashboard normal çalışır
- ✅ Kullanıcı korkutulmaz

---

### Senaryo 3: Düşük Confidence (<60)
**Durum:** Kötü CSV, çok belirsizlik

**Beklenen Sonuç:**
- ⚠️ Gri gösterge (<60)
- ⚠️ Info icon
- ⚠️ Risk flag'ler gösterilir
- ✅ Dashboard YİNE render edilir
- ✅ Kırmızı YOK (korkutma yok)
- ✅ Kullanıcı dashboard'u kullanmaya devam edebilir

---

## Test Adımları

### 1. Mock Diagnosis ile Test

Browser console'da:
```javascript
// Test için mock diagnosis oluştur
import { createMockDiagnosis, attachDiagnosisToConfig } from './src/utils/dashboardDiagnosisHelper';
import { createFinopsDashboard } from './src/components/dashboards/DashboardFactory';

// Yüksek confidence
const highConf = createMockDiagnosis(0.92, 0);
const configHigh = {
  id: 'test-1',
  title: 'Test Dashboard',
  subtitle: 'Yüksek Confidence Test',
  icon: '📊',
  kpis: [{ id: 'kpi1', label: 'Test KPI', icon: 'DollarSign', format: 'currency', insight: 'Test' }],
  charts: [{ id: 'chart1', title: 'Test Chart', type: 'line', dataKey: 'value', insight: 'Test' }],
};
const configWithHighConf = attachDiagnosisToConfig(configHigh, highConf);
const DashboardHigh = createFinopsDashboard(configWithHighConf);

// Orta confidence
const midConf = createMockDiagnosis(0.75, 2);
const configMid = { ...configHigh, subtitle: 'Orta Confidence Test' };
const configWithMidConf = attachDiagnosisToConfig(configMid, midConf);
const DashboardMid = createFinopsDashboard(configWithMidConf);

// Düşük confidence
const lowConf = createMockDiagnosis(0.45, 5);
const configLow = { ...configHigh, subtitle: 'Düşük Confidence Test' };
const configWithLowConf = attachDiagnosisToConfig(configLow, lowConf);
const DashboardLow = createFinopsDashboard(configWithLowConf);
```

### 2. Gerçek CSV ile Test

1. **İyi CSV yükle:**
   - http://localhost:5173/veri-girisi
   - Temiz CSV yükle
   - Dashboard oluştur
   - Beklenen: Yeşil gösterge (%85+)

2. **Kötü CSV yükle:**
   - Karışık veri tipleri içeren CSV
   - Dashboard oluştur
   - Beklenen: Sarı/Gri gösterge + risk flag'ler

3. **Dashboard'u kullan:**
   - Export butonları çalışmalı
   - Filtreler çalışmalı
   - Hiçbir şey kilitlenmemeli

---

## Görsel Kontrol

### Confidence Indicator Görünümü

**Yüksek (%90+):**
```
[✓] Veri Güveni: %92
```

**Orta (%60-84):**
```
[ℹ] Veri Güveni: %75  [⚠] 2 potansiyel varsayım
```

**Düşük (<60):**
```
[ℹ] Veri Güveni: %45  [⚠] 5 potansiyel varsayım
```

### Tooltip Detayları

Risk flag'lere hover yapınca:
- Risk code ve mesaj gösterilmeli
- Kullanıcı dostu açıklama

---

## Başarı Kriterleri

- ✅ Confidence gösterge görünür (diagnosis varsa)
- ✅ Renkler doğru (yeşil/sarı/gri, kırmızı YOK)
- ✅ Risk flag'ler tooltip ile gösterilir
- ✅ Dashboard render akışı engellenmez
- ✅ Hiçbir buton kilitlenmez
- ✅ Kullanıcı korkutulmaz
- ✅ Admin console'da detaylı log görünür (dev mode)

---

## Admin Console Log Örneği

```javascript
🔬 [Dashboard Diagnosis] Test Dashboard
  Confidence Score: 75%
  Risk Flags: 2
  Risk Details: [
    { code: 'LOW_CONFIDENCE', severity: 'medium', message: '...' },
    { code: 'ASSUMPTIONS_BLOCKED', severity: 'medium', message: '...' }
  ]
  Blocked Assumptions: ['Varsayım 1', 'Varsayım 2']
```
