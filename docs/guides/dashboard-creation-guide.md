# Dashboard Oluşturma Rehberi

## Tek Veri Seti vs Çoklu Veri Seti Dashboard'ları

### Tek Veri Seti Dashboard
- Tek bir veri kaynağı kullanır
- En hızlı oluşturma yöntemi
- Odaklanmış analizler için uygundur
- **Ne zaman kullanmalı:** Tek bir konuya odaklanmış raporlar
- **Örnek:** Aylık satış raporu, departman giderleri

### Çoklu Veri Seti Dashboard (Gelişmiş)
- 2-3 veri kaynağını birleştirir
- İlişki yapılandırması gerektirir
- Daha zengin içgörüler sağlar
- **Ne zaman kullanmalı:** Farklı kaynaklardan veri birleştirme gerektiğinde
- **Örnekler:** 
  - Satış + Stok analizi
  - Gelir + Gider karşılaştırması
  - Müşteri + Sipariş ilişkisi

## Dashboard Oluşturma Adımları

### Adım 1: Veri Kaynağı Seçimi

**Tek Veri Seti Modu:**
- Kütüphaneden bir veri seti seçin
- Veya yeni dosya yükleyin
- URL'den veri yükleyebilirsiniz (yeni!)

**Çoklu Veri Seti Modu (Gelişmiş):**
- 2-3 veri seti seçin
- Sistem uyumluluk göstergeleri gösterir
- Veri boyutları ve detay seviyeleri kontrol edilir

**Uyumluluk Göstergeleri:**
- ✅ Yeşil: Veri setleri uyumlu
- ⚠️ Sarı: Uyarı var (satır sayısı farkı, vb.)
- ❌ Kırmızı: Uyumsuz (birleştirme önerilmez)

### Adım 2: Çoklu Veri Seti Seçimi (İsteğe Bağlı)

Çoklu veri seti modu seçtiyseniz:

**Kaç veri seti seçmeli?**
- Minimum: 2 veri seti
- Maksimum: 3 veri seti
- Önerilen: İhtiyacınız kadar az

**Dikkat Edilmesi Gerekenler:**
- Veri setlerinin ortak alanları olmalı (tarih, ürün, vb.)
- Benzer detay seviyesinde olması tercih edilir (örn: ikisi de günlük)
- Çok fazla satır sayısı farkı varsa uyarı görürsünüz

### Adım 3: İlişkileri Yapılandırma (Çoklu Veri Seti İçin)

**Birleştirme (Join) Nedir?**

Basit bir ifadeyle: İki tablodaki ortak bilgileri kullanarak verileri yan yana getirmek.

**İş Dünyasından Örnek:**
```
Satış Tablosu:
Tarih       | Ürün      | Gelir
2024-01-01  | Laptop    | 50.000 TL

Stok Tablosu:
Tarih       | Ürün      | Stok
2024-01-01  | Laptop    | 15 adet

Birleştirme Sonucu:
Tarih       | Ürün      | Gelir      | Stok
2024-01-01  | Laptop    | 50.000 TL  | 15 adet
```

**Birleştirme Tipleri:**

1. **Inner Join (Sadece Eşleşenler)**
   - Sadece her iki tarafta da bulunan kayıtları getirir
   - **Ne zaman kullanılır:** Tam eşleşen veriler istiyorsanız
   - **Örnek:** Hem satışı hem stoğu olan ürünler

2. **Left Join (Sol Taraftaki Tümü)**
   - Sol taraftaki tüm kayıtları getirir, sağ tarafta yoksa boş bırakır
   - **Ne zaman kullanılır:** Sol taraftaki tüm kayıtları görmek istiyorsanız
   - **Örnek:** Tüm ürünlerin satışları (stoğu olmasa bile)

**Ortak Alanları Seçme:**
- Sistem size dropdown menüler sunar
- Genellikle tarih, ürün kodu, veya lokasyon kullanılır
- AI önerileri aktifse, sistem en uygun alanları önerir

**Önizleme:**
- İlk 5 satırı canlı olarak görürsünüz
- Birleştirme doğru mu kontrol edebilirsiniz
- Hata varsa ayarları değiştirebilirsiniz

### Adım 4: Semantik Alan Eşleştirme (Çoklu Veri Seti İçin)

**Semantik Alanlar Nedir?**

Dashboard'lar sütun isimleri yerine iş terimleri kullanır. Böylece farklı dosyalardaki benzer sütunlar tek bir terim altında toplanır.

**Neden Gerekli?**
- Farklı dosyalarda aynı kavram farklı isimlendirilmiş olabilir
- Örnek: "Toplam_Gelir" ve "Sales_Amount" ikisi de "gelir" anlamına gelir
- Semantik eşleştirme ile her ikisi de "gelir" olarak tanımlanır

**Nasıl Çalışır?**

```
Veri Seti A:
"Toplam_Gelir" → gelir (semantic)
"Maliyet"      → gider (semantic)

Veri Seti B:
"Sales_Amount" → gelir (semantic)
"Cost"         → gider (semantic)

Dashboard'da:
"gelir" sorgusu → Her iki veri setinden gelir verisi
```

**Standart Semantik Alanlar:**
- **Metrikler:** gelir, gider, kar, miktar, fiyat, marj
- **Boyutlar:** ürün, kategori, lokasyon, müşteri, bölge, şube
- **Zaman:** tarih, ay, yıl, çeyrek

**Eşleştirme Yapmak:**
1. Sistem eşleştirilmemiş sütunları gösterir
2. Dropdown'dan uygun semantik alanı seçin
3. AI aktifse öneri alabilirsiniz
4. Özel alan oluşturabilirsiniz (admin onayı gerektirir)

### Adım 5: AI Yardımı (İsteğe Bağlı)

**AI Önerileri Nedir?**

Sistem, verilerinizi analiz ederek size öneriler sunabilir:

1. **Birleştirme Anahtarları:** Hangi alanların birleştirilmesi gerektiği
2. **Semantik Eşleştirmeler:** Hangi sütunun hangi iş terimine karşılık geldiği
3. **Dashboard Şablonları:** Verilerinize uygun hazır dashboard tasarımları

**Önemli:**
- ❌ AI hiçbir işlemi otomatik yapmaz
- ✅ Sadece öneri sunar, siz karar verirsiniz
- ✅ Her öneriyi tek tek onaylamanız gerekir
- ✅ Neden önerildiği açıkça gösterilir

**Nasıl Kullanılır?**

1. "AI Önerilerini Etkinleştir" kutusunu işaretleyin
2. Sistem önerileri gösterir:
   ```
   AI Önerisi (güven: %85):
   "Satış_Tarihi" ile "Stok_Tarihi" birleştirilebilir
   Sebep: Her iki sütun da tarih formatında
   
   [Kabul Et] [Reddet]
   ```
3. İstediğiniz öneriyi kabul veya reddedin
4. Devam edin

### Adım 6: Metrik ve Boyut Seçimi
- Görselleştirmek istediğiniz alanları seçin
- **Metrikler:** Gelir, Gider, Miktar (sayısal değerler)
- **Boyutlar:** Ürün, Lokasyon, Zaman (gruplama alanları)

### Adım 7: Grafik Tasarımı
- KPI kartları (maksimum 6)
- Grafikler (maksimum 5)
- Düzen otomatik oluşturulur

### Adım 8: Önizleme ve Kaydetme
- Dashboard'u canlı verilerle inceleyin
- Gerekirse geri dönüp düzenleyin
- Kütüphaneye kaydedin

## Dashboard'ların Sakladığı Bilgiler

Her dashboard şunları saklar:
- Kullanılan veri setleri
- Semantik alan eşleştirmeleri
- Birleştirme yapılandırmaları
- Veri detay seviyesi (günlük/aylık/vb.)

**Neden saklanır?**
- PDF çıktısı tutarlılığı için
- Canlı paylaşılan dashboard güncellemeleri için
- Planlı yenileme özelliği için

## Çoklu Veri Seti Limitleri (Güncel)

- Dashboard başına 2-3 veri seti
- Inner ve left join desteklenir
- Birleştirme anahtarları manuel seçilir
- AI önerileri mevcuttur (aktif etmeniz gerekir)

## Yeni Özellikler (Şimdi Kullanılabilir!)

- ✅ URL/API veri kaynakları
- ✅ AI destekli birleştirme önerileri
- ✅ Semantik eşleştirme önerileri
- ✅ Canlı veri önizleme

## Planlanan Özellikler

- Otomatik veri yenileme (URL kaynakları için)
- ERP entegrasyonları
- Gelişmiş birleştirme tipleri (outer join, cross join)
- Çoklu kullanıcı işbirliği

## En İyi Uygulamalar

### Veri Hazırlığı
1. Verileri yüklemeden önce temizleyin
2. Ortak alanların aynı formatta olduğundan emin olun
3. Tarih formatlarını standartlaştırın

### Birleştirme (Join)
1. Önce tek veri setiyle test edin
2. Birleştirme önizlemesini mutlaka kontrol edin
3. İç içe birleştirmelerden kaçının (karmaşık hale gelir)
4. Birleştirme mantığını dashboard açıklamasında belgelendirin

### Semantik Eşleştirme
1. Standart semantik alanları kullanmaya çalışın
2. Özel alan oluşturmadan önce mevcut alanları kontrol edin
3. Tutarlı isimlendirme kullanın

### Performans
1. Veri detay seviyelerini eşleştirin (günlük + günlük)
2. Gereksiz sütunları eşleştirmeyin
3. Büyük veri setleri için filtreleme kullanın

### Güvenlik ve Paylaşım
1. Hassas verileri paylaşmadan önce gözden geçirin
2. Dashboard açıklamalarına net başlıklar ekleyin
3. Veri kaynaklarını ve yenileme sıklığını belirtin
