/**
 * Admin Panel - E-posta Gönderim Kayıtları (Outbox)
 * Sistemden gönderilen tüm e-postaların takibi
 */

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Filter,
  Eye,
  AlertCircle,
  Send,
  Calendar,
  User
} from 'lucide-react';
import {
  EmailRecord,
  EmailStatus,
  EmailType,
  EMAIL_TYPE_LABELS,
  EMAIL_STATUS_LABELS,
  EMAIL_STATUS_COLORS,
} from '../../types/emailRecord';
import {
  getAllEmails,
  getEmailsByStatus,
  getEmailStats,
} from '../../services/emailOutboxService';
import { useAuth } from '../../context/AuthContext';

const EmailOutboxPage: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const [emails, setEmails] = useState<EmailRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<EmailStatus | 'all'>('all');
  const [filterType, setFilterType] = useState<EmailType | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<EmailRecord | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0,
  });

  const isAdminFlag = () => isAdmin;

  // E-postaları yükle
  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = async () => {
    try {
      setLoading(true);
      const [emailsData, statsData] = await Promise.all([
        getAllEmails(),
        getEmailStats(),
      ]);
      
      setEmails(emailsData);
      setStats(statsData);
      
      if (emailsData.length === 0) {
        console.log('ℹ️ Henüz e-posta gönderimi yapılmamış.');
      }
    } catch (error: any) {
      console.error('E-postalar yüklenirken hata:', error);
      
      if (error.code === 'permission-denied') {
        console.warn('⚠️ Firebase izin hatası. Firestore rules kontrol edilmeli.');
      }
      
      setEmails([]);
      setStats({ total: 0, sent: 0, failed: 0, pending: 0 });
    } finally {
      setLoading(false);
    }
  };

  // Filtreleme
  const filteredEmails = emails.filter(email => {
    const matchesStatus = filterStatus === 'all' || email.status === filterStatus;
    const matchesType = filterType === 'all' || email.type === filterType;
    const matchesSearch = 
      email.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.bodyPreview.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesType && matchesSearch;
  });

  // Durum badge
  const getStatusBadge = (status: EmailStatus) => {
    const colors = EMAIL_STATUS_COLORS[status];
    const label = EMAIL_STATUS_LABELS[status];
    const icons = {
      PENDING: Clock,
      SENT: CheckCircle,
      FAILED: XCircle,
    };
    const Icon = icons[status];
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>
        <Icon className="w-3 h-3" />
        {label}
      </span>
    );
  };

  // Tip badge
  const getTypeBadge = (type: EmailType) => {
    const colors: Record<EmailType, { bg: string; text: string }> = {
      offer: { bg: 'bg-purple-100', text: 'text-purple-700' },
      approval: { bg: 'bg-green-100', text: 'text-green-700' },
      rejection: { bg: 'bg-red-100', text: 'text-red-700' },
      newsletter: { bg: 'bg-blue-100', text: 'text-blue-700' },
      general: { bg: 'bg-gray-100', text: 'text-gray-700' },
    };
    
    const color = colors[type];
    const label = EMAIL_TYPE_LABELS[type];
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${color.bg} ${color.text}`}>
        <Mail className="w-3 h-3" />
        {label}
      </span>
    );
  };

  // Tarih formatı
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">E-posta kayıtları yükleniyor...</p>
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
            <Mail className="w-10 h-10 text-indigo-600" />
            E-posta Gönderim Kayıtları
          </h1>
          <p className="text-gray-600">
            Sistemden gönderilen tüm e-postaların detaylı takibi ve raporlaması.
          </p>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam E-posta</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Mail className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-800">Gönderildi</p>
                <p className="text-3xl font-bold text-green-900">{stats.sent}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800">Başarısız</p>
                <p className="text-3xl font-bold text-red-900">{stats.failed}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-400" />
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
        </div>

        {/* Filtreler ve Arama */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Arama */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Alıcı, konu veya içerik ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Durum Filtresi */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as EmailStatus | 'all')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[180px]"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="SENT">✅ Gönderildi</option>
                <option value="FAILED">❌ Başarısız</option>
                <option value="PENDING">⏳ Beklemede</option>
              </select>
            </div>

            {/* Tip Filtresi */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as EmailType | 'all')}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 appearance-none bg-white min-w-[180px]"
              >
                <option value="all">Tüm Tipler</option>
                <option value="offer">🎯 Teklif</option>
                <option value="approval">✅ Onay</option>
                <option value="rejection">❌ Red</option>
                <option value="newsletter">📰 Bülten</option>
                <option value="general">📧 Genel</option>
              </select>
            </div>
          </div>
        </div>

        {/* E-postalar Tablosu */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Alıcı</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Konu</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Tip</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Durum</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">Tarih</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredEmails.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                      <Mail className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                      <p className="text-xl font-bold text-gray-700 mb-2">
                        {emails.length === 0 ? 'Henüz E-posta Gönderimi Yok' : 'E-posta Bulunamadı'}
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        {emails.length === 0 
                          ? 'İlk e-posta gönderimi yapıldığında burada görünecek.' 
                          : 'Filtrelerinizi değiştirin veya arama yapın.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredEmails.map((email) => (
                    <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{email.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{email.subject}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {email.bodyPreview}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getTypeBadge(email.type)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(email.status)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-sm text-gray-700">{formatDate(email.createdAt)}</span>
                          {email.sentAt && email.status === 'SENT' && (
                            <span className="text-xs text-green-600 flex items-center gap-1">
                              <Send className="w-3 h-3" />
                              {formatDate(email.sentAt)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedEmail(email)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
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

        {/* Detay Modal */}
        {selectedEmail && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full p-8 my-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Mail className="w-7 h-7 text-indigo-600" />
                  E-posta Detayları
                </h2>
                {getStatusBadge(selectedEmail.status)}
              </div>
              
              <div className="space-y-4">
                {/* Tip */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tip</label>
                  {getTypeBadge(selectedEmail.type)}
                </div>

                {/* Alıcı */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Alıcı</label>
                  <p className="text-gray-900 font-medium">{selectedEmail.to}</p>
                </div>

                {/* Konu */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Konu</label>
                  <p className="text-gray-900 font-medium">{selectedEmail.subject}</p>
                </div>

                {/* İçerik */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">İçerik</label>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                      {selectedEmail.fullBody || selectedEmail.bodyPreview}
                    </pre>
                  </div>
                </div>

                {/* Tarihler */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Oluşturulma</label>
                    <p className="text-sm text-gray-700 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(selectedEmail.createdAt)}
                    </p>
                  </div>
                  {selectedEmail.sentAt && (
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Gönderilme</label>
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <Send className="w-4 h-4" />
                        {formatDate(selectedEmail.sentAt)}
                      </p>
                    </div>
                  )}
                </div>

                {/* Message ID */}
                {selectedEmail.messageId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Message ID (SMTP)</label>
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 p-2 rounded border border-gray-200">
                      {selectedEmail.messageId}
                    </p>
                  </div>
                )}

                {/* Hata Mesajı */}
                {selectedEmail.error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 mb-1">Hata Detayları</h4>
                        <p className="text-sm text-red-700">{selectedEmail.error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSelectedEmail(null)}
                className="w-full mt-6 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailOutboxPage;
