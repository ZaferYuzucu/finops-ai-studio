# 💳 ÖDEME SİSTEMİ KURULUM KILAVUZU
**FINOPS AI Studio - Payment Gateway Integration**

Bu dokümantasyon, ödeme sistemini production'a hazır hale getirmek için gereken tüm adımları içermektedir.

---

## 📋 İÇİNDEKİLER

1. [Sistem Mimarisi](#sistem-mimarisi)
2. [iyzico Kurulumu](#iyzico-kurulumu)
3. [Stripe Kurulumu](#stripe-kurulumu)
4. [Kredi Kartı (Direkt) Kurulumu](#kredi-kartı-direkt)
5. [Banka Transferi Yönetimi](#banka-transferi-yönetimi)
6. [Backend API Endpoint'leri](#backend-api-endpointleri)
7. [Güvenlik ve Uyumluluk](#güvenlik-ve-uyumluluk)
8. [Maliyet Analizi](#maliyet-analizi)
9. [Test Modu](#test-modu)
10. [Troubleshooting](#troubleshooting)

---

## 🏗️ SİSTEM MİMARİSİ

```
[Kullanıcı] → [Payment Checkout Page]
                      ↓
            ┌─────────┴──────────┐
            │  Ödeme Yöntemi     │
            │     Seçimi         │
            └─────────┬──────────┘
                      ↓
        ┌─────────────┴────────────────┐
        │                              │
    [iyzico]  [Stripe]  [Credit]  [Bank]
        │         │        │         │
        ↓         ↓        ↓         ↓
    [3D Secure] [Checkout] [Gateway] [Manuel]
        │         │         │          │
        └─────────┴─────────┴──────────┘
                      ↓
              [Payment Webhook]
                      ↓
              [Database Update]
                      ↓
          [Subscription Activation]
```

---

## 💳 İYZİCO KURULUMU

### 1. Hesap Oluşturma

**Adım 1:** [https://merchant.iyzipay.com/auth/register](https://merchant.iyzipay.com/auth/register) adresinden kayıt olun

**Adım 2:** Gerekli Belgeler:
- Vergi Levhası
- İmza Sirküleri
- Faaliyet Belgesi
- Ticaret Sicil Gazetesi (Şirket ise)

**Adım 3:** Onay Süresi: 1-3 iş günü

### 2. API Key Alma

1. Merchant Panel'e giriş yapın
2. `Ayarlar` → `API Anahtarları` menüsüne gidin
3. **Sandbox** ve **Production** key'leri alın:
   - API Key: `sandbox-abc123...`
   - Secret Key: `sandbox-secret-xyz789...`

### 3. Entegrasyon

**.env dosyasına ekleyin:**
```env
VITE_IYZICO_API_KEY=sandbox-abc123...
VITE_IYZICO_SECRET_KEY=sandbox-secret-xyz789...
```

**Backend API Endpoint oluşturun:** `/api/payment/iyzico/initialize`

```javascript
// /api/payment/iyzico/initialize
const Iyzipay = require('iyzipay');

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_SECRET_KEY,
  uri: process.env.NODE_ENV === 'production' 
    ? 'https://api.iyzipay.com' 
    : 'https://sandbox-api.iyzipay.com'
});

// Payment Request
const paymentRequest = {
  locale: Iyzipay.LOCALE.TR,
  conversationId: 'unique-id',
  price: '100.00',
  paidPrice: '100.00',
  currency: Iyzipay.CURRENCY.TRY,
  basketId: 'basket-id',
  paymentGroup: Iyzipay.PAYMENT_GROUP.SUBSCRIPTION,
  callbackUrl: 'https://yoursite.com/api/payment/iyzico/callback',
  buyer: {
    id: user.id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    identityNumber: '11111111111',
    registrationAddress: 'Address',
    city: 'Istanbul',
    country: 'Turkey',
    zipCode: '34000',
    ip: req.ip
  },
  shippingAddress: { /* ... */ },
  billingAddress: { /* ... */ },
  basketItems: [
    {
      id: 'BI101',
      name: 'FINOPS Premium Plan',
      category1: 'Subscription',
      itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
      price: '100.00'
    }
  ]
};

iyzipay.checkoutFormInitialize.create(paymentRequest, (err, result) => {
  if (err) {
    return res.status(500).json({ error: err });
  }
  res.json({
    status: 'success',
    paymentPageUrl: result.paymentPageUrl,
    token: result.token
  });
});
```

### 4. Webhook Oluşturma

`/api/payment/iyzico/callback` endpoint'ini oluşturun:

```javascript
app.post('/api/payment/iyzico/callback', (req, res) => {
  const { token } = req.body;
  
  iyzipay.checkoutForm.retrieve({ token }, async (err, result) => {
    if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
      // ✅ Ödeme başarılı
      await activateSubscription(result.conversationId);
      res.redirect('/dashboard?payment=success');
    } else {
      // ❌ Ödeme başarısız
      res.redirect('/pricing?payment=failed');
    }
  });
});
```

### 5. Maliyet

- **Kurulum:** ÜCRETSİZ
- **Komisyon:** %2.49 + 0.25 TL (işlem başına)
- **Aylık Üyelik:** YOK
- **3D Secure:** DAHİL

**Örnek Hesaplama:**
- 599 TL ödeme → 14.92 TL + 0.25 TL = **15.17 TL komisyon**
- Net gelir: **583.83 TL**

---

## 🌐 STRIPE KURULUMU

### 1. Hesap Oluşturma

**Adım 1:** [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register) adresinden kayıt olun

**Adım 2:** Gerekli Bilgiler:
- İşletme Adı
- Web Sitesi URL'i
- Vergi Numarası
- Banka Hesap Bilgileri (para çekmek için)

**Adım 3:** Onay: Anında (test modu), 1-2 gün (production)

### 2. API Key Alma

1. Dashboard'a giriş yapın
2. `Developers` → `API keys` menüsüne gidin
3. Key'leri kopyalayın:
   - Publishable key: `pk_test_...` veya `pk_live_...`
   - Secret key: `sk_test_...` veya `sk_live_...`

### 3. NPM Paketleri

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

### 4. Entegrasyon

**.env dosyasına ekleyin:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_STRIPE_SECRET_KEY=sk_test_...
```

**Backend API Endpoint:** `/api/payment/stripe/create-checkout-session`

```javascript
// /api/payment/stripe/create-checkout-session
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/payment/stripe/create-checkout-session', async (req, res) => {
  const { planType, amount, billingPeriod } = req.body;

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
      success_url: `https://yoursite.com/dashboard?payment=success`,
      cancel_url: `https://yoursite.com/pricing?payment=cancelled`,
      customer_email: req.user.email,
      metadata: {
        userId: req.user.id,
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
    res.status(500).json({ error: error.message });
  }
});
```

### 5. Webhook Oluşturma

`/api/payment/stripe/webhook` endpoint'i:

```javascript
app.post('/api/payment/stripe/webhook', 
  express.raw({ type: 'application/json' }), 
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body, 
        sig, 
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // ✅ Ödeme başarılı
      await activateSubscription(session.metadata.userId, session.metadata.planType);
    }

    res.json({ received: true });
  }
);
```

### 6. Webhook URL'ini Stripe'a Kaydetme

1. Dashboard → `Developers` → `Webhooks`
2. `Add endpoint` → URL: `https://yoursite.com/api/payment/stripe/webhook`
3. Events: `checkout.session.completed`, `payment_intent.succeeded`
4. Webhook Secret'i kopyalayın ve `.env`'e ekleyin

### 7. Maliyet

- **Kurulum:** ÜCRETSİZ
- **Komisyon (Türkiye):** %3.4 + 2 TL (işlem başına)
- **Aylık Üyelik:** YOK
- **Para Çekme:** Otomatik (haftalık)

**Örnek Hesaplama:**
- 599 TL ödeme → 20.37 TL + 2 TL = **22.37 TL komisyon**
- Net gelir: **576.63 TL**

---

## 💳 KREDİ KARTI (DİREKT)

⚠️ **UYARI:** Direkt kredi kartı işlemi için **PCI DSS Level 1 sertifikası** gereklidir. Bu çok maliyetli ve zordur. **ÖNERİ: iyzico veya Stripe kullanın.**

Eğer yine de direkt entegrasyon yapmak isterseniz:

**Gerekli Adımlar:**
1. Payment Gateway seçimi (PayTR, Param, Garanti Sanal POS vb.)
2. Banka ile sözleşme
3. SSL sertifikası
4. PCI DSS uyum testi
5. Backend API oluşturma

**Maliyet:**
- Setup fee: 1,000 - 5,000 TL
- Aylık fee: 200 - 500 TL
- Komisyon: %2-3.5

---

## 🏦 BANKA TRANSFERİ YÖNETİMİ

### 1. Banka Hesabı Bilgileri

`BankTransferPayment.tsx` dosyasında hesap bilgilerinizi güncelleyin:

```typescript
const BANK_ACCOUNTS = [
  {
    bank: 'Ziraat Bankası',
    accountName: 'ŞİRKET ADINIZ',
    iban: 'TR00 0001 0000 ...',
    swift: 'TCZBTR2AXXX',
    branch: 'Şube Adı',
  },
];
```

### 2. Firestore Koleksiyonu

Transfer bildirimleri `bankTransfers` koleksiyonuna kaydedilir:

```javascript
{
  userId: 'user123',
  userEmail: 'user@example.com',
  planType: 'Premium',
  amount: 1799,
  billingPeriod: 'monthly',
  senderName: 'Ahmet Yılmaz',
  senderBank: 'Ziraat Bankası',
  senderIban: 'TR...',
  transferDate: '2025-01-15',
  receiverBank: 'Ziraat Bankası',
  receiverIban: 'TR...',
  status: 'pending', // pending | approved | rejected
  createdAt: Timestamp,
  hasReceipt: true,
}
```

### 3. Manuel Onay Sistemi

Admin panel'de onay için endpoint:

```javascript
// /api/payment/bank-transfer/approve
app.post('/api/payment/bank-transfer/approve', async (req, res) => {
  const { transferId, action } = req.body; // action: 'approve' | 'reject'

  const transferRef = doc(db, 'bankTransfers', transferId);
  const transferSnap = await getDoc(transferRef);
  
  if (!transferSnap.exists()) {
    return res.status(404).json({ error: 'Transfer not found' });
  }

  const transferData = transferSnap.data();

  if (action === 'approve') {
    // ✅ Onayla
    await updateDoc(transferRef, {
      status: 'approved',
      approvedAt: new Date(),
      approvedBy: req.user.id,
    });

    // Aboneliği aktifleştir
    await activateSubscription(transferData.userId, transferData.planType);

    // E-posta gönder
    await sendEmail(transferData.userEmail, 'Ödemeniz Onaylandı');

  } else {
    // ❌ Reddet
    await updateDoc(transferRef, {
      status: 'rejected',
      rejectedAt: new Date(),
      rejectedBy: req.user.id,
    });

    // E-posta gönder
    await sendEmail(transferData.userEmail, 'Ödemeniz Reddedildi');
  }

  res.json({ success: true });
});
```

---

## 🔌 BACKEND API ENDPOINT'LERİ

### Gerekli Endpoint'ler:

```
POST /api/payment/iyzico/initialize
POST /api/payment/iyzico/callback
POST /api/payment/stripe/create-checkout-session
POST /api/payment/stripe/webhook
POST /api/payment/bank-transfer/approve
POST /api/payment/bank-transfer/reject
GET  /api/payment/history/:userId
```

### Backend Teknoloji Önerisi:

**Node.js + Express:**
```bash
npm install express cors dotenv
npm install iyzipay stripe
npm install firebase-admin
```

**Dosya Yapısı:**
```
/backend
  /api
    /payment
      - iyzico.js
      - stripe.js
      - bankTransfer.js
  /utils
    - activateSubscription.js
    - sendEmail.js
  - server.js
  - .env
```

---

## 🔐 GÜVENLİK VE UYUMLULUK

### 1. SSL Sertifikası
- **Zorunlu:** HTTPS
- **Öneri:** Let's Encrypt (ücretsiz)

### 2. Environment Variables
- ✅ Tüm API key'leri `.env` dosyasında
- ❌ Asla Git'e commit etmeyin
- ✅ Production'da Vercel/AWS Secrets kullanın

### 3. PCI DSS Uyumluluk
- ✅ iyzico/Stripe kullanıyorsanız → Otomatik uyumlu
- ❌ Direkt kart bilgisi işliyorsanız → Sertifika gerekli

### 4. Webhook Güvenliği
- ✅ Signature verification
- ✅ IP whitelist
- ✅ HTTPS only

---

## 💰 MALİYET ANALİZİ

### Aylık 100 İşlem Senaryosu (Ortalama 800 TL)

| Yöntem | Komisyon/İşlem | Toplam Maliyet | Net Gelir |
|--------|---------------|----------------|-----------|
| **iyzico** | %2.49 + 0.25 TL | 2,018 TL | 77,982 TL |
| **Stripe** | %3.4 + 2 TL | 2,920 TL | 77,080 TL |
| **PayTR** | %2.89 + 0.50 TL | 2,362 TL | 77,638 TL |
| **Banka** | 0 TL | 0 TL | 80,000 TL |

**Sonuç:** Banka transferi en kazançlı, ama manuel iş yükü var.

---

## 🧪 TEST MODU

### İyzico Test Kartları:
```
Kart: 5528 7900 0000 0001
CVV: 123
Tarih: 12/30
3D Secure: 123456
```

### Stripe Test Kartları:
```
Başarılı: 4242 4242 4242 4242
Reddedildi: 4000 0000 0000 0002
3D Secure: 4000 0027 6000 3184
```

---

## 🐛 TROUBLESHOOTING

### Problem: "API key invalid"
**Çözüm:** `.env` dosyasını kontrol edin, sunucuyu restart edin

### Problem: "Webhook not received"
**Çözüm:** 
1. HTTPS kullanıyor musunuz?
2. Webhook URL doğru mu?
3. Signature validation çalışıyor mu?

### Problem: "Payment succeeds but subscription not activated"
**Çözüm:**
1. Webhook'u kontrol edin
2. Database yazma hatasını loglayın
3. `activateSubscription()` fonksiyonunu test edin

---

## 📞 DESTEK VE İLETİŞİM

**iyzico Destek:** [https://www.iyzico.com/iletisim](https://www.iyzico.com/iletisim)  
**Stripe Destek:** [https://support.stripe.com](https://support.stripe.com)

**FINOPS AI Studio Geliştirici:**  
Claude Sonnet 4.5 AI Assistant  
Entegrasyon Tarihi: 27 Aralık 2025

---

## ✅ KONTROL LİSTESİ

Production'a geçmeden önce:

- [ ] SSL sertifikası aktif
- [ ] `.env` dosyası production key'leri içeriyor
- [ ] Webhook URL'leri kayıtlı
- [ ] Test ödemeleri başarılı
- [ ] Banka hesap bilgileri doğru
- [ ] E-posta bildirimleri çalışıyor
- [ ] Admin onay paneli hazır
- [ ] Firestore güvenlik kuralları ayarlı
- [ ] Backup stratejisi var
- [ ] Hata loglama aktif

---

**🎉 Başarılar dileriz! Sorularınız için dokümantasyonu inceleyin.**




