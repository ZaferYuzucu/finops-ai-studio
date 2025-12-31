import { useState, useEffect } from 'react';
import { Gauge, DollarSign, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DecisionCard, { DecisionCardGrid } from '../../DecisionCard';
import { loadCSV, ManufacturingMachine } from '../../../utils/csvLoader';

export default function ManufacturingCapacityDashboard() {
  const [loading, setLoading] = useState(true);
  const [capacityData, setCapacityData] = useState<any[]>([]);
  const [machineData, setMachineData] = useState<any[]>([]);
  const [kpis, setKpis] = useState({
    utilization: 0,
    idleCost: 0,
    potentialProfit: 0,
    lowestMachine: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const machines = await loadCSV<ManufacturingMachine>('manufacturing', 'machine');

      // Monthly capacity
      const monthlyMap = new Map<string, { runtime: number; planned: number; idleCost: number }>();
      
      machines.forEach(m => {
        const month = new Date(m.date).toLocaleDateString('tr-TR', { month: 'short' });
        const idleCost = (m.downtime_minutes / 60) * 125; // 125₺/saat
        
        const existing = monthlyMap.get(month) || { runtime: 0, planned: 0, idleCost: 0 };
        monthlyMap.set(month, {
          runtime: existing.runtime + m.runtime_minutes,
          planned: existing.planned + m.planned_minutes,
          idleCost: existing.idleCost + idleCost
        });
      });

      const monthly = Array.from(monthlyMap.entries()).map(([ay, data]) => ({
        ay,
        kullanım: Math.round((data.runtime / data.planned) * 100),
        boş_maliyet: Math.round(data.idleCost)
      }));

      setCapacityData(monthly);

      // Machine utilization
      const machineMap = new Map<string, { runtime: number; planned: number }>();
      
      machines.forEach(m => {
        const existing = machineMap.get(m.line) || { runtime: 0, planned: 0 };
        machineMap.set(m.line, {
          runtime: existing.runtime + m.runtime_minutes,
          planned: existing.planned + m.planned_minutes
        });
      });

      const machineList = Array.from(machineMap.entries()).map(([makine, data]) => ({
        makine,
        kullanım: Math.round((data.runtime / data.planned) * 100)
      }));

      setMachineData(machineList);

      // KPIs
      const lastMonth = monthly[monthly.length - 1];
      const lowestMachine = machineList.sort((a, b) => a.kullanım - b.kullanım)[0];
      const avgUtil = monthly.reduce((sum, m) => sum + m.kullanım, 0) / monthly.length;

      setKpis({
        utilization: lastMonth?.kullanım || 0,
        idleCost: lastMonth?.boş_maliyet || 0,
        potentialProfit: Math.round((80 - avgUtil) * 400), // Simplified
        lowestMachine: lowestMachine?.makine || ''
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading capacity data:', error);
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Kapasite Kullanımı & Maliyet</h2>
        <p className="text-gray-600">Kapasite kullanımı, boş kapasite maliyeti ve kâr etkisi (CSV'den)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-600 text-sm font-semibold">Kapasite Kullanımı</span>
            <Gauge className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-700">{kpis.utilization}%</div>
          <div className="text-xs text-blue-600 mt-1">Gerçek veri</div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-red-600 text-sm font-semibold">Boş Kapasite Maliyeti</span>
            <DollarSign className="h-5 w-5 text-red-600" />
          </div>
          <div className="text-3xl font-bold text-red-700">₺{(kpis.idleCost / 1000).toFixed(0)}K</div>
          <div className="text-xs text-red-600 mt-1">Bu ay</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-600 text-sm font-semibold">Potansiyel Kâr</span>
            <AlertCircle className="h-5 w-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-700">+₺{(kpis.potentialProfit / 1000).toFixed(0)}K</div>
          <div className="text-xs text-green-600 mt-1">%80'e çıkarsa</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-purple-600 text-sm font-semibold">En Düşük Kullanım</span>
            <Clock className="h-5 w-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">{kpis.lowestMachine}</div>
          <div className="text-xs text-purple-600 mt-1">CSV'den</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Kapasite Kullanım Trendi</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={capacityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ay" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="kullanım" stroke="#3b82f6" strokeWidth={3} name="Kullanım %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Makine Bazında Kullanım</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={machineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="makine" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="kullanım" fill="#3b82f6" name="Kullanım %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">📊 Karar Kartları (CSV Verileri)</h3>
        <DecisionCardGrid>
          <DecisionCard
            type="warning"
            title="Boş Kapasite ↑"
            impact={`Aylık fırsat maliyeti: ₺${kpis.idleCost.toLocaleString()}`}
            description="Kapasite kullanımı düşük. Sipariş alınmalı veya üretim planı optimize edilmeli."
            actionable={true}
          />
          <DecisionCard
            type="danger"
            title={`${kpis.lowestMachine} Atıl`}
            impact="Düşük kullanım"
            description="Bu hat/makine düşük kapasitede çalışıyor. İnceleme gerekli."
            actionable={true}
          />
          <DecisionCard
            type="info"
            title="Potansiyel"
            impact={`+₺${(kpis.potentialProfit / 1000).toFixed(0)}K kâr`}
            description="Kapasite %80'e çıkarılırsa ekstra kâr potansiyeli."
            actionable={false}
          />
        </DecisionCardGrid>
      </div>

      <div className="text-xs text-gray-500 text-center pt-4 border-t">
        📄 A4 yazdırılabilir • CSV: machine.csv • Güncelleme: {new Date().toLocaleDateString('tr-TR')}
      </div>
    </div>
  );
}
