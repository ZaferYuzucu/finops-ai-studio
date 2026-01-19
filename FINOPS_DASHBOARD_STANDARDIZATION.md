# FINOPS DASHBOARD STANDARDIZASYON SİSTEMİ

## 🎯 AMAÇ
50+ mevcut dashboard'u **tek bir profesyonel standarda** dönüştürmek için modüler ve yeniden kullanılabilir bileşen sistemi.

---

## ✅ TAMAMLANAN İŞLER

### 1️⃣ FINOPS Renk Paleti Sistemi
**Dosya:** `src/styles/finops-palette.css`

```css
/* Ana Renkler */
--finops-ocean: #0C4A6E;        /* Ana mavi - başlıklar */
--finops-forest: #047857;       /* Yeşil - pozitif metrikler */
--finops-amber: #D97706;        /* Turuncu - uyarılar */
--finops-rose: #BE123C;         /* Kırmızı - kritik */

/* Arka Plan Sistemi */
--bg-main: #F0F9FF;             /* Ana sayfa arka plan */
--bg-card: #FFFBEB;             /* KPI/Grafik kartları */
--bg-card-border: #E0E7FF;      /* Kart çerçevesi */

/* Grafik Paleti */
--chart-1 to --chart-7: Parlak, profesyonel renkler
```

**Özellikler:**
- ✅ Ajelix tarzı profesyonel görünüm
- ✅ FINOPS'a özel benzersiz renk şeması
- ✅ Print-ready CSS (@media print)
- ✅ A4 landscape optimize

---

### 2️⃣ Modüler KPI Card Bileşeni
**Dosya:** `src/components/dashboard/FinopsKpiCard.tsx`

**Özellikler:**
- ✅ Tek başına çalışabilir (custom dashboard uyumlu)
- ✅ Otomatik renk tespiti (change değerine göre)
- ✅ Status indicator (success/warning/danger)
- ✅ Sparkline desteği (mini grafik)
- ✅ Target progress bar
- ✅ Previous value karşılaştırması
- ✅ Hover efektleri (canlı modda)
- ✅ Print-ready (PDF modda hover olmadan anlaşılır)

**Kullanım:**
```tsx
<FinopsKpiCard
  label="Günlük Ciro"
  value="₺458K"
  change={12.5}
  previousValue="₺407K"
  icon={<DollarSign />}
  status="success"
  note="Hedefin üzerinde seyir"
/>
```

---

### 3️⃣ Modüler Chart Wrapper Bileşeni
**Dosya:** `src/components/dashboard/FinopsChartWrapper.tsx`

**Desteklenen Grafikler:**
- ✅ Bar Chart
- ✅ Line Chart
- ✅ Area Chart
- ✅ Pie Chart

**Özellikler:**
- ✅ Data labels (PDF modda değerler görünür)
- ✅ Micro table (PDF modda detay tablo)
- ✅ Footer notları
- ✅ FINOPS renk paleti otomatik uygulanır
- ✅ Responsive design
- ✅ Tooltip hover (canlı modda)

**Kullanım:**
```tsx
<FinopsChartWrapper
  title="Günlük Ciro Trendi"
  type="line"
  data={revenueData}
  dataKey="value"
  xAxisKey="date"
  showDataLabels={true}
  microTable={true}
  microTableData={{ columns: [...], rows: [...] }}
/>
```

---

### 4️⃣ Dashboard Container (A4 Landscape)
**Dosya:** `src/components/dashboard/FinopsDashboardContainer.tsx`

**Özellikler:**
- ✅ A4 landscape layout (1123px × 794px)
- ✅ Print/PDF export butonları
- ✅ Footer (tarih, para birimi, FINOPS logo)
- ✅ Meta bilgiler (dönem, filtre, vb.)
- ✅ 2 mod: `a4-landscape` | `fullscreen` | `custom`

**Kullanım:**
```tsx
<FinopsDashboardContainer
  title="Restoran Operasyon Paneli"
  subtitle="PDF ve canlı dashboard aynı hesaplardan üretildi"
  dateRange="01-07 Aralık 2025"
  currency="₺"
  layout="a4-landscape"
  kpiCount={6}
  chartCount={5}
>
  {/* KPI Cards */}
  {/* Charts */}
</FinopsDashboardContainer>
```

---

### 5️⃣ Örnek Dashboard: RestaurantDashboardFinops
**Dosya:** `src/components/dashboards/RestaurantDashboardFinops.tsx`

**İçerik:**
1. **6 KPI Card** (Ciro, Sipariş, Sepet, Food Cost, Labor Cost, Memnuniyet)
2. **5 Grafik:**
   - Günlük ciro trendi (line chart)
   - Saat bazlı yoğunluk (bar chart)
   - Ürün satış katkısı (bar chart)
   - Gider kırılımı (pie chart)
   - Masa devir hızı (area chart)

**Standartlar:**
- ✅ FINOPS renk paleti
- ✅ Modüler yapı
- ✅ PDF export destekli
- ✅ Hem canlı hem PDF modda çalışır
- ✅ A4 landscape optimize

---

## 🚀 KULLANIM

### Dashboard'a Erişim
```
http://localhost:5173/dashboard/professional?category=restaurant&dash=restaurant-finops
```

### PDF Export
1. Dashboard açıldığında sağ üstteki **"PDF İndir"** butonuna tıklayın
2. Alternatif: **"Yazdır"** butonu ile print preview

### Özelleştirme
Tüm bileşenler modüler olduğu için:
- KPI sayısını değiştirebilirsiniz (3, 4, 6)
- Grafik sayısını değiştirebilirsiniz (2-6 arası)
- Layout'u değiştirebilirsiniz (grid, yan yana, üst-alt)
- Renkleri CSS variables ile özelleştirebilirsiniz

---

## 📋 SONRAKI ADIMLAR

### Diğer Dashboard'ları Standardize Etmek İçin:

1. **Mevcut dashboard dosyasını kopyala**
   ```bash
   cp src/components/dashboards/OldDashboard.tsx src/components/dashboards/NewDashboardFinops.tsx
   ```

2. **Import'ları güncelle**
   ```tsx
   import FinopsDashboardContainer from '../dashboard/FinopsDashboardContainer';
   import FinopsKpiCard from '../dashboard/FinopsKpiCard';
   import FinopsChartWrapper from '../dashboard/FinopsChartWrapper';
   ```

3. **Eski KPI cards'ları değiştir**
   ```tsx
   // ESKİ:
   <div className="bg-white p-4">...</div>
   
   // YENİ:
   <FinopsKpiCard label="..." value="..." change={...} />
   ```

4. **Eski grafikleri değiştir**
   ```tsx
   // ESKİ:
   <ResponsiveContainer><BarChart>...</BarChart></ResponsiveContainer>
   
   // YENİ:
   <FinopsChartWrapper title="..." type="bar" data={...} />
   ```

5. **Container ekle**
   ```tsx
   return (
     <FinopsDashboardContainer title="..." ...>
       {/* KPI Cards */}
       {/* Charts */}
     </FinopsDashboardContainer>
   );
   ```

6. **ProfessionalDashboardsPage.tsx'e ekle**
   - Import ekle
   - DASHBOARD_CATEGORIES'e ekle
   - renderSelectedDashboard() fonksiyonuna ekle

---

## 🎨 TASARIM PRENSİPLERİ

### KPI Cards
- En az 3, en çok 6 kart
- Icon + değer + değişim + önceki değer
- Status renkleri otomatik
- Note alanı (kısa yorum)

### Grafikler
- Data labels açık (PDF'de değerler görünür)
- Grid açık (daha okunabilir)
- Tooltip hover (canlı modda)
- Micro table (PDF modda detay)

### Layout
- A4 landscape (1123px × 794px)
- 4-5 section (KPI + 2-3 grafik bölümü)
- Beyaz space yeterli
- Footer her zaman görünür

### Renkler
- Primary: FINOPS ocean blue (#0C4A6E)
- Success: FINOPS forest green (#047857)
- Warning: FINOPS amber (#D97706)
- Danger: FINOPS rose (#BE123C)
- Charts: 7 farklı profesyonel renk

---

## 🧩 CUSTOM DASHBOARD BUILDER UYUMLULUĞU

Tüm bileşenler bağımsız çalışabildiği için:
- Kullanıcı istediği sayıda KPI card ekleyebilir
- Kullanıcı istediği sayıda grafik ekleyebilir
- Kullanıcı layout'u değiştirebilir
- Drag & drop ile yeniden düzenleyebilir

**Örnek Custom Dashboard:**
```tsx
<FinopsDashboardContainer layout="custom">
  <div className="grid grid-cols-3 gap-3">
    <FinopsKpiCard {...} />
    <FinopsKpiCard {...} />
    <FinopsKpiCard {...} />
  </div>
  
  <div className="grid grid-cols-2 gap-3">
    <FinopsChartWrapper {...} />
    <FinopsChartWrapper {...} />
  </div>
</FinopsDashboardContainer>
```

---

## 📊 TEKNİK DETAYLAR

### Bağımlılıklar
- React 18+
- Recharts (grafik kütüphanesi)
- Lucide React (iconlar)
- Tailwind CSS

### Performans
- Lazy loading destekli
- Memo kullanılmış
- Optimized re-renders
- Print CSS optimize

### Browser Desteği
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

### PDF Export
- A4 landscape format
- 300 DPI print quality
- Tüm grafikler SVG (yüksek kalite)
- Footer otomatik eklenir

---

## 🎓 EĞİTİM NOTLARI

### Yeni Dashboard Eklerken Dikkat Edilecekler:

1. **Data labels mutlaka açık olmalı** (PDF modda hover yok)
2. **Micro table ekleyin** (PDF'de detay görmek için)
3. **Status renklerini doğru kullanın** (success/warning/danger)
4. **Note alanını doldurun** (KPI'ları açıklayıcı yapın)
5. **Footer bilgilerini güncelleyin** (tarih, para birimi)

### Yaygın Hatalar:

❌ **YANLIŞ:** Eski renkler kullanmak (#10B981, #3B82F6)
✅ **DOĞRU:** FINOPS renkleri kullanmak (var(--chart-1))

❌ **YANLIŞ:** Inline style ile padding
✅ **DOĞRU:** Tailwind classes (p-4, gap-3)

❌ **YANLIŞ:** showDataLabels={false}
✅ **DOĞRU:** showDataLabels={true}

❌ **YANLIŞ:** Hover'a bağımlı bilgi
✅ **DOĞRU:** Data labels ile görünür bilgi

---

## 📞 DESTEK

Dashboard standardizasyonu hakkında sorularınız için:
- FINOPS AI Studio ekibi
- Teknik dokümantasyon: Bu dosya
- Örnek dashboard: RestaurantDashboardFinops.tsx

---

**Son Güncelleme:** 15 Ocak 2026
**Versiyon:** 1.0.0
**Durum:** ✅ Tamamlandı ve test edildi
