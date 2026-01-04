import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface Props {
  data: any[][];
  detectedRow: number;
  onConfirm: (headerRow: number) => void;
}

export default function StepHeaderDetection({ data, detectedRow, onConfirm }: Props) {
  const [selectedRow, setSelectedRow] = useState(detectedRow);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Başlık satırı:</strong> Kolon isimlerinin bulunduğu satır. 
          Otomatik tespit edildi, gerekirse değiştirebilirsiniz.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <tbody>
            {data.slice(0, 10).map((row, rowIndex) => (
              <tr key={rowIndex} className={`
                ${rowIndex === selectedRow ? 'bg-green-100 border-2 border-green-500' : 'hover:bg-gray-50'}
                cursor-pointer
              `}
              onClick={() => setSelectedRow(rowIndex)}
              >
                <td className="px-3 py-2 border-r border-gray-300 font-semibold text-gray-600 text-center">
                  Satır {rowIndex + 1}
                  {rowIndex === selectedRow && <CheckCircle className="w-4 h-4 inline ml-2 text-green-600" />}
                </td>
                {row.slice(0, 8).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-3 py-2 border-r border-gray-300">
                    {String(cell || '').slice(0, 50)}
                  </td>
                ))}
                {row.length > 8 && (
                  <td className="px-3 py-2 text-gray-400">...</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onConfirm(selectedRow)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          Başlık Satırını Onayla <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}






