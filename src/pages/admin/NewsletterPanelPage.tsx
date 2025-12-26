
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Mail, Users, Send } from 'lucide-react';

// Abone verisinin tipini tanımlayalım
interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

const NewsletterPanelPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // E-posta gönderim formu state'leri
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState('');

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'aboneler'));
        const subscribersList: Subscriber[] = querySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data();
            return {
                id: doc.id,
                email: data.email,
                // Firestore timestamp'ini okunabilir bir formata çevirelim
                subscribedAt: data.subscribedAt?.toDate().toLocaleDateString('tr-TR') || 'Tarih yok',
            };
        });
        setSubscribers(subscribersList);
        setError(null);
      } catch (err) {
        console.error("Aboneler çekilirken hata:", err);
        setError('Aboneler yüklenirken bir sorun oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendFeedback('Gönderim işlemi başlatılıyor...');

    // --- GERÇEK GÖNDERİM İÇİN FIREBASE FUNCTION TETİKLEMESİ ---
    // Bu kısım normalde bir Firebase Function'ı çağırır.
    // Örnek: const sendMail = httpsCallable(functions, 'sendNewsletter');
    // await sendMail({ subject, body, recipients: subscribers.map(s => s.email) });
    console.log('Bülten Gönderimi Tetiklendi:');
    console.log('Konu:', subject);
    console.log('Mesaj:', body);
    console.log('Alıcılar:', subscribers.map(s => s.email));

    // Demo amaçlı gecikme ekleyelim
    setTimeout(() => {
      setSending(false);
      setSendFeedback(`Bülten "${subject}" konusuyla ${subscribers.length} alıcıya başarıyla gönderildi (Simülasyon).`);
      setSubject('');
      setBody('');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Mail className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Bülten Yönetim Paneli</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Abone Listesi Bölümü */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-700">Aboneler ({subscribers.length})</h2>
          </div>
          {loading && <p>Aboneler yükleniyor...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="overflow-auto max-h-96">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="py-3 px-6">E-posta Adresi</th>
                    <th scope="col" className="py-3 px-6">Kayıt Tarihi</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">{subscriber.email}</td>
                      <td className="py-4 px-6">{subscriber.subscribedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* E-posta Gönderim Formu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Send className="h-6 w-6 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-700">Yeni Bülten Gönder</h2>
          </div>
          <form onSubmit={handleSendNewsletter}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
              <input 
                type="text" 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">Mesaj</label>
              <textarea 
                id="body" 
                rows={10} 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                className="w-full px-3 py-2 rounded-md bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={sending || subscribers.length === 0}
              className="w-full flex justify-center items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Gönderiliyor...' : `Bülteni ${subscribers.length} Kişiye Gönder`}
            </button>
            {sendFeedback && <p className="mt-4 text-sm text-gray-600">{sendFeedback}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPanelPage;
