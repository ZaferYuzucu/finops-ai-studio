
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login'); // Çıkış yaptıktan sonra giriş sayfasına yönlendir
    } catch (error) {
      console.error("Çıkış sırasında hata oluştu:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Kontrol Paneline Hoş Geldiniz!</h1>
        <p className="text-gray-600 mb-6">
          Başarıyla giriş yaptınız.
        </p>
        {currentUser && (
          <div className="mb-6">
            <p className="text-lg"><strong>Email:</strong> {currentUser.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
