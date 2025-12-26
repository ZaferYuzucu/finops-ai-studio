export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Hesap Oluştur</h1>
            <p className="mt-2 text-sm text-gray-600">Finops AI'a katılın ve verilerinizi yönetmeye başlayın.</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Adresi</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Şifre</label>
            <input type="password" id="password" name="password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
           <div>
            <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Şifreyi Onayla</label>
            <input type="password" id="confirm-password" name="confirm-password" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Hesap Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
