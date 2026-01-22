/**
 * ⚠️ KRİTİK: localStorage Kullanıcılarını Firebase'e Migrate Et
 * 
 * Bu script, eski localStorage tabanlı kullanıcıları Firebase Authentication'a taşır.
 * 
 * KULLANIM:
 * 1. Firebase Admin SDK credentials'ı .env dosyasına ekleyin
 * 2. Bu scripti çalıştırın: npx tsx scripts/migrate-user-to-firebase.ts
 * 
 * @author FinOps AI Studio Security Team
 */

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// ============================================
// FIREBASE ADMIN SDK BAŞLATMA
// ============================================

// Firebase Admin SDK'yı başlat (eğer başlatılmamışsa)
if (admin.apps.length === 0) {
  // Service account key'i environment'tan al
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  
  if (!serviceAccountKey) {
    console.error('❌ HATA: FIREBASE_SERVICE_ACCOUNT_KEY environment variable bulunamadı!');
    console.error('');
    console.error('Lütfen Firebase Console > Project Settings > Service Accounts > Generate New Private Key');
    console.error('adımlarını takip edin ve JSON içeriğini .env dosyasına ekleyin:');
    console.error('');
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY=\'{"type":"service_account",...}\'');
    process.exit(1);
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKey);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'finopsprojesi-39510656-2ec03'
    });
    
    console.log('✅ Firebase Admin SDK başlatıldı');
  } catch (error) {
    console.error('❌ Firebase Admin SDK başlatılamadı:', error);
    process.exit(1);
  }
}

const auth = admin.auth();
const firestore = admin.firestore();

// ============================================
// localStorage BACKUP DOSYASINI OKU
// ============================================

interface LocalStorageBackup {
  [key: string]: string;
}

interface UserData {
  email: string;
  password: string;
  role: 'user' | 'admin';
}

async function loadLocalStorageBackup(): Promise<{ users: Record<string, UserData>, userData: any }> {
  const backupPath = path.join(__dirname, '..', 'localStorage-backup.json');
  
  if (!fs.existsSync(backupPath)) {
    console.error('❌ localStorage-backup.json bulunamadı!');
    console.error('Dosya yolu:', backupPath);
    return { users: {}, userData: {} };
  }

  const backupContent = fs.readFileSync(backupPath, 'utf-8');
  const backup: LocalStorageBackup = JSON.parse(backupContent);
  
  // finops_users verisini çıkar
  const usersKey = 'finops_users';
  const users: Record<string, UserData> = {};
  
  // localStorage'dan kullanıcı verilerini topla
  const userData: any = {};
  
  for (const [key, value] of Object.entries(backup)) {
    if (key.startsWith('finops_user_data_')) {
      const email = key.replace('finops_user_data_', '');
      userData[email] = JSON.parse(value);
      console.log(`📦 ${email} için veri bulundu (${JSON.parse(value).length} dosya)`);
    }
  }
  
  return { users, userData };
}

// ============================================
// KULLANICI MIGRATE ET
// ============================================

interface MigrationResult {
  email: string;
  success: boolean;
  uid?: string;
  error?: string;
  filesRestored?: number;
}

async function migrateUser(
  email: string,
  password: string,
  role: 'user' | 'admin',
  userData?: any
): Promise<MigrationResult> {
  try {
    console.log(`\n🔄 ${email} migrate ediliyor...`);
    
    // 1. Firebase Auth'da kullanıcı var mı kontrol et
    let userRecord: admin.auth.UserRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`  ℹ️  Kullanıcı zaten mevcut (UID: ${userRecord.uid})`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // Kullanıcı yok, oluştur
        console.log('  ➕ Yeni kullanıcı oluşturuluyor...');
        userRecord = await auth.createUser({
          email,
          password,
          emailVerified: true, // Eski kullanıcılar için e-posta doğrulanmış say
          displayName: email.split('@')[0]
        });
        console.log(`  ✅ Firebase Auth kullanıcısı oluşturuldu (UID: ${userRecord.uid})`);
      } else {
        throw error;
      }
    }

    // 2. Firestore'da kullanıcı profili oluştur/güncelle
    const userDocRef = firestore.collection('users').doc(userRecord.uid);
    await userDocRef.set({
      uid: userRecord.uid,
      email: email,
      displayName: email.split('@')[0],
      role: role,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      isActive: true,
      migratedFrom: 'localStorage',
      migrationDate: new Date().toISOString()
    }, { merge: true });
    
    console.log('  ✅ Firestore profili oluşturuldu');

    // 3. Custom claims (role) ekle
    await auth.setCustomUserClaims(userRecord.uid, { role });
    console.log(`  ✅ Role custom claim eklendi: ${role}`);

    // 4. Kullanıcı verilerini restore et
    let filesRestored = 0;
    if (userData && Array.isArray(userData)) {
      console.log(`  📂 ${userData.length} dosya restore ediliyor...`);
      
      for (const file of userData) {
        try {
          // Dosya metadata'sını kaydet
          const fileDocRef = firestore
            .collection('users')
            .doc(userRecord.uid)
            .collection('files')
            .doc(file.id || firestore.collection('temp').doc().id);
          
          await fileDocRef.set({
            id: fileDocRef.id,
            userId: userRecord.uid,
            fileName: file.fileName,
            fileType: 'csv',
            uploadedAt: file.uploadDate || new Date().toISOString(),
            sizeBytes: file.fileSize || 0,
            category: file.category || 'operational',
            branch: file.branch || 'Tüm Lokasyonlar'
          });

          // Dosya içeriğini kaydet
          const contentDocRef = firestore
            .collection('users')
            .doc(userRecord.uid)
            .collection('fileContents')
            .doc(fileDocRef.id);
          
          await contentDocRef.set({
            fileId: fileDocRef.id,
            userId: userRecord.uid,
            content: file.fileContent || '',
            uploadedAt: file.uploadDate || new Date().toISOString(),
            sizeBytes: file.fileSize || 0
          });

          filesRestored++;
          console.log(`    ✅ ${file.fileName} restore edildi`);
        } catch (fileError) {
          console.error(`    ❌ ${file.fileName} restore edilemedi:`, fileError);
        }
      }
      
      console.log(`  ✅ ${filesRestored}/${userData.length} dosya başarıyla restore edildi`);
    }

    return {
      email,
      success: true,
      uid: userRecord.uid,
      filesRestored
    };

  } catch (error: any) {
    console.error(`  ❌ Hata:`, error.message);
    return {
      email,
      success: false,
      error: error.message
    };
  }
}

// ============================================
// ANA FONKSIYON
// ============================================

async function main() {
  console.log('🚀 FinOps AI Studio - Kullanıcı Migration Script');
  console.log('=================================================\n');

  // localStorage backup'ını yükle
  const { users, userData } = await loadLocalStorageBackup();

  // Kullanıcı listesi
  const userList = [
    {
      email: 'zaferyuzucu@gmail.com',
      password: 'ATA1923Tesla',
      role: 'user' as const
    },
    // Admin için environment variable'dan al
    {
      email: process.env.VITE_ADMIN_EMAIL || 'admin@finops.ist',
      password: process.env.VITE_ADMIN_PASSWORD || 'ATA1923Tesla',
      role: 'admin' as const
    }
  ];

  const results: MigrationResult[] = [];

  // Her kullanıcıyı migrate et
  for (const user of userList) {
    const result = await migrateUser(
      user.email,
      user.password,
      user.role,
      userData[user.email]
    );
    results.push(result);
  }

  // Özet rapor
  console.log('\n\n📊 MİGRASYON RAPORU');
  console.log('===================');
  console.log(`Toplam: ${results.length} kullanıcı`);
  console.log(`Başarılı: ${results.filter(r => r.success).length}`);
  console.log(`Başarısız: ${results.filter(r => !r.success).length}`);
  
  console.log('\n📋 Detaylar:');
  results.forEach(r => {
    if (r.success) {
      console.log(`  ✅ ${r.email} (UID: ${r.uid}, ${r.filesRestored || 0} dosya)`);
    } else {
      console.log(`  ❌ ${r.email} - ${r.error}`);
    }
  });

  console.log('\n✅ Migration tamamlandı!');
  console.log('');
  console.log('🔐 ÖNEMLİ GÜVENLİK UYARILARI:');
  console.log('  1. localStorage-backup.json dosyasını GÜVENLİ bir yere yedekleyin');
  console.log('  2. Eski localStorage verilerini temizleyin');
  console.log('  3. Hardcoded şifreleri .env dosyasından kaldırın');
  console.log('  4. Firebase Console\'dan admin rolünü manuel olarak doğrulayın');
  console.log('');
}

// Scripti çalıştır
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('💥 Beklenmeyen hata:', error);
    process.exit(1);
  });
