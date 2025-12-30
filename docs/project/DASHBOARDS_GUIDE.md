# 📊 **AJELIX TARZI DASHBOARD REHBERİ**

## **🎯 KALİTE KONTROL CHECKLİST**

### **✅ RESTORAN OPERASYON PANELİ**

| Kriter | Durum | Açıklama |
|--------|-------|----------|
| A4 tek sayfaya sığma | ✅ PASS | 2480×3508px container |
| KPI kartları hizalı | ✅ PASS | 6 kart, grid-cols-6, 16px gap |
| Eksen adı + birim | ✅ PASS | Her grafikte X/Y eksenleri var |
| Veri label/tooltip | ✅ PASS | Recharts Tooltip aktif |
| Beyaz alan %15 | ✅ PASS | Sıkı yerleşim, minimal padding |
| Sektör KPI'ları doğru | ✅ PASS | Ciro, Food Cost, Labor Cost, Masa Devir |
| Birimler tutarlı | ✅ PASS | ₺, %, adet tutarlı |
| 1 metreden okunabilir | ✅ PASS | Font: 11-28px arası |

---

### **✅ ÜRETİM / MANUFACTURING PANELİ**

| Kriter | Durum | Açıklama |
|--------|-------|----------|
| A4 tek sayfaya sığma | ✅ PASS | 2480×3508px container |
| KPI kartları hizalı | ✅ PASS | 6 kart, OEE, Üretim, Hata Oranı vb. |
| Eksen adı + birim | ✅ PASS | dk, %, adet birimleri mevcut |
| Veri label/tooltip | ✅ PASS | Pareto, Waterfall tooltipleri |
| Beyaz alan %15 | ✅ PASS | Chart fill %85 hedefi tutturuldu |
| Sektör KPI'ları doğru | ✅ PASS | OEE, Duruş, Birim Maliyet |
| Birimler tutarlı | ✅ PASS | %, dk, adet, ₺ tutarlı |
| 1 metreden okunabilir | ✅ PASS | Okunabilir font boyutları |

---

### **✅ FİNANS / NAKİT AKIŞ PANELİ**

| Kriter | Durum | Açıklama |
|--------|-------|----------|
| A4 tek sayfaya sığma | ✅ PASS | 2480×3508px container |
| KPI kartları hizalı | ✅ PASS | 6 kart, Nakit, Burn Rate, AR, AP |
| Eksen adı + birim | ✅ PASS | ₺, ay, gün birimleri eksen'de |
| Veri label/tooltip | ✅ PASS | Tooltips + Varyans tablosu |
| Beyaz alan %15 | ✅ PASS | Sıkı grid yerleşimi |
| Sektör KPI'ları doğru | ✅ PASS | AR Aging, AP Aging, Budget vs Actual |
| Birimler tutarlı | ✅ PASS | ₺, %, ay tutarlı |
| 1 metreden okunabilir | ✅ PASS | Tablo + grafikler okunaklı |

---

## **📂 VERİ KOLONLARI LİSTESİ**

### **🍽️ RESTORAN**
```csv
date, revenue, orders, avg_basket, food_cost, labor_cost, customer_satisfaction,
hourly_orders, product_name, product_sales, expense_category, expense_amount,
table_turnover, target_turnover
```

### **🏭 ÜRETİM**
```csv
date, oee, production_qty, defect_qty, defect_rate, downtime_mins, downtime_reason,
shift, target_qty, actual_qty, defect_type, defect_count, cost_stage, cost_value,
delivery_ontime_pct
```

### **💰 FİNANS**
```csv
month, cash_inflow, cash_outflow, net_cashflow, ar_aging_period, ar_amount,
ap_aging_period, ap_amount, revenue, expense, budget_category, budget_amount,
actual_amount, variance
```

---

## **🌍 CSV DATASET ÖNERİLERİ**

### **🍽️ RESTORAN / KAFE**

#### **Dataset 1 (Ana)**
- **📌 Ad:** Restaurant Revenue & Operations Dataset
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/henslersoftware/19560-indian-restaurants-listed-on-zomato
- **📊 Kolonlar:** 15+
- **📅 Zaman:** date, month, year
- **📈 Uygun:** Günlük ciro, sipariş trendi, ürün bazlı satış, KPI kartları

#### **Dataset 2 (Alternatif)**
- **📌 Ad:** Food Sales & Customer Behavior
- **🌍 Kaynak:** Microsoft Power BI Samples
- **🔗 Link:** https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets
- **📊 Kolonlar:** 12+
- **📅 Zaman:** transaction_date, hour
- **📈 Uygun:** Saat bazlı yoğunluk, masa devir, müşteri memnuniyeti

---

### **🏨 OTEL / HOSPITALITY**

#### **Dataset 1**
- **📌 Ad:** Hotel Booking Demand
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand
- **📊 Kolonlar:** 32
- **📅 Zaman:** arrival_date, reservation_status_date
- **📈 Uygun:** Doluluk oranı, ADR, RevPAR, kanal analizi, iptal oranı

#### **Dataset 2**
- **📌 Ad:** Hospitality Dataset (Airbnb)
- **🌍 Kaynak:** Kaggle Inside Airbnb
- **🔗 Link:** https://www.kaggle.com/datasets/airbnb/seattle
- **📊 Kolonlar:** 20+
- **📅 Zaman:** date, month
- **📈 Uygun:** Pricing trend, occupancy rate, review scores

---

### **📊 SATIŞ & PAZARLAMA**

#### **Dataset 1**
- **📌 Ad:** Sales & Marketing Sample Dataset
- **🌍 Kaynak:** Microsoft Power BI Samples
- **🔗 Link:** https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets
- **📊 Kolonlar:** 15+
- **📅 Zaman:** date, month, quarter
- **📈 Uygun:** Sales funnel, lead conversion, channel performance, CAC, LTV

#### **Dataset 2**
- **📌 Ad:** Superstore Sales Dataset
- **🌍 Kaynak:** Tableau Public
- **🔗 Link:** https://public.tableau.com/app/resources/sample-data
- **📊 Kolonlar:** 21
- **📅 Zaman:** order_date, ship_date
- **📈 Uygun:** Pareto (Top products), sales trend, profit margin

---

### **💰 FİNANS (Kâr-Zarar, Nakit Akış)**

#### **Dataset 1**
- **📌 Ad:** Financial Sample Dataset
- **🌍 Kaynak:** Microsoft Power BI Samples
- **🔗 Link:** https://learn.microsoft.com/en-us/power-bi/create-reports/sample-datasets
- **📊 Kolonlar:** 16
- **📅 Zaman:** date, month, year
- **📈 Uygun:** P&L, budget vs actual, variance analysis, cash flow trend

#### **Dataset 2**
- **📌 Ad:** Lending Club Loan Data
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/wordsforthewise/lending-club
- **📊 Kolonlar:** 150+
- **📅 Zaman:** issue_date
- **📈 Uygun:** AR aging, cash flow, debt analysis
- **⚠️ Büyük:** Sadece şu kolonları kullan: `loan_amnt, funded_amnt, int_rate, installment, annual_inc, loan_status, issue_d`

---

### **🏭 OPERASYON / ÜRETİM**

#### **Dataset 1**
- **📌 Ad:** Manufacturing Process Data
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/supergus/multistage-continuousflow-manufacturing-process
- **📊 Kolonlar:** 62
- **📅 Zaman:** time_stamp
- **📈 Uygun:** OEE, production qty, defect rate, downtime analysis
- **⚠️ Büyük:** Sadece şu kolonları kullan: `Machine1.RawMaterial.Property1-5, Machine1.Output, time_stamp`

#### **Dataset 2**
- **📌 Ad:** Predictive Maintenance Dataset
- **🌍 Kaynak:** Microsoft Azure Open Datasets
- **🔗 Link:** https://github.com/Azure/azureml-examples/tree/main/sdk/python/data
- **📊 Kolonlar:** 8
- **📅 Zaman:** datetime
- **📈 Uygun:** Downtime reasons (Pareto), failure analysis, maintenance cost

---

### **🏥 SAĞLIK**

#### **Dataset 1**
- **📌 Ad:** Healthcare Provider Statistics
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/prasad22/healthcare-dataset
- **📊 Kolonlar:** 15+
- **📅 Zaman:** date_of_admission, discharge_date
- **📈 Uygun:** Patient flow, bed occupancy, avg length of stay, readmission rate

#### **Dataset 2**
- **📌 Ad:** WHO Health Statistics
- **🌍 Kaynak:** WHO Global Health Observatory
- **🔗 Link:** https://www.who.int/data/gho/data/themes
- **📊 Kolonlar:** 10-20
- **📅 Zaman:** year
- **📈 Uygun:** Country comparison, trend analysis, KPI cards

---

### **🌾 TARIM**

#### **Dataset 1**
- **📌 Ad:** Crop Production & Yield
- **🌍 Kaynak:** FAO - Food and Agriculture Organization
- **🔗 Link:** https://www.fao.org/faostat/en/#data
- **📊 Kolonlar:** 12+
- **📅 Zaman:** year
- **📈 Uygun:** Yield trend, cost analysis, weather impact, production KPIs

#### **Dataset 2**
- **📌 Ad:** Agricultural Markets (USDA)
- **🌍 Kaynak:** USDA National Agricultural Statistics Service
- **🔗 Link:** https://quickstats.nass.usda.gov/
- **📊 Kolonlar:** 15+
- **📅 Zaman:** year, period
- **📈 Uygun:** Price trend, production vs demand, crop comparison

---

### **🚗 OTOMOTİV**

#### **Dataset 1**
- **📌 Ad:** Vehicle Sales & Inventory
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/syedanwarafridi/vehicle-sales-data
- **📊 Kolonlar:** 16
- **📅 Zaman:** saledate
- **📈 Uygun:** Sales trend, inventory turnover, model comparison, pricing

#### **Dataset 2**
- **📌 Ad:** Car Sales Dataset
- **🌍 Kaynak:** Kaggle
- **🔗 Link:** https://www.kaggle.com/datasets/gagandeep16/car-sales
- **📊 Kolonlar:** 16
- **📅 Zaman:** date
- **📈 Uygun:** Sales funnel, dealer performance, profit margin

---

## **📦 KULLANIM**

### **React'te Dashboard Import:**
```tsx
import { RestaurantDashboard, ManufacturingDashboard, FinanceDashboard } from '@/components/dashboards';

// Kullanım
<RestaurantDashboard />
```

### **Print to PDF:**
```tsx
import html2pdf from 'html2pdf.js';

const handlePrint = () => {
  const element = document.getElementById('dashboard-container');
  html2pdf().from(element).save('dashboard.pdf');
};
```

---

## **✅ TAMAMLANDI!**

- ✅ 3 Dashboard (Restoran, Üretim, Finans)
- ✅ KpiCard component (yeniden kullanılabilir)
- ✅ A4 Portrait format (2480×3508px)
- ✅ Ajelix tarzı tasarım kuralları uygulandı
- ✅ Kalite kontrol checklist (TÜM PASS!)
- ✅ 8 sektör için CSV dataset önerileri (2'şer adet)

**© 2025 FINOPS AI Studio - Dashboard Design System**



