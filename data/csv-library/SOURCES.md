# CSV Kütüphanesi Veri Kaynakları

## 📊 Resmi/Kurumsal Açık Veri Kaynakları

### 1. Eurostat Database + SDMX API
- **URL**: https://ec.europa.eu/eurostat/data/database
- **SDMX API**: https://ec.europa.eu/eurostat/web/sdmx-web-services/rest-sdmx-2.1
- **Format**: XML/JSON (SDMX 2.1)
- **Lisans**: CC BY 4.0
- **Veri Türleri**: Ekonomi, tarım, üretim, ticaret, nüfus
- **İndirme**: REST API ile doğrudan sorgu
- **Normalize**: XML → JSON → CSV (date, entity, category, metric, value)
- **Örnek Kullanım**: Avrupa ülkeleri tarımsal üretim verileri

### 2. FAO/FAOSTAT (Food and Agriculture Organization)
- **URL**: https://www.fao.org/faostat/en/
- **Bulk Download**: https://fenixservices.fao.org/faostat/static/bulkdownloads
- **Format**: CSV (zipped)
- **Lisans**: CC BY-NC-SA 3.0 IGO
- **Veri Türleri**: Crop production, livestock, land use, food prices
- **İndirme**: Bulk ZIP dosyaları (yıllık güncelleme)
- **Normalize**: 
  - Item → category
  - Area → entity
  - Year → date (YYYY-01-01 format)
  - Value → value
- **Örnek Kullanım**: Tohum üretimi, verim/dönüm, gübre kullanımı

### 3. World Bank Open Data
- **URL**: https://data.worldbank.org/
- **API**: https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation
- **Format**: JSON/XML/CSV
- **Lisans**: CC BY 4.0
- **Veri Türleri**: Ekonomik göstergeler, KOBİ istatistikleri, tarım
- **İndirme**: API ile query veya bulk CSV
- **Normalize**: 
  - Country → entity
  - Indicator → category
  - Year → date
  - Value → value
- **Örnek Kullanım**: Ülke bazlı tarımsal GDP, KOBİ sayıları

### 4. USDA NASS (National Agricultural Statistics Service)
- **URL**: https://quickstats.nass.usda.gov/
- **API**: https://quickstats.nass.usda.gov/api
- **Format**: JSON/CSV
- **Lisans**: Public domain (US Government)
- **Veri Türleri**: Crop yields, prices, inventory, farm operations
- **İndirme**: API key gerekli (ücretsiz kayıt)
- **Normalize**: 
  - State/County → entity
  - Commodity → category
  - Data Item → metric
  - Year → date
- **Örnek Kullanım**: ABD eyalet bazlı verim, fiyat, stok

---

## 🎯 Kullanım Senaryoları (Sektör Bazlı)

### 🌱 Tarım (Tohum/Fidan/Verim)
**Kaynaklar**: FAO Crop Production, USDA NASS, Eurostat Agriculture  
**Metrikler**: 
- `yield_kg_per_ha`: Verim (kg/dönüm)
- `planted_ha`: Ekilen alan (hektar)
- `harvested_tons`: Hasat (ton)
- `irrigation_m3`: Sulama (m³)
- `fertilizer_kg`: Gübre (kg)
- `seedling_count`: Fidan sayısı
- `germination_rate`: Çimlenme oranı (%)

**Normalize Adımı**:
```
1. Ham CSV'yi aç
2. Tarih kolonunu YYYY-MM-DD formatına çevir
3. Entity: bölge/parsel/şube
4. Category: ürün türü (buğday, domates, mısır)
5. Metric: yukarıdaki listeden seç
6. Value: sayısal değer (null ise 0 veya çıkar)
7. Validate: tarih sırası, numeric check
8. Export: data.csv + metadata.json
```

### 🏭 Üretim (OEE/Fire)
**Kaynaklar**: Eurostat Manufacturing, sentetik veri  
**Metrikler**:
- `oee_percent`: OEE skoru (%)
- `availability_percent`: Kullanılabilirlik (%)
- `performance_percent`: Performans (%)
- `quality_percent`: Kalite (%)
- `scrap_units`: Fire (adet)
- `scrap_cost_tl`: Fire maliyeti (TL)
- `production_units`: Üretim (adet)
- `downtime_hours`: Duruş (saat)

### 🍽️ Restoran (Food/Labor)
**Kaynaklar**: Sentetik veri (gerçek müşteri verisi yok)  
**Metrikler**:
- `covers`: Masa sayısı
- `revenue_tl`: Ciro (TL)
- `food_cost_tl`: Yiyecek maliyeti (TL)
- `labor_cost_tl`: Personel maliyeti (TL)
- `labor_hours`: Çalışma saati
- `avg_check_tl`: Ortalama hesap (TL)

### 🏨 Otel (ADR/RevPAR)
**Kaynaklar**: Sentetik veri  
**Metrikler**:
- `rooms_sold`: Satılan oda
- `adr_tl`: Average Daily Rate (TL)
- `revpar_tl`: Revenue Per Available Room (TL)
- `occupancy_percent`: Doluluk (%)
- `total_revenue_tl`: Toplam gelir (TL)

### 🛒 E-ticaret (Kanal Kârı)
**Kaynaklar**: Sentetik veri  
**Metrikler**:
- `orders`: Sipariş sayısı
- `gmv_tl`: Gross Merchandise Value (TL)
- `cogs_tl`: Cost of Goods Sold (TL)
- `shipping_cost_tl`: Kargo maliyeti (TL)
- `marketing_cost_tl`: Pazarlama maliyeti (TL)
- `net_profit_tl`: Net kâr (TL)
- `channel`: Kanal (marketplace/website/mobile)

---

## 🔐 Veri Gizliliği ve Uyumluluk

- ✅ **Tüm veriler açık kaynak veya sentetik**
- ✅ **Hiçbir gerçek müşteri verisi kullanılmamıştır**
- ✅ **Lisanslar her dataset için metadata.json içinde belirtilmiştir**
- ✅ **GDPR/KVKK uyumlu: kişisel veri yok**

---

## 📥 Nasıl İndiririm?

### Otomatik (Script ile):
```bash
cd scripts/csv-library/fetchers
ts-node faostat_bulk.ts
# FAO Crop Production dataset indirilir ve normalize edilir
```

### Manuel (Web arayüzü):
1. Kaynak web sitesine git (örn: FAOSTAT)
2. İlgili veri setini bul
3. CSV/Excel formatında indir
4. `scripts/csv-library/normalize.ts` ile normalize et
5. `scripts/csv-library/validate.ts` ile doğrula
6. `data/csv-library/datasets/<yeni-id>/` klasörüne koy

---

## 📚 Ek Kaynaklar

- **Kaggle Open Datasets**: https://www.kaggle.com/datasets
- **Google Dataset Search**: https://datasetsearch.research.google.com/
- **Our World in Data**: https://ourworldindata.org/
- **UN Data**: https://data.un.org/

---

**Son Güncelleme**: 2025-12-31  
**Maintainer**: FinOps.ist Data Team

