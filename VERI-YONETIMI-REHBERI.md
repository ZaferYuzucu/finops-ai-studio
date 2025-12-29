# 📊 FINOPS AI STUDIO - VERİ YÖNETİMİ REHBERİ

**Tarih:** 28 Aralık 2025  
**Versiyon:** 1.0  
**Durum:** Production Ready

---

## 🎯 MEVCUT DURUM

### ✅ YAPTIKLARIMIZ

1. **Firebase Firestore Kullanıyoruz**
   - NoSQL bulut veritabanı
   - Gerçek zamanlı senkronizasyon
   - Otomatik ölçeklendirme
   - 99.99% uptime

2. **Veri Yapısı Tanımlandı**
   - TypeScript types hazır (`src/types/subscription.ts`)
   - Usage tracking sistemi aktif
   - Subscription yönetimi hazır

3. **Authentication Kuruldu**
   - Firebase Authentication
   - Email/Password + Google Sign-In
   - Kullanıcı yönetimi aktif

---

## 📐 VERİ YAPISI (FIRESTORE COLLECTIONS)

### **1. users/** (Ana Kullanıcı Verisi)

```javascript
users/{userId}
  ├─ email: string
  ├─ displayName: string
  ├─ photoURL: string
  ├─ subscriptionPlan: 'Free' | 'Starter' | 'Professional' | 'Enterprise' | 'BetaPartner'
  ├─ subscriptionStatus: 'active' | 'trial' | 'expired' | 'cancelled'
  ├─ subscriptionStartDate: timestamp
  ├─ subscriptionEndDate: timestamp
  ├─ createdAt: timestamp
  ├─ lastLoginAt: timestamp
  ├─ role: 'user' | 'admin'
  └─ settings: {
      language: 'tr' | 'en',
      notifications: boolean,
      theme: 'light' | 'dark'
    }
```

---

### **2. users/{userId}/usage/** (Kullanım İstatistikleri)

```javascript
users/{userId}/usage/current
  ├─ usersCount: number
  ├─ businessesCount: number
  ├─ dashboardsCount: number
  ├─ lastUpdated: timestamp
```

---

### **3. users/{userId}/businesses/** (İşletme Verileri)

```javascript
users/{userId}/businesses/{businessId}
  ├─ name: string
  ├─ taxNumber: string (VKN/TCKN)
  ├─ address: string
  ├─ industry: string
  ├─ employees: number
  ├─ createdAt: timestamp
  ├─ updatedAt: timestamp
  └─ financialData: {
      revenue: number,
      expenses: number,
      profit: number,
      currency: 'TRY' | 'USD' | 'EUR'
    }
```

---

### **4. users/{userId}/dashboards/** (Dashboard Konfigürasyonları)

```javascript
users/{userId}/dashboards/{dashboardId}
  ├─ name: string
  ├─ type: 'ceo' | 'cfo' | 'sales' | 'custom'
  ├─ businessId: string (reference)
  ├─ widgets: array<Widget>
  ├─ layout: object
  ├─ createdAt: timestamp
  ├─ lastViewedAt: timestamp
  ├─ isShared: boolean
  └─ sharedWith: array<userId>
```

---

### **5. users/{userId}/dataSources/** (Veri Kaynakları)

```javascript
users/{userId}/dataSources/{sourceId}
  ├─ type: 'excel' | 'google-sheets' | 'logo' | 'netsis' | 'aws' | 'azure'
  ├─ name: string
  ├─ businessId: string (reference)
  ├─ connectionConfig: object (şifreli)
  ├─ lastSyncAt: timestamp
  ├─ syncStatus: 'success' | 'error' | 'pending'
  ├─ dataSchema: object
  └─ autoSync: boolean
```

---

### **6. payments/** (Ödeme İşlemleri)

```javascript
payments/{paymentId}
  ├─ userId: string (reference)
  ├─ amount: number
  ├─ currency: string
  ├─ method: 'iyzico' | 'stripe' | 'bank_transfer' | 'credit_card'
  ├─ status: 'pending' | 'completed' | 'failed' | 'refunded'
  ├─ planType: string
  ├─ billingPeriod: 'monthly' | 'yearly'
  ├─ invoiceUrl: string
  ├─ createdAt: timestamp
  └─ metadata: object
```

---

### **7. bankTransfers/** (Banka Transferleri)

```javascript
bankTransfers/{transferId}
  ├─ userId: string (reference)
  ├─ amount: number
  ├─ bankName: string
  ├─ accountName: string
  ├─ receiptUrl: string (storage reference)
  ├─ status: 'pending' | 'approved' | 'rejected'
  ├─ approvedBy: string (admin userId)
  ├─ approvedAt: timestamp
  ├─ createdAt: timestamp
  └─ notes: string
```

---

### **8. newsletter/** (Newsletter Aboneleri)

```javascript
newsletter/{email}
  ├─ email: string
  ├─ subscribedAt: timestamp
  ├─ isActive: boolean
  ├─ source: 'website' | 'landing' | 'campaign'
  └─ tags: array<string>
```

---

### **9. betaApplications/** (Beta Partner Başvuruları)

```javascript
betaApplications/{applicationId}
  ├─ email: string
  ├─ companyName: string
  ├─ phone: string
  ├─ message: string
  ├─ status: 'pending' | 'approved' | 'rejected'
  ├─ appliedAt: timestamp
  ├─ reviewedBy: string (admin userId)
  └─ reviewedAt: timestamp
```

---

### **10. analytics/** (Platform Analytics - Admin Only)

```javascript
analytics/daily/{date}
  ├─ activeUsers: number
  ├─ newSignups: number
  ├─ revenue: number
  ├─ churnRate: number
  ├─ avgSessionDuration: number
  └─ topFeatures: array<{feature: string, usage: number}>
```

---

## 🔐 GÜVENLİK (FIRESTORE RULES)

### **Dosya:** `firestore.rules`

**Temel Prensipler:**
1. ✅ Kullanıcılar sadece **kendi verilerini** okuyabilir
2. ✅ **Authentication** zorunlu (herkese açık veriler hariç)
3. ✅ **Admin** rolü özel yetkilere sahip
4. ✅ **Newsletter/Beta** başvuruları herkese açık (write only)
5. ✅ **Payment** verileri hassas (özel kurallar)

---

## 💾 BACKUP STRATEJİSİ

### **1. Otomatik Firebase Backups**

**Firebase Console'dan:**
```
1. Firebase Console → Firestore Database
2. Settings → Backups
3. Enable Automatic Backups
4. Schedule: Daily (00:00 UTC)
5. Retention: 30 days
```

**Maliyet:** ~$0.02/GB/ay

---

### **2. Manuel Export (Kritik Önlem)**

**Aylık manuel export:**
```bash
# Firebase CLI ile export
gcloud firestore export gs://finops-backups/$(date +%Y-%m-%d)

# Veya Firebase Console:
Firestore → Import/Export → Export
```

---

### **3. Cloud Storage Backups**

**Yapılacak:**
1. Google Cloud Storage bucket oluştur: `finops-backups`
2. Lifecycle policy ayarla: 90 gün sonra sil
3. Otomatik export schedule kur

---

## 📈 VERİ BÜYÜME TAHMİNİ

### **İlk 1 Yıl Projeksiyonu:**

| Ay | Kullanıcı | İşletme | Dashboard | Veri (GB) | Maliyet/Ay |
|----|-----------|---------|-----------|-----------|------------|
| 1  | 20        | 40      | 80        | 0.5       | $1         |
| 3  | 100       | 200     | 500       | 2.5       | $5         |
| 6  | 300       | 600     | 1,500     | 8         | $15        |
| 12 | 1,000     | 2,000   | 5,000     | 30        | $50        |

**Firebase Firestore Pricing:**
- Okuma: $0.06 / 100K okuma
- Yazma: $0.18 / 100K yazma
- Depolama: $0.18 / GB/ay
- İlk 50K okuma/gün: ÜCRETSİZ

---

## 🚀 PERFORMANS OPTİMİZASYONU

### **1. İndexler (Kritik!)**

**Yapılması gereken:**
```javascript
// Firebase Console → Firestore → Indexes

// Örnek index'ler:
users collection:
  - subscriptionPlan (Ascending) + subscriptionStatus (Ascending)
  - createdAt (Descending)

payments collection:
  - userId (Ascending) + createdAt (Descending)
  - status (Ascending) + createdAt (Descending)
```

---

### **2. Query Optimization**

**İyi Pratikler:**
```javascript
// ❌ KÖTÜ: Tüm kullanıcıları çek
const users = await getDocs(collection(db, 'users'));

// ✅ İYİ: Limit + where ile filtrele
const users = await getDocs(
  query(
    collection(db, 'users'),
    where('subscriptionStatus', '==', 'active'),
    limit(100)
  )
);
```

---

### **3. Caching Strategy**

**Yapılacak:**
1. Frontend'de React Query kullan (cache)
2. ServiceWorker ile offline support
3. Firestore offline persistence aktif et

---

## 🌍 KVKK & GDPR UYUMLULUĞU

### **Gerekli Özellikler:**

1. **Veri Silme Hakkı**
   ```javascript
   // Kullanıcı kendi verisini silebilmeli
   async function deleteUserData(userId) {
     // Tüm alt koleksiyonları sil
     // Payment geçmişi hariç (muhasebe için)
   }
   ```

2. **Veri İndirme Hakkı**
   ```javascript
   // Kullanıcı verisini export edebilmeli
   async function exportUserData(userId) {
     // JSON formatında indir
   }
   ```

3. **Veri İşleme Onayı**
   - Kayıt sırasında KVKK onayı al
   - Cookie consent banner ekle

4. **Veri Şifreleme**
   - Hassas veriler (VKN, banka bilgileri) şifreli saklan
   - Firebase'de encryption-at-rest otomatik

---

## 📊 VERİ GÖÇİ PLANI (Migration)

### **Senaryo: Kullanıcı Excel'den veri yüklüyor**

**Adımlar:**
1. **Frontend Upload:**
   ```javascript
   // Dosya yükle (max 10MB)
   // Parse et (xlsx, csv)
   // Validate et (schema kontrolü)
   ```

2. **Backend Processing:**
   ```javascript
   // Cloud Function çalışır
   // Verileri normalize et
   // Firestore'a batch write yap
   ```

3. **Veri Mapping:**
   ```javascript
   // Excel kolonları → Firestore fields
   // Hatalı veriyi yakala ve raporla
   ```

---

## 🔄 REAL-TIME SYNC STRATEJİSİ

### **Hangi Veriler Real-time Olmalı:**

✅ **Real-time:**
- Dashboard widget'ları
- Kullanım limitleri
- Bildirimler

❌ **Real-time DEĞİL (Batch):**
- Finansal raporlar (günlük)
- Analytics (saatlik)
- Backup'lar (günlük)

---

## 🛡️ VERİ GÜVENLİĞİ CHECKLİST

### **Production'a Almadan Önce:**

- [ ] Firestore Rules production'a deploy edildi
- [ ] Otomatik backup kuruldu
- [ ] Admin paneli oluşturuldu
- [ ] KVKK metinleri eklendi
- [ ] Veri silme/indirme fonksiyonları hazır
- [ ] Hassas veriler şifreleniyor
- [ ] Rate limiting aktif
- [ ] Monitoring/alerting kuruldu

---

## 📞 DESTEK & SORUN GİDERME

### **Firestore Limitleri:**

| Limit | Değer |
|-------|-------|
| Max document size | 1 MB |
| Max field size | 1 MB |
| Max collection depth | 100 |
| Max write/second | 10,000 |
| Max queries/second | 1,000,000 |

### **Sorun Yaşarsan:**

1. Firebase Console → Firestore → Usage
2. Query performance analiz et
3. Index'leri kontrol et
4. Rate limiting loglarına bak

---

## 🎯 SONRAKI ADIMLAR

### **Hemen Yapılacaklar (Kırmızı Alarm):**

1. ✅ **Firestore Rules Deploy Et**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. ⏳ **Otomatik Backup Kur**
   - Firebase Console'dan aktifleştir

3. ⏳ **Index'leri Oluştur**
   - Composite index'ler ekle

---

### **Bu Ay Yapılacaklar:**

4. Admin paneli geliştir
5. Veri export/import fonksiyonları
6. KVKK compliance dökümanları
7. Monitoring & alerting

---

### **Gelecek Ay:**

8. Advanced analytics
9. Data migration tools
10. Performance optimization

---

**Son Güncelleme:** 28 Aralık 2025  
**Sorumlu:** Development Team  
**Status:** 🟢 Active & Monitored

