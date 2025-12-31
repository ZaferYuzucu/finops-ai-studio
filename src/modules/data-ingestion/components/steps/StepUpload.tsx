import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';
import { DATASET_TYPE_OPTIONS, SUPPORTED_FILE_TYPES } from '../../constants';
import { DatasetType } from '../../types';

interface Props {
  onUpload: (file: File, type: DatasetType, name: string) => void;
  loading: boolean;
}

export default function StepUpload({ onUpload, loading }: Props) {
  const [selectedType, setSelectedType] = useState<DatasetType>('Sales');
  const [datasetName, setDatasetName] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!datasetName.trim()) {
      alert('Lütfen veri seti için bir isim girin');
      return;
    }
    onUpload(file, selectedType, datasetName);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="space-y-6">
      {/* Dataset Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Veri Seti Türü
        </label>
        <div className="grid grid-cols-3 gap-3">
          {DATASET_TYPE_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => setSelectedType(option.value)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedType === option.value
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="text-3xl mb-2">{option.icon}</div>
              <div className="text-sm font-semibold mb-1">{option.label}</div>
              <div className="text-xs text-gray-600 leading-tight">{option.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Veri Seti Adı
        </label>
        <input
          type="text"
          value={datasetName}
          onChange={e => setDatasetName(e.target.value)}
          placeholder="Örn: 2024 Satış Verileri"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* File Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
      >
        <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Dosyayı sürükleyip bırakın
        </h3>
        <p className="text-gray-500 mb-4">veya</p>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Yükleniyor...' : 'Dosya Seç'}
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={SUPPORTED_FILE_TYPES.join(',')}
          onChange={handleChange}
          className="hidden"
        />
        
        <p className="text-xs text-gray-400 mt-4">
          Desteklenen formatlar: {SUPPORTED_FILE_TYPES.join(', ')}
        </p>
      </div>
    </div>
  );
}

