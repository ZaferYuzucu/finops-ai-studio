# 💳 ÖDEME SİSTEMİ KOMPLE KURULUM REHBERİ
**FINOPS AI Studio - Sıfırdan Production'a Tam Kılavuz**

Bu dokümanda **TAMAMEN SIFIRDAN** başlayarak production'a hazır ödeme sistemi kurulumu anlatılmaktadır.

---

## 📋 GENEL SÜREÇ (KRONOLOJİK SIRA)

```
1️⃣ ŞİRKET HAZIRLIKLARI (1-2 Hafta)
   └─ Şirket belgelerini hazırla
   └─ Banka hesabı aç (ticari)

2️⃣ İYZİCO/STRIPE BAŞVURU (3-5 Gün)
   └─ Hesap oluştur
   └─ Belge yükle
   └─ Onay bekle

3️⃣ API KEY'LERİ AL (Onaydan Sonra)
   └─ iyzico: API Key + Secret Key
   └─ Stripe: Publishable Key + Secret Key

4️⃣ BACKEND API YARAT (1-2 Gün)
   └─ Node.js server kur
   └─ API endpoint'leri oluştur
   └─ API key'leri entegre et

5️⃣ WEBHOOK KURULUMU (1 Gün)
   └─ Backend webhook endpoint'i hazırla
   └─ iyzico/Stripe'a webhook URL'i kaydet
   └─ Test et

6️⃣ BANKA BİLGİLERİNİ GÜNCELLE (10 Dakika)
   └─ Kod içinde banka IBAN'ını güncelle
   └─ Para bu hesaba gelecek

7️⃣ TEST & DEPLOY (2-3 Gün)
   └─ Test ödemeleri yap
   └─ Production'a al
```

---

## 1️⃣ ŞİRKET HAZIRLIKLARI

### A) Gerekli Belgeler

**Şirket İseniz:**
- ✅ Vergi Levhası
- ✅ Ticaret Sicil Gazetesi
- ✅ İmza Sirküleri
- ✅ Faaliyet Belgesi
- ✅ Şirket Yetkili Kimliği

**Şahıs İseniz (Şahıs Şirketi/Serbest Meslek):**
- ✅ Vergi Levhası
- ✅ Kimlik (TC Kimlik Kartı)
- ✅ İkametgah Belgesi
- ✅ Meslek Odası Belgesi (varsa)

### B) Ticari Banka Hesabı

**Neden Gerekli?**
- Ödeme sağlayıcılar (iyzico/Stripe) parayı **sizin ticari hesabınıza** gönderir
- Şahsi hesap KABUL EDİLMEZ (ticari işlem için)

**Hangi Bankalar İyi?**
- Ziraat Bankası (düşük komisyon, yaygın)
- İş Bankası (teknoloji dostu)
- QNB Finansbank (online işlemler kolay)
- Garanti BBVA (API entegrasyonları var)

**Hesap Açma Süresi:** 1-2 gün

---

## 2️⃣ İYZİCO BAŞVURUSU (ADIM ADIM)

### Adım 1: Kayıt Ol

1. **Web sitesi:** https://merchant.iyzipay.com/auth/register
2. **Formu doldur:**
   - E-posta adresi
   - Şifre
   - Şirket adı
   - Telefon
3. **Onay maili** gelecek, tıkla

### Adım 2: Belgeleri Yükle

1. **Merchant Panel'e giriş yap**
2. **Hesap Ayarları** → **Doğrulama**
3. **Belgeleri yükle:**
   - Vergi Levhası (PDF/JPG)
   - Ticaret Sicil Gazetesi (PDF)
   - İmza Sirküleri (PDF)
   - Yetkili Kimliği (JPG)

### Adım 3: Banka Bilgilerini Gir

1. **Finansal Bilgiler** menüsüne git
2. **Ticari Banka Hesabı** bilgilerini gir:
   - Banka adı: Ziraat Bankası
   - IBAN: TR00 0001 0000 ...
   - Hesap sahibi: ŞİRKET ADINIZ A.Ş.
   - Şube kodu: 1234

⚠️ **ÖNEMLİ:** Bu hesaba **iyzico'dan gelen ödemeler** yatacak!

### Adım 4: Onay Bekle

- **Süre:** 1-3 iş günü
- **Bildirim:** E-posta ile bilgilendirilirsiniz
- **Sonuç:**
  - ✅ Onaylandı → API key'leri alabilirsiniz
  - ❌ Reddedildi → Eksik belge varsa tamamlayın

### Adım 5: API Key'leri Al

**Onaydan Sonra:**

1. **Merchant Panel** → **Ayarlar** → **API Anahtarları**
2. **Sandbox Keys (Test için):**
   - API Key: `sandbox-abc123xyz...`
   - Secret Key: `sandbox-secret-def456...`
3. **Production Keys (Canlı için):**
   - API Key: `live-ghi789jkl...`
   - Secret Key: `live-secret-mno012...`

📋 **Bu key'leri kopyala ve GÜVENLİ bir yere kaydet!**

---

## 3️⃣ STRIPE BAŞVURUSU (ADIM ADIM)

### Adım 1: Kayıt Ol

1. **Web sitesi:** https://dashboard.stripe.com/register
2. **Formu doldur:**
   - E-posta
   - Şifre
   - Ülke: Turkey
3. **Onay maili** gelecek

### Adım 2: İşletme Bilgileri

1. **Dashboard** → **Settings** → **Business details**
2. **Bilgileri gir:**
   - Legal business name: ŞİRKET ADINIZ A.Ş.
   - Business type: Company
   - Industry: Software
   - Website: https://yoursite.com
   - Phone number: +90 ...

### Adım 3: Banka Bilgileri

1. **Settings** → **Payouts** → **Bank account**
2. **Türkiye Banka Hesabı:**
   - Country: Turkey
   - Currency: TRY (Turkish Lira)
   - Account holder name: ŞİRKET ADINIZ
   - IBAN: TR00 0001 0000 ...

⚠️ **ÖNEMLİ:** Bu hesaba **Stripe'dan gelen ödemeler** yatacak!

### Adım 4: Kimlik Doğrulama

1. **Identity verification** bölümüne git
2. **Yetkili kişi bilgileri:**
   - Ad Soyad
   - TC Kimlik No
   - Doğum tarihi
   - Adres
3. **Kimlik belgesi yükle** (ön-arka)

### Adım 5: Onay Bekle

- **Test Modu:** HEMEN kullanabilirsiniz (test kartları ile)
- **Production Modu:** 1-2 gün onay süresi

### Adım 6: API Key'leri Al

**Test Modu (Hemen):**

1. **Dashboard** → **Developers** → **API keys**
2. **Test Keys:**
   - Publishable key: `pk_test_abc123...`
   - Secret key: `sk_test_xyz789...`

**Production Modu (Onaydan Sonra):**

1. **Dashboard** → **Developers** → **API keys**
2. **Live mode** toggle'ı aç
3. **Live Keys:**
   - Publishable key: `pk_live_def456...`
   - Secret key: `sk_live_ghi789...`

📋 **Bu key'leri kopyala ve GÜVENLİ bir yere kaydet!**

---

## 4️⃣ .ENV DOSYASINI GÜNCELLE

API key'leri aldıktan sonra:

```bash
cd /Users/zaferyuzucu/FINOPSPROJESİ/finops-ai-studio
nano .env
```

**Ekle:**
```env
# İyzico API Keys
VITE_IYZICO_API_KEY=live-ghi789jkl...
VITE_IYZICO_SECRET_KEY=live-secret-mno012...

# Stripe API Keys
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_def456...
VITE_STRIPE_SECRET_KEY=sk_live_ghi789...

# Environment
VITE_NODE_ENV=production
```

⚠️ **UYARI:** `.env` dosyası Git'e gitmemeli! (.gitignore'da olmalı)

---

## 5️⃣ BACKEND API OLUŞTURMA

### Neden Backend Gerekli?

**Güvenlik:**
- ❌ Frontend'de Secret Key kullanılamaz (herkes görür!)
- ✅ Backend'de Secret Key güvenli şekilde saklanır
- ✅ Ödeme işlemleri backend üzerinden yapılır

**Webhook:**
- iyzico/Stripe'dan gelen callback'leri backend alır
- Database'i günceller (subscription aktifleştir)

### A) Backend Dizini Oluştur

```bash
mkdir /Users/zaferyuzucu/FINOPSPROJESİ/finops-backend
cd finops-backend
npm init -y
```

### B) Gerekli Paketleri Yükle

```bash
npm install express cors dotenv
npm install iyzipay stripe
npm install firebase-admin
npm install body-parser
```

### C) Dosya Yapısı

```
finops-backend/
├── .env
├── .gitignore
├── package.json
├── server.js
└── api/
    ├── payment/
    │   ├── iyzico.js
    │   ├── stripe.js
    │   └── bankTransfer.js
    └── utils/
        ├── activateSubscription.js
        └── sendEmail.js
```

### D) .env Dosyası (Backend)

```env
# iyzico
IYZICO_API_KEY=live-ghi789jkl...
IYZICO_SECRET_KEY=live-secret-mno012...

# Stripe
STRIPE_SECRET_KEY=sk_live_ghi789...
STRIPE_WEBHOOK_SECRET=whsec_abc123...

# Firebase
FIREBASE_PROJECT_ID=finops-ai-studio-8576334-ece74
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@...

# Server
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://finops-ai-studio.vercel.app
```

### E) server.js

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/payment/iyzico', require('./api/payment/iyzico'));
app.use('/api/payment/stripe', require('./api/payment/stripe'));
app.use('/api/payment/bank-transfer', require('./api/payment/bankTransfer'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on port ${PORT}`);
});
```

### F) api/payment/iyzico.js

```javascript
const express = require('express');
const Iyzipay = require('iyzipay');
const { activateSubscription } = require('../utils/activateSubscription');

const router = express.Router();

// iyzico config
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.NODE_ENV === 'production'
    ? 'https://api.iyzipay.com'
    : 'https://sandbox-api.iyzipay.com',
});

// Initialize payment
router.post('/initialize', async (req, res) => {
  const { planType, amount, billingPeriod, userId, userEmail } = req.body;

  const paymentRequest = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: `${userId}_${Date.now()}`,
    price: amount.toString(),
    paidPrice: amount.toString(),
    currency: Iyzipay.CURRENCY.TRY,
    basketId: `basket_${userId}`,
    paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
    callbackUrl: `${process.env.FRONTEND_URL}/api/payment/iyzico/callback`,
    buyer: {
      id: userId,
      name: 'User',
      surname: 'Name',
      email: userEmail,
      identityNumber: '11111111111',
      registrationAddress: 'Address',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34000',
      ip: req.ip || '127.0.0.1',
    },
    shippingAddress: {
      address: 'Address',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34000',
    },
    billingAddress: {
      address: 'Address',
      city: 'Istanbul',
      country: 'Turkey',
      zipCode: '34000',
    },
    basketItems: [
      {
        id: `item_${planType}`,
        name: `FINOPS ${planType} Plan`,
        category1: 'Subscription',
        itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
        price: amount.toString(),
      },
    ],
  };

  iyzipay.checkoutFormInitialize.create(paymentRequest, (err, result) => {
    if (err) {
      console.error('iyzico error:', err);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      status: 'success',
      paymentPageUrl: result.paymentPageUrl,
      token: result.token,
    });
  });
});

// Callback (webhook)
router.post('/callback', async (req, res) => {
  const { token } = req.body;

  iyzipay.checkoutForm.retrieve({ token }, async (err, result) => {
    if (err) {
      console.error('iyzico callback error:', err);
      return res.redirect(`${process.env.FRONTEND_URL}/pricing?payment=failed`);
    }

    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      // ✅ Ödeme başarılı
      const conversationId = result.conversationId;
      const userId = conversationId.split('_')[0];

      await activateSubscription(userId, result.metadata?.planType);

      res.redirect(`${process.env.FRONTEND_URL}/dashboard?payment=success`);
    } else {
      // ❌ Ödeme başarısız
      res.redirect(`${process.env.FRONTEND_URL}/pricing?payment=failed`);
    }
  });
});

module.exports = router;
```

### G) api/payment/stripe.js

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { activateSubscription } = require('../utils/activateSubscription');

const router = express.Router();

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  const { planType, amount, billingPeriod, userId, userEmail } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'try',
            product_data: {
              name: `FINOPS ${planType} Plan`,
              description: `${billingPeriod} subscription`,
            },
            unit_amount: amount * 100, // Kuruş cinsinden
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing?payment=cancelled`,
      customer_email: userEmail,
      metadata: {
        userId,
        planType,
        billingPeriod,
      },
    });

    res.json({
      status: 'success',
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // ✅ Ödeme başarılı
    await activateSubscription(
      session.metadata.userId,
      session.metadata.planType
    );
  }

  res.json({ received: true });
});

module.exports = router;
```

### H) api/utils/activateSubscription.js

```javascript
const admin = require('firebase-admin');

// Firebase Admin SDK init
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

async function activateSubscription(userId, planType) {
  try {
    const subscriptionRef = db.collection('subscriptions').doc(userId);

    await subscriptionRef.set({
      userId,
      planType,
      status: 'Active',
      startDate: admin.firestore.FieldValue.serverTimestamp(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün
      paymentStatus: 'Paid',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log(`✅ Subscription activated for user: ${userId}`);
    return { success: true };
  } catch (error) {
    console.error('Activate subscription error:', error);
    throw error;
  }
}

module.exports = { activateSubscription };
```

### I) Backend'i Çalıştır

```bash
node server.js
```

**Çıktı:**
```
✅ Backend server running on port 3001
```

---

## 6️⃣ WEBHOOK KURULUMU

### A) İyzico Webhook

1. **Merchant Panel** → **Ayarlar** → **Webhook/Callback URL**
2. **URL gir:**
   ```
   https://your-backend.com/api/payment/iyzico/callback
   ```
3. **Kaydet**

### B) Stripe Webhook

1. **Dashboard** → **Developers** → **Webhooks**
2. **Add endpoint** tıkla
3. **URL gir:**
   ```
   https://your-backend.com/api/payment/stripe/webhook
   ```
4. **Events seç:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`
5. **Webhook Secret kopyala:** `whsec_abc123...`
6. **Backend .env'e ekle:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_abc123...
   ```

---

## 7️⃣ BANKA TRANSFERİ HESAP BİLGİLERİ

### Soru: "Sitemin içine banka bilgilerimi girmem mi gerekiyor?"

**CEVAP: EVET!** Ama sadece **IBAN numarası** (güvenli).

### Nerede Güncellenir?

**Dosya:** `src/components/payment/BankTransferPayment.tsx`

```typescript
// Satır 40 civarı
const BANK_ACCOUNTS = [
  {
    bank: 'Ziraat Bankası',
    accountName: 'FINOPS AI STUDIO TEKNOLOJİ A.Ş.',  // ← Şirket adınız
    iban: 'TR00 0001 0000 0000 0000 0000 01',        // ← IBAN'ınız
    swift: 'TCZBTR2AXXX',
    branch: 'İstanbul Merkez Şubesi',
  },
  {
    bank: 'İş Bankası',
    accountName: 'FINOPS AI STUDIO TEKNOLOJİ A.Ş.',  // ← Şirket adınız
    iban: 'TR00 0006 4000 0000 0000 0000 01',        // ← IBAN'ınız
    swift: 'ISBKTRISXXX',
    branch: 'İstanbul Kurumsal Şubesi',
  },
];
```

### Ne Olacak?

1. Kullanıcı "Banka Transferi" seçer
2. **Sizin IBAN'ınızı** görür
3. Kendi bankasından **sizin hesabınıza** transfer yapar
4. Transfer bilgilerini siteye bildirir
5. Siz manuel olarak onaylarsınız
6. Aboneliği aktifleştirirsiniz

---

## 8️⃣ PARA AKIŞI (NASIL ÇALIŞIR?)

### A) İYZİCO İLE ÖDEME

```
[Kullanıcı]
    ↓ Kart bilgisi girer
[iyzico Ödeme Sayfası]
    ↓ 3D Secure onay
[Banka] (Kullanıcının Bankası)
    ↓ Para çekilir: 599 TL
[iyzico]
    ↓ Komisyon keser: 15.17 TL
[SİZİN BANKA HESABINIZ] 
    ↓ Net para gelir: 583.83 TL
    ↓ Para otomatik yatar (2-3 gün)
```

**İyzico'ya Verdiğiniz Banka Hesabı:**
- Başvuru sırasında verdiğiniz **ticari hesap**
- Para otomatik olarak **oraya** yatar
- Günlük/haftalık toplu ödeme

### B) STRIPE İLE ÖDEME

```
[Kullanıcı]
    ↓ Kart bilgisi girer
[Stripe Checkout]
    ↓ Ödeme onayı
[Banka] (Kullanıcının Bankası)
    ↓ Para çekilir: 599 TL
[Stripe]
    ↓ Komisyon keser: 22.37 TL
[SİZİN BANKA HESABINIZ]
    ↓ Net para gelir: 576.63 TL
    ↓ Para otomatik yatar (7 gün)
```

**Stripe'a Verdiğiniz Banka Hesabı:**
- Dashboard'da eklediğiniz **IBAN**
- Para otomatik olarak **oraya** yatar
- Haftalık/aylık toplu ödeme

### C) BANKA TRANSFERİ

```
[Kullanıcı]
    ↓ Kendi bankasına girer
[Kullanıcının Bankası]
    ↓ EFT/Havale yapar
[SİZİN BANKA HESABINIZ]
    ↓ Para DIREKT gelir: 599 TL
    ↓ Komisyon: 0 TL
    ↓ Net: 599 TL
```

**Kod İçindeki Banka Hesabı:**
- Siteye girdiğiniz **IBAN**
- Kullanıcı **direkt oraya** transfer yapar
- **En karlı** yöntem (komisyon yok)

---

## 9️⃣ ÖZET: KİM NEREYE PARA YATIRIR?

| Ödeme Yöntemi | Para Nereye Gider? | Komisyon | Net Gelir |
|---------------|-------------------|----------|-----------|
| **iyzico** | iyzico'ya kaydettiğiniz ticari hesap | %2.49 + 0.25 TL | 583.83 TL (599 TL'den) |
| **Stripe** | Stripe'a kaydettiğiniz IBAN | %3.4 + 2 TL | 576.63 TL (599 TL'den) |
| **Banka Transferi** | Sitede yazdığınız IBAN | 0 TL | 599 TL |

### Aynı Hesap Olabilir mi?

**EVET!** Aynı ticari hesabı **her 3 yöntemde** kullanabilirsiniz:

```
ZIRAAT BANKASI - TİCARİ HESAP
IBAN: TR00 0001 0000 0000 0000 0000 01
    ↑
    ├─ iyzico'ya verdiniz
    ├─ Stripe'a verdiniz
    └─ Sitede yazdınız (banka transferi için)
```

---

## 🔟 KONTROL LİSTESİ

### Başlamadan Önce:
- [ ] Şirket belgeleri hazır
- [ ] Ticari banka hesabı açık
- [ ] Web sitesi canlı (SSL ile)

### İyzico:
- [ ] merchant.iyzipay.com'dan kayıt
- [ ] Belgeleri yükle
- [ ] Banka hesabı bilgisi gir
- [ ] Onay bekle (1-3 gün)
- [ ] API key'leri al
- [ ] .env'e ekle

### Stripe:
- [ ] dashboard.stripe.com'dan kayıt
- [ ] İşletme bilgileri gir
- [ ] Banka IBAN'ı ekle
- [ ] Kimlik doğrula
- [ ] Onay bekle (1-2 gün)
- [ ] API key'leri al
- [ ] .env'e ekle

### Backend:
- [ ] Node.js backend oluştur
- [ ] API endpoint'leri yaz
- [ ] Firebase Admin SDK entegre
- [ ] Test et (localhost)
- [ ] Deploy et (Heroku/Vercel)

### Webhook:
- [ ] Backend webhook endpoint'i hazır
- [ ] iyzico'ya URL kaydet
- [ ] Stripe'a URL kaydet
- [ ] Webhook secret ekle (.env)
- [ ] Test et

### Banka Transferi:
- [ ] BankTransferPayment.tsx'te IBAN güncelle
- [ ] Firestore koleksiyonu kontrol et
- [ ] Admin onay sistemi kur

### Test:
- [ ] iyzico test kartı ile dene
- [ ] Stripe test kartı ile dene
- [ ] Banka transferi simülasyonu
- [ ] Webhook'ları test et

### Production:
- [ ] Test moddan production'a geç
- [ ] Gerçek API key'leri kullan
- [ ] SSL sertifikası aktif
- [ ] Güvenlik kontrolleri
- [ ] Yedekleme stratejisi

---

## ❓ SIKÇA SORULAN SORULAR

### 1. "Backend olmadan çalışır mı?"
**HAYIR.** Güvenlik nedeniyle backend şart. Secret key'ler frontend'de olamaz.

### 2. "iyzico ve Stripe ikisini de kullanmalı mıyım?"
**İsteğe bağlı.** Türkiye için sadece iyzico yeterli. Uluslararası müşteri varsa Stripe ekleyin.

### 3. "Banka transferi için ne yapmalıyım?"
Sadece IBAN'ınızı kod içine yazın. Kullanıcılar oraya transfer yapar. Manuel onay gerekir.

### 4. "Webhook neden gerekli?"
Ödeme başarılı olduğunda iyzico/Stripe size haber verir. Backend bunu yakalar ve aboneliği aktifleştirir.

### 5. "Para ne zaman hesabıma gelir?"
- **iyzico:** 2-3 gün
- **Stripe:** 7 gün
- **Banka Transferi:** Anında (kullanıcı gönderdiğinde)

### 6. "Komisyonlar çok yüksek, ne yapmalıyım?"
Banka transferini teşvik edin (komisyon 0). Veya müşteri sayısı artınca iyzico/Stripe ile pazarlık yapın.

### 7. "Test modunda gerçek para çekilir mi?"
**HAYIR.** Test modu tamamen simülasyon. Gerçek para hareket etmez.

---

## 📞 DESTEK

**iyzico Destek:**
- Web: https://www.iyzico.com/iletisim
- Tel: 0850 259 60 69
- E-posta: destek@iyzico.com

**Stripe Destek:**
- Web: https://support.stripe.com
- E-posta: support@stripe.com
- Dashboard: Live chat var

---

## ✅ SON KONTROL

**Başlamaya hazır mısınız?**

1. ✅ Şirket belgeleri hazır → İyzico/Stripe'a başvur
2. ✅ API key'ler alındı → .env'e ekle
3. ✅ Backend yazıldı → Test et
4. ✅ Webhook kuruldu → Test et
5. ✅ Banka bilgileri güncellendi → Kontrol et
6. ✅ Her şey test edildi → Production'a al!

---

**🎉 BAŞARILAR DİLERİZ!**

Bu rehberi takip ederseniz hiçbir sorun yaşamazsınız. Sorularınız için tekrar sormaktan çekinmeyin!

---

*Hazırlayan: Claude Sonnet 4.5 AI Assistant*  
*Tarih: 27 Aralık 2025*  
*Versiyon: 1.0 - Complete Guide*




