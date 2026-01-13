# 📊 Dashboard Oluşturma Rehberi

## 🎯 Örnek: Otomotiv Termostat Üretim Dashboard'u

Bu rehber, **termostat_uretim_takip_TR.csv** dosyası kullanılarak adım adım bir dashboard oluşturma sürecini gösterir.

---

## 📂 ADIM 1: Veri Dosyası Seçimi

**Dosya:** `termostat_uretim_takip_TR.csv`

**Veri Yapısı:**
- 📅 **Tarih:** Üretim tarihi
- 🏭 **Üretim Emri No:** Benzersiz üretim takip numarası
- 🔧 **Ürün Kodu:** TRST-A100, TRST-B200, TRST-C300
- ⚙️ **Üretim Aşaması:** Hammadde Hazırlık, Montaj, Kalite Kontrol
- 📦 **Üretilen Adet:** Toplam üretim miktarı
- ❌ **Hatalı Adet:** Fire/hatalı ürün sayısı
- 💵 **Toplam Üretim Maliyeti (USD):** Maliyet takibi
- 📊 **Mamul Stok:** Bitmiş ürün stoku
- 🔄 **Yarı Mamul Stok:** İşlem gören ürün stoku

**🤔 Neden bu dosya?**
- ✅ Üretim süreçlerini takip eder
- ✅ Maliyet analizi yapılabilir
- ✅ Fire oranları ölçülebilir
- ✅ Stok seviyeleri görünür
- ✅ Zaman serisi analizi mümkün

---

## 📊 ADIM 2: KPI Seçimi (6 Adet)

### 1️⃣ **Toplam Üretim Maliyeti (USD)** 💰
- **Metrik:** `SUM(Toplam_Üretim_Maliyeti_USD)`
- **Neden:** İşletmenin en kritik göstergesi - toplam harcama
- **Format:** `$123,456`
- **Renk:** Mavi (#3B82F6)
- **İkon:** 💵

### 2️⃣ **Üretilen Toplam Adet** 📦
- **Metrik:** `SUM(Üretilen_Adet)`
- **Neden:** Üretim kapasitesi ve hacim göstergesi
- **Format:** `12,345 adet`
- **Renk:** Yeşil (#10B981)
- **İkon:** 📦

### 3️⃣ **Hatalı Üretim Oranı (%)** ❌
- **Metrik:** `(SUM(Hatalı_Adet) / SUM(Üretilen_Adet)) * 100`
- **Neden:** Kalite kontrol ve fire takibi
- **Format:** `2.5%`
- **Renk:** Kırmızı (#EF4444)
- **İkon:** ⚠️

### 4️⃣ **Ortalama Birim Maliyet** 💸
- **Metrik:** `SUM(Toplam_Üretim_Maliyeti_USD) / SUM(Üretilen_Adet)`
- **Neden:** Birim başına maliyet verimliliği
- **Format:** `$4.25/adet`
- **Renk:** Mor (#8B5CF6)
- **İkon:** 💸

### 5️⃣ **Mamul Stok Seviyesi** 📊
- **Metrik:** `LAST(Mamul_Stok)`
- **Neden:** Bitmiş ürün envanteri takibi
- **Format:** `250 adet`
- **Renk:** Turuncu (#F59E0B)
- **İkon:** 📊

### 6️⃣ **Yarı Mamul (WIP) Stok** 🔄
- **Metrik:** `LAST(Yarı_Mamul_Stok)`
- **Neden:** İşlem gören ürün takibi
- **Format:** `180 adet`
- **Renk:** Cyan (#06B6D4)
- **İkon:** 🔄

---

## 📈 ADIM 3: Grafik Seçimi (5 Adet - 3+2 Düzen)

### **İlk Satır: 3 Grafik**

#### **Grafik 1: Günlük Üretim Trendi** 📈
- **Tip:** Line Chart
- **X Ekseni:** Tarih
- **Y Ekseni:** Üretilen Adet
- **Neden:** 
  - ✅ Zaman içinde üretim hacmini gösterir
  - ✅ Trend analizi yapılabilir
  - ✅ Sezonsal değişimler görünür
- **Renk:** Yeşil (#10B981)
- **Smooth:** Evet

#### **Grafik 2: Üretim Aşamasına Göre Maliyet** 📊
- **Tip:** Bar Chart (Renkli)
- **X Ekseni:** Üretim Aşaması
- **Y Ekseni:** Toplam Maliyet (USD)
- **Neden:**
  - ✅ Hangi aşama maliyeti artırıyor?
  - ✅ Optimizasyon fırsatları görünür
  - ✅ Karşılaştırma kolay
- **Renkler:** Her bar farklı renk (Yeşil, Mavi, Mor)

#### **Grafik 3: Ürün Koduna Göre Fire Analizi** ❌
- **Tip:** Bar Chart (Renkli)
- **X Ekseni:** Ürün Kodu (TRST-A100, B200, C300)
- **Y Ekseni:** Hatalı Adet
- **Neden:**
  - ✅ Hangi üründe kalite sorunu var?
  - ✅ Fire oranı yüksek ürünler belirgin
  - ✅ Aksiyonagörüntüsünü alanları gösterir
- **Renkler:** Kırmızı tonları

---

### **İkinci Satır: 2 Grafik**

#### **Grafik 4: Stok Dağılımı (Mamul vs Yarı Mamul)** 🥧
- **Tip:** Donut Chart
- **Veri:** Mamul Stok vs Yarı Mamul Stok
- **Neden:**
  - ✅ Stok dengesi görünür
  - ✅ WIP (Work in Progress) oranı anlaşılır
  - ✅ Nakit bağlanma riski tespit edilir
- **Renkler:** Turuncu (#F59E0B) ve Cyan (#06B6D4)

#### **Grafik 5: Maliyet Trendi (Haftalık)** 📉
- **Tip:** Area Chart
- **X Ekseni:** Tarih (haftalık)
- **Y Ekseni:** Toplam Maliyet (USD)
- **Neden:**
  - ✅ Maliyet değişimlerini gösterir
  - ✅ Ani artışlar/düşüşler belirgin
  - ✅ Bütçe takibi kolaylaşır
- **Renk:** Mavi gradient (#3B82F6)

---

## 🎨 ADIM 4: Dashboard Tasarımı

### **Layout (3+2 Düzen):**

```
┌─────────────────────────────────────────────────┐
│         📊 Dashboard Başlığı                    │
│    Otomotiv Termostat Üretim & Maliyet         │
└─────────────────────────────────────────────────┘

┌──────┬──────┬──────┬──────┬──────┬──────┐
│ KPI1 │ KPI2 │ KPI3 │ KPI4 │ KPI5 │ KPI6 │
│  💰  │  📦  │  ❌  │  💸  │  📊  │  🔄  │
└──────┴──────┴──────┴──────┴──────┴──────┘

┌────────────┬────────────┬────────────┐
│  Grafik 1  │  Grafik 2  │  Grafik 3  │
│    📈      │    📊      │    ❌      │
│ Line Chart │ Bar Chart  │ Bar Chart  │
└────────────┴────────────┴────────────┘

┌─────────────────────┬─────────────────────┐
│     Grafik 4        │     Grafik 5        │
│        🥧           │        📉           │
│    Donut Chart      │    Area Chart       │
└─────────────────────┴─────────────────────┘
```

### **Renk Paleti:**
- 🔵 Mavi: #3B82F6 (Finans)
- 🟢 Yeşil: #10B981 (Üretim)
- 🟣 Mor: #8B5CF6 (Maliyet)
- 🟠 Turuncu: #F59E0B (Stok)
- 🔴 Kırmızı: #EF4444 (Fire/Hata)
- 🔷 Cyan: #06B6D4 (WIP)

### **Arka Plan:**
- Hafif gradient: `#f8f9ff → #f0f4ff → #faf5ff`
- KPI kartları: Beyaz (#FFFFFF)
- Grafikler: Beyaz kartlar içinde

---

## ⚙️ ADIM 5: Teknik Uygulama

### **1. CSV Parse:**
```typescript
const csvData = await parseCSVFile('termostat_uretim_takip_TR.csv');
```

### **2. KPI Hesaplama:**
```typescript
const totalCost = csvData.reduce((sum, row) => sum + row.Toplam_Üretim_Maliyeti_USD, 0);
const totalProduced = csvData.reduce((sum, row) => sum + row.Üretilen_Adet, 0);
const totalDefect = csvData.reduce((sum, row) => sum + row.Hatalı_Adet, 0);
const defectRate = (totalDefect / totalProduced) * 100;
```

### **3. Grafik Data Hazırlama:**
```typescript
// Günlük üretim trend
const dailyProduction = groupBy(csvData, 'Tarih')
  .map(group => ({
    date: group.key,
    value: sum(group.items, 'Üretilen_Adet')
  }));

// Aşama bazında maliyet
const costByStage = groupBy(csvData, 'Üretim_Aşaması')
  .map(group => ({
    stage: group.key,
    cost: sum(group.items, 'Toplam_Üretim_Maliyeti_USD')
  }));
```

---

## ✅ ADIM 6: Sonuç Dashboard'u

**Oluşturulan Dashboard:**
- ✅ 6 KPI Kartı (renkli, açıklamalı)
- ✅ 5 Grafik (3+2 düzeni)
- ✅ A4 boyutunda (1123px x 794px)
- ✅ Print-friendly
- ✅ PDF export hazır

**Dashboard Adı:**  
**"Otomotiv Termostat Üretim & Maliyet Dashboard'u"**

---

## 📖 ÖĞRENME NOKTALARI

### **KPI Seçiminde:**
1. ✅ **İş kritik metrikler** önce (maliyet, üretim)
2. ✅ **Kalite göstergeleri** mutlaka (fire oranı)
3. ✅ **Stok seviyeleri** nakit takibi için
4. ✅ **Birim maliyet** verimlilik ölçümü için

### **Grafik Seçiminde:**
1. ✅ **Line Chart** → Zaman serisi analizi
2. ✅ **Bar Chart** → Karşılaştırma
3. ✅ **Donut Chart** → Oran/dağılım
4. ✅ **Area Chart** → Trend + hacim

### **Tasarım İlkeleri:**
1. ✅ **Renk tutarlılığı** (her metrik için sabit renk)
2. ✅ **Hiyerarşi** (KPI üstte, grafikler altta)
3. ✅ **Boşluk** (makul padding ve gap)
4. ✅ **Okunabilirlik** (font boyutları uygun)

---

## 🎯 SONUÇ

Bu dashboard ile:
- 💰 **Maliyet kontrol** altında
- 📦 **Üretim takibi** kolay
- ❌ **Fire oranları** görünür
- 📊 **Stok seviyeleri** anlık
- 📈 **Trendler** belirgin

**Dashboard oluşturma süresi:** ~15 dakika  
**Güncelleme sıklığı:** Günlük  
**Kullanım alanı:** Fabrika yöneticileri, CFO, Üretim Planlama

---

**🎓 Bu rehber, FinOps AI Studio Dashboard Wizard'ında örnek uygulama olarak hazırlanmıştır.**

*Son Güncelleme: Ocak 2026*
