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
  Eye
} from 'lucide-react';
import { BetaApplication, ApplicationStatus, SECTOR_OPTIONS, EMPLOYEE_COUNT_OPTIONS } from '../../types/betaApplication';
import { 
  getAllApplications, 
  approveApplication, 
  rejectApplication,
  createAdminOffer,
  markApprovalEmailSent
} from '../../services/betaApplicationService';
import { useAuth } from '../../context/AuthContext';

const BetaApplicationsPage: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<BetaApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<BetaApplication | null>(null);

  // Başvuruları yükle
  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplications();
      setApplications(data);
      
      // Henüz başvuru yoksa bilgilendirme
      if (data.length === 0) {
        console.log('ℹ️ Henüz Beta Partner başvurusu yok. "Firma Öner" ile ilk teklifi oluşturabilirsiniz.');
      }
    } catch (error: any) {
      console.error('Başvurular yüklenirken hata:', error);
      
      // Firebase hatası detayı
      if (error.code === 'permission-denied') {
        console.warn('⚠️ Firebase izin hatası. Firestore rules kontrol edilmeli.');
      }
      
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
    if (!user) return;
    
    const confirmed = window.confirm(
      `${app.companyName} firmasının başvurusunu onaylıyor musunuz?\n\n` +
      `Onay e-postası gönderilecek: ${app.email}`
    );
    
    if (!confirmed) return;

    try {
      await approveApplication(app.id, user.uid);
      await sendApprovalEmail(app);
      await markApprovalEmailSent(app.id);
      alert('✅ Başvuru onaylandı ve e-posta gönderildi!');
      loadApplications();
    } catch (error) {
      console.error('Onay hatası:', error);
      alert('❌ Onay sırasında hata oluştu!');
    }
  };

  // Red
  const handleReject = async (app: BetaApplication) => {
    if (!user) return;
    
    const reason = window.prompt('Red nedeni (opsiyonel):');
    if (reason === null) return; // Cancel basıldı
    
    try {
      await rejectApplication(app.id, user.uid, reason);
      alert('✅ Başvuru reddedildi.');
      loadApplications();
    } catch (error) {
      console.error('Red hatası:', error);
      alert('❌ Red sırasında hata oluştu!');
    }
  };

  // Onay E-postası Gönder
  const sendApprovalEmail = async (app: BetaApplication) => {
    const subject = '✅ FINOPS AI Studio - Lansman Partneri Başvurunuz Onaylandı!';
    const body = `Merhaba ${app.contactName},\n\n` +
      `Harika haber! ${app.companyName} için Lansman Partneri programına kabul edildiniz! 🎉\n\n` +
      `📦 Planınız: Lansman Partneri (Beta)\n` +
      `💰 Fiyat: 0 TL - 1 Yıl Boyunca\n` +
      `👥 Kullanıcı: SINIRSIZ\n` +
      `⏱️ Başlangıç: Kayıt olduğunuz an\n\n` +
      `🚀 HEMEN BAŞLAYIN:\n\n` +
      `1. Kayıt Olun: https://finops-ai-studio.vercel.app/signup\n` +
      `2. E-postanız: ${app.email}\n` +
      `3. Güçlü bir şifre oluşturun\n\n` +
      `📞 Sonraki Adımlar:\n` +
      `- Kayıt sonrası biz sizinle iletişime geçeceğiz\n` +
      `- Beta Partner statünüzü aktif hale getireceğiz\n` +
      `- İlk dashboard'ınızı birlikte kuracağız\n\n` +
      `Sorularınız için: info@finops.ist\n\n` +
      `Hoş geldiniz! 🚀\n` +
      `FINOPS AI Studio Ekibi`;

    const emailSubject = encodeURIComponent(subject);
    const emailBody = encodeURIComponent(body);
    
    window.location.href = `mailto:${app.email}?subject=${emailSubject}&body=${emailBody}`;
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
  const getSourceBadge = (source: 'user' | 'admin') => {
    return source === 'user' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
        <Users className="w-3 h-3" />
        Başvuru
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
        <Send className="w-3 h-3" />
        Teklif
      </span>
    );
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
        {showAddModal && <AddOfferModal user={user} onClose={() => setShowAddModal(false)} onSuccess={loadApplications} />}
      </div>
    </div>
  );
};

// Modal: Firma Önerme (Outbound)
interface AddOfferModalProps {
  user: any;
  onClose: () => void;
  onSuccess: () => void;
}

const AddOfferModal: React.FC<AddOfferModalProps> = ({ user, onClose, onSuccess }) => {
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
    
    if (!user) {
      alert('Kullanıcı oturumu bulunamadı!');
      return;
    }

    try {
      setLoading(true);
      await createAdminOffer(formData, user.uid);
      alert('✅ Teklif başarıyla oluşturuldu!');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Teklif oluşturma hatası:', error);
      alert('❌ Teklif oluşturulamadı!');
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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

export default BetaApplicationsPage;

