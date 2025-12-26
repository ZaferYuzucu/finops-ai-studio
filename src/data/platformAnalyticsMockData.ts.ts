// Mock data for Platform Analytics Dashboard

export interface PlatformUser {
  id: string;
  email: string;
  plan: 'Free' | 'Pro' | 'Business' | 'BetaPartner' | 'Enterprise';
  registrationDate: string;
  lastLogin: string;
  sessionCount: number;
  totalUsageMinutes: number;
  status: 'active' | 'inactive' | 'churned';
}

export interface RevenueData {
  month: string;
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  newRevenue: number;
  churnedRevenue: number;
}

export interface DashboardUsage {
  dashboardName: string;
  viewCount: number;
  uniqueUsers: number;
  avgTimeMinutes: number;
  category: string;
}

export interface SessionData {
  date: string;
  dailyActiveUsers: number;
  newSignups: number;
  avgSessionDuration: number;
}

// Mock Users (50 kullanıcı)
export const mockUsers: PlatformUser[] = [
  {
    id: 'user-001',
    email: 'ceo@techhotel.com',
    plan: 'Enterprise',
    registrationDate: '2024-01-15',
    lastLogin: '2024-12-25',
    sessionCount: 342,
    totalUsageMinutes: 18540,
    status: 'active',
  },
  {
    id: 'user-002',
    email: 'finansmanager@luxuryinn.com',
    plan: 'Business',
    registrationDate: '2024-02-03',
    lastLogin: '2024-12-24',
    sessionCount: 287,
    totalUsageMinutes: 14320,
    status: 'active',
  },
  {
    id: 'user-003',
    email: 'owner@beachresort.com',
    plan: 'Pro',
    registrationDate: '2024-03-12',
    lastLogin: '2024-12-25',
    sessionCount: 198,
    totalUsageMinutes: 9870,
    status: 'active',
  },
  {
    id: 'user-004',
    email: 'manager@cityrestaurant.com',
    plan: 'Pro',
    registrationDate: '2024-03-20',
    lastLogin: '2024-12-23',
    sessionCount: 156,
    totalUsageMinutes: 7230,
    status: 'active',
  },
  {
    id: 'user-005',
    email: 'chef@gourmetbistro.com',
    plan: 'Free',
    registrationDate: '2024-04-05',
    lastLogin: '2024-12-20',
    sessionCount: 45,
    totalUsageMinutes: 1350,
    status: 'active',
  },
  // Beta Partners
  {
    id: 'user-006',
    email: 'partner@innovatehotel.com',
    plan: 'BetaPartner',
    registrationDate: '2024-01-10',
    lastLogin: '2024-12-25',
    sessionCount: 412,
    totalUsageMinutes: 22100,
    status: 'active',
  },
  {
    id: 'user-007',
    email: 'director@grandpalace.com',
    plan: 'Business',
    registrationDate: '2024-02-18',
    lastLogin: '2024-12-24',
    sessionCount: 267,
    totalUsageMinutes: 13450,
    status: 'active',
  },
  // Inactive users
  {
    id: 'user-008',
    email: 'olduser@example.com',
    plan: 'Free',
    registrationDate: '2024-05-01',
    lastLogin: '2024-08-15',
    sessionCount: 12,
    totalUsageMinutes: 340,
    status: 'inactive',
  },
  {
    id: 'user-009',
    email: 'churned@example.com',
    plan: 'Pro',
    registrationDate: '2024-06-10',
    lastLogin: '2024-09-20',
    sessionCount: 23,
    totalUsageMinutes: 890,
    status: 'churned',
  },
  // Recent signups
  {
    id: 'user-010',
    email: 'new@startup.com',
    plan: 'Free',
    registrationDate: '2024-12-20',
    lastLogin: '2024-12-25',
    sessionCount: 8,
    totalUsageMinutes: 120,
    status: 'active',
  },
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `user-${String(i + 11).padStart(3, '0')}`,
    email: `user${i + 11}@company${i + 1}.com`,
    plan: ['Free', 'Pro', 'Business', 'Enterprise'][Math.floor(Math.random() * 4)] as PlatformUser['plan'],
    registrationDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    lastLogin: new Date(2024, 11, Math.floor(Math.random() * 25) + 1).toISOString().split('T')[0],
    sessionCount: Math.floor(Math.random() * 300) + 10,
    totalUsageMinutes: Math.floor(Math.random() * 15000) + 500,
    status: Math.random() > 0.15 ? 'active' : (Math.random() > 0.5 ? 'inactive' : 'churned') as PlatformUser['status'],
  })),
];

// Revenue Data (Son 12 ay)
export const mockRevenue: RevenueData[] = [
  { month: '2024-01', mrr: 12500, arr: 150000, newRevenue: 5000, churnedRevenue: 500 },
  { month: '2024-02', mrr: 15200, arr: 182400, newRevenue: 3200, churnedRevenue: 500 },
  { month: '2024-03', mrr: 18900, arr: 226800, newRevenue: 4100, churnedRevenue: 400 },
  { month: '2024-04', mrr: 22100, arr: 265200, newRevenue: 3500, churnedRevenue: 300 },
  { month: '2024-05', mrr: 25600, arr: 307200, newRevenue: 3800, churnedRevenue: 300 },
  { month: '2024-06', mrr: 28900, arr: 346800, newRevenue: 3600, churnedRevenue: 300 },
  { month: '2024-07', mrr: 32400, arr: 388800, newRevenue: 3800, churnedRevenue: 300 },
  { month: '2024-08', mrr: 35200, arr: 422400, newRevenue: 3100, churnedRevenue: 300 },
  { month: '2024-09', mrr: 37800, arr: 453600, newRevenue: 2900, churnedRevenue: 300 },
  { month: '2024-10', mrr: 40100, arr: 481200, newRevenue: 2600, churnedRevenue: 300 },
  { month: '2024-11', mrr: 41900, arr: 502800, newRevenue: 2100, churnedRevenue: 300 },
  { month: '2024-12', mrr: 44200, arr: 530400, newRevenue: 2600, churnedRevenue: 300 },
];

// Dashboard Usage (En popüler 15 dashboard)
export const mockDashboardUsage: DashboardUsage[] = [
  { dashboardName: 'CEO Bütünleşik Dashboard', viewCount: 3420, uniqueUsers: 67, avgTimeMinutes: 18, category: 'Genel' },
  { dashboardName: 'Finansal Genel Bakış', viewCount: 2890, uniqueUsers: 72, avgTimeMinutes: 15, category: 'Finans' },
  { dashboardName: 'Satış Hunisi Analizi', viewCount: 2654, uniqueUsers: 58, avgTimeMinutes: 12, category: 'Satış' },
  { dashboardName: 'Müşteri Davranış Analizi', viewCount: 2301, uniqueUsers: 54, avgTimeMinutes: 14, category: 'Müşteri' },
  { dashboardName: 'Pazarlama Kampanya Performansı', viewCount: 2187, uniqueUsers: 49, avgTimeMinutes: 11, category: 'Pazarlama' },
  { dashboardName: 'İnsan Kaynakları ve Yetenek', viewCount: 1965, uniqueUsers: 42, avgTimeMinutes: 13, category: 'İK' },
  { dashboardName: 'Envanter Yönetimi', viewCount: 1842, uniqueUsers: 38, avgTimeMinutes: 10, category: 'Operasyon' },
  { dashboardName: 'Müşteri Hizmetleri Performansı', viewCount: 1723, uniqueUsers: 35, avgTimeMinutes: 9, category: 'Destek' },
  { dashboardName: 'Ürün Performans Metrikleri', viewCount: 1654, uniqueUsers: 33, avgTimeMinutes: 11, category: 'Ürün' },
  { dashboardName: 'Nakit Akışı ve Likidite', viewCount: 1589, uniqueUsers: 31, avgTimeMinutes: 16, category: 'Finans' },
  { dashboardName: 'Otel Doluluk Analizi', viewCount: 1432, uniqueUsers: 28, avgTimeMinutes: 12, category: 'Otelcilik' },
  { dashboardName: 'Restoran Masa Devir Hızı', viewCount: 1321, uniqueUsers: 26, avgTimeMinutes: 8, category: 'Restoran' },
  { dashboardName: 'E-Ticaret Performans', viewCount: 1198, uniqueUsers: 24, avgTimeMinutes: 10, category: 'E-Ticaret' },
  { dashboardName: 'Sosyal Medya Etkileşim', viewCount: 1087, uniqueUsers: 22, avgTimeMinutes: 7, category: 'Pazarlama' },
  { dashboardName: 'Lojistik ve Tedarik Zinciri', viewCount: 965, uniqueUsers: 19, avgTimeMinutes: 9, category: 'Lojistik' },
];

// Session Data (Son 30 gün)
export const mockSessionData: SessionData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 11, 26 - (29 - i)); // Son 30 gün
  const isWeekend = date.getDay() === 0 || date.getDay() === 6;
  const baseDAU = isWeekend ? 320 : 450;
  const variance = Math.floor(Math.random() * 100) - 50;
  
  return {
    date: date.toISOString().split('T')[0],
    dailyActiveUsers: baseDAU + variance,
    newSignups: Math.floor(Math.random() * 15) + 3,
    avgSessionDuration: Math.floor(Math.random() * 20) + 15, // 15-35 dakika
  };
});

// Summary Stats (Özet istatistikler)
export const summaryStats = {
  totalUsers: mockUsers.length,
  activeUsers: mockUsers.filter(u => u.status === 'active').length,
  inactiveUsers: mockUsers.filter(u => u.status === 'inactive').length,
  churnedUsers: mockUsers.filter(u => u.status === 'churned').length,
  currentMRR: mockRevenue[mockRevenue.length - 1].mrr,
  currentARR: mockRevenue[mockRevenue.length - 1].arr,
  churnRate: ((mockUsers.filter(u => u.status === 'churned').length / mockUsers.length) * 100).toFixed(1),
  avgSessionDuration: Math.round(mockUsers.reduce((acc, u) => acc + (u.totalUsageMinutes / u.sessionCount), 0) / mockUsers.length),
  planDistribution: {
    Free: mockUsers.filter(u => u.plan === 'Free').length,
    Pro: mockUsers.filter(u => u.plan === 'Pro').length,
    Business: mockUsers.filter(u => u.plan === 'Business').length,
    BetaPartner: mockUsers.filter(u => u.plan === 'BetaPartner').length,
    Enterprise: mockUsers.filter(u => u.plan === 'Enterprise').length,
  },
};

