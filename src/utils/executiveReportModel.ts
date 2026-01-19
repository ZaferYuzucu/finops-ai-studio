import type { AutomotiveOperationsRow } from '@/hooks/useAutomotiveDemoData';

export type CurrencyCode = 'TRY';

export type ExecutiveKpiCard = {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  unit: 'currency' | 'percent' | 'count';
  currencySymbol?: string; // only for currency
  scaledText: string; // e.g. ₺229.8 Mio
  deltaPct: number; // % change vs previous
  deltaText: string; // e.g. +23.1%
  note: string; // short explanatory sentence (mandatory)
};

export type SeriesPoint = {
  key: string; // x label (month, segment, etc.)
  value: number;
};

export type LineInsights = {
  last: number;
  avg: number;
  min: { key: string; value: number };
  max: { key: string; value: number };
};

export type MicroTable = {
  title: string;
  columns: string[];
  rows: (string | number)[][];
  footnote?: string;
};

export type DataNote = {
  dateRangeText: string;
  currencyText: string;
  filtersText: string;
  sourceText: string;
};

export type AutomotiveExecutiveReportModel = {
  title: string;
  periodLabel: string;
  kpis: ExecutiveKpiCard[];
  contributionByVehicleGroup: {
    series: { group: string; value: number; sharePct: number }[];
    microTable: MicroTable;
  };
  cashFlowByMonth: {
    series: { month: string; value: number }[];
    insights: LineInsights;
    microTable: MicroTable;
  };
  grossProfitByMonth: {
    series: { month: string; value: number }[];
    insights: LineInsights;
    microTable: MicroTable;
  };
  managementInterpretation: {
    what: string[];
    why: string[];
    next: string[];
  };
  dataNote: DataNote;
};

const monthOrder = [
  '2025-01',
  '2025-02',
  '2025-03',
  '2025-04',
  '2025-05',
  '2025-06',
  '2025-07',
  '2025-08',
  '2025-09',
  '2025-10',
  '2025-11',
  '2025-12',
];

function safeDiv(num: number, den: number) {
  return den === 0 ? 0 : num / den;
}

export function formatScaled(value: number, opts?: { currencySymbol?: string; unitSuffix?: string }) {
  const abs = Math.abs(value);
  let scaled = value;
  let suffix = '';
  if (!opts?.unitSuffix) {
    if (abs >= 1_000_000_000) {
      scaled = value / 1_000_000_000;
      suffix = ' Bio';
    } else if (abs >= 1_000_000) {
      scaled = value / 1_000_000;
      suffix = ' Mio';
    } else if (abs >= 1_000) {
      scaled = value / 1_000;
      suffix = ' K';
    }
  }

  const base = `${scaled.toFixed(1)}${suffix}${opts?.unitSuffix ?? ''}`;
  if (opts?.unitSuffix) return base;
  if (opts?.currencySymbol) return `${opts.currencySymbol}${base}`;
  return base;
}

export function formatDeltaPct(deltaPct: number) {
  const sign = deltaPct >= 0 ? '+' : '';
  return `${sign}${deltaPct.toFixed(1)}%`;
}

export function buildLineInsights(series: { key: string; value: number }[]): LineInsights {
  const list = [...series];
  if (!list.length) return { last: 0, avg: 0, min: { key: '-', value: 0 }, max: { key: '-', value: 0 } };
  const last = list[list.length - 1]?.value ?? 0;
  const sum = list.reduce((s, p) => s + (p.value || 0), 0);
  const avg = sum / list.length;
  let min = list[0];
  let max = list[0];
  for (const p of list) {
    if (p.value < min.value) min = p;
    if (p.value > max.value) max = p;
  }
  return { last, avg, min: { key: min.key, value: min.value }, max: { key: max.key, value: max.value } };
}

export function buildAutomotiveExecutiveReportModel(input: {
  operations: AutomotiveOperationsRow[];
  windowMonths?: number;
  activeRangeLabel?: string;
}): AutomotiveExecutiveReportModel {
  const { operations, windowMonths = 3, activeRangeLabel } = input;

  const sorted = [...operations].sort((a, b) => monthOrder.indexOf(a.Ay) - monthOrder.indexOf(b.Ay));
  const currentWindow = sorted.slice(-windowMonths);
  const prevWindow = sorted.slice(-windowMonths * 2, -windowMonths);
  const prevFallback = prevWindow.length ? prevWindow : currentWindow;

  const sumWindow = (rows: AutomotiveOperationsRow[]) => ({
    revenue: rows.reduce((s, r) => s + (r.Gelir_TL || 0), 0),
    cogs: rows.reduce((s, r) => s + (r.COGS_TL || 0), 0),
    gross: rows.reduce((s, r) => s + (r.Brut_Kar_TL || 0), 0),
    cash: rows.reduce((s, r) => s + (r.Nakit_Akisi_TL || 0), 0),
    units: rows.reduce((s, r) => s + (r.Satilan_Adet || 0), 0),
  });

  const cur = sumWindow(currentWindow);
  const prev = sumWindow(prevFallback);

  const grossMarginCur = safeDiv(cur.gross, cur.revenue) * 100;
  const grossMarginPrev = safeDiv(prev.gross, prev.revenue) * 100;

  const revenueDeltaPct = prev.revenue ? ((cur.revenue - prev.revenue) / prev.revenue) * 100 : 0;
  const grossDeltaPct = prev.gross ? ((cur.gross - prev.gross) / prev.gross) * 100 : 0;
  const marginDeltaPct = grossMarginPrev ? ((grossMarginCur - grossMarginPrev) / grossMarginPrev) * 100 : 0;
  const cashDeltaPct = prev.cash ? ((cur.cash - prev.cash) / Math.abs(prev.cash)) * 100 : 0;

  const topRevenueGroupInCurrent = (() => {
    const by = currentWindow.reduce<Record<string, number>>((acc, r) => {
      const g = r.Arac_Grubu || 'Diğer';
      acc[g] = (acc[g] || 0) + (r.Gelir_TL || 0);
      return acc;
    }, {});
    let best = { group: '—', value: 0 };
    for (const [group, value] of Object.entries(by)) {
      if (value > best.value) best = { group, value };
    }
    return best.group;
  })();

  const topGrossGroupInCurrent = (() => {
    const by = currentWindow.reduce<Record<string, number>>((acc, r) => {
      const g = r.Arac_Grubu || 'Diğer';
      acc[g] = (acc[g] || 0) + (r.Brut_Kar_TL || 0);
      return acc;
    }, {});
    let best = { group: '—', value: 0 };
    for (const [group, value] of Object.entries(by)) {
      if (value > best.value) best = { group, value };
    }
    return best.group;
  })();

  const kpis: ExecutiveKpiCard[] = [
    {
      id: 'revenue',
      label: 'Gelir',
      value: cur.revenue,
      previousValue: prev.revenue,
      unit: 'currency',
      currencySymbol: '₺',
      scaledText: formatScaled(cur.revenue, { currencySymbol: '₺' }),
      deltaPct: revenueDeltaPct,
      deltaText: formatDeltaPct(revenueDeltaPct),
      note:
        revenueDeltaPct >= 0
          ? `Gelir artışı: ${topRevenueGroupInCurrent} karması + fiyat disiplini etkili.`
          : `Gelir düşüşü: talep/iskonto baskısı; ${topRevenueGroupInCurrent} ana sürükleyici.`,
    },
    {
      id: 'gross_profit',
      label: 'Brüt Kâr',
      value: cur.gross,
      previousValue: prev.gross,
      unit: 'currency',
      currencySymbol: '₺',
      scaledText: formatScaled(cur.gross, { currencySymbol: '₺' }),
      deltaPct: grossDeltaPct,
      deltaText: formatDeltaPct(grossDeltaPct),
      note:
        grossDeltaPct >= 0
          ? `Brüt kâr artışı: ${topGrossGroupInCurrent} katkısı ve maliyet kontrolüyle destekleniyor.`
          : `Brüt kâr düşüşü: maliyet baskısı ve indirimler marjı sıkıştırıyor.`,
    },
    {
      id: 'gross_margin',
      label: 'Brüt Marj',
      value: grossMarginCur,
      previousValue: grossMarginPrev,
      unit: 'percent',
      scaledText: formatScaled(grossMarginCur, { unitSuffix: '%' }),
      deltaPct: marginDeltaPct,
      deltaText: formatDeltaPct(marginDeltaPct),
      note:
        marginDeltaPct >= 0
          ? 'Marj iyileşmesi: ürün karması + maliyet disiplini.'
          : 'Marj baskısı: maliyet artışı + kampanya/iskonto etkisi.',
    },
    {
      id: 'cash_flow',
      label: 'Nakit Akışı',
      value: cur.cash,
      previousValue: prev.cash,
      unit: 'currency',
      currencySymbol: '₺',
      scaledText: formatScaled(cur.cash, { currencySymbol: '₺' }),
      deltaPct: cashDeltaPct,
      deltaText: formatDeltaPct(cashDeltaPct),
      note:
        cashDeltaPct >= 0
          ? 'Nakit iyileşmesi: tahsilat temposu ve stok çevrimi güçleniyor.'
          : 'Nakit baskısı: stok birikimi ve tahsilat gecikmesi sinyali.',
    },
  ];

  // Contribution by vehicle group (gross profit share)
  const byGroup = operations.reduce<Record<string, number>>((acc, r) => {
    const group = r.Arac_Grubu || 'Diğer';
    acc[group] = (acc[group] || 0) + (r.Brut_Kar_TL || 0);
    return acc;
  }, {});
  const groupSeries = Object.entries(byGroup)
    .map(([group, value]) => ({ group, value }))
    .sort((a, b) => b.value - a.value);
  const totalGross = groupSeries.reduce((s, x) => s + x.value, 0);
  const groupSeriesWithShare = groupSeries.map((x) => ({
    ...x,
    sharePct: totalGross ? (x.value / totalGross) * 100 : 0,
  }));

  const contributionTable: MicroTable = {
    title: 'Top katkı: Brüt kâr (Araç grubu)',
    columns: ['Araç Grubu', 'Brüt Kâr', 'Pay'],
    rows: groupSeriesWithShare.slice(0, 5).map((x) => [
      x.group,
      formatScaled(x.value, { currencySymbol: '₺' }),
      `${x.sharePct.toFixed(1)}%`,
    ]),
    footnote: 'Pay = toplam brüt kâr içindeki oran.',
  };

  // Monthly series for cash flow & gross profit (sum across groups)
  const cashByMonthMap = operations.reduce<Record<string, number>>((acc, r) => {
    const m = r.Ay;
    acc[m] = (acc[m] || 0) + (r.Nakit_Akisi_TL || 0);
    return acc;
  }, {});
  const cashSeries = Object.entries(cashByMonthMap)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  const cashInsights = buildLineInsights(cashSeries.map((p) => ({ key: p.month, value: p.value })));

  const cashTable: MicroTable = {
    title: 'Son 5 ay: Nakit akışı',
    columns: ['Ay', 'Nakit Akışı', 'MoM'],
    rows: cashSeries.slice(-5).map((p, idx, arr) => {
      const prevP = idx === 0 ? null : arr[idx - 1];
      const mom = prevP ? safeDiv(p.value - prevP.value, Math.abs(prevP.value)) * 100 : 0;
      return [p.month, formatScaled(p.value, { currencySymbol: '₺' }), idx === 0 ? '—' : `${mom >= 0 ? '+' : ''}${mom.toFixed(1)}%`];
    }),
    footnote: 'MoM = bir önceki aya göre değişim.',
  };

  const grossByMonthMap = operations.reduce<Record<string, number>>((acc, r) => {
    const m = r.Ay;
    acc[m] = (acc[m] || 0) + (r.Brut_Kar_TL || 0);
    return acc;
  }, {});
  const grossSeries = Object.entries(grossByMonthMap)
    .map(([month, value]) => ({ month, value }))
    .sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  const grossInsights = buildLineInsights(grossSeries.map((p) => ({ key: p.month, value: p.value })));

  const grossTable: MicroTable = {
    title: 'Son 5 ay: Brüt kâr',
    columns: ['Ay', 'Brüt Kâr', 'MoM'],
    rows: grossSeries.slice(-5).map((p, idx, arr) => {
      const prevP = idx === 0 ? null : arr[idx - 1];
      const mom = prevP ? safeDiv(p.value - prevP.value, Math.abs(prevP.value)) * 100 : 0;
      return [p.month, formatScaled(p.value, { currencySymbol: '₺' }), idx === 0 ? '—' : `${mom >= 0 ? '+' : ''}${mom.toFixed(1)}%`];
    }),
    footnote: 'MoM = bir önceki aya göre değişim.',
  };

  // Interpretation (strictly derived narrative; kept short)
  const what: string[] = [
    `Gelir: ${kpis.find((k) => k.id === 'revenue')?.scaledText} (${kpis.find((k) => k.id === 'revenue')?.deltaText})`,
    `Brüt kâr: ${kpis.find((k) => k.id === 'gross_profit')?.scaledText} (${kpis.find((k) => k.id === 'gross_profit')?.deltaText})`,
    `Nakit akışı: ${kpis.find((k) => k.id === 'cash_flow')?.scaledText} (${kpis.find((k) => k.id === 'cash_flow')?.deltaText})`,
  ];
  const why: string[] = [
    'Araç grubu karması (hangi grup satıyor) kârlılığı doğrudan etkiliyor.',
    'Maliyet zamanlaması ve dönemsel kampanyalar nakitte dalgalanma yaratabiliyor.',
  ];
  const next: string[] = [
    'En yüksek katkı veren araç gruplarında marjı koru; düşük katkıda fiyat/iskonto disiplinini sıkılaştır.',
    'Nakit dalgalanmasını azaltmak için maliyet planlaması + tahsilat hızlandırma aksiyonu uygula.',
  ];

  const monthsInData = Array.from(new Set(operations.map((r) => r.Ay))).sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));
  const minMonth = monthsInData[0] ?? '-';
  const maxMonth = monthsInData[monthsInData.length - 1] ?? '-';
  const filterDescription = activeRangeLabel ?? 'Tüm dönem';

  return {
    title: 'Otomotiv Yönetici Özeti',
    periodLabel: `Son ${windowMonths} ay (vs önceki ${windowMonths} ay)`,
    kpis,
    contributionByVehicleGroup: {
      series: groupSeriesWithShare,
      microTable: contributionTable,
    },
    cashFlowByMonth: {
      series: cashSeries,
      insights: cashInsights,
      microTable: cashTable,
    },
    grossProfitByMonth: {
      series: grossSeries,
      insights: grossInsights,
      microTable: grossTable,
    },
    managementInterpretation: { what, why, next },
    dataNote: {
      dateRangeText: `Tarih aralığı: ${minMonth} → ${maxMonth}`,
      currencyText: 'Para birimi: ₺ (TRY)',
      filtersText: `Filtre: ${filterDescription} • KPI pencere: son ${windowMonths} ay vs önceki ${windowMonths} ay`,
      sourceText:
        'Kaynak: Demo CSV (otomotiv_dealer_yillik_operasyon_finans.csv) — public/demo-data/automotive',
    },
  };
}

