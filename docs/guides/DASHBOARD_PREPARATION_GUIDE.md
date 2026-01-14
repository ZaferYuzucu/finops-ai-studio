# 📊 Dashboard Creation Guide

## 🎯 Example: Automotive Thermostat Production Dashboard

This guide demonstrates a step-by-step dashboard creation process using the **termostat_uretim_takip_TR.csv** file.

---

## 📂 STEP 1: Data File Selection

**File:** `termostat_uretim_takip_TR.csv`

**Data Structure:**
- 📅 **Date:** Production date
- 🏭 **Production Order No:** Unique production tracking number
- 🔧 **Product Code:** TRST-A100, TRST-B200, TRST-C300
- ⚙️ **Production Stage:** Raw Material Preparation, Assembly, Quality Control
- 📦 **Units Produced:** Total production quantity
- ❌ **Defective Units:** Scrap/defective product count
- 💵 **Total Production Cost (USD):** Cost tracking
- 📊 **Finished Goods Stock:** Completed product inventory
- 🔄 **Work in Progress Stock:** Products being processed

**🤔 Why this file?**
- ✅ Tracks production processes
- ✅ Cost analysis available
- ✅ Scrap rates measurable
- ✅ Stock levels visible
- ✅ Time series analysis possible

---

## 📊 STEP 2: KPI Selection (6 Cards)

### 1️⃣ **Total Production Cost (USD)** 💰
- **Metric:** `SUM(Total_Production_Cost_USD)`
- **Why:** Most critical business indicator - total spending
- **Format:** `$123,456`
- **Color:** Blue (#3B82F6)
- **Icon:** 💵

### 2️⃣ **Total Units Produced** 📦
- **Metric:** `SUM(Units_Produced)`
- **Why:** Production capacity and volume indicator
- **Format:** `12,345 units`
- **Color:** Green (#10B981)
- **Icon:** 📦

### 3️⃣ **Defect Rate (%)** ❌
- **Metric:** `(SUM(Defective_Units) / SUM(Units_Produced)) * 100`
- **Why:** Quality control and scrap tracking
- **Format:** `2.5%`
- **Color:** Red (#EF4444)
- **Icon:** ⚠️

### 4️⃣ **Average Unit Cost** 💸
- **Metric:** `SUM(Total_Production_Cost_USD) / SUM(Units_Produced)`
- **Why:** Unit cost efficiency
- **Format:** `$4.25/unit`
- **Color:** Purple (#8B5CF6)
- **Icon:** 💸

### 5️⃣ **Finished Goods Stock Level** 📊
- **Metric:** `LAST(Finished_Goods_Stock)`
- **Why:** Completed product inventory tracking
- **Format:** `250 units`
- **Color:** Orange (#F59E0B)
- **Icon:** 📊

### 6️⃣ **Work in Progress (WIP) Stock** 🔄
- **Metric:** `LAST(WIP_Stock)`
- **Why:** Products in process tracking
- **Format:** `180 units`
- **Color:** Cyan (#06B6D4)
- **Icon:** 🔄

---

## 📈 STEP 3: Chart Selection (5 Charts - 3+2 Layout)

### **First Row: 3 Charts**

#### **Chart 1: Daily Production Trend** 📈
- **Type:** Line Chart
- **X-Axis:** Date
- **Y-Axis:** Units Produced
- **Why:** 
  - ✅ Shows production volume over time
  - ✅ Trend analysis possible
  - ✅ Seasonal variations visible
- **Color:** Green (#10B981)
- **Smooth:** Yes

#### **Chart 2: Cost by Production Stage** 📊
- **Type:** Bar Chart (Colored)
- **X-Axis:** Production Stage
- **Y-Axis:** Total Cost (USD)
- **Why:**
  - ✅ Which stage increases costs?
  - ✅ Optimization opportunities visible
  - ✅ Easy comparison
- **Colors:** Each bar different color (Green, Blue, Purple)

#### **Chart 3: Scrap Analysis by Product Code** ❌
- **Type:** Bar Chart (Colored)
- **X-Axis:** Product Code (TRST-A100, B200, C300)
- **Y-Axis:** Defective Units
- **Why:**
  - ✅ Which product has quality issues?
  - ✅ High scrap rate products stand out
  - ✅ Shows action areas
- **Colors:** Red tones

---

### **Second Row: 2 Charts**

#### **Chart 4: Stock Distribution (Finished vs WIP)** 🥧
- **Type:** Donut Chart
- **Data:** Finished Goods Stock vs WIP Stock
- **Why:**
  - ✅ Stock balance visible
  - ✅ WIP (Work in Progress) ratio clear
  - ✅ Cash tied up risk identified
- **Colors:** Orange (#F59E0B) and Cyan (#06B6D4)

#### **Chart 5: Cost Trend (Weekly)** 📉
- **Type:** Area Chart
- **X-Axis:** Date (weekly)
- **Y-Axis:** Total Cost (USD)
- **Why:**
  - ✅ Shows cost changes
  - ✅ Sudden increases/decreases visible
  - ✅ Budget tracking easier
- **Color:** Blue gradient (#3B82F6)

---

## 🎨 STEP 4: Dashboard Design

### **Layout (3+2 Design):**

```
┌─────────────────────────────────────────────────┐
│         📊 Dashboard Title                      │
│    Automotive Thermostat Production & Cost     │
└─────────────────────────────────────────────────┘

┌──────┬──────┬──────┬──────┬──────┬──────┐
│ KPI1 │ KPI2 │ KPI3 │ KPI4 │ KPI5 │ KPI6 │
│  💰  │  📦  │  ❌  │  💸  │  📊  │  🔄  │
└──────┴──────┴──────┴──────┴──────┴──────┘

┌────────────┬────────────┬────────────┐
│  Chart 1   │  Chart 2   │  Chart 3   │
│    📈      │    📊      │    ❌      │
│ Line Chart │ Bar Chart  │ Bar Chart  │
└────────────┴────────────┴────────────┘

┌─────────────────────┬─────────────────────┐
│     Chart 4         │     Chart 5         │
│        🥧           │        📉           │
│    Donut Chart      │    Area Chart       │
└─────────────────────┴─────────────────────┘
```

### **Color Palette:**
- 🔵 Blue: #3B82F6 (Finance)
- 🟢 Green: #10B981 (Production)
- 🟣 Purple: #8B5CF6 (Cost)
- 🟠 Orange: #F59E0B (Inventory)
- 🔴 Red: #EF4444 (Scrap/Error)
- 🔷 Cyan: #06B6D4 (WIP)

### **Background:**
- Light gradient: `#f8f9ff → #f0f4ff → #faf5ff`
- KPI cards: White (#FFFFFF)
- Charts: Within white cards

---

## ⚙️ STEP 5: Technical Implementation

### **1. CSV Parse:**
```typescript
const csvData = await parseCSVFile('termostat_uretim_takip_TR.csv');
```

### **2. KPI Calculation:**
```typescript
const totalCost = csvData.reduce((sum, row) => sum + row.Total_Production_Cost_USD, 0);
const totalProduced = csvData.reduce((sum, row) => sum + row.Units_Produced, 0);
const totalDefect = csvData.reduce((sum, row) => sum + row.Defective_Units, 0);
const defectRate = (totalDefect / totalProduced) * 100;
```

### **3. Chart Data Preparation:**
```typescript
// Daily production trend
const dailyProduction = groupBy(csvData, 'Date')
  .map(group => ({
    date: group.key,
    value: sum(group.items, 'Units_Produced')
  }));

// Cost by stage
const costByStage = groupBy(csvData, 'Production_Stage')
  .map(group => ({
    stage: group.key,
    cost: sum(group.items, 'Total_Production_Cost_USD')
  }));
```

---

## ✅ STEP 6: Final Dashboard

**Created Dashboard:**
- ✅ 6 KPI Cards (colored, annotated)
- ✅ 5 Charts (3+2 layout)
- ✅ A4 size (1123px x 794px)
- ✅ Print-friendly
- ✅ PDF export ready

**Dashboard Name:**  
**"Automotive Thermostat Production & Cost Dashboard"**

---

## 📖 KEY LEARNING POINTS

### **In KPI Selection:**
1. ✅ **Business-critical metrics** first (cost, production)
2. ✅ **Quality indicators** mandatory (scrap rate)
3. ✅ **Stock levels** for cash tracking
4. ✅ **Unit cost** for efficiency measurement

### **In Chart Selection:**
1. ✅ **Line Chart** → Time series analysis
2. ✅ **Bar Chart** → Comparison
3. ✅ **Donut Chart** → Ratio/distribution
4. ✅ **Area Chart** → Trend + volume

### **Design Principles:**
1. ✅ **Color consistency** (fixed color per metric)
2. ✅ **Hierarchy** (KPIs on top, charts below)
3. ✅ **Spacing** (reasonable padding and gaps)
4. ✅ **Readability** (appropriate font sizes)

---

## 🎯 CONCLUSION

With this dashboard:
- 💰 **Cost control** in place
- 📦 **Production tracking** easy
- ❌ **Scrap rates** visible
- 📊 **Stock levels** real-time
- 📈 **Trends** clear

**Dashboard creation time:** ~15 minutes  
**Update frequency:** Daily  
**Use case:** Factory managers, CFO, Production Planning

---

**🎓 This guide was prepared as a sample application in FinOps AI Studio Dashboard Wizard.**

*Last Updated: January 2026*
