// UNIFIED DASHBOARDS PAGE
// Replaces legacy dashboard pages with single unified system

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@tremor/react';
import { dashboardTemplateRegistry, DashboardSector } from '../registry/DashboardTemplateRegistry';
import { Search, ArrowRight } from 'lucide-react';

export const UnifiedDashboardsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<DashboardSector | 'all'>('all');
  
  const allTemplates = dashboardTemplateRegistry.getTemplates();
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = sectorFilter === 'all' || template.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });
  
  const groupedBySector = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.sector]) {
      acc[template.sector] = [];
    }
    acc[template.sector].push(template);
    return acc;
  }, {} as Record<string, typeof filteredTemplates>);
  
  const sectorNames: Record<string, string> = {
    restaurant: 'Restoran & Kafe',
    hotel: 'Otel & Konaklama',
    automotive: 'Otomotiv',
    finance: 'Finans & Muhasebe',
    hr: 'İnsan Kaynakları',
    manufacturing: 'Üretim & Operasyon',
    sales: 'Satış & Pazarlama',
    agriculture: 'Tarım',
    ecommerce: 'E-Ticaret',
    education: 'Eğitim',
    other: 'Diğer'
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            📊 Profesyonel Dashboard Kütüphanesi
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            35+ hazır dashboard şablonu - Her sektör için optimize edilmiş
          </p>
          
          {/* Search & Filter */}
          <div className="max-w-2xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Dashboard ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Sektörler</option>
              {Object.entries(sectorNames).map(([key, name]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Dashboard Groups by Sector */}
        {Object.entries(groupedBySector).map(([sector, templates]) => (
          <div key={sector} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>{templates[0]?.icon || '📊'}</span>
              <span>{sectorNames[sector] || sector}</span>
              <span className="text-sm font-normal text-gray-500">({templates.length})</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <Card
                  key={template.id}
                  className="p-6 hover:shadow-xl transition cursor-pointer border-2 border-transparent hover:border-blue-500"
                  onClick={() => navigate(`/dashboard/template/${template.id}`)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-3xl">{template.icon}</div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                      {template.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{template.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      {template.defaultLayout.kpiCount} KPI · {template.defaultLayout.chartCount} Chart
                    </div>
                    <button
                      className="flex items-center gap-1 text-blue-600 font-semibold text-sm hover:text-blue-700 transition"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/template/${template.id}`);
                      }}
                    >
                      Görüntüle
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
        
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Arama kriterlerine uygun dashboard bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedDashboardsPage;
