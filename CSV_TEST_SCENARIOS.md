# 🧪 CSV Test Senaryoları - Anti-Chaos Entegrasyonu

## Test Senaryoları

### Senaryo 1: TR CSV (Noktalı Virgül, Türkçe Decimal)
```csv
Tarih;Gelir;Gider;Kar
2024-01-01;1.234,56;987,65;246,91
2024-01-02;1.456,78;1.023,45;433,33
2024-01-03;1.789,12;1.234,56;554,56
```

**Beklenen Sonuç:**
- ✅ Anti-Chaos parse başarılı
- ✅ Delimiter: `;` tespit edildi
- ✅ Decimal separator: `,` (TR) tespit edildi
- ✅ Dosya kaydedildi
- ✅ UI render etmeye devam etti

---

### Senaryo 2: EN CSV (Virgül Delimiter, İngilizce Decimal)
```csv
Date,Revenue,Expense,Profit
2024-01-01,1234.56,987.65,246.91
2024-01-02,1456.78,1023.45,433.33
2024-01-03,1789.12,1234.56,554.56
```

**Beklenen Sonuç:**
- ✅ Anti-Chaos parse başarılı
- ✅ Delimiter: `,` tespit edildi
- ✅ Decimal separator: `.` (EN) tespit edildi
- ✅ Dosya kaydedildi
- ✅ UI render etmeye devam etti

---

### Senaryo 3: Bozuk CSV (Karışık Veri Tipleri)
```csv
Date,Amount,Notes
2024-01-01,1234.56,Payment
2024-01-02,ABC123,Invalid
2024-01-03,567.89,OK
2024-01-04,N/A,Missing
```

**Beklenen Sonuç:**
- ⚠️ Anti-Chaos uyarılar gösterdi
- ⚠️ Düşük confidence score
- ✅ Fallback yöntem devreye girdi
- ✅ Kullanıcı dostu uyarı mesajı gösterildi
- ✅ UI render etmeye devam etti (sistem çökmedi)
- ✅ Beyaz ekran olmadı

---

## Test Adımları

1. **http://localhost:5173/veri-girisi** sayfasına git
2. Her senaryo için CSV dosyasını sürükle-bırak veya seç
3. Console'da şu logları kontrol et:
   - `✅ Anti-Chaos parse başarılı` veya
   - `📋 Eski parse yöntemi kullanılıyor (fallback)`
4. Hata durumunda:
   - Beyaz ekran olmamalı
   - Kullanıcı dostu mesaj gösterilmeli
   - UI render etmeye devam etmeli

## Başarı Kriterleri

- ✅ Kötü CSV → kullanıcıya anlaşılır uyarı
- ✅ Sistem çökmez
- ✅ Beyaz ekran olmaz
- ✅ UI her zaman render edilir
- ✅ Eski CSV yükleme yolu korunur (fallback)
