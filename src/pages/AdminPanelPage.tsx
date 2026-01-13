// src/pages/AdminPanelPage.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { autoSubscribeNewsletter } from '../utils/newsletter';

// localStorage keys used by the app (demo/local auth + admin panels)
const AUTH_USERS_KEY = 'finops_users';
const USERS_MGMT_KEY = 'finops_users_management';
const BETA_APPS_KEY = 'finops_beta_applications';

interface Subscriber {
  id: string;
  email: string;
}

const AdminPanelPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sendStatus, setSendStatus] = useState('');
  const [seedStatus, setSeedStatus] = useState('');

  async function safeJson(response: Response) {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  }

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'aboneler'));
        const subscribersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email,
        }));
        setSubscribers(subscribersList);
      } catch (error) {
        console.error("Aboneler çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const seedElbaBetaPartner = async () => {
    const seed = {
      companyName: 'Elba Otomotiv',
      contactName: 'Serdar Cingir',
      email: 'serdar@elbaotomotiv.com',
      phone: '+90 541 338 88 35',
      password: 'DefneSeher',
      sector: 'automotive',
      employeeCount: '1-10',
      mainChallenge: 'all',
    };

    const ok = window.confirm(
      `Manuel Beta Partner kullanıcı oluşturulsun mu?\n\n` +
        `Firma: ${seed.companyName}\n` +
        `Kişi: ${seed.contactName}\n` +
        `E-posta: ${seed.email}\n\n` +
        `Bu işlem local login + beta başvuru + bülten aboneliği kaydı oluşturur.`,
    );
    if (!ok) return;

    try {
      // 1) Local auth user (login page uses this store)
      const usersRaw = localStorage.getItem(AUTH_USERS_KEY) || '{}';
      const users = JSON.parse(usersRaw) as Record<string, { email: string; password: string; role: string }>;
      users[seed.email] = { email: seed.email, password: seed.password, role: 'user' };
      localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users));

      // 2) User management entry (admin panel list)
      const mgmtRaw = localStorage.getItem(USERS_MGMT_KEY) || '[]';
      const mgmt = JSON.parse(mgmtRaw) as any[];
      const existsMgmt = mgmt.some((u) => String(u.email || '').toLowerCase() === seed.email.toLowerCase());
      if (!existsMgmt) {
        mgmt.unshift({
          // Deterministic id: prevents "same email, different uid" issues
          id: `user_${String(seed.email || '').toLowerCase()}`,
          email: seed.email,
          displayName: seed.contactName,
          createdAt: new Date().toISOString(),
          role: 'user',
          plan: 'beta_partner',
          isActive: true,
          companyName: seed.companyName,
          lastLogin: undefined,
        });
        localStorage.setItem(USERS_MGMT_KEY, JSON.stringify(mgmt));
      }

      // 3) Beta applications pool (local fallback used by admin/beta-applications page if API is down)
      const appsRaw = localStorage.getItem(BETA_APPS_KEY) || '[]';
      const apps = JSON.parse(appsRaw) as any[];
      const existsApp = apps.some(
        (a) =>
          String(a.email || '').toLowerCase() === seed.email.toLowerCase() &&
          String(a.companyName || '') === seed.companyName,
      );
      if (!existsApp) {
        apps.unshift({
          id: `admin_seed_${Date.now()}`,
          companyName: seed.companyName,
          contactName: seed.contactName,
          email: seed.email,
          phone: seed.phone,
          employeeCount: seed.employeeCount,
          sector: seed.sector,
          description: 'Manuel oluşturuldu. Dashboard beklentisi: Hepsi.',
          status: 'approved',
          source: 'admin',
          appliedAt: new Date().toISOString(),
          reviewedAt: new Date().toISOString(),
          reviewedBy: 'admin',
          surveyAnswers: {
            companySize: 'micro',
            mainChallenge: seed.mainChallenge,
          },
          approvalEmailSent: false,
          adminNotes: 'Admin manuel Beta Partner kullanıcı oluşturdu',
        });
        localStorage.setItem(BETA_APPS_KEY, JSON.stringify(apps));
        try {
          window.dispatchEvent(new Event('finops-beta-applications-updated'));
        } catch {
          // ignore
        }
      }

      // 3.5) Persist into Firestore beta_applications via admin API (so it appears for all admins)
      let fireId: string | undefined;
      let fireAction: string | undefined;
      try {
        const resp = await fetch('/api/admin/beta-applications', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: seed.companyName,
            contactName: seed.contactName,
            email: seed.email,
            phone: seed.phone,
            sector: seed.sector,
            employeeCount: seed.employeeCount,
            description: 'Manuel oluşturuldu. Dashboard beklentisi: Hepsi.',
            source: 'admin',
          }),
        });
        const data = await safeJson(resp);
        if (!resp.ok || !data.success) throw new Error(data.error || 'beta_applications upsert failed');
        fireId = data.id;
        fireAction = data.action;
      } catch (e: any) {
        // Keep local seed working even if server env is missing; still show the reason for visibility issues.
        console.warn('⚠️ Firestore admin upsert failed:', e);
      }

      // 4) Newsletter subscriber (Firestore) - best effort
      await autoSubscribeNewsletter(seed.email, 'admin');

      setSeedStatus(
        `✅ Oluşturuldu: ${seed.email}\n` +
          `- Login hesabı eklendi (şifre: ${seed.password})\n` +
          `- Kullanıcı yönetimine eklendi (beta_partner)\n` +
          `- Beta başvuru havuzuna eklendi (approved)\n` +
          `${fireId ? `- Firestore beta_applications ${fireAction || 'upsert'} ✅ (id: ${fireId})\n` : `- Firestore beta_applications ❌ (ENV/admin session yoksa diğer cihazlarda görünmez)\n`}` +
          `- Bülten aboneliğine eklendi (best-effort)`,
      );
    } catch (e: any) {
      console.error('Seed error:', e);
      setSeedStatus(`❌ Hata: ${e?.message || String(e)}`);
    }
  };

  const cleanupBetaApplications = async () => {
    const keepEmails = ['serdar@elbaotomotiv.com', 'zaferyuzucu@gmail.com'];
    const ok = window.confirm(
      `⚠️ Beta Başvuruları TEMİZLENECEK!\n\n` +
        `Bu işlem şunları yapar:\n` +
        `- Sadece şu e-postalar kalsın: ${keepEmails.join(', ')}\n` +
        `- Aynı e-postadan birden fazla kayıt varsa (duplicate) en yenisi kalır\n` +
        `- Test1 kullanıcısına çanta notu eklenir: Test1Seed.co.csv\n\n` +
        `Devam edilsin mi?`,
    );
    if (!ok) return;

    try {
      // IMPORTANT: Clear local demo cache to avoid UI showing old duplicates merged from localStorage
      try {
        localStorage.setItem(BETA_APPS_KEY, '[]');
      } catch {
        // ignore
      }

      const resp = await fetch('/api/admin/beta-applications-cleanup', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keepEmails,
          test1: {
            email: 'zaferyuzucu@gmail.com',
            contactName: 'Test1',
            bag: 'Test1Seed.co.csv',
          },
        }),
      });
      const data = await safeJson(resp);
      if (!resp.ok || !data.success) throw new Error(data.error || 'Cleanup failed');

      setSeedStatus(
        `🧹 Temizlik tamamlandı.\n` +
          `- Silinen kayıt: ${data.deletedCount}\n` +
          `- Güncellenen kayıt: ${data.updatedCount}\n` +
          `- Kalan kayıt ID'leri: ${(data.keptIds || []).join(', ')}`,
      );
    } catch (e: any) {
      console.error('Cleanup error:', e);
      setSeedStatus(`❌ Temizlik başarısız: ${e?.message || String(e)}`);
    }
  };

  const handleSendNewsletter = () => {
    if (!subject || !content) {
      setSendStatus('Lütfen konu ve içerik alanlarını doldurun.');
      return;
    }
    
    console.log("--- BÜLTEN GÖNDERİMİ BAŞLATILDI ---");
    console.log("Konu:", subject);
    console.log("İçerik:", content);
    console.log("Alıcılar:", subscribers.map(s => s.email));
    console.log("------------------------------------");

    // ÖNEMLİ NOT: E-posta gönderimi, güvenlik ve güvenilirlik için sunucu taraflı bir işlem gerektirir.
    // Bu arayüz, Firebase Cloud Functions gibi bir backend servisini tetiklemek üzere tasarlanmıştır.
    // Gerçek gönderim için bir sonraki adımda bu backend fonksiyonu oluşturulmalıdır.
    
    setSendStatus(`Bülten, ${subscribers.length} alıcıya gönderilmek üzere simüle edildi. Detaylar için konsolu kontrol edin.`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Bülten Gönderim Paneli</h1>
        <p className="mt-4 text-lg text-gray-600">Toplanan abonelere e-posta bülteni gönderin.</p>
      </div>

      {/* Manual Seed Tools */}
      <div className="mt-10 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Manuel Araçlar</h2>
        <p className="text-sm text-gray-600 mb-4">
          Form doldurmadan demo/manuel kullanıcı ve Beta Partner kayıtları oluşturmak için.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={seedElbaBetaPartner}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Elba Otomotiv • Serdar Cingir (Beta Partner) oluştur
          </button>
          <button
            onClick={cleanupBetaApplications}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            🧹 Beta Başvurularını Temizle (duplicate sil)
          </button>
        </div>
        {seedStatus && (
          <pre className="mt-4 whitespace-pre-wrap text-sm bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800">
            {seedStatus}
          </pre>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Abone Listesi */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Aboneler ({subscribers.length})</h2>
          {loading ? (
            <p className="mt-4">Aboneler yükleniyor...</p>
          ) : (
            <ul className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {subscribers.map(sub => (
                <li key={sub.id} className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
                  {sub.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Bülten Formu */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Bülten Oluştur</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Konu</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">İçerik (Markdown destekler)</label>
              <textarea
                id="content"
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <button
                onClick={handleSendNewsletter}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Bülteni Gönder (Simülasyon)
              </button>
            </div>
            {sendStatus && <p className="mt-2 text-sm text-gray-600">{sendStatus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
