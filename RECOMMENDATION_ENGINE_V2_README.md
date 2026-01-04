# 🎯 FinOps AI Studio - Recommendation Engine v2.0

## 🚀 **YENİ: Config-Driven, Extensible, AI-Ready**

---

## 📋 Genel Bakış

**Versiyon:** 2.0.0  
**Durum:** ✅ 4 KURAL TAMAMLANDI (KURAL-1 to KURAL-4)  
**Mimari:** Config-based, No hard-coded logic, AI-ready placeholders

---

## ✨ V2.0 YENİLİKLERİ

### **✅ Config-Driven Architecture**
```
❌ Eski: Hard-coded switch statements
✅ Yeni: Config dosyalarından kural yönetimi
```

### **✅ Yeni Output Format**
```typescript
{
  recommended_dashboards: [],  // ← Yeni format
  default_dashboard: "",       // ← Yeni format
  kpi_level: "BASIC|STANDARD|ADVANCED",  // ← YENİ (KURAL-4)
  sector_template: ""          // ← YENİ
}
```

### **✅ KURAL-4 Eklendi**
```
Finansal Olgunluk → KPI Detay Seviyesi

Başlangıç → BASIC (sadece aylık trendler)
Orta → STANDARD (aylık + kategori breakdown)
İleri → ADVANCED (trendler + benchmarks + alerts)
```

### **✅ AI-Ready Structure**
- Weight-based scoring
- Priority mapping
- Placeholder fonksiyonlar
- Extensible rule system

---

## 🏗️ YENİ MİMARİ

```
┌──────────────────────────────────────────────┐
│        CONFIG LAYER (Yeni!)                  │
│  /src/config/recommendationRules.ts          │
│                                              │
│  • SECTOR_DASHBOARD_RULES                   │
│  • COMPANY_SIZE_RULES                       │
│  • PRIMARY_GOAL_RULES                       │
│  • FINANCIAL_MATURITY_RULES ✅ YENİ         │
│  • KPI_LEVELS ✅ YENİ                       │
│  • RULE_PRIORITIES                          │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│        RULE ENGINE (Refactored)              │
│  /src/services/recommendationEngine.ts       │
│                                              │
│  • rule1_SectorMatch (config-driven)        │
│  • rule2_CompanySizeLimit (config-driven)   │
│  • rule3_PrimaryGoalDefault (config-driven) │
│  • rule4_FinancialMaturityKPI ✅ YENİ       │
│  • rule5_RevenueComplexity (placeholder)    │
│  • rule6_DataSourceIntegration (placeholder)│
│  • rule7_DecisionFrequency (placeholder)    │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│        OUTPUT (New Format)                   │
│  {                                           │
│    recommended_dashboards: [],              │
│    default_dashboard: "",                    │
│    kpi_level: "BASIC|STANDARD|ADVANCED",    │
│    sector_template: ""                       │
│  }                                           │
└──────────────────────────────────────────────┘
```

---

## ✅ UYGULANAN KURALLAR

### **KURAL-1: SEKTÖR → SEKTÖREL DASHBOARD** ✅

**Config:** `SECTOR_DASHBOARD_RULES`

```typescript
// Config-driven approach
export const SECTOR_DASHBOARD_RULES = [
  { sector: 'restaurant_cafe', dashboardId: 'restaurant-performance', weight: 1.0 },
  { sector: 'hotel_tourism', dashboardId: 'hospitality-performance', weight: 1.0 },
  // ... 9 sektör
];
```

**Yeni Sektör Eklemek:**
```typescript
import { addSectorRule } from '@/config/recommendationRules';

addSectorRule({
  sector: 'construction',
  dashboardId: 'construction-performance',
  weight: 1.0
});
```

---

### **KURAL-2: ŞİRKET BÜYÜKLÜĞÜ → DASHBOARD SAYISI** ✅

**Config:** `COMPANY_SIZE_RULES`

```typescript
export const COMPANY_SIZE_RULES = {
  '1-10': {
    maxDashboards: 2,
    requiredDashboards: ['ceo-overview', 'cash-flow'],
    reason: 'Mikro işletmeniz için odaklanmanız gereken 2 temel panel'
  },
  // ...
};
```

---

### **KURAL-3: ANA HEDEF → ÖNCELİKLİ DASHBOARD** ✅

**Config:** `PRIMARY_GOAL_RULES`

```typescript
export const PRIMARY_GOAL_RULES = {
  cash_flow: {
    defaultDashboard: 'cash-flow',
    reason: 'Nakit akışınızı anlık takip edin',
    weight: 1.0
  },
  // ...
};
```

---

### **KURAL-4: FİNANSAL OLGUNLUK → KPI DETAY SEVİYESİ** ✅ YENİ

**Config:** `FINANCIAL_MATURITY_RULES`

```typescript
export const FINANCIAL_MATURITY_RULES = {
  beginner: {
    kpiLevel: 'BASIC',
    reason: 'Başlangıç seviyesi - Temel metriklere odaklanın',
    recommendations: [
      'Basit, anlaşılır göstergeler',
      'Sadece aylık trendler'
    ]
  },
  intermediate: {
    kpiLevel: 'STANDARD',
    reason: 'Orta seviye - Detaylı analiz yapabilirsiniz',
    recommendations: [
      'Kategori bazlı dağılım',
      'Aylık + haftalık trendler'
    ]
  },
  advanced: {
    kpiLevel: 'ADVANCED',
    reason: 'İleri seviye - Tüm özelliklere erişin',
    recommendations: [
      'Sektör benchmark\'ları',
      'AI destekli tahminleme',
      'Akıllı uyarı sistemi'
    ]
  }
};
```

#### **KPI Seviyeleri:**

| Seviye | Trend | Kategori | Benchmark | Alert | Prediction |
|--------|-------|----------|-----------|-------|------------|
| **BASIC** | ✅ Aylık | ❌ | ❌ | ❌ | ❌ |
| **STANDARD** | ✅ Aylık+Haftalık | ✅ | ❌ | ❌ | ❌ |
| **ADVANCED** | ✅ Tüm | ✅ | ✅ | ✅ | ✅ |

---

## 📊 YENİ OUTPUT FORMAT

### **Eski Format (v1.0):**
```typescript
{
  recommendations: [],
  defaultDashboardId: "",
  totalRecommended: 0,
  appliedRules: [],
  profile: {}
}
```

### **Yeni Format (v2.0):**
```typescript
{
  // ✅ YENİ ALAN (API-friendly snake_case)
  recommended_dashboards: [],
  default_dashboard: "",
  kpi_level: "BASIC" | "STANDARD" | "ADVANCED",  // ← KURAL-4
  sector_template: "",  // ← Sector dashboard ID
  
  // Metadata
  totalRecommended: 0,
  appliedRules: [],
  profile: {},
  
  // Backward compatibility (eski kodlar için)
  recommendations: [],  // ← Hala destekleniyor
  defaultDashboardId: ""  // ← Hala destekleniyor
}
```

---

## 🚀 KULLANIM

### **Temel Kullanım:**

```typescript
import { generateRecommendations } from '@/services/recommendationEngine';

const profile = {
  sector: 'restaurant_cafe',
  company_size: '11-50',
  primary_goal: 'profitability',
  financial_maturity: 'intermediate'  // ← YENİ (KURAL-4)
};

const result = generateRecommendations(profile);

console.log('Default Dashboard:', result.default_dashboard);
// Output: "profit-loss"

console.log('KPI Level:', result.kpi_level);
// Output: "STANDARD"

console.log('Applied Rules:', result.appliedRules);
// Output: [
//   "RULE-4: FINANCIAL_MATURITY_KPI",
//   "RULE-3: PRIMARY_GOAL_DEFAULT",
//   "RULE-2: COMPANY_SIZE_LIMIT",
//   "RULE-1: SECTOR_MATCH"
// ]
```

### **UI Component ile Kullanım:**

```typescript
import RecommendationDisplay from '@/components/recommendations/RecommendationDisplay';
import { generateRecommendations } from '@/services/recommendationEngine';

function MyPage() {
  const surveyProfile = { /* user survey data */ };
  const recommendations = generateRecommendations(surveyProfile);
  
  return (
    <RecommendationDisplay
      result={recommendations}
      onSelectDashboard={(dashboardId) => {
        navigate(`/dashboard/${dashboardId}`);
      }}
    />
  );
}
```

---

## 🎨 UI METİNLERİ (KURAL-5)

### **Öneri Ekranı Başlığı:**
```
Yanıtlarınıza göre sizin için en uygun dashboard'ları hazırladık.
Dilerseniz bunları şimdi inceleyebilir veya daha sonra değiştirebilirsiniz.
```

### **KPI Seviye Açıklamaları:**

#### **BASIC (Başlangıç):**
```
✓ Basit, anlaşılır göstergeler
✓ Sadece aylık trendler
✓ Grafikler yerine sayılar
✓ Adım adım rehberler
```

#### **STANDARD (Orta):**
```
✓ Kategori bazlı dağılım
✓ Aylık + haftalık trendler
✓ Karşılaştırmalı grafikler
✓ Filtreler ve raporlar
```

#### **ADVANCED (İleri):**
```
✓ Sektör benchmark'ları
✓ AI destekli tahminleme
✓ Akıllı uyarı sistemi
✓ Özel rapor oluşturma
✓ API entegrasyonları
```

---

## 📁 DOSYA YAPISI (v2.0)

```
finops-ai-studio/
├── src/
│   ├── config/
│   │   └── recommendationRules.ts       # ✅ YENİ - Config layer
│   │
│   ├── types/
│   │   └── recommendationEngine.ts      # ✅ Güncellendi
│   │
│   ├── data/
│   │   └── dashboardDefinitions.ts      # ✅ Mevcut
│   │
│   ├── services/
│   │   └── recommendationEngine.ts      # ✅ Refactored v2.0
│   │
│   └── components/
│       └── recommendations/
│           └── RecommendationDisplay.tsx # ✅ YENİ - UI component
│
└── RECOMMENDATION_ENGINE_V2_README.md   # ✅ Bu dosya
```

---

## 🔧 GENİŞLETME REHBERİ

### **1. Yeni Sektör Eklemek:**

```typescript
// Step 1: Config'e ekle
import { SECTOR_DASHBOARD_RULES } from '@/config/recommendationRules';

SECTOR_DASHBOARD_RULES.push({
  sector: 'construction',
  dashboardId: 'construction-performance',
  weight: 1.0
});

// Step 2: Dashboard tanımını ekle
import { SECTOR_DASHBOARDS } from '@/data/dashboardDefinitions';

SECTOR_DASHBOARDS.construction = {
  id: 'construction-performance',
  name: 'İnşaat Performans Paneli',
  kpis: ['Project Cost', 'Timeline Variance', 'Safety Incidents'],
  icon: '🏗️'
};
```

### **2. Yeni Kural Eklemek:**

```typescript
// Step 1: Config'de kural tanımla
export const MY_NEW_RULE_CONFIG = {
  option1: { value: 'x', score: 90 },
  option2: { value: 'y', score: 80 }
};

// Step 2: Kural fonksiyonu yaz
const rule5_MyNewRule = (profile, context): RuleResult => {
  if (!profile.someField) return { matched: false };
  
  const config = MY_NEW_RULE_CONFIG[profile.someField];
  
  return {
    matched: true,
    score: config.score,
    reason: config.reason
  };
};

// Step 3: Ana motora ekle
export const generateRecommendations = (profile) => {
  // ...
  const rule5Result = rule5_MyNewRule(profile, context);
  if (rule5Result.matched) {
    appliedRules.push('RULE-5: MY_NEW_RULE');
  }
  // ...
};
```

### **3. AI Entegrasyonu için Hazırlık:**

```typescript
// Config'deki weight'ler AI scoring için kullanılabilir
export const AI_SCORING_WEIGHTS = {
  SECTOR_MATCH: 0.35,
  PRIMARY_GOAL: 0.30,
  COMPANY_SIZE: 0.20,
  FINANCIAL_MATURITY: 0.15
};

// Gelecek AI function
async function generateAIRecommendations(profile) {
  const baseRecommendations = generateRecommendations(profile);
  
  // AI enhancement
  const enhancedScores = await callAIModel(baseRecommendations, AI_SCORING_WEIGHTS);
  
  return enhancedScores;
}
```

---

## 🧪 TEST SENARYOLARI

### **Senaryo 1: Başlangıç Seviyesi Restoran**
```typescript
Input:
{
  sector: 'restaurant_cafe',
  company_size: '1-10',
  primary_goal: 'cash_flow',
  financial_maturity: 'beginner'  // ← KURAL-4
}

Expected Output:
- default_dashboard: 'cash-flow' ✓
- kpi_level: 'BASIC' ✓
- recommended_dashboards: 3 (Restoran + CEO + Cash Flow)
- appliedRules: [RULE-4, RULE-3, RULE-2, RULE-1]
```

### **Senaryo 2: İleri Seviye Üretim**
```typescript
Input:
{
  sector: 'manufacturing',
  company_size: '50+',
  primary_goal: 'cost_control',
  financial_maturity: 'advanced'  // ← KURAL-4
}

Expected Output:
- default_dashboard: 'cost-control' ✓
- kpi_level: 'ADVANCED' ✓
- Features: Benchmarks, Alerts, Predictions ✓
- recommended_dashboards: 5 (max)
```

---

## 📞 DURUM RAPORU

**Tarih:** Ocak 2026  
**Geliştirici:** Claude (Anthropic AI)  
**Versiyon:** 2.0.0  

**✅ TAMAMLANAN:**
- [x] Config-driven architecture
- [x] 4 kural implemented (RULE-1 to RULE-4)
- [x] Yeni output format
- [x] KPI level system (BASIC/STANDARD/ADVANCED)
- [x] UI component (RecommendationDisplay)
- [x] AI-ready structure
- [x] Extensibility helpers
- [x] Backward compatibility

**⏳ BEKLİYOR:**
- [ ] RULE-5: Revenue Complexity
- [ ] RULE-6: Data Source Integration
- [ ] RULE-7: Decision Frequency
- [ ] AI enhancement layer
- [ ] A/B testing framework

---

## 🎉 ÖZET

```
✅ V2.0 BAŞARIYLA TAMAMLANDI!

✨ Config-driven
✨ Extensible
✨ AI-ready
✨ 4 kural aktif
✨ Yeni output format
✨ KPI seviye sistemi
✨ UI component hazır

Sonraki kurallar için HAZIR! 🚀
```

---

## 📝 KULLANIMSAL NOT

**Config dosyalarını düzenleyerek:**
- ✅ Yeni sektör ekleyebilirsiniz
- ✅ Kural ağırlıklarını değiştirebilirsiniz
- ✅ KPI seviyelerini özelleştirebilirsiniz
- ✅ Hard-code değiştirmeye gerek YOK

**AI entegrasyonu için:**
- ✅ Weight'ler hazır
- ✅ Priority mapping var
- ✅ Scoring system çalışıyor
- ✅ Placeholder fonksiyonlar bekliyor

**Production-ready!** 🎯

