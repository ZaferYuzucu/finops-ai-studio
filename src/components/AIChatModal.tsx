import { X, Send, Sparkles, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion: string;
  dashboardName: string;
}

interface Message {
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// Simüle edilmiş AI yanıtları
const getAIResponse = (question: string, dashboardName: string): string => {
  const responses = [
    `${dashboardName} paneline göre, bu sorunun cevabı çok önemli. Verilerinizi analiz ettiğimde, birkaç kilit nokta öne çıkıyor:

1. **Trend Analizi**: Son 3 aydaki veriler olumlu bir gelişme gösteriyor.
2. **Karşılaştırma**: Sektör ortalamasının %15 üzerinde performans görüyoruz.
3. **Öneriler**: Mevcut stratejinizi sürdürmenizi, ancak B segmentinde iyileştirme yapmanızı öneririm.

Daha detaylı analiz için spesifik tarih aralığı belirtebilirsiniz.`,
    
    `Bu soruyu ${dashboardName} verileriyle yanıtlayayım:

**Mevcut Durum**: Metrikleriniz genel olarak sağlıklı görünüyor. Özellikle Q4 2024'te güçlü bir performans var.

**Dikkat Edilmesi Gerekenler**:
- Maliyetlerde hafif bir artış trendi
- Müşteri memnuniyeti stabilize olmuş durumda
- Operasyonel verimlilik iyileştirilebilir

**Aksiyon Önerileri**: Kısa vadede maliyet optimizasyonu, orta vadede süreç otomasyonu öneririm.`,

    `${dashboardName} panelindeki verilere dayanarak:

✅ **Güçlü Yönler**: Temel metrikleriniz hedeflerin üzerinde.
⚠️ **İyileştirme Alanları**: Bazı alt kategorilerde dalgalanma var.
🎯 **Hedef Önerisi**: Önümüzdeki 6 ay için %20 artış hedeflenebilir.

Bu sonuçları elde etmek için spesifik bir strateji geliştirmemizi ister misiniz?`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export default function AIChatModal({ isOpen, onClose, initialQuestion, dashboardName }: AIChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // İlk soru sorulduğunda
  useEffect(() => {
    if (isOpen && initialQuestion && messages.length === 0) {
      // Kullanıcı sorusunu ekle
      const userMessage: Message = {
        role: 'user',
        content: initialQuestion,
        timestamp: new Date()
      };
      setMessages([userMessage]);
      
      // AI yanıtını simüle et
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage: Message = {
          role: 'ai',
          content: getAIResponse(initialQuestion, dashboardName),
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1500);
    }
  }, [isOpen, initialQuestion, dashboardName, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Kullanıcı mesajını ekle
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // AI yanıtını simüle et
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: Message = {
        role: 'ai',
        content: getAIResponse(inputValue, dashboardName),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Modal kapanırken mesajları temizle
  const handleClose = () => {
    setMessages([]);
    setInputValue('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 sm:inset-auto sm:w-full sm:max-w-2xl sm:h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">AI Asistan</h3>
                  <p className="text-xs text-gray-600">{dashboardName}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`p-4 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Sorunuzu yazın..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Gönder</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI yanıtları simüle edilmiştir. Gerçek veri analizi için hesap oluşturun.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

