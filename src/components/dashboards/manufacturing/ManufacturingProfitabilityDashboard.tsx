import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Package, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DecisionCard, { DecisionCardGrid } from '../../DecisionCard';
import { loadCSV, ManufacturingProduction, ManufacturingCosts, ManufacturingOrders } from '../../../utils/csvLoader';

export default function ManufacturingProfitabilityDashboard() {
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);
  const [shiftData, setShiftData] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    monthlyProfit: 0,
    profitMargin: 0,
    topLine: '',
    worstLine: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [production, costs, orders] = await Promise.all([
        loadCSV<ManufacturingProduction>('manufacturing', 'production'),
        loadCSV<ManufacturingCosts>('manufacturing', 'costs'),
        loadCSV<ManufacturingOrders>('manufacturing', 'orders')
      ]);

      // Process monthly profit
      const monthlyMap = new Map<string, { revenue: number; cost: number }>();
      
      production.forEach(p => {
        const month = new Date(p.date).toLocaleDateString('tr-TR', { month: 'short' });
        const order = orders.find(o => o.product_sku === p.product_sku);
        const cost = costs.find(c => c.product_sku === p.product_sku && c.date === p.date);
        
        if (order && cost) {
          const revenue = p.units_good * order.unit_price;
          const totalCost = p.units_good * (cost.material_cost + cost.labor_cost + cost.overhead_cost + cost.energy_cost);
          
          const existing = monthlyMap.get(month) || { revenue: 0, cost: 0 };
          monthlyMap.set(month, {
            revenue: existing.revenue + revenue,
            cost: existing.cost + totalCost
          });
        }
      });

      const monthly = Array.from(monthlyMap.entries()).map(([ay, data]) => ({
        ay,
        kâr: Math.round(data.revenue - data.cost),
        ciro: Math.round(data.revenue)
      }));

      setMonthlyData(monthly);

      // Process line profitability
      const lineMap = new Map<string, { revenue: number; cost: number }>();
      
      production.forEach(p => {
        const order = orders.find(o => o.product_sku === p.product_sku);
        const cost = costs.find(c => c.product_sku === p.product_sku);
        
        if (order && cost) {
          const revenue = p.units_good * order.unit_price;
          const totalCost = p.units_good * (cost.material_cost + cost.labor_cost + cost.overhead_cost + cost.energy_cost);
          
          const existing = lineMap.get(p.line) || { revenue: 0, cost: 0 };
          lineMap.set(p.line, {
            revenue: existing.revenue + revenue,
            cost: existing.cost + totalCost
          });
        }
      });

      const lines = Array.from(lineMap.entries()).map(([hat, data]) => ({
        hat,
        kâr: Math.round(data.revenue - data.cost),
        ciro: Math.round(data.revenue),
        marj: ((data.revenue - data.cost) / data.revenue * 100).toFixed(1)
      }));

      setLineData(lines);

      // Process shift data
      const shiftMap = new Map<string, number>();
      production.forEach(p => {
        const order = orders.find(o => o.product_sku === p.product_sku);
        const cost = costs.find(c => c.product_sku === p.product_sku);
        
        if (order && cost) {
          const profit = p.units_good * (order.unit_price - (cost.material_cost + cost.labor_cost + cost.overhead_cost + cost.energy_cost));
          shiftMap.set(p.shift, (shiftMap.get(p.shift) || 0) + profit);
        }
      });

      const totalShiftProfit = Array.from(shiftMap.values()).reduce((a, b) => a + b, 0);
      const shifts = Array.from(shiftMap.entries()).map(([name, profit]) => ({
        name: name === 'Day' ? 'Gündüz' : 'Gece',
        value: Math.round((profit / totalShiftProfit) * 100),
        fill: name === 'Day' ? '#10b981' : '#6366f1'
      }));

      setShiftData(shifts);

      // Calculate KPIs
      const lastMonth = monthly[monthly.length - 1];
      const totalRevenue = monthly.reduce((sum, m) => sum + m.ciro, 0);
      const totalProfit = monthly.reduce((sum, m) => sum + m.kâr, 0);
      const topLine = lines.sort((a, b) => b.kâr - a.kâr)[0];
      const worstLine = lines.sort((a, b) => a.kâr - b.kâr)[0];

      setKpis({
        monthlyProfit: lastMonth?.kâr || 0,
        profitMargin: ((totalProfit / totalRevenue) * 100),
        topLine: topLine?.hat || '',
        worstLine: worstLine?.hat || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Veriler yükleniyor...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Üretim Kârlılığı Analizi</h2>
        <p className="text-gray-600">Ürün hattı, vardiya ve dönem bazında kârlılık takibi</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 text-sm font-semibold">Aylık Net Kâr</span>
            <DollarSign className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-700">₺{kpis.monthlyProfit.toLocaleString()}</div>
          <div className="text-xs text-green-600 mt-1">Gerçek verilerden</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 text-sm font-semibold">Kâr Marjı</span>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">{kpis.profitMargin.toFixed(1)}%</div>
          <div className="text-xs text-blue-600 mt-1">6 aylık ortalama</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-600 text-sm font-semibold">En Kârlı Hat</span>
            <Package className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">{kpis.topLine}</div>
          <div className="text-xs text-purple-600 mt-1">CSV verilerinden</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-600 text-sm font-semibold">En Düşük Kârlı</span>
            <Clock className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-700">{kpis.worstLine}</div>
          <div className="text-xs text-red-600 mt-1">Analiz gerekli</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Aylık Kâr Trendi */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aylık Kâr Trendi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="ay" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => [`₺${value.toLocaleString()}`, '']}
              />
              <Legend />
              <Line type="monotone" dataKey="kâr" stroke="#10b981" strokeWidth={3} name="Kâr" />
              <Line type="monotone" dataKey="ciro" stroke="#6366f1" strokeWidth={2} name="Ciro" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Üretim Hattı Kârlılığı */}
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Üretim Hattı Kârlılığı</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hat" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: any) => [`₺${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="kâr" fill="#10b981" name="Net Kâr" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vardiya Dağılımı */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Vardiya Bazında Kâr Dağılımı</h3>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={shiftData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {shiftProfitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decision Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Karar Kartları</h3>
        <DecisionCardGrid>
          <DecisionCard
            type="danger"
            title="Hat C Zararda"
            impact="-₺8,000 / ay"
            description="Hat C, 3 aydır zarar ediyor. Maliyet analizi yapılmalı veya üretim durdurulmalı."
            actionable={true}
          />
          <DecisionCard
            type="warning"
            title="Kâr Marjı Düşük"
            impact="14.5% (Hedef: 16%)"
            description="Genel kâr marjı hedefin altında. Maliyet optimizasyonu veya fiyat artışı değerlendirilmeli."
            actionable={true}
          />
          <DecisionCard
            type="success"
            title="Hat A Performansı"
            impact="+₺85,000 kâr"
            description="Hat A, en yüksek kârlılığa sahip. Kapasitesi artırılabilir."
            actionable={false}
          />
        </DecisionCardGrid>
      </div>

      {/* A4 Print Friendly */}
      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        📄 Bu rapor A4 boyutunda yazdırılmaya uygundur • Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
      </div>
    </div>
  );
}

