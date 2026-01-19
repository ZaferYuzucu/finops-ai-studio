import React from 'react';
import { WizardState } from '../DashboardWizard';

interface ChartConfig {
  id: string;
  chartType: string;
  xAxis: { field: string; type: string } | null;
  yAxis: { field: string; type: string } | null;
  title: string;
}

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  parsedData: {
    numericColumns: string[];
    categoryColumns: string[];
    dateColumn: string | null;
  };
}

const CHART_TYPES = [
  { 
    id: 'line', 
    label: 'Cizgi Grafik', 
    icon: '📈',
    xRule: 'X Eksenine: TARIH (gun, ay, yil)',
    yRule: 'Y Eksenine: SAYISAL (gelir, miktar, adet)',
    usage: 'Zaman icinde nasil degisti gormek icin',
    example: 'Aylik satis trendi, gunluk ziyaretci sayisi'
  },
  { 
    id: 'bar', 
    label: 'Cubuk Grafik', 
    icon: '📊',
    xRule: 'X Eksenine: KATEGORI (urun, bolge, sube) veya TARIH',
    yRule: 'Y Eksenine: SAYISAL (gelir, miktar, adet)',
    usage: 'Kategorileri karsilastirmak icin',
    example: 'Bolgelere gore satis, urun bazli kar'
  },
  { 
    id: 'area', 
    label: 'Alan Grafik', 
    icon: '🏔️',
    xRule: 'X Eksenine: TARIH (gun, ay, yil)',
    yRule: 'Y Eksenine: SAYISAL (kumulatif toplam)',
    usage: 'Birikmis toplami gormek icin',
    example: 'Yillik kumulatif gelir, toplam musteri sayisi'
  },
  { 
    id: 'pie', 
    label: 'Pasta Grafik', 
    icon: '🥧',
    xRule: 'X Eksenine: KATEGORI (urun tipi, bolge)',
    yRule: 'Y Eksenine: SAYISAL (miktar, yuzde)',
    usage: 'Toplam icindeki payi gormek icin',
    example: 'Urun kategorisi dagilimi, bolge paylari'
  },
  { 
    id: 'scatter', 
    label: 'Dagilim Grafik', 
    icon: '🔵',
    xRule: 'X Eksenine: SAYISAL (fiyat, maliyet)',
    yRule: 'Y Eksenine: BASKA SAYISAL (miktar, kar)',
    usage: 'Iki deger arasinda iliski var mi gormek icin',
    example: 'Fiyat vs Satis miktari, Maliyet vs Kar'
  },
  { 
    id: 'combo', 
    label: 'Karma Grafik', 
    icon: '📊📈',
    xRule: 'X Eksenine: TARIH veya KATEGORI',
    yRule: 'Y Eksenine: BIRDEN FAZLA SAYISAL (gelir + kar)',
    usage: 'Farkli metrikleri ayni anda karsilastirmak icin',
    example: 'Satis miktari (cubuk) + Kar marji (cizgi)'
  }
];

export const ChartTypeSelection: React.FC<Props> = ({ state, updateState, parsedData }) => {
  const { numericColumns, categoryColumns, dateColumn } = parsedData;
  
  const addChart = () => {
    if (state.selectedCharts.length >= 5) return;
    
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      chartType: 'bar',
      xAxis: dateColumn ? { field: dateColumn, type: 'temporal' } : 
             categoryColumns.length > 0 ? { field: categoryColumns[0], type: 'categorical' } : null,
      yAxis: numericColumns.length > 0 ? { field: numericColumns[0], type: 'numeric' } : null,
      title: `Grafik ${state.selectedCharts.length + 1}`
    };
    
    updateState({ selectedCharts: [...state.selectedCharts, newChart] });
  };
  
  const removeChart = (id: string) => {
    updateState({ selectedCharts: state.selectedCharts.filter(c => c.id !== id) });
  };
  
  const updateChart = (id: string, updates: Partial<ChartConfig>) => {
    updateState({
      selectedCharts: state.selectedCharts.map(c => 
        c.id === id ? { ...c, ...updates } : c
      )
    });
  };
  
  const allFields = [
    ...numericColumns.map(col => ({ name: col, type: 'numeric' })),
    ...categoryColumns.map(col => ({ name: col, type: 'categorical' })),
    ...(dateColumn ? [{ name: dateColumn, type: 'temporal' }] : [])
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Grafik Tanimlama (Maksimum 5)</h2>
        <p className="text-lg text-gray-600">
          Dashboard standartimiz: 5 grafik. Her grafik icin tip secin ve eksen belirleyin.
        </p>
      </div>

      {state.selectedCharts.length > 0 && (
        <div className="mb-6 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl">
          <p className="text-sm font-semibold text-indigo-900">
            {state.selectedCharts.length} grafik tanimlandi
          </p>
        </div>
      )}

      {/* GRAFIK 101 - EGITIM KISMI */}
      {state.selectedCharts.length === 0 && (
        <div className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-3 border-yellow-300 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📚 GRAFIK OLUSTURMA 101
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHART_TYPES.map(chart => (
              <div key={chart.id} className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-4xl">{chart.icon}</div>
                  <h4 className="text-lg font-bold text-gray-900">{chart.label}</h4>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="font-bold text-blue-900 mb-1">📍 {chart.xRule}</p>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <p className="font-bold text-green-900 mb-1">📍 {chart.yRule}</p>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                    <p className="font-bold text-purple-900 mb-1">💡 Ne icin:</p>
                    <p className="text-purple-800">{chart.usage}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-700">
                      <strong>Ornek:</strong> {chart.example}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={addChart}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
            >
              ✓ ANLADIM, GRAFIK OLUSTURMAYA BASLAYALIM
            </button>
          </div>
        </div>
      )}

      {/* GRAFIK LISTESI */}
      <div className="space-y-6 mb-6">
        {state.selectedCharts.map((chart, idx) => {
          const selectedType = CHART_TYPES.find(t => t.id === chart.chartType);
          
          return (
            <div key={chart.id} className="bg-gradient-to-r from-purple-50 to-pink-50 border-3 border-purple-300 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Grafik #{idx + 1}</h3>
                <button
                  onClick={() => removeChart(chart.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold text-sm"
                >
                  Sil
                </button>
              </div>

              {/* GRAFIK TIPI SECIMI */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-3">1️⃣ GRAFIK TIPINI SECIN:</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {CHART_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => updateChart(chart.id, { chartType: type.id })}
                      className={`p-4 rounded-xl border-3 transition-all ${
                        chart.chartType === type.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-indigo-400'
                      }`}
                    >
                      <div className="text-3xl mb-1">{type.icon}</div>
                      <div className="text-xs font-bold">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* SECILEN GRAFIK KURALLARI */}
              {selectedType && (
                <div className="mb-6 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
                  <p className="font-bold text-yellow-900 mb-3">
                    📌 {selectedType.label} icin KURALLAR:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-blue-700">→</span>
                      <p className="text-gray-800"><strong>X Ekseni:</strong> {selectedType.xRule}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-green-700">→</span>
                      <p className="text-gray-800"><strong>Y Ekseni:</strong> {selectedType.yRule}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* BASLIK */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-900 mb-2">2️⃣ GRAFIK BASLIGI:</label>
                <input
                  type="text"
                  value={chart.title}
                  onChange={(e) => updateChart(chart.id, { title: e.target.value })}
                  placeholder="Orn: Aylik Satis Trendi"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 font-semibold bg-white"
                />
              </div>

              {/* EKSEN SECIMI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* X EKSENI */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">3️⃣ X EKSENI (Yatay):</label>
                  <select
                    value={chart.xAxis?.field || ''}
                    onChange={(e) => {
                      const field = allFields.find(f => f.name === e.target.value);
                      updateChart(chart.id, { 
                        xAxis: field ? { field: field.name, type: field.type } : null 
                      });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 font-semibold bg-white"
                  >
                    <option value="">-- SECIN --</option>
                    {allFields
                      .filter(f => {
                        // GRAFIK TIPINE GORE X EKSENI FILTRELE
                        if (chart.chartType === 'line' || chart.chartType === 'area') {
                          return f.type === 'temporal'; // SADECE TARIH
                        }
                        if (chart.chartType === 'bar' || chart.chartType === 'combo') {
                          return f.type === 'categorical' || f.type === 'temporal'; // KATEGORI veya TARIH
                        }
                        if (chart.chartType === 'pie') {
                          return f.type === 'categorical'; // SADECE KATEGORI
                        }
                        if (chart.chartType === 'scatter') {
                          return f.type === 'numeric'; // SADECE SAYISAL
                        }
                        return true;
                      })
                      .map(f => (
                        <option key={f.name} value={f.name}>
                          {f.name} [{f.type === 'numeric' ? 'SAYISAL' : f.type === 'categorical' ? 'KATEGORI' : 'TARIH'}]
                        </option>
                      ))}
                  </select>
                  {allFields.filter(f => {
                    if (chart.chartType === 'line' || chart.chartType === 'area') return f.type === 'temporal';
                    if (chart.chartType === 'bar' || chart.chartType === 'combo') return f.type === 'categorical' || f.type === 'temporal';
                    if (chart.chartType === 'pie') return f.type === 'categorical';
                    if (chart.chartType === 'scatter') return f.type === 'numeric';
                    return true;
                  }).length === 0 && (
                    <p className="mt-2 text-xs text-red-600 font-bold">
                      ⚠️ Bu grafik icin uygun X ekseni verisi bulunamadi!
                    </p>
                  )}
                </div>

                {/* Y EKSENI */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">4️⃣ Y EKSENI (Dikey):</label>
                  <select
                    value={chart.yAxis?.field || ''}
                    onChange={(e) => {
                      const field = allFields.find(f => f.name === e.target.value);
                      updateChart(chart.id, { 
                        yAxis: field ? { field: field.name, type: field.type } : null 
                      });
                    }}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 font-semibold bg-white"
                  >
                    <option value="">-- SECIN --</option>
                    {allFields
                      .filter(f => {
                        // GRAFIK TIPINE GORE Y EKSENI FILTRELE
                        // TUM GRAFIKLERDE Y EKSENI GENELDE SAYISAL OLMALI
                        if (chart.chartType === 'scatter') {
                          return f.type === 'numeric'; // SADECE SAYISAL
                        }
                        return f.type === 'numeric'; // HER GRAFIK ICIN Y EKSENI SAYISAL
                      })
                      .map(f => (
                        <option key={f.name} value={f.name}>
                          {f.name} [{f.type === 'numeric' ? 'SAYISAL' : f.type === 'categorical' ? 'KATEGORI' : 'TARIH'}]
                        </option>
                      ))}
                  </select>
                  {numericColumns.length === 0 && (
                    <p className="mt-2 text-xs text-red-600 font-bold">
                      ⚠️ Sayisal sutun bulunamadi! Y ekseni icin sayisal veri gerekli.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* GRAFIK EKLE BUTONU */}
      {state.selectedCharts.length > 0 && state.selectedCharts.length < 5 && (
        <button
          onClick={addChart}
          className="w-full py-4 border-3 border-dashed border-purple-400 bg-purple-50 text-purple-700 rounded-2xl hover:bg-purple-100 transition-all font-bold text-lg"
        >
          + Yeni Grafik Ekle ({state.selectedCharts.length}/5)
        </button>
      )}

      {state.selectedCharts.length === 5 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-800 font-bold">
            ✓ Maksimum 5 grafik tanimlandi! Dashboard standartina uygun.
          </p>
        </div>
      )}
    </div>
  );
};
