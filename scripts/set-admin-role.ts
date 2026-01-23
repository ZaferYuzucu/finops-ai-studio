/**
 * OTONOM ADMİN ROLÜ AYARLAYICI
 * 
 * Mevcut kullanıcıya admin rolü ekler
 * Email: zaferyuzucu@gmail.com
 */

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Firebase Admin SDK başlat
if (getApps().length === 0) {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    console.error('❌ HATA: FIREBASE_SERVICE_ACCOUNT_KEY bulunamadı');
    console.log('\n📋 ÇÖZÜM:');
    console.log('1. Firebase Console > Project Settings > Service Accounts');
    console.log('2. "Generate New Private Key" butonuna tıkla');
    console.log('3. İndirilen JSON dosyasını aç');
    console.log('4. Tüm içeriği kopyala');
    console.log('5. Terminal\'de çalıştır:');
    console.log('   export FIREBASE_SERVICE_ACCOUNT_KEY=\'BURAYA_JSON_YAPISTIR\'');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    initializeApp({
      credential: cert(serviceAccount),
    });
    console.log('✅ Firebase Admin SDK başlatıldı\n');
  } catch (error: any) {
    console.error('❌ Firebase başlatma hatası:', error.message);
    process.exit(1);
  }
}

const ADMIN_EMAIL = 'zaferyuzucu@gmail.com';

async function setAdminRole() {
  try {
    const auth = getAuth();
    const db = getFirestore();
    
    console.log('🔍 Kullanıcı aranıyor:', ADMIN_EMAIL);
    
    // Kullanıcıyı bul
    const user = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log('✅ Kullanıcı bulundu!');
    console.log('   UID:', user.uid);
    console.log('   Email:', user.email);
    console.log('   Oluşturma:', user.metadata.creationTime);
    console.log('');
    
    // 1. Custom Claims ile admin yap (Firebase Auth)
    console.log('📝 Custom claims ayarlanıyor...');
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });
    console.log('✅ Custom claims ayarlandı: { role: "admin" }');
    console.log('');
    
    // 2. Firestore'da admin yap
    console.log('📝 Firestore role ayarlanıyor...');
    const userRef = db.collection('users').doc(user.uid);
    
    // Mevcut kullanıcı verisini al
    const userDoc = await userRef.get();
    
    if (userDoc.exists) {
      // Kullanıcı varsa sadece role'ü güncelle
      await userRef.update({
        role: 'admin',
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Firestore role güncellendi');
    } else {
      // Kullanıcı yoksa oluştur
      await userRef.set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Admin User',
        role: 'admin',
        emailVerified: user.emailVerified,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true
      });
      console.log('✅ Firestore kullanıcı oluşturuldu');
    }
    
    console.log('');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 BAŞARILI! ADMIN ROLÜ AYARLANDI');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('✅ Email:', ADMIN_EMAIL);
    console.log('✅ UID:', user.uid);
    console.log('✅ Role: admin (Custom Claims + Firestore)');
    console.log('');
    console.log('📍 ŞİMDİ NE YAPACAKSIN?');
    console.log('1. Tarayıcıda aç: http://localhost:5173/admin-login');
    console.log('2. Giriş yap:', ADMIN_EMAIL);
    console.log('3. Şifre: Zafer1961');
    console.log('4. ✅ Admin paneline yönlendirileceksin!');
    console.log('');
    
  } catch (error: any) {
    console.error('❌ HATA:', error.message);
    
    if (error.code === 'auth/user-not-found') {
      console.log('\n📋 ÇÖZÜM:');
      console.log('1. Önce kullanıcı oluşturmalısın');
      console.log('2. Tarayıcıda aç: http://localhost:5173/signup');
      console.log('3. Kayıt ol:', ADMIN_EMAIL);
      console.log('4. Sonra bu script\'i tekrar çalıştır');
    }
    
    throw error;
  }
}

// Script'i çalıştır
setAdminRole()
  .then(() => {
    console.log('✅ Script başarıyla tamamlandı\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script başarısız:', error.message);
    process.exit(1);
  });
