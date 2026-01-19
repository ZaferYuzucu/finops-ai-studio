import React, { useState } from 'react';
import { UploadedFile, DATA_CATEGORIES } from '../../../utils/userDataStorage';
import { URLDataSource } from './URLDataSource';

interface Props {
  userFiles: UploadedFile[];
  selectedFile: UploadedFile | null;
  onFileSelect: (file: UploadedFile) => void;
  userEmail?: string;
  onURLDataLoaded?: (fileId: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700' },
  green: { bg: 'bg-green-100', text: 'text-green-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-700' },
  indigo: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export const DataSourceSelection: React.FC<Props> = ({ 
  userFiles, 
  selectedFile, 
  onFileSelect,
  userEmail,
  onURLDataLoaded 
}) => {
  const [showURLSource, setShowURLSource] = useState(false);
  
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Veri Dosyası Seçimi</h2>
        <p className="text-lg text-gray-600">
          Öncelikle kütüphanenizden bir veri dosyası seçin. Dashboard bu dosyanın sütunlarına göre oluşturulacak.
        </p>
      </div>

      {selectedFile && (
        <div className="mb-6 p-5 bg-green-100 border-2 border-green-400 rounded-xl">
          <p className="text-sm font-bold text-green-900">
            ✓ Seçilen dosya: <span className="font-extrabold">{selectedFile.fileName}</span>
          </p>
          <p className="text-xs text-green-700 mt-1">
            Dosya analiz edildi. İlerleyebilirsiniz.
          </p>
        </div>
      )}

      {userFiles.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-6xl mb-4">📁</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Veri Kütüphaneniz Boş</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Dashboard oluşturmak için önce veri yüklemeniz gerekiyor. 
            Veri Yükleme sayfasından CSV dosyanızı yükleyin.
          </p>
          <button
            onClick={() => window.location.href = '/veri-girisi'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-bold text-lg shadow-lg"
          >
            📤 Veri Yükle
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <p className="text-sm text-yellow-900">
              <strong>💡 Önemli:</strong> Seçeceğiniz dosyanın sütunları, KPI ve grafik seçimlerinizde kullanılacak. 
              Sayısal sütunlar (gelir, adet, vb.) ve kategori sütunları (bölge, ürün, vb.) otomatik tespit edilir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {userFiles.map((file) => {
              const category = DATA_CATEGORIES[file.category];
              const isSelected = selectedFile?.id === file.id;
              
              return (
                <div
                  key={file.id}
                  onClick={() => onFileSelect(file)}
                  className={`p-6 border-3 rounded-2xl cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-indigo-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 truncate mb-2">
                        {file.fileName}
                      </h3>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        CATEGORY_COLORS[category.color]?.bg || 'bg-gray-100'
                      } ${CATEGORY_COLORS[category.color]?.text || 'text-gray-700'}`}>
                        {category.name}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {file.description && (
                    <p className="text-sm text-gray-600 mb-3">{file.description}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📅 {new Date(file.uploadedAt).toLocaleDateString('tr-TR')}</span>
                    {file.branchName && <span>🏢 {file.branchName}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Phase 2: URL Data Source (Opt-in) */}
      {userEmail && onURLDataLoaded && (
        <div className="mt-8">
          <button
            onClick={() => setShowURLSource(!showURLSource)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-4"
          >
            {showURLSource ? '− URL Veri Kaynağını Gizle' : '+ URL / API Veri Kaynağı Ekle'}
          </button>
          
          {showURLSource && (
            <URLDataSource
              userEmail={userEmail}
              onDataLoaded={(fileId) => {
                onURLDataLoaded(fileId);
                setShowURLSource(false);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};
