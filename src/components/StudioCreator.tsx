
import React from 'react';

const StudioCreator = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
      
      <h3 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Finops AI Video Studio</h3>
      
      {/* Kontrol Paneli */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Metin Girişi ve Üretim */}
        <div className="space-y-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300">Video Senaryosu (Prompt)</label>
          <textarea
            id="prompt"
            rows={4}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            placeholder="Örn: Okyanusta yüzen bir astronot, 4K sinematik"
          ></textarea>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Video Üret
          </button>
        </div>

        {/* Dosya Yükleme */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Harici Dosyalar</label>
          <div className="flex space-x-4">
            <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Video Yükle</button>
            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Ses Yükle</button>
          </div>
          <p className="text-xs text-gray-500">Mevcut videoya eklemek veya düzenlemek için dosyaları yükleyin.</p>
        </div>

      </div>

      {/* Önizleme ve Şablonlar */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">Önizleme</label>
        <div className="w-full bg-black aspect-video rounded-lg border border-gray-700 flex items-center justify-center">
          <p className="text-gray-500">Video önizlemesi burada görünecek</p>
        </div>
      </div>

      {/* Editör ve Şablonlar */}
      <div className="mt-8">
         <h4 className="text-lg font-semibold text-white mb-4">Araçlar ve Şablonlar</h4>
         <div className="flex flex-wrap gap-4">
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Kes</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Uzat</button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Sesi Eşitle</button>
         </div>
         <div className="mt-4 flex flex-wrap gap-4">
              <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">YouTube Uzun Video</button>
              <button className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg">YouTube Shorts</button>
              <button className="bg-pink-700 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg">Instagram Uzun Video</button>
              <button className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded-lg">Instagram Reels</button>
         </div>
      </div>
    </div>
  );
};

export default StudioCreator;
