# 🍽️ RESTORAN & KAFE DEMO VERİLERİ

## 📊 DOSYALAR

### 1. daily_sales.csv (62 kayıt)
Günlük satış metrikleri - Lunch & Dinner vardiyadları

**Kolonlar:**
- `date`, `day_of_week`, `shift`, `covers` (müşteri sayısı)
- `avg_check`, `total_revenue`, `food_revenue`, `beverage_revenue`
- `table_turnover` (masa devir hızı)

**Trend:**
- Ocak-Mart: Artış (1,200 → 1,600 müşteri/hafta)
- Mart pik dönem (Cuma-Cumartesi 500+ covers)
- Nisan-Haziran: Düşüş (1,600 → 1,100)

**Dashboard:** Restoran Satış Performansı, Masa Verimliliği

---

### 2. menu_items.csv (38 kayıt)
Menü ürünleri bazında satış

**Kolonlar:**
- `date`, `category`, `item_name`, `quantity_sold`
- `unit_price`, `total_sales`, `food_cost`, `margin_pct`

**İçgörüler:**
- En Kârlı: Tiramisu (%67 marj)
- En Popüler: Biftek (125₺), Izgara Somon (85₺)
- Sevgililer Günü: +40% satış (14 Şubat)

**Dashboard:** Menü Analizi, Kârlılık

---

### 3. labor_costs.csv (32 kayıt)
İşçilik maliyetleri ve verimlilik

**Kolonlar:**
- `date`, `shift`, `staff_count`, `hours_worked`
- `labor_cost`, `revenue`, `labor_cost_pct`

**KPI:**
- Labor Cost %: Hedef %30-35
- Mart (pik): %32-38 (iyi)
- Haziran (düşük): %42-80 (kötü - overstaffing)

**Karar Kartı:**
- "Labor cost % yüksek: Personel planlaması gerekli"

**Dashboard:** İşçilik Verimliliği, Maliyet Kontrolü





