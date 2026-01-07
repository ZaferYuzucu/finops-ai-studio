# 🌱 TARIM (TOHUM/FİDAN) DEMO VERİLERİ

## 📊 DOSYALAR

### 1. fields.csv (10 kayıt)
Tarla master data

**Kolonlar:**
- `field_id`, `location`, `area_decare`, `crop_type`
- `planting_date`, `expected_harvest_date`, `seed_variety`, `soil_quality`

**Ürünler:**
- Domates: 5 tarla, toplam 257 dönüm
- Biber: 3 tarla, toplam 113 dönüm
- Hıyar: 3 tarla, toplam 135 dönüm

**Bölgeler:**
- Adana Ceyhan, Mersin Tarsus, Antalya Kumluca

---

### 2. production.csv (10 kayıt)
Hasat verileri

**Kolonlar:**
- `harvest_date`, `field_id`, `crop_type`, `harvested_qty_kg`
- `yield_per_decare_kg`, `quality_grade`, `waste_pct`

**Verim (kg/dönüm):**
- Domates: 550-600 kg/dönüm
- Biber: 340-350 kg/dönüm
- Hıyar: 380-400 kg/dönüm

**Fire:**
- Domates: 8-10% (kabul edilebilir)
- Biber: 10-13% (yüksek)
- Hıyar: 7-11% (orta)

**Kalite:**
- A Grade: 6 tarla (mükemmel)
- B Grade: 4 tarla (orta)

**Karar Kartı:**
- "F002 Biber fire %12: Hasat zamanlaması erkenlemiş olabilir"

---

### 3. costs.csv (10 kayıt)
Dönüm başına maliyet detayı

**Kolonlar:**
- `field_id`, `crop_type`, `seed_cost`, `fertilizer_cost`
- `pesticide_cost`, `water_cost`, `labor_cost`, `machinery_cost`
- `total_cost_per_decare`

**Maliyet/Dönüm:**
- Domates: 6,600-7,120₺
- Biber: 6,500-6,640₺
- Hıyar: 5,580-5,750₺

**En Yüksek Kalem:**
- İşçilik: %32-36 (en büyük maliyet)
- Gübre: %17-19
- Tohum: %12-14

---

### 4. weather.csv (30 kayıt)
Hava koşulları

**Kolonlar:**
- `date`, `location`, `avg_temp_c`, `rainfall_mm`
- `humidity_pct`, `condition`

**Trend:**
- Mart: 16-22°C, yağmur (12mm)
- Nisan: 23-26°C, güneşli
- Mayıs-Temmuz: 28-36°C, çok sıcak (stres)

**İlişki:**
- Yüksek sıcaklık (>33°C) → Fire artışı
- Yağmur (Nisan 15) → Hasat gecikmesi (F007)

---

### 5. sales.csv (10 kayıt)
Satış geliri

**Kolonlar:**
- `sale_date`, `field_id`, `crop_type`, `qty_sold_kg`
- `unit_price_tl`, `total_revenue`, `channel`, `buyer_type`

**Fiyat/kg:**
- Biber: 11.5-12.5₺ (en yüksek)
- Domates: 8.0-8.5₺
- Hıyar: 6.0-6.5₺ (en düşük)

**Kanal:**
- Toptancı Hali: %60 (düşük fiyat)
- Perakende Zincir: %40 (yüksek fiyat)

---

## 💰 DÖNÜM BAŞINA KÂR HESABI

### Örnek: F003 (Domates, 60 dönüm, A kalite)

**Gelir:**
- Verim: 600 kg/dönüm × 60 = 36,000 kg
- Fire: 8% → Satılabilir: 33,120 kg
- Fiyat: 8.5₺/kg
- Toplam Gelir: 281,520₺

**Maliyet:**
- 60 dönüm × 6,950₺ = 417,000₺

**Kâr:**
- Net Kâr: -135,480₺ (ZARAR!)
- **Problem:** Maliyet çok yüksek veya fiyat düşük!

### Karar Kartları:
- "Domates fiyatı 8.5₺/kg: Başabaş için 12₺ gerekli"
- "İşçilik maliyeti %36: Mekanizasyon değerlendir"
- "Toptancı Hali fiyatı düşük: Perakende zincir oranını artır"

---

## 🎯 DASHBOARD KULLANIM

**1. Verim Analizi:**
- Dönüm başına kg/yield
- Tarla karşılaştırması
- Beklenen vs gerçekleşen

**2. Maliyet Analizi:**
- Maliyet kalemleri breakdown
- Dönüm başına maliyet
- Benchmark

**3. Kârlılık:**
- Gelir - Maliyet
- Dönüm başına kâr
- Ürün karşılaştırması

**4. Hava İlişkisi:**
- Sıcaklık vs fire
- Yağmur vs verim
- Stres analizi










