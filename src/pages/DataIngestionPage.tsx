import React, { useState } from 'react';
import { Database, History, HelpCircle } from 'lucide-react';
import DataIngestionWizard from '../modules/data-ingestion/components/DataIngestionWizard';
import { getIngestionHistory, getAllDatasets, deleteDataset } from '../modules/data-ingestion/services/storageService';
import { useIngestedData } from '../modules/data-ingestion/hooks/useIngestedData';

export default function DataIngestionPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'help'>('upload');
  const { datasets, refresh } = useIngestedData();
  const history = getIngestionHistory();

  const handleDelete = (id: string) => {
    if (confirm('Bu veri setini silmek istediğinizden emin misiniz?')) {
      deleteDataset(id);
      refresh();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📊 Excel Akıllı Veri Katmanı
          </h1>
          <p className="text-lg text-gray-600">
            Excel/CSV dosyalarınızı FinOps.ist sistemine aktarın ve anında dashboard'lara dönüştürün
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex justify-center">
          <div className="bg-white rounded-lg shadow p-1 flex space-x-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'upload'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Database className="w-5 h-5 inline mr-2" />
              Veri Yükle
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'history'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History className="w-5 h-5 inline mr-2" />
              Geçmiş ({datasets.length})
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === 'help'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <HelpCircle className="w-5 h-5 inline mr-2" />
              Nasıl Kullanılır?
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'upload' && <DataIngestionWizard />}
          
          {activeTab === 'history' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Yüklenmiş Veri Setleri</h2>
              
              {datasets.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Database className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Henüz veri seti yüklenmemiş.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {datasets.map(dataset => (
                    <div key={dataset.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{dataset.name}</h3>
                          <p className="text-sm text-gray-600">
                            {dataset.type} • {dataset.rowCount} satır • {new Date(dataset.uploadDate).toLocaleDateString('tr-TR')}
                          </p>
                          <p className="text-xs text-gray-500">
                            Kaynak: {dataset.fileName} / {dataset.sheetName}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(dataset.id)}
                          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Excel Akıllı Veri Katmanı Nedir?</h2>
              <p className="text-gray-700 mb-6">
                FinOps.ist'in Excel Akıllı Veri Katmanı, kullanıcıların kendi Excel/CSV dosyalarını sisteme yükleyip
                dashboard'larda kullanabilmelerini sağlayan akıllı bir veri dönüşüm katmanıdır.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">🔄 Nasıl Çalışır?</h3>
              <ol className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                  <div>
                    <strong>Dosya Yükle:</strong> Excel veya CSV dosyanızı sisteme yükleyin
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                  <div>
                    <strong>Sayfa Seç:</strong> Çok sayfalı Excel dosyalarında hangi sayfayı kullanacağınızı seçin
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                  <div>
                    <strong>Başlık Satırı:</strong> Sistem otomatik olarak kolon başlıklarını tespit eder
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">4.</span>
                  <div>
                    <strong>Kolon Eşleştir:</strong> Excel sütunlarınız FinOps standart alanlarına eşleştirilir
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">5.</span>
                  <div>
                    <strong>Doğrulama:</strong> Veri kalitesi kontrol edilir, hatalar raporlanır
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600 flex-shrink-0">6.</span>
                  <div>
                    <strong>Kaydet:</strong> Normalize edilmiş veri sistemde saklanır ve dashboard'larda kullanıma hazır hale gelir
                  </div>
                </li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">💡 Örnek Kullanım Senaryoları</h3>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <div>
                    <strong>Restoran:</strong> Adisyon kayıtlarını yükleyip günlük satış analizleri oluşturun
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <div>
                    <strong>E-Ticaret:</strong> Ödeme gateway raporlarını aktarıp sipariş analizleri yapın
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <div>
                    <strong>Üretim:</strong> ERP çıktılarını yükleyip üretim maliyetlerini görselleştirin
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 flex-shrink-0">✓</span>
                  <div>
                    <strong>Finans:</strong> Muhasebe yazılımı raporlarını aktarıp nakit akışı takip edin
                  </div>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">📋 Desteklenen Dosya Türleri</h3>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Excel (.xlsx, .xls)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>CSV (.csv)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span>TSV (.tsv)</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">🔒 Güvenlik & Gizlilik</h3>
              <p className="text-gray-700 mb-4">
                Tüm veriler <strong>sadece tarayıcınızda (localStorage)</strong> saklanır. 
                FinOps.ist sunucularına hiçbir veri gönderilmez. Bu beta sürümünde verileriniz
                tamamen lokal kalır.
              </p>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💼 Enterprise Müşteriler İçin:</strong> Production versiyonunda veriler güvenli bulut 
                  veritabanına aktarılabilir ve ekip üyeleri arasında paylaşılabilir. 
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

