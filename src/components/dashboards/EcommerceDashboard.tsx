// E-Commerce Dashboard - E-Ticaret Performans Paneli
import React from 'react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, ComposedChart
} from 'recharts';
import KpiCard from './KpiCard';
import { ShoppingCart, Users, DollarSign, TrendingUp, Package, CreditCard } from 'lucide-react';

const salesTrendData = [
  { week: 'Hf1', orders: 1250, revenue: 285000, conversion: 3.2 },
  { week: 'Hf2', orders: 1380, revenue: 312000, conversion: 3.5 },
  { week: 'Hf3', orders: 1450, revenue: 335000, conversion: 3.7 },
  { week: 'Hf4', orders: 1520, revenue: 358000, conversion: 3.9 },
  { week: 'Hf5', orders: 1680, revenue: 395000, conversion: 4.1 },
  { week: 'Hf6', orders: 1850, revenue: 428000, conversion: 4.3 },
];

const topProductsData = [
  { product: 'Ürün-A', sales: 85000, units: 420, margin: 35.2 },
  { product: 'Ürün-B', sales: 72000, units: 380, margin: 32.8 },
  { product: 'Ürün-C', sales: 65000, units: 340, margin: 38.5 },
  { product: 'Ürün-D', sales: 58000, units: 295, margin: 28.9 },
  { product: 'Ürün-E', sales: 52000, units: 280, margin: 41.2 },
];

const trafficSourceData = [
  { source: 'Organik', visitors: 28500, orders: 1250, conversion: 4.4 },
  { source: 'Ücretli Reklam', visitors: 18200, orders: 820, conversion: 4.5 },
  { source: 'Sosyal Medya', visitors: 15800, orders: 580, conversion: 3.7 },
  { source: 'E-posta', visitors: 8500, orders: 420, conversion: 4.9 },
  { source: 'Direkt', visitors: 12000, orders: 680, conversion: 5.7 },
];

const cartAbandonmentData = [
  { day: 'Pzt', added: 485, abandoned: 328, completed: 157 },
  { day: 'Sal', added: 520, abandoned: 350, completed: 170 },
  { day: 'Çar', added: 558, abandoned: 365, completed: 193 },
  { day: 'Per', added: 595, abandoned: 385, completed: 210 },
  { day: 'Cum', added: 645, abandoned: 410, completed: 235 },
  { day: 'Cmt', added: 720, abandoned: 445, completed: 275 },
  { day: 'Paz', added: 580, abandoned: 370, completed: 210 },
];

const paymentMethodData = [
  { method: 'Kredi Kartı', orders: 1250, amount: 295000 },
  { method: 'Kapıda Ödeme', orders: 420, amount: 85000 },
  { method: 'Havale/EFT', orders: 180, amount: 48000 },
];

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

const EcommerceDashboard: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto bg-gray-100 p-4">
      <div 
        className="bg-gray-50 p-6 mx-auto"
        style={{
          width: '98%',
          maxWidth: '1800px',
          minHeight: 'auto',
          fontFamily: 'Inter, system-ui, sans-serif',
          transformOrigin: 'top center'
        }}
      >
      <div className="mb-4">
        <h1 className="text-2xl font-black text-gray-900">E-Ticaret Performans Paneli</h1>
        <p className="text-sm text-gray-600">Satış & Dönüşüm Analizi | Son Güncelleme: 29 Aralık 2025</p>
      </div>

      <div className="grid grid-cols-6 gap-4 mb-4">
        <KpiCard
          title="Toplam Gelir"
          value="₺428K"
          change={50.2}
          previousValue="₺285K"
          icon={<DollarSign size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Sipariş Adedi"
          value="1,850"
          change={48.0}
          previousValue="1,250"
          icon={<ShoppingCart size={20} />}
          color="#3B82F6"
        />
        <KpiCard
          title="Dönüşüm Oranı"
          value="4.3"
          unit="%"
          change={34.4}
          previousValue="3.2%"
          icon={<TrendingUp size={20} />}
          color="#8B5CF6"
        />
        <KpiCard
          title="Ort. Sepet"
          value="₺231"
          change={1.5}
          previousValue="₺228"
          icon={<Package size={20} />}
          color="#F59E0B"
        />
        <KpiCard
          title="Ziyaretçi"
          value="83K"
          change={12.5}
          previousValue="73.8K"
          icon={<Users size={20} />}
          color="#10B981"
        />
        <KpiCard
          title="Terk Oranı"
          value="62.5"
          unit="%"
          change={-3.5}
          previousValue="66.0%"
          icon={<CreditCard size={20} />}
          color="#EF4444"
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Satış & Dönüşüm Trendi</h3>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} domain={[0, 6]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar yAxisId="left" dataKey="revenue" fill="#10B981" name="Gelir (₺)" />
              <Line yAxisId="right" type="monotone" dataKey="conversion" stroke="#8B5CF6" strokeWidth={3} name="Dönüşüm (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">En Çok Satan Ürünler (Top 5)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topProductsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="product" type="category" tick={{ fontSize: 10 }} width={70} />
              <Tooltip />
              <Bar dataKey="sales" name="Satış (₺)">
                {topProductsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Trafik Kaynağı Performansı</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trafficSourceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="source" tick={{ fontSize: 9 }} angle={-15} textAnchor="end" height={70} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="orders" name="Sipariş">
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Sepet Terk Analizi</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cartAbandonmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="completed" stackId="a" fill="#10B981" name="Tamamlanan" />
              <Bar dataKey="abandoned" stackId="a" fill="#EF4444" name="Terk Edilen" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 mb-3">Ödeme Yöntemi Dağılımı</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={paymentMethodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="method" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="orders" fill="#3B82F6" name="Sipariş Adedi" />
              <Bar dataKey="amount" fill="#10B981" name="Tutar (₺)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Veri Kaynağı: E-Ticaret Platformu + Google Analytics | Otomatik güncellenme: Anlık | © 2025 FINOPS AI Studio
        </p>
      </div>
    </div>
    </div>
  );
};

export default EcommerceDashboard;








