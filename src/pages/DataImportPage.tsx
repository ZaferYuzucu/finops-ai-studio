
import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X, Loader, Download, CheckCircle, Zap, Link as LinkIcon, Globe, Database } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { markDataImportCompleted } from '../utils/dataImportGate';
import { BETA_LIMIT, getLocalRemainingBetaQuota } from '../utils/betaQuota';

const DataImportPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importMethod, setImportMethod] = useState<'file' | 'url'>('file'); // Yeni: Yükleme metodu
  const [dataUrl, setDataUrl] = useState(''); // Yeni: URL verisi
  const [isConnecting, setIsConnecting] = useState(false); // Yeni: Bağlanma durumu
  const [betaQuota, setBetaQuota] = useState<{ remaining: number; total: number } | null>(null);
  const [dropError, setDropError] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      setBetaQuota({ remaining: getLocalRemainingBetaQuota(), total: BETA_LIMIT });
    };
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('finops-beta-applications-updated', refresh as any);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('finops-beta-applications-updated', refresh as any);
    };
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setDropError(null);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    onDropRejected: (fileRejections) => {
      // Provide a clear, user-friendly error
      const first = fileRejections?.[0];
      const name = first?.file?.name ?? '';
      const reason = first?.errors?.[0]?.message ?? 'Dosya kabul edilmedi.';
      setDropError(
        `Dosya yüklenemedi. (${name || 'dosya'})\n` +
          `Neden: ${reason}\n\n` +
          `Desteklenen formatlar: .csv, .xlsx`
      );
    },
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    noClick: true,
    noKeyboard: true,
  });

  const handleUpload = () => {
    if (files.length === 0) return;
    setStatus('uploading');
    setIsProcessing(true);
    setProgress(0);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    // Simulated upload
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
    }, 2500);
  };

  // 🚀 DEMO MODU - Tek tıkla örnek veri yükle
  const handleDemoMode = () => {
    setStatus('uploading');
    setIsProcessing(true);
    setProgress(0);
    
    // CSV verisi oluştur
    const csvContent = `Tarih,Ürün Adı,Kategori,Sipariş Sayısı,Birim Fiyat (TL),Toplam Gelir (TL),Masraf (TL),Net Kar (TL)
2024-01-01,Margherita Pizza,Ana Yemek,120,65,7800,2340,5460
2024-01-01,Biftek Patates,Ana Yemek,90,95,8550,3420,5130
2024-01-02,Margherita Pizza,Ana Yemek,135,65,8775,2633,6143`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const file = new File([blob], 'demo-restoran-verileri.csv', { type: 'text/csv' });
    setFiles([file]);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);
    
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      clearInterval(interval);
      setProgress(100);
    }, 1500);
  };

  const removeFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  };

  // 🌐 URL İLE VERİ BAĞLANTISI
  const handleUrlConnect = async () => {
    if (!dataUrl.trim()) {
      alert('⚠️ Lütfen geçerli bir URL girin!');
      return;
    }

    setIsConnecting(true);
    setIsProcessing(true);
    setProgress(0);
    setStatus('uploading');

    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 180);

    // Simulated connection
    setTimeout(() => {
      setStatus('success');
      markDataImportCompleted();
      setIsProcessing(false);
      setIsConnecting(false);
      clearInterval(interval);
      setProgress(100);
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">{t('dataImport.title')}</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t('dataImport.subtitle')}
          </p>

          {/* Beta Partner kontenjan (demo-safe indicator) */}
          {betaQuota && betaQuota.remaining < betaQuota.total && (
            <div className="mt-3 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-900">
                <span>🎯 Lansman Partneri Kontenjanı:</span>
                <span className="font-extrabold">{betaQuota.remaining}/{betaQuota.total}</span>
                <span className="text-xs font-medium text-amber-700">(bu tarayıcı)</span>
              </div>
            </div>
          )}
          
          {/* Detaylı Rehber Linki */}
          <div className="mt-4 text-center">
            <a 
              href="/veri-hazirlama" 
              target="_blank"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              <Database size={16} />
              <span>{t('dataImport.detailedGuideLink')}</span>
            </a>
          </div>

          {/* 🔀 YÜKLEME YÖNTEMİ SEÇİMİ - TAB MENU */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex rounded-lg border-2 border-gray-200 p-1 bg-gray-50">
              <button
                onClick={() => setImportMethod('file')}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  importMethod === 'file' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UploadCloud size={18} />
                <span>{t('dataImport.tabs.fileUpload')}</span>
              </button>
              <button
                onClick={() => setImportMethod('url')}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all ${
                  importMethod === 'url' 
                    ? 'bg-green-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Globe size={18} />
                <span>{t('dataImport.tabs.urlConnection')}</span>
              </button>
            </div>
          </div>
          
          {/* Download Template Button */}
          <div className="mt-4 flex flex-col items-center gap-3">
            {/* 🚀 DEMO MODU BUTONU - B2B Sunum İçin */}
            <button
              onClick={handleDemoMode}
              disabled={status === 'uploading'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <Zap size={22} className="animate-pulse" />
              <span>{t('dataImport.demoMode.button')}</span>
            </button>
            <p className="text-xs text-purple-600 font-medium">
              {t('dataImport.demoMode.description')}
            </p>
            
            <div className="w-full border-t border-gray-200 my-2"></div>
            
            <a
              href="/templates/otel_verileri_ornegi.csv"
              download="otel_verileri_ornegi.csv"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              <span>{t('dataImport.template.download')}</span>
            </a>
            <p className="text-xs text-gray-500">
              {t('dataImport.template.hint')}
            </p>
          </div>
           
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/veri-rehberi"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-200 hover:bg-blue-100 transition-colors"
            >
              {t('dataImport.guideLink')}
            </Link>
            <Link
              to="/bilgi-merkezi/grafik-rehberi"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t('dataImport.openChartGuide')}
            </Link>
          </div>
        </div>

        {/* 📁 DOSYA YÜKLEME ALANI (importMethod === 'file') */}
        {importMethod === 'file' && (
          <>
            <div
              {...getRootProps()}
              className={`mt-8 rounded-lg border-2 border-dashed px-6 pt-10 pb-10 transition-colors ${
                isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getInputProps({ id: 'file-upload' })} />
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex flex-col items-center gap-3 text-sm leading-6 text-gray-600">
                  <p className="text-gray-700">
                    {t('dataImport.fileUpload.dragDrop')}
                  </p>
                  <button
                    type="button"
                    onClick={open}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <UploadCloud size={18} />
                    Dosya Yükle
                  </button>
                  <p className="text-xs text-gray-500">{t('dataImport.fileUpload.or')}</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">{t('dataImport.fileUpload.format')}</p>
              </div>
            </div>

            {dropError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 whitespace-pre-line">
                {dropError}
              </div>
            )}

            {/* 📖 VERİ GİRİŞ REHBERİ - YENİ */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                <FileIcon className="text-blue-600" size={20} />
                {t('dataImport.fileUpload.quickGuide.title')}
              </h3>
              <div className="space-y-3 text-sm text-blue-900">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step1') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step2') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step3') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.step4') }} />
                </div>
                
                {/* Küçük Not */}
                <div className="mt-4 bg-white border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800 italic" dangerouslySetInnerHTML={{ __html: t('dataImport.fileUpload.quickGuide.note') }} />
                </div>

                {/* Örnek CSV İndir */}
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <a 
                    href="/sample-data/sample_sales_data.csv"
                    download
                    className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 font-semibold hover:underline"
                  >
                    <Download size={16} />
                    {t('dataImport.fileUpload.quickGuide.downloadSample')}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* 🌐 URL BAĞLANTISI ALANI (importMethod === 'url') */}
        {importMethod === 'url' && (
          <div className="mt-8 space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Globe className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{t('dataImport.urlConnection.title')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('dataImport.urlConnection.subtitle')}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="data-url" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('dataImport.urlConnection.label')}
                  </label>
                  <input
                    type="url"
                    id="data-url"
                    value={dataUrl}
                    onChange={(e) => setDataUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    disabled={isConnecting}
                  />
                </div>

                {/* Örnek URL'ler */}
                <div className="bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">{t('dataImport.urlConnection.examplesTitle')}</p>
                  <div className="space-y-1 text-xs text-gray-600">
                    <button 
                      onClick={() => setDataUrl('https://docs.google.com/spreadsheets/d/1234/export?format=csv')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example1')}
                    </button>
                    <button 
                      onClick={() => setDataUrl('https://api.airtable.com/v0/appXXX/Table')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example2')}
                    </button>
                    <button 
                      onClick={() => setDataUrl('https://example.com/data/sales.csv')}
                      className="block hover:text-green-600 transition-colors text-left"
                    >
                      • {t('dataImport.urlConnection.example3')}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleUrlConnect}
                  disabled={!dataUrl.trim() || isConnecting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold transition-all shadow-md hover:shadow-lg"
                >
                  {isConnecting ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      <span>{t('dataImport.urlConnection.connecting')}</span>
                    </>
                  ) : (
                    <>
                      <LinkIcon size={20} />
                      <span>{t('dataImport.urlConnection.button')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 📖 ENTEGRE ET REHBERİ - YENİ */}
            <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                <Globe className="text-green-600" size={20} />
                {t('dataImport.urlConnection.integration.title')}
                <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded-full font-semibold">
                  {t('dataImport.urlConnection.integration.phase')}
                </span>
              </h3>
              <div className="space-y-3 text-sm text-green-900">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.description1') }} />
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold flex-shrink-0">•</span>
                  <p dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.description2') }} />
                </div>
                
                {/* İpucu Kutusu */}
                <div className="mt-4 bg-white border border-green-200 rounded-lg p-4">
                  <p className="text-xs text-green-800 mb-2">
                    <strong>{t('dataImport.urlConnection.integration.plannedTitle')}</strong>
                  </p>
                  <ul className="text-xs text-green-700 space-y-1 ml-4">
                    <li>• {t('dataImport.urlConnection.integration.planned1')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned2')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned3')}</li>
                    <li>• {t('dataImport.urlConnection.integration.planned4')}</li>
                  </ul>
                </div>

                {/* Geçici Çözüm */}
                <div className="mt-4 pt-4 border-t border-green-200">
                  <p className="text-sm text-green-900">
                    <strong>{t('dataImport.urlConnection.integration.whatToDoTitle')}</strong>
                  </p>
                  <p className="text-xs text-green-800 mt-2" dangerouslySetInnerHTML={{ __html: t('dataImport.urlConnection.integration.whatToDoDesc') }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {importMethod === 'file' && files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">{t('dataImport.selectedFiles')}</h3>
            <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
              {files.map(file => (
                <li key={file.name} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <FileIcon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <span className="ml-2 w-0 flex-1 truncate font-medium">{file.name}</span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={() => removeFile(file)} className="text-gray-500 hover:text-red-600">
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
                <button
                    onClick={handleUpload}
                    disabled={status === 'uploading'}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                >
                    {status === 'uploading' && <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />}
                    {status === 'uploading' ? t('dataImport.uploading') : t('dataImport.uploadButton')}
                </button>
            </div>
          </div>
        )}

        {/* 📊 PROGRESS BAR - Veri İşleme Animasyonu */}
        {isProcessing && (
          <div className="mt-6 space-y-3 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">{t('dataImport.processing.title')}</span>
              <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-600 space-y-1">
              <p className="flex items-center gap-2">
                {progress > 20 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 20 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step1')}</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 50 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 50 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step2')}</span>
              </p>
              <p className="flex items-center gap-2">
                {progress > 80 && <CheckCircle size={14} className="text-green-500" />}
                <span className={progress > 80 ? "text-green-600 font-medium" : ""}>{t('dataImport.processing.step3')}</span>
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
             <div className="mt-4 rounded-md bg-green-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">{t('dataImport.success.title')}</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>{t('dataImport.success.message')}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => navigate('/dashboard/demo-preview')}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    {t('dataImport.success.openDashboard')}
                  </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataImportPage;
