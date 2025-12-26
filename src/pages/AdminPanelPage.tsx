// src/pages/AdminPanelPage.tsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

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
