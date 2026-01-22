# Phase 2 Integration Guide

## Quick Start: Enabling Multi-Dataset Mode

To enable multi-dataset features in the DashboardWizard, you have two options:

### Option 1: Add Toggle in Wizard (Recommended)

Add a toggle button in the wizard to let users choose:

```typescript
// In DashboardWizard.tsx

const [multiMode, setMultiMode] = useState(false);

// At the start of the wizard (before step 0)
<div className="mb-6 flex items-center gap-4 justify-center">
  <button
    onClick={() => setMultiMode(false)}
    className={`px-6 py-3 rounded-lg font-medium ${
      !multiMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
    }`}
  >
    Tek Veri Seti
  </button>
  <button
    onClick={() => setMultiMode(true)}
    className={`px-6 py-3 rounded-lg font-medium ${
      multiMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
    }`}
  >
    Çoklu Veri Seti (Gelişmiş)
  </button>
</div>
```

### Option 2: Separate Wizard Routes

Create two separate wizard instances:

```typescript
// In App.tsx or router config
<Route path="/dashboard-wizard" element={<DashboardWizard multiMode={false} />} />
<Route path="/dashboard-wizard-multi" element={<DashboardWizard multiMode={true} />} />
```

---

## Integration Steps

### Step 1: Update Wizard Steps

```typescript
// In DashboardWizard.tsx

const STEPS_SINGLE = [
  'Veri Seçimi',
  'KPI Tanımlama (6)',
  'Grafik Tanımlama (5)',
  'Önizleme',
  'Kaydet'
];

const STEPS_MULTI = [
  'Veri Seçimi',           // MultiDatasetSelection
  'Join Yapılandırması',    // JoinConfigStep
  'Semantik Eşleştirme',   // SemanticMapper
  'KPI Tanımlama (6)',
  'Grafik Tanımlama (5)',
  'Önizleme',
  'Kaydet'
];

const STEPS = state.multiDatasetMode ? STEPS_MULTI : STEPS_SINGLE;
```

### Step 2: Add Imports

```typescript
// At the top of DashboardWizard.tsx
import { MultiDatasetSelection } from './steps/MultiDatasetSelection';
import { JoinConfigStep } from './steps/JoinConfigStep';
import { SemanticMapper } from './steps/SemanticMapper';
```

### Step 3: Add Step Rendering

```typescript
// In the wizard step content area

{/* Step 0: Data Selection */}
{step === 0 && !state.multiDatasetMode && (
  <DataSourceSelection 
    userFiles={userFiles} 
    selectedFile={state.selectedFile}
    onFileSelect={handleFileSelect}
    userEmail={currentUser?.email}
    onURLDataLoaded={(fileId) => {
      const file = userFiles.find(f => f.id === fileId);
      if (file) handleFileSelect(file);
    }}
  />
)}

{step === 0 && state.multiDatasetMode && (
  <MultiDatasetSelection
    userFiles={userFiles}
    state={state}
    updateState={updateState}
  />
)}

{/* Step 1: Join Config (Multi-mode only) */}
{step === 1 && state.multiDatasetMode && (
  <JoinConfigStep
    state={state}
    updateState={updateState}
    userFiles={userFiles}
    parsedDatasets={parsedDatasetsMap}
  />
)}

{/* Step 2: Semantic Mapper (Multi-mode only) */}
{step === 2 && state.multiDatasetMode && (
  <SemanticMapper
    state={state}
    updateState={updateState}
    userFiles={userFiles}
    parsedDatasets={parsedDatasetsMap}
  />
)}

{/* Adjust KPI, Chart, Preview, Save steps based on mode */}
```

### Step 4: Create Parsed Datasets Map

```typescript
// In DashboardWizard.tsx component

const [parsedDatasetsMap, setParsedDatasetsMap] = useState<Map<string, { headers: string[]; rows: any[] }>>(new Map());

// When datasets are selected in multi-mode, parse them
useEffect(() => {
  if (state.multiDatasetMode && state.referencedDatasets) {
    state.referencedDatasets.forEach(async (datasetId) => {
      const file = userFiles.find(f => f.id === datasetId);
      if (file && !parsedDatasetsMap.has(datasetId)) {
        const parsed = await parseDataset(file);
        setParsedDatasetsMap(prev => new Map(prev).set(datasetId, parsed));
      }
    });
  }
}, [state.referencedDatasets, userFiles]);
```

### Step 5: Update Navigation Logic

```typescript
const canProceed = () => {
  if (state.multiDatasetMode) {
    switch (step) {
      case 0: return (state.referencedDatasets?.length || 0) >= 2;
      case 1: return (state.joinConfigs?.length || 0) >= 1;
      case 2: return true; // Semantic mapping optional
      case 3: return state.selectedKpis.length >= 1;
      case 4: return state.selectedCharts.length >= 1;
      case 5: return true;
      case 6: return state.dashboardName.trim().length > 0;
      default: return false;
    }
  } else {
    // Original Phase 1 logic
    switch (step) {
      case 0: return state.selectedFile !== null;
      case 1: return state.selectedKpis.length >= 1;
      case 2: return state.selectedCharts.length >= 1;
      case 3: return true;
      case 4: return state.dashboardName.trim().length > 0;
      default: return false;
    }
  }
};
```

---

## URL Data Source Integration

### Option 1: In Data Import Page

```typescript
// In DataImportPage.tsx or similar

import { URLDataSource } from '../components/dashboard-wizard/steps/URLDataSource';

<URLDataSource
  userEmail={currentUser.email}
  onDataLoaded={(fileId) => {
    alert('Veri kütüphaneye eklendi!');
    // Optionally navigate to wizard
    navigate('/dashboard-wizard');
  }}
/>
```

### Option 2: In Wizard Data Selection

Already integrated in `DataSourceSelection.tsx` (optional, shown when `userEmail` and `onURLDataLoaded` props provided).

---

## AI Suggestions Integration

AI suggestions are already built into the `SemanticMapper` component. They are **disabled by default**.

To enable:

```typescript
// User must check the box in SemanticMapper UI
state.aiSuggestionsEnabled = true;
```

Or enable globally:

```typescript
import { enableAISuggestions } from '../utils/aiSuggestions';

// Enable for all users
enableAISuggestions(true);
```

---

## Example: Complete Multi-Dataset Flow

```typescript
// 1. User selects multi-dataset mode
updateState({ multiDatasetMode: true });

// 2. Step 0: Select datasets
updateState({ 
  referencedDatasets: ['sales_2023', 'inventory_2023'] 
});

// 3. Step 1: Configure join
updateState({
  joinConfigs: [{
    leftDataset: 'sales_2023',
    rightDataset: 'inventory_2023',
    joinType: 'inner',
    leftKey: 'product_id',
    rightKey: 'product_id'
  }]
});

// 4. Step 2: Map semantic fields (optional)
updateState({
  semanticMappings: [
    { datasetId: 'sales_2023', column: 'revenue', semanticId: 'revenue' },
    { datasetId: 'inventory_2023', column: 'stock', semanticId: 'quantity' }
  ]
});

// 5. Step 3-6: Continue with KPI/Chart selection (same as Phase 1)
```

---

## Data Processing After Join

When saving the dashboard, you need to process joined data:

```typescript
const processJoinedData = () => {
  if (!state.multiDatasetMode || !state.joinConfigs) {
    return state.parsedData; // Phase 1: single dataset
  }

  // Phase 2: Apply joins
  let result = parsedDatasetsMap.get(state.referencedDatasets[0]);
  
  state.joinConfigs.forEach(join => {
    const leftData = parsedDatasetsMap.get(join.leftDataset);
    const rightData = parsedDatasetsMap.get(join.rightDataset);
    
    result = performJoin(leftData, rightData, join);
  });

  return result;
};

// Helper function
const performJoin = (left, right, config) => {
  const joined = [];
  
  left.rows.forEach(leftRow => {
    const leftValue = leftRow[config.leftKey];
    const rightRow = right.rows.find(r => r[config.rightKey] === leftValue);
    
    if (rightRow || config.joinType === 'left') {
      joined.push({ ...leftRow, ...(rightRow || {}) });
    }
  });

  return {
    headers: [...new Set([...left.headers, ...right.headers])],
    rows: joined
  };
};
```

---

## Testing the Integration

### Test Case 1: Single Dataset (Phase 1)

1. Start wizard with `multiDatasetMode = false`
2. Select one dataset
3. Define KPIs
4. Define charts
5. Save dashboard
6. ✅ Should work exactly as before

### Test Case 2: Multi-Dataset (Phase 2)

1. Start wizard with `multiDatasetMode = true`
2. Select 2 datasets
3. Configure join
4. Map semantic fields
5. Define KPIs (using joined data)
6. Define charts (using joined data)
7. Save dashboard
8. ✅ Should create multi-dataset dashboard

### Test Case 3: URL Data Source

1. Open URL data source component
2. Enter URL (e.g., https://example.com/data.csv)
3. Click "Yükle"
4. ✅ Should save to library
5. Navigate to wizard
6. ✅ Should see URL-loaded dataset in list

---

## Troubleshooting

### Issue: "parsedDatasetsMap is undefined"

**Solution:** Initialize the map in component state:

```typescript
const [parsedDatasetsMap, setParsedDatasetsMap] = useState(new Map());
```

### Issue: "Join preview is empty"

**Solution:** Ensure join keys have matching data types and values.

### Issue: "URL source fails"

**Solution:** Check CORS policy. May need to download and upload manually.

### Issue: "AI suggestions not showing"

**Solution:** Enable checkbox in SemanticMapper component.

---

## Performance Tips

1. **Lazy Load Components:** Use React.lazy() for multi-dataset steps
2. **Limit Preview:** Keep join preview at 5 rows max
3. **Debounce AI:** Debounce AI suggestion calls by 500ms
4. **Cache Joins:** Cache join results in memory during wizard session

---

## Next Steps

1. Integrate components into wizard (follow steps above)
2. Test both single and multi-dataset modes
3. Add user documentation
4. Deploy to staging
5. Gather user feedback
6. Iterate and improve

---

**Questions?** See `PHASE_2_IMPLEMENTATION.md` for detailed technical documentation.
