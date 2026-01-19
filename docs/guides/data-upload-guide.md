# Data Upload Guide

## Veri Yükleme Seçenekleri

FinOps AI Studio üç farklı veri yükleme yöntemini destekler:

### 1. Dosya Yükleme (CSV/Excel)
- Bilgisayarınızdan dosya yükleme
- Maksimum 10MB dosya boyutu
- Excel dosyalarında çoklu sayfa desteği

### 2. URL / API Veri Kaynakları (Yeni!)
- Harici URL'lerden doğrudan veri çekme
- CSV ve JSON formatları desteklenir
- Manuel yenileme (otomatik senkronizasyon yok)
- Örnek: `https://api.example.com/sales.csv`

### 3. Entegrasyon Bağlantıları
- ERP ve muhasebe sistemleri (yakında)
- API entegrasyonları

## Ham Dosyalar vs Normalize Veri Setleri

### Ham Dosyalar
- Yüklediğiniz orijinal CSV/Excel dosyaları
- Kullanıcı kütüphanenizde metadata ile saklanır
- Veri işleme için kaynak olarak kullanılır

### Normalize Veri Setleri
- Temizlenmiş ve yapılandırılmış veri
- Sütun eşleştirmeleri uygulanmış
- Tip doğrulaması yapılmış (tarih, sayı, metin)
- Dashboard oluşturmaya hazır halde

**Önemli:** Yüklediğiniz dosyalar otomatik olarak normalize veri setine dönüştürülür ve daha sonra dashboard'larda birleştirilebilir.

## Data Cleaning Process

### 1. Upload
- CSV or Excel file
- Max 10MB per file
- Stored in user scope

### 2. Sheet Discovery (Excel only)
- System detects all sheets
- User selects relevant sheets
- Preview first 5 rows

### 3. Header Detection
- Automatic header row detection
- Confidence scoring (high/medium/low)
- Manual override available

### 4. Column Mapping
- Map source columns to standard fields:
  - `date` - Temporal data
  - `entity` - Business entity
  - `category` - Primary grouping
  - `value` - Numeric metric
  - `currency` - ISO currency code
  - `unit` - Measurement unit

### 5. Validation
- Missing date warnings
- Invalid number errors
- Required field checks

### 6. Preview & Save
- Review normalized data
- Fix validation issues
- Save as dataset

## Sütun Eşleştirmenin Önemi

**Neden sütunları eşleştirmeliyiz?**
- Farklı veri setleri arasında tutarlılık sağlar
- Veri setlerini birleştirmeyi (join) kolaylaştırır
- İş terimleri ile sorgulama yapılmasını sağlar (örn: "gelir göster")
- Dashboard oluşturmayı basitleştirir

**Ne zaman eşleştirmeliyiz?**
- Çoklu veri seti dashboard'ları için mutlaka
- Tek veri setli dashboard'lar için opsiyonel
- Tekrar kullanılacak veri setleri için önerilir

## Çoklu Veri Seti Dashboard'ları İçin Veri Hazırlama

Birden fazla veri setini birleştirerek dashboard oluşturmayı planlıyorsanız:

### Önemli Alanlar
Veri setlerinizde bu alanların bulunması önerilir:

- **Tarih Alanları:** Verileri zaman bazlı birleştirmek için (örn: tarih, ay, yıl)
- **Ürün Alanları:** Ürün bazlı analizler için (örn: ürün adı, ürün kodu, kategori)
- **Lokasyon Alanları:** Bölgesel analizler için (örn: şube, bölge, şehir)
- **Müşteri Alanları:** Müşteri segmentasyonu için (örn: müşteri adı, müşteri tipi)

### Semantik Eşleştirme İpuçları

Veri yükleme sırasında:
1. Sütun isimlerini iş anlamlarına göre eşleştirin
2. Örnek: "Satış_Geliri" → "gelir", "Ürün_Adı" → "ürün"
3. Farklı dosyalardaki benzer sütunlar için aynı semantik alanı kullanın
4. AI önerilerinden faydalanabilirsiniz (aktif etmeniz gerekir)

**Pratik Örnek:**
```
Dosya 1: Satış Verileri
- "Tarih" → tarih
- "Toplam_Gelir" → gelir
- "Ürün_Kodu" → ürün

Dosya 2: Stok Verileri  
- "Tarih" → tarih
- "Ürün_Kodu" → ürün
- "Stok_Miktarı" → miktar
```

Bu iki dosya "tarih" ve "ürün" alanları üzerinden kolayca birleştirilebilir.

## Sonraki Adımlar

Veri yükledikten sonra:
1. Veri seti kütüphanede görünür
2. Dashboard oluştururken kullanabilirsiniz
3. Diğer veri setleri ile birleştirebilirsiniz (opsiyonel)
4. Çoklu veri seti dashboard'ı oluşturabilirsiniz (2-3 veri seti)
