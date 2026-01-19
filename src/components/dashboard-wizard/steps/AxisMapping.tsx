import React, { useState } from 'react';
import { WizardState } from '../DashboardWizard';

const VALIDATION_RULES = {
  bar: { x: ['categorical', 'temporal'], y: ['numeric'] },
  line: { x: ['temporal', 'numeric'], y: ['numeric'] },
  pie: { x: ['categorical'], y: ['numeric'] },
  area: { x: ['temporal'], y: ['numeric'] },
  scatter: { x: ['numeric'], y: ['numeric'] },
  combo: { x: ['categorical', 'temporal'], y: ['numeric'] }
};

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  parsedData: {
    headers: string[];
    numericColumns: string[];
    categoryColumns: string[];
    dateColumn: string | null;
  };
}

export const AxisMapping: React.FC<Props> = ({ state, updateState, parsedData }) => {
  const [draggedField, setDraggedField] = useState<{ name: string; type: string } | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const allFields = [
    ...parsedData.numericColumns.map(col => ({ name: col, type: 'numeric' })),
    ...parsedData.categoryColumns.map(col => ({ name: col, type: 'categorical' })),
    ...(parsedData.dateColumn ? [{ name: parsedData.dateColumn, type: 'temporal' }] : [])
  ];

  const rules = VALIDATION_RULES[state.chartType as keyof typeof VALIDATION_RULES];

  const handleDrop = (axis: 'x' | 'y', field: { name: string; type: string }) => {
    const validTypes = rules?.[axis] || [];
    
    if (!validTypes.includes(field.type as any)) {
      const validTypeNames = validTypes.map(t => 
        t === 'numeric' ? 'sayisal' : 
        t === 'categorical' ? 'kategori' : 
        t === 'temporal' ? 'tarih' : t
      ).join(' veya ');
      
      setWarning(
        `UYARI: ${state.chartType.toUpperCase()} grafigi icin ${axis.toUpperCase()} eksenine ${validTypeNames} sutun secmelisiniz!`
      );
      setTimeout(() => setWarning(null), 5000);
      return;
    }

    setWarning(null);
    updateState({
      [axis === 'x' ? 'xAxis' : 'yAxis']: { field: field.name, type: field.type }
    });
  };

  const getFieldColor = (type: string) => {
    switch (type) {
      case 'numeric': return 'bg-blue-100 border-blue-400 text-blue-900';
      case 'categorical': return 'bg-purple-100 border-purple-400 text-purple-900';
      case 'temporal': return 'bg-green-100 border-green-400 text-green-900';
      default: return 'bg-gray-100 border-gray-400 text-gray-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'numeric': return '🔢';
      case 'categorical': return '🏷️';
      case 'temporal': return '📅';
      default: return '📄';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Eksen Eşleştirme</h2>
        <p className="text-lg text-gray-600">
          Dosyanızdaki gerçek sütunları X ve Y eksenlerine atayın
        </p>
        <p className="text-sm text-gray-500 mt-2">
          📁 Dosya: <span className="font-bold text-gray-900">{state.selectedFile?.fileName}</span> • 
          📊 Grafik: <span className="font-bold text-gray-900">{state.chartType}</span>
        </p>
      </div>

      {warning && (
        <div className="mb-6 bg-red-100 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl font-semibold animate-pulse">
          {warning}
        </div>
      )}

      {state.xAxis && state.yAxis && (
        <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-sm font-semibold text-green-900">
            ✓ Eksen eşleştirmesi tamamlandı! İlerleyebilirsiniz.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol: Sütun Paleti */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-200 sticky top-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              📂 Dosya Sütunları ({allFields.length})
            </h3>
            
            {allFields.length === 0 ? (
              <p className="text-gray-500 text-sm">Sütun bulunamadı</p>
            ) : (
              <div className="space-y-3">
                {allFields.map(field => (
                  <div
                    key={field.name}
                    draggable
                    onDragStart={() => setDraggedField(field)}
                    className={`p-4 rounded-xl cursor-move border-2 transition-all hover:scale-105 hover:shadow-lg ${getFieldColor(field.type)}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm">{field.name}</span>
                      <span className="text-lg">{getTypeIcon(field.type)}</span>
                    </div>
                    <span className="text-[10px] font-semibold opacity-75">
                      {field.type === 'numeric' ? 'Sayısal' : field.type === 'categorical' ? 'Kategori' : 'Tarih'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ: Bırakma Alanları */}
        <div className="lg:col-span-2 space-y-6">
          {/* X Ekseni */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-4">📊 X Ekseni (Yatay)</h3>
            
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedField && handleDrop('x', draggedField)}
              className={`min-h-[140px] p-6 rounded-xl border-3 border-dashed transition-all ${
                state.xAxis 
                  ? 'bg-green-50 border-green-400' 
                  : 'bg-gray-50 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {state.xAxis ? (
                <div className="flex items-center justify-between p-4 bg-green-200 border-2 border-green-500 rounded-xl">
                  <div>
                    <span className="font-bold text-green-900 text-lg">{state.xAxis.field}</span>
                    <p className="text-xs text-green-700 mt-1">
                      Tip: {state.xAxis.type === 'numeric' ? '🔢 Sayısal' : state.xAxis.type === 'categorical' ? '🏷️ Kategori' : '📅 Tarih'}
                    </p>
                  </div>
                  <button
                    onClick={() => updateState({ xAxis: null })}
                    className="text-red-600 hover:text-red-800 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-3">👇</div>
                  <p className="text-gray-600 font-semibold">
                    Sol panelden sütun sürükleyin
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Y Ekseni */}
          <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
            <h3 className="font-bold text-xl text-gray-900 mb-4">📈 Y Ekseni (Dikey)</h3>
            
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedField && handleDrop('y', draggedField)}
              className={`min-h-[140px] p-6 rounded-xl border-3 border-dashed transition-all ${
                state.yAxis 
                  ? 'bg-blue-50 border-blue-400' 
                  : 'bg-gray-50 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {state.yAxis ? (
                <div className="flex items-center justify-between p-4 bg-blue-200 border-2 border-blue-500 rounded-xl">
                  <div>
                    <span className="font-bold text-blue-900 text-lg">{state.yAxis.field}</span>
                    <p className="text-xs text-blue-700 mt-1">
                      Tip: {state.yAxis.type === 'numeric' ? '🔢 Sayısal' : state.yAxis.type === 'categorical' ? '🏷️ Kategori' : '📅 Tarih'}
                    </p>
                  </div>
                  <button
                    onClick={() => updateState({ yAxis: null })}
                    className="text-red-600 hover:text-red-800 font-bold text-xl"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl mb-3">👇</div>
                  <p className="text-gray-600 font-semibold">
                    Sol panelden sütun sürükleyin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
