# 📊 FINOPS AI Studio - Mockup Veri Seti

Bu klasör, 26 farklı dashboard için gerçekçi mockup verilerini içermektedir.

## 📁 Klasör Yapısı

```
mockup-data/
├── finans/                  (7 CSV)
├── satis/                   (2 CSV)
├── pazarlama/               (1 CSV)
├── insan-kaynaklari/        (1 CSV)
├── operasyon/               (3 CSV)
├── restoran/                (6 CSV)
├── otel/                    (2 CSV)
├── otomotiv/                (2 CSV)
├── tarim/                   (1 CSV)
└── e-ticaret/               (1 CSV)
```

## 📋 Veri Dosyaları (26 Adet)

### 💼 Finans (7 adet)
1. `cfo-kontrol-paneli.csv` - CFO için üst düzey finansal metrikler (12 ay)
2. `kar-zarar-tablosu.csv` - Detaylı gelir gider analizi (12 ay)
3. `nakit-akisi.csv` - Operasyonel, yatırım ve finansman nakit akışları (12 ay)
4. `butce-gerceklesen.csv` - Departman bazında bütçe sapma analizi (12 ay x 3 departman)
5. `profit-and-loss.csv` - İngilizce kar zarar raporu (12 ay)
6. `ceo-dashboard.csv` - CEO için bütünsel performans göstergeleri (12 ay)
7. `cash-flow-statement.csv` - Nakit akış tablosu (12 ay)

### 📈 Satış (2 adet)
8. `satis-ekibi-performans.csv` - 5 temsilcinin aylık performansı (12 ay x 5 kişi)
9. `satis-hunisi.csv` - Lead'den müşteriye dönüşüm hunisi (12 ay x 4 kaynak)

### 📣 Pazarlama (1 adet)
10. `pazarlama-kampanya.csv` - Dijital pazarlama kampanyaları ROI analizi (36 kampanya)

### 👥 İnsan Kaynakları (1 adet)
11. `ik-metrikleri.csv` - İşe alım, devir oranı, eğitim ve memnuniyet (12 ay)

### ⚙️ Operasyon (3 adet)
12. `uretim-kontrol.csv` - OEE, üretim hedefi, hurda oranı (12 ay x 3 hat)
13. `kalite-kontrol.csv` - Hata oranı, yeniden işleme, müşteri şikayetleri (12 ay x 3 kategori)
14. `stok-yonetimi.csv` - Stok seviyeleri, devir hızı, tedarikçi performansı (12 ay x 5 ürün)

### 🍽️ Restoran (6 adet)
15. `genel-kontrol.csv` - Genel restoran performansı (24 ölçüm)
16. `satis-gosterge.csv` - Saat dilimi ve kategori bazında satışlar (72 veri noktası)
17. `envanter-kontrol.csv` - Gıda stok yönetimi, fire oranları (12 ay x 8 ürün)
18. `isgucu-gosterge.csv` - Personel verimliliği, maaş, vardiya (12 ay x 5 personel)
19. `restoran-operasyon.csv` - Günlük operasyonel metrikler (52 hafta)
20. `restoran-finansal.csv` - Gıda maliyeti, işçilik, prime cost (24 ölçüm)

### 🏨 Otel (2 adet)
21. `otel-yonetim.csv` - Doluluk, ADR, RevPAR, müşteri memnuniyeti (24 ölçüm)
22. `otel-doluluk-gelir.csv` - Oda tipi bazında detaylı analiz (24 ay x 3 oda tipi)

### 🚗 Otomotiv (2 adet)
23. `otomotiv-dashboard.csv` - Satış, servis, envanter yaşı (12 ay)
24. `otomotiv-satis-servis.csv` - Kanal bazında satış ve servis performansı (12 ay x 3 kanal)

### 🌾 Tarım (1 adet)
25. `tarim-operasyonlari.csv` - Mahsul verimi, maliyet analizi, karlılık (12 ölçüm)

### 🛒 E-Ticaret (1 adet)
26. `ecommerce-kpi.csv` - Ziyaretçi, dönüşüm, sepet analizi, LTV (24 ölçüm)

## 🎯 Veri Özellikleri

### ✅ Gerçekçi ve Tutarlı
- Sektörel standartlara uygun değerler
- Mevsimsel trendler ve büyüme patternleri
- İlişkili metrikler arasında tutarlılık

### 📊 Kapsamlı Metrikler
- Her dashboard için 8-15 farklı metrik
- Aylık, haftalık veya günlük periyotlar
- 12 aylık (2024 yılı) veri seti

### 🇹🇷 Türkçe ve Türkiye Odaklı
- Türkçe sütun başlıkları
- TL para birimi
- Türkiye pazar koşullarına uygun değerler

## 💡 Kullanım Alanları

### 1. **Dashboard Önizleme**
```typescript
import csvData from '@/assets/mockup-data/finans/kar-zarar-tablosu.csv';
<DashboardPreview data={csvData} />
```

### 2. **Şablon İndirme**
Kullanıcılar kendi verilerini hazırlamak için şablon olarak indirebilir.

### 3. **Demo ve Sunum**
Satış sunumları ve ürün demoları için hazır veri.

### 4. **Test ve Geliştirme**
Dashboard'ların geliştirilmesi ve test edilmesi için.

## 📥 Örnek Kullanım

### CSV'yi Okuma (JavaScript)
```javascript
import Papa from 'papaparse';
import csvFile from '@/assets/mockup-data/finans/nakit-akisi.csv';

Papa.parse(csvFile, {
  header: true,
  complete: (results) => {
    console.log(results.data);
  }
});
```

### Dashboard'da Görselleştirme
```typescript
<LineChart 
  data={csvData}
  xKey="Tarih"
  yKey="Net_Nakit_Akisi"
  title="Nakit Akışı Trendi"
/>
```

## 🔄 Veri Formatı

### Tarih Formatı
- `YYYY-MM-DD` (2024-01-15)
- Her ayın ortası veya sonu

### Sayı Formatı
- Ondalık: `.` (nokta)
- Binlik ayırıcı: Yok
- Yüzde: `0-100` arası (örn: 25.5)

### Para Formatı
- TL cinsinden
- Ondalık kullanılmamış (tam sayı)
- Örnek: 1850000

## 📝 Notlar

- Tüm veriler **tamamen senaryodur** ve gerçek şirketleri temsil etmez.
- Veriler **eğitim, demo ve test** amaçlıdır.
- Üretim ortamında **gerçek kullanıcı verileri** ile değiştirilmelidir.

## 🔐 Gizlilik

Bu mockup veriler:
- ✅ Herhangi bir gerçek şirkete ait değildir
- ✅ Paylaşılabilir ve kullanılabilir
- ✅ Telif hakkı sorunu içermez

---

**Oluşturma Tarihi:** 29 Aralık 2024  
**Toplam Dosya:** 26 CSV  
**Toplam Veri Noktası:** ~10,000+  
**Versiyon:** 1.0

**FINOPS AI Studio** - Türkiye'nin Yerli SaaS Çözümü 🇹🇷







