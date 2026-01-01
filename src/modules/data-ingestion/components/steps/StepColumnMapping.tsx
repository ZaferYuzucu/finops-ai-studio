import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { ColumnMapping, StandardColumn } from '../../types';
import { STANDARD_COLUMNS } from '../../constants';

interface Props {
  mappings: ColumnMapping[];
  onConfirm: (mappings: ColumnMapping[]) => void;
  onBack: () => void;
}

export default function StepColumnMapping({ mappings, onConfirm, onBack }: Props) {
  const [localMappings, setLocalMappings] = useState(mappings);

  const updateMapping = (index: number, targetColumn: StandardColumn | null) => {
    const updated = [...localMappings];
    updated[index] = { ...updated[index], targetColumn };
    setLocalMappings(updated);
  };

  const hasRequiredColumns = localMappings.some(m => m.targetColumn === 'date') &&
                            localMappings.some(m => m.targetColumn === 'value');

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Kolon Eşleştirme:</strong> Excel sütunlarınızı standart FinOps alanlarına eşleştirin.
          <br />
          <span className="text-red-600">*</span> işaretli alanlar zorunludur.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 border-b text-left text-sm font-semibold">Excel Sütunu</th>
              <th className="px-4 py-3 border-b text-left text-sm font-semibold">Örnek Değerler</th>
              <th className="px-4 py-3 border-b text-left text-sm font-semibold">FinOps Alanı</th>
              <th className="px-4 py-3 border-b text-left text-sm font-semibold">Güven</th>
            </tr>
          </thead>
          <tbody>
            {localMappings.map((mapping, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">
                  <span className="font-medium">{mapping.sourceColumn}</span>
                </td>
                <td className="px-4 py-3 border-b text-xs text-gray-600">
                  {mapping.sampleValues.slice(0, 2).join(', ')}
                </td>
                <td className="px-4 py-3 border-b">
                  <select
                    value={mapping.targetColumn || ''}
                    onChange={e => updateMapping(index, e.target.value as StandardColumn || null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Kullanma --</option>
                    {STANDARD_COLUMNS.map(col => (
                      <option key={col.key} value={col.key}>
                        {col.label} {col.required && <span className="text-red-500">*</span>}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 border-b">
                  <div className={`text-xs font-semibold ${
                    mapping.confidence >= 0.8 ? 'text-green-600' :
                    mapping.confidence >= 0.6 ? 'text-yellow-600' :
                    'text-gray-500'
                  }`}>
                    {Math.round(mapping.confidence * 100)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!hasRequiredColumns && (
        <div className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
          <div className="text-sm text-red-800">
            <strong>Eksik zorunlu alanlar:</strong> En az bir "Tarih" ve bir "Değer" sütunu eşleştirmelisiniz.
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </button>
        
        <button
          onClick={() => onConfirm(localMappings)}
          disabled={!hasRequiredColumns}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
        >
          Eşleştirmeyi Onayla <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}





