# 🤖 SESSION TRACKER SİSTEMİ

## 📍 Bu Dosya Ne İşe Yarar?

`.session-tracker.json` dosyası, AI asistanın session log'ları otomatik güncellemesi için kullanılır.

## ⚙️ Sistem Ayarları

```json
{
  "updateIntervalMinutes": 15,  // Her 15 dakikada kontrol
  "autoUpdateEnabled": true      // Otomatik güncelleme AÇIK
}
```

## 🔄 Nasıl Çalışır?

1. **Her mesajda kontrol:** Sen mesaj attığında AI kontrol eder
2. **Zaman kontrolü:** Son güncelleme üzerinden 15+ dakika geçti mi?
3. **Otomatik güncelleme:** Geçtiyse sessizce session log güncellenir
4. **Timestamp güncelleme:** `.session-tracker.json` güncellenir

## 📊 Takip Edilen Bilgiler

- `lastUpdate`: Son güncelleme zamanı
- `sessionStartTime`: Oturum başlangıç zamanı
- `currentSessionDate`: Mevcut session tarihi
- `totalUpdates`: Toplam güncelleme sayısı
- `lastLogFile`: Son güncellenen log dosyası

## 🛠️ Manuel Güncelleme

Eğer zorla güncellemek istersen:

```bash
# Tracker'ı sıfırla (bir sonraki mesajda kesin günceller)
echo '{"lastUpdate":"2000-01-01T00:00:00.000Z"}' > .session-tracker.json
```

## 🔍 Log'ları Kontrol Et

```bash
# Son güncelleme zamanını gör
cat .session-tracker.json | grep lastUpdate

# Toplam güncelleme sayısı
cat .session-tracker.json | grep totalUpdates
```

## ⚠️ Önemli Notlar

- Bu dosyayı **SİLME** (sistem çalışmaz)
- Elle düzenleme yapma (JSON formatı bozulur)
- Git'e commit etme gereği yok (local tracking)

## 🎯 Sistem Durumu

✅ **AKTİF** - Otomatik güncelleme çalışıyor  
🕐 **İnterval:** 15 dakika  
📝 **Log Dosyası:** SESSION-LOG-2025-12-26.md

---

**Oluşturulma:** 26 Aralık 2025, 12:05  
**Versiyon:** 1.0










