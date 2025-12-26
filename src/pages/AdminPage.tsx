
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

// Abone verisinin tipini tanımlayalım
interface Subscriber {
  id: string;
  email: string;
  subscribedAt: any;
}

const AdminPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sendFeedback, setSendFeedback] = useState('');

  // Aboneleri Firestore'dan çekme
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'aboneler'));
        const subsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          email: doc.data().email,
          subscribedAt: doc.data().subscribedAt?.toDate().toLocaleDateString(),
        }));
        setSubscribers(subsList);
      } catch (error) {
        console.error("Aboneler çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleSendNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendFeedback('Bülten gönderme özelliği şu anda geliştirme aşamasındadır.');
    // TODO: Burada bülteni Firestore'a kaydedecek ve bulut fonksiyonunu tetikleyecek kod olacak.
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Yönetici Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Bülten Gönderme Formu */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Bülten Gönder</h2>
          <form onSubmit={handleSendNewsletter} className="space-y-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Konu</label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-gray-700">İçerik</label>
              <textarea
                id="body"
                rows={10}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Bülteni Gönder (Test)
              </button>
            </div>
            {sendFeedback && <p className="text-sm text-gray-600 mt-2">{sendFeedback}</p>}
          </form>
        </div>

        {/* Abone Listesi */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Abone Listesi ({subscribers.length})</h2>
          {loading ? (
            <p>Aboneler yükleniyor...</p>
          ) : (
            <ul className="divide-y divide-gray-200 h-96 overflow-y-auto">
              {subscribers.map(sub => (
                <li key={sub.id} className="py-3">
                  <p className="text-sm font-medium text-gray-900">{sub.email}</p>
                  <p className="text-sm text-gray-500">Kayıt: {sub.subscribedAt}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      
      </div>
    </div>
  );
};

export default AdminPage;
