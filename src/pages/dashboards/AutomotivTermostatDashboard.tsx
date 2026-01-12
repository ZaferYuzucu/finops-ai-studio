import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Package, AlertCircle, Warehouse, Clock } from 'lucide-react';
import Papa from 'papaparse';

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

// KPI Card Component
interface KPICardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  bgColor: string;
  textColor: string;
}

const KPICard = ({ title, value, icon, trend, bgColor, textColor }: KPICardProps) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-lg border border-gray-200`}>
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        {trend && <p className="text-xs text-gray-500 mt-2">{trend}</p>}
      </div>
      <div className={`${textColor} opacity-80`}>{icon}</div>
    </div>
  </div>
);

const AutomotivTermostatDashboard = () => {
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Dashboard yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* PAGE HEADER */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🚗 Automotiv – Termostat Üretim & Maliyet Dashboard'u
          </h1>
          <p className="text-gray-600">
            Otomotiv sektörü termostat üretim süreçleri, maliyet analizi ve stok takibi
          </p>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <KPICard
            title="Toplam Üretim Maliyeti"
            value={`$${kpis.totalCost.toLocaleString()}`}
            icon={<TrendingUp size={32} />}
            bgColor="bg-blue-50"
            textColor="text-blue-700"
            trend="Ocak 2024"
          />
          <KPICard
            title="Üretilen Toplam Adet"
            value={kpis.totalProduced.toLocaleString()}
            icon={<Package size={32} />}
            bgColor="bg-green-50"
            textColor="text-green-700"
            trend="Tüm ürünler"
          />
          <KPICard
            title="Hatalı Üretim Oranı"
            value={`${defectRate}%`}
            icon={<AlertCircle size={32} />}
            bgColor="bg-red-50"
            textColor="text-red-700"
            trend={`${kpis.totalDefects} adet fire`}
          />
          <KPICard
            title="Mamul Stok Seviyesi"
            value={kpis.finishedStock.toLocaleString()}
            icon={<Warehouse size={32} />}
            bgColor="bg-purple-50"
            textColor="text-purple-700"
            trend="Hazır ürün"
          />
          <KPICard
            title="Yarı Mamul (WIP) Stok"
            value={kpis.wipStock.toLocaleString()}
            icon={<Clock size={32} />}
            bgColor="bg-orange-50"
            textColor="text-orange-700"
            trend="İşlemde"
          />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Cost by Production Stage */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📊 Üretim Aşamalarına Göre Maliyet Dağılımı
            </h3>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📈 Gün Bazlı Üretim Adedi
            </h3>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ⚠️ Fire (Hatalı) Oranı Analizi
            </h3>
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📦 Stok Dağılımı
            </h3>
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
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Üretim Takip Tablosu
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-4 py-3">Tarih</th>
                  <th className="px-4 py-3">Üretim Emri No</th>
                  <th className="px-4 py-3">Ürün Kodu</th>
                  <th className="px-4 py-3">Üretim Aşaması</th>
                  <th className="px-4 py-3">Üretilen Adet</th>
                  <th className="px-4 py-3">Hatalı Adet</th>
                  <th className="px-4 py-3">Maliyet (USD)</th>
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
