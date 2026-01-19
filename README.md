# FinOps AI Studio 🚀

**Yapay Zeka Odaklı Finansal Çözümler SaaS Platformu**

FinOps AI Studio, KOBİ'ler ve işletmeler için yapay zeka destekli finansal operasyon yönetimi ve dashboard çözümleri sunan bir SaaS platformudur.

---

## 📊 Proje Özeti

- **Dashboard Sayısı:** 35 profesyonel dashboard
- **Sektör Kapsamı:** 14 farklı sektör kategorisi
- **Veri Kütüphanesi:** 10+ zengin CSV veri seti
- **AI Entegrasyonu:** OpenAI GPT-4 powered conversation engine
- **Teknoloji:** React 18 + TypeScript + Tailwind CSS + Firebase

---

## 🏗️ Teknoloji Stack

### Frontend
- **React** 18.2 - Modern UI framework
- **TypeScript** - Type-safe kod
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS
- **Tremor React** - Dashboard component library
- **Recharts** - Grafik ve chart library
- **Framer Motion** - Animasyon library

### Backend & Services
- **Firebase** - Authentication & Firestore Database
- **OpenAI API** - AI-powered insights
- **Vercel** - Deployment platform

### Özellikler
- ✅ Multi-language support (i18next)
- ✅ PDF/Excel export (html2pdf, xlsx)
- ✅ Dashboard Factory pattern
- ✅ CSV data ingestion
- ✅ AI conversation engine
- ✅ Survey & recommendation system

---

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

```bash
# 1. Repository'yi klonlayın
git clone <repo-url>
cd finops-ai-studio

# 2. Bağımlılıkları yükleyin
npm install

# 3. Environment variables ayarlayın
# .env dosyası oluşturun ve gerekli API key'leri ekleyin

# 4. Development server'ı başlatın
npm run dev

# Server http://localhost:5173 adresinde çalışacaktır
```

### Build

```bash
# Production build
npm run build

# Build preview
npm run preview
```

---

## 📂 Proje Yapısı

```
finops-ai-studio/
├── src/
│   ├── components/          # React component'leri
│   │   ├── dashboards/      # Dashboard component'leri (35 adet)
│   │   └── ...
│   ├── pages/               # Sayfa component'leri
│   │   ├── admin/           # Admin paneli sayfaları
│   │   └── ...
│   ├── config/              # Konfigürasyon dosyaları
│   │   ├── dashboardCategoriesConfig.ts  # Dashboard kategorileri
│   │   └── dashboardConfigs.ts           # Dashboard içerikleri
│   ├── services/            # API ve servis katmanı
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type tanımları
│   ├── utils/               # Utility fonksiyonlar
│   └── App.tsx              # Ana uygulama component
├── data/
│   └── csv-library/         # CSV veri setleri (10 dataset)
├── public/                  # Static asset'ler
└── docs/                    # Dokümantasyon
```

---

## 🎯 Özellikler

### 1. Dashboard Kütüphanesi
- **35 profesyonel dashboard**
- **14 sektör kategorisi:**
  - 🍽️ Restoran & Kafe
  - 🏭 Üretim & Operasyon
  - 💰 Finans & Muhasebe
  - 🏨 Otel & Konaklama
  - 🛒 E-Ticaret & Retail
  - 👥 İnsan Kaynakları
  - 🚗 Otomotiv
  - 📊 Satış & Pazarlama
  - 🌾 Tarım
  - 🎓 Eğitim & Akademik
  - 🚛 Lojistik & Tedarik
  - 🏥 Hizmet Sektörü
  - 🏗️ İnşaat & Enerji
  - 🛡️ Sigorta & Finans

- **Standart Dashboard Formatı:**
  - 6 KPI kartı
  - 3-4 interaktif grafik
  - A4 yatay print-ready format
  - PDF/Excel export
  - Executive insights

### 2. Dashboard Factory Pattern
Tüm dashboard'lar `DashboardFactory` pattern'i kullanır:
- Tek kaynak (`dashboardConfigs.ts`)
- %100 standart format
- Otomatik KPI ve chart generation
- Responsive design
- Mockup data ile beslenir

### 3. CSV Veri Kütüphanesi
- 10+ organize edilmiş dataset
- Sektöre özel veriler
- Metadata ile zenginleştirilmiş
- 8-15 kolon zenginliği

### 4. AI Conversation Engine
- OpenAI GPT-4 entegrasyonu
- Fino (AI Assistant) karakteri
- Contextual recommendations
- Multi-step survey system

---

## 🔗 Ana Route'lar

### Public Routes
- `/` - Ana sayfa
- `/professional-dashboards` - Dashboard kütüphanesi (canonical URL)
- `/pricing` - Fiyatlandırma
- `/blog` - Blog sayfası
- `/contact` - İletişim

### Protected Routes (Login Required)
- `/dashboard` - Kullanıcı dashboard'u
- `/dashboard/create` - Dashboard oluşturma wizard
- `/dashboard/my` - Kullanıcı dashboard'ları
- `/data-library` - Veri kütüphanesi

### Admin Routes (Admin Only)
- `/admin/panel` - Ana admin paneli
- `/admin/platform-analytics` - Platform analitikleri
- `/admin/csv-library` - CSV kütüphane yönetimi
- `/admin/user-management` - Kullanıcı yönetimi
- `/admin/beta-applications` - Beta başvuruları

---

## 📋 Önemli Dosyalar

### Dashboard Sistemi
- `src/config/dashboardCategoriesConfig.ts` - Tek merkezi dashboard kategori config
- `src/config/dashboardConfigs.ts` - 680+ satır dashboard içerik tanımları
- `src/components/dashboards/DashboardFactory.tsx` - Dashboard factory component

### Route Yönetimi
- `src/App.tsx` - Ana route tanımları
- Duplicate route'lar redirect ile yönlendirilir

### Veri
- `data/csv-library/` - CSV veri setleri
- `data/csv-library/index.json` - Dataset metadata

---

## 🧪 Test & Build

```bash
# Lint kontrolü
npm run lint

# Type checking
tsc --noEmit

# Production build
npm run build

# Build boyutu: ~1.5MB (gzipped)
# Build süresi: ~60-90 saniye
```

---

## 📊 Dashboard Standartları

Tüm dashboard'lar aşağıdaki standartlara uyar:

### Boyutlar
- **Width:** 98% (max 1800px)
- **Format:** A4 yatay (297mm x 210mm)
- **Overflow:** Hidden (scroll yok)

### Layout
- **Header:** Dashboard başlığı + filtreler
- **KPI Grid:** 6 KPI kartı (grid-cols-6)
- **Charts Grid:** 3-4 chart (grid-cols-3)
- **Colors:** Mavi-Mor gradient (0000FF → 8000FF)

### Export
- PDF export (A4 landscape)
- Excel export
- Share link generation

Detaylı standartlar için: `docs/project/DASHBOARD_STANDARDS.md`

---

## 🤝 Katkıda Bulunma

Bu proje aktif geliştirme aşamasındadır. Katkılarınızı bekliyoruz!

---

## 📝 Lisans

Bu proje FinOps AI Studio tarafından geliştirilmektedir.

---

## 📞 İletişim

- **Website:** https://finops.ist
- **Email:** info@finops.ist

---

**Son Güncelleme:** 17 Ocak 2026  
**Versiyon:** 1.0.0  
**Durum:** ✅ Production Ready
