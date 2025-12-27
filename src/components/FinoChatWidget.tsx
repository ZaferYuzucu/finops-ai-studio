import React, { useState } from 'react';
import { X, MessageCircle, Minimize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FinoChatWidget: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages] = useState([
    { role: 'ai', text: t('finoChatWidget.greeting') },
    { role: 'ai', text: t('finoChatWidget.message') }
  ]);

  return (
    <>
      {/* Chat Window - Açıldığında görünür */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border-2 border-orange-300 z-50 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-t-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🐕</span>
                <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-2">
                  {t('finoChatWidget.title')}
                  <span className="text-xs bg-white/30 backdrop-blur-sm text-white px-2 py-0.5 rounded-full font-semibold">AI</span>
                </h4>
                <p className="text-xs text-white/90 font-medium">{t('finoChatWidget.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Minimize"
              >
                <Minimize2 className="text-white" size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                title="Kapat"
              >
                <X className="text-white" size={18} />
              </button>
            </div>
          </div>

          {/* ÇOK YAKINDA Badge - Pencerenin içinde */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 -translate-y-12 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse z-10">
            ✨ {t('finoChatWidget.comingSoon')}
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-gray-200 max-w-[85%]">
                    <p className="text-sm text-gray-800">{msg.text}</p>
                  </div>
                </div>
              ))}
              {/* Typing indicator */}
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md border border-gray-200 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  </div>
                  <span className="text-xs text-gray-500">{t('finoChatWidget.typing')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Input Area - Disabled */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-200 opacity-60">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={t('finoChatWidget.placeholder')}
                  disabled
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-500 placeholder-gray-400 cursor-not-allowed"
                />
                <button
                  disabled
                  className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm font-semibold cursor-not-allowed"
                >
                  {t('finoChatWidget.sendButton')}
                </button>
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              🚀 {t('finoChatWidget.infoText')}
            </p>
          </div>
        </div>
      )}

      {/* Floating Button - Her zaman görünür */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-50 flex flex-col items-center justify-center gap-0.5 group"
        title={t('finoChatWidget.buttonTitle')}
      >
        {isOpen ? (
          <X className="text-white" size={32} />
        ) : (
          <>
            <span className="text-3xl group-hover:scale-110 transition-transform">🐕</span>
            <span className="text-white text-xs font-bold tracking-wide">Fino</span>
            {/* Notification badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl bg-orange-400 animate-ping opacity-20"></div>
          </>
        )}
      </button>

      {/* "Çok Yakında" floating badge - Buton yanında */}
      {!isOpen && (
        <div className="fixed bottom-28 right-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-bounce z-40">
          ✨ {t('finoChatWidget.comingSoon')}
        </div>
      )}
    </>
  );
};

export default FinoChatWidget;

