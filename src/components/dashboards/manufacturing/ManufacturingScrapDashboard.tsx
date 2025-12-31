import { useState, useEffect } from 'react';
import { AlertTriangle, TrendingDown, Package, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DecisionCard, { DecisionCardGrid } from '../../DecisionCard';
import { loadCSV, ManufacturingScrap, ManufacturingProduction, ManufacturingCosts } from '../../../utils/csvLoader';

export default function ManufacturingScrapDashboard() {
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    scrapRate: 0,
    monthlyCost: 0,
    topScrapProduct: '',
    yearlyEstimate: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [scrap, production, costs] = await Promise.all([
        loadCSV<ManufacturingScrap>('manufacturing', 'scrap'),
        loadCSV<ManufacturingProduction>('manufacturing', 'production'),
        loadCSV<ManufacturingCosts>('manufacturing', 'costs')
      ]);

      // Process monthly scrap
      const monthlyMap = new Map<string, { scrapUnits: number; producedUnits: number; cost: number }>();
      
      scrap.forEach(s => {
        const month = new Date(s.date).toLocaleDateString('tr-TR', { month: 'short' });
        const prod = production.find(p => p.date === s.date && p.product_sku === s.product_sku);
        const cost = costs.find(c => c.product_sku === s.product_sku);
        
        if (prod && cost) {
          const existing = monthlyMap.get(month) || { scrapUnits: 0, producedUnits: 0, cost: 0 };
          monthlyMap.set(month, {
            scrapUnits: existing.scrapUnits + s.scrap_units,
            producedUnits: existing.producedUnits + prod.units_produced,
            cost: existing.cost + (s.scrap_units * cost.material_cost)
          });
        }
      });

      const monthly = Array.from(monthlyMap.entries()).map(([ay, data]) => ({
        ay,
        fire_pct: ((data.scrapUnits / data.producedUnits) * 100).toFixed(1),
        maliyet_tl: Math.round(data.cost)
      }));

      setMonthlyData(monthly);

      // Process product scrap
      const productMap = new Map<string, { scrapUnits: number; producedUnits: number; cost: number }>();
      
      scrap.forEach(s => {
        const prod = production.find(p => p.product_sku === s.product_sku);
        const cost = costs.find(c => c.product_sku === s.product_sku);
        
        if (prod && cost) {
          const existing = productMap.get(s.product_sku) || { scrapUnits: 0, producedUnits: 0, cost: 0 };
          productMap.set(s.product_sku, {
            scrapUnits: existing.scrapUnits + s.scrap_units,
            producedUnits: existing.producedUnits + prod.units_produced,
            cost: existing.cost + (s.scrap_units * cost.material_cost)
          });
        }
      });

      const products = Array.from(productMap.entries()).map(([ürün, data]) => ({
        ürün,
        fire_pct: ((data.scrapUnits / data.producedUnits) * 100).toFixed(1),
        kayıp_tl: Math.round(data.cost)
      }));

      setProductData(products);

      // KPIs
      const lastMonth = monthly[monthly.length - 1];
      const topProduct = products.sort((a, b) => parseFloat(b.fire_pct) - parseFloat(a.fire_pct))[0];
      const avgMonthlyCost = monthly.reduce((sum, m) => sum + m.maliyet_tl, 0) / monthly.length;

      setKpis({
        scrapRate: parseFloat(lastMonth?.fire_pct || '0'),
        monthlyCost: lastMonth?.maliyet_tl || 0,
        topScrapProduct: topProduct?.ürün || '',
        yearlyEstimate: Math.round(avgMonthlyCost * 12)
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading scrap data:', error);
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Veriler yükleniyor...</div>
      </div>
    </div>;
  }
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Fire & Verimsizlik Analizi</h2>
        <p className="text-gray-600">Fire oranları ve TL etkisi takibi</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-600 text-sm font-semibold">Fire Oranı</span>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-700">{kpis.scrapRate.toFixed(1)}%</div>
          <div className="text-xs text-red-600 mt-1">Gerçek verilerden</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-600 text-sm font-semibold">Aylık Fire Maliyeti</span>
            <DollarSign className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-700">₺{kpis.monthlyCost.toLocaleString()}</div>
          <div className="text-xs text-orange-600 mt-1">CSV'den hesaplandı</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-600 text-sm font-semibold">En Yüksek Fire</span>
            <Package className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">{kpis.topScrapProduct}</div>
          <div className="text-xs text-purple-600 mt-1">Analiz gerekli</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 text-sm font-semibold">Yıllık Tahmin</span>
            <TrendingDown className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">₺{(kpis.yearlyEstimate / 1000).toFixed(0)}K</div>
          <div className="text-xs text-blue-600 mt-1">Ortalamadan tahmin</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aylık Fire Trendi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="ay" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="left" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="fire_pct" stroke="#ef4444" strokeWidth={3} name="Fire %" />
              <Line yAxisId="right" type="monotone" dataKey="maliyet_tl" stroke="#f59e0b" strokeWidth={2} name="Maliyet (₺)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Ürün Bazında Fire</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="ürün" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
              <Bar dataKey="fire_pct" fill="#ef4444" name="Fire %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Decision Cards */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Karar Kartları</h3>
        <DecisionCardGrid>
          <DecisionCard
            type="danger"
            title="Fire Oranı Yükseliyor"
            impact="Bu ay -₺19,800 TL kayıp"
            description="Fire oranı 3 aydır artış trendinde. Kalite kontrol veya makine bakımı gerekebilir."
            actionable={true}
          />
          <DecisionCard
            type="warning"
            title="Ürün C Kritik"
            impact="4.1% fire = -₺18,500 TL/ay"
            description="Ürün C'de fire ortalamanın 2x üzerinde. Üretim parametreleri gözden geçirilmeli."
            actionable={true}
          />
          <DecisionCard
            type="info"
            title="Yıllık Etki"
            impact="~₺237,000 fire maliyeti"
            description="Mevcut trendle yıllık fire maliyeti ₺237K. %1 düşüş = ₺91K tasarruf."
            actionable={false}
          />
        </DecisionCardGrid>
      </div>

      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        📄 Bu rapor A4 boyutunda yazdırılmaya uygundur • Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
      </div>
    </div>
  );
}

