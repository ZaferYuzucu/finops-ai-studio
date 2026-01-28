# 📊 Confidence/Risk Indicator - Render Örneği

## Görsel Örnekler

### Senaryo 1: Yüksek Confidence (%92)
```
┌─────────────────────────────────────────────────────────┐
│ [✓] Veri Güveni: %92                                    │
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📊 Test Dashboard                                    │ │
│ │ Test Dashboard Analizi | MTD | Tüm Lokasyonlar     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ [KPI Grid] [KPI Grid] [KPI Grid] [KPI Grid] [KPI] [KPI]│
│                                                          │
│ [Chart] [Chart] [Chart]                                 │
└─────────────────────────────────────────────────────────┘
```

**Renk:** Yeşil (#10B981)  
**Icon:** CheckCircle2  
**Arka Plan:** Açık yeşil (#ECFDF5)

---

### Senaryo 2: Orta Confidence (%75) + 2 Risk
```
┌─────────────────────────────────────────────────────────┐
│ [ℹ] Veri Güveni: %75          [⚠] 2 potansiyel varsayım│
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📊 Test Dashboard                                    │ │
│ │ Test Dashboard Analizi | MTD | Tüm Lokasyonlar     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ [KPI Grid] [KPI Grid] [KPI Grid] [KPI Grid] [KPI] [KPI]│
│                                                          │
│ [Chart] [Chart] [Chart]                                 │
└─────────────────────────────────────────────────────────┘
```

**Renk:** Sarı (#F59E0B)  
**Icon:** Info  
**Arka Plan:** Açık sarı (#FFFBEB)  
**Tooltip:** Risk flag detayları (hover)

---

### Senaryo 3: Düşük Confidence (%45) + 5 Risk
```
┌─────────────────────────────────────────────────────────┐
│ [ℹ] Veri Güveni: %45          [⚠] 5 potansiyel varsayım│
│                                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ 📊 Test Dashboard                                    │ │
│ │ Test Dashboard Analizi | MTD | Tüm Lokasyonlar     │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                          │
│ [KPI Grid] [KPI Grid] [KPI Grid] [KPI Grid] [KPI] [KPI]│
│                                                          │
│ [Chart] [Chart] [Chart]                                 │
└─────────────────────────────────────────────────────────┘
```

**Renk:** Gri (#6B7280) - Korkutma YOK  
**Icon:** Info  
**Arka Plan:** Açık gri (#F3F4F6)  
**Tooltip:** Risk flag detayları (hover)

---

## Kullanım Örneği

```typescript
import { createFinopsDashboard } from './components/dashboards/DashboardFactory';
import { attachDiagnosisToConfig } from './utils/dashboardDiagnosisHelper';
import { createMockDiagnosis } from './utils/dashboardDiagnosisHelper';

// Dashboard config
const config = {
  id: 'test-dashboard',
  title: 'Finansal Dashboard',
  subtitle: 'Aylık Analiz',
  icon: '📊',
  kpis: [/* ... */],
  charts: [/* ... */],
};

// Diagnosis ekle
const diagnosis = createMockDiagnosis(0.75, 2);
const configWithDiagnosis = attachDiagnosisToConfig(config, diagnosis);

// Dashboard oluştur
const Dashboard = createFinopsDashboard(configWithDiagnosis);

// Render
<Dashboard />
```

---

## Responsive Davranış

- **Desktop:** Tam genişlik, risk flag'ler sağda
- **Tablet:** Kompakt görünüm
- **Mobile:** Tek satır, risk flag'ler alt satırda

---

## Print Davranışı

- `.no-print` class ile print'te gizlenir
- Dashboard print edilirken confidence indicator görünmez
