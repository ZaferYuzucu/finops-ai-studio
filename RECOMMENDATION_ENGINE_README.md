# 🎯 FinOps AI Studio - Recommendation Engine (Öneri Motoru)

## 📋 Genel Bakış

Kural bazlı, genişletilebilir, AI-ready dashboard ve KPI öneri motoru.

**Durum:** ✅ İLK 3 KURAL TAMAMLANDI - Sonraki kuraller için hazır

---

## 🏗️ Mimari

```
┌─────────────────────────────────────────────┐
│           USER SURVEY PROFILE               │
│  • sector                                   │
│  • company_size                             │
│  • monthly_revenue_range                    │
│  • primary_goal                             │
│  • financial_maturity                       │
│  • data_source_type                         │
│  • decision_frequency                       │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│        RECOMMENDATION ENGINE                │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-1: Sektör → Sektörel Dashboard│   │
│  │ ✅ AKTIF (Priority: 100)            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-2: Büyüklük → Dashboard Sayısı│   │
│  │ ✅ AKTIF (Priority: 90)             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-3: Hedef → Öncelikli Dashboard│   │
│  │ ✅ AKTIF (Priority: 95)             │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-4: Gelir → Karmaşıklık        │   │
│  │ ⏳ PLACEHOLDER                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-5: Olgunluk → Özellikler      │   │
│  │ ⏳ PLACEHOLDER                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-6: Veri Kaynağı → Entegrasyon │   │
│  │ ⏳ PLACEHOLDER                      │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │ RULE-7: Karar Sıklığı → Refresh    │   │
│  │ ⏳ PLACEHOLDER                      │   │
│  └─────────────────────────────────────┘   │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│        RECOMMENDATION RESULT                │
│  • recommendations[]                        │
│  • defaultDashboardId                       │
│  • appliedRules[]                           │
│  • totalRecommended                         │
└─────────────────────────────────────────────┘
```

---

## ✅ UYGULANAN KURALLAR

### **KURAL-1: SEKTÖR → SEKTÖREL DASHBOARD**

**Priority:** 100 (En yüksek)  
**Durum:** ✅ TAMAMLANDI

#### **Mantık:**
```typescript
IF sector = "Restoran / Cafe"
  → SECTOR_SPECIFIC = "Restaurant Performance Dashboard"
  → KPIs: Food Cost %, Labor Cost %, Daily Revenue

IF sector = "Otel / Turizm"
  → SECTOR_SPECIFIC = "Hospitality Performance Dashboard"
  → KPIs: ADR, RevPAR, Occupancy Rate

IF sector = "Tarım / Tohum / Fide"
  → SECTOR_SPECIFIC = "Agriculture & Production Dashboard"
  → KPIs: Yield per Area, Input Cost, Seasonal Profitability
```

#### **Desteklenen Sektörler:**
- 🍽️ **Restoran / Cafe** → 6 özel KPI
- 🏨 **Otel / Turizm** → 5 özel KPI
- 🌾 **Tarım** → 5 özel KPI
- 🏭 **Üretim / Endüstri** → 5 özel KPI
- 🏥 **Sağlık** → 5 özel KPI
- 🛒 **Perakende** → 5 özel KPI
- 🚗 **Otomotiv** → 5 özel KPI
- 🎓 **Eğitim** → 5 özel KPI
- 💼 **Diğer** → 5 genel KPI

---

### **KURAL-2: ŞİRKET BÜYÜKLÜĞÜ → DASHBOARD SAYISI**

**Priority:** 90  
**Durum:** ✅ TAMAMLANDI

#### **Mantık:**
```typescript
IF company_size = "1-10"
  → show 2 dashboards
  → CEO_OVERVIEW + CASH_FLOW
  → Reason: "Mikro işletmeniz için odaklanmanız gereken 2 temel panel"

IF company_size = "11-50"
  → show 3 dashboards
  → CEO_OVERVIEW + PROFIT_LOSS + CASH_FLOW
  → Reason: "Küçük işletmeniz için dengeli 3 panel seti"

IF company_size = "50+"
  → show 4 dashboards
  → CEO_OVERVIEW + PROFIT_LOSS + CASH_FLOW + OPERATIONAL_KPI
  → Reason: "Orta+ büyüklükte işletmeniz için kapsamlı 4 panel seti"
```

#### **Sonuç:**
- Küçük işletmeler → Basit, odaklanmış paneller
- Orta işletmeler → Daha kapsamlı, detaylı analiz

---

### **KURAL-3: ANA HEDEF → ÖNCELİKLİ DASHBOARD**

**Priority:** 95  
**Durum:** ✅ TAMAMLANDI

#### **Mantık:**
```typescript
IF primary_goal = "Nakit Akışını Görmek"
  → set default dashboard = CASH_FLOW
  → Reason: "Nakit akışınızı anlık takip edin"

IF primary_goal = "Kârlılığı Artırmak"
  → set default dashboard = PROFIT_LOSS
  → Reason: "Kârlılığınızı optimize edin"

IF primary_goal = "Maliyetleri Kontrol Etmek"
  → set default dashboard = COST_CONTROL
  → Reason: "Maliyetlerinizi kontrol altına alın"

IF primary_goal = "Raporlama"
  → set default dashboard = CEO_OVERVIEW
  → Reason: "Genel bakışla başlayın"

IF primary_goal = "Hepsi"
  → set default dashboard = CEO_OVERVIEW
  → Reason: "Tüm metriklere CEO panelinden ulaşın"
```

#### **Sonuç:**
- Kullanıcının ana hedefi ile ilk açılacak dashboard eşleşir
- Kullanıcı deneyimi optimize edilir

---

## ⏳ GELECEK KURALLAR (PLACEHOLDER)

### **KURAL-4: GELİR ARALIĞI → KARMAŞIKLIK**
```typescript
// TODO: Implement when user provides Rule-4
const rule4_RevenueComplexity = (profile, context) => {
  // Aylık gelir → Dashboard karmaşıklık seviyesi
  // 0-50k → Basit paneller
  // 50k-250k → Orta seviye
  // 250k-1m → Gelişmiş paneller
  // 1m+ → Enterprise seviye
  return { matched: false }; // Placeholder
};
```

### **KURAL-5: FİNANSAL OLGUNLUK → ÖZELLİKLER**
```typescript
// TODO: Implement when user provides Rule-5
const rule5_MaturityFeatures = (profile, context) => {
  // Beginner → Basit görselleştirme
  // Intermediate → Karşılaştırmalı analiz
  // Advanced → Tahminleme modelleri
  return { matched: false }; // Placeholder
};
```

### **KURAL-6: VERİ KAYNAĞI → ENTEGRASYON**
```typescript
// TODO: Implement when user provides Rule-6
const rule6_DataSourceIntegration = (profile, context) => {
  // Manual → Manuel import önerisi
  // Excel → Excel connector
  // Accounting → API entegrasyonu
  // ERP → ERP bağlantısı
  return { matched: false }; // Placeholder
};
```

### **KURAL-7: KARAR SIKLIĞI → REFRESH RATE**
```typescript
// TODO: Implement when user provides Rule-7
const rule7_DecisionFrequency = (profile, context) => {
  // Daily → Gerçek zamanlı refresh
  // Weekly → Haftalık otomatik
  // Monthly → Aylık rapor
  // Quarterly → Çeyreklik dashboard
  return { matched: false }; // Placeholder
};
```

---

## 📊 DASHBOARD TİPLERİ

| Type | ID | Name | Icon | KPIs |
|------|-----|------|------|------|
| `CEO_OVERVIEW` | ceo-overview | CEO Genel Bakış | 👔 | 5 |
| `CASH_FLOW` | cash-flow | Nakit Akışı | 💰 | 5 |
| `PROFIT_LOSS` | profit-loss | Kâr-Zarar Analizi | 📈 | 5 |
| `COST_CONTROL` | cost-control | Maliyet Kontrolü | 🎯 | 5 |
| `OPERATIONAL_KPI` | operational-kpi | Operasyonel KPI'lar | ⚙️ | 5 |
| `SECTOR_SPECIFIC` | *dynamic* | Sektörel Dashboard | 🏭 | 5-6 |

---

## 🚀 KULLANIM

### **Temel Kullanım:**

```typescript
import { generateRecommendations } from '@/services/recommendationEngine';

// Kullanıcı anket profili
const userProfile = {
  sector: 'restaurant_cafe',
  company_size: '11-50',
  primary_goal: 'profitability'
};

// Önerileri al
const result = generateRecommendations(userProfile);

console.log('Default Dashboard:', result.defaultDashboardId);
// Output: "profit-loss"

console.log('Total Recommended:', result.totalRecommended);
// Output: 4

console.log('Applied Rules:', result.appliedRules);
// Output: ["RULE-3: PRIMARY_GOAL_DEFAULT", "RULE-2: COMPANY_SIZE_LIMIT", "RULE-1: SECTOR_MATCH"]

result.recommendations.forEach(rec => {
  console.log(`${rec.dashboard.icon} ${rec.dashboard.name} (Score: ${rec.relevanceScore})`);
  console.log(`  Reason: ${rec.matchReason}`);
  console.log(`  Primary: ${rec.isPrimary ? 'YES' : 'NO'}`);
});
```

### **Örnek Çıktı:**

```
🎯 Recommendation Engine Results
📋 Profile: {
  sector: 'restaurant_cafe',
  company_size: '11-50',
  primary_goal: 'profitability'
}
✅ Applied Rules: [
  'RULE-3: PRIMARY_GOAL_DEFAULT',
  'RULE-2: COMPANY_SIZE_LIMIT',
  'RULE-1: SECTOR_MATCH'
]
🎯 Default Dashboard: profit-loss
📊 Total Recommended: 4

📈 Recommendations:
1. 🍽️ Restoran Performans Paneli (Score: 100)
   Reason: Restoran Performans Paneli sektörünüze özel olarak hazırlandı
   Primary: NO
   Rules: RULE-1
   KPIs: Food Cost %, Labor Cost %, Daily Revenue...

2. 👔 CEO Genel Bakış (Score: 90)
   Reason: Küçük işletmeniz için dengeli 3 panel seti
   Primary: NO
   Rules: RULE-2
   KPIs: Toplam Gelir, Net Kâr Marjı, Nakit Pozisyonu...

3. 📈 Kâr-Zarar Analizi (Score: 85)
   Reason: Küçük işletmeniz için dengeli 3 panel seti
   Primary: YES ⭐
   Rules: RULE-2
   KPIs: Brüt Kâr, Net Kâr, EBITDA...

4. 💰 Nakit Akışı (Score: 80)
   Reason: Küçük işletmeniz için dengeli 3 panel seti
   Primary: NO
   Rules: RULE-2
   KPIs: Nakit Giriş, Nakit Çıkış, Net Nakit Akışı...
```

---

## 📁 DOSYA YAPISI

```
finops-ai-studio/
├── src/
│   ├── types/
│   │   └── recommendationEngine.ts       # ✅ Type definitions
│   │
│   ├── data/
│   │   └── dashboardDefinitions.ts       # ✅ Dashboard & sector definitions
│   │
│   ├── services/
│   │   └── recommendationEngine.ts       # ✅ Core engine logic
│   │
│   └── hooks/
│       └── useRecommendations.ts         # 🔜 React hook (opsiyonel)
│
└── RECOMMENDATION_ENGINE_README.md       # ✅ Bu dosya
```

---

## 🔧 GENİŞLETME

### **Yeni Kural Ekleme:**

```typescript
// 1. Kural fonksiyonu yaz
const ruleX_MyNewRule = (
  profile: UserSurveyProfile,
  context: RecommendationContext
): RuleResult => {
  if (!profile.someField) {
    return { matched: false };
  }

  // Kural mantığı
  const dashboards = [...];
  
  return {
    matched: true,
    dashboards,
    score: 85,
    reason: 'Açıklama'
  };
};

// 2. Ana motora ekle
export const generateRecommendations = (profile) => {
  // ...
  const ruleXResult = ruleX_MyNewRule(profile, context);
  if (ruleXResult.matched) {
    // Sonucu işle
  }
  // ...
};
```

---

## 🧪 TEST

### **Test Senaryoları:**

#### **Senaryo 1: Mikro Restoran (Nakit Akışı Odaklı)**
```typescript
Input:
{
  sector: 'restaurant_cafe',
  company_size: '1-10',
  primary_goal: 'cash_flow'
}

Expected Output:
- Default: cash-flow ✓
- Total: 3 dashboards
- Rules: RULE-3, RULE-2, RULE-1
- Dashboards: Restoran Panel, CEO Overview, Cash Flow
```

#### **Senaryo 2: Orta Üretim (Maliyet Kontrolü)**
```typescript
Input:
{
  sector: 'manufacturing',
  company_size: '50+',
  primary_goal: 'cost_control'
}

Expected Output:
- Default: cost-control ✓
- Total: 5 dashboards
- Rules: RULE-3, RULE-2, RULE-1
- Dashboards: Üretim Panel, CEO, Profit/Loss, Cash Flow, Operational KPI
```

---

## 🎯 ROADMAP

### **Phase 1: Temel Kurallar** ✅ TAMAMLANDI
- [x] RULE-1: Sektör → Dashboard
- [x] RULE-2: Büyüklük → Sayı
- [x] RULE-3: Hedef → Öncelik

### **Phase 2: Gelişmiş Kurallar** ⏳ BEKLİYOR
- [ ] RULE-4: Gelir → Karmaşıklık
- [ ] RULE-5: Olgunluk → Özellikler
- [ ] RULE-6: Veri Kaynağı → Entegrasyon
- [ ] RULE-7: Karar Sıklığı → Refresh

### **Phase 3: AI Enhancement** 🔮 GELECEK
- [ ] Machine learning-based scoring
- [ ] User behavior tracking
- [ ] A/B testing framework
- [ ] Collaborative filtering

---

## 📞 Durum Raporu

**Tarih:** Ocak 2026  
**Geliştirici:** Claude (Anthropic AI)  
**Versiyon:** 1.0.0  

**✅ TAMAMLANAN:**
- Type definitions
- Dashboard definitions (9 sektör)
- Rule engine service
- İlk 3 kural (RULE-1, RULE-2, RULE-3)
- Debug utilities
- Documentation

**⏳ BEKLİYOR:**
- Kalan 4 kural (RULE-4 to RULE-7)
- React hook entegrasyonu
- Frontend UI components
- Backend persistence

---

## 🎉 SONRAKİ ADIM

**HAZIR!** Sistem ilk 3 kural ile çalışıyor.

Sonraki kuralları (RULE-4 to RULE-7) istediğiniz zaman ekleyebilirsiniz:

```
1. Kural mantığını anlatın
2. Fonksiyon placeholder'ını dolduralım
3. Ana motora entegre edelim
4. Test edelim
```

**Sistemin genişlemesi çok kolay! 🚀**





