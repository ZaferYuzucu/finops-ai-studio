# 🔬 Firestore Diagnostics Collection Örneği

## Collection Yapısı

```
/diagnostics/events/logs/{logId}
```

## Örnek Dokümanlar

### Örnek 1: CSV Parse Warning
```json
{
  "id": "log_abc123",
  "userId": "user_xyz789",
  "email": "user@example.com",
  "eventType": "CSV_PARSE_WARNING",
  "fileId": "file_def456",
  "confidenceScore": 0.65,
  "message": "CSV parse uyarıları: Delimiter belirsiz, Decimal separator tespit edilemedi",
  "metadata": {
    "warnings": [
      "Delimiter belirsiz",
      "Decimal separator tespit edilemedi"
    ]
  },
  "createdAt": "2026-01-27T10:30:00Z"
}
```

### Örnek 2: Low Confidence
```json
{
  "id": "log_ghi789",
  "userId": "user_xyz789",
  "email": "user@example.com",
  "eventType": "CONFIDENCE_LOW",
  "dashboardId": "dashboard_jkl012",
  "confidenceScore": 0.55,
  "riskFlags": [
    {
      "code": "LOW_CONFIDENCE",
      "severity": "high",
      "message": "Dashboard güven skoru çok düşük"
    },
    {
      "code": "ASSUMPTIONS_BLOCKED",
      "severity": "medium",
      "message": "2 varsayım engellendi"
    }
  ],
  "message": "Dashboard güven skoru düşük: %55",
  "createdAt": "2026-01-27T10:35:00Z"
}
```

### Örnek 3: Dashboard Fallback
```json
{
  "id": "log_mno345",
  "userId": "user_xyz789",
  "email": "user@example.com",
  "eventType": "DASHBOARD_FALLBACK",
  "dashboardId": "dashboard_pqr678",
  "message": "Dashboard fallback modda render edildi: Veri eksikliği - placeholder kullanıldı",
  "createdAt": "2026-01-27T10:40:00Z"
}
```

### Örnek 4: Runtime Error
```json
{
  "id": "log_stu901",
  "userId": "user_xyz789",
  "email": "user@example.com",
  "eventType": "RUNTIME_ERROR",
  "message": "Cannot read property 'map' of undefined",
  "metadata": {
    "errorName": "TypeError",
    "errorStack": "TypeError: Cannot read property 'map' of undefined\n    at DashboardFactory...",
    "context": {
      "component": "DashboardFactory",
      "action": "render"
    }
  },
  "createdAt": "2026-01-27T10:45:00Z"
}
```

### Örnek 5: Assumption Blocked
```json
{
  "id": "log_vwx234",
  "userId": "user_xyz789",
  "email": "user@example.com",
  "eventType": "ASSUMPTION_BLOCKED",
  "fileId": "file_yza567",
  "message": "2 varsayım engellendi",
  "metadata": {
    "blockedAssumptions": [
      "\"Gelir\" sütunu numeric olarak işaretlendi ancak güven skoru düşük (65%)",
      "Hiçbir sütun yüksek güvenle numeric olarak tespit edilemedi"
    ]
  },
  "createdAt": "2026-01-27T10:50:00Z"
}
```

## Query Örnekleri

### Admin: Son 100 Log
```typescript
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

### Admin: Belirli Event Type
```typescript
import { where } from 'firebase/firestore';

const errorLogsQuery = query(
  logsRef,
  where('eventType', '==', 'RUNTIME_ERROR'),
  orderBy('createdAt', 'desc'),
  limit(50)
);
```

### Admin: Düşük Confidence Dashboard'lar
```typescript
const lowConfidenceQuery = query(
  logsRef,
  where('eventType', '==', 'CONFIDENCE_LOW'),
  where('confidenceScore', '<', 0.7),
  orderBy('confidenceScore', 'asc'),
  limit(50)
);
```

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

## Admin Panel Entegrasyonu (Gelecek)

Admin panelinde diagnostic logları görüntülemek için:

```typescript
// src/pages/admin/DiagnosticsPage.tsx (gelecekte oluşturulabilir)
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function DiagnosticsPage() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const logsRef = collection(db, 'diagnostics', 'events', 'logs');
    const logsQuery = query(logsRef, orderBy('createdAt', 'desc'), limit(100));
    
    getDocs(logsQuery).then(snapshot => {
      setLogs(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, []);
  
  // Render logs table...
}
```
