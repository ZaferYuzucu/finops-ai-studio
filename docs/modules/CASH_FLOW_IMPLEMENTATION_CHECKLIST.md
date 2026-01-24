# ✅ Nakit Akışı Modülü - İmplementasyon Checklist

**Proje:** FinOps.ist Cash Flow Module  
**Hedef:** CSV-driven Cash Flow Management System  
**Tahmini Süre:** 8 hafta

---

## PHASE 1: Data Model & Backend (2 Hafta)

### Hafta 1: Database & Schema

- [ ] **Day 1-2:** Database design
  - [ ] PostgreSQL database oluştur
  - [ ] `ACTUAL_CASH_TXN` table schema
  - [ ] `FORECAST_CASH_EVENT` table schema
  - [ ] `MAPPING_RULES` table schema
  - [ ] `TENANT`, `COMPANY`, `BRANCH` tables
  - [ ] Indexes (txn_date, branch_id, counter_account)
  - [ ] Foreign key constraints

- [ ] **Day 3-4:** Seed data & testing
  - [ ] Restoran mapping rules insert (20+ rules)
  - [ ] Sample branches insert (3 şube)
  - [ ] Test data insert (100 transactions)
  - [ ] Query testing (SELECT, JOIN, GROUP BY)

- [ ] **Day 5:** Data access layer
  - [ ] Repository pattern setup
  - [ ] CRUD functions (TypeScript)
  - [ ] Connection pooling
  - [ ] Error handling

---

### Hafta 2: CSV Import & Transformation

- [ ] **Day 1-2:** CSV Parser
  - [ ] `npm install papaparse zod date-fns`
  - [ ] CSV reader service
  - [ ] Schema validation (Zod)
  - [ ] Error collection & reporting

- [ ] **Day 3:** Classification Engine
  - [ ] Mapping rules matcher
  - [ ] Pattern matching logic (`320.*` → regex)
  - [ ] Priority-based selection
  - [ ] Fallback to "Diğer" category

- [ ] **Day 4:** KDV Calculation
  - [ ] VAT profile parser (`"20%"` → `0.20`)
  - [ ] Reverse VAT calculation (gross → net + vat)
  - [ ] Edge cases (0%, 1%, 10%, 20%)

- [ ] **Day 5:** Payment Terms Engine
  - [ ] `DSO_X`, `DPO_X` logic
  - [ ] `POS_T1`, `POS_T2` logic
  - [ ] `PAYROLL_15`, `VAT_26`, `SGK_23` logic
  - [ ] Weekend/holiday adjustment
  - [ ] Recurrence generator (MONTHLY, WEEKLY)

---

## PHASE 2: API Layer (1 Hafta)

### Hafta 3: REST API

- [ ] **Day 1:** Import endpoints
  - [ ] `POST /api/cash-flow/import-actual`
  - [ ] `POST /api/cash-flow/import-forecast`
  - [ ] `POST /api/cash-flow/import-mapping`
  - [ ] File upload handling (multer/formidable)
  - [ ] Async processing (job queue optional)

- [ ] **Day 2:** Query endpoints
  - [ ] `GET /api/cash-flow/daily-actual`
  - [ ] `GET /api/cash-flow/weekly-forecast`
  - [ ] `GET /api/cash-flow/monthly-forecast`
  - [ ] Filters: branch_id, date_range, CF_Kalem

- [ ] **Day 3:** Aggregation endpoints
  - [ ] `GET /api/cash-flow/kpis` (dashboard KPIs)
  - [ ] `GET /api/cash-flow/summary` (özet)
  - [ ] `GET /api/cash-flow/alerts` (uyarılar)

- [ ] **Day 4:** Validation & reporting
  - [ ] `GET /api/cash-flow/validation-report/:import_id`
  - [ ] `GET /api/cash-flow/import-history`

- [ ] **Day 5:** Testing & docs
  - [ ] API testing (Postman/Insomnia)
  - [ ] API documentation (Swagger)
  - [ ] Error handling standardization

---

## PHASE 3: Frontend - Tables (2 Hafta)

### Hafta 4: Daily Actual Table (A4 Portrait)

- [ ] **Day 1:** Grid setup
  - [ ] `npm install ag-grid-community ag-grid-react`
  - [ ] AG-Grid React component
  - [ ] Column definitions
  - [ ] Row data fetching

- [ ] **Day 2:** KPI Strip
  - [ ] 4 KPI kartları component
  - [ ] Data aggregation (API call)
  - [ ] Change % calculation
  - [ ] Icon + color styling

- [ ] **Day 3:** Conditional formatting
  - [ ] Cell renderer (custom)
  - [ ] Color rules (green/red/yellow)
  - [ ] Icon injection (⭐⚠️💡)
  - [ ] Bold/italic rules

- [ ] **Day 4:** Row grouping & interactions
  - [ ] Group by CF_Bölüm
  - [ ] Expand/collapse rows
  - [ ] Cell click → detail modal
  - [ ] Hover tooltips

- [ ] **Day 5:** Export & print
  - [ ] Excel export (ag-grid native)
  - [ ] PDF print CSS (A4 Portrait)
  - [ ] Print preview button

---

### Hafta 5: Weekly Forecast Table (A4 Landscape)

- [ ] **Day 1:** 13-week grid
  - [ ] AG-Grid horizontal scroll setup
  - [ ] Dynamic column generation (W1-W13)
  - [ ] Freeze first column (CF_Kalem)
  - [ ] Row data fetching

- [ ] **Day 2:** KPI Strip + Monthly Summary
  - [ ] 5 KPI kartları (forecast-specific)
  - [ ] Monthly summary section (12 months)
  - [ ] Min/max bakiye detection

- [ ] **Day 3:** Conditional formatting
  - [ ] Cell color rules
  - [ ] Icon markers (⭐⚠️💡)
  - [ ] Threshold highlighting
  - [ ] Cumulative balance coloring

- [ ] **Day 4:** Alerts & insights
  - [ ] Alert detection logic
  - [ ] Insight generation (rule-based)
  - [ ] Alert box UI component

- [ ] **Day 5:** Export & print
  - [ ] Excel export (13-week + monthly)
  - [ ] PDF print CSS (A4 Landscape)
  - [ ] Custom file name generation

---

## PHASE 4: Dashboard Integration (1 Hafta)

### Hafta 6: Cash Flow Dashboard

- [ ] **Day 1:** Dashboard config
  - [ ] `dashboardConfigs.ts` içine `cash-flow-dashboard` ekle
  - [ ] 6 KPI tanımları
  - [ ] 3 Chart tanımları
  - [ ] Icon + color seçimi

- [ ] **Day 2:** Data service
  - [ ] API integration (React Query)
  - [ ] Data fetching hooks
  - [ ] Caching strategy
  - [ ] Error handling

- [ ] **Day 3:** Dashboard rendering
  - [ ] DashboardFactory ile render
  - [ ] KPI kartları test
  - [ ] Chart'lar test
  - [ ] Responsive test

- [ ] **Day 4:** Drill-down modal
  - [ ] Modal component
  - [ ] Table embed (içinde Daily Actual Table)
  - [ ] Filter synchronization
  - [ ] Close/open transitions

- [ ] **Day 5:** Filters & actions
  - [ ] Tarih filtresi
  - [ ] Şube filtresi
  - [ ] CF_Kalem multi-select
  - [ ] Export buttons
  - [ ] Share link generation

---

## PHASE 5: Validation & Alerts (1 Hafta)

### Hafta 7: Validations & Alert System

- [ ] **Day 1-2:** CSV validation engine
  - [ ] Required field validator
  - [ ] Date format validator
  - [ ] Duplicate detector
  - [ ] Business logic validator
  - [ ] Validation report generator

- [ ] **Day 3:** Alert detection
  - [ ] Negatif bakiye alert
  - [ ] Düşük bakiye warning
  - [ ] Anomali detection (spike/drop)
  - [ ] Missing data alert

- [ ] **Day 4:** Alert UI
  - [ ] Alert box component
  - [ ] Icon system (⭐⚠️🔴💡)
  - [ ] Priority sorting
  - [ ] Dismiss/acknowledge functionality

- [ ] **Day 5:** Validation report UI
  - [ ] Import summary modal
  - [ ] Error list table
  - [ ] Row number highlighting
  - [ ] Download error report (CSV)

---

## PHASE 6: Testing & Polish (1 Hafta)

### Hafta 8: Testing & Deployment

- [ ] **Day 1:** Unit tests
  - [ ] CSV parser tests
  - [ ] Classification tests
  - [ ] KDV calculation tests
  - [ ] Payment terms tests
  - [ ] Coverage > 80%

- [ ] **Day 2:** Integration tests
  - [ ] End-to-end CSV import
  - [ ] API flow testing
  - [ ] Dashboard data flow
  - [ ] Export testing

- [ ] **Day 3:** UAT (User Acceptance)
  - [ ] Gerçek restoran verisi ile test
  - [ ] Feedback toplama
  - [ ] Bug fixing

- [ ] **Day 4:** Performance optimization
  - [ ] Large CSV (10K+ rows)
  - [ ] Grid rendering (virtualization)
  - [ ] API caching
  - [ ] Database query optimization

- [ ] **Day 5:** Deployment
  - [ ] Production build
  - [ ] Vercel deployment
  - [ ] Database migration
  - [ ] Documentation final review

---

## TECHNICAL DEPENDENCIES

### NPM Packages

```json
{
  "dependencies": {
    "ag-grid-community": "^31.0.0",
    "ag-grid-react": "^31.0.0",
    "papaparse": "^5.4.1",
    "zod": "^3.22.4",
    "date-fns": "^3.0.0",
    "@tanstack/react-query": "^5.0.0",
    "recharts": "^2.10.0"
  },
  "devDependencies": {
    "@types/papaparse": "^5.3.14",
    "vitest": "^1.0.0"
  }
}
```

### Database

```sql
-- PostgreSQL 14+
-- Extensions:
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For pattern matching

-- Indexes:
CREATE INDEX idx_actual_txn_date ON ACTUAL_CASH_TXN(txn_date DESC);
CREATE INDEX idx_actual_branch ON ACTUAL_CASH_TXN(branch_id);
CREATE INDEX idx_forecast_payment_date ON FORECAST_CASH_EVENT(expected_payment_date);
CREATE INDEX idx_mapping_prefix ON MAPPING_RULES USING gin(counter_account_prefix gin_trgm_ops);
```

---

## FILE STRUCTURE

```
src/
├── modules/
│   └── cash-flow/
│       ├── components/
│       │   ├── DailyActualTable.tsx
│       │   ├── WeeklyForecastTable.tsx
│       │   ├── CashFlowKPIStrip.tsx
│       │   ├── AlertsBox.tsx
│       │   └── ImportValidationReport.tsx
│       ├── services/
│       │   ├── csvParser.ts
│       │   ├── classifier.ts
│       │   ├── vatCalculator.ts
│       │   ├── paymentTermsEngine.ts
│       │   └── cashFlowApi.ts
│       ├── types/
│       │   ├── cashFlowModels.ts
│       │   └── validationTypes.ts
│       ├── utils/
│       │   ├── formatters.ts
│       │   ├── validators.ts
│       │   └── aggregators.ts
│       └── hooks/
│           ├── useCashFlowData.ts
│           ├── useImportCSV.ts
│           └── useAlerts.ts
│
api/
└── cash-flow/
    ├── import-actual.ts
    ├── import-forecast.ts
    ├── daily-actual.ts
    ├── weekly-forecast.ts
    └── monthly-forecast.ts
```

---

## PRIORITY ORDER

### 🔴 CRITICAL (Week 1-2)
1. Database schema
2. CSV parser
3. Classification engine
4. KDV calculator
5. Payment terms engine

### 🟡 HIGH (Week 3-4)
6. API endpoints
7. Daily actual table
8. KPI strip
9. Validation engine

### 🟢 MEDIUM (Week 5-6)
10. Weekly forecast table
11. Dashboard integration
12. Alerts system
13. Export functions

### ⚪ LOW (Week 7-8)
14. Advanced filters
15. Drill-down modals
16. Performance optimization
17. Documentation

---

## SUCCESS CRITERIA

✅ Kullanıcı CSV yükleyebilir (< 5 saniye)  
✅ Otomatik classification çalışır (> 95% accuracy)  
✅ Daily actual table render olur (< 2 saniye)  
✅ Weekly forecast 13 hafta gösterir  
✅ KPI'lar doğru hesaplanır  
✅ PDF export çalışır (A4 optimize)  
✅ Validation report anlaşılır olur  
✅ Alert sistemi kritik durumları yakalar  

---

## NEXT STEPS

1. Database schema SQL script yaz
2. CSV parser servisini implement et
3. API endpoint'leri oluştur
4. AG-Grid tablolarını kur
5. Test ve deploy

---

**Checklist Sahibi:** Development Team  
**Son Güncelleme:** 23 Ocak 2026  
**Durum:** Ready to Start
