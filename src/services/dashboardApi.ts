// Dashboard API Service
// Backend entegrasyonu için hazır API fonksiyonları

import { generateMockData } from '../utils/mockDataGenerator';
import { auth } from '../firebase';

// API Base URL (production'da environment variable olacak)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Firebase ID token'ı al
const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Error getting Firebase ID token:', error);
    return null;
  }
};

// Generic API request fonksiyonu
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = await getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

// Dashboard Types
export interface DashboardFilters {
  dateRange: 'mtd' | 'wtd' | 'ytd';
  location: 'all' | 'kadikoy' | 'besiktas' | 'taksim';
}

export interface DashboardData {
  kpi: {
    revenue: number;
    revenueChange: number;
    revenueCompare: number;
    orders: number;
    ordersChange: number;
    ordersCompare: number;
    avgBasket: number;
    avgBasketChange: number;
    avgBasketCompare: number;
    foodCost: number;
    foodCostChange: number;
    foodCostCompare: number;
    laborCost: number;
    laborCostChange: number;
    laborCostCompare: number;
    satisfaction: number;
    satisfactionChange: number;
    satisfactionCompare: number;
  };
  dailyRevenue: Array<{ name: string; value: number; target: number }>;
  hourlyBusy: Array<{ name: string; value: number }>;
  productSales: Array<{ name: string; value: number }>;
}

// Restaurant Dashboard Data API
export const fetchRestaurantDashboard = async (
  filters: DashboardFilters
): Promise<DashboardData> => {
  try {
    // GERÇEK API ÇAĞRISI (Backend hazır olduğunda aktif edilecek)
    /*
    const data = await apiRequest(
      `/dashboard/restaurant?period=${filters.dateRange}&location=${filters.location}`
    );
    return data;
    */

    // ŞİMDİLİK MOCK VERİ (Development için)
    // Backend hazır olduğunda yukarıdaki kod aktif edilecek
    console.log('📊 Dashboard API Call:', {
      endpoint: '/dashboard/restaurant',
      filters,
      note: 'Mock data kullanılıyor. Backend entegrasyonu için yukarıdaki kodu aktif edin.'
    });

    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 300));

    return generateMockData(filters.dateRange, filters.location);
  } catch (error) {
    console.error('❌ Dashboard API Error:', error);
    
    // Hata durumunda fallback mock data
    console.warn('⚠️ API başarısız, fallback mock data kullanılıyor');
    return generateMockData(filters.dateRange, filters.location);
  }
};

// Share Dashboard Link API
export const shareDashboard = async (
  dashboardType: string,
  filters: DashboardFilters,
  expiresInHours: number = 24
): Promise<{ shareUrl: string; expiresAt: string }> => {
  try {
    // GERÇEK API ÇAĞRISI
    /*
    const response = await apiRequest('/dashboard/share', {
      method: 'POST',
      body: JSON.stringify({
        dashboardType,
        filters,
        expiresInHours,
      }),
    });
    return response;
    */

    // MOCK RESPONSE
    console.log('🔗 Share Dashboard API Call:', {
      dashboardType,
      filters,
      expiresInHours,
      note: 'Mock response. Backend token-based share sistemi gerekli.'
    });

    // Simüle edilmiş share link
    const shareToken = Math.random().toString(36).substring(2, 15);
    const shareUrl = `${window.location.origin}/shared/${dashboardType}/${shareToken}`;
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000).toISOString();

    return { shareUrl, expiresAt };
  } catch (error) {
    console.error('❌ Share Dashboard API Error:', error);
    throw error;
  }
};

// Export Dashboard PDF API (Server-side PDF generation)
export const exportDashboardPDF = async (
  dashboardType: string,
  filters: DashboardFilters
): Promise<Blob> => {
  try {
    // GERÇEK API ÇAĞRISI
    /*
    const token = await getAuthToken();
    const response = await fetch(
      `${API_BASE_URL}/dashboard/export/pdf?type=${dashboardType}&period=${filters.dateRange}&location=${filters.location}`,
      {
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      }
    );
    
    if (!response.ok) throw new Error('PDF export failed');
    
    return response.blob();
    */

    // MOCK RESPONSE
    console.log('📄 Export PDF API Call:', {
      dashboardType,
      filters,
      note: 'Client-side PDF generation kullanılıyor. Server-side için yukarıdaki kodu aktif edin.'
    });

    throw new Error('Server-side PDF export henüz aktif değil. Client-side print kullanın.');
  } catch (error) {
    console.error('❌ Export PDF API Error:', error);
    throw error;
  }
};

// BACKEND API ENDPOINTS DÖKÜMANTASYONU
/*

===========================================
BACKEND API ENDPOINTS - IMPLEMENTATION GUIDE
===========================================

1. RESTAURANT DASHBOARD DATA
----------------------------
GET /api/dashboard/restaurant

Query Parameters:
- period: "mtd" | "wtd" | "ytd"
- location: "all" | "kadikoy" | "besiktas" | "taksim"

Headers:
- Authorization: Bearer <JWT_TOKEN>

Response: DashboardData (yukarıdaki interface)

----------------------------

2. SHARE DASHBOARD
----------------------------
POST /api/dashboard/share

Headers:
- Authorization: Bearer <JWT_TOKEN>
- Content-Type: application/json

Body:
{
  "dashboardType": "restaurant",
  "filters": {
    "dateRange": "mtd",
    "location": "all"
  },
  "expiresInHours": 24
}

Response:
{
  "shareUrl": "https://finops.ist/shared/restaurant/abc123xyz",
  "shareToken": "abc123xyz",
  "expiresAt": "2025-01-16T12:00:00Z"
}

Güvenlik:
- Token database'de saklanmalı (share_tokens tablosu)
- Expire time kontrolü
- IP whitelist (opsiyonel)
- View-only mode
- Rate limiting (abuse önleme)

----------------------------

3. EXPORT PDF
----------------------------
GET /api/dashboard/export/pdf

Query Parameters:
- type: "restaurant" | "finance" | "hr" | ...
- period: "mtd" | "wtd" | "ytd"
- location: "all" | ...

Headers:
- Authorization: Bearer <JWT_TOKEN>

Response: PDF file (Content-Type: application/pdf)

Backend teknoloji seçenekleri:
- Puppeteer (Node.js - Chrome headless)
- wkhtmltopdf
- Prince XML
- HTML2PDF (Python)

----------------------------

4. DATABASE SCHEMA SUGGESTION
----------------------------

Table: share_tokens
- id: UUID (primary key)
- user_id: UUID (foreign key)
- dashboard_type: VARCHAR
- filters: JSONB
- token: VARCHAR (unique, indexed)
- expires_at: TIMESTAMP
- created_at: TIMESTAMP
- view_count: INTEGER
- last_viewed_at: TIMESTAMP
- ip_whitelist: JSONB (nullable)

Indexes:
- token (unique)
- expires_at (for cleanup)
- user_id (for user's shared links)

----------------------------

5. AUTHENTICATION & AUTHORIZATION
----------------------------
- JWT token validation
- User role check (admin, manager, viewer)
- Dashboard permission check
- Location/branch access control

----------------------------

*/
