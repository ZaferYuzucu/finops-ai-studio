# Otomotiv Termostat Üretim & Maliyet Dataset

## 📋 Genel Bakış

Bu dataset, otomotiv sektöründe termostat üretimi yapan bir işletmenin üretim süreçlerini, maliyet analizini ve stok takibini FinOps perspektifiyle gösteren demo verisidir.

## 🎯 Kullanım Alanı

- **Finans Direktörleri (CFO):** Üretim maliyetlerinin toplam finansal etkisini analiz etme
- **Fabrika Yöneticileri:** Günlük üretim performansı ve fire oranlarını izleme
- **Üretim Planlama:** Stok seviyeleri ve üretim aşamaları optimizasyonu
- **FinOps Ekipleri:** Operasyonel + Finansal verileri birleştirerek karar destek sistemi oluşturma

## 📊 Veri Yapısı

### Sütunlar:
- **Tarih:** Üretim tarihi (2024-01-02 → 2024-01-24)
- **Üretim_Emri_No:** Üretim emri numarası (UE-2024-001, UE-2024-002, ...)
- **Ürün_Kodu:** Ürün kodu (TRST-A100, TRST-B200, TRST-C300)
- **Üretim_Aşaması:** Hammadde Hazırlık, Montaj, Kalite Kontrol
- **Üretilen_Adet:** Üretilen toplam adet
- **Hatalı_Adet:** Fire (hatalı üretim) adedi
- **Toplam_Üretim_Maliyeti_USD:** Aşama bazında üretim maliyeti
- **Mamul_Stok:** Bitmiş ürün stok seviyesi
- **Yarı_Mamul_Stok:** WIP (Work In Progress) stok seviyesi

### Satır Sayısı: 51
### Tarih Aralığı: 3 hafta (Ocak 2024)

## 🔍 FinOps İçgörüleri

Bu dataset ile cevaplanabilecek kritik sorular:

1. **Hangi üretim aşaması maliyetleri yukarı çekiyor?**
   - Hammadde Hazırlık, Montaj, Kalite Kontrol aşamalarının maliyet karşılaştırması

2. **Fire oranları maliyetleri nasıl etkiliyor?**
   - Hatalı üretim oranı ve bunun finansal etkisi

3. **Stok seviyeleri nakit akışını nasıl bağlıyor?**
   - Mamul ve yarı mamul stoklardaki nakit tutma analizi

4. **Günlük üretim performansı hedeflere uygun mu?**
   - Gün bazlı üretim trendi ve varyasyon analizi

## 📈 Önerilen Grafikler

1. **Üretim Aşamalarına Göre Maliyet Dağılımı** (Bar Chart)
2. **Gün Bazlı Üretim Adedi** (Line Chart)
3. **Fire (Hatalı) Oranı Analizi** (Bar Chart)
4. **Stok Dağılımı** (Pie Chart)

## 💡 KPI Kartları

- Toplam Üretim Maliyeti (USD)
- Üretilen Toplam Adet
- Hatalı Üretim Oranı (%)
- Mamul Stok Seviyesi
- Yarı Mamul (WIP) Stok Seviyesi

## 🎨 Demo Dashboard

Bu dataset için hazırlanmış örnek dashboard:
```
/dashboards/automotiv-termostat
```

## 📝 Notlar

- Bu veri demo amaçlı sentetik olarak üretilmiştir
- Gerçek üretim ortamlarında ERP entegrasyonu ile gerçek zamanlı veri kullanılabilir
- FinOps metodolojisi ile Finans + Operasyon verilerini birleştirir

## 📜 Lisans

MIT License - Demo ve eğitim amaçlı kullanım için serbesttir.

---

**finops.ist** - KOBİ'ler için Yapay Zeka Destekli Finansal Yönetim Platformu
