# Semantic Layer Guide

## What is a Semantic Layer?

A lightweight abstraction that maps dataset columns to business concepts.

**Example:**
```
Dataset A: "Toplam_Gelir" (Turkish)
Dataset B: "Total_Revenue" (English)
Dataset C: "Sales_Amount"

All map to semantic field: "revenue"
```

## Benefits

1. **Consistency** - Query "revenue" across all datasets
2. **Flexibility** - Add new data sources without breaking dashboards
3. **Clarity** - Business terms, not technical column names
4. **Joins** - Match datasets by semantic fields, not exact names

## Standard Semantic Fields

### Metrics (Measurable Values)
- `revenue` - Total income
- `cost` - Expenses
- `profit` - Net profit
- `quantity` - Item count
- `price` - Unit price
- `margin` - Profit margin %

### Dimensions (Categories)
- `product` - Product name/ID
- `category` - Product category
- `location` - Geographic location
- `customer` - Customer name/ID
- `region` - Sales region
- `branch` - Branch/Store ID

### Temporal (Time-Based)
- `date` - Full date
- `month` - Month
- `year` - Year
- `quarter` - Quarter

## How to Map

### During Upload
1. Upload file
2. Map columns step appears
3. Select semantic field for each column
4. System suggests based on column names

### After Upload
1. Go to dataset library
2. Click "Edit Mappings"
3. Update semantic fields
4. Save

## Custom Semantic Fields

Not yet supported.
Use standard fields or leave unmapped.

**Planned (Q2 2026):**
- Custom field creation
- Field hierarchies (Product → Category → Sub-Category)
- Calculated fields

## Using Semantic Fields in Dashboards

1. Select datasets
2. System shows available semantic fields
3. Choose fields for charts
4. Join by semantic fields (auto-matched)

## Best Practices

1. Map all key columns
2. Use consistent semantics across datasets
3. Document custom interpretations
4. Review mappings when data structure changes

## Technical Details

**Storage:**
- Per-dataset semantic mappings
- Stored in dataset metadata
- Non-destructive (original columns unchanged)

**Query Time:**
- Mapping applied at runtime
- No data duplication
- Fast lookups via in-memory index
