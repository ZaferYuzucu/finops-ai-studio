import React, { useState } from 'react';
import { WizardState } from '../DashboardWizard';
import { UploadedFile } from '../../../utils/userDataStorage';
import { STANDARD_METRICS, STANDARD_DIMENSIONS, STANDARD_TEMPORAL, SemanticField } from '../../../types/semanticLayer';

interface Props {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  userFiles: UploadedFile[];
  parsedDatasets: Map<string, { headers: string[]; rows: any[] }>;
}

export const SemanticMapper: React.FC<Props> = ({ state, updateState, userFiles, parsedDatasets }) => {
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<'metric' | 'dimension' | 'temporal'>('metric');
  const [showNewFieldForm, setShowNewFieldForm] = useState(false);

  const datasets = (state.referencedDatasets || [])
    .map(id => userFiles.find(f => f.id === id))
    .filter(Boolean) as UploadedFile[];

  const allSemanticFields = [
    ...STANDARD_METRICS,
    ...STANDARD_DIMENSIONS,
    ...STANDARD_TEMPORAL
  ];

  const mappings = state.semanticMappings || [];

  const addMapping = (datasetId: string, column: string, semanticId: string) => {
    const existing = mappings.find(m => m.datasetId === datasetId && m.column === column);
    
    if (existing) {
      // Update existing
      const updated = mappings.map(m => 
        m.datasetId === datasetId && m.column === column
          ? { ...m, semanticId }
          : m
      );
      updateState({ semanticMappings: updated });
    } else {
      // Add new
      updateState({ 
        semanticMappings: [...mappings, { datasetId, column, semanticId }] 
      });
    }
  };

  const removeMapping = (datasetId: string, column: string) => {
    const updated = mappings.filter(m => 
      !(m.datasetId === datasetId && m.column === column)
    );
    updateState({ semanticMappings: updated });
  };

  const getMappedSemanticId = (datasetId: string, column: string): string => {
    const mapping = mappings.find(m => m.datasetId === datasetId && m.column === column);
    return mapping?.semanticId || '';
  };

  const getUnmappedColumns = (datasetId: string): string[] => {
    const data = parsedDatasets.get(datasetId);
    if (!data) return [];
    
    return data.headers.filter(h => 
      !mappings.some(m => m.datasetId === datasetId && m.column === h)
    );
  };

  const addCustomSemanticField = () => {
    if (!newFieldName.trim()) return;
    
    // In real implementation, this would be saved to a user-specific semantic field registry
    // For now, just show it in the UI
    alert(`Özel alan "${newFieldName}" (${newFieldType}) oluşturuldu. Bu özellik Phase 2'de admin onayı gerektirir.`);
    
    setNewFieldName('');
    setShowNewFieldForm(false);
  };

  const suggestMapping = (datasetId: string, column: string): string => {
    if (!state.aiSuggestionsEnabled) return '';
    
    const columnLower = column.toLowerCase();
    
    // Simple heuristic-based suggestions
    if (columnLower.includes('gelir') || columnLower.includes('revenue')) return 'revenue';
    if (columnLower.includes('gider') || columnLower.includes('cost')) return 'cost';
    if (columnLower.includes('kar') || columnLower.includes('profit')) return 'profit';
    if (columnLower.includes('adet') || columnLower.includes('quantity')) return 'quantity';
    if (columnLower.includes('fiyat') || columnLower.includes('price')) return 'price';
    if (columnLower.includes('urun') || columnLower.includes('product')) return 'product';
    if (columnLower.includes('kategori') || columnLower.includes('category')) return 'category';
    if (columnLower.includes('tarih') || columnLower.includes('date')) return 'date';
    if (columnLower.includes('ay') || columnLower.includes('month')) return 'month';
    if (columnLower.includes('yil') || columnLower.includes('year')) return 'year';
    
    return '';
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Semantik Alan Eşleştirme
        </h2>
        <p className="text-lg text-gray-600">
          Veri seti sütunlarını standart semantik alanlara eşleştirin.
        </p>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={state.aiSuggestionsEnabled || false}
            onChange={(e) => updateState({ aiSuggestionsEnabled: e.target.checked })}
            className="w-4 h-4 text-indigo-600"
          />
          <span className="text-sm font-medium text-gray-700">
            AI Önerilerini Etkinleştir (Manuel onay gerektirir)
          </span>
        </label>
      </div>

      <div className="space-y-8">
        {datasets.map(dataset => {
          const data = parsedDatasets.get(dataset.id);
          if (!data) return null;
          
          const unmappedColumns = getUnmappedColumns(dataset.id);
          const mappedColumns = data.headers.filter(h => 
            mappings.some(m => m.datasetId === dataset.id && m.column === h)
          );
          
          return (
            <div key={dataset.id} className="p-6 bg-white border-2 border-gray-200 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {dataset.fileName}
              </h3>

              {/* Mapped Columns */}
              {mappedColumns.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Eşleştirilmiş Alanlar ({mappedColumns.length})
                  </h4>
                  <div className="space-y-2">
                    {mappedColumns.map(column => {
                      const semanticId = getMappedSemanticId(dataset.id, column);
                      const semanticField = allSemanticFields.find(f => f.id === semanticId);
                      
                      return (
                        <div key={column} className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex-1">
                            <span className="font-medium text-gray-900">{column}</span>
                            <span className="mx-2 text-gray-400">→</span>
                            <span className="text-green-700 font-semibold">
                              {semanticField?.name || semanticId}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              ({semanticField?.type})
                            </span>
                          </div>
                          <button
                            onClick={() => removeMapping(dataset.id, column)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Unmapped Columns */}
              {unmappedColumns.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Eşleştirilmemiş Sütunlar ({unmappedColumns.length})
                  </h4>
                  <div className="space-y-3">
                    {unmappedColumns.map(column => {
                      const suggestion = suggestMapping(dataset.id, column);
                      
                      return (
                        <div key={column} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-medium text-gray-900 flex-1">{column}</span>
                            {suggestion && (
                              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                AI Öneri: {allSemanticFields.find(f => f.id === suggestion)?.name}
                              </span>
                            )}
                          </div>
                          <select
                            value={getMappedSemanticId(dataset.id, column)}
                            onChange={(e) => {
                              if (e.target.value) {
                                addMapping(dataset.id, column, e.target.value);
                              }
                            }}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="">Semantik alan seçin...</option>
                            <optgroup label="Metrikler">
                              {STANDARD_METRICS.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </optgroup>
                            <optgroup label="Boyutlar">
                              {STANDARD_DIMENSIONS.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </optgroup>
                            <optgroup label="Zaman">
                              {STANDARD_TEMPORAL.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </optgroup>
                          </select>
                          {suggestion && (
                            <button
                              onClick={() => addMapping(dataset.id, column, suggestion)}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-800 font-medium"
                            >
                              ✓ AI önerisini uygula
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Custom Semantic Field Creation */}
      <div className="mt-6">
        {!showNewFieldForm ? (
          <button
            onClick={() => setShowNewFieldForm(true)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            + Özel Semantik Alan Oluştur
          </button>
        ) : (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <h4 className="text-sm font-bold text-gray-900 mb-3">
              Yeni Semantik Alan (Admin Onayı Gerekir)
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Alan adı..."
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
              />
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
              >
                <option value="metric">Metrik</option>
                <option value="dimension">Boyut</option>
                <option value="temporal">Zaman</option>
              </select>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={addCustomSemanticField}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Oluştur
              </button>
              <button
                onClick={() => setShowNewFieldForm(false)}
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>

      {mappings.length === 0 && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>💡 İpucu:</strong> Sütunları semantik alanlara eşleştirerek, farklı veri setlerindeki benzer alanları birleştirebilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};
