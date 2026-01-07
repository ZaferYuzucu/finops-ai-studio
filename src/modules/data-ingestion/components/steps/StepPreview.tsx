import React from 'react';
import { Save, CheckCircle, ArrowLeft, RotateCcw, Download } from 'lucide-react';
import { NormalizedRow } from '../../types';

interface Props {
  data: NormalizedRow[];
  totalRows: number;
  onSave: () => void;
  saved: boolean;
  onReset: () => void;
  onBack: () => void;
}

export default function StepPreview({ data, totalRows, onSave, saved, onReset, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Normalize Edilmiş Veri Önizlemesi</h3>
          <p className="text-sm text-gray-600">
            İlk 50 satır gösteriliyor (toplam: {totalRows} satır)
          </p>
        </div>
        
        {!saved && (
          <button
            onClick={onSave}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
          >
            <Save className="w-5 h-5 mr-2" /> Kaydet
          </button>
        )}
      </div>

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <p className="font-semibold text-green-800">Başarıyla Kaydedildi!</p>
              <p className="text-sm text-green-600">Veri setiniz artık dashboard'larda kullanılabilir.</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center text-sm"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Yeni Yükleme
          </button>
        </div>
      )}

      <div className="overflow-x-auto border border-gray-300 rounded-lg">
        <table className="min-w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 border-b text-left font-semibold">#</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Tarih</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Varlık</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Kategori</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Alt Kategori</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Metrik</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Değer</th>
              <th className="px-3 py-2 border-b text-left font-semibold">Birim</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b text-gray-500">{index + 1}</td>
                <td className="px-3 py-2 border-b">{row.date || '-'}</td>
                <td className="px-3 py-2 border-b">{row.entity || '-'}</td>
                <td className="px-3 py-2 border-b">{row.category || '-'}</td>
                <td className="px-3 py-2 border-b">{row.sub_category || '-'}</td>
                <td className="px-3 py-2 border-b">{row.metric || '-'}</td>
                <td className="px-3 py-2 border-b font-semibold">
                  {row.value !== null ? row.value.toLocaleString('tr-TR', { minimumFractionDigits: 2 }) : '-'}
                </td>
                <td className="px-3 py-2 border-b">{row.currency || row.unit || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!saved && (
        <div className="flex justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Geri
          </button>
        </div>
      )}
    </div>
  );
}










