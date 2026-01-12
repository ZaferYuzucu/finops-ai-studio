import { autoSubscribeNewsletter } from './newsletter';

// localStorage keys used by the app (demo/local auth + admin panels)
const AUTH_USERS_KEY = 'finops_users';
const USERS_MGMT_KEY = 'finops_users_management';
const BETA_APPS_KEY = 'finops_beta_applications';

const SEED_FLAG_KEY = 'finops_dev_seed:elba_serdar_v1';
const SEED_FLAG_TEST1 = 'finops_dev_seed:test1_zafer_v1';

type AuthUsers = Record<string, { email: string; password: string; role: string }>;

// Test5 ve kalıntıları engelle
function blockTestUsers() {
  if (typeof window === 'undefined') return;
  
  try {
    // Test kullanıcılarını temizle
    const users = JSON.parse(localStorage.getItem(AUTH_USERS_KEY) || '{}');
    Object.keys(users).forEach(email => {
      if (email.toLowerCase().includes('test5') || 
          email.toLowerCase().includes('example') ||
          (email.toLowerCase().includes('test') && !email.includes('test1'))) {
        delete users[email];
      }
    });
    localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    
    // Aktif oturumu kontrol et
    const currentUser = localStorage.getItem('finops_current_user');
    if (currentUser && (
        currentUser.toLowerCase().includes('test5') ||
        currentUser.toLowerCase().includes('example'))) {
      localStorage.removeItem('finops_current_user');
    }
  } catch (err) {
    console.warn('Block test users failed:', err);
  }
}

// Test1 SeedCo - Zafer Yuzucu (Owner/Founder)
export function ensureDevSeedTest1() {
  if (typeof window === 'undefined') return;
  if (!import.meta.env.DEV) return;

  // Önce test kullanıcılarını engelle
  blockTestUsers();

  try {
    const seed = {
      companyName: 'Test1 SeedCo',
      contactName: 'Zafer Yuzucu',
      email: 'zaferyuzucu@gmail.com',
      phone: '+90 555 123 4567',
      password: 'Zafer1961',
      sector: 'agriculture',
      employeeCount: '11-50',
      mainChallenge: 'all',
    };

    // 1) Local auth user (login page uses this store)
    // HER ZAMAN EKLE (Gizli pencere için)
    const usersRaw = window.localStorage.getItem(AUTH_USERS_KEY) || '{}';
    const users = JSON.parse(usersRaw) as AuthUsers;
    users[seed.email] = { email: seed.email, password: seed.password, role: 'user' };
    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));

    // 2) User management entry (admin list)
    const mgmtRaw = window.localStorage.getItem(USERS_MGMT_KEY) || '[]';
    const mgmt = JSON.parse(mgmtRaw) as any[];
    const existsMgmt = mgmt.some((u) => String(u.email || '').toLowerCase() === seed.email.toLowerCase());
    if (!existsMgmt) {
      mgmt.unshift({
        id: `user_test1_${Date.now()}`,
        email: seed.email,
        displayName: seed.contactName,
        createdAt: new Date().toISOString(),
        role: 'user',
        plan: 'beta_partner',
        isActive: true,
        companyName: seed.companyName,
      });
      window.localStorage.setItem(USERS_MGMT_KEY, JSON.stringify(mgmt));
    }

    // 3) Beta applications pool (local fallback)
    const appsRaw = window.localStorage.getItem(BETA_APPS_KEY) || '[]';
    const apps = JSON.parse(appsRaw) as any[];
    const existsApp = apps.some(
      (a) =>
        String(a.email || '').toLowerCase() === seed.email.toLowerCase() &&
        String(a.companyName || '') === seed.companyName,
    );
    if (!existsApp) {
      apps.unshift({
        id: `test1_beta_partner`,
        companyName: seed.companyName,
        contactName: seed.contactName,
        email: seed.email,
        phone: seed.phone,
        employeeCount: seed.employeeCount,
        sector: seed.sector,
        description: 'Tohum üretimi ve satışı - Tarım Sektörü. CSV: public/demo-data/Test1 SeedCo.csv',
        status: 'approved',
        source: 'admin',
        appliedAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'admin',
        surveyAnswers: {
          companySize: 'small',
          mainChallenge: seed.mainChallenge,
        },
        approvalEmailSent: true,
        approvalEmailSentAt: new Date().toISOString(),
        adminNotes: 'Test1 SeedCo - Owner: Zafer Yuzucu. CSV data available in public/demo-data/',
      });
      window.localStorage.setItem(BETA_APPS_KEY, JSON.stringify(apps));
      try {
        window.dispatchEvent(new Event('finops-beta-applications-updated'));
      } catch {
        // ignore
      }
    }

    // 4) Newsletter subscriber (Firestore) - best effort
    void autoSubscribeNewsletter(seed.email, 'admin');

    // 5) 📚 VERİ KÜTÜPHANESİ - Test1 SeedCo.csv dosyasını ekle
    // HER ZAMAN EKLE (gizli pencere için)
    const USER_DATA_KEY = 'finops_user_uploaded_files';
    const libraryRaw = window.localStorage.getItem(USER_DATA_KEY) || '[]';
    const library = JSON.parse(libraryRaw) as any[];
    
    // Eski Test1 dosyalarını temizle
    const cleanLibrary = library.filter(
      (f) => !(String(f.userEmail || '').toLowerCase() === seed.email.toLowerCase())
    );
    
    // Yeni dosya ekle
    cleanLibrary.push({
      id: `file_test1_seedco_${Date.now()}`,
      fileName: 'Test1 SeedCo.csv',
      fileType: 'text/csv',
      fileSize: 15360,
      uploadedAt: new Date().toISOString(),
      userEmail: seed.email,
      category: 'financial',
      branchId: undefined,
      branchName: undefined,
      description: 'Test1 SeedCo - Tohum üretimi satış verileri (2024)',
      tags: ['tohum', 'tarım', '2024', 'satış'],
      rowCount: 250,
      columnCount: 12,
      preview: [
        'Tarih,Ürün,Kategori,Miktar,Birim Fiyat,Toplam,Müşteri,Bölge',
        '2024-01-15,Buğday Tohumu,Tahıl,500,25,12500,ABC Tarım,Ankara',
        '2024-01-16,Mısır Tohumu,Tahıl,300,30,9000,XYZ Çiftlik,İzmir',
      ],
      isArchived: false,
    });
    
    window.localStorage.setItem(USER_DATA_KEY, JSON.stringify(cleanLibrary));
    console.log('✅ Test1 SeedCo.csv kütüphaneye eklendi (ZORLA)');
    console.log('📊 Kütüphane toplam dosya:', cleanLibrary.length);

    // Always notify admin list pages (safe even if nothing changed)
    try {
      window.dispatchEvent(new Event('finops-beta-applications-updated'));
    } catch {
      // ignore
    }

    console.log('✅ DEV SEED: Test1 SeedCo / Zafer Yuzucu Beta Partner created');
  } catch (err) {
    console.warn('DEV SEED Test1 failed:', err);
  }
}

export function ensureDevSeedElbaSerdar() {
  if (typeof window === 'undefined') return;
  if (!import.meta.env.DEV) return;

  try {
    const seed = {
      companyName: 'Elba Otomotiv',
      contactName: 'Serdar Cingir',
      email: 'serdar@elbaotomotiv.com',
      phone: '+90 541 338 88 35',
      password: 'DefneSeher',
      sector: 'automotive',
      employeeCount: '1-10',
      mainChallenge: 'all',
    };

    // 1) Local auth user (login page uses this store)
    // HER ZAMAN EKLE (Gizli pencere için)
    const usersRaw = window.localStorage.getItem(AUTH_USERS_KEY) || '{}';
    const users = JSON.parse(usersRaw) as AuthUsers;
    users[seed.email] = { email: seed.email, password: seed.password, role: 'user' };
    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));
    console.log('✅ Elba/Serdar kullanıcısı eklendi:', seed.email);

    // 2) User management entry (admin list)
    const mgmtRaw = window.localStorage.getItem(USERS_MGMT_KEY) || '[]';
    const mgmt = JSON.parse(mgmtRaw) as any[];
    const existsMgmt = mgmt.some((u) => String(u.email || '').toLowerCase() === seed.email.toLowerCase());
    if (!existsMgmt) {
      mgmt.unshift({
        id: `user_${Date.now()}`,
        email: seed.email,
        displayName: seed.contactName,
        createdAt: new Date().toISOString(),
        role: 'user',
        plan: 'beta_partner',
        isActive: true,
        companyName: seed.companyName,
      });
      window.localStorage.setItem(USERS_MGMT_KEY, JSON.stringify(mgmt));
    }

    // 3) Beta applications pool (local fallback)
    const appsRaw = window.localStorage.getItem(BETA_APPS_KEY) || '[]';
    const apps = JSON.parse(appsRaw) as any[];
    const existsApp = apps.some(
      (a) =>
        String(a.email || '').toLowerCase() === seed.email.toLowerCase() &&
        String(a.companyName || '') === seed.companyName,
    );
    if (!existsApp) {
      apps.unshift({
        id: `admin_seed_${Date.now()}`,
        companyName: seed.companyName,
        contactName: seed.contactName,
        email: seed.email,
        phone: seed.phone,
        employeeCount: seed.employeeCount,
        sector: seed.sector,
        description: 'Manuel oluşturuldu. Dashboard beklentisi: Hepsi.',
        status: 'approved',
        source: 'admin',
        appliedAt: new Date().toISOString(),
        reviewedAt: new Date().toISOString(),
        reviewedBy: 'admin',
        surveyAnswers: {
          companySize: 'micro',
          mainChallenge: seed.mainChallenge,
        },
        approvalEmailSent: false,
        adminNotes: 'Admin manuel Beta Partner kullanıcı oluşturdu',
      });
      window.localStorage.setItem(BETA_APPS_KEY, JSON.stringify(apps));
      try {
        window.dispatchEvent(new Event('finops-beta-applications-updated'));
      } catch {
        // ignore
      }
    }

    // 4) Newsletter subscriber (Firestore) - best effort
    void autoSubscribeNewsletter(seed.email, 'admin');

    // Always notify admin list pages (safe even if nothing changed)
    try {
      window.dispatchEvent(new Event('finops-beta-applications-updated'));
    } catch {
      // ignore
    }

    // Helpful console trace for debugging in dev
    // eslint-disable-next-line no-console
    console.log('✅ DEV SEED: Elba/Serdar Beta Partner created (local + newsletter best-effort)');
    console.log('📧 Email:', seed.email);
    console.log('🔑 Şifre:', seed.password);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('DEV SEED failed:', err);
  }
}

// Admin kullanıcısı - User Management'ta görünsün
export function ensureDevSeedAdmin() {
  if (typeof window === 'undefined') return;
  if (!import.meta.env.DEV) return;

  try {
    const adminEmail = 'admin@finops.ai';
    const adminPassword = 'ATA1923';

    // 1) Local auth user
    const usersRaw = window.localStorage.getItem(AUTH_USERS_KEY) || '{}';
    const users = JSON.parse(usersRaw) as AuthUsers;
    users[adminEmail] = { email: adminEmail, password: adminPassword, role: 'admin' };
    window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));

    // 2) User management entry
    const mgmtRaw = window.localStorage.getItem(USERS_MGMT_KEY) || '[]';
    const mgmt = JSON.parse(mgmtRaw) as any[];
    const existsMgmt = mgmt.some((u) => String(u.email || '').toLowerCase() === adminEmail.toLowerCase());
    if (!existsMgmt) {
      mgmt.unshift({
        id: 'admin_001',
        email: adminEmail,
        displayName: 'Admin',
        createdAt: new Date().toISOString(),
        role: 'admin',
        plan: 'admin',
        isActive: true,
        companyName: 'FINOPS AI Studio',
      });
      window.localStorage.setItem(USERS_MGMT_KEY, JSON.stringify(mgmt));
    }

    console.log('✅ DEV SEED: Admin kullanıcısı eklendi');
  } catch (err) {
    console.warn('Admin seed failed:', err);
  }
}
