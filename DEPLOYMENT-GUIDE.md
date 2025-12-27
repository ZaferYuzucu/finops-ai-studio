# 🚀 FINOPS AI STUDIO - DEPLOYMENT GUIDE

**Tarih:** 27 Aralık 2025  
**Version:** v3 (Beta 3 - Production Ready)  
**Platform:** Vercel (Önerilen)

---

## 📋 ÖN HAZIRLIK

### ✅ Tamamlanmış Olanlar
- [x] Frontend development complete
- [x] Firebase integration active
- [x] Environment variables configured
- [x] SEO optimization done
- [x] Security hardening complete
- [x] v3 backup created (204 MB)
- [x] GitHub repository ready

### 📦 GitHub Repository
```
https://github.com/ZaferYuzucu/finops-ai-studio
Branch: main
Visibility: Public
```

---

## 🔐 ENVIRONMENT VARIABLES (VERCEL)

### 🔥 Firebase Configuration (ZORUNLU)
```
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=finops-ai-studio.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=finops-ai-studio
VITE_FIREBASE_STORAGE_BUCKET=finops-ai-studio.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc...
```

**Nereden Alınır:**
1. Firebase Console: https://console.firebase.google.com/
2. Project Settings → General → Your apps → SDK setup
3. Config object'teki değerleri kopyala

---

### 🔒 reCAPTCHA (ZORUNLU)
```
VITE_RECAPTCHA_SITE_KEY=6Lc...
```

**Nereden Alınır:**
1. Google reCAPTCHA: https://www.google.com/recaptcha/admin
2. Site Key'i kopyala (public key)

---

### 💳 Payment Gateways (OPSİYONEL - Backend Sonrası)
```
VITE_IYZICO_API_KEY=sandbox-xxx
VITE_IYZICO_SECRET_KEY=sandbox-xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
VITE_API_URL=https://api.finops.ist
```

**Not:** Bu değerler backend kurulana kadar gerekli değil.

---

### 📧 Contact & Domain (OPSİYONEL)
```
VITE_CONTACT_EMAIL=info@finops.ist
VITE_DOMAIN=finops.ist
VITE_APP_NAME=FINOPS AI Studio
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

---

## 🚀 VERCEL DEPLOYMENT ADIMLARI

### 1️⃣ YENİ PROJE OLUŞTUR (ÖNERİLEN)

#### Adım 1: Vercel Dashboard
```
1. https://vercel.com/dashboard adresine git
2. "Add New" → "Project" butonuna tıkla
```

#### Adım 2: Import Git Repository
```
3. "Import Git Repository" seçeneğini seç
4. GitHub'dan "finops-ai-studio" reposunu bul
5. "Import" butonuna tıkla
```

#### Adım 3: Configure Project
```
Project Name: finops-ai-studio-production
Framework Preset: Vite (Otomatik tespit edilecek)
Root Directory: ./
Build Command: npm run build (Otomatik)
Output Directory: dist (Otomatik)
Install Command: npm install (Otomatik)
```

#### Adım 4: Environment Variables Ekle
```
6. "Environment Variables" bölümünde:
   - Her bir variable için "Add" buton
   - Name: VITE_FIREBASE_API_KEY
   - Value: (Firebase'den kopyaladığın değer)
   - Environment: Production (hepsini seç)
   
7. Tüm zorunlu değişkenleri ekle:
   ✅ VITE_FIREBASE_API_KEY
   ✅ VITE_FIREBASE_AUTH_DOMAIN
   ✅ VITE_FIREBASE_PROJECT_ID
   ✅ VITE_FIREBASE_STORAGE_BUCKET
   ✅ VITE_FIREBASE_MESSAGING_SENDER_ID
   ✅ VITE_FIREBASE_APP_ID
   ✅ VITE_RECAPTCHA_SITE_KEY
```

#### Adım 5: Deploy!
```
8. "Deploy" butonuna tıkla
9. Build sürecini izle (~2-3 dakika)
10. ✅ Deploy tamamlandı!
```

---

### 2️⃣ ESKİ PROJEYİ KULLAN (Alternatif)

```
1. Eski projeye git
2. Settings → Git → "Disconnect"
3. "Connect Git Repository" → finops-ai-studio seç
4. Settings → Environment Variables → Tümünü güncelle
5. Deployments → "Redeploy" butonuna tıkla
```

---

## 🌐 DOMAIN BAĞLAMA (finops.ist)

### Adım 1: Vercel'de Domain Ekle
```
1. Project → Settings → Domains
2. "Add" butonuna tıkla
3. Domain gir: finops.ist ve www.finops.ist
4. Vercel DNS kayıtlarını gösterecek
```

### Adım 2: DNS Ayarları
```
Domain sağlayıcında (GoDaddy/Namecheap/vb):

A Record:
Name: @
Value: 76.76.21.21 (Vercel IP)

CNAME Record:
Name: www
Value: cname.vercel-dns.com
```

### Adım 3: SSL Sertifikası
```
✅ Otomatik: Vercel Let's Encrypt kullanır
⏱️ Süre: 1-2 saat (DNS propagation)
```

---

## 🧪 DEPLOYMENT SONRASI TEST

### 1. Temel Fonksiyonellik
- [ ] Ana sayfa açılıyor mu?
- [ ] Tüm linkler çalışıyor mu?
- [ ] Responsive tasarım OK mi?
- [ ] İmages yükleniyor mu?

### 2. Firebase Entegrasyonu
- [ ] Kullanıcı kaydı çalışıyor mu?
- [ ] Giriş yapma çalışıyor mu?
- [ ] Dashboard erişimi OK mi?
- [ ] Firestore yazma/okuma OK mi?

### 3. Özel Özellikler
- [ ] reCAPTCHA çalışıyor mu?
- [ ] PDF indirme çalışıyor mu? (İş Planı)
- [ ] PPTX indirme çalışıyor mu? (Sunum)
- [ ] Email formları çalışıyor mu?
- [ ] Sosyal medya linkleri OK mi?

### 4. Performance
- [ ] Lighthouse Score: 90+ (Performance)
- [ ] Lighthouse Score: 90+ (SEO)
- [ ] Lighthouse Score: 90+ (Accessibility)
- [ ] First Load: < 3 saniye

### 5. Security
- [ ] HTTPS aktif mi?
- [ ] CSP headers var mı?
- [ ] XSS koruması aktif mi?
- [ ] API keys gizli mi? (Console'da görünmemeli)

---

## ⚠️ YAYIN SONRASI YAPILMASI GEREKENLER

### 1. Firebase Settings
```
1. Firebase Console → Authentication
2. Authorized domains'e ekle: finops.ist, www.finops.ist
3. Firebase Console → Hosting (eğer kullanılıyorsa)
4. Custom domain ekle
```

### 2. Analytics Kurulumu
```
1. Google Analytics 4 hesabı oluştur
2. Measurement ID al (G-XXXXXXXXXX)
3. Vercel'de environment variable ekle: VITE_GA_MEASUREMENT_ID
4. Redeploy
```

### 3. Monitoring
```
1. Vercel Analytics'i aktifleştir (Built-in)
2. Sentry.io kurulumu (Error tracking)
3. Uptime monitoring (UptimeRobot)
```

### 4. Email Setup
```
1. Domain email kurulumu (info@finops.ist)
2. DMARC, SPF, DKIM kayıtları
3. Email forwarding ayarları
```

---

## 🐛 SORUN GİDERME

### Build Hatası
```
Hata: "Firebase configuration is missing"
Çözüm: Environment variables'ları kontrol et
```

### 404 Hataları
```
Hata: Sayfa yenilediğinde 404
Çözüm: vercel.json dosyası var mı kontrol et
```

### Environment Variables Çalışmıyor
```
Hata: Variables undefined
Çözüm: 
1. Tüm variables "VITE_" ile başlamalı
2. Redeploy gerekli (Variables'lar build-time'da inject edilir)
```

### Firebase Authentication Hatası
```
Hata: "Domain not authorized"
Çözüm: Firebase Console → Authentication → Settings → Authorized domains
```

---

## 📊 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [x] v3 Backup alındı
- [x] GitHub repo güncellendi
- [x] Environment variables hazırlandı
- [x] Firebase config doğrulandı
- [x] Build local'de test edildi

### Deployment
- [ ] Vercel projesine import edildi
- [ ] Environment variables eklendi
- [ ] İlk deployment başarılı
- [ ] Production URL çalışıyor

### Post-Deployment
- [ ] Tüm sayfalar test edildi
- [ ] Firebase entegrasyonu test edildi
- [ ] Domain bağlandı (finops.ist)
- [ ] SSL sertifikası aktif
- [ ] Analytics kuruldu
- [ ] Performance test yapıldı

---

## 📞 DESTEK

**Sorun mu yaşıyorsunuz?**

1. Build logs'u inceleyin: Vercel → Deployments → Build Logs
2. Browser console'u kontrol edin (F12)
3. Firebase Rules'u kontrol edin
4. Environment variables'ı doğrulayın

---

## 🎉 BAŞARILAR!

Deployment tamamlandığında:
- Production URL: https://finops-ai-studio-production.vercel.app
- Custom Domain: https://finops.ist (DNS sonrası)
- Deployment sürekli: Her push'ta otomatik deploy

---

**Son Güncelleme:** 27 Aralık 2025  
**Status:** Ready for Deployment  
**Next Step:** Vercel'de yeni proje oluştur!

