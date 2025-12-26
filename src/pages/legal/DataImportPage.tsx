
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X, Loader, Download, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const DataImportPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    }
  });

  const handleUpload = () => {
    if (files.length === 0) return;
    setStatus('uploading');
    // Gerçek yükleme mantığı burada olacak.
    // Şimdilik 2 saniyelik bir gecikme ile simüle ediyoruz.
    setTimeout(() => {
      setStatus('success');
    }, 2000);
  };

  const removeFile = (file: File) => {
    setFiles(files.filter(f => f !== file));
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">📤 Veri Yükleme</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Günlük iş verilerinizi <code>.csv</code> veya <code>.xlsx</code> formatında yükleyin.
          </p>
          
          {/* Download Template Button */}
          <div className="mt-4 flex flex-col items-center gap-2">
            <a
              href="/templates/otel_verileri_ornegi.csv"
              download="otel_verileri_ornegi.csv"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download size={20} />
              <span>Örnek Şablon İndir</span>
            </a>
            <p className="text-xs text-gray-500">
              💡 Önce şablonu indirin, doldurun, sonra yükleyin
            </p>
          </div>
           
           <p className="mt-4 text-center text-sm font-medium text-blue-600 hover:text-blue-500">
            <Link to="/veri-rehberi">
              📖 Veri Yükleme Rehberi
            </Link>
          </p>
        </div>

        <div {...getRootProps()} className={`mt-8 flex justify-center rounded-lg border-2 border-dashed px-6 pt-10 pb-10 transition-colors ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}>
          <input {...getInputProps()} />
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                <span>Bir dosya yükleyin</span>
              </label>
              <p className="pl-1">veya sürükleyip bırakın</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">CSV veya XLSX formatında</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800">Seçilen Dosyalar:</h3>
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
                    {status === 'uploading' ? 'Yükleniyor...' : `1 Dosyayı Yüklemeye Başla`}
                </button>
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
                        <h3 className="text-sm font-medium text-green-800">Yükleme Başarılı</h3>
                        <div className="mt-2 text-sm text-green-700">
                            <p>Dosyanız başarıyla yüklendi. Şimdi bir sonraki adıma (Kolon Eşleştirme) yönlendiriliyorsunuz.</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DataImportPage;
