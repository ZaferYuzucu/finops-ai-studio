# 💰 Nakit Akışı Modülü - Teknik Spesifikasyon

**Proje:** FinOps.ist Cash Flow Module  
**Hedef Kullanıcı:** CFO, Mali İşler Müdürü, İşletme Sahibi  
**Tarih:** 23 Ocak 2026  
**Versiyon:** 1.0

---

## 📋 İÇİNDEKİLER

1. [Genel Bakış](#1-genel-bakış)
2. [Veri Modeli](#2-veri-modeli)
3. [CSV Kontratları](#3-csv-kontratları)
4. [Transformation Pipeline](#4-transformation-pipeline)
5. [UI Spesifikasyonları](#5-ui-spesifikasyonları)
6. [Dashboard Çıktıları](#6-dashboard-çıktıları)
7. [Validasyon Kuralları](#7-validasyon-kuralları)
8. [İmplementasyon Checklist](#8-implementasyon-checklist)

---

## 1. GENEL BAKIŞ

### 1.1 Modül Amacı

⭐ **Kritik İhtiyaç:**  
Restoran zincirleri ve KOBİ'ler için **gerçek nakit pozisyonunu** (actual) ve **13 haftalık nakit tahminini** (forecast) tek ekranda görebilme.

💡 **Önemli Not:**  
- **ACTUAL:** Gerçekleşen nakit giriş-çıkış (kilciksiz, ERP'den gelen data)
- **FORECAST:** Bütçe + zamanlama kuralları + KDV ile hesaplanan nakit tahmini (kilcikli)

### 1.2 Temel Özellikler

```
✅ Multi-branch support (şube bazlı)
✅ Konsolidasyon (şirket/grup seviyesi)
✅ ACTUAL vs FORECAST ayrımı
✅ KDV hesaplaması (net → gross)
✅ Zamanlama kuralları (DSO, DPO, POS, bordro, vergi tarihleri)
✅ A4 Portrait/Landscape Excel-like tablolar
✅ Dashboard KPI ve chart'lar
✅ Drill-down capability
```

### 1.3 Mimari Yaklaşım

```
CSV Files (3 adet)
    ↓
RAW Layer (import as-is)
    ↓
MODEL Layer (transform, classify, calculate)
    ↓
REPORT Layer (aggregate, format)
    ↓
UI (Tables + Dashboard)
```

---

## 2. VERİ MODELİ

### 2.1 Entity-Relationship Diagram

```
┌─────────────────────────┐
│ TENANT                  │
│ - tenant_id (PK)        │
│ - tenant_name           │
└─────────────────────────┘
           │
           │ 1:N
           ▼
┌─────────────────────────┐
│ COMPANY                 │
│ - company_id (PK)       │
│ - tenant_id (FK)        │
│ - company_name          │
│ - tax_number            │
└─────────────────────────┘
           │
           │ 1:N
           ▼
┌─────────────────────────┐
│ BRANCH                  │
│ - branch_id (PK)        │
│ - company_id (FK)       │
│ - branch_name           │
│ - branch_code           │
│ - cost_center (optional)│
└─────────────────────────┘
           │
           │ 1:N
           ▼
┌─────────────────────────┐       ┌─────────────────────────┐
│ ACTUAL_CASH_TXN         │       │ FORECAST_CASH_EVENT     │
│ (Gerçekleşen)           │       │ (Tahmin)                │
├─────────────────────────┤       ├─────────────────────────┤
│ - txn_id (PK)           │       │ - event_id (PK)         │
│ - branch_id (FK)        │       │ - branch_id (FK)        │
│ - txn_date              │       │ - plan_date             │
│ - counter_account       │       │ - counter_account       │
│ - description           │       │ - description           │
│ - amount_net            │       │ - amount_net            │
│ - amount_vat            │       │ - amount_vat            │
│ - amount_gross          │       │ - amount_gross          │
│ - payment_method        │       │ - payment_terms         │
│ - document_no           │       │ - expected_payment_date │
│ - CF_Kalem (classified) │       │ - CF_Kalem (classified) │
│ - CF_Bölüm (classified) │       │ - CF_Bölüm (classified) │
└─────────────────────────┘       └─────────────────────────┘
           │                                  │
           │                                  │
           ▼                                  ▼
┌──────────────────────────────────────────────────────┐
│ MAPPING_RULES                                        │
│ - rule_id (PK)                                       │
│ - counter_account_prefix                             │
│ - CF_Kalem                                           │
│ - CF_Bölüm                                           │
│ - vat_profile (0%, 1%, 10%, 20%)                     │
│ - default_payment_terms (DSO/DPO days)               │
│ - is_active                                          │
└──────────────────────────────────────────────────────┘
```

### 2.2 Core Tables

#### 2.2.1 `ACTUAL_CASH_TXN` (Gerçekleşen Nakit Hareketleri)

| Alan | Tip | Açıklama | Örnek |
|------|-----|----------|-------|
| `txn_id` | STRING | Unique transaction ID | `TXN_20260123_001` |
| `tenant_id` | STRING | Tenant kimliği | `tenant_001` |
| `company_id` | STRING | Şirket kimliği | `company_A` |
| `branch_id` | STRING | Şube kimliği | `branch_kadikoy` |
| `cost_center` | STRING (optional) | Masraf merkezi | `CC_KITCHEN` |
| `txn_date` | DATE | İşlem tarihi | `2026-01-23` |
| `counter_account` | STRING | Karşı hesap kodu | `320.001` (Müşteriler) |
| `description` | STRING | Açıklama | `Günlük kasa satışları` |
| `amount_net` | DECIMAL | Net tutar (KDV hariç) | `1000.00` |
| `amount_vat` | DECIMAL | KDV tutarı | `200.00` |
| `amount_gross` | DECIMAL | Brüt tutar (KDV dahil) | `1200.00` |
| `payment_method` | STRING | Ödeme yöntemi | `POS`, `NAKIT`, `HAVALE` |
| `document_no` | STRING | Belge numarası | `FIS_2026_001` |
| `CF_Kalem` | STRING | Nakit akışı kalemi | `Satış Tahsilatı` |
| `CF_Bölüm` | STRING | Nakit akışı bölümü | `İşletme Faaliyetleri` |
| `is_inflow` | BOOLEAN | Giriş mi? | `TRUE` (giriş), `FALSE` (çıkış) |
| `created_at` | TIMESTAMP | Kayıt zamanı | `2026-01-23T10:30:00Z` |

⭐ **Önemli:**
- `amount_gross` = `amount_net` + `amount_vat` (her zaman)
- `CF_Kalem` ve `CF_Bölüm` mapping rules ile otomatik doldurulur
- `is_inflow` = TRUE ise giriş, FALSE ise çıkış

---

#### 2.2.2 `FORECAST_CASH_EVENT` (Tahmini Nakit Olayları)

| Alan | Tip | Açıklama | Örnek |
|------|-----|----------|-------|
| `event_id` | STRING | Unique event ID | `EVT_20260123_001` |
| `tenant_id` | STRING | Tenant kimliği | `tenant_001` |
| `company_id` | STRING | Şirket kimliği | `company_A` |
| `branch_id` | STRING | Şube kimliği | `branch_kadikoy` |
| `cost_center` | STRING (optional) | Masraf merkezi | `CC_ADMIN` |
| `plan_date` | DATE | Plan tarihi (fatura/sipariş) | `2026-02-01` |
| `expected_payment_date` | DATE | Tahmini ödeme/tahsilat tarihi | `2026-02-15` |
| `counter_account` | STRING | Karşı hesap kodu | `320.001` |
| `description` | STRING | Açıklama | `Şubat ayı ciro tahmini` |
| `amount_net` | DECIMAL | Net tutar (bütçe) | `50000.00` |
| `amount_vat` | DECIMAL | KDV tutarı (hesaplanan) | `10000.00` |
| `amount_gross` | DECIMAL | Brüt tutar (tahmin) | `60000.00` |
| `payment_terms` | STRING | Ödeme vadesi | `DSO_30`, `DPO_45`, `POS_T2` |
| `CF_Kalem` | STRING | Nakit akışı kalemi | `Satış Tahsilatı` |
| `CF_Bölüm` | STRING | Nakit akışı bölümü | `İşletme Faaliyetleri` |
| `is_inflow` | BOOLEAN | Giriş mi? | `TRUE` |
| `recurrence` | STRING | Tekrar kuralı | `MONTHLY`, `WEEKLY`, `ONCE` |
| `created_at` | TIMESTAMP | Kayıt zamanı | `2026-01-23T11:00:00Z` |

⭐ **Önemli:**
- `expected_payment_date` = `plan_date` + payment_terms kuralı
- Örnek: `DSO_30` = plan_date + 30 gün
- `recurrence` varsa event otomatik tekrarlanır

---

#### 2.2.3 `MAPPING_RULES` (Hesap Eşleştirme Kuralları)

| Alan | Tip | Açıklama | Örnek |
|------|-----|----------|-------|
| `rule_id` | STRING | Kural ID | `RULE_001` |
| `tenant_id` | STRING | Tenant kimliği | `tenant_001` |
| `counter_account_prefix` | STRING | Hesap kodu prefix | `320.*` (Müşteriler) |
| `CF_Kalem` | STRING | Nakit akışı kalemi | `Satış Tahsilatı` |
| `CF_Bölüm` | STRING | Nakit akışı bölümü | `İşletme Faaliyetleri` |
| `vat_profile` | STRING | KDV profili | `20%`, `10%`, `1%`, `0%` |
| `default_payment_terms` | STRING | Varsayılan vade | `DSO_30`, `DPO_45` |
| `priority` | INTEGER | Öncelik (1=en yüksek) | `1` |
| `is_active` | BOOLEAN | Aktif mi? | `TRUE` |
| `notes` | STRING | Notlar | `Restoran satışları` |

💡 **Mapping Logic:**
```
IF counter_account MATCHES counter_account_prefix
THEN
  SET CF_Kalem = rules.CF_Kalem
  SET CF_Bölüm = rules.CF_Bölüm
  SET vat_rate = rules.vat_profile
  SET payment_terms = rules.default_payment_terms
ORDER BY priority ASC (ilk eşleşen kural uygulanır)
```

---

### 2.3 CF_Kalem ve CF_Bölüm Hiyerarşisi

#### CF_Bölüm (Ana Kategoriler)

```
1. İşletme Faaliyetleri (Operating Activities)
2. Yatırım Faaliyetleri (Investing Activities)
3. Finansman Faaliyetleri (Financing Activities)
```

#### CF_Kalem (Detay Kalemler) - Restoran Örneği

**1. İşletme Faaliyetleri:**
```
Girişler (+):
  ├── Satış Tahsilatı (Nakit)
  ├── Satış Tahsilatı (POS)
  ├── Satış Tahsilatı (Havale/EFT)
  └── Diğer Gelirler

Çıkışlar (-):
  ├── Mal ve Hizmet Alımları
  │   ├── Gıda Malzemeleri
  │   ├── İçecek Malzemeleri
  │   └── Paketleme Malzemeleri
  ├── Personel Giderleri
  │   ├── Maaş Ödemeleri
  │   ├── SGK Ödemeleri
  │   └── Diğer Personel Giderleri
  ├── Kira Ödemeleri
  ├── Enerji Giderleri (Elektrik, Su, Gaz)
  ├── Pazarlama ve Reklam
  ├── Vergi ve Harç Ödemeleri
  │   ├── KDV Ödemesi
  │   ├── Stopaj Ödemesi
  │   └── Muhtasar Beyanname
  └── Diğer İşletme Giderleri
```

**2. Yatırım Faaliyetleri:**
```
Girişler (+):
  └── Duran Varlık Satışı

Çıkışlar (-):
  ├── Makine ve Ekipman Alımı
  ├── Demirbaş Alımı
  └── Yazılım/Lisans Alımı
```

**3. Finansman Faaliyetleri:**
```
Girişler (+):
  ├── Banka Kredisi
  └── Ortak Sermaye Artırımı

Çıkışlar (-):
  ├── Kredi Anapara Ödemesi
  ├── Kredi Faiz Ödemesi
  └── Ortak Temettü Ödemesi
```

---

### 2.4 Payment Terms (Ödeme Vadesi) Kodları

| Kod | Açıklama | Hesaplama | Örnek |
|-----|----------|-----------|-------|
| `DSO_30` | Alacak vadesi 30 gün | plan_date + 30 | Fatura: 01.02 → Tahsilat: 03.03 |
| `DSO_45` | Alacak vadesi 45 gün | plan_date + 45 | Fatura: 01.02 → Tahsilat: 18.03 |
| `DPO_30` | Borç vadesi 30 gün | plan_date + 30 | Fatura: 01.02 → Ödeme: 03.03 |
| `DPO_45` | Borç vadesi 45 gün | plan_date + 45 | Fatura: 01.02 → Ödeme: 18.03 |
| `POS_T1` | POS tahsilatı T+1 | txn_date + 1 | Satış: Pzt → Banka: Sal |
| `POS_T2` | POS tahsilatı T+2 | txn_date + 2 | Satış: Pzt → Banka: Çar |
| `CASH_T0` | Nakit tahsilat aynı gün | txn_date + 0 | Satış: Pzt → Kasa: Pzt |
| `PAYROLL_15` | Bordro her ay 15'i | Her ayın 15'i | → 15 Şubat, 15 Mart... |
| `VAT_26` | KDV beyanı her ay 26'sı | Her ayın 26'sı | → 26 Şubat, 26 Mart... |
| `SGK_23` | SGK primi her ay 23'ü | Her ayın 23'ü | → 23 Şubat, 23 Mart... |

⭐ **Önemli:**
- Hafta sonu düzeltmesi: Eğer ödeme tarihi Cumartesi/Pazar ise → bir sonraki Pazartesi
- Resmi tatil kontrolü (opsiyonel): Tatil günü varsa → sonraki iş günü

---

## 3. CSV KONTRATLARI

### 3.1 A) `actual_cash_transactions.csv` (ERP Extract)

**Amaç:** Gerçekleşen nakit hareketlerini ERP'den almak

**Zorunlu Kolonlar:**

```csv
txn_date,branch_id,counter_account,description,amount_gross,payment_method,document_no
2026-01-20,branch_kadikoy,320.001,Günlük nakit satış,1200.00,NAKIT,FIS_001
2026-01-20,branch_besiktas,320.002,POS satışı,3600.00,POS,FIS_002
2026-01-21,branch_kadikoy,600.001,Gıda tedarikçisi,-2400.00,HAVALE,FAT_123
2026-01-22,branch_kadikoy,335.001,Personel maaşı,-15000.00,HAVALE,BORDRO_01
```

**Kolon Açıklamaları:**

| Kolon | Tip | Zorunlu | Açıklama | Örnek |
|-------|-----|---------|----------|-------|
| `txn_date` | DATE | ✅ | İşlem tarihi (YYYY-MM-DD) | `2026-01-23` |
| `branch_id` | STRING | ✅ | Şube kodu | `branch_kadikoy` |
| `counter_account` | STRING | ✅ | Karşı hesap kodu | `320.001` |
| `description` | STRING | ✅ | İşlem açıklaması | `Günlük satış` |
| `amount_gross` | DECIMAL | ✅ | Brüt tutar (+ giriş, - çıkış) | `1200.00` veya `-500.00` |
| `payment_method` | STRING | ✅ | Ödeme yöntemi | `NAKIT`, `POS`, `HAVALE` |
| `document_no` | STRING | ⚪ | Belge numarası | `FIS_001` |
| `company_id` | STRING | ⚪ | Şirket kodu (yoksa branch'ten alınır) | `company_A` |
| `cost_center` | STRING | ⚪ | Masraf merkezi | `CC_KITCHEN` |

💡 **İşleme Kuralları:**
1. `amount_gross` > 0 → Nakit GİRİŞİ (`is_inflow = TRUE`)
2. `amount_gross` < 0 → Nakit ÇIKIŞI (`is_inflow = FALSE`)
3. KDV ayrıştırma: `vat_profile` mapping'den alınır, `amount_net` ve `amount_vat` hesaplanır

**KDV Hesaplama:**
```
IF vat_profile = "20%"
  amount_net = amount_gross / 1.20
  amount_vat = amount_gross - amount_net

IF vat_profile = "10%"
  amount_net = amount_gross / 1.10
  amount_vat = amount_gross - amount_net

IF vat_profile = "0%"
  amount_net = amount_gross
  amount_vat = 0
```

---

### 3.2 B) `plan_cash_events.csv` (Planning/Budget)

**Amaç:** Gelecek nakit olaylarını planlamak (forecast)

**Zorunlu Kolonlar:**

```csv
plan_date,branch_id,counter_account,description,amount_net,payment_terms,recurrence
2026-02-01,branch_kadikoy,320.001,Şubat satış tahmini,50000.00,DSO_30,MONTHLY
2026-02-01,branch_kadikoy,600.001,Gıda alımı,-20000.00,DPO_30,MONTHLY
2026-02-15,branch_kadikoy,335.001,Personel maaşı,-15000.00,PAYROLL_15,MONTHLY
2026-02-26,branch_kadikoy,360.001,KDV ödemesi,-8000.00,VAT_26,MONTHLY
```

**Kolon Açıklamaları:**

| Kolon | Tip | Zorunlu | Açıklama | Örnek |
|-------|-----|---------|----------|-------|
| `plan_date` | DATE | ✅ | Plan/fatura tarihi | `2026-02-01` |
| `branch_id` | STRING | ✅ | Şube kodu | `branch_kadikoy` |
| `counter_account` | STRING | ✅ | Karşı hesap kodu | `320.001` |
| `description` | STRING | ✅ | Olay açıklaması | `Şubat satış tahmini` |
| `amount_net` | DECIMAL | ✅ | Net tutar (KDV hariç) | `50000.00` |
| `payment_terms` | STRING | ✅ | Ödeme vadesi kodu | `DSO_30`, `DPO_45` |
| `recurrence` | STRING | ⚪ | Tekrar sıklığı | `MONTHLY`, `WEEKLY`, `ONCE` |
| `company_id` | STRING | ⚪ | Şirket kodu | `company_A` |
| `cost_center` | STRING | ⚪ | Masraf merkezi | `CC_ADMIN` |

💡 **İşleme Kuralları:**
1. `amount_net` > 0 → Nakit GİRİŞİ tahmini
2. `amount_net` < 0 → Nakit ÇIKIŞI tahmini
3. KDV hesaplama: `vat_profile` mapping'den alınır
4. `expected_payment_date` = `plan_date` + `payment_terms` kuralı
5. `recurrence = MONTHLY` ise → 12 ay otomatik tekrar
6. `recurrence = WEEKLY` ise → 13 hafta otomatik tekrar

**Tekrar Logic:**
```
IF recurrence = "MONTHLY"
  FOR i = 0 TO 11  # 12 ay
    event_date = plan_date + (i * 1 MONTH)
    expected_payment_date = event_date + payment_terms
    INSERT forecast_event

IF recurrence = "WEEKLY"
  FOR i = 0 TO 12  # 13 hafta
    event_date = plan_date + (i * 7 DAYS)
    expected_payment_date = event_date + payment_terms
    INSERT forecast_event
```

---

### 3.3 C) `mapping_rules.csv` (Classification + VAT Profile)

**Amaç:** Hesap kodlarını nakit akışı kalemlerine eşleştirmek

**Zorunlu Kolonlar:**

```csv
counter_account_prefix,CF_Kalem,CF_Bölüm,vat_profile,default_payment_terms,priority
320.*,Satış Tahsilatı,İşletme Faaliyetleri,20%,DSO_30,1
600.*,Mal ve Hizmet Alımları,İşletme Faaliyetleri,20%,DPO_30,1
335.*,Personel Giderleri,İşletme Faaliyetleri,0%,PAYROLL_15,1
360.*,Vergi Ödemeleri,İşletme Faaliyetleri,0%,VAT_26,1
254.*,Makine Alımı,Yatırım Faaliyetleri,20%,DPO_45,1
```

**Kolon Açıklamaları:**

| Kolon | Tip | Zorunlu | Açıklama | Örnek |
|-------|-----|---------|----------|-------|
| `counter_account_prefix` | STRING | ✅ | Hesap kodu pattern | `320.*`, `600.001` |
| `CF_Kalem` | STRING | ✅ | Nakit akışı kalemi | `Satış Tahsilatı` |
| `CF_Bölüm` | STRING | ✅ | Nakit akışı bölümü | `İşletme Faaliyetleri` |
| `vat_profile` | STRING | ✅ | KDV profili | `20%`, `10%`, `1%`, `0%` |
| `default_payment_terms` | STRING | ✅ | Varsayılan vade | `DSO_30`, `POS_T2` |
| `priority` | INTEGER | ✅ | Öncelik (1=en yüksek) | `1`, `2`, `3` |
| `notes` | STRING | ⚪ | Açıklama | `Restoran satışları` |

💡 **Pattern Matching:**
```
"320.*"     → 320.001, 320.002, 320.999 (tüm müşteri hesapları)
"600.001"   → Sadece 600.001 (spesifik tedarikçi)
"335.*"     → 335.001, 335.002 (tüm personel hesapları)
```

⭐ **Restoran İşletmeleri İçin Varsayılan Mapping:**

| Hesap Kodu | Açıklama | CF_Kalem | CF_Bölüm | KDV | Vade |
|------------|----------|----------|----------|-----|------|
| `320.*` | Müşteriler (satış) | Satış Tahsilatı | İşletme | 20% | DSO_30 |
| `600.*` | Gıda tedarikçileri | Gıda Malzemeleri | İşletme | 20% | DPO_30 |
| `601.*` | İçecek tedarikçileri | İçecek Malzemeleri | İşletme | 20% | DPO_30 |
| `335.*` | Personel | Maaş Ödemeleri | İşletme | 0% | PAYROLL_15 |
| `360.*` | Vergi dairesi (KDV) | KDV Ödemesi | İşletme | 0% | VAT_26 |
| `361.*` | SGK | SGK Ödemeleri | İşletme | 0% | SGK_23 |
| `180.*` | Kira | Kira Ödemeleri | İşletme | 20% | DPO_0 |
| `254.*` | Demirbaş | Demirbaş Alımı | Yatırım | 20% | DPO_45 |
| `300.*` | Banka kredisi | Kredi Anapara | Finansman | 0% | DPO_30 |
| `780.*` | Faiz gideri | Kredi Faiz | Finansman | 0% | DPO_0 |

---

## 4. TRANSFORMATION PIPELINE

### 4.1 Pipeline Aşamaları

```
┌─────────────────┐
│   RAW LAYER     │  (CSV import as-is)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  STAGING LAYER  │  (Validation + cleaning)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MODEL LAYER   │  (Classification + calculation)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  REPORT LAYER   │  (Aggregation + formatting)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   UI LAYER      │  (Tables + Dashboard)
└─────────────────┘
```

### 4.2 Transformation Steps

#### STEP 1: RAW → STAGING

**Amaç:** CSV dosyalarını validate et ve temizle

```sql
-- Pseudo-code
FUNCTION import_actual_csv(file):
  raw_data = READ_CSV(file)
  
  FOR each row IN raw_data:
    # Validation
    IF txn_date IS NULL OR branch_id IS NULL:
      LOG_ERROR("Missing required field", row)
      SKIP
    
    IF amount_gross = 0:
      LOG_WARNING("Zero amount", row)
      SKIP
    
    IF NOT is_valid_date(txn_date):
      LOG_ERROR("Invalid date format", row)
      SKIP
    
    # Insert to staging
    INSERT INTO staging_actual_cash (
      txn_date, branch_id, counter_account, 
      description, amount_gross, payment_method, document_no
    ) VALUES (
      row.txn_date, row.branch_id, row.counter_account,
      row.description, row.amount_gross, row.payment_method, row.document_no
    )
  
  RETURN import_summary
```

---

#### STEP 2: STAGING → MODEL (Classification)

**Amaç:** Mapping rules ile CF_Kalem ve CF_Bölüm belirle, KDV hesapla

```sql
-- Pseudo-code
FUNCTION classify_and_calculate():
  
  # ACTUAL transactions
  FOR each txn IN staging_actual_cash:
    
    # Find matching rule
    rule = FIND_FIRST_MATCH(
      mapping_rules,
      WHERE counter_account MATCHES counter_account_prefix
      ORDER BY priority ASC
    )
    
    IF rule IS NULL:
      LOG_WARNING("Unmapped account", txn.counter_account)
      rule = DEFAULT_RULE  # "Diğer" kategorisi
    
    # Extract VAT
    vat_rate = PARSE_VAT(rule.vat_profile)  # "20%" → 0.20
    
    IF vat_rate > 0:
      amount_net = txn.amount_gross / (1 + vat_rate)
      amount_vat = txn.amount_gross - amount_net
    ELSE:
      amount_net = txn.amount_gross
      amount_vat = 0
    
    # Determine inflow/outflow
    is_inflow = (txn.amount_gross > 0)
    
    # Insert to model
    INSERT INTO model_actual_cash (
      txn_id = GENERATE_UUID(),
      tenant_id, company_id, branch_id, cost_center,
      txn_date, counter_account, description,
      amount_net, amount_vat, amount_gross,
      payment_method, document_no,
      CF_Kalem = rule.CF_Kalem,
      CF_Bölüm = rule.CF_Bölüm,
      is_inflow = is_inflow,
      created_at = NOW()
    )
  
  
  # FORECAST events
  FOR each event IN staging_plan_cash:
    
    # Find matching rule
    rule = FIND_FIRST_MATCH(...)
    
    # Calculate VAT
    vat_rate = PARSE_VAT(rule.vat_profile)
    amount_vat = event.amount_net * vat_rate
    amount_gross = event.amount_net + amount_vat
    
    # Calculate expected payment date
    expected_payment_date = APPLY_PAYMENT_TERMS(
      event.plan_date,
      event.payment_terms
    )
    
    # Handle recurrence
    IF event.recurrence = "MONTHLY":
      FOR i = 0 TO 11:
        INSERT forecast_event (
          plan_date = event.plan_date + (i MONTHS),
          expected_payment_date = expected_payment_date + (i MONTHS),
          ...
        )
    
    ELSE IF event.recurrence = "WEEKLY":
      FOR i = 0 TO 12:
        INSERT forecast_event (
          plan_date = event.plan_date + (i * 7 DAYS),
          expected_payment_date = expected_payment_date + (i * 7 DAYS),
          ...
        )
    
    ELSE:  # ONCE
      INSERT forecast_event (...)
```

**Payment Terms Logic:**

```python
def apply_payment_terms(plan_date, payment_terms):
    
    if payment_terms.startswith("DSO_"):
        days = int(payment_terms.split("_")[1])
        payment_date = plan_date + timedelta(days=days)
    
    elif payment_terms.startswith("DPO_"):
        days = int(payment_terms.split("_")[1])
        payment_date = plan_date + timedelta(days=days)
    
    elif payment_terms == "POS_T1":
        payment_date = plan_date + timedelta(days=1)
    
    elif payment_terms == "POS_T2":
        payment_date = plan_date + timedelta(days=2)
    
    elif payment_terms == "CASH_T0":
        payment_date = plan_date
    
    elif payment_terms == "PAYROLL_15":
        # Her ayın 15'i
        next_month = plan_date + timedelta(days=30)
        payment_date = date(next_month.year, next_month.month, 15)
    
    elif payment_terms == "VAT_26":
        # Her ayın 26'sı
        next_month = plan_date + timedelta(days=30)
        payment_date = date(next_month.year, next_month.month, 26)
    
    elif payment_terms == "SGK_23":
        # Her ayın 23'ü
        next_month = plan_date + timedelta(days=30)
        payment_date = date(next_month.year, next_month.month, 23)
    
    else:
        payment_date = plan_date  # Default
    
    # Weekend adjustment
    if payment_date.weekday() >= 5:  # Saturday (5) or Sunday (6)
        days_to_monday = 7 - payment_date.weekday()
        payment_date = payment_date + timedelta(days=days_to_monday)
    
    return payment_date
```

---

#### STEP 3: MODEL → REPORT (Aggregation)

**Amaç:** Günlük, haftalık, aylık aggregate'ler oluştur

```sql
-- Daily Actual Cash Flow (Günlük Gerçekleşen)
CREATE VIEW report_daily_actual AS
SELECT
  txn_date AS report_date,
  branch_id,
  CF_Kalem,
  CF_Bölüm,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE 0 END) AS cash_inflow,
  SUM(CASE WHEN NOT is_inflow THEN ABS(amount_gross) ELSE 0 END) AS cash_outflow,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE -amount_gross END) AS net_cash_flow
FROM model_actual_cash
GROUP BY txn_date, branch_id, CF_Kalem, CF_Bölüm
ORDER BY txn_date DESC, branch_id, CF_Bölüm, CF_Kalem;


-- Weekly Forecast Cash Flow (Haftalık Tahmin)
CREATE VIEW report_weekly_forecast AS
SELECT
  DATE_TRUNC('week', expected_payment_date) AS week_start_date,
  branch_id,
  CF_Kalem,
  CF_Bölüm,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE 0 END) AS forecast_inflow,
  SUM(CASE WHEN NOT is_inflow THEN ABS(amount_gross) ELSE 0 END) AS forecast_outflow,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE -amount_gross END) AS net_forecast_flow
FROM model_forecast_cash
WHERE expected_payment_date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '13 weeks')
GROUP BY week_start_date, branch_id, CF_Kalem, CF_Bölüm
ORDER BY week_start_date, branch_id;


-- Monthly Forecast Cash Flow (Aylık Tahmin)
CREATE VIEW report_monthly_forecast AS
SELECT
  DATE_TRUNC('month', expected_payment_date) AS month_start_date,
  branch_id,
  CF_Kalem,
  CF_Bölüm,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE 0 END) AS forecast_inflow,
  SUM(CASE WHEN NOT is_inflow THEN ABS(amount_gross) ELSE 0 END) AS forecast_outflow,
  SUM(CASE WHEN is_inflow THEN amount_gross ELSE -amount_gross END) AS net_forecast_flow
FROM model_forecast_cash
WHERE expected_payment_date BETWEEN CURRENT_DATE AND (CURRENT_DATE + INTERVAL '12 months')
GROUP BY month_start_date, branch_id, CF_Kalem, CF_Bölüm
ORDER BY month_start_date, branch_id;
```

---

## 5. UI SPESİFİKASYONLARI

### 5.1 A4 Portrait: "Günlük Nakit Akışı" (ACTUAL)

**Format:** A4 Dikey (210mm x 297mm)  
**Amaç:** Bugüne kadar gerçekleşen nakit hareketlerini göstermek

#### 5.1.1 Layout Tasarımı

```
┌─────────────────────────────────────────────────────────┐
│  HEADER                                                  │
│  FinOps AI Studio | Günlük Nakit Akışı Raporu           │
│  Şube: [Kadıköy] | Tarih Aralığı: [01.01.2026-23.01.26] │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  KPI STRIP (4 KPI Kartı)                                │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                │
│  │ GİRİŞ│  │ ÇIKIŞ│  │  NET │  │GÜNLÜK│                │
│  │120.5K│  │ 85.2K│  │+35.3K│  │+5.8K │                │
│  │  ↑12%│  │  ↓8% │  │  ↑45%│  │  ↑5% │                │
│  └──────┘  └──────┘  └──────┘  └──────┘                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  DAILY CASH FLOW TABLE                                  │
│  ┌──────┬──────────┬────────┬────────┬────────┬────────┐│
│  │Tarih │CF_Kalem  │ Giriş  │ Çıkış  │  Net   │Bakiye  ││
│  ├──────┼──────────┼────────┼────────┼────────┼────────┤│
│  │23 Oca│Satış Tah.│+45.2K  │        │+45.2K  │102.5K ⭐││
│  │      │Gıda Alım │        │-18.5K  │-18.5K  │ 84.0K  ││
│  │      │Personel  │        │-15.0K  │-15.0K  │ 69.0K  ││
│  │      │Kira      │        │ -6.5K  │ -6.5K  │ 62.5K  ││
│  │      │Toplam    │+45.2K  │-40.0K  │ +5.2K  │ 62.5K  ││
│  ├──────┼──────────┼────────┼────────┼────────┼────────┤│
│  │22 Oca│Satış Tah.│+42.8K  │        │+42.8K  │ 57.3K  ││
│  │      │Gıda Alım │        │-22.1K  │-22.1K  │ 35.2K  ││
│  │      │Toplam    │+42.8K  │-22.1K  │+20.7K  │ 35.2K  ││
│  ├──────┼──────────┼────────┼────────┼────────┼────────┤│
│  │21 Oca│...       │...     │...     │...     │...     ││
│  └──────┴──────────┴────────┴────────┴────────┴────────┘│
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  ALERTS & INSIGHTS                                       │
│  ⭐ Kritik: Kasa bakiyesi 50K altına düştü              │
│  💡 İyileştirme: Gıda alımları %15 azaltılabilir        │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FOOTER                                                  │
│  Rapor Tarihi: 23.01.2026 10:30 | Kullanıcı: admin      │
└─────────────────────────────────────────────────────────┘
```

#### 5.1.2 Tablo Kolonları

| Kolon | Genişlik | Açıklama | Format |
|-------|----------|----------|--------|
| **Tarih** | 80px | İşlem tarihi | `DD MMM` (23 Oca) |
| **CF_Kalem** | 180px | Nakit akışı kalemi | Text (kısaltılmış) |
| **Giriş (+)** | 100px | Nakit girişi | `₺XX.XK` (yeşil) |
| **Çıkış (-)** | 100px | Nakit çıkışı | `₺XX.XK` (kırmızı) |
| **Net** | 100px | Net akış (giriş - çıkış) | `±XX.XK` (yeşil/kırmızı) |
| **Bakiye** | 100px | Kümülatif bakiye | `₺XX.XK` (mavi) |

#### 5.1.3 Conditional Formatting

| Kural | Uygulama | Örnek |
|-------|----------|-------|
| **Giriş > 50K** | ⭐ Yıldız simgesi | ⭐ 52.5K |
| **Çıkış > 20K** | 🔴 Kırmızı bold | 🔴 **-25.2K** |
| **Bakiye < 50K** | ⚠️ Sarı arka plan | ⚠️ 48.3K |
| **Net > 0** | Yeşil text | +12.5K |
| **Net < 0** | Kırmızı text | -8.2K |

#### 5.1.4 KPI Kartları (Header)

```
┌────────────────────┐
│   NAKİT GİRİŞİ     │
│   ₺120.5K          │
│   ↑ 12% (geçen gün)│
└────────────────────┘

┌────────────────────┐
│   NAKİT ÇIKIŞI     │
│   ₺85.2K           │
│   ↓ 8% (geçen gün) │
└────────────────────┘

┌────────────────────┐
│   NET AKIŞ         │
│   +₺35.3K          │
│   ↑ 45% (geçen gün)│
└────────────────────┘

┌────────────────────┐
│   GÜNLÜK ORTALAMA  │
│   +₺5.8K           │
│   ↑ 5% (7 günlük)  │
└────────────────────┘
```

---

### 5.2 A4 Landscape: "Kurumsal Nakit Tahmini" (FORECAST)

**Format:** A4 Yatay (297mm x 210mm)  
**Amaç:** 13 haftalık nakit tahminini göstermek

#### 5.2.1 Layout Tasarımı

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  HEADER                                                                             │
│  FinOps AI Studio | 13 Haftalık Nakit Tahmini                                      │
│  Şube: [Kadıköy] | Başlangıç: [27.01.2026] | Bitiş: [21.04.2026]                  │
└────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────┐
│  KPI STRIP (5 KPI Kartı)                                                           │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐                                │
│  │TAHMİN│  │TAHMİN│  │ TAHMİN │  │ MIN  │  │ MAX  │                                │
│  │GİRİŞ │  │ÇIKIŞ │  │  NET   │  │BAKİYE│  │BAKİYE│                                │
│  │650K  │  │580K  │  │  +70K  │  │ 45K  │  │ 95K  │                                │
│  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘                                │
└────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────┐
│  13-WEEK FORECAST TABLE (Scroll horizontal)                                        │
│  ┌────────────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬─────────┐│
│  │CF_Kalem    │W1    │W2    │W3    │W4    │W5    │W6    │W7    │...   │W13      ││
│  │            │27 Oca│03 Şub│10 Şub│17 Şub│24 Şub│03 Mar│10 Mar│...   │21 Nis   ││
│  ├────────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼─────────┤│
│  │Satış Tah.  │+50K  │+52K ⭐│+48K  │+55K ⭐│+50K  │+50K  │+50K  │...   │+50K     ││
│  │Gıda Alımı  │-20K  │-22K  │-18K  │-25K  │-20K  │-20K  │-20K  │...   │-20K     ││
│  │Personel    │-15K  │      │      │-15K  │      │      │      │...   │-15K     ││
│  │Kira        │ -6K  │      │      │      │ -6K  │      │      │...   │         ││
│  │KDV Ödemesi │      │      │      │-8K 💡│      │      │      │...   │         ││
│  │SGK Primi   │      │      │      │-5K   │      │      │      │...   │         ││
│  ├────────────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼─────────┤│
│  │HAFTALIK NET│ +9K  │+30K  │+30K  │ +2K⚠ │+24K  │+30K  │+30K  │...   │+15K     ││
│  │KÜMÜLATİF   │ 62K  │ 92K  │122K  │124K  │148K  │178K  │208K  │...   │520K     ││
│  └────────────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴─────────┘│
└────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────┐
│  MONTHLY SUMMARY (12 Aylık Özet)                                                   │
│  ┌─────┬────────┬────────┬────────┬────────────┐                                  │
│  │Ay   │ Giriş  │ Çıkış  │  Net   │ Bitiş Bak. │                                  │
│  ├─────┼────────┼────────┼────────┼────────────┤                                  │
│  │Şubat│ +200K  │ -180K  │ +20K   │   82K      │                                  │
│  │Mart │ +210K  │ -185K  │ +25K   │  107K      │                                  │
│  │Nisan│ +205K  │ -175K  │ +30K   │  137K      │                                  │
│  │...  │ ...    │ ...    │ ...    │  ...       │                                  │
│  └─────┴────────┴────────┴────────┴────────────┘                                  │
└────────────────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────────────────┐
│  ALERTS & INSIGHTS                                                                 │
│  ⚠️ W4 (17 Şub): Net akış +2K, kümülatif 124K - kırmızı bölge yakın               │
│  💡 Öneri: Gıda alımlarını W4'ten W5'e kaydırmayı değerlendirin                   │
│  ⭐ W2 & W4: Satış zirvesi bekleniyor (hafta sonu + özel gün)                      │
└────────────────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.2 Tablo Kolonları

**Dikey (Satırlar):** CF_Kalem (Nakit akışı kalemleri)  
**Yatay (Kolonlar):** 13 hafta (W1, W2, ..., W13)

| Kolon | Genişlik | Açıklama | Format |
|-------|----------|----------|--------|
| **CF_Kalem** | 150px | Nakit akışı kalemi | Text |
| **W1 (27 Oca)** | 80px | 1. hafta tahmini | `±XXK` |
| **W2 (03 Şub)** | 80px | 2. hafta tahmini | `±XXK` |
| **...** | 80px | ... | ... |
| **W13 (21 Nis)** | 80px | 13. hafta tahmini | `±XXK` |

**Son 2 Satır (Özel):**
- **HAFTALIK NET:** Her hafta toplam net akış
- **KÜMÜLATİF:** Kümülatif nakit bakiyesi

#### 5.2.3 Conditional Formatting (Forecast)

| Kural | Uygulama | Örnek |
|-------|----------|-------|
| **Haftalık net < 5K** | ⚠️ Sarı arka plan | ⚠️ +2K |
| **Kümülatif < 50K** | 🔴 Kırmızı bold arka plan | 🔴 **45K** |
| **Satış > 50K** | ⭐ Yıldız simgesi | ⭐ +52K |
| **Büyük gider (>20K)** | 💡 İnfo simgesi | 💡 -25K |
| **Pozitif akış** | Yeşil text | +15K |
| **Negatif akış** | Kırmızı text | -12K |

#### 5.2.4 KPI Kartları (Forecast Header)

```
┌───────────────────────┐
│ TAHMİNİ NAKİT GİRİŞİ  │
│ (13 Hafta)            │
│ ₺650K                 │
└───────────────────────┘

┌───────────────────────┐
│ TAHMİNİ NAKİT ÇIKIŞI  │
│ (13 Hafta)            │
│ ₺580K                 │
└───────────────────────┘

┌───────────────────────┐
│ TAHMİNİ NET AKIŞ      │
│ (13 Hafta)            │
│ +₺70K                 │
└───────────────────────┘

┌───────────────────────┐
│ MİNİMUM BAKİYE        │
│ (13 Haftalık)         │
│ ₺45K (W4)             │
└───────────────────────┘

┌───────────────────────┐
│ MAKSİMUM BAKİYE       │
│ (13 Haftalık)         │
│ ₺95K (W7)             │
└───────────────────────┘
```

---

### 5.3 Excel-like Grid Features

**Zorunlu Özellikler:**

1. **Horizontal Scroll:** 13 hafta yatay scroll ile görülebilir
2. **Freeze Panes:** İlk kolon (CF_Kalem) donuk kalır
3. **Cell Tooltips:** Mouse hover ile detay göster
4. **Row Grouping:** CF_Bölüm'e göre grupla/aç-kapa
5. **Export:** Excel/CSV export (button)
6. **Print:** A4 Landscape print optimize

**Örnek Grid Kütüphanesi:**
- AG-Grid (React)
- Handsontable
- React Data Grid

---

## 6. DASHBOARD ÇIKTILARI

### 6.1 Dashboard KPI'lar

**Cash Flow Dashboard için 6 KPI:**

```
┌──────────────────────┐
│ 1. GÜNLÜK NAKİT GİRİŞİ │
│    ₺45.2K             │
│    ↑ 8% (dün)         │
└──────────────────────┘

┌──────────────────────┐
│ 2. GÜNLÜK NAKİT ÇIKIŞI│
│    ₺40.0K             │
│    ↓ 5% (dün)         │
└──────────────────────┘

┌──────────────────────┐
│ 3. GÜNLÜK NET AKIŞ    │
│    +₺5.2K             │
│    ↑ 45% (dün)        │
└──────────────────────┘

┌──────────────────────┐
│ 4. BUGÜNKÜ BAKİYE     │
│    ₺62.5K             │
│    ⭐ Sağlıklı        │
└──────────────────────┘

┌──────────────────────┐
│ 5. 7 GÜNLÜK ORTALAMA  │
│    +₺5.8K/gün         │
│    ↑ 12% (haftalık)   │
└──────────────────────┘

┌──────────────────────┐
│ 6. TAHMİN (13 HAFTA)  │
│    +₺70K toplam       │
│    💡 İyi seyrediyor  │
└──────────────────────┘
```

### 6.2 Dashboard Chart'lar

#### Chart 1: Günlük Nakit Akışı (Line Chart)

```
Y-Axis: Nakit (₺K)
X-Axis: Tarih (günlük)
Lines:
  - Giriş (yeşil)
  - Çıkış (kırmızı)
  - Net (mavi)
  - Bakiye (turuncu, dashed)

Insight: "Son 7 günde net akış +40K, trend pozitif"
```

#### Chart 2: CF_Bölüm Dağılımı (Pie Chart)

```
Slices:
  - İşletme Faaliyetleri: 85%
  - Yatırım Faaliyetleri: 10%
  - Finansman Faaliyetleri: 5%

Insight: "İşletme faaliyetleri dominant, sağlıklı"
```

#### Chart 3: 13 Haftalık Tahmin (Bar Chart)

```
Y-Axis: Net Akış (₺K)
X-Axis: Hafta (W1-W13)
Bars:
  - Pozitif (yeşil)
  - Negatif (kırmızı)
  - Threshold line (50K minimum)

Insight: "W4 kritik, 2K net akış ile riskli"
```

### 6.3 Filters & Drill-downs

**Filtreler:**
```
1. Tarih Aralığı: [Son 7 Gün] [Son 30 Gün] [Custom]
2. Şube: [Tümü] [Kadıköy] [Beşiktaş] [Taksim]
3. CF_Bölüm: [Tümü] [İşletme] [Yatırım] [Finansman]
4. CF_Kalem: [Multi-select dropdown]
```

**Drill-down Akışı:**
```
Dashboard → Daily Table → Transaction Detail Modal
  │            │              │
  │            │              └─ Tüm transaction detayları
  │            │                 (document_no, counter_account, etc.)
  │            │
  │            └─ Günlük breakdown (kalem bazında)
  │
  └─ Haftalık/Aylık özet

Örnek:
1. User tıklar: "23 Oca" KPI kartı
2. Açılır: Günlük tablo (sadece 23 Oca verileri)
3. User tıklar: "Gıda Alımı -18.5K"
4. Açılır: Modal ile tüm gıda alım transactionları
```

---

## 7. VALİDASYON KURALLARI

### 7.1 CSV Import Validations

⭐ **Kritik Validasyonlar:**

| Kural | Açıklama | Action |
|-------|----------|--------|
| **1. Zorunlu Alan** | txn_date, branch_id, counter_account, amount boş olamaz | REJECT row |
| **2. Tarih Formatı** | YYYY-MM-DD format olmalı | REJECT row |
| **3. Miktar Sıfır** | amount = 0 olamaz | SKIP row + WARNING |
| **4. Geçersiz Şube** | branch_id system'de yoksa | REJECT row |
| **5. Duplicate** | Aynı txn_date + branch_id + counter_account + amount + document_no | SKIP duplicate + WARNING |
| **6. Gelecek Tarih** | txn_date > bugün (actual için) | WARNING (izin ver ama flag'le) |
| **7. Unmapped Account** | counter_account mapping'de yoksa | ALLOW but classify as "Diğer" + LOG |

💡 **Validation Workflow:**

```
CSV Upload
    ↓
Parse CSV
    ↓
FOR each row:
  ├─ Check required fields → FAIL? → LOG + SKIP
  ├─ Check date format → FAIL? → LOG + SKIP
  ├─ Check duplicate → DUPLICATE? → LOG + SKIP
  ├─ Check branch exists → NOT EXISTS? → LOG + SKIP
  ├─ Check unmapped account → UNMAPPED? → LOG + CLASSIFY AS "Diğer"
  └─ VALID → INSERT to STAGING
    ↓
Generate Import Summary
  ├─ Total rows: 100
  ├─ Valid rows: 92
  ├─ Rejected rows: 5
  ├─ Warnings: 3
  └─ Errors: [List of errors with row numbers]
```

### 7.2 Business Logic Validations

| Kural | Açıklama | Alert Level |
|-------|----------|-------------|
| **8. Negatif Bakiye** | Kümülatif bakiye < 0 | 🔴 CRITICAL |
| **9. Düşük Bakiye** | Bakiye < 50K (threshold) | ⚠️ WARNING |
| **10. Büyük Çıkış** | Tek transaction > 50K çıkış | 💡 INFO |
| **11. Anomali** | Günlük net akış > %50 sapma (ortalamadan) | ⚠️ WARNING |
| **12. Eksik Veri** | Son 3 günde veri yok | ⚠️ WARNING |

### 7.3 Validation Report

**Import Sonrası Gösterilecek Rapor:**

```
┌─────────────────────────────────────────────┐
│ Import Özeti                                │
├─────────────────────────────────────────────┤
│ ✅ Toplam Satır:      100                   │
│ ✅ Başarılı:          92                    │
│ ❌ Reddedilen:        5                     │
│ ⚠️ Uyarı:             3                     │
├─────────────────────────────────────────────┤
│ Hatalar:                                    │
│ - Row 12: Eksik alan (txn_date)            │
│ - Row 45: Geçersiz tarih formatı           │
│ - Row 67: Geçersiz şube kodu               │
│ - Row 78: Duplicate (zaten var)            │
│ - Row 89: Miktar sıfır                     │
├─────────────────────────────────────────────┤
│ Uyarılar:                                   │
│ - Row 23: Unmapped account (320.999)       │
│ - Row 56: Gelecek tarih (2026-02-01)       │
│ - Row 91: Büyük çıkış (52K)                │
└─────────────────────────────────────────────┘
```

---

## 8. İMPLEMENTASYON CHECKLIST

### Phase 1: Data Model & Backend (Hafta 1-2)

- [ ] **1.1** Database schema oluştur (PostgreSQL/Firestore)
  - [ ] `ACTUAL_CASH_TXN` table
  - [ ] `FORECAST_CASH_EVENT` table
  - [ ] `MAPPING_RULES` table
  - [ ] `TENANT`, `COMPANY`, `BRANCH` tables

- [ ] **1.2** CSV Parser & Import Service
  - [ ] CSV reader (Papa Parse / csv-parser)
  - [ ] Validation engine
  - [ ] Error logging & reporting

- [ ] **1.3** Transformation Pipeline
  - [ ] Staging layer (raw import)
  - [ ] Classification logic (mapping rules)
  - [ ] KDV calculation
  - [ ] Payment terms engine
  - [ ] Recurrence generator

- [ ] **1.4** API Endpoints
  - [ ] `POST /api/cash-flow/import-actual` (CSV upload)
  - [ ] `POST /api/cash-flow/import-forecast` (CSV upload)
  - [ ] `POST /api/cash-flow/import-mapping` (CSV upload)
  - [ ] `GET /api/cash-flow/daily-actual?branch_id=&date_range=`
  - [ ] `GET /api/cash-flow/weekly-forecast?branch_id=`
  - [ ] `GET /api/cash-flow/monthly-forecast?branch_id=`
  - [ ] `GET /api/cash-flow/validation-report/:import_id`

---

### Phase 2: UI - Tables (Hafta 3-4)

- [ ] **2.1** Daily Actual Table (A4 Portrait)
  - [ ] Grid component (AG-Grid / Handsontable)
  - [ ] KPI strip (4 KPI kartları)
  - [ ] Conditional formatting
  - [ ] Row grouping (CF_Bölüm)
  - [ ] Export (Excel/PDF)
  - [ ] Print CSS (A4 Portrait optimize)

- [ ] **2.2** Weekly Forecast Table (A4 Landscape)
  - [ ] Grid component (horizontal scroll)
  - [ ] Freeze first column
  - [ ] KPI strip (5 KPI kartları)
  - [ ] Conditional formatting
  - [ ] 13-week columns
  - [ ] Monthly summary section
  - [ ] Alerts & insights box
  - [ ] Export (Excel/PDF)
  - [ ] Print CSS (A4 Landscape optimize)

- [ ] **2.3** Table Interactions
  - [ ] Cell hover tooltips
  - [ ] Row expand/collapse (grouping)
  - [ ] Cell click → detail modal
  - [ ] Sort/filter UI

---

### Phase 3: Dashboard Integration (Hafta 5)

- [ ] **3.1** Dashboard Factory Config
  - [ ] `cash-flow-dashboard` config ekle
  - [ ] 6 KPI tanımları
  - [ ] 3 Chart tanımları

- [ ] **3.2** Dashboard Data Service
  - [ ] API'den aggregate data çek
  - [ ] KPI hesaplamaları
  - [ ] Chart data transformation

- [ ] **3.3** Dashboard Components
  - [ ] KPI kartları render
  - [ ] Chart'ları render (Recharts)
  - [ ] Filters (tarih, şube, kalem)
  - [ ] Drill-down modal

- [ ] **3.4** Dashboard → Table Link
  - [ ] "Detay Gör" button → Daily table
  - [ ] KPI tıkla → Filtered table

---

### Phase 4: Validations & Alerts (Hafta 6)

- [ ] **4.1** Validation Engine
  - [ ] CSV validation rules implement
  - [ ] Business logic validations
  - [ ] Error reporting

- [ ] **4.2** Alert System
  - [ ] Negatif bakiye alert
  - [ ] Düşük bakiye warning
  - [ ] Anomali detection
  - [ ] Alert UI (icons + messages)

- [ ] **4.3** Validation Report UI
  - [ ] Import summary modal
  - [ ] Error list with row numbers
  - [ ] Download error report (CSV)

---

### Phase 5: Testing & Optimization (Hafta 7)

- [ ] **5.1** Unit Tests
  - [ ] CSV parser tests
  - [ ] Validation logic tests
  - [ ] KDV calculation tests
  - [ ] Payment terms tests

- [ ] **5.2** Integration Tests
  - [ ] End-to-end CSV import flow
  - [ ] API endpoint tests
  - [ ] Dashboard data flow tests

- [ ] **5.3** Performance Optimization
  - [ ] Large CSV handling (10K+ rows)
  - [ ] Grid rendering optimization
  - [ ] API response caching
  - [ ] Database query optimization (indexes)

- [ ] **5.4** User Acceptance Testing (UAT)
  - [ ] Restoran işletmesi ile pilot test
  - [ ] Feedback toplama
  - [ ] Bug fixing

---

### Phase 6: Documentation & Training (Hafta 8)

- [ ] **6.1** User Documentation
  - [ ] CSV format guide (Türkçe)
  - [ ] Mapping rules örnekleri
  - [ ] Dashboard kullanım kılavuzu
  - [ ] FAQ

- [ ] **6.2** Developer Documentation
  - [ ] API documentation (Swagger/OpenAPI)
  - [ ] Database schema diagram
  - [ ] Transformation logic pseudocode
  - [ ] Deployment guide

- [ ] **6.3** Training Materials
  - [ ] Video tutorial (ekran kaydı)
  - [ ] Sample CSV files (gerçek örnekler)
  - [ ] Best practices guide

---

## 9. RESTORAN İŞLETMELERİ İÇİN VARSAYILANLAR

### 9.1 Tipik CF_Kalem'ler ve Oranları

| CF_Kalem | Aylık Oran | Açıklama |
|----------|------------|----------|
| Satış Tahsilatı | 100% | Toplam cironun tamamı (KDV dahil) |
| Gıda Malzemeleri | -30% | Ciro'nun %30'u (Food Cost) |
| İçecek Malzemeleri | -8% | Ciro'nun %8'i (Beverage Cost) |
| Personel Giderleri | -28% | Ciro'nun %28'i (Labor Cost) |
| Kira | -8% | Sabit (aylık) |
| Enerji Giderleri | -4% | Ciro'nun %4'ü |
| Pazarlama | -3% | Ciro'nun %3'ü |
| KDV Ödemesi | -13% | Satış KDV - Alış KDV (net) |
| SGK Primi | -5% | Maaşların %33'ü (işveren payı) |

**Örnek Hesaplama (Aylık 500K Ciro):**
```
GİRİŞ:
  Satış Tahsilatı:        +600K (KDV dahil, 500K net + 100K KDV)

ÇIKIŞ:
  Gıda Malzemeleri:       -180K (KDV dahil, 150K net + 30K KDV)
  İçecek Malzemeleri:      -48K (KDV dahil, 40K net + 8K KDV)
  Personel Giderleri:     -140K (maaş + SGK, KDV yok)
  Kira:                    -48K (KDV dahil, 40K net + 8K KDV)
  Enerji:                  -24K (KDV dahil, 20K net + 4K KDV)
  Pazarlama:               -18K (KDV dahil, 15K net + 3K KDV)
  KDV Ödemesi:             -47K (100K satış KDV - 53K alış KDV)
  SGK Primi:               -46K (140K maaş × %33)

NET AKIŞ: +600K - 551K = +49K (aylık)
```

### 9.2 Tipik Payment Terms (Zamanlama Kuralları)

| İşlem Tipi | Payment Terms | Açıklama |
|------------|---------------|----------|
| Nakit Satış | `CASH_T0` | Aynı gün kasaya girer |
| POS Satış | `POS_T2` | 2 gün sonra bankaya yatar |
| Gıda Tedarikçisi | `DPO_30` | 30 gün vadeli ödeme |
| İçecek Tedarikçisi | `DPO_30` | 30 gün vadeli ödeme |
| Personel Maaşı | `PAYROLL_15` | Her ayın 15'i |
| Kira | `DPO_0` | Ayın 1'i (fatura tarihi = ödeme) |
| Enerji (Elektrik) | `DPO_10` | Fatura + 10 gün |
| KDV Beyanı | `VAT_26` | Her ayın 26'sı |
| SGK Primi | `SGK_23` | Her ayın 23'ü |
| Stopaj | `DPO_23` | Her ayın 23'ü (muhtasar) |

### 9.3 Örnek Mapping Rules (Restoran)

```csv
counter_account_prefix,CF_Kalem,CF_Bölüm,vat_profile,default_payment_terms,priority,notes
100.*,Kasa,İşletme Faaliyetleri,0%,CASH_T0,1,Nakit kasası
102.*,Banka,İşletme Faaliyetleri,0%,CASH_T0,1,Banka hesabı
320.*,Satış Tahsilatı,İşletme Faaliyetleri,20%,POS_T2,1,Müşteri satışları
600.*,Gıda Malzemeleri,İşletme Faaliyetleri,20%,DPO_30,1,Gıda tedarikçileri
601.*,İçecek Malzemeleri,İşletme Faaliyetleri,20%,DPO_30,1,İçecek tedarikçileri
602.*,Paketleme Malzemeleri,İşletme Faaliyetleri,20%,DPO_30,1,Paketleme malzemeleri
335.001,Maaş Ödemeleri,İşletme Faaliyetleri,0%,PAYROLL_15,1,Personel maaşları
335.002,SGK Ödemeleri,İşletme Faaliyetleri,0%,SGK_23,1,SGK primi
180.*,Kira Ödemeleri,İşletme Faaliyetleri,20%,DPO_0,1,Kira giderleri
770.001,Elektrik,İşletme Faaliyetleri,20%,DPO_10,1,Elektrik faturası
770.002,Su,İşletme Faaliyetleri,20%,DPO_10,1,Su faturası
770.003,Doğalgaz,İşletme Faaliyetleri,20%,DPO_10,1,Doğalgaz faturası
360.001,KDV Ödemesi,İşletme Faaliyetleri,0%,VAT_26,1,KDV beyannamesi
254.*,Demirbaş Alımı,Yatırım Faaliyetleri,20%,DPO_45,1,Makine ve demirbaş
300.*,Kredi Anapara,Finansman Faaliyetleri,0%,DPO_30,1,Banka kredisi anapara
780.*,Kredi Faiz,Finansman Faaliyetleri,0%,DPO_0,1,Kredi faiz gideri
```

---

## 10. TEKNİK STACK ÖNERİLERİ

### 10.1 Frontend

```
React 18+
TypeScript
AG-Grid Community (Excel-like grid)
Recharts (Dashboard charts)
Tailwind CSS (Styling)
React Query (Data fetching & caching)
```

### 10.2 Backend

```
Node.js / Express
TypeScript
PostgreSQL (veri modeli için)
Firestore (users, metadata için)
Zod (Validation)
Papa Parse (CSV parsing)
node-cron (Scheduled jobs)
```

### 10.3 Data Pipeline

```
ETL Flow:
  CSV Upload → Parse → Validate → Stage → Transform → Model → Report

Tools:
  - Papa Parse (CSV parser)
  - Zod (Schema validation)
  - pg (PostgreSQL client)
  - date-fns (Date manipulation)
```

---

## 11. SONUÇ & ÖNERİLER

⭐ **Kritik Başarı Faktörleri:**

1. **Veri Kalitesi:** Mapping rules düzgün tanımlanmazsa tüm sistem çöker
2. **Zamanlama Doğruluğu:** Payment terms logic hatalıysa tahmin yanıltıcı olur
3. **UI Performansı:** 10K+ satır CSV'yi render ederken donma riski
4. **Validation:** Kötü data import'u ile garbage-in garbage-out

💡 **İyileştirme Fikirleri (Future):**

1. **AI Auto-mapping:** OpenAI ile hesap kodlarını otomatik classify et
2. **Scenario Analysis:** "Ya gıda maliyeti %10 artarsa?" gibi senaryolar
3. **Bank Integration:** Banka API'leri ile real-time nakit pozisyonu
4. **Mobile App:** CFO'ların mobil'den nakit durumunu görebilmesi
5. **Alert Notifications:** Kritik bakiye düşüşünde email/SMS/push

---

**Doküman Sonu**

**Hazırlayan:** FinOps.ist Product Team  
**Tarih:** 23 Ocak 2026  
**Versiyon:** 1.0  
**Durum:** Implementation Ready
