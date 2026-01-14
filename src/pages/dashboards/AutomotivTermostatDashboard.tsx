import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, AlertCircle, Warehouse, Clock, DollarSign } from 'lucide-react';
import Papa from 'papaparse';
import { useTranslation } from 'react-i18next';
import KpiCard from '@/components/dashboards/KpiCard';

// Data types matching CSV structure
interface ProductionData {
  Tarih: string;
  Üretim_Emri_No: string;
  Ürün_Kodu: string;
  Üretim_Aşaması: string;
  Üretilen_Adet: number;
  Hatalı_Adet: number;
  Toplam_Üretim_Maliyeti_USD: number;
  Mamul_Stok: number;
  Yarı_Mamul_Stok: number;
}

const AutomotivTermostatDashboard = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ProductionData[]>([]);
  const [loading, setLoading] = useState(true);

  // Load and parse CSV data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/demo-data/termostat_uretim_takip_TR.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data as ProductionData[]);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('CSV yükleme hatası:', error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate KPIs
  const kpis = {
    totalCost: data.reduce((sum, row) => sum + (row.Toplam_Üretim_Maliyeti_USD || 0), 0),
    totalProduced: data.reduce((sum, row) => sum + (row.Üretilen_Adet || 0), 0),
    totalDefects: data.reduce((sum, row) => sum + (row.Hatalı_Adet || 0), 0),
    finishedStock: data.length > 0 ? data[data.length - 1]?.Mamul_Stok || 0 : 0,
    wipStock: data.length > 0 ? data[data.length - 1]?.Yarı_Mamul_Stok || 0 : 0,
  };

  const defectRate = kpis.totalProduced > 0 
    ? ((kpis.totalDefects / kpis.totalProduced) * 100).toFixed(2) 
    : '0.00';

  const avgUnitCost = useMemo(() => {
    if (kpis.totalProduced <= 0) return 0;
    return kpis.totalCost / kpis.totalProduced;
  }, [kpis.totalCost, kpis.totalProduced]);

  // Chart 1: Cost by Production Stage
  const costByStage = data.reduce((acc, row) => {
    const stage = row.Üretim_Aşaması || 'Unknown';
    if (!acc[stage]) {
      acc[stage] = 0;
    }
    acc[stage] += row.Toplam_Üretim_Maliyeti_USD || 0;
    return acc;
  }, {} as Record<string, number>);

  const costByStageData = Object.entries(costByStage).map(([stage, cost]) => ({
    stage,
    cost,
  }));

  // Chart 2: Daily Production Volume
  const dailyProduction = data.reduce((acc, row) => {
    const date = row.Tarih || 'Unknown';
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += row.Üretilen_Adet || 0;
    return acc;
  }, {} as Record<string, number>);

  const dailyProductionData = Object.entries(dailyProduction)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Chart 3: Defect Analysis by Production Order
  const defectsByOrder = data
    .filter(row => (row.Hatalı_Adet || 0) > 0)
    .slice(0, 15) // Top 15 orders with defects
    .map(row => ({
      order: row.Üretim_Emri_No,
      defects: row.Hatalı_Adet,
    }));

  // Chart 4: Stock Distribution
  const stockData = [
    { name: 'Mamul Stok', value: kpis.finishedStock },
    { name: 'Yarı Mamul (WIP)', value: kpis.wipStock },
  ];

  const COLORS = ['#3b82f6', '#f59e0b'];

  if (loading) {
    return (
      <div className="w-full h-full overflow-auto p-4" style={{
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 25%, #faf5ff 50%, #f0f9ff 75%, #f5f8ff 100%)'
      }}>
        <div className="p-6 mx-auto" style={{ width: '1123px', maxWidth: '1123px' }}>
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-semibold">{t('automotivTermostatDashboard.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-auto p-4" style={{
      background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 25%, #faf5ff 50%, #f0f9ff 75%, #f5f8ff 100%)'
    }}>
      <div
        className="p-6 mx-auto space-y-4"
        style={{
          width: '1123px',
          maxWidth: '1123px',
          minHeight: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif',
          transformOrigin: 'top center'
        }}
      >
        
        <div className="mb-2">
          <h1 className="text-2xl font-black text-gray-900">{t('automotivTermostatDashboard.title')}</h1>
          <p className="text-sm text-gray-600">{t('automotivTermostatDashboard.subtitle')}</p>
        </div>

        {/* KPI CARDS — Stok Yönetimi formatı */}
        <div className="grid grid-cols-6 gap-4">
          <KpiCard
            title={t('automotivTermostatDashboard.kpi.totalCost')}
            value={`$${Math.round(kpis.totalCost).toLocaleString()}`}
            icon={<DollarSign size={20} />}
            color="#3B82F6"
          />
          <KpiCard
            title={t('automotivTermostatDashboard.kpi.totalProduced')}
            value={kpis.totalProduced.toLocaleString()}
            icon={<Package size={20} />}
            color="#10B981"
          />
          <KpiCard
            title="Fire Oranı"
            value={defectRate}
            unit="%"
            icon={<AlertCircle size={20} />}
            color="#EF4444"
          />
          <KpiCard
            title="Fire Adedi"
            value={kpis.totalDefects.toLocaleString()}
            icon={<AlertCircle size={20} />}
            color="#F59E0B"
          />
          <KpiCard
            title={t('automotivTermostatDashboard.kpi.finishedStock')}
            value={kpis.finishedStock.toLocaleString()}
            icon={<Warehouse size={20} />}
            color="#8B5CF6"
          />
          <KpiCard
            title={t('automotivTermostatDashboard.kpi.wipStock')}
            value={kpis.wipStock.toLocaleString()}
            icon={<Clock size={20} />}
            color="#06B6D4"
          />
        </div>

        {/* CHARTS SECTION — Stok Yönetimi formatı */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Chart 1: Cost by Production Stage */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t('automotivTermostatDashboard.charts.costByStage')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costByStageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                <Bar dataKey="cost" fill="#3b82f6" name="Maliyet (USD)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 2: Daily Production Volume */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t('automotivTermostatDashboard.charts.dailyProduction')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyProductionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-15} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Üretilen Adet"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 3: Defect Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t('automotivTermostatDashboard.charts.defectAnalysis')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={defectsByOrder}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="order" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="defects" fill="#ef4444" name="Hatalı Adet" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chart 4: Stock Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-3">{t('automotivTermostatDashboard.charts.stockDistribution')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">{t('automotivTermostatDashboard.table.title')}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.date')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.orderNo')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.productCode')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.stage')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.produced')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.defect')}</th>
                  <th className="px-4 py-3">{t('automotivTermostatDashboard.table.headers.cost')}</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 20).map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{row.Tarih}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.Üretim_Emri_No}</td>
                    <td className="px-4 py-3 font-semibold">{row.Ürün_Kodu}</td>
                    <td className="px-4 py-3">{row.Üretim_Aşaması}</td>
                    <td className="px-4 py-3 text-right">{row.Üretilen_Adet?.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-red-600 font-semibold">
                      {row.Hatalı_Adet || 0}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ${row.Toplam_Üretim_Maliyeti_USD?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            * İlk 20 kayıt gösteriliyor. Toplam {data.length} kayıt.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AutomotivTermostatDashboard;
