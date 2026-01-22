# 🐕 Fino Köpeği - Konuşma Motoru

## 📋 Genel Bakış

Fino, FinOps AI Studio'nun yapay zeka destekli finans danışmanıdır. Kullanıcının onboarding anket cevaplarını kullanarak kişiselleştirilmiş, sıcak ve güven verici açıklamalar yapar.

**Durum:** ✅ 4 AŞAMA TAMAMLANDI + SEKTÖREL TAVSİYELER + YASAK KELİME KONTROLÜ

---

## 🎯 Fino'nun Görevi

### **Ana Hedefler:**
- ✅ Dashboard önerilerini açıklamak
- ✅ Kullanıcının sektörü ve seviyesine göre konuşmak
- ✅ Güven veren bir danışman gibi davranmak
- ✅ Karmaşıklığı azaltmak

### **Kullandığı Veriler:**
```typescript
{
  sector: 'restaurant_cafe',
  company_size: '11-50',
  primary_goal: 'profitability',
  financial_maturity: 'intermediate',
  recommended_dashboards: [...],
  default_dashboard: 'profit-loss',
  kpi_level: 'STANDARD'
}
```

---

## 🗣️ KONUŞMA STRATEJİSİ (4 AŞAMA) ✅ GÜNCELLENDİ

### **AŞAMA-1: KULLANICIYI TANIDIĞINI GÖSTER** ✅

**Amaç:** Kullanıcının Fino'nun kendisini anladığını hissetmesi

**Template:**
```
"{Sektör} işletmesi yönettiğini ve özellikle {Hedef} istediğini anladım."
```

**Örnek Çıktılar:**

```
Restoran/Cafe işletmesi yönettiğini ve özellikle nakit akışını 
daha net görmek istediğini anladım.
```

```
Otel/Turizm işletmesi yönettiğini ve özellikle kârlılığı artırmak 
istediğini anladım.
```

```
Üretim/Endüstri işletmesi yönettiğini ve özellikle maliyetleri 
kontrol etmek istediğini anladım.
```

---

### **AŞAMA-2: NEDEN BU DASHBOARD'LAR?** ✅

**Amaç:** Öneri mantığını açıklamak (ama teknik değil!)

**Template:**
```
"Bu yüzden sana önce {Dashboard1} ve {Dashboard2} panellerini önerdim."
```

**KURALLAR:**
- ✅ **YAP:** "Senin ihtiyacına göre"
- ❌ **YAPMA:** "Algoritmamız böyle dedi"

**Örnek Çıktılar:**

```
Bu yüzden sana önce Nakit Akışı ve CEO Genel Bakış panellerini önerdim.
```

```
Bu yüzden sana önce Restoran Performans Paneli ve Kâr-Zarar Analizi 
panellerini önerdim.
```

---

### **AŞAMA-3: KARMAŞIKLIĞI AZALT** ✅

**Amaç:** KPI seviyesini açıklamak ve gelecek imkanları göstermek

**Template:**
```
"{Olgunluk Seviyesi} olduğun için {KPI Açıklaması}. {Gelecek İmkan}"
```

**Örnek Çıktılar:**

#### **BASIC Seviye (Başlangıç):**
```
Başlangıç seviyesinde olduğun için sadece temel göstergelerle başladık. 
Zamanla daha detaylı analizler ekleyebilirsin.
```

#### **STANDARD Seviye (Orta):**
```
Orta seviyede olduğun için hem temel hem de detaylı göstergelerle başladık. 
İstersen benchmark ve tahminleme özelliklerini de aktif edebiliriz.
```

#### **ADVANCED Seviye (İleri):**
```
İleri seviyede olduğun için tüm gelişmiş özellikleri aktif ettik. 
Sektör karşılaştırmaları, AI tahminleme ve akıllı uyarılar senin için çalışıyor.
```

---

### **AŞAMA-4: MİNİ YOL HARİTASI VER** ✅ YENİ

**Amaç:** Kullanıcıya net bir ilk adım göstermek

**Template:**
```
"Önerim:
– Önce {Dashboard} bir göz at
– {Kontrol Sıklığı} kontrol et
– Sonra istersen detaylara birlikte geçeriz

💡 {Sektörel Tavsiye}"
```

**Sektöre Özel Tavsiyeler:**

| Sektör | Tavsiye |
|--------|---------|
| 🍽️ **Restoran/Cafe** | "Gün sonunda kasaya ne giriyor, ne çıkıyor onu net görmek önemli." |
| 🏨 **Otel/Turizm** | "Otelcilikte doluluk kadar bir odadan ne kazandığın da önemlidir." |
| 🌾 **Tarım** | "Girdi maliyetleri sezona göre değiştiği için bunu ayrı ayrı izlemek gerekir." |
| 🏭 **Üretim** | "Üretim maliyetlerini parça parça görmek, tasarruf noktalarını bulmayı kolaylaştırır." |
| 🏥 **Sağlık** | "Hasta başına maliyet ve gelir dengesini görmek, planlamayı kolaylaştırır." |
| 🛒 **Perakende** | "Hangi ürünler daha çok satıyor, hangilerinde stok fazla, bunları takip et." |
| 🚗 **Otomotiv** | "Araç satışı yanında servis geliri de önemli, ikisini birlikte izle." |
| 🎓 **Eğitim** | "Öğrenci başına maliyet ve gelir dengesini görmek önemli." |

**Kontrol Sıklığı (Şirket Büyüklüğüne Göre):**
- **1-10 kişi** → Haftada bir
- **11-50 kişi** → Haftada iki kez
- **50+ kişi** → Her gün

**Örnek Çıktı:**
```
Önerim:
– Önce Nakit Akışı paneline bir göz at
– Haftada bir kontrol et
– Sonra istersen detaylara birlikte geçeriz

💡 Gün sonunda kasaya ne giriyor, ne çıkıyor onu net görmek önemli.
```

---

## ⚠️ YASAK KELİMELER VE KURAL KORUMASI ✅ YENİ

### **Fino'nun ASLA Kullanmayacağı Kelimeler:**

| ❌ Yasak | ✅ Yerine Kullan |
|---------|-----------------|
| AI | yapay zeka |
| algoritma | hesaplama |
| model | sistem |
| optimize | iyileştir |
| benchmark | karşılaştırma |
| prediction | tahmin |
| müşteri | sen |
| kullanıcı | sen |
| işletmeniz | işletmen |

### **Fino'nun Kullanması Gereken Samimi Kelimeler:**

✅ bakalım  
✅ istersen  
✅ şöyle düşünebiliriz  
✅ bir göz at  
✅ beraber bakalım  
✅ kontrol edelim  
✅ ne dersin  
✅ seninle  
✅ birlikte  

### **Otomatik Kontrol:**

```typescript
// Yasaklı kelime kontrolü otomatik çalışır
const sanitizedMessage = sanitizeForbiddenWords(finoMessage);

// Development modunda console'da uyarı verir
⚠️ Fino: Yasaklı kelime "algoritma" bulundu ve "hesaplama" ile değiştirildi.
```

---

## 💬 TAM ÖRNEK KONUŞMA

### **Senaryo 1: Başlangıç Seviyesi Restoran**

**Input:**
```typescript
{
  sector: 'restaurant_cafe',
  company_size: '1-10',
  primary_goal: 'cash_flow',
  financial_maturity: 'beginner'
}
```

**Fino'nun Mesajı:**
```
Merhaba, ben Fino 🐕

Yanıtlarına baktım.
Restoran/Cafe işletmesi yönettiğini ve özellikle nakit akışını 
daha net görmek istediğini anladım.

Bu yüzden sana önce:
– Nakit Akışı
– CEO Genel Bakış
panellerini hazırladık.

Şimdilik sadece temel rakamları gösteriyoruz.
Amacımız seni yormadan resmi görmek.

Önerim:
– Önce Nakit Akışı paneline bir göz at
– Haftada bir kontrol et
– Sonra istersen detaylara birlikte geçeriz

💡 Gün sonunda kasaya ne giriyor, ne çıkıyor onu net görmek önemli.
```

---

### **Senaryo 2: İleri Seviye Üretim**

**Input:**
```typescript
{
  sector: 'manufacturing',
  company_size: '50+',
  primary_goal: 'cost_control',
  financial_maturity: 'advanced'
}
```

**Fino'nun Mesajı:**
```
Merhaba, ben Fino 🐕

Yanıtlarına baktım.
Üretim/Endüstri işletmesi yönettiğini ve özellikle maliyetleri 
kontrol etmek istediğini anladım.

Bu yüzden sana önce:
– Maliyet Kontrolü
– Üretim Verimlilik Paneli
panellerini hazırladık.

Tüm detaylı göstergeleri açtık.
Sektördeki yerini görebilir, gelecek tahmini yapabilirsin.

Önerim:
– Önce Maliyet Kontrolü paneline bir göz at
– Her gün kontrol et
– Sonra istersen detaylara birlikte geçeriz

💡 Üretim maliyetlerini parça parça görmek, tasarruf noktalarını bulmayı kolaylaştırır.
```

---

## 🚀 KULLANIM

### **1. Temel Kullanım:**

```typescript
import { generateFinoMessage } from '@/services/finoConversationEngine';
import { generateRecommendations } from '@/services/recommendationEngine';

// 1. Öneri al
const recommendations = generateRecommendations(userProfile);

// 2. Fino mesajı oluştur
const finoMessage = generateFinoMessage(recommendations);

console.log(finoMessage);
```

### **2. React Component ile:**

```tsx
import FinoMessage from '@/components/fino/FinoMessage';

function OnboardingCompletePage() {
  const recommendations = generateRecommendations(userProfile);
  
  return (
    <div>
      <FinoMessage 
        recommendationResult={recommendations}
        variant="full"  // veya "compact"
      />
    </div>
  );
}
```

---

## 🎨 TON & STİL KURALLARI

### **✅ YAP:**
- Sıcak ve samimi ol
- "Sen" dili kullan (sen, sana, senin)
- Emojiler kullan (ama fazla kaçırma)
- Basit, günlük dil kullan
- "Senin ihtiyacına göre" de
- Kullanıcıyı tanıdığını göster
- Teşvik edici ol
- Açıklayıcı ol

### **❌ YAPMA:**
- Teknik jargon kullanma
- "Algoritma", "sistem", "model" deme
- Resmi/kurumsal dil kullanma
- Çok uzun paragraflar yazma
- Belirsiz ifadeler kullanma
- Negatif dil kullanma

### **Emoji Kullanım Rehberi:**
| Kategori | Emojiler |
|----------|----------|
| **Finansal Başarı** | 💰 📈 💎 ⭐ |
| **Teşvik** | 💪 🚀 🎯 ✨ |
| **Sektörler** | 🍽️ 🏨 🏭 🌾 🛒 |
| **Anlayış** | 👍 😊 🙌 |
| **Kutlama** | 🎉 🎊 ✅ 🏆 |

---

## 📊 EK MESAJ TİPLERİ

### **Dashboard Welcome Mesajı:**

```typescript
import { generateDashboardWelcome } from '@/services/finoConversationEngine';

const message = generateDashboardWelcome('Nakit Akışı', context);
// Output: "Harika! Nakit Akışı paneline hoş geldin. 
//          Burada en önemli metriklerini görebilirsin. 📊"
```

### **KPI Açıklama:**

```typescript
import { explainKPI } from '@/services/finoConversationEngine';

const explanation = explainKPI('Food Cost %', 'restaurant_cafe');
// Output: "Gıda maliyetinin cironuza oranı. 
//          İdeal oran %28-35 arası. 🍽️"
```

### **Teşvik Mesajları:**

```typescript
import { generateEncouragement } from '@/services/finoConversationEngine';

const encouragement = generateEncouragement(context);
// Output: "İşler iyi gidiyor! Metriklerine düzenli bak, 
//          daha da iyileşecek. 💪"
```

---

## 🔮 GELECEK AŞAMALAR (BEKLİYOR)

### **AŞAMA-5: ?** ⏳
```
Kullanıcı devam komutlarını gönderecek...
```

---

## 📁 DOSYA YAPISI

```
finops-ai-studio/
├── src/
│   ├── services/
│   │   └── finoConversationEngine.ts    # ✅ Ana conversation logic
│   │
│   └── components/
│       └── fino/
│           └── FinoMessage.tsx           # ✅ React component
│
└── FINO_CONVERSATION_ENGINE_README.md   # ✅ Bu dosya
```

---

## 🧪 TEST ÖRNEKLERİ

### **Test 1: Tüm Sektörler:**

```typescript
const sectors: SectorType[] = [
  'restaurant_cafe',
  'hotel_tourism',
  'manufacturing',
  'agriculture',
  'healthcare',
  'retail',
  'automotive',
  'education'
];

sectors.forEach(sector => {
  const profile = { sector, company_size: '11-50', primary_goal: 'profitability' };
  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);
  
  console.log(`\n=== ${sector} ===`);
  console.log(message);
});
```

### **Test 2: Tüm KPI Seviyeleri:**

```typescript
const maturities: FinancialMaturityType[] = ['beginner', 'intermediate', 'advanced'];

maturities.forEach(maturity => {
  const profile = { 
    sector: 'restaurant_cafe',
    financial_maturity: maturity 
  };
  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);
  
  console.log(`\n=== ${maturity} ===`);
  console.log(message);
});
```

---

## 📞 DURUM

**Tarih:** Ocak 2026  
**Geliştirici:** Claude (Anthropic AI)  
**Versiyon:** 2.0 (4 Aşama + Sektörel Tavsiyeler + Yasak Kelime Kontrolü)

**✅ TAMAMLANAN:**
- [x] Fino Conversation Engine (4 aşama) ✅ GÜNCELLENDİ
- [x] AŞAMA-4: Mini Yol Haritası ✅ YENİ
- [x] Sektöre Özel Tavsiyeler (9 sektör) ✅ YENİ
- [x] Yasak Kelime Kontrolü ✅ YENİ
- [x] Samimi Kelime Havuzu ✅ YENİ
- [x] Template system (JSON friendly)
- [x] React component (FinoMessage)
- [x] Ton & stil kuralları
- [x] Ek mesaj tipleri (welcome, KPI explain, encouragement)
- [x] Test framework
- [x] Documentation (v2.0)

**⏳ BEKLİYOR:**
- [ ] AŞAMA-5: (Kullanıcı gönderecek)
- [ ] Diğer aşamalar...

---

## 🎉 ÖZET

```
✅ 4 AŞAMA TAMAMLANDI!

🐕 Fino Köpeği Hazır (v2.0)
💬 Kişiselleştirilmiş Konuşma
🎯 Sektöre Özgü Tavsiyeler (9 sektör)
🗺️ Mini Yol Haritası (Adım adım rehberlik)
🚫 Yasak Kelime Kontrolü (Teknik terim yok!)
✅ Samimi Dil Garantisi
📊 KPI Seviyesine Göre Açıklama
🔧 Extensible Architecture
📦 JSON Template Support

Devam aşamaları için HAZIR! 🚀
```

---

**Sonraki komutları bekliyorum! 🐕**

