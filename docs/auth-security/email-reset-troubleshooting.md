# Şifre Sıfırlama E-Postası Sorunu - Çözüm Kılavuzu

## Problem
`sendPasswordResetEmail()` çağrısı başarılı ama email gelmiyor.

## E-Postayı Kim Gönderir?
**Firebase Authentication** otomatik olarak gönderir.
- Cursor/Frontend **ASLA** email göndermez
- Backend API **GEREKL İDEĞİL**
- Sadece Firebase servisi email gönderir

## Nasıl Çalışır?

```typescript
// Frontend'de çağrı:
await sendPasswordResetEmail(auth, "user@example.com");

// Firebase:
// 1. Email'in sistemde kayıtlı olup olmadığını kontrol eder
// 2. Güvenli bir reset token oluşturur
// 3. Email template'ini hazırlar
// 4. Firebase'in kendi email servisinden gönderir
// 5. Frontend'e başarı/hata döner
```

## Email Gelmiyorsa Kontrol Listesi

### ✅ 1. Firebase Console Email Ayarları

**Adres:**
```
https://console.firebase.google.com/project/finopsprojesi-39510656-2ec03/authentication/emails
```

**Kontroller:**
- [ ] Authentication → Templates → Password Reset aktif mi?
- [ ] Email template'i var mı?
- [ ] "Action URL" doğru domain'e işaret ediyor mu?
- [ ] "From email" adresi ayarlanmış mı?

### ✅ 2. Spam/Junk Klasörü Kontrol

Firebase'in varsayılan gönderen adresi:
```
noreply@finopsprojesi-39510656-2ec03.firebaseapp.com
```

**Yapılacaklar:**
- Email'inizin spam klasörünü kontrol edin
- Firebase'den gelen emailleri "Güvenli Gönderen" listesine ekleyin
- Filters/Rules kontrol edin (bazen otomatik siliniyor olabilir)

### ✅ 3. Email Adresi Doğruluğu

Firebase sadece **kayıtlı kullanıcılara** email gönderir.

**Test:**
```bash
# Firebase Console'da kontrol:
Authentication → Users → Email adresi var mı?
```

Email yoksa:
- Önce kullanıcı oluşturun (Console veya signup)
- Sonra password reset deneyin

### ✅ 4. Firebase Proje Kotaları

Ücretsiz plan limitleri:
- **100 email/gün** (ücretsiz plan)
- Limit aşılırsa email gönderilmez

**Kontrol:**
```
Firebase Console → Usage and Billing → Authentication
```

### ✅ 5. Email Provider Durumu

Firebase bazen email servisinde sorun yaşayabilir.

**Kontrol:**
```
https://status.firebase.google.com/
```

### ✅ 6. Browser Console Hataları

Developer Console'da hata var mı?

```javascript
// Örnek hatalar:
// "auth/user-not-found" → Kullanıcı yok
// "auth/invalid-email" → Email formatı yanlış
// "auth/too-many-requests" → Çok fazla deneme
```

## Geçici Çözüm (Test İçin)

Firebase Console'dan manuel password reset:

```
1. Firebase Console → Authentication → Users
2. Kullanıcıyı bulun
3. "..." menü → Send password reset email
4. Email geldi mi kontrol edin
```

Eğer manuel gönderim çalışıyorsa:
→ Frontend kodu doğru, Firebase ayarları eksik

Eğer manuel gönderim de çalışmıyorsa:
→ Firebase email servisi yapılandırması gerekli

## Custom Email Domain Yapılandırması

Kendi domain'inizden email göndermek için:

### Adım 1: SMTP Ayarları
```
Firebase Console → Authentication → Templates → SMTP Settings
```

### Adım 2: Domain Doğrulama
- SPF kaydı ekleyin
- DKIM kaydı ekleyin
- Domain verification yapın

### Adım 3: Test
Firebase Console'dan test emaili gönderin.

## Production Önerisi: SendGrid/Mailgun Entegrasyonu

Firebase'in varsayılan email servisi sınırlı.
Production için profesyonel email servisi önerilir:

### SendGrid Entegrasyonu
```typescript
// Firebase Extensions kullan:
// ext-sendgrid-email-service

// Kurulum:
firebase ext:install sendgrid/email-service
```

### Mailgun Entegrasyonu
```typescript
// Firebase Cloud Functions:
import * as functions from 'firebase-functions';
import * as mailgun from 'mailgun-js';

export const sendPasswordReset = functions.auth.user().onCreate(async (user) => {
  const mg = mailgun({ apiKey: 'YOUR_KEY', domain: 'YOUR_DOMAIN' });
  
  await mg.messages().send({
    from: 'FinOps AI Studio <noreply@finops.ist>',
    to: user.email,
    subject: 'Şifre Sıfırlama',
    html: '...'
  });
});
```

## Hızlı Test Scripti

```typescript
// test-email-reset.ts
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

async function testPasswordReset(email: string) {
  const auth = getAuth();
  
  try {
    console.log(`Sending password reset to: ${email}`);
    await sendPasswordResetEmail(auth, email);
    console.log('✅ Email sent successfully');
    console.log('Check:', email);
    console.log('Also check spam folder');
  } catch (error: any) {
    console.error('❌ Error:', error.code, error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('User does not exist. Create user first.');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('Invalid email format.');
    }
  }
}

// Test
testPasswordReset('zaferyuzucu@gmail.com');
```

## Firebase Email Template Özelleştirme

```
Firebase Console → Authentication → Templates → Password reset
```

**Özelleştirilebilir Alanlar:**
- Email subject
- Email body (HTML)
- Sender name
- Action URL (reset page)
- Reply-to address

**Örnek Template:**
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Şifre Sıfırlama</title>
</head>
<body>
  <h1>FinOps AI Studio</h1>
  <p>Merhaba,</p>
  <p>Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:</p>
  <a href="%LINK%">Şifremi Sıfırla</a>
  <p>Bu link 1 saat geçerlidir.</p>
  <p>Eğer bu talebi siz yapmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
</body>
</html>
```

## Debug Modu

Geliştirme sırasında email gönderimini test etmek için:

```typescript
// Firebase Emulator Suite kullan
firebase emulators:start --only auth

// .env
VITE_USE_FIREBASE_EMULATOR=true

// firebase.ts
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

Emulator'da tüm emailler console'a yazılır (gerçek email gönderilmez).

## Son Kontrol Listesi

- [ ] Firebase Console → Users → Email var
- [ ] Firebase Console → Templates → Password reset aktif
- [ ] Spam klasörü kontrol edildi
- [ ] Browser console hata yok
- [ ] Firebase status sayfası yeşil
- [ ] Email quota aşılmamış
- [ ] Manuel gönderim test edildi
- [ ] Action URL doğru domain

## Acil Çözüm: Alternatif Yöntem

Eğer Firebase email çalışmıyorsa geçici çözüm:

### Manuel Password Değiştirme
Firebase Console'dan admin olarak:
```
Authentication → Users → (kullanıcı seç) → Reset password
```

### Backend API ile Custom Email
```typescript
// Cloud Function
export const sendCustomPasswordReset = functions.https.onCall(async (data) => {
  const { email } = data;
  
  // 1. Token oluştur
  const resetToken = crypto.randomBytes(32).toString('hex');
  
  // 2. Firestore'a kaydet (1 saat expire)
  await db.collection('password_resets').doc(email).set({
    token: resetToken,
    expiresAt: Date.now() + 3600000
  });
  
  // 3. Email gönder (SendGrid/Mailgun)
  await sendEmail({
    to: email,
    subject: 'Şifre Sıfırlama',
    body: `Reset link: https://finops.ist/reset-password?token=${resetToken}`
  });
});
```

## İletişim

Eğer sorun devam ediyorsa:
1. Firebase Support'a ticket aç
2. Firebase Community Forum'da sor
3. Stack Overflow'da ara: "firebase password reset email not working"

---

**Özet:** Firebase email gönderir, ama ayarları Firebase Console'dan yapılandırılmalı.
