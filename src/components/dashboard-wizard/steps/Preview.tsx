import React, { useMemo } from 'react';
import { WizardState } from '../DashboardWizard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  state: WizardState;
}

export const Preview: React.FC<Props> = ({ state }) => {
  // Mock KPI değerleri ve trendleri
  const mockKpiValues = useMemo(() => {
    return state.selectedKpis.map((kpi) => {
      const baseValue = Math.floor(Math.random() * 50000) + 10000;
      const trend = (Math.random() - 0.3) * 30; // -9% ile +21% arası
      const isPositive = trend > 0;
      
      return {
        label: kpi.label,
        value: baseValue.toLocaleString('tr-TR'),
        trend: trend.toFixed(1),
        isPositive,
        unit: kpi.calculation === 'formula' || kpi.calculation === 'avg' ? 'TL' :
              kpi.calculation === 'count' ? 'adet' :
              kpi.calculation === 'sum' ? 'TL' : ''
      };
    });
  }, [state.selectedKpis]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Dashboard Önizleme</h2>
        <p className="text-lg text-gray-600">RestFinops standardında oluşturulmuş dashboard önizlemeniz</p>
      </div>

      {/* Yapılandırma Özeti */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl mb-8 text-white shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold opacity-90">Veri Kaynağı</p>
            <h3 className="text-2xl font-bold">{state.selectedFile?.fileName || 'Dosya Seçilmedi'}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Dashboard Standardı</p>
            <p className="text-3xl font-bold">
              {state.selectedKpis.length === 6 && state.selectedCharts.length === 5 ? '✓ UYGUN' : '⚠ KISMİ'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <div>
            <p className="text-sm opacity-75">KPI Kartları</p>
            <p className="text-xl font-bold">{state.selectedKpis.length} / 6</p>
          </div>
          <div>
            <p className="text-sm opacity-75">Grafikler</p>
            <p className="text-xl font-bold">{state.selectedCharts.length} / 5</p>
          </div>
        </div>
      </div>

      {/* KPI Kartları - RESTFINOPS STİLİ */}
      {state.selectedKpis.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 KPI Kartları</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockKpiValues.map((kpi, i) => (
              <div 
                key={i} 
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {i + 1}
                  </div>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                    kpi.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {kpi.isPositive ? (
                      <TrendingUp size={14} className="font-bold" />
                    ) : (
                      <TrendingDown size={14} className="font-bold" />
                    )}
                    <span className="text-xs font-bold">{kpi.trend}%</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wide">
                  {kpi.label}
                </p>
                <p className="text-4xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                  {kpi.unit && <span className="text-2xl text-gray-600 ml-2">{kpi.unit}</span>}
                </p>
                <p className="text-xs text-gray-500">
                  {kpi.isPositive ? 'Önceki döneme göre artış' : 'Önceki döneme göre azalış'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grafik Önizleme Alanı */}
      {state.selectedCharts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Grafik Önizlemesi</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {state.selectedCharts.slice(0, 4).map((chart, i) => (
              <div 
                key={chart.id} 
                className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-gray-900">{chart.title}</h4>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase">
                    {chart.chartType}
                  </span>
                </div>
                
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="text-6xl mb-2">
                      {chart.chartType === 'line' && '📈'}
                      {chart.chartType === 'bar' && '📊'}
                      {chart.chartType === 'pie' && '🥧'}
                      {chart.chartType === 'area' && '🏔️'}
                      {chart.chartType === 'scatter' && '🔵'}
                      {chart.chartType === 'combo' && '📊📈'}
                    </div>
                    <p className="text-sm text-gray-600 font-semibold">
                      {chart.chartType.toUpperCase()} Grafik
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between text-xs text-gray-700">
                    <div>
                      <span className="font-bold">X:</span> {chart.xAxis?.field || '-'}
                    </div>
                    <div>
                      <span className="font-bold">Y:</span> {chart.yAxis?.field || '-'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {state.selectedCharts.length === 5 && (
            <div className="mt-6 bg-green-50 border-2 border-green-200 rounded-xl p-4">
              <p className="text-sm text-green-900 font-bold">
                ✓ Maksimum 5 grafik tanımlandı! Dashboard standartına tamamen uygun.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Dashboard Standart Kontrolü */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Dashboard Standart Kontrolü</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              state.selectedKpis.length === 6 ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {state.selectedKpis.length === 6 ? '✓' : '!'}</div>
            <p className="text-sm">
              <strong>6 KPI Kartı:</strong> {state.selectedKpis.length} / 6 tanımlandı
              {state.selectedKpis.length < 6 && ' (Standart için 6 KPI gerekli)'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              state.selectedCharts.length === 5 ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {state.selectedCharts.length === 5 ? '✓' : '!'}</div>
            <p className="text-sm">
              <strong>5 Grafik:</strong> {state.selectedCharts.length} / 5 tanımlandı
              {state.selectedCharts.length < 5 && ' (Standart için 5 grafik gerekli)'}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">✓</div>
            <p className="text-sm">
              <strong>Veri Kaynağı:</strong> Seçili ve analiz edildi
            </p>
          </div>
        </div>
        
        {state.selectedKpis.length === 6 && state.selectedCharts.length === 5 ? (
          <div className="mt-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
            <p className="text-sm text-green-900 font-bold text-center">
              🎉 TEBRİKLER! Dashboard'unuz RestFinops standardına tamamen uygun!
            </p>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-lg">
            <p className="text-sm text-yellow-900 font-semibold text-center">
              ⚠️ Standart dashboard için tüm adımları tamamlayın
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 p-5 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <p className="text-sm text-blue-900">
          💡 <strong>Bilgi:</strong> Bu önizleme, gerçek verilerinizle oluşturulacak dashboard'un yapısını gösterir. 
          Kaydettiğinizde, seçtiğiniz CSV dosyasından otomatik olarak veriler çekilip grafikler oluşturulacaktır.
        </p>
      </div>
    </div>
  );
};
