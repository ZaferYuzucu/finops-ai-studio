# Tohum Satış, Stok ve Kârlılık Verisi

## 📊 Özet
4 bayi üzerinden 6 farklı tohum türünün 24 aylık satış, stok ve kârlılık analizi.

## 🎯 Kullanım Senaryosu
- Bayi performans karşılaştırması
- Tohum türü bazında kârlılık analizi
- Sezonluk satış trendlerinin izlenmesi
- Stok optimizasyonu

## 📈 Öne Çıkan Özellikler
- **Sezonsal Trend**: İlkbahar aylarında satışlar %80 artış gösterir
- **Kâr Marjı**: Sebze tohumları (domates, biber) daha yüksek marjlı
- **Stok Yönetimi**: Kış aylarında stoklar artar, ilkbaharda azalır

## 📋 Veri Yapısı
- **Tarih Aralığı**: 2023-01-01 → 2024-12-31 (24 ay)
- **Bayiler**: 4 (İzmir, Adana, Konya, Bursa)
- **Tohum Türleri**: 6 (Buğday, Mısır, Domates, Biber, Salatalık, Patlıcan)
- **Metrikler**: 6 (satış, ciro, maliyet, kâr, marj %, stok)
- **Toplam Satır**: 3,456

## 🔧 Dashboard Önerileri
1. **Line Chart**: Aylık ciro trendi (bayi bazında)
2. **Bar Chart**: Tohum türüne göre toplam kâr
3. **Line Chart**: Stok seviyesi takibi
4. **KPI Kartları**: Toplam ciro, ortalama marj, toplam satış kg

## 📥 Kullanım
```typescript
import { loadCSVDataset } from '@/lib/csv-library';

const data = await loadCSVDataset('agri-seed-sales-001');
// → 3456 rows, normalized format
```

## 🏷️ Etiketler
`#tarım` `#tohum` `#bayi-analizi` `#kârlılık` `#stok-yönetimi` `#sezonluk-trend`



