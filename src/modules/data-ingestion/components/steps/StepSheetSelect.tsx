import React from 'react';
import { FileText, CheckCircle } from 'lucide-react';
import { SheetInfo } from '../../types';

interface Props {
  sheets: SheetInfo[];
  onSelect: (sheet: SheetInfo) => void;
}

export default function StepSheetSelect({ sheets, onSelect }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        İçe aktarılacak sayfayı seçin ({sheets.length} sayfa bulundu)
      </h3>
      
      <div className="space-y-3">
        {sheets.map((sheet, index) => (
          <div
            key={index}
            onClick={() => onSelect(sheet)}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 cursor-pointer transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-semibold text-gray-900">{sheet.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                {sheet.rowCount} satır × {sheet.colCount} sütun
              </div>
            </div>
            
            {/* Preview */}
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full text-xs">
                <tbody>
                  {sheet.preview.slice(0, 3).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.slice(0, 6).map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-2 py-1 border border-gray-200 truncate max-w-[100px]">
                          {String(cell)}
                        </td>
                      ))}
                      {row.length > 6 && (
                        <td className="px-2 py-1 text-gray-400">...</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





