import React, { useState, useEffect } from 'react';
import { Database, Download, Eye, Filter, Upload, Check, X } from 'lucide-react';
import Papa from 'papaparse';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

interface Dataset {
  id: string;
  title: string;
  sector: string;
  tags: string[];
  date_range: string;
  row_count: number;
  file_size_kb: number;
}

interface CSVLibraryIndex {
  version: string;
  last_updated: string;
  total_datasets: number;
  datasets: Dataset[];
  sectors: Array<{ name: string; count: number; icon: string }>;
}

// Helper fonksiyonlar
function prepareChartData(data: any[], chart: any): any[] {
  if (!data || data.length === 0) return [];
  
  // Sadece ilgili metric'i filtrele
  const filtered = data.filter((row: any) => row.metric === chart.y);
  
  // x eksenine göre grupla (genellikle date)
  const grouped: any = {};
  filtered.forEach((row: any) => {
    const key = row[chart.x] || row.date;
    if (!grouped[key]) {
      grouped[key] = { x: key, y: 0, count: 0 };
    }
    grouped[key].y += parseFloat(row.value) || 0;
    grouped[key].count += 1;
  });
  
  // Array'e çevir ve sırala
  const result = Object.values(grouped)
    .map((item: any) => ({
      x: item.x,
      y: chart.aggregate === 'avg' ? item.y / item.count : item.y
    }))
    .slice(0, 20); // İlk 20 veri noktası
  
  return result;
}

function calculateKPI(data: any[], metric: string, aggregate: string): number {
  if (!data || data.length === 0) return 0;
  
  const values = data
    .filter((row: any) => row.metric === metric)
    .map((row: any) => parseFloat(row.value))
    .filter((v: number) => !isNaN(v));
  
  if (values.length === 0) return 0;
  
  switch (aggregate) {
    case 'sum':
      return values.reduce((a, b) => a + b, 0);
    case 'avg':
      return values.reduce((a, b) => a + b, 0) / values.length;
    case 'min':
      return Math.min(...values);
    case 'max':
      return Math.max(...values);
    default:
      return 0;
  }
}

function formatKPIValue(value: number, format: string): string {
  if (format === 'currency') {
    return `₺${value.toLocaleString('tr-TR', { maximumFractionDigits: 0 })}`;
  } else if (format === 'percentage') {
    return `%${value.toFixed(1)}`;
  } else {
    return value.toLocaleString('tr-TR', { maximumFractionDigits: 0 });
  }
}

const CSVLibraryPage: React.FC = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState<CSVLibraryIndex | null>(null);
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [previewMetadata, setPreviewMetadata] = useState<any | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<string>('');

  useEffect(() => {
    // Load index.json
    fetch('/data/csv-library/index.json')
      .then(res => res.json())
      .then(data => setIndex(data))
      .catch(err => console.error('Failed to load CSV library index:', err));
  }, []);

  const filteredDatasets = index?.datasets.filter(ds => 
    selectedSector === 'all' || ds.sector === selectedSector
  ) || [];

  const handlePreview = async (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setShowPreview(true);
    setPreviewData(null);
    setPreviewMetadata(null);
    
    try {
      // Metadata ve CSV'yi paralel yükle
      const [metaResponse, csvResponse] = await Promise.all([
        fetch(`/data/csv-library/datasets/${dataset.id}/metadata.json`),
        fetch(`/data/csv-library/datasets/${dataset.id}/data.csv`)
      ]);
      
      const metadata = await metaResponse.json();
      const csvText = await csvResponse.text();
      
      setPreviewMetadata(metadata);
      
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          setPreviewData(results.data.slice(0, 200)); // İlk 200 satır
        }
      });
    } catch (error) {
      console.error('Preview failed:', error);
    }
  };

  const handleUseDashboard = (dataset: Dataset) => {
    // Dataset ID'sini localStorage'a kaydet
    localStorage.setItem('selected_csv_dataset', dataset.id);
    // Dashboard sayfasına yönlendir
    window.location.href = '/admin/platform-analytics?tab=demo';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert(t('csvLibrary.upload.errors.invalidFile'));
      return;
    }

    setUploadedFile(file);
    setUploadProgress(t('csvLibrary.upload.progress.validating'));

    // CSV'yi parse et ve validate et
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data;
        const header = Object.keys(data[0] || {});
        
        // Basit validasyon
        const requiredCols = ['date', 'entity', 'category', 'metric', 'value'];
        const missingCols = requiredCols.filter(col => !header.includes(col));
        
        if (missingCols.length > 0) {
          setUploadProgress(`${t('csvLibrary.upload.errors.missingColumns')}: ${missingCols.join(', ')}`);
          return;
        }
        
        setUploadProgress(`✅ ${t('csvLibrary.upload.progress.success')} ${data.length} ${t('csvLibrary.upload.progress.rowsFound')}`);
        
        // localStorage'a kaydet
        const datasetId = `custom-${Date.now()}`;
        localStorage.setItem(`csv-dataset-${datasetId}`, JSON.stringify({
          id: datasetId,
          title: file.name.replace('.csv', ''),
          data: data.slice(0, 10000), // Max 10k satır
          uploadedAt: new Date().toISOString()
        }));
        
        setTimeout(() => {
          setShowUpload(false);
          setUploadProgress('');
          setUploadedFile(null);
          alert(`✅ "${file.name}" ${t('csvLibrary.upload.progress.uploadComplete')}`);
        }, 1500);
      },
      error: (error) => {
        setUploadProgress(`❌ ${t('csvLibrary.upload.errors.error')}: ${error.message}`);
      }
    });
  };

  if (!index) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t('csvLibrary.loading')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Database className="text-blue-600" size={40} />
                📊 {t('csvLibrary.title')}
              </h1>
              <p className="text-gray-600 text-lg">
                {t('csvLibrary.subtitle')} {index.total_datasets} {t('csvLibrary.datasetsAvailable')}
              </p>
            </div>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-semibold shadow-md"
              onClick={() => setShowUpload(true)}
            >
              <Upload size={20} />
              {t('csvLibrary.importCSV')}
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-700 font-semibold">{t('csvLibrary.stats.totalDatasets')}</p>
              <p className="text-3xl font-black text-blue-900">{index.total_datasets}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-700 font-semibold">{t('csvLibrary.stats.totalRows')}</p>
              <p className="text-3xl font-black text-green-900">
                {index.datasets.reduce((sum, ds) => sum + ds.row_count, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-700 font-semibold">{t('csvLibrary.stats.sectorCount')}</p>
              <p className="text-3xl font-black text-purple-900">{index.sectors.length}</p>
            </div>
          </div>
        </div>

        {/* Sektör Filtreleri */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="text-gray-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900">{t('csvLibrary.filter.title')}</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSector('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedSector === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🌐 {t('csvLibrary.filter.all')} ({index.total_datasets})
            </button>
            {index.sectors.map(sector => (
              <button
                key={sector.name}
                onClick={() => setSelectedSector(sector.name)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedSector === sector.name
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {sector.icon} {sector.name} ({sector.count})
              </button>
            ))}
          </div>
        </div>

        {/* Dataset Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map(dataset => (
            <div
              key={dataset.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{dataset.title}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  📁 {dataset.sector}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {dataset.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>📅 {t('csvLibrary.datasetCard.date')}:</span>
                  <span className="font-semibold">{dataset.date_range}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📊 {t('csvLibrary.datasetCard.rows')}:</span>
                  <span className="font-semibold">{dataset.row_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>💾 {t('csvLibrary.datasetCard.size')}:</span>
                  <span className="font-semibold">{dataset.file_size_kb} KB</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(dataset)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Eye size={16} />
                  {t('csvLibrary.datasetCard.preview')}
                </button>
                <button
                  onClick={() => handleUseDashboard(dataset)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-semibold shadow-md"
                >
                  <Check size={16} />
                  {t('csvLibrary.datasetCard.use')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Önizleme Modal */}
        {showPreview && selectedDataset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedDataset.title}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedDataset.sector} • {selectedDataset.date_range} • {selectedDataset.row_count.toLocaleString()} {t('csvLibrary.preview.rows')}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center gap-2"
                  >
                    <X size={20} />
                    {t('csvLibrary.preview.close')}
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto p-6">
                {previewData && previewMetadata ? (
                  <div className="space-y-6">
                    {/* Grafikler */}
                    {previewMetadata.recommended_charts && previewMetadata.recommended_charts.length > 0 && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                          📊 {t('csvLibrary.preview.sampleCharts')}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {previewMetadata.recommended_charts.slice(0, 2).map((chart: any, idx: number) => {
                            // Veriyi hazırla
                            const chartData = prepareChartData(previewData, chart);
                            
                            return (
                              <div key={idx} className="bg-white rounded-lg p-4 shadow">
                                <p className="text-sm font-semibold text-gray-800 mb-3">{chart.title}</p>
                                <ResponsiveContainer width="100%" height={200}>
                                  {chart.type === 'LineChart' ? (
                                    <LineChart data={chartData}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="x" tick={{ fontSize: 11 }} />
                                      <YAxis tick={{ fontSize: 11 }} />
                                      <Tooltip />
                                      <Line type="monotone" dataKey="y" stroke="#3b82f6" strokeWidth={2} />
                                    </LineChart>
                                  ) : (
                                    <BarChart data={chartData}>
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="x" tick={{ fontSize: 11 }} />
                                      <YAxis tick={{ fontSize: 11 }} />
                                      <Tooltip />
                                      <Bar dataKey="y" fill="#3b82f6" />
                                    </BarChart>
                                  )}
                                </ResponsiveContainer>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* KPI Kartları */}
                    {previewMetadata.kpi_cards && previewMetadata.kpi_cards.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-3">📈 {t('csvLibrary.preview.kpiCards')}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {previewMetadata.kpi_cards.map((kpi: any, idx: number) => {
                            const value = calculateKPI(previewData, kpi.metric, kpi.aggregate);
                            return (
                              <div key={idx} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                                <p className="text-xs text-green-700 font-semibold mb-1">{kpi.title}</p>
                                <p className="text-2xl font-black text-green-900">
                                  {formatKPIValue(value, kpi.format)}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tablo Önizleme */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-3">📋 {t('csvLibrary.preview.dataPreview')}</h3>
                      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
                        <table className="min-w-full text-sm">
                          <thead className="bg-gray-100">
                            <tr>
                              {Object.keys(previewData[0] || {}).map(key => (
                                <th key={key} className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {previewData.slice(0, 20).map((row, idx) => (
                              <tr key={idx} className="border-b hover:bg-gray-50">
                                {Object.values(row).map((val: any, i) => (
                                  <td key={i} className="px-4 py-2 text-gray-600">
                                    {val}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">{t('csvLibrary.loading')}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CSV Upload Modal */}
        {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📥 {t('csvLibrary.upload.title')}</h2>
                <p className="text-gray-600">
                  {t('csvLibrary.upload.description')}
                </p>
              </div>

              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                  <Upload size={48} className="mx-auto mb-4 text-gray-400" />
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                      {t('csvLibrary.upload.selectFile')}
                    </span>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    {t('csvLibrary.upload.fileTypes')}
                  </p>
                </div>

                {uploadProgress && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">{uploadProgress}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-xs font-semibold text-gray-700 mb-2">📋 {t('csvLibrary.upload.requiredColumns')}:</p>
                <code className="text-xs text-gray-600">
                  date, entity, category, metric, value
                </code>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUpload(false);
                    setUploadProgress('');
                    setUploadedFile(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  {t('csvLibrary.upload.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CSVLibraryPage;
