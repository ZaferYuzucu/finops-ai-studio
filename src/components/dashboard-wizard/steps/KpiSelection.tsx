import React from 'react';
import { WizardState } from '../DashboardWizard';

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  availableColumns: string[];
}

const CALCULATION_TYPES = [
  { value: 'sum', label: 'Toplam', icon: '∑', desc: 'Tüm değerleri topla' },
  { value: 'avg', label: 'Ortalama', icon: '≈', desc: 'Ortalama değer' },
  { value: 'count', label: 'Sayım', icon: '#', desc: 'Satır sayısı' },
  { value: 'max', label: 'Maksimum', icon: '↑', desc: 'En yüksek değer' },
  { value: 'min', label: 'Minimum', icon: '↓', desc: 'En düşük değer' },
  { value: 'formula', label: 'Formül (A ÷ B)', icon: '÷', desc: 'İki sütunu böl' }
];

export const KpiSelection: React.FC<Props> = ({ state, updateState, availableColumns }) => {
  const addKpi = () => {
    if (availableColumns.length === 0) return;
    
    const firstColumn = availableColumns[0];
    const newKpi = {
      column: firstColumn,
      label: `Toplam ${firstColumn}`,  // Otomatik doldur
      calculation: 'sum' as const
    };
    
    updateState({
      selectedKpis: [...state.selectedKpis, newKpi]
    });
  };

  const removeKpi = (index: number) => {
    const newKpis = state.selectedKpis.filter((_, i) => i !== index);
    updateState({ selectedKpis: newKpis });
  };

  const updateKpi = (index: number, field: string, value: any) => {
    const newKpis = [...state.selectedKpis];
    newKpis[index] = { ...newKpis[index], [field]: value };
    
    // OTOMATIK DOLDURMA: Sutun degistiginde label'i guncelle
    if (field === 'column') {
      const calc = newKpis[index].calculation;
      const calcLabel = CALCULATION_TYPES.find(c => c.value === calc)?.label || 'Toplam';
      newKpis[index].label = `${calcLabel} ${value}`;
    }
    
    // Hesaplama degistiginde de label'i guncelle
    if (field === 'calculation') {
      const calcLabel = CALCULATION_TYPES.find(c => c.value === value)?.label || 'Toplam';
      newKpis[index].label = `${calcLabel} ${newKpis[index].column}`;
    }
    
    updateState({ selectedKpis: newKpis });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">KPI Tanımlama (Maksimum 6)</h2>
        <p className="text-lg text-gray-600">
          Seçtiğiniz dosyanın sayısal sütunlarından KPI'lar oluşturun
        </p>
        <p className="text-sm text-gray-500 mt-2">
          📁 Dosya: <span className="font-bold text-gray-900">{state.selectedFile?.fileName}</span>
        </p>
      </div>

      {availableColumns.length === 0 && (
        <div className="p-8 bg-red-50 border-2 border-red-200 rounded-2xl text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold text-red-900 mb-2">Sayısal Sütun Bulunamadı</h3>
          <p className="text-red-700">
            Seçtiğiniz dosyada KPI oluşturulabilecek sayısal sütun yok. 
            Lütfen farklı bir dosya seçin.
          </p>
        </div>
      )}

      {availableColumns.length > 0 && (
        <>
          <div className="mb-6 p-5 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-900 mb-3">
              <strong>📊 Kullanılabilir Sayısal Sütunlar:</strong>
            </p>
            <div className="flex flex-wrap gap-2">
              {availableColumns.map(col => (
                <span key={col} className="px-3 py-1 bg-blue-200 text-blue-900 rounded-lg text-sm font-semibold">
                  {col}
                </span>
              ))}
            </div>
          </div>

          {state.selectedKpis.length > 0 && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
              <p className="text-sm font-semibold text-green-900">
                ✓ {state.selectedKpis.length} KPI tanımlandı
              </p>
            </div>
          )}

          {/* KPI Listesi */}
          <div className="space-y-4 mb-6">
            {state.selectedKpis.map((kpi, index) => (
              <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">KPI #{index + 1}</h3>
                  <button
                    onClick={() => removeKpi(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold text-sm"
                  >
                    🗑️ Sil
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Sütun Seçimi - Sadece formül değilse göster */}
                  {kpi.calculation !== 'formula' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        📊 Veri Sütunu
                      </label>
                      <select
                        value={kpi.column}
                        onChange={(e) => updateKpi(index, 'column', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                      >
                        {availableColumns.map(col => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Hesaplama Tipi */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      🧮 Hesaplama
                    </label>
                    <select
                      value={kpi.calculation}
                      onChange={(e) => updateKpi(index, 'calculation', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                    >
                      {CALCULATION_TYPES.map(calc => (
                        <option key={calc.value} value={calc.value}>
                          {calc.icon} {calc.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Etiket */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      🏷️ Görünen Ad
                    </label>
                    <input
                      type="text"
                      value={kpi.label}
                      onChange={(e) => updateKpi(index, 'label', e.target.value)}
                      placeholder="Örn: Toplam Satış"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* FORMÜL SEÇİLDİYSE PAY VE PAYDA GÖSTER */}
                {kpi.calculation === 'formula' && (
                  <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-xl">
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      ÷ FORMÜL: PAY ÷ PAYDA
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Pay (Numerator) */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          📈 PAY (Üstteki)
                        </label>
                        <select
                          value={kpi.numerator || ''}
                          onChange={(e) => updateKpi(index, 'numerator', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500"
                        >
                          <option value="">-- SEÇİN --</option>
                          {availableColumns.map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </div>

                      {/* Payda (Denominator) */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          📉 PAYDA (Alttaki)
                        </label>
                        <select
                          value={kpi.denominator || ''}
                          onChange={(e) => updateKpi(index, 'denominator', e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-gray-900 font-semibold focus:ring-4 focus:ring-yellow-200 focus:border-yellow-500"
                        >
                          <option value="">-- SEÇİN --</option>
                          {availableColumns.map(col => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-gray-600">
                      💡 Örnek: Ort. Sepet = Toplam Gelir ÷ Müşteri Sayısı
                    </p>
                  </div>
                )}

                {/* Dinamik Açıklama */}
                <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    📊 Bu KPI Neyi Gösterecek:
                  </p>
                  {kpi.calculation === 'formula' ? (
                    <p className="text-sm text-gray-700">
                      <strong>"{kpi.label}"</strong> kartında,{' '}
                      {kpi.numerator && kpi.denominator ? (
                        <>
                          <span className="font-bold text-indigo-600">{kpi.numerator}</span>
                          {' ÷ '}
                          <span className="font-bold text-green-600">{kpi.denominator}</span>
                          {' hesabının sonucu gösterilecek.'}
                        </>
                      ) : (
                        <span className="text-red-600">Pay ve Paydayı seçiniz!</span>
                      )}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-700">
                      <strong>"{kpi.label}"</strong> kartında,{' '}
                      <span className="font-bold text-indigo-600">{kpi.column}</span> sütununun{' '}
                      <span className="font-bold text-green-600">
                        {CALCULATION_TYPES.find(c => c.value === kpi.calculation)?.label.toUpperCase()}
                      </span>{' '}
                      değeri gösterilecek.
                    </p>
                  )}
                  <p className="text-xs text-gray-600 mt-2">
                    💡 Örnek: {kpi.calculation === 'sum' ? '125,450 TL' : 
                              kpi.calculation === 'avg' ? '3,250 TL' :
                              kpi.calculation === 'count' ? '387 adet' :
                              kpi.calculation === 'max' ? '15,800 TL' : 
                              kpi.calculation === 'min' ? '150 TL' : '149.50 TL'}
                    {kpi.calculation === 'sum' && ' (tüm satırların toplamı)'}
                    {kpi.calculation === 'avg' && ' (satırların ortalaması)'}
                    {kpi.calculation === 'count' && ' (toplam kayıt sayısı)'}
                    {kpi.calculation === 'max' && ' (en yüksek değer)'}
                    {kpi.calculation === 'min' && ' (en düşük değer)'}
                    {kpi.calculation === 'formula' && ' (hesaplanan ortalama)'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* KPI Ekle Butonu */}
          {state.selectedKpis.length < 6 && (
            <button
              onClick={addKpi}
              className="w-full py-4 border-3 border-dashed border-indigo-400 bg-indigo-50 text-indigo-700 rounded-2xl hover:bg-indigo-100 transition-all font-bold text-lg"
            >
              ➕ Yeni KPI Ekle ({state.selectedKpis.length}/6)
            </button>
          )}

          {state.selectedKpis.length === 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-800">
                💡 <strong>İpucu:</strong> En az 1, en fazla 6 KPI tanımlayabilirsiniz. Dashboard standartımız 6 KPI kartıdır.
              </p>
            </div>
          )}
          
          {state.selectedKpis.length === 6 && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-800 font-bold">
                ✓ Maksimum 6 KPI tanımlandı! Dashboard standartına uygun.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
