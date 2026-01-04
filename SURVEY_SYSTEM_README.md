# 📊 FinOps AI Studio - Akıllı Kullanıcı Anket Sistemi

## 🎯 Genel Bakış

FinOps AI Studio için çok aşamalı, kullanıcı dostu anket sistemi. Kullanıcıları yormadan, değer gördükten sonra derinleşen, ürün içgörüsü ve pazarlama verisi üreten akıllı bir sistem.

---

## 🏗️ Sistem Mimarisi

### **3 Aşamalı Akış**

```
1️⃣ SAFHA 1: Mini Anket (30 sn) 
   └─ Kayıt sonrası, dashboard'a gitmeden önce
   └─ 3 temel soru: Sektör, İşletme büyüklüğü, Ana zorluk
   └─ ATLANABİLİR

2️⃣ SAFHA 2: Derin Anket (2 dk)
   └─ İlk dashboard görüntülendikten sonra
   └─ Sektöre özgü 8-10 dinamik soru
   └─ İSTEĞE BAĞLI

3️⃣ SAFHA 3: Alternatif Akış
   └─ Anket atlayanlar için
   └─ Genel demo dashboards
   └─ Hazır sektörel paneller
```

---

## 📁 Dosya Yapısı

```
finops-ai-studio/
├── src/
│   ├── types/
│   │   └── survey.ts                    # TypeScript type definitions
│   │
│   ├── data/
│   │   └── surveys/
│   │       ├── miniSurvey.json          # Mini anket soruları (3 soru)
│   │       └── deepSurvey.json          # Derin anket soruları (sektörel)
│   │
│   ├── components/
│   │   └── surveys/
│   │       ├── MiniSurveyModal.tsx      # Safha 1 Modal Component
│   │       └── DeepSurveyPanel.tsx      # Safha 2 Panel Component
│   │
│   ├── services/
│   │   ├── surveyService.ts             # Survey state & localStorage
│   │   └── dashboardRecommendationService.ts  # Öneri motoru
│   │
│   ├── hooks/
│   │   └── useSurvey.ts                 # React hook for survey state
│   │
│   └── pages/
│       ├── SignUpPage.tsx               # Mini anket entegrasyonu
│       └── ProfessionalDashboardsPage.tsx  # Derin anket trigger
│
└── public/
    └── locales/
        ├── tr/translation.json          # Türkçe çeviriler
        └── en/translation.json          # İngilizce çeviriler
```

---

## 🚀 Kullanım

### **1. Mini Anket (Safha 1)**

```tsx
import MiniSurveyModal from '@/components/surveys/MiniSurveyModal';
import { useSurvey } from '@/hooks/useSurvey';

function SignUpPage() {
  const { completeMiniSurvey, skipMiniSurvey } = useSurvey();
  
  const handleSurveyComplete = (data) => {
    completeMiniSurvey(data);
    navigate('/dashboard');
  };

  const handleSurveySkip = () => {
    skipMiniSurvey();
    navigate('/dashboard');
  };

  return (
    <MiniSurveyModal
      isOpen={showSurvey}
      onComplete={handleSurveyComplete}
      onSkip={handleSurveySkip}
    />
  );
}
```

### **2. Derin Anket (Safha 2)**

```tsx
import DeepSurveyPanel from '@/components/surveys/DeepSurveyPanel';
import { useSurvey } from '@/hooks/useSurvey';

function DashboardPage() {
  const { profile, completeDeepSurvey, dismissDeepSurvey } = useSurvey();
  
  return (
    <DeepSurveyPanel
      isVisible={showDeepSurvey}
      sector={profile.sector || 'other'}
      onComplete={completeDeepSurvey}
      onDismiss={dismissDeepSurvey}
    />
  );
}
```

### **3. Dashboard Tracking**

```tsx
import { useSurvey } from '@/hooks/useSurvey';

function SomeDashboardPage() {
  const { trackDashboardView, shouldShowDeepSurvey } = useSurvey();
  
  useEffect(() => {
    // Track dashboard view
    trackDashboardView();
    
    // Check if deep survey should be shown
    if (shouldShowDeepSurvey()) {
      setShowDeepSurvey(true);
    }
  }, []);
}
```

### **4. Dashboard Önerileri**

```tsx
import { getRecommendedDashboards, getPersonalizedWelcomeMessage } from '@/services/dashboardRecommendationService';
import { getSurveyProfile } from '@/services/surveyService';

function DashboardListPage() {
  const profile = getSurveyProfile();
  const recommendations = getRecommendedDashboards(profile);
  const welcomeMessage = getPersonalizedWelcomeMessage(profile);
  
  return (
    <div>
      <h1>{welcomeMessage}</h1>
      <h2>Önerilen Paneller:</h2>
      {recommendations.map(rec => (
        <DashboardCard 
          key={rec.id} 
          id={rec.id} 
          reason={rec.reason}
          relevanceScore={rec.relevanceScore}
        />
      ))}
    </div>
  );
}
```

---

## 💾 Veri Saklama

### **localStorage Keys**

- `finops_survey_profile`: Kullanıcı anket profili
- `finops_survey_analytics`: Anket analytics events

### **Survey Profile Schema**

```typescript
{
  miniSurveyCompleted: boolean;
  miniSurveyCompletedAt?: string;
  miniSurveySkipped?: boolean;
  
  deepSurveyCompleted: boolean;
  deepSurveyCompletedAt?: string;
  deepSurveySkipped?: boolean;
  deepSurveyOfferedAt?: string;
  
  sector?: SectorType;           // 'restaurant_cafe', 'hotel_tourism', etc.
  companySize?: CompanySizeType; // 'micro', 'small', 'medium'
  mainChallenge?: MainChallengeType; // 'cash_flow', 'profitability', etc.
  
  dashboardsViewed: number;
  recommendedDashboards?: string[];
}
```

---

## 🎨 Sektörler ve Kategoriler

### **Desteklenen Sektörler**

| Kod | Türkçe | İngilizce |
|-----|--------|-----------|
| `hotel_tourism` | Otel / Turizm | Hotel / Tourism |
| `restaurant_cafe` | Restoran / Cafe | Restaurant / Cafe |
| `automotive` | Otomotiv | Automotive |
| `agriculture` | Tarım / Tohum / Fide | Agriculture |
| `manufacturing` | Üretim / Endüstri | Manufacturing |
| `healthcare` | Sağlık | Healthcare |
| `retail` | Perakende | Retail |
| `education` | Eğitim / Akademik | Education |
| `other` | Diğer | Other |

---

## 🧪 Test Senaryoları

### **Senaryo 1: Yeni Kullanıcı - Tam Akış**
1. ✅ Kullanıcı kayıt olur
2. ✅ Mini anket gösterilir
3. ✅ 3 soruyu yanıtlar
4. ✅ Dashboard'a yönlendirilir
5. ✅ Bir dashboard görüntüler
6. ✅ 3 saniye sonra derin anket banner gösterilir
7. ✅ Derin anketi tamamlar
8. ✅ Özel dashboard önerileri gösterilir

### **Senaryo 2: Anket Atlama**
1. ✅ Kullanıcı kayıt olur
2. ✅ Mini anketi "Atla" ile geçer
3. ✅ Genel demo dashboards gösterilir
4. ✅ Derin anket gösterilmez (zaten atladığı için)

### **Senaryo 3: Google ile Kayıt**
1. ✅ Google ile giriş yapar
2. ✅ Mini anket gösterilir
3. ✅ Aynı akış devam eder

---

## 📊 Analytics & Tracking

### **Tracked Events**

```typescript
- survey_started      // Anket başlatıldı
- survey_completed    // Anket tamamlandı
- survey_skipped      // Anket atlandı
- question_answered   // Soru yanıtlandı
```

### **Analytics Verilerini Görüntüleme**

```typescript
import { getSurveyAnalytics } from '@/services/surveyService';

const analytics = getSurveyAnalytics();
console.log('Survey Analytics:', analytics);
```

---

## 🔧 Yönetim Fonksiyonları

### **Survey Verilerini Temizleme (Test için)**

```typescript
import { clearSurveyData } from '@/services/surveyService';

// Tüm survey verilerini temizle
clearSurveyData();
```

### **Survey Profilini Okuma**

```typescript
import { getSurveyProfile } from '@/services/surveyService';

const profile = getSurveyProfile();
console.log('User Profile:', profile);
```

---

## 🎯 UX & Ürün Prensipleri

### ✅ **YAPILAN**
- Hiçbir anket zorunlu değil
- Kullanıcıya neden sorulduğu her zaman açıklanır
- Süre göstergeleri var (30 sn, 2 dk)
- Animasyonlu, modern UI
- Mobil uyumlu
- TR/EN dil desteği

### ❌ **YAPILMAYAN**
- Finansal rakam sorulmaz (ciro, bütçe vb.)
- Hassas veri toplanmaz
- Zorla anket yaptırılmaz
- Kullanıcı deneyimi bozulmaz

---

## 🚢 Deployment Notları

### **Production Checklist**
- ✅ localStorage kullanıldığı için backend değişikliği YOK
- ✅ TypeScript types hazır
- ✅ Linter errors yok
- ✅ i18n translations hazır
- ✅ Component'ler test edildi
- ✅ Analytics tracking aktif

### **İleride Eklenebilecekler**
- [ ] Backend'e survey sonuçlarını kaydetme
- [ ] Admin panelinde survey analytics gösterme
- [ ] A/B testing farklı anket versiyonları
- [ ] Daha fazla sektör için özel derin anket soruları
- [ ] AI-powered dashboard önerilerini geliştirme
- [ ] Email follow-up için survey verilerini kullanma

---

## 📞 Destek

Anket sistemi ile ilgili sorular için:
- 📧 Geliştirici: Claude (Anthropic AI)
- 📅 Tarih: Ocak 2026
- 🔖 Versiyon: 1.0.0

---

## 🎉 Özet

**3-aşamalı akıllı anket sistemi başarıyla tamamlandı!**

- ✅ 10/10 TODO tamamlandı
- ✅ Kullanıcı dostu UX
- ✅ Atlanabilir, zorlayıcı değil
- ✅ Dashboard öneri motoru entegre
- ✅ Analytics tracking aktif
- ✅ Production-ready

**Kullanıcının hissetmesi gereken duygu:**
> "Bu platform beni tanıyor, bana göre konuşuyor."

✨ **Hedef gerçekleştirildi!**

