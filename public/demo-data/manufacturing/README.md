# 🏭 ÜRETİM KOBİ DEMO CSV KÜTÜPHANESİ

**Versiyon:** 1.0  
**Tarih Aralığı:** 2024-01-01 → 2024-06-30 (6 ay)  
**Kapsam:** Gerçekçi, tutarlı, dashboard-ready üretim verileri

---

## 📊 DOSYA YAPISI

### 1. **orders.csv** (76 kayıt)
Müşteri siparişleri - Talep tarafı

**Kolonlar:**
- `date`: Sipariş tarihi
- `product_sku`: Ürün kodu (P001/P002/P003)
- `product_name`: Ürün adı
- `units_ordered`: Sipariş miktarı
- `unit_price`: Birim satış fiyatı (₺)
- `channel`: Satış kanalı (Direct/Distributor/Online)

**Ürün Profilleri:**
- **P001 (Widget Standard):** Yüksek hacim, düşük fiyat (68₺), %34 marj
- **P002 (Widget Premium):** Orta segment (82₺), %24 marj
- **P003 (Widget Deluxe):** Düşük hacim, yüksek maliyet (95₺), %8 marj (PROBLEMLİ!)

**Trend:**
- P001: Ocak 1,200 → Mart 1,600 (pik) → Haziran 1,200
- P002: Stabil 850-1,180
- P003: Düşük 380-540

**Dashboard Kullanımı:**
- Satış Performansı
- Kanal Analizi
- Talep Tahmini

---

### 2. **production.csv** (82 kayıt)
Günlük üretim gerçekleşmeleri

**Kolonlar:**
- `date`: Üretim tarihi
- `plant`: Fabrika (Plant-01)
- `line`: Üretim hattı (Line-A/B/C)
- `shift`: Vardiya (Day/Night)
- `product_sku`: Üretilen ürün
- `planned_units`: Planlanan miktar
- `units_produced`: Üretilen miktar (plan - küçük kayıp)
- `units_good`: İyi ürün sayısı (üretilen - fire)

**Fire Oranları:**
- P001: ~2% (düşük)
- P002: ~2.7% (orta)
- P003: ~8% (YÜKSEK! Material defect)

**Hat Performansı:**
- Line-A: P001 üretiyor, yüksek verim
- Line-B: P002 üretiyor, orta verim
- Line-C: P003 üretiyor, düşük verim + yüksek fire

**Dashboard Kullanımı:**
- Üretim Kârlılığı (Profitability)
- Fire & Verimsizlik (Scrap)
- Hat Performansı

---

### 3. **scrap.csv** (82 kayıt)
Fire detayları - Production ile bağlantılı

**Kolonlar:**
- `date`: Fire tarihi
- `line`: Hat
- `shift`: Vardiya
- `product_sku`: Ürün
- `scrap_units`: Fire miktarı
- `scrap_reason`: Sebep

**Fire Sebepleri:**
- Material defect (dominant, özellikle P003)
- Quality defect
- Machine calibration
- Operator error

**Kritik İnceleme:**
- P003: 30-45 birim/gün fire (Mart ayı en kötü)
- Material defect → Tedarikçi problemi sinyali
- Line-C: OEE düşük + fire yüksek

**Dashboard Kullanımı:**
- Fire & Verimsizlik Dashboard
- Karar Kartı: "Fire oranı ↑: Bu ay -X₺ kayıp"

---

### 4. **inventory.csv** (68 kayıt)
Stok seviyeleri - Her 15 günde snapshot

**Kolonlar:**
- `date`: Envanter tarihi
- `warehouse`: Depo (WH-Main/WH-Secondary)
- `item_sku`: Stok kodu
- `item_type`: Tip (Finished Good / Raw Material)
- `qty_on_hand`: Eldeki miktar
- `unit_cost`: Birim maliyet (₺)

**Stok Maddesi:**
- P001, P002, P003: Mamul
- RM-001, RM-002: Hammadde

**Trend:**
- P001 stok: Ocak 2,400 → Mart 4,180 (pik) → Haziran 2,780
- Bağlı Nakit Hesabı: `qty_on_hand × unit_cost`
- Örnek (Mart): 4,180 × 46₺ = 192,280₺

**Dashboard Kullanımı:**
- Stok & Çalışma Sermayesi Dashboard
- Karar Kartı: "Stok gün ↑: Nakit bağlama +X₺"

---

### 5. **labor.csv** (82 kayıt)
İşçilik saatleri ve maliyetleri

**Kolonlar:**
- `date`: Tarih
- `line`: Hat
- `shift`: Vardiya
- `labor_hours`: Normal saat (96h/gün)
- `overtime_hours`: Fazla mesai
- `labor_cost`: Toplam işçilik maliyeti (₺)

**Maliyet Hesabı:**
- Normal: 96h × 150₺/h = 14,400₺
- Overtime: h × 180₺/h
- Toplam = 14,400 + (overtime × 180)

**Gözlem:**
- Line-C: En yüksek overtime (P003 zorluğundan)
- Mart ayı: Tüm hatlarda overtime artışı (yüksek talep)

**Dashboard Kullanımı:**
- Üretim Kârlılığı (maliyet bileşeni)
- İşçilik Verimliliği

---

### 6. **machine.csv** (82 kayıt)
Makine performansı ve OEE

**Kolonlar:**
- `date`: Tarih
- `line`: Hat
- `planned_minutes`: Planlanan süre (1440 dk/gün)
- `runtime_minutes`: Çalışma süresi
- `downtime_minutes`: Duruş süresi
- `oee`: Overall Equipment Effectiveness (0-1)

**OEE Formülü:**
```
OEE = runtime_minutes / planned_minutes
```

**Hat OEE Performansı:**
- Line-A: 0.85-0.88 (mükemmel)
- Line-B: 0.83-0.87 (iyi)
- Line-C: 0.71-0.75 (KÖTÜ! Bakım gerekiyor)

**Dashboard Kullanımı:**
- Kapasite Kullanımı Dashboard
- Karar Kartı: "Düşük OEE → Yüksek birim maliyet"

---

### 7. **costs.csv** (82 kayıt)
Ürün bazında maliyet detayı

**Kolonlar:**
- `date`: Tarih
- `product_sku`: Ürün
- `material_cost`: Hammadde maliyeti (₺)
- `labor_cost`: İşçilik payı (₺)
- `overhead_cost`: Genel giderler (₺)
- `energy_cost`: Enerji maliyeti (₺)

**Birim Maliyet Hesabı:**
```
Total Unit Cost = material + labor + overhead + energy
```

**Örnek (Haziran):**
- P001: 30.00 + 11.50 + 6.05 + 2.75 = **50.30₺** (Satış: 68₺ → **Marj: 26%**)
- P002: 42.40 + 14.70 + 7.25 + 3.35 = **67.70₺** (Satış: 82₺ → **Marj: 17%**)
- P003: 61.00 + 20.60 + 8.95 + 4.70 = **95.25₺** (Satış: 95₺ → **Marj: -0.3%** ⚠️)

**Kritik:**
P003 artık ZARARDA! Maliyetler artıyor, fiyat sabit.

**Dashboard Kullanımı:**
- Üretim Kârlılığı
- Maliyet Analizi
- Karar Kartı: "P003 zararda: Fiyat artışı veya üretim durdurma"

---

## 🔗 İLİŞKİLER & VERİ AKIŞI

```
ORDERS → PRODUCTION → SCRAP → INVENTORY
                   ↓
              LABOR + MACHINE
                   ↓
                COSTS
```

### Mantıksal Bağlantılar:

1. **Orders → Production:**
   - Sipariş gelir → Üretim planlanır
   - `orders.units_ordered` ≈ `production.planned_units`

2. **Production → Scrap:**
   - Üretimde fire oluşur
   - `units_produced - units_good` = `scrap_units`

3. **Production → Inventory:**
   - İyi ürünler stoka girer
   - `units_good` → `qty_on_hand` artışı

4. **Labor + Machine → Costs:**
   - İşçilik ve makine kullanımı → Birim maliyeti etkiler
   - Düşük OEE → Yüksek `labor_cost` / birim

5. **Costs → Profitability:**
   - `unit_price` - `total_unit_cost` = Birim Kâr

---

## 📈 DASHBOARD KULLANIM ALANLARI

### 1. **Üretim Kârlılığı Dashboard**
**Kullanılan CSV'ler:**
- `production.csv` → Hat/ürün bazında üretim
- `costs.csv` → Birim maliyetler
- `orders.csv` → Satış fiyatları

**Hesaplamalar:**
```
Kâr = (units_good × unit_price) - (units_good × total_unit_cost)
Marj % = (unit_price - total_unit_cost) / unit_price × 100
```

**Karar Kartları:**
- "Hat C zararda: -₺8,000/ay"
- "P003 marj -%0.3: Fiyat artışı gerekli"

---

### 2. **Fire & Verimsizlik Dashboard**
**Kullanılan CSV'ler:**
- `scrap.csv` → Fire detayları
- `production.csv` → Üretim miktarları
- `costs.csv` → Fire maliyeti hesabı

**Hesaplamalar:**
```
Fire % = scrap_units / units_produced × 100
Fire Maliyeti = scrap_units × material_cost
```

**Karar Kartları:**
- "Fire oranı ↑: Bu ay -₺19,800 TL kayıp"
- "P003 fire %8: Material defect → Tedarikçi değişikliği"

---

### 3. **Kapasite Kullanımı Dashboard**
**Kullanılan CSV'ler:**
- `machine.csv` → OEE ve duruş süreleri
- `labor.csv` → Overtime analizi
- `costs.csv` → Boş kapasite maliyeti

**Hesaplamalar:**
```
Kapasite % = runtime_minutes / planned_minutes × 100
Boş Kapasite Maliyeti = (planned - runtime) × sabit_maliyet_dk
```

**Karar Kartları:**
- "Boş kapasite ↑: Aylık fırsat maliyeti ₺32K"
- "Line-C OEE %72: Bakım planla veya yenile"

---

### 4. **Stok & Çalışma Sermayesi Dashboard**
**Kullanılan CSV'ler:**
- `inventory.csv` → Stok seviyeleri
- `production.csv` → Günlük tüketim/üretim

**Hesaplamalar:**
```
Bağlı Nakit = qty_on_hand × unit_cost
Stok Gün = qty_on_hand / günlük_ortalama_satış
Devir Hızı = yıllık_satış / ortalama_stok
```

**Karar Kartları:**
- "Stok gün ↑: Nakit bağlama +₺75K"
- "WH-Secondary aşırı stoklu: Indirim kampanyası"

---

## ⚠️ KRİTİK İÇGÖRÜLER (VERİDEN)

### 🔴 P003 (Widget Deluxe) PROBLEMLİ:
- Fire oranı %8 (hedef %2)
- OEE %72 (hedef %85)
- Marj -%0.3 (ZARARDA!)
- Overtime maliyeti yüksek
- Material defect dominant

**Önerilen Aksiyonlar:**
1. Tedarikçi değerlendirmesi
2. Fiyat artışı veya
3. Üretimi durdur

### 🟡 Stok Artışı (Mart Pik):
- Bağlı nakit: 192K₺ (P001)
- Stok gün: 52 (hedef: 30)
- Nakit sıkışıklığı riski

**Önerilen Aksiyonlar:**
1. Üretim planını talep ile senkronize et
2. Stok azaltma kampanyası

### 🟢 Line-A Mükemmel:
- OEE %88
- Fire %2
- Yüksek kârlılık
- Kapasite artırılabilir

---

## 🧮 ÖRNEK HESAPLAMALAR

### Örnek 1: P001 Kârlılık (Haziran 2024)
```
Satış Fiyatı: 68₺
Birim Maliyet: 50.30₺
Birim Kâr: 17.70₺
Marj: 26%

Aylık Üretim (İyi): 10,500 birim
Aylık Kâr: 10,500 × 17.70₺ = 185,850₺
```

### Örnek 2: P003 Fire Maliyeti (Mart 2024)
```
Fire Miktar: 45 birim/gün
Material Cost: 59₺
Günlük Fire Maliyeti: 45 × 59₺ = 2,655₺
Aylık Fire Maliyeti: 2,655₺ × 26 gün = 69,030₺
```

### Örnek 3: Bağlı Nakit (Mart 2024)
```
P001 Stok: 4,180 birim × 46₺ = 192,280₺
P002 Stok: 2,720 birim × 64₺ = 174,080₺
P003 Stok: 1,520 birim × 90₺ = 136,800₺
Toplam Bağlı Nakit: 503,160₺
```

---

## 🎯 VERİ KALİTESİ & TUTARLILIK

✅ **Gerçekçi:** Rakamlar KOBİ ölçeğine uygun  
✅ **Tutarlı:** Tablolar arası veri uyumlu  
✅ **Trendy:** Sezonluk dalgalar + sapma var  
✅ **Karar Odaklı:** Dashboard'larda aksiyon çıkarılabilir  
✅ **6 Aylık:** Ocak-Haziran 2024, 76-82 kayıt/CSV  

---

## 📌 KULLANIM TALİMATLARI

1. CSV'ler `public/demo-data/manufacturing/` klasöründedir
2. Dashboard component'leri bu verileri okuyabilir
3. Date formatı: `YYYY-MM-DD`
4. Para birimi: TL (₺)
5. Encoding: UTF-8

**Next Steps:**
- CSV'leri React component'lerine entegre et
- Papa Parse veya csv-parse kullan
- Recharts ile görselleştir

---

**Son Güncelleme:** 2024-12-31  
**Yazar:** FinOps AI Studio  
**Versiyon:** 1.0



