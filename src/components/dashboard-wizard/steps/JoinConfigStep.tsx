import React, { useState } from 'react';
import { WizardState } from '../DashboardWizard';
import { UploadedFile } from '../../../utils/userDataStorage';

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  userFiles: UploadedFile[];
  parsedDatasets: Map<string, { headers: string[]; rows: any[] }>;
}

export const JoinConfigStep: React.FC<Props> = ({ state, updateState, userFiles, parsedDatasets }) => {
  const datasets = (state.referencedDatasets || [])
    .map(id => userFiles.find(f => f.id === id))
    .filter(Boolean) as UploadedFile[];

  const [previewLimit] = useState(5);

  const addJoinConfig = () => {
    if (datasets.length < 2) return;
    
    const newJoin = {
      leftDataset: datasets[0].id,
      rightDataset: datasets[1].id,
      joinType: 'inner' as const,
      leftKey: '',
      rightKey: ''
    };
    
    const updated = [...(state.joinConfigs || []), newJoin];
    updateState({ joinConfigs: updated });
  };

  const updateJoin = (index: number, updates: Partial<typeof state.joinConfigs[0]>) => {
    const updated = [...(state.joinConfigs || [])];
    updated[index] = { ...updated[index], ...updates };
    updateState({ joinConfigs: updated });
  };

  const removeJoin = (index: number) => {
    const updated = (state.joinConfigs || []).filter((_, i) => i !== index);
    updateState({ joinConfigs: updated });
  };

  const getDatasetHeaders = (datasetId: string): string[] => {
    const data = parsedDatasets.get(datasetId);
    return data?.headers || [];
  };

  const getPreviewData = () => {
    if (!state.joinConfigs || state.joinConfigs.length === 0) return [];
    
    const firstJoin = state.joinConfigs[0];
    const leftData = parsedDatasets.get(firstJoin.leftDataset);
    const rightData = parsedDatasets.get(firstJoin.rightDataset);
    
    if (!leftData || !rightData || !firstJoin.leftKey || !firstJoin.rightKey) return [];
    
    // Simple preview join (limited rows)
    const preview: any[] = [];
    for (let i = 0; i < Math.min(previewLimit, leftData.rows.length); i++) {
      const leftRow = leftData.rows[i];
      const leftValue = leftRow[firstJoin.leftKey];
      
      const rightRow = rightData.rows.find(r => r[firstJoin.rightKey] === leftValue);
      
      if (rightRow || firstJoin.joinType === 'left') {
        preview.push({
          ...leftRow,
          ...(rightRow || {})
        });
      }
    }
    
    return preview;
  };

  const preview = getPreviewData();
  const joinConfigs = state.joinConfigs || [];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Join Yapılandırması
        </h2>
        <p className="text-lg text-gray-600">
          Veri setlerini nasıl birleştireceğinizi belirleyin.
        </p>
      </div>

      <div className="space-y-6">
        {joinConfigs.map((join, index) => {
          const leftDataset = datasets.find(d => d.id === join.leftDataset);
          const rightDataset = datasets.find(d => d.id === join.rightDataset);
          
          return (
            <div key={index} className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Join #{index + 1}</h3>
                <button
                  onClick={() => removeJoin(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  ✕ Kaldır
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Dataset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sol Veri Seti
                  </label>
                  <select
                    value={join.leftDataset}
                    onChange={(e) => updateJoin(index, { leftDataset: e.target.value, leftKey: '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {datasets.map(d => (
                      <option key={d.id} value={d.id}>{d.fileName}</option>
                    ))}
                  </select>
                  
                  <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Join Anahtarı (Sol)
                  </label>
                  <select
                    value={join.leftKey}
                    onChange={(e) => updateJoin(index, { leftKey: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Sütun seçin...</option>
                    {getDatasetHeaders(join.leftDataset).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>

                {/* Join Type & Right Dataset */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sağ Veri Seti
                  </label>
                  <select
                    value={join.rightDataset}
                    onChange={(e) => updateJoin(index, { rightDataset: e.target.value, rightKey: '' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {datasets.map(d => (
                      <option key={d.id} value={d.id}>{d.fileName}</option>
                    ))}
                  </select>
                  
                  <label className="block text-sm font-medium text-gray-700 mt-4 mb-2">
                    Join Anahtarı (Sağ)
                  </label>
                  <select
                    value={join.rightKey}
                    onChange={(e) => updateJoin(index, { rightKey: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Sütun seçin...</option>
                    {getDatasetHeaders(join.rightDataset).map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Join Type */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Join Tipi
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={join.joinType === 'inner'}
                      onChange={() => updateJoin(index, { joinType: 'inner' })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">
                      Inner Join (Sadece eşleşenler)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={join.joinType === 'left'}
                      onChange={() => updateJoin(index, { joinType: 'left' })}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <span className="text-sm text-gray-700">
                      Left Join (Sol tüm kayıtlar)
                    </span>
                  </label>
                </div>
              </div>

              {/* Visual Representation */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <div className="px-4 py-2 bg-blue-100 rounded-lg font-medium">
                    {leftDataset?.fileName}
                  </div>
                  <div className="text-2xl">
                    {join.joinType === 'inner' ? '⋈' : '⟕'}
                  </div>
                  <div className="px-4 py-2 bg-green-100 rounded-lg font-medium">
                    {rightDataset?.fileName}
                  </div>
                </div>
                <p className="text-center text-xs text-gray-600 mt-2">
                  {join.leftKey && join.rightKey 
                    ? `${join.leftKey} = ${join.rightKey}`
                    : 'Join anahtarlarını seçin'}
                </p>
              </div>
            </div>
          );
        })}

        {datasets.length >= 2 && joinConfigs.length < datasets.length - 1 && (
          <button
            onClick={addJoinConfig}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-gray-600 hover:text-indigo-600 font-medium"
          >
            + Yeni Join Ekle
          </button>
        )}
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Önizleme (İlk {previewLimit} satır)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {Object.keys(preview[0] || {}).map(key => (
                    <th key={key} className="px-4 py-2 text-left text-xs font-medium text-gray-700 border-b">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-b">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="px-4 py-2 text-sm text-gray-900">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {joinConfigs.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>💡 İpucu:</strong> En az bir join yapılandırması eklemelisiniz.
          </p>
        </div>
      )}
    </div>
  );
};
