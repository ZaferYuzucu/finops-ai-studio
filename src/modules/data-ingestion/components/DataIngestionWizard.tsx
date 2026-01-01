import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { parseExcelFile, parseCSVFile } from '../utils/excelParser';
import { autoDetectColumnMappings, detectHeaderRow } from '../utils/columnMapper';
import { normalizeData } from '../utils/normalizer';
import { saveIngestedData } from '../services/storageService';
import { DatasetType, SheetInfo, ColumnMapping, NormalizedRow, ValidationIssue } from '../types';
import { DATASET_TYPE_OPTIONS, MAX_FILE_SIZE, SUPPORTED_FILE_TYPES } from '../constants';

import StepUpload from './steps/StepUpload';
import StepSheetSelect from './steps/StepSheetSelect';
import StepHeaderDetection from './steps/StepHeaderDetection';
import StepColumnMapping from './steps/StepColumnMapping';
import StepValidation from './steps/StepValidation';
import StepPreview from './steps/StepPreview';

type WizardStep = 'upload' | 'sheets' | 'header' | 'mapping' | 'validation' | 'preview';

export default function DataIngestionWizard() {
  const [currentStep, setCurrentStep] = useState<WizardStep>('upload');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State for each step
  const [file, setFile] = useState<File | null>(null);
  const [datasetType, setDatasetType] = useState<DatasetType>('Sales');
  const [datasetName, setDatasetName] = useState('');
  
  const [sheets, setSheets] = useState<SheetInfo[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<SheetInfo | null>(null);
  const [rawData, setRawData] = useState<any[][]>([]);
  
  const [headerRow, setHeaderRow] = useState<number>(0);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  
  const [normalizedData, setNormalizedData] = useState<NormalizedRow[]>([]);
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  
  const [saved, setSaved] = useState(false);

  // Step 1: Upload file
  const handleFileUpload = async (uploadedFile: File, type: DatasetType, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate file
      if (!SUPPORTED_FILE_TYPES.some(ext => uploadedFile.name.toLowerCase().endsWith(ext))) {
        throw new Error('Desteklenmeyen dosya türü');
      }
      
      if (uploadedFile.size > MAX_FILE_SIZE) {
        throw new Error(`Dosya boyutu ${MAX_FILE_SIZE / 1024 / 1024} MB\'dan küçük olmalıdır`);
      }
      
      // Parse file
      let parsedSheets: SheetInfo[];
      
      if (uploadedFile.name.toLowerCase().endsWith('.csv') || uploadedFile.name.toLowerCase().endsWith('.tsv')) {
        parsedSheets = await parseCSVFile(uploadedFile);
      } else {
        parsedSheets = await parseExcelFile(uploadedFile);
      }
      
      setFile(uploadedFile);
      setDatasetType(type);
      setDatasetName(name);
      setSheets(parsedSheets);
      
      // Auto-advance if single sheet
      if (parsedSheets.length === 1) {
        handleSheetSelect(parsedSheets[0]);
      } else {
        setCurrentStep('sheets');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Select sheet
  const handleSheetSelect = (sheet: SheetInfo) => {
    setSelectedSheet(sheet);
    setRawData(sheet.preview); // For now, use preview. In real impl, fetch full data
    
    // Auto-detect header row
    const detectedHeaderRow = detectHeaderRow(sheet.preview);
    setHeaderRow(detectedHeaderRow);
    
    setCurrentStep('header');
  };

  // Step 3: Confirm header row
  const handleHeaderConfirm = (confirmedHeaderRow: number) => {
    setHeaderRow(confirmedHeaderRow);
    
    if (!rawData || rawData.length === 0) {
      setError('Veri bulunamadı');
      return;
    }
    
    const headers = rawData[confirmedHeaderRow];
    const sampleData = rawData.slice(confirmedHeaderRow, confirmedHeaderRow + 6);
    
    // Auto-detect column mappings
    const mappings = autoDetectColumnMappings(headers, sampleData);
    setColumnMappings(mappings);
    
    setCurrentStep('mapping');
  };

  // Step 4: Confirm column mappings
  const handleMappingConfirm = (confirmedMappings: ColumnMapping[]) => {
    setColumnMappings(confirmedMappings);
    
    // Normalize data
    if (!file || !selectedSheet) return;
    
    const { normalized, issues } = normalizeData(
      rawData,
      headerRow,
      confirmedMappings,
      file.name,
      selectedSheet.name
    );
    
    setNormalizedData(normalized);
    setValidationIssues(issues);
    
    setCurrentStep('validation');
  };

  // Step 5: Review validation
  const handleValidationConfirm = () => {
    setCurrentStep('preview');
  };

  // Step 6: Save
  const handleSave = () => {
    if (!file || !selectedSheet) return;
    
    try {
      saveIngestedData(
        datasetName,
        datasetType,
        normalizedData,
        file.name,
        selectedSheet.name
      );
      
      setSaved(true);
    } catch (err) {
      setError('Kaydetme hatası: ' + (err as Error).message);
    }
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setFile(null);
    setSheets([]);
    setSelectedSheet(null);
    setRawData([]);
    setHeaderRow(0);
    setColumnMappings([]);
    setNormalizedData([]);
    setValidationIssues([]);
    setSaved(false);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📥 Veri Yükleme Sihirbazı</h1>
          <p className="text-gray-600">Excel/CSV dosyalarınızı sisteme aktarın ve normalleştirin</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'upload', label: '1. Dosya Yükle' },
              { key: 'sheets', label: '2. Sayfa Seç' },
              { key: 'header', label: '3. Başlık Satırı' },
              { key: 'mapping', label: '4. Kolon Eşleştir' },
              { key: 'validation', label: '5. Doğrulama' },
              { key: 'preview', label: '6. Önizleme' }
            ].map((step, index) => {
              const isActive = currentStep === step.key;
              const isComplete = ['upload', 'sheets', 'header', 'mapping', 'validation'].indexOf(currentStep) > index;
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    isComplete ? 'bg-green-500 text-white' :
                    isActive ? 'bg-blue-500 text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {isComplete ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${isActive ? 'font-semibold' : ''}`}>
                    {step.label}
                  </span>
                  {index < 5 && <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800">Hata</p>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Step Content */}
        <div>
          {currentStep === 'upload' && (
            <StepUpload onUpload={handleFileUpload} loading={loading} />
          )}
          
          {currentStep === 'sheets' && sheets.length > 0 && (
            <StepSheetSelect sheets={sheets} onSelect={handleSheetSelect} />
          )}
          
          {currentStep === 'header' && rawData.length > 0 && (
            <StepHeaderDetection 
              data={rawData} 
              detectedRow={headerRow} 
              onConfirm={handleHeaderConfirm} 
            />
          )}
          
          {currentStep === 'mapping' && columnMappings.length > 0 && (
            <StepColumnMapping 
              mappings={columnMappings} 
              onConfirm={handleMappingConfirm}
              onBack={() => setCurrentStep('header')}
            />
          )}
          
          {currentStep === 'validation' && (
            <StepValidation 
              issues={validationIssues} 
              totalRows={normalizedData.length}
              onConfirm={handleValidationConfirm}
              onBack={() => setCurrentStep('mapping')}
            />
          )}
          
          {currentStep === 'preview' && (
            <StepPreview 
              data={normalizedData.slice(0, 50)} 
              totalRows={normalizedData.length}
              onSave={handleSave}
              saved={saved}
              onReset={handleReset}
              onBack={() => setCurrentStep('validation')}
            />
          )}
        </div>
      </div>
    </div>
  );
}





