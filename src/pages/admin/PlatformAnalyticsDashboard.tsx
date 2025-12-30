import React from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart, Package, Clock } from 'lucide-react';

const PlatformAnalyticsDashboard = () => {
  // 📊 KPI Kartları için veri
  const kpiData = [
    { label: 'Total Orders', value: '480', icon: ShoppingCart, color: 'blue', trend: '+12%' },
    { label: 'Total customers', value: '2.34k', icon: Users, color: 'green', trend: '+8%' },
    { label: 'Revenue', value: '$84.0k', icon: DollarSign, color: 'purple', trend: '+23%' },
    { label: 'Profit', value: '$8.5k', icon: TrendingUp, color: 'orange', trend: '+15%' },
    { label: 'Expenses', value: '$7.7k', icon: Package, color: 'red', trend: '-3%' },
    { label: 'Returns', value: '$1.6k', icon: Clock, color: 'pink', trend: '-5%' },
  ];

  // 📈 Daily Customers Served (Line Chart)
  const dailyCustomersData = [
    { day: 'Monday', customers: 300 },
    { day: 'Tuesday', customers: 380 },
    { day: 'Wednesday', customers: 450 },
    { day: 'Thursday', customers: 520 },
    { day: 'Friday', customers: 580 },
    { day: 'Saturday', customers: 490 },
    { day: 'Sunday', customers: 520 },
  ];

  // 📊 Product Sales Distribution (Bar Chart)
  const productSalesData = [
    { category: 'Appetizers', sales: 83 },
    { category: 'Main Courses', sales: 71 },
    { category: 'Non-alcoholic Beverages', sales: 61 },
    { category: 'Alcoholic Beverages', sales: 55 },
    { category: 'Desserts', sales: 39 },
  ];

  // 🥧 Most Popular Dishes (Pie Chart)
  const popularDishesData = [
    { name: 'Appetizers', value: 25, color: '#3B82F6' },
    { name: 'Main Courses', value: 30, color: '#10B981' },
    { name: 'Banquet', value: 20, color: '#F59E0B' },
    { name: 'Non-alcoholic', value: 15, color: '#EF4444' },
    { name: 'Other', value: 10, color: '#8B5CF6' },
  ];

  // 📊 Served Customers vs Tables (Stacked Bar Chart)
  const customerTablesData = [
    { day: 'Monday', customers: 300, returns: 80, discounts: 120 },
    { day: 'Tuesday', customers: 380, returns: 100, discounts: 150 },
    { day: 'Wednesday', customers: 450, returns: 90, discounts: 180 },
    { day: 'Thursday', customers: 520, returns: 110, discounts: 200 },
    { day: 'Friday', customers: 580, returns: 130, discounts: 220 },
    { day: 'Saturday', customers: 490, returns: 120, discounts: 190 },
    { day: 'Sunday', customers: 520, returns: 100, discounts: 210 },
  ];

  // 📈 Monthly Revenue vs Operating Expenses (Area Chart)
  const monthlyData = [
    { month: 'Jan', revenue: 8, expenses: 5 },
    { month: 'Feb', revenue: 10, expenses: 6 },
    { month: 'Mar', revenue: 13, expenses: 8 },
    { month: 'Apr', revenue: 11, expenses: 9 },
    { month: 'May', revenue: 12, expenses: 7 },
    { month: 'Jun', revenue: 14, expenses: 8 },
    { month: 'Jul', revenue: 13, expenses: 9 },
  ];

  // 📊 Expense Breakdown (Bar Chart)
  const expenseBreakdownData = [
    { category: 'Salaries', amount: 4.4 },
    { category: 'Rent', amount: 3.5 },
    { category: 'Marketing', amount: 2.8 },
    { category: 'Supplies', amount: 3.2 },
    { category: 'Utilities', amount: 2.0 },
    { category: 'Other', amount: 1.5 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">📊 Platform Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Gerçek zamanlı iş metrikleri ve performans göstergeleri</p>
        </div>

        {/* KPI Cards - İlk Satır */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            const isPositive = kpi.trend.startsWith('+');
            
            return (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`text-${kpi.color}-600`} size={20} />
                  <span className={`text-xs font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
              </div>
            );
          })}
        </div>

        {/* İlk Satır: Line Chart + Bar Chart + Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Customers Served - Line Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">📈 Daily Customers Served</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dailyCustomersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Product Sales Distribution - Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">📊 Product sales distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productSalesData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="category" type="category" tick={{ fontSize: 9 }} width={120} />
                <Tooltip />
                <Bar dataKey="sales" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Most Popular Dishes - Pie Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">🥧 Most popular dishes</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={popularDishesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {popularDishesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {popularDishesData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* İkinci Satır: Stacked Bar Chart + Expense Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Served Customers vs Tables - Stacked Bar */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">📊 Total discounts and returns</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={customerTablesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="returns" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="discounts" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Breakdown - Bar Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">💰 Expense Breakdown by Type</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={expenseBreakdownData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                  {expenseBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Üçüncü Satır: Monthly Revenue vs Expenses - Area Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">📈 Monthly Revenue vs Operating Expenses</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '13px' }} />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.6}
                name="Revenue ($k)"
              />
              <Area 
                type="monotone" 
                dataKey="expenses" 
                stackId="2"
                stroke="#EF4444" 
                fill="#EF4444" 
                fillOpacity={0.4}
                name="Operating Expenses ($k)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Dishes Table */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">🍽️ Top Dishes Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600">Dish</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600">Orders</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Margherita Pizza', orders: 120, revenue: '$2,600' },
                  { name: 'Steak Frites', orders: 90, revenue: '$1,800' },
                  { name: 'Carbonara Pasta', orders: 80, revenue: '$1,360' },
                  { name: 'Grilled Salmon', orders: 63, revenue: '$1,200' },
                  { name: 'Pork steak', orders: 60, revenue: '$700' },
                  { name: 'Tiramisu', orders: 50, revenue: '$500' },
                  { name: 'Caesar Salad', orders: 40, revenue: '$800' },
                ].map((dish, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{dish.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 text-right">{dish.orders}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900 text-right">{dish.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformAnalyticsDashboard;














