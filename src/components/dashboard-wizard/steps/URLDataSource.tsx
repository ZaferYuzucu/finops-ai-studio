import React, { useState } from 'react';
import { parseCSVFile } from '../../../utils/csvParser';
import { saveUploadedFile } from '../../../utils/userDataStorage';
import { runtimeFileStore } from '../../../store/runtimeFileStore';

interface Props {
  userEmail: string;
  onDataLoaded: (fileId: string) => void;
}

export const URLDataSource: React.FC<Props> = ({ userEmail, onDataLoaded }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataType, setDataType] = useState<'csv' | 'json'>('csv');

  const fetchAndLoadData = async () => {
    if (!url.trim()) {
      setError('Lütfen geçerli bir URL girin');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch data from URL (read-only, no background jobs)
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      let content: string;
      let fileName: string;

      if (dataType === 'csv' || contentType?.includes('csv')) {
        content = await response.text();
        fileName = `url_data_${Date.now()}.csv`;
        
        // Validate CSV
        const blob = new Blob([content], { type: 'text/csv' });
        const file = new File([blob], fileName, { type: 'text/csv' });
        const parsed = await parseCSVFile(file);
        
        if (!parsed.headers.length) {
          throw new Error('CSV dosyası geçerli değil veya boş');
        }

        // Trim BOM
        const cleanContent = content.replace(/^\uFEFF/, '');
        
        // Save metadata to user library
        const savedFile = await saveUploadedFile(
          file,
          userEmail,
          parsed.rows.length,
          parsed.headers.length,
          parsed.rows.slice(0, 5).map(r => JSON.stringify(r)),
          {
            category: 'other',
            description: `URL kaynağı: ${url}`,
            tags: ['url', 'external'],
            fileContent: undefined
          }
        );
        
        // Store content in runtime
        runtimeFileStore.set(savedFile.id, cleanContent);

        onDataLoaded(savedFile.id);
        setUrl('');
      } else if (dataType === 'json' || contentType?.includes('json')) {
        const jsonData = await response.json();
        
        // Convert JSON to CSV-like structure
        let rows: any[] = [];
        if (Array.isArray(jsonData)) {
          rows = jsonData;
        } else if (jsonData.data && Array.isArray(jsonData.data)) {
          rows = jsonData.data;
        } else {
          throw new Error('JSON formatı desteklenmiyor (array veya {data: array} bekleniyor)');
        }

        if (!rows.length) {
          throw new Error('JSON verisi boş');
        }

        // Convert to CSV
        const headers = Object.keys(rows[0]);
        const csvContent = [
          headers.join(','),
          ...rows.map(row => headers.map(h => row[h]).join(','))
        ].join('\n');

        fileName = `url_data_${Date.now()}.csv`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const file = new File([blob], fileName, { type: 'text/csv' });

        // Trim BOM
        const cleanCsvContent = csvContent.replace(/^\uFEFF/, '');

        // Save metadata to user library
        const savedFile = await saveUploadedFile(
          file,
          userEmail,
          rows.length,
          headers.length,
          rows.slice(0, 5).map(r => JSON.stringify(r)),
          {
            category: 'other',
            description: `URL kaynağı (JSON): ${url}`,
            tags: ['url', 'external', 'json'],
            fileContent: undefined
          }
        );
        
        // Store content in runtime
        runtimeFileStore.set(savedFile.id, cleanCsvContent);

        onDataLoaded(savedFile.id);
        setUrl('');
      } else {
        throw new Error('Desteklenmeyen veri formatı (sadece CSV ve JSON)');
      }

    } catch (err: any) {
      console.error('URL veri yükleme hatası:', err);
      setError(err.message || 'Veri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          URL / API Veri Kaynağı
        </h3>
        <p className="text-sm text-gray-600">
          Harici bir URL'den CSV veya JSON verisi yükleyin (sadece okuma, manuel yenileme)
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Veri Tipi
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={dataType === 'csv'}
                onChange={() => setDataType('csv')}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="text-sm text-gray-700">CSV</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={dataType === 'json'}
                onChange={() => setDataType('json')}
                className="w-4 h-4 text-indigo-600"
              />
              <span className="text-sm text-gray-700">JSON</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/data.csv"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">❌ {error}</p>
          </div>
        )}

        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">
            <strong>⚠ Önemli:</strong> CORS politikası nedeniyle bazı URL'ler yüklenemeyebilir. 
            Veriler manuel olarak yenilenir (otomatik senkronizasyon yoktur).
          </p>
        </div>

        <button
          onClick={fetchAndLoadData}
          disabled={loading || !url.trim()}
          className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Yükleniyor...' : '📥 Veriyi Yükle ve Kütüphaneye Ekle'}
        </button>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Örnek URL'ler:</h4>
        <div className="space-y-1 text-xs text-gray-600">
          <p>• CSV: https://example.com/sales.csv</p>
          <p>• JSON: https://api.example.com/data.json</p>
        </div>
      </div>
    </div>
  );
};
