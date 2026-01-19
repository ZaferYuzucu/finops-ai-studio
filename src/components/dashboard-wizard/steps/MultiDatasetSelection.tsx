import React from 'react';
import { UploadedFile } from '../../../utils/userDataStorage';
import { WizardState } from '../DashboardWizard';

interface Props {
  userFiles: UploadedFile[];
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
}

export const MultiDatasetSelection: React.FC<Props> = ({ userFiles, state, updateState }) => {
  const selectedIds = state.referencedDatasets || [];
  const maxDatasets = 3;

  const toggleDataset = (fileId: string) => {
    const current = selectedIds.includes(fileId);
    const updated = current
      ? selectedIds.filter(id => id !== fileId)
      : [...selectedIds, fileId].slice(0, maxDatasets);
    
    updateState({ referencedDatasets: updated });
  };

  const checkCompatibility = (datasets: UploadedFile[]) => {
    if (datasets.length < 2) return { compatible: true, reason: '' };
    
    // Basic check: warn if row counts differ significantly
    const rowCounts = datasets.map(d => d.rowCount || 0).filter(c => c > 0);
    if (rowCounts.length > 1) {
      const max = Math.max(...rowCounts);
      const min = Math.min(...rowCounts);
      if (max > min * 10) {
        return { 
          compatible: true, 
          reason: 'warning',
          message: 'Veri setiyle satır sayıları çok farklı. Join işlemi sonrası veri kaybı olabilir.'
        };
      }
    }
    
    return { compatible: true, reason: '' };
  };

  const selectedDatasets = userFiles.filter(f => selectedIds.includes(f.id));
  const compatibility = checkCompatibility(selectedDatasets);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Çoklu Veri Seti Seçimi
        </h2>
        <p className="text-lg text-gray-600">
          2-3 veri setini birleştirerek daha zengin dashboard'lar oluşturun.
        </p>
      </div>

      {selectedIds.length > 0 && (
        <div className={`mb-6 p-5 rounded-xl border-2 ${
          compatibility.reason === 'warning' 
            ? 'bg-yellow-50 border-yellow-400'
            : 'bg-green-50 border-green-400'
        }`}>
          <p className="text-sm font-bold text-gray-900">
            ✓ Seçilen veri setleri: {selectedIds.length}/{maxDatasets}
          </p>
          {compatibility.message && (
            <p className="text-xs text-yellow-700 mt-2">
              ⚠ {compatibility.message}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {userFiles.map((file) => {
          const isSelected = selectedIds.includes(file.id);
          const canSelect = selectedIds.length < maxDatasets || isSelected;
          
          return (
            <div
              key={file.id}
              onClick={() => canSelect && toggleDataset(file.id)}
              className={`p-6 border-3 rounded-2xl transition-all ${
                canSelect ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed'
              } ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">📊</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-gray-900 truncate mb-2">
                    {file.fileName}
                  </h3>
                  <div className="text-xs text-gray-600 space-y-1">
                    {file.rowCount && <p>Satır: {file.rowCount.toLocaleString()}</p>}
                    {file.columnCount && <p>Sütun: {file.columnCount}</p>}
                  </div>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedIds.length < 2 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>💡 İpucu:</strong> En az 2 veri seti seçmelisiniz. Seçilen veri setleri bir sonraki adımda birleştirilecek.
          </p>
        </div>
      )}
    </div>
  );
};
