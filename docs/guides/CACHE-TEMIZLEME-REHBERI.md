# 🚨 CACHE TEMİZLEME REHBERİ

## ⚠️ NE ZAMAN CACHE TEMİZLENMELİ?

Şu durumlarda **mutlaka** cache temizlenmeli:

- ✅ Yeni özellik eklendi ama göremiyorsunuz
- ✅ Kod değişikliği yaptınız ama eskisi gözüküyor
- ✅ Tab/buton eklediniz ama görünmüyor
- ✅ Sayfa düzgün yüklenmiyor / beyaz ekran
- ✅ Eski veriler görünüyor
- ✅ CSS değişiklikleri uygulanmıyor

---

## 🔧 SUNUCU CACHE TEMİZLEME

### Adım 1: Vite Sunucusunu Durdur

```bash
pkill -f "vite"
```

### Adım 2: Cache Klasörlerini Sil

```bash
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio
rm -rf node_modules/.vite
rm -rf .vite
```

### Adım 3: Sunucuyu Yeniden Başlat

```bash
npm run dev
```

### 🚀 Tek Komutta:

```bash
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio && pkill -f "vite" && rm -rf node_modules/.vite && rm -rf .vite && npm run dev
```

---

## 🌐 TARAYICI CACHE TEMİZLEME

### ⚡ Hızlı Yöntem: Hard Refresh

**Mac:**
- **Chrome/Brave/Edge:** ⌘ + Shift + R
- **Safari:** ⌘ + Option + R

**Windows:**
- **Chrome/Edge:** Ctrl + Shift + R
- **Firefox:** Ctrl + F5

---

### 🔥 Tam Temizlik: Developer Tools

**Chrome/Brave/Edge:**

1. **F12** (Developer Tools açın)
2. **Network** tab'ına gidin
3. **"Disable cache"** kutucuğunu işaretleyin
4. Sayfaya **sağ tık** → **"Empty Cache and Hard Reload"**

**Veya:**

1. **⌘ + Shift + Delete** (Mac) / **Ctrl + Shift + Delete** (Windows)
2. **"Cached images and files"** seçin
3. **"Clear data"** butonuna basın

---

### 🕵️ Gizli Pencere (En Garanti Yöntem)

**Mac:** ⌘ + Shift + N  
**Windows:** Ctrl + Shift + N

Gizli pencerede cache yoktur, her zaman temiz yükleme yapar!

```
http://localhost:5173/admin-login
```

---

## 📋 TEMİZLEME KONTROL LİSTESİ

Büyük güncellemelerden sonra şunları yapın:

### ✅ Sunucu Tarafı
- [ ] Vite sunucusunu durdur
- [ ] `.vite` klasörünü sil
- [ ] `node_modules/.vite` klasörünü sil
- [ ] Sunucuyu yeniden başlat
- [ ] Terminalde "ready" mesajını gör

### ✅ Tarayıcı Tarafı
- [ ] Hard Refresh (⌘ + Shift + R)
- [ ] Developer Tools → Disable cache
- [ ] Cache temizle (⌘ + Shift + Delete)
- [ ] Veya gizli pencere aç

### ✅ Test
- [ ] Ana sayfayı aç
- [ ] Yeni özellikleri kontrol et
- [ ] Console'da hata var mı bak (F12)

---

## 🚨 HALA SORUN VARSA

### 1. Node Modules'ı Yeniden Yükle

```bash
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio
rm -rf node_modules
npm install
npm run dev
```

### 2. Tarayıcı Verilerini Tamamen Sil

**Chrome:**
- Settings → Privacy and security
- Clear browsing data
- **All time** seçin
- Cookies, cache, everything!

### 3. Farklı Tarayıcı Dene

- Chrome → Safari
- Safari → Firefox
- Veya gizli pencere

---

## 💡 PROFESYONEL İPUÇLARI

### Geliştirme Sırasında:

1. **Developer Tools'u açık tutun (F12)**
2. **"Disable cache"** işaretli bırakın
3. Her değişiklikten sonra **Hard Refresh**

### Büyük Güncellemelerden Sonra:

1. **Sunucu cache'i temizle**
2. **Tarayıcı cache'i temizle**
3. **Gizli pencerede test et**
4. **Başka tarayıcıda da test et**

### Cache Sorunu Önleme:

```javascript
// vite.config.ts içinde
export default defineConfig({
  server: {
    watch: {
      usePolling: true, // Dosya değişikliklerini daha iyi algılar
    },
  },
  build: {
    sourcemap: true, // Debug için
  },
});
```

---

## 🎯 ÖZET

**En Hızlı Yöntem (90% işe yarar):**
```bash
# Terminal
pkill -f "vite" && cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio && rm -rf .vite node_modules/.vite && npm run dev
```

**Tarayıcı:**
```
⌘ + Shift + R (Mac) veya Ctrl + Shift + R (Windows)
```

**Garantili Yöntem:**
```
Gizli Pencere (⌘ + Shift + N)
```

---

**Her büyük güncelleme sonrası bu rehberi takip edin!**

**Son Güncelleme:** 26 Aralık 2025, 14:30









