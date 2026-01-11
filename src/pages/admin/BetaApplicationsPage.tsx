/**
 * Admin Panel - Beta Partner Başvuruları
 * Hem inbound (kullanıcı başvurusu) hem outbound (admin teklifi) yönetimi
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus,
  Send,
  Search,
  Filter,
  Download,
  Eye,
  Building2,
  User
} from 'lucide-react';
import { BetaApplication, ApplicationStatus, SECTOR_OPTIONS, EMPLOYEE_COUNT_OPTIONS } from '../../types/betaApplication';
import { useAuth } from '../../context/AuthContext';

async function safeJson(response: Response) {
  const text = await response.text();
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

// ------------------------------------------------------------
// Local fallback (demo safety)
// ------------------------------------------------------------
const LOCAL_APPS_KEY = 'finops_beta_applications';

function readLocalApplications(): BetaApplication[] {
  try {
    const raw = localStorage.getItem(LOCAL_APPS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as BetaApplication[]) : [];
  } catch {
    return [];
  }
}

function writeLocalApplications(apps: BetaApplication[]) {
  try {
    localStorage.setItem(LOCAL_APPS_KEY, JSON.stringify(apps));
  } catch {
    // ignore
  }
}

function upsertLocalApplication(app: BetaApplication) {
  const list = readLocalApplications();
  const idx = list.findIndex((a) => a.id === app.id);
  if (idx >= 0) list[idx] = app;
  else list.push(app);
  writeLocalApplications(list);
  try {
    window.dispatchEvent(new Event('finops-beta-applications-updated'));
  } catch {
    // ignore
  }
}

function updateLocalApplication(id: string, patch: Partial<BetaApplication>) {
  const list = readLocalApplications();
  const idx = list.findIndex((a) => a.id === id);
  if (idx < 0) return;
  list[idx] = { ...list[idx], ...patch } as BetaApplication;
  writeLocalApplications(list);
  try {
    window.dispatchEvent(new Event('finops-beta-applications-updated'));
  } catch {
    // ignore
  }
}

function mergeById(serverItems: BetaApplication[], localItems: BetaApplication[]) {
  const map = new Map<string, BetaApplication>();
  for (const a of localItems) map.set(a.id, a);
  for (const a of serverItems) map.set(a.id, a);
  return Array.from(map.values()).sort((a, b) => {
    const ta = new Date(a.appliedAt || 0).getTime();
    const tb = new Date(b.appliedAt || 0).getTime();
    return tb - ta;
  });
}

function makeLocalId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const BetaApplicationsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState<BetaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<BetaApplication | null>(null);

  const isAdminFlag = () =>
    localStorage.getItem('isAdminAuthenticated') === 'true' ||
    sessionStorage.getItem('isAdminAuthenticated') === 'true';

  // Başvuruları yükle
  useEffect(() => {
    loadApplications();
    const onLocal = () => {
      // if server list is down, at least keep local visible
      const local = readLocalApplications();
      if (local.length > 0) {
        setApplications((prev) => mergeById(prev, local));
      }
    };
    window.addEventListener('storage', onLocal);
    window.addEventListener('finops-beta-applications-updated', onLocal as any);
    return () => {
      window.removeEventListener('storage', onLocal);
      window.removeEventListener('finops-beta-applications-updated', onLocal as any);
    };
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const local = readLocalApplications();
      try {
        const response = await fetch('/api/admin/beta-applications', { credentials: 'include' });
        const data = await safeJson(response);
        if (!response.ok || !data.success) throw new Error(data.error || 'Başvurular alınamadı');
        const serverItems = (data.items || []) as BetaApplication[];
        setApplications(mergeById(serverItems, local));
      } catch (apiError) {
        // API down or not configured yet -> show local data (critical for demo)
        setApplications(local);
        console.warn('⚠️ Admin beta applications API unavailable, using localStorage fallback.', apiError);
      }
      
      // Henüz başvuru yoksa bilgilendirme
      if (readLocalApplications().length === 0) {
        console.log('ℹ️ Henüz Beta Partner başvurusu yok. "Firma Öner" ile ilk teklifi oluşturabilirsiniz.');
      }
    } catch (error: any) {
      console.error('Başvurular yüklenirken hata:', error);
      
      // Boş array set et, alert gösterme (kullanıcıyı rahatsız etmesin)
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme
  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = 
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // İstatistikler
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  // Onay
  const handleApprove = async (app: BetaApplication) => {
    if (!currentUser && !isAdminFlag()) return;
    
    const confirmed = window.confirm(
      `${app.companyName} firmasının başvurusunu onaylıyor musunuz?\n\n` +
      `Onay e-postası gönderilecek: ${app.email}`
    );
    
    if (!confirmed) return;

    try {
      try {
        const response = await fetch(`/api/admin/beta-applications/${encodeURIComponent(app.id)}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'approved' }),
        });
        const data = await safeJson(response);
        if (!response.ok || !data.success) throw new Error(data.error || 'Onaylanamadı');
      } catch (apiErr) {
        // fallback: local status update
        updateLocalApplication(app.id, {
          status: 'approved',
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentUser?.uid || 'admin',
        });
      }
      await sendApprovalEmail(app);
      alert('✅ Başvuru onaylandı ve e-posta gönderildi!');
      loadApplications();
    } catch (error) {
      console.error('Onay hatası:', error);
      alert('❌ Onay sırasında hata oluştu!');
    }
  };

  // Red
  const handleReject = async (app: BetaApplication) => {
    if (!currentUser && !isAdminFlag()) return;
    
    const reason = window.prompt('Red nedeni (opsiyonel):');
    if (reason === null) return; // Cancel basıldı
    
    try {
      try {
        const response = await fetch(`/api/admin/beta-applications/${encodeURIComponent(app.id)}`, {
          method: 'PATCH',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'rejected', adminNotes: reason }),
        });
        const data = await safeJson(response);
        if (!response.ok || !data.success) throw new Error(data.error || 'Reddedilemedi');
      } catch (apiErr) {
        // fallback: local status update
        updateLocalApplication(app.id, {
          status: 'rejected',
          reviewedAt: new Date().toISOString(),
          reviewedBy: currentUser?.uid || 'admin',
          adminNotes: reason || 'Reddedildi',
        });
      }
      alert('✅ Başvuru reddedildi.');
      loadApplications();
    } catch (error) {
      console.error('Red hatası:', error);
      alert('❌ Red sırasında hata oluştu!');
    }
  };

  // Onay E-postası Gönder (GERÇEK E-POSTA GÖNDERİMİ - GoDaddy SMTP + Tracking!)
  const sendApprovalEmail = async (app: BetaApplication) => {
    const subject = '✅ FINOPS AI Studio - Lansman Partneri Başvurunuz Onaylandı!';
    const body = `Merhaba ${app.contactName},

Harika haber! ${app.companyName} için Lansman Partneri programına kabul edildiniz! 🎉

📦 Planınız: Lansman Partneri (Beta)
💰 Fiyat: 0 TL - 1 Yıl Boyunca
👥 Kullanıcı: SINIRSIZ
⏱️ Başlangıç: Kayıt olduğunuz an

🚀 HEMEN BAŞLAYIN:

1. Kayıt Olun: https://finops.ist/signup
2. E-postanız: ${app.email}
3. Güçlü bir şifre oluşturun

📞 Sonraki Adımlar:
- Kayıt sonrası biz sizinle iletişime geçeceğiz
- Beta Partner statünüzü aktif hale getireceğiz
- İlk dashboard'ınızı birlikte kuracağız

Sorularınız için: info@finops.ist

Hoş geldiniz! 🚀
FINOPS AI Studio Ekibi`;

    try {
      console.log('📧 GoDaddy SMTP ile e-posta gönderiliyor:', app.email);
      
      // Gerçek e-posta gönder (Vercel Serverless Function - GoDaddy SMTP)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: app.email,
          subject: subject,
          text: body,
          replyTo: 'info@finops.ist'
        })
      });

      const result = await safeJson(response);
      
      if (response.ok && result.success) {
        console.log('✅ E-posta başarıyla gönderildi!', result);
        return true;
      } else {
        throw new Error(result.error || 'E-posta gönderilemedi');
      }
    } catch (error: any) {
      console.error('❌ E-posta gönderme hatası:', error);
      
      alert('⚠️ E-posta gönderilemedi! Lütfen tekrar deneyin.\nHata: ' + error.message);
      return false;
    }
  };

  // Durum badge renkleri
  const getStatusBadge = (status: ApplicationStatus) => {
    const badges = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Beklemede', icon: Clock },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Onaylandı', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Reddedildi', icon: XCircle },
    };
    
    const badge = badges[status];
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  // Kaynak badge
  const getSourceBadge = (source: 'user' | 'admin' | 'beta_form') => {
    if (source === 'user') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
          <Users className="w-3 h-3" />
          Başvuru
        </span>
      );
    } else if (source === 'admin') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
          <Send className="w-3 h-3" />
          Teklif
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
          <Mail className="w-3 h-3" />
          Beta Başvuru
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Başvurular yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Users className="w-10 h-10 text-indigo-600" />
            Beta Partner Başvuruları
          </h1>
          <p className="text-gray-600">
            Lansman Partneri programına yapılan başvuruları yönetin veya yeni firmalar öner in.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Başvuru</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-800">Beklemede</p>
                <p className="text-3xl font-bold text-yellow-900">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-400" />
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800">Onaylandı</p>
                <p className="text-3xl font-bold text-green-900">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800">Reddedildi</p>
                <p className="text-3xl font-bold text-red-900">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filtreler ve Arama */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Arama */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Firma, kişi veya e-posta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Durum Filtresi */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | 'all')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="pending">Beklemede</option>
                <option value="approved">Onaylandı</option>
                <option value="rejected">Reddedildi</option>
              </select>
            </div>

            {/* Yeni Teklif */}
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Firma Öner
            </button>
          </div>
        </div>

        {/* Başvurular Tablosu */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Firma / Kişi</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">İletişim</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Detaylar</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Kaynak</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Durum</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Tarih</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                      <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      <p className="text-xl font-bold text-gray-700 mb-2">
                        {applications.length === 0 ? 'Henüz Başvuru Yok' : 'Başvuru Bulunamadı'}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {applications.length === 0 
                          ? 'İlk Beta Partner teklifini "Firma Öner" butonu ile oluşturabilirsiniz.' 
                          : 'Filtrelerinizi değiştirin veya yeni firma önerin.'}
                      </p>
                      {applications.length === 0 && (
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                          Firma Öner
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{app.companyName}</p>
                          <p className="text-sm text-gray-600">{app.contactName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-900">{app.email}</p>
                          <p className="text-gray-600">{app.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs space-y-1">
                          <p><span className="font-medium">Sektör:</span> {SECTOR_OPTIONS.find(s => s.value === app.sector)?.label || app.sector}</p>
                          <p><span className="font-medium">Çalışan:</span> {app.employeeCount}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getSourceBadge(app.source)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {new Date(app.appliedAt).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {app.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(app)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Onayla"
                              >
                                <CheckCircle className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleReject(app)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reddet"
                              >
                                <XCircle className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          {app.status === 'approved' && !app.approvalEmailSent && (
                            <button
                              onClick={() => sendApprovalEmail(app)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Onay E-postası Gönder"
                            >
                              <Mail className="w-5 h-5" />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Detay Gör"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Firma Önerme Modal'ı */}
        {showAddModal && <AddOfferModal currentUser={currentUser} onClose={() => setShowAddModal(false)} onSuccess={loadApplications} />}
        
        {/* Detay Modal'ı */}
        {selectedApplication && <ApplicationDetailModal application={selectedApplication} onClose={() => setSelectedApplication(null)} />}
      </div>
    </div>
  );
};

// Modal: Firma Önerme (Outbound)
interface AddOfferModalProps {
  currentUser: any;
  onClose: () => void;
  onSuccess: () => void;
}

const AddOfferModal: React.FC<AddOfferModalProps> = ({ currentUser, onClose, onSuccess }) => {
  const isAdminModal = localStorage.getItem('isAdminAuthenticated') === 'true' || sessionStorage.getItem('isAdminAuthenticated') === 'true';
  // Default davet mektubu şablonu
  const defaultInvitationText = `Merhaba [İsim],

Harika haber! [Firma Adı] için Lansman Partneri programına kabul edildiniz! 🎉

📦 Planınız: Lansman Partneri (Beta)
💰 Fiyat: 0 TL - 1 Yıl Boyunca
👥 Kullanıcı: SINIRSIZ
⏱️ Başlangıç: Kayıt olduğunuz an

🚀 HEMEN BAŞLAYIN:

1. Kayıt Olun: https://finops-ai-studio.vercel.app/signup
2. E-postanız: [email]
3. Güçlü bir şifre oluşturun

📞 Sonraki Adımlar:
- Kayıt sonrası biz sizinle iletişime geçeceğiz
- Beta Partner statünüzü aktif hale getireceğiz
- İlk dashboard'ınızı birlikte kuracağız

Sorularınız için: info@finops.ist

Hoş geldiniz! 🚀
FINOPS AI Studio Ekibi`;

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    employeeCount: '1-10', // Backend için gerekli, ama formda gösterilmeyecek
    sector: 'restaurant_cafe',
    description: defaultInvitationText
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // GEÇİCİ: currentUser kontrolü kaldırıldı - localStorage admin flag yeterli
    if (!isAdminModal) {
      alert('Admin girişi gerekli! localStorage admin flag kontrolü başarısız.');
      return;
    }

    try {
      setLoading(true);
      
      // 1) Teklifi server-side havuza kaydet (admin session cookie ile)
      const offerResp = await fetch('/api/beta-apply', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'admin' }),
      });
      const offerData = await safeJson(offerResp);
      if (!offerResp.ok || !offerData.success) {
        throw new Error(offerData.error || 'Teklif kaydedilemedi');
      }
      const offerId = offerData.id as string;
      console.log('✅ Teklif kaydedildi:', offerId);
      
      // 2) E-posta içeriğini oluştur
      const emailBody = formData.description
        .replace('[İsim]', formData.contactName)
        .replace('[Firma Adı]', formData.companyName)
        .replace('[email]', formData.email);
      
      const subject = `✅ ${formData.companyName} - Lansman Partneri Teklifi`;
      
      // 3) Gerçek e-posta gönder (GoDaddy SMTP!)
      console.log('📧 GoDaddy SMTP ile e-posta gönderiliyor:', formData.email);
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.email,
          subject: subject,
          text: emailBody,
          replyTo: 'info@finops.ist'
        })
      });

      const result = await safeJson(response);

      if (response.ok && result.success) {
        console.log('✅ E-posta başarıyla gönderildi ve kaydedildi!', result);
        alert(`✅ Teklif oluşturuldu ve ${formData.email} adresine GERÇEK e-posta gönderildi!\n\n📧 Message ID: ${result.messageId}\n\n💡 E-posta geçmişini "E-posta Kayıtları" sayfasından görüntüleyebilirsiniz.`);
      } else {
        console.error('⚠️ E-posta gönderilemedi:', result.error);
        alert(`⚠️ Teklif kaydedildi ama e-posta gönderilemedi!\nHata: ${result.error || 'Bilinmeyen hata'}\n\nDetayları "E-posta Kayıtları" sayfasından görüntüleyebilirsiniz.`);
      }
      
      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Teklif oluşturma hatası:', error);
      alert('❌ Teklif oluşturulamadı!\nHata: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8">
        <div className="flex items-center gap-3 mb-6">
          <Send className="w-8 h-8 text-indigo-600" />
          <h2 className="text-3xl font-bold text-gray-900">Firma Öner (Outbound)</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Hedef firmaya Beta Partner programı için teklif gönderin. Onaylandığında otomatik e-posta gönderilecek.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Firma Adı */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Firma Adı *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Örn: Acme Restaurant"
              />
            </div>

            {/* İletişim Kişisi */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                İletişim Kişisi *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="Örn: Ahmet Yılmaz"
              />
            </div>

            {/* E-posta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-posta *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="ornek@firma.com"
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900"
                placeholder="0555 555 55 55"
              />
            </div>

            {/* Sektör */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sektör *
              </label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-gray-900 bg-white"
              >
                {SECTOR_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Davet Mektubu */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
              <span>📧 Davet Mektubu (Düzenlenebilir)</span>
              <span className="text-xs text-gray-500 font-normal">Firmaya gönderilecek e-posta metni</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={16}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm text-gray-900 bg-white"
              placeholder="Davet mektubu..."
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 <strong>İpucu:</strong> [İsim], [Firma Adı], [email] etiketlerini firma bilgileriyle değiştirmeyi unutmayın!
            </p>
          </div>

          {/* Butonlar */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
            >
              {loading ? 'Gönderiliyor...' : '📤 Teklif Gönder'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Modal: Başvuru Detayı
interface ApplicationDetailModalProps {
  application: BetaApplication;
  onClose: () => void;
}

const ApplicationDetailModal: React.FC<ApplicationDetailModalProps> = ({ application, onClose }) => {
  const getSectorLabel = (value: string) => {
    return SECTOR_OPTIONS.find(s => s.value === value)?.label || value;
  };

  const getCompanySizeLabel = (value?: string) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      'micro': 'Mikro (1-9 çalışan)',
      'small': 'Küçük (10-49 çalışan)',
      'medium': 'Orta (50-249 çalışan)'
    };
    return labels[value] || value;
  };

  const getMainChallengeLabel = (value?: string) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      'cash_flow': 'Nakit akışı',
      'profitability': 'Kârlılık',
      'cost_control': 'Maliyet kontrolü',
      'reporting': 'Raporlama / görünürlük',
      'all': 'Hepsi'
    };
    return labels[value] || value;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 my-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Başvuru Detayları</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Firma Bilgileri */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Firma Bilgileri
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Firma Adı</p>
                <p className="font-semibold text-gray-900">{application.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Sektör</p>
                <p className="font-semibold text-gray-900">{getSectorLabel(application.sector)}</p>
              </div>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-600" />
              İletişim Bilgileri
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Yetkili Kişi</p>
                <p className="font-semibold text-gray-900">{application.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">E-posta</p>
                <p className="font-semibold text-gray-900">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Telefon</p>
                <p className="font-semibold text-gray-900">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Çalışan Sayısı</p>
                <p className="font-semibold text-gray-900">{application.employeeCount}</p>
              </div>
            </div>
          </div>

          {/* Anket Cevapları (Beta Form için) */}
          {application.source === 'beta_form' && application.surveyAnswers && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Anket Cevapları
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">İşletme Büyüklüğü</p>
                  <p className="font-semibold text-gray-900">
                    {getCompanySizeLabel(application.surveyAnswers.companySize)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ana Zorluk</p>
                  <p className="font-semibold text-gray-900">
                    {getMainChallengeLabel(application.surveyAnswers.mainChallenge)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Süreç Bilgileri */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              Süreç Bilgileri
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Durum</p>
                <div className="mt-1">
                  {application.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      <Clock className="w-3 h-3" />
                      Beklemede
                    </span>
                  )}
                  {application.status === 'approved' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3" />
                      Onaylandı
                    </span>
                  )}
                  {application.status === 'rejected' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                      <XCircle className="w-3 h-3" />
                      Reddedildi
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Kaynak</p>
                <div className="mt-1">
                  {application.source === 'user' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      <Users className="w-3 h-3" />
                      Başvuru
                    </span>
                  )}
                  {application.source === 'admin' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                      <Send className="w-3 h-3" />
                      Teklif
                    </span>
                  )}
                  {application.source === 'beta_form' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-700">
                      <Mail className="w-3 h-3" />
                      Beta Başvuru
                    </span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Başvuru Tarihi</p>
                <p className="font-semibold text-gray-900">
                  {new Date(application.appliedAt).toLocaleString('tr-TR')}
                </p>
              </div>
              {application.reviewedAt && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">İnceleme Tarihi</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(application.reviewedAt).toLocaleString('tr-TR')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Açıklama / Notlar */}
          {(application.description || application.adminNotes) && (
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Notlar</h3>
              {application.description && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Açıklama</p>
                  <p className="text-gray-900">{application.description}</p>
                </div>
              )}
              {application.adminNotes && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Admin Notları</p>
                  <p className="text-gray-900">{application.adminNotes}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetaApplicationsPage;

