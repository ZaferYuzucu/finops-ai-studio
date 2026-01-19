import React from 'react';
import { WizardState } from '../DashboardWizard';

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export const SaveTemplate: React.FC<Props> = ({ state, updateState }) => {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Dashboard'u Kaydet</h2>
        <p className="text-lg text-gray-600">Dashboard'unuza bir isim verin</p>
      </div>

      {state.dashboardName && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-sm font-semibold text-green-900">
            ✓ Dashboard adı belirlendi
          </p>
        </div>
      )}

      <div className="space-y-8">
        {/* Dashboard Adı */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
          <label className="block font-bold text-lg text-gray-900 mb-3">
            📝 Dashboard Adı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={state.dashboardName}
            onChange={(e) => updateState({ dashboardName: e.target.value })}
            placeholder="Örn: Satış Performans Dashboard'u"
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl text-lg font-medium text-gray-900 placeholder-gray-400 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
          />
        </div>

        {/* Özet */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-2 border-indigo-200">
          <h3 className="font-bold text-xl text-gray-900 mb-6">📋 Dashboard Özeti</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-4 rounded-xl">
              <p className="text-gray-600 mb-1">Veri Dosyası</p>
              <p className="font-bold text-gray-900">{state.selectedFile?.fileName || '-'}</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-gray-600 mb-1">KPI Sayısı</p>
              <p className="font-bold text-gray-900">{state.selectedKpis.length} adet</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-gray-600 mb-1">Grafik Tipi</p>
              <p className="font-bold text-gray-900 capitalize">{state.chartType || '-'}</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-gray-600 mb-1">Eksenler</p>
              <p className="font-bold text-gray-900">
                {state.xAxis?.field} × {state.yAxis?.field}
              </p>
            </div>
          </div>
        </div>

        {/* KPI Detayları */}
        {state.selectedKpis.length > 0 && (
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200">
            <h3 className="font-bold text-lg text-gray-900 mb-4">📊 Tanımlı KPI'lar</h3>
            <div className="space-y-2">
              {state.selectedKpis.map((kpi, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="font-bold text-indigo-600">{i + 1}.</span>
                  <span className="font-bold text-gray-900">{kpi.label}</span>
                  <span className="text-xs text-gray-600">
                    ({kpi.calculation} of {kpi.column})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!state.dashboardName && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            💡 <strong>İpucu:</strong> Dashboard'u kaydetmek için yukarıdaki alana bir isim girmeniz gerekiyor.
          </p>
        </div>
      )}
    </div>
  );
};
