# CRITICAL FIXES REQUIRED - ACTION PLAN

## PRODUCTION BLOCKERS (Must Fix Before Launch)

### 1. File Content Persistence - ❌ CRITICAL
**Problem:** File content stored in runtime memory, lost on page refresh  
**Impact:** Users cannot create dashboards from previously uploaded files  
**Files:** `src/store/runtimeFileStore.ts`, `src/utils/userDataStorage.ts`

**Fix:**
```typescript
// Option A: Use IndexedDB
// Install: npm install idb
// src/store/persistentFileStore.ts

import { openDB } from 'idb';

const DB_NAME = 'finops-file-content';
const STORE_NAME = 'files';

export async function saveFileContent(id: string, content: string) {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  await db.put(STORE_NAME, content, id);
}

export async function getFileContent(id: string): Promise<string | null> {
  const db = await openDB(DB_NAME, 1);
  return (await db.get(STORE_NAME, id)) || null;
}
```

**Update Location:** `src/pages/DataImportPage.tsx:128`
```typescript
// Replace runtime store with IndexedDB
import { saveFileContent } from '../store/persistentFileStore';
await saveFileContent(savedFile.id, cleanContent);
```

---

### 2. CSV Validation - ❌ CRITICAL
**Problem:** Malformed CSV files accepted, causes silent failures  
**Impact:** Users upload broken files, dashboard creation fails with unclear errors  
**File:** `src/utils/csvParser.ts:19-22`

**Fix:**
```typescript
// src/utils/csvParser.ts
export async function parseCSVFile(file: File | string): Promise<ParsedCSVData> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        // ✅ VALIDATE RESULTS
        if (results.errors.length > 0) {
          const criticalErrors = results.errors.filter(
            e => e.type === 'Delimiter' || e.type === 'MissingQuotes'
          );
          if (criticalErrors.length > 0) {
            reject(new Error(
              `CSV formatı geçersiz:\n\n${criticalErrors.map(e => 
                `Satır ${e.row}: ${e.message}`
              ).join('\n')}`
            ));
            return;
          }
        }
        
        const headers = results.meta.fields || [];
        const rows = results.data as Record<string, any>[];
        
        // ✅ VALIDATE HEADERS
        if (headers.length === 0) {
          reject(new Error('CSV dosyasında başlık satırı bulunamadı'));
          return;
        }
        
        const invalidHeaders = headers.filter(h => !h || h.trim() === '');
        if (invalidHeaders.length > 0) {
          reject(new Error('CSV başlıklarında boş sütun var'));
          return;
        }
        
        // ✅ VALIDATE ROWS
        if (rows.length === 0) {
          reject(new Error('CSV dosyasında veri satırı bulunamadı'));
          return;
        }
        
        resolve({
          headers,
          rows,
          rowCount: rows.length,
          columnCount: headers.length,
        });
      },
      error: (error) => {
        reject(new Error(`CSV okuma hatası: ${error.message}`));
      },
    });
  });
}
```

---

### 3. Session State Warning - ❌ CRITICAL
**Problem:** No warning before navigating away from wizard  
**Impact:** Users lose progress when clicking browser back  
**File:** `src/components/dashboard-wizard/DashboardWizard.tsx`

**Fix:**
```typescript
// Add at top of component
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (state.selectedFile && step > 0) {
      e.preventDefault();
      e.returnValue = 'Dashboard oluşturma işleminiz devam ediyor. Çıkmak istediğinizden emin misiniz?';
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
  return () => window.removeEventListener('beforeunload', handleBeforeUnload);
}, [state.selectedFile, step]);
```

---

## HIGH PRIORITY FIXES

### 4. Add JSON URL Support
**File:** `src/components/dashboard-wizard/steps/URLDataSource.tsx:130`

**Fix:**
```typescript
// After fetch response
const contentType = response.headers.get('content-type') || '';

let csvText: string;
if (contentType.includes('application/json')) {
  const json = await response.json();
  // Convert JSON array to CSV
  if (Array.isArray(json) && json.length > 0) {
    const headers = Object.keys(json[0]);
    const csvRows = json.map(obj => 
      headers.map(h => {
        const val = obj[h];
        return typeof val === 'string' && val.includes(',') 
          ? `"${val}"` 
          : val;
      }).join(',')
    );
    csvText = [headers.join(','), ...csvRows].join('\n');
  } else {
    throw new Error('JSON verisi dizi formatında olmalı');
  }
} else {
  csvText = await response.text();
}
```

---

### 5. Consolidate Routing
**File:** `src/App.tsx:103, 186`

**Fix:**
```typescript
// Remove duplicate routes, keep only one
<Route path="/veri-girisi" element={
  <ProtectedRoute>  {/* Change from AdminProtectedRoute */}
    <DataImportPage />
  </ProtectedRoute>
} />

// Remove line 186 /data-ingestion or redirect:
<Route path="/data-ingestion" element={<Navigate to="/veri-girisi" replace />} />
```

---

### 6. Add Filter Step to Wizard
**File:** Create `src/components/dashboard-wizard/steps/FilterSelection.tsx`

```typescript
import React from 'react';
import { WizardState } from '../DashboardWizard';

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export const FilterSelection: React.FC<Props> = ({ state, updateState }) => {
  const [filters, setFilters] = React.useState<Array<{
    column: string;
    operator: 'equals' | 'contains' | 'greater' | 'less';
    value: string;
  }>>([]);
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Filtre Tanımlama (Opsiyonel)</h2>
      {/* Filter configuration UI */}
    </div>
  );
};
```

**Update `DashboardWizard.tsx`:**
```typescript
const STEPS = ['Veri Seçimi', 'KPI Tanımlama', 'Grafik Tanımlama', 'Filtreler', 'Önizleme', 'Kaydet'];
// Add filter step at position 3
```

---

### 7. Semantic Mapping for Multi-Dataset
**File:** Create `src/utils/semanticMapper.ts`

```typescript
export const SEMANTIC_FIELDS = {
  DATE: ['tarih', 'date', 'gun', 'ay', 'yil', 'time', 'zaman'],
  REVENUE: ['gelir', 'revenue', 'satış', 'sales', 'hasılat'],
  COST: ['maliyet', 'cost', 'gider', 'expense', 'harcama'],
  QUANTITY: ['adet', 'quantity', 'miktar', 'amount'],
  CUSTOMER: ['müşteri', 'customer', 'firma', 'company'],
  PRODUCT: ['ürün', 'product', 'hizmet', 'service'],
  CATEGORY: ['kategori', 'category', 'grup', 'group'],
};

export function detectSemantic(columnName: string): string | null {
  const lower = columnName.toLowerCase();
  for (const [semantic, keywords] of Object.entries(SEMANTIC_FIELDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return semantic;
    }
  }
  return null;
}
```

---

## IMPLEMENTATION PRIORITY

**Week 1:**
1. ✅ Implement IndexedDB storage (Fix #1)
2. ✅ Add CSV validation (Fix #2)
3. ✅ Add navigation warning (Fix #3)

**Week 2:**
4. ✅ JSON URL support (Fix #4)
5. ✅ Consolidate routing (Fix #5)

**Week 3:**
6. ✅ Filter step (Fix #6)
7. ✅ Semantic mapping (Fix #7)

---

## TESTING AFTER FIXES

### Manual Test Checklist
- [ ] Upload CSV via drag-drop
- [ ] Refresh page, verify file content still accessible
- [ ] Create dashboard, navigate away, verify warning shown
- [ ] Upload malformed CSV, verify clear error message
- [ ] Load JSON from URL, verify conversion works
- [ ] Test with 10MB+ CSV file
- [ ] Test with non-UTF-8 file (Turkish characters)
- [ ] Create dashboard with filters
- [ ] Test semantic mapping with Turkish column names

### Automated Tests (Recommended)
```typescript
// tests/dataIngestion.test.ts
describe('Data Ingestion', () => {
  it('should persist file content after refresh', async () => {
    // Upload file
    // Refresh page
    // Verify content still available
  });
  
  it('should reject malformed CSV', async () => {
    // Upload broken CSV
    // Expect error with specific message
  });
});
```

---

**Last Updated:** 2026-01-20  
**Status:** Ready for implementation  
**Estimated Effort:** 40-60 hours
