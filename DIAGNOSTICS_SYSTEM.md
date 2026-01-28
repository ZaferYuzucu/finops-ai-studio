# 🔬 ADMIN-ONLY DIAGNOSTICS & ERROR LOG SYSTEM

## Genel Bakış

Kullanıcı hiçbir şey hissetmez. Sistem asla durmaz. Admin her şeyi görebilir.

## Firestore Collection Yapısı

```
/diagnostics/events/logs/{logId}
├─ id: string (auto)
├─ userId?: string
├─ email?: string
├─ eventType: 'CSV_PARSE_WARNING' | 'CONFIDENCE_LOW' | 'DASHBOARD_FALLBACK' | 'RUNTIME_ERROR' | 'ASSUMPTION_BLOCKED' | 'DATA_QUALITY_ISSUE'
├─ dashboardId?: string
├─ fileId?: string
├─ confidenceScore?: number (0-1)
├─ riskFlags?: Array<{code, severity, message}>
├─ message: string (kısa, okunabilir)
├─ metadata?: Record<string, any>
└─ createdAt: serverTimestamp
```

## Log Noktaları

### 1. Anti-Chaos Pipeline
- **Nokta:** `src/utils/antiChaos/index.ts`
- **Durum:** Confidence < 0.8
- **Event Type:** `CONFIDENCE_LOW`
- **Log:** Confidence score ve risk flags

### 2. CSV Parse Fallback
- **Nokta:** `src/pages/DataImportPage.tsx`
- **Durum:** Anti-Chaos başarısız, eski yöntem kullanıldı
- **Event Type:** `CSV_PARSE_WARNING`
- **Log:** Fallback kullanıldı bilgisi

### 3. Dashboard Fallback
- **Nokta:** `src/components/dashboards/DashboardFactory.tsx`
- **Durum:** Veri eksik, placeholder kullanıldı
- **Event Type:** `DASHBOARD_FALLBACK`
- **Log:** Fallback nedeni

### 4. Runtime Error
- **Nokta:** `src/utils/antiChaos/globalErrorBoundary.tsx` ve `src/components/ErrorBoundary.tsx`
- **Durum:** Error boundary hata yakaladı
- **Event Type:** `RUNTIME_ERROR`
- **Log:** Error mesajı ve stack trace

### 5. Assumption Blocked
- **Nokta:** `src/utils/antiChaos/index.ts` ve `src/pages/DataImportPage.tsx`
- **Durum:** Varsayımlar engellendi
- **Event Type:** `ASSUMPTION_BLOCKED`
- **Log:** Engellenen varsayımlar listesi

## Firestore Rules

```javascript
match /diagnostics/events/logs/{logId} {
  // Admin can read all diagnostic logs
  allow read: if isAdmin();
  
  // Authenticated users can write their own diagnostic events
  allow create: if isAuthenticated() && 
                 (request.resource.data.userId == request.auth.uid || 
                  request.resource.data.userId == null);
  
  // No update/delete (logs are immutable)
  allow update, delete: if false;
}
```

## Güvenlik Özellikleri

1. **Try/Catch Koruması:** Her log çağrısı try/catch içinde
2. **UI Etkilenmez:** Firestore yazılamazsa sessizce atlanır
3. **Admin Only Read:** Sadece admin rolü okuyabilir
4. **Immutable Logs:** Loglar değiştirilemez/silinemez

## Kullanım Örnekleri

### CSV Parse Warning
```typescript
await logCSVParseWarning(
  userId,
  email,
  fileId,
  ['Delimiter belirsiz', 'Decimal separator tespit edilemedi'],
  0.65
);
```

### Low Confidence
```typescript
await logLowConfidence(
  userId,
  email,
  dashboardId,
  0.55,
  [{ code: 'LOW_CONFIDENCE', severity: 'high', message: '...' }]
);
```

### Dashboard Fallback
```typescript
await logDashboardFallback(
  userId,
  email,
  dashboardId,
  'Veri eksikliği - placeholder kullanıldı'
);
```

### Runtime Error
```typescript
await logRuntimeError(
  userId,
  email,
  error,
  { component: 'DashboardFactory', action: 'render' }
);
```

## Admin Panel Entegrasyonu (Gelecek)

```typescript
// Admin panelinde diagnostic logları okuma
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const logsRef = collection(db, 'diagnostics', 'events', 'logs');
const logsQuery = query(logsRef, orderBy('createdAt', 'desc'), limit(100));
const snapshot = await getDocs(logsQuery);

const logs = snapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
}));
```

## Test Senaryoları

1. **Kötü CSV Yükle:**
   - CSV parse warning log düşer
   - Dashboard açılır (kullanıcı görmez)

2. **Düşük Confidence:**
   - Confidence low log düşer
   - Dashboard render edilir (kullanıcı görmez)

3. **Firestore Kapalı:**
   - Log yazılamaz ama sistem çalışmaya devam eder
   - Console'da warning görünür (dev mode)

4. **Runtime Error:**
   - Error boundary yakalar
   - Runtime error log düşer
   - Kullanıcı friendly error görür

## Önemli Notlar

- ✅ Kullanıcı hiçbir şey hissetmez
- ✅ Sistem asla durmaz
- ✅ Admin her şeyi görebilir
- ✅ Loglar immutable (değiştirilemez)
- ✅ Firestore yazılamazsa UI etkilenmez
