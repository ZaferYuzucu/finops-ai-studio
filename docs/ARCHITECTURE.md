# FinOps AI Studio - Data Architecture

## Overview

Multi-layered data architecture supporting single and multi-source dashboards.

## Layer 1: Data Ingestion

**Location:** `src/modules/data-ingestion/`

**Components:**
- CSV/Excel parsing
- Sheet discovery
- Header detection
- Column mapping
- Data validation
- Normalization

**Output:** `NormalizedRow[]` stored per dataset

## Layer 2: Semantic Layer

**Location:** `src/types/semanticLayer.ts`

**Purpose:**
- Map dataset columns to business entities
- Enable cross-dataset consistency
- Support semantic queries

**Entities:**
- Metrics: revenue, cost, profit, quantity
- Dimensions: product, category, location, customer
- Temporal: date, month, year, quarter

**Storage:** `semanticMappings` in Dataset metadata

## Layer 3: Data Joining

**Location:** `src/utils/dataJoiner.ts`

**Capabilities:**
- Inner, left, right, full joins
- Multiple join keys
- Sequential multi-dataset joins
- Non-destructive (runtime only)

**Limitations (v1):**
- 2 datasets per dashboard
- Manual join key selection
- No AI assistance yet

## Layer 4: Dashboard Runtime

**Location:** `src/components/dashboard-wizard/`

**Scope Tracking:**
- Referenced datasets
- Semantic field usage
- Join configurations
- Data grain

**Reproducibility:**
- PDF export uses same scope
- Shared dashboards refresh from scope
- Scheduled updates use stored config

## Data Flow

```
1. Raw File Upload
   ↓
2. Normalization (column mapping, type validation)
   ↓
3. Semantic Mapping (optional, recommended for multi-dataset)
   ↓
4. Dataset Library Storage
   ↓
5. Dashboard Creation (select datasets, define joins)
   ↓
6. Runtime Join Execution
   ↓
7. Chart Rendering
```

## Future Enhancements

### Phase 2 (Q2 2026)
- [ ] 3+ dataset dashboards
- [ ] AI-assisted join suggestions
- [ ] Semantic field auto-mapping
- [ ] Custom semantic fields

### Phase 3 (Q3 2026)
- [ ] URL/API data sources
- [ ] ERP integrations (SAP, Oracle)
- [ ] Real-time streaming data
- [ ] Data versioning

### Phase 4 (Q4 2026)
- [ ] Data catalog
- [ ] Lineage tracking
- [ ] Automated data quality checks
- [ ] Federated queries

## Technical Constraints

1. **No Breaking Changes**
   - All additions backward-compatible
   - Existing dashboards continue working

2. **Framework Agnostic**
   - Core logic in pure TypeScript
   - UI framework interchangeable

3. **User-Scoped**
   - All data isolated per user
   - No cross-user queries

4. **Client-Side First**
   - localStorage for MVP
   - Firebase/Supabase migration planned

## Performance Considerations

- In-memory joins (< 100K rows)
- Lazy loading for large datasets
- Indexed lookups for joins
- Cached semantic mappings

## Security

- Client-side data encryption (planned)
- No raw data in logs
- Audit trail for data access
- GDPR compliance ready
