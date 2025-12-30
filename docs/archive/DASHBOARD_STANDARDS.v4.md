# 📊 FINOPS Dashboard Tasarım Standartları

> **Son Güncelleme:** 29 Aralık 2025  
> **Durum:** ✅ Onaylandı ve Aktif

---

## 🎯 1. BOYUT STANDARTLARI (ZORUNLU)

### Container Boyutları
```tsx
<div 
  className="bg-gray-50 p-6 mx-auto"
  style={{
    width: '98%',           // Ekranın %98'i - her iki tarafta 1% boşluk
    maxWidth: '1800px',     // Maksimum genişlik
    minHeight: 'auto',      // Dinamik yükseklik
    fontFamily: 'Inter, system-ui, sans-serif',
    transformOrigin: 'top center'
  }}
>
```

### Wrapper Container
```tsx
<div className="w-full h-full overflow-auto bg-gray-100 p-4">
  {/* Dashboard içeriği */}
</div>
```

**✅ UYGULANMIŞ DASHBOARD'LAR:**
- RestaurantDashboard.tsx ✅
- ManufacturingDashboard.tsx ✅
- FinanceDashboard.tsx ✅

---

## 📈 2. CHART SEÇİM KURALLARI

### Chart Türü - Veri İlişkisi

| Veri Türü | Chart Türü | Örnek Kullanım |
|-----------|-----------|----------------|
| **Zaman Serisi** | LineChart | Günlük ciro, trend analizi, performans takibi |
| **Kategori Karşılaştırma** | BarChart | Ürün satışları, departman performansı, top N |
| **Yoğunluk/Saat** | BarChart (renkli) | Saatlik sipariş yoğunluğu, trafik analizi |
| **Parça/Bütün (4-6 dilim)** | DonutChart | Pazar payı, kategori dağılımı |
| **Parça/Bütün (7+ dilim)** | Horizontal BarChart | Çok kategorili dağılımlar |
| **Hedef Karşılaştırma** | Line + Dashed Line | Gerçekleşen vs Hedef |

### Chart Özellikleri (ZORUNLU)

```tsx
// ✅ STANDART CHART YAPISI
<ResponsiveContainer width="100%" height={280}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
    <XAxis 
      dataKey="date" 
      tick={{ fontSize: 11 }} 
      // Eğer uzun etiketler varsa:
      // angle={-45} textAnchor="end" height={60}
    />
    <YAxis 
      tick={{ fontSize: 11 }}
      // Birim ekle:
      label={{ value: 'Tutar (₺)', angle: -90, position: 'insideLeft' }}
    />
    <Tooltip />
    <Legend wrapperStyle={{ fontSize: '11px' }} />
    <Line 
      type="monotone" 
      dataKey="revenue" 
      stroke="#10B981" 
      strokeWidth={3} 
      name="Ciro (₺)" 
    />
  </LineChart>
</ResponsiveContainer>
```

**KRİTİK NOKTALAR:**
- ✅ `fontSize: 11` (eksen etiketleri)
- ✅ `CartesianGrid` renk: `#E5E7EB` (açık gri)
- ✅ `Legend` font: `11px`
- ✅ Her veri serisinde **birim belirt** (₺, %, adet, gün)
- ✅ Tooltip her zaman aktif
- ✅ ResponsiveContainer `width="100%"` (responsive)

---

## 🎨 3. KPI KART STANDARTLARI

### KPI Card Grid
```tsx
<div className="grid grid-cols-6 gap-4 mb-4">
  <KpiCard
    title="Günlük Ciro (MTD)"     // Kısa, açıklayıcı başlık
    value="₺458K"                  // Ana metrik (birimle)
    change={12.5}                  // % değişim
    previousValue="₺407K"          // Önceki dönem
    icon={<DollarSign size={20} />} // Lucide icon
    color="#10B981"                // Marka rengi
  />
</div>
```

**RENK PALETİ:**
```tsx
const COLORS = [
  '#10B981', // Yeşil (başarı)
  '#3B82F6', // Mavi (bilgi)
  '#8B5CF6', // Mor (özel)
  '#F59E0B', // Turuncu (uyarı)
  '#EF4444', // Kırmızı (tehlike)
  '#06B6D4', // Cyan (nötr)
  '#EC4899'  // Pembe (vurgu)
];
```

---

## 📊 4. GRID DÜZENİ

### 3 Kolonlu Chart Grid (Üst Sıra)
```tsx
<div className="grid grid-cols-3 gap-4 mb-4">
  {/* 3 chart yan yana */}
</div>
```

### 2 Kolonlu Chart Grid (Alt Sıra)
```tsx
<div className="grid grid-cols-2 gap-4">
  {/* 2 büyük chart */}
</div>
```

**✅ BOŞLUKLAR:**
- KPI kartları arası: `gap-4` (16px)
- Chart'lar arası: `gap-4` (16px)
- Section arası: `mb-4` (16px)

---

## 📝 5. TYPOGRAFI

```tsx
// Dashboard Başlığı
<h1 className="text-2xl font-black text-gray-900">
  Restoran Operasyon Paneli
</h1>

// Alt başlık / Tarih
<p className="text-sm text-gray-600">
  Son Güncelleme: 29 Aralık 2025 | MTD (Ay Başından Bu Yana)
</p>

// Chart başlığı
<h3 className="text-sm font-bold text-gray-900 mb-3">
  Günlük Ciro Trendi
</h3>

// Footer
<p className="text-xs text-gray-500">
  Veri Kaynağı: POS Sistemi | © 2025 FINOPS AI Studio
</p>
```

---

## 📦 6. CSV VERİ ZENGİNLİĞİ

### Minimum Kolon Sayısı: **8-15 kolon**

### Zorunlu Veri Boyutları:
- ✅ **Zaman:** `date`, `month`, `year`, `quarter`
- ✅ **Kategorik:** `product`, `department`, `channel`, `region`
- ✅ **Numerik:** `revenue`, `cost`, `quantity`, `profit`, `margin`

### CSV Veri Kalitesi = Chart Kalitesi

**KÖTÜ VERİ:**
```csv
date,revenue
2025-01-01,1000
2025-01-02,1200
```

**İYİ VERİ:**
```csv
date,revenue,cost,orders,avg_basket,food_cost_pct,labor_cost_pct,customer_sat
2025-01-01,45000,28000,125,360,31.2,28.5,4.7
2025-01-02,52000,32000,145,358,30.8,27.9,4.8
```

**SONUÇ:** 
- Zengin CSV → Çoklu KPI → Daha anlamlı chart'lar!
- 3-4 kolonlu basit veri → Sınırlı analiz

---

## 🎯 7. SEKTÖRE ÖZEL CHART SEÇİMLERİ

### 🍽️ Restoran
- **Zaman serisi:** Günlük ciro, masa devir hızı
- **Yoğunluk:** Saatlik sipariş (renkli bar)
- **Top N:** Ürün satış katkısı (horizontal bar)
- **Gider:** Stacked bar veya waterfall

### 🏭 Üretim
- **Trend:** OEE, üretim adedi (line)
- **Pareto:** Duruş nedenleri (bar + line)
- **Karşılaştırma:** Hat performansı (stacked bar)
- **Varyans:** Birim maliyet (waterfall)

### 💰 Finans
- **Cash flow:** Nakit akışı (line)
- **Aging:** AR/AP (stacked bar)
- **Budget:** Gerçekleşen vs Plan (clustered bar)
- **Varyans:** Budget variance (bar + labels)

---

## ✅ 8. KALITE KONTROL CHECKLİST

**Her Dashboard Yayınlamadan Önce:**

- [ ] Width: 98%, maxWidth: 1800px
- [ ] KPI kartları 6'lı grid, hizalı
- [ ] Chart'larda X/Y eksen etiketleri + birim
- [ ] Tooltip ve Legend aktif
- [ ] fontSize: 11 (eksenler)
- [ ] CartesianGrid renk: #E5E7EB
- [ ] Responsive: width="100%"
- [ ] Footer bilgisi var
- [ ] CSV verisi 8+ kolon
- [ ] Zaman boyutu mevcut
- [ ] Renk paleti COLORS dizisinden

---

## 🚀 9. KULLANIM

Yeni dashboard oluştururken:

```tsx
import { LineChart, ... } from 'recharts';
import KpiCard from './KpiCard';

const MyNewDashboard: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100 p-4">
      <div 
        className="bg-gray-50 p-6 mx-auto"
        style={{
          width: '98%',
          maxWidth: '1800px',
          minHeight: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif',
          transformOrigin: 'top center'
        }}
      >
        {/* Dashboard içeriği */}
      </div>
    </div>
  );
};
```

---

## 📚 10. MEVCUT CSV DOSYALARI

**Zengin Veri Setleri:**

### Restoran
- `restoran/genel-kontrol.csv` ✅
- `restoran/restoran-operasyon.csv` ✅
- `restoran/satis-gosterge.csv` ✅

### Finans
- `finans/cfo-kontrol-paneli.csv` ✅
- `finans/nakit-akisi.csv` ✅
- `finans/kar-zarar-tablosu.csv` ✅

### Otel
- `otel/otel-yonetim.csv` ✅
- `otel/otel-doluluk-gelir.csv` ✅

### Operasyon
- `operasyon/uretim-kontrol.csv` ✅
- `operasyon/kalite-kontrol.csv` ✅

**Toplam:** 20+ zengin CSV dosyası mevcut!

---

## 💡 SONUÇ

**Bu standartlar:**
- ✅ Tüm dashboard'larda **tutarlı görünüm**
- ✅ **Responsive** ve **print-ready**
- ✅ **Yüksek kaliteli** veri görselleştirme
- ✅ **Sektöre uygun** chart seçimleri
- ✅ **Okunabilir** ve **profesyonel**

---

**© 2025 FINOPS AI Studio | Dashboard Design System v1.0**

