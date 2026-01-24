// DASHBOARD TEMPLATE PAGE
// Unified page for rendering ANY dashboard template

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { dashboardTemplateRegistry } from '../registry/DashboardTemplateRegistry';
import { UnifiedDashboardRenderer } from '../renderer/UnifiedDashboardRenderer';
import { Card } from '@tremor/react';
import { useAuth } from '../context/AuthContext';
import { getUserUploadedFiles } from '../utils/userDataStorage';
import { runtimeFileStore } from '../store/runtimeFileStore';
import Papa from 'papaparse';
import { CSVDataBinder } from '../services/csvDataBinder';
import { Upload, Save, ArrowLeft } from 'lucide-react';

export const DashboardTemplatePage: React.FC = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);
  const [bindingResult, setBindingResult] = useState<any>(null);
  const [userFiles, setUserFiles] = useState<any[]>([]);
  
  useEffect(() => {
    if (!templateId) {
      setLoading(false);
      return;
    }
    
    const tmpl = dashboardTemplateRegistry.get(templateId);
    setTemplate(tmpl);
    setLoading(false);
    
    // Load user's uploaded files if logged in
    if (currentUser?.email) {
      const files = getUserUploadedFiles(currentUser.email);
      setUserFiles(files);
    }
  }, [templateId, currentUser]);
  
  const handleFileSelect = async (fileId: string) => {
    setSelectedFileId(fileId);
    
    // Get CSV content from runtime store
    const content = runtimeFileStore.get(fileId);
    if (!content) {
      console.warn('CSV content not found in runtime store for:', fileId);
      setCsvData(null);
      setBindingResult(null);
      return;
    }
    
    // Parse CSV
    Papa.parse(content, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const data = result.data as any[];
        setCsvData(data);
        
        // Bind data to template
        if (template) {
          const binding = CSVDataBinder.bind(template, data);
          setBindingResult(binding);
        }
      },
      error: (error) => {
        console.error('CSV parse error:', error);
        setCsvData(null);
        setBindingResult(null);
      }
    });
  };
  
  const handleCloneTemplate = () => {
    if (!currentUser || !template) {
      alert('Lütfen giriş yapın');
      navigate('/login');
      return;
    }
    
    // Clone template to user's dashboards
    const cloned = dashboardTemplateRegistry.cloneTemplate(template.id, currentUser.email);
    if (cloned) {
      alert(`✓ "${template.name}" dashboard'unuza kaydedildi!`);
      navigate('/dashboard/my');
    } else {
      alert('Dashboard klonlanamadı');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }
  
  if (!template) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Bulunamadı</h2>
          <p className="text-gray-600">
            {templateId ? `Dashboard "${templateId}" bulunamadı.` : 'Dashboard ID belirtilmedi.'}
          </p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboards/all')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Tüm Dashboard'lar</span>
          </button>
          
          {currentUser && (
            <button
              onClick={handleCloneTemplate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Save size={18} />
              <span>Dashboard'uma Kaydet</span>
            </button>
          )}
        </div>
      </div>
      
      {/* CSV File Selector */}
      {currentUser && userFiles.length > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Upload size={20} className="text-blue-600" />
            <label className="text-sm font-semibold text-gray-700">Veri Kaynağı:</label>
            <select
              value={selectedFileId || ''}
              onChange={(e) => handleFileSelect(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Örnek Verilerle Göster</option>
              {userFiles.map(file => (
                <option key={file.id} value={file.id}>
                  {file.fileName}
                </option>
              ))}
            </select>
            
            {bindingResult && (
              <div className="flex items-center gap-2 text-xs">
                {bindingResult.success ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-semibold">
                    ✓ Veri Bağlandı
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-semibold">
                    ⚠ Kısmi Eşleşme
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <UnifiedDashboardRenderer 
        template={template} 
        csvData={bindingResult?.data || csvData}
        onDataMissing={() => {
          // Redirect to data upload page
          window.location.href = '/veri-girisi';
        }}
      />
    </div>
  );
};

export default DashboardTemplatePage;
