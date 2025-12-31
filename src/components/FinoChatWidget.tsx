import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Minimize2, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { processFinoChat, getConversationStarters } from '../services/finoRagService';
import type { ChatMessage } from '../types/fino';
import rateLimiter, { validateChatInput } from '../utils/rateLimiter';
import finoLogger from '../utils/finoLogger';

const FinoChatWidget: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: t('finoChatWidget.greeting'), timestamp: Date.now() },
    { role: 'ai', text: t('finoChatWidget.message'), timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showStarters, setShowStarters] = useState(true);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Load conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('fino-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.conversations && Array.isArray(parsed.conversations)) {
          setChatMessages(parsed.conversations);
          setShowStarters(parsed.conversations.length <= 2);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (chatMessages.length > 2) {
      localStorage.setItem('fino-chat-history', JSON.stringify({
        conversations: chatMessages,
        lastUpdated: Date.now()
      }));
    }
  }, [chatMessages]);

  const handleSendMessage = async (message?: string) => {
    const textToSend = message || inputValue.trim();
    if (!textToSend || isLoading) return;

    // Validate input
    const validation = validateChatInput(textToSend);
    if (!validation.valid) {
      finoLogger.logValidationError(validation.error || 'Unknown validation error', textToSend);
      const errorMessage: ChatMessage = {
        role: 'ai',
        text: `❌ ${validation.error}`,
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Check rate limit
    const rateLimit = rateLimiter.checkLimit('fino-chat');
    if (!rateLimit.allowed) {
      finoLogger.logRateLimit({ resetIn: rateLimit.resetIn });
      const waitSeconds = Math.ceil(rateLimit.resetIn / 1000);
      const errorMessage: ChatMessage = {
        role: 'ai',
        text: `⏰ Çok fazla mesaj gönderdin! Lütfen ${waitSeconds} saniye bekle.`,
        timestamp: Date.now()
      };
      setChatMessages(prev => [...prev, errorMessage]);
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowStarters(false);

    try {
      // Get AI response
      const aiResponse = await processFinoChat(textToSend, chatMessages);

      // Add AI message
      const aiMessage: ChatMessage = {
        role: 'ai',
        text: aiResponse,
        timestamp: Date.now()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        role: 'ai',
        text: "Üzgünüm, bir hata oluştu 🐕 Lütfen tekrar dener misin?",
        timestamp: Date.now()
      };

      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterClick = (starter: string) => {
    handleSendMessage(starter);
  };

  const clearHistory = () => {
    setChatMessages([
      { role: 'ai', text: t('finoChatWidget.greeting'), timestamp: Date.now() },
      { role: 'ai', text: t('finoChatWidget.message'), timestamp: Date.now() }
    ]);
    setShowStarters(true);
    localStorage.removeItem('fino-chat-history');
  };

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

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-2xl px-4 py-3 shadow-md border max-w-[85%] ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-tr-sm border-orange-300' 
                      : 'bg-white rounded-tl-sm border-gray-200 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}

              {/* Conversation Starters */}
              {showStarters && !isLoading && chatMessages.length === 2 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500 text-center mb-2">💡 Örnek sorular:</p>
                  {getConversationStarters().map((starter, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleStarterClick(starter)}
                      className="w-full text-left px-3 py-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg text-xs text-gray-700 transition-all"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing indicator */}
              {isLoading && (
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
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area - Active */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200 focus-within:border-orange-400 transition-colors">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('finoChatWidget.placeholder')}
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 disabled:opacity-50"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isLoading}
                  className="p-2 bg-gradient-to-r from-orange-400 to-amber-500 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title={t('finoChatWidget.sendButton')}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-400">
                🤖 Powered by AI
              </p>
              {chatMessages.length > 2 && (
                <button
                  onClick={clearHistory}
                  className="text-xs text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Geçmişi Temizle
                </button>
              )}
            </div>
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
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-2xl bg-orange-400 animate-ping opacity-20"></div>
          </>
        )}
      </button>
    </>
  );
};

export default FinoChatWidget;

