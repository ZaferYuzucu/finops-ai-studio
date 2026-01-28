# 🧪 Dashboard Render Test Senaryoları - Fail-Soft Engine

## Test Senaryoları

### Senaryo 1: Normal Dashboard (Veri Var)
**Durum:** Dashboard config ve veri mevcut

**Beklenen Sonuç:**
- ✅ KPI'lar normal gösterilir
- ✅ Grafikler render edilir
- ✅ Uyarı banner gösterilmez
- ✅ UI tam render edilir

---

### Senaryo 2: Veri Eksik Dashboard
**Durum:** `dashboardData` null veya boş

**Beklenen Sonuç:**
- ✅ KPI placeholder'ları gösterilir (— işareti)
- ✅ Grafik yerine açıklayıcı mesaj gösterilir
- ⚠️ Sarı uyarı banner gösterilir
- ✅ UI render etmeye devam eder (beyaz ekran YOK)
- ✅ Sistem çökmez

---

### Senaryo 3: Kısmi Veri Dashboard
**Durum:** Bazı KPI'lar var, bazı grafikler yok

**Beklenen Sonuç:**
- ✅ Mevcut KPI'lar normal gösterilir
- ✅ Eksik KPI'lar placeholder olarak gösterilir
- ✅ Veri olan grafikler render edilir
- ✅ Veri olmayan grafikler mesaj gösterir
- ✅ UI tam render edilir

---

## Test Adımları

1. **http://localhost:5173/dashboard** sayfasına git
2. Her senaryo için dashboard oluştur/test et:
   - Normal dashboard
   - Veri eksik dashboard
   - Kısmi veri dashboard
3. Console'da kontrol et:
   - React error olmamalı
   - `⚠️ Dashboard veri işleme hatası` log'u varsa bile UI render edilmeli
4. Görsel kontrol:
   - Beyaz ekran olmamalı
   - En azından placeholder'lar görünmeli
   - Uyarı mesajları kullanıcı dostu olmalı

## Başarı Kriterleri

- ✅ Dashboard asla null/empty render etmez
- ✅ Veri yoksa placeholder gösterir
- ✅ React error fırlatmaz
- ✅ Beyaz ekran ihtimali = 0
- ✅ Her dashboard en az "iskelet + mesaj" render eder
