import { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingUp, Clock } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DecisionCard, { DecisionCardGrid } from '../../DecisionCard';
import { loadCSV, ManufacturingInventory } from '../../../utils/csvLoader';

export default function ManufacturingInventoryDashboard() {
  const [loading, setLoading] = useState(true);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [warehouseData, setWarehouseData] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    stockDays: 0,
    tiedCash: 0,
    turnoverRate: 0,
    potentialCash: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const inventory = await loadCSV<ManufacturingInventory>('manufacturing', 'inventory');

      // Filter finished goods
      const finishedGoods = inventory.filter(i => i.item_type === 'Finished Good');

      // Process timeline
      const timeline = finishedGoods
        .filter(i => i.date)
        .map(i => ({
          date: new Date(i.date),
          stok_gün: Math.round(i.qty_on_hand / 50), // Simplified
          bağlı_nakit: Math.round(i.qty_on_hand * i.unit_cost)
        }))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .map(i => ({
          ay: i.date.toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
          stok_gün: i.stok_gün,
          bağlı_nakit: i.bağlı_nakit
        }));

      setInventoryData(timeline);

      // Warehouse breakdown
      const warehouseMap = new Map<string, { stock: number; cost: number }>();
      
      finishedGoods.forEach(i => {
        const existing = warehouseMap.get(i.warehouse) || { stock: 0, cost: 0 };
        warehouseMap.set(i.warehouse, {
          stock: existing.stock + i.qty_on_hand * i.unit_cost,
          cost: existing.cost + i.qty_on_hand * i.unit_cost
        });
      });

      const warehouses = Array.from(warehouseMap.entries()).map(([depo, data]) => ({
        depo,
        stok_tl: Math.round(data.stock / 1000), // in thousands
        gün: Math.round(data.stock / (data.cost / 365)) // Simplified
      }));

      setWarehouseData(warehouses);

      // KPIs
      const latest = timeline[timeline.length - 1];
      const avgStockDays = timeline.reduce((sum, t) => sum + t.stok_gün, 0) / timeline.length;
      const totalTiedCash = warehouses.reduce((sum, w) => sum + w.stok_tl * 1000, 0);

      setKpis({
        stockDays: latest?.stok_gün || 0,
        tiedCash: totalTiedCash,
        turnoverRate: 365 / avgStockDays,
        potentialCash: Math.round((avgStockDays - 30) * (totalTiedCash / avgStockDays))
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading inventory data:', error);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Stok & Çalışma Sermayesi</h2>
        <p className="text-gray-600">Stok devir hızı, bağlı nakit ve sipariş noktaları (CSV'den)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-orange-600 text-sm font-semibold">Stok Gün Sayısı</span>
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-orange-700">{kpis.stockDays} gün</div>
          <div className="text-xs text-orange-600 mt-1">CSV'den</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-600 text-sm font-semibold">Bağlı Nakit</span>
            <DollarSign className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-700">₺{(kpis.tiedCash / 1000).toFixed(0)}K</div>
          <div className="text-xs text-red-600 mt-1">Stokta duran</div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 text-sm font-semibold">Devir Hızı</span>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">{kpis.turnoverRate.toFixed(1)}x</div>
          <div className="text-xs text-blue-600 mt-1">Yıllık</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 text-sm font-semibold">Potansiyel Serbest Nakit</span>
            <Package className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-700">+₺{(kpis.potentialCash / 1000).toFixed(0)}K</div>
          <div className="text-xs text-green-600 mt-1">30 güne inerse</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Stok Gün Trendi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={inventoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ay" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="stok_gün" stroke="#f97316" strokeWidth={3} name="Stok Gün" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Depo Bazında Stok (₺K)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={warehouseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="depo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="stok_tl" fill="#f97316" name="Stok Değeri (₺K)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Karar Kartları (CSV Verileri)</h3>
        <DecisionCardGrid>
          <DecisionCard
            type="warning"
            title="Stok Gün Sayısı ↑"
            impact={`Nakit bağlama: +₺${(kpis.potentialCash / 1000).toFixed(0)}K`}
            description={`Stok ${kpis.stockDays} gün seviyesinde. 30 güne düşürülürse nakit serbest kalır.`}
            actionable={true}
          />
          <DecisionCard
            type="danger"
            title="Bağlı Nakit Yüksek"
            impact={`₺${(kpis.tiedCash / 1000).toFixed(0)}K stokta`}
            description="Stokta bağlı naktin yüksek olması operasyonel esnekliği azaltır."
            actionable={true}
          />
          <DecisionCard
            type="info"
            title="Devir Hızı"
            impact={`${kpis.turnoverRate.toFixed(1)}x/yıl`}
            description="Stok devir hızı. Sektör ortalaması ile karşılaştırılmalı."
            actionable={false}
          />
        </DecisionCardGrid>
      </div>

      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        📄 A4 yazdırılabilir • CSV: inventory.csv • Güncelleme: {new Date().toLocaleDateString('tr-TR')}
      </div>
    </div>
  );
}
