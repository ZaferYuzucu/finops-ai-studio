// TEMPLATE LIBRARY PAGE
// Browse, preview, and clone dashboard templates

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@tremor/react';
import { dashboardTemplateRegistry, DashboardTemplate, DashboardSector, DashboardCategory } from '../registry/DashboardTemplateRegistry';
import { Search, Filter, Copy, Eye } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const TemplateLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<DashboardSector | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<DashboardCategory | 'all'>('all');
  
  const allTemplates = dashboardTemplateRegistry.getTemplates();
  
  // Filter templates
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'all' || template.sector === sectorFilter;
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesSector && matchesCategory;
  });
  
  const handlePreview = (template: DashboardTemplate) => {
    navigate(`/dashboard/template-preview/${template.id}`);
  };
  
  const handleClone = (template: DashboardTemplate) => {
    if (!currentUser?.email) {
      alert('Please log in to clone templates');
      return;
    }
    
    const cloned = dashboardTemplateRegistry.cloneTemplate(template.id, currentUser.email);
    if (cloned) {
      navigate(`/dashboard/csv-mapper/${cloned.id}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Dashboard Template Library</h1>
          <p className="text-gray-600">
            Hazır dashboard şablonlarını inceleyin, kendi verilerinizle klonlayın
          </p>
        </div>
        
        {/* Filters */}
        <Card className="mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Dashboard ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Sector Filter */}
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Sektörler</option>
                <option value="restaurant">Restoran</option>
                <option value="hotel">Otel</option>
                <option value="automotive">Otomotiv</option>
                <option value="finance">Finans</option>
                <option value="manufacturing">Üretim</option>
                <option value="sales">Satış</option>
                <option value="agriculture">Tarım</option>
                <option value="ecommerce">E-Ticaret</option>
                <option value="education">Eğitim</option>
              </select>
            </div>
            
            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tüm Kategoriler</option>
                <option value="financial">Finansal</option>
                <option value="operational">Operasyonel</option>
                <option value="sales">Satış</option>
                <option value="hr">İnsan Kaynakları</option>
                <option value="executive">Yönetici</option>
              </select>
            </div>
          </div>
        </Card>
        
        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{template.icon}</div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {template.sector}
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                    {template.category}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              
              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">
                  <strong>KPI Count:</strong> {template.defaultLayout.kpiCount} |{' '}
                  <strong>Charts:</strong> {template.defaultLayout.chartCount}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Required Columns:</strong> {template.dataSchema.requiredColumns.slice(0, 3).join(', ')}
                  {template.dataSchema.requiredColumns.length > 3 && '...'}
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  <Eye size={16} />
                  <span>Önizle</span>
                </button>
                <button
                  onClick={() => handleClone(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Copy size={16} />
                  <span>Klonla</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Arama kriterlerine uygun şablon bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateLibraryPage;
