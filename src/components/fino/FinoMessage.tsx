import React from 'react';
import { motion } from 'framer-motion';
import { Dog } from 'lucide-react';
import { 
  generateFinoMessage, 
  formatFinoMessageAsMarkdown,
  generateFinoMessageTemplate,
  FinoMessageTemplate 
} from '@/services/finoConversationEngine';
import type { RecommendationResult } from '@/types/recommendationEngine';

interface FinoMessageProps {
  recommendationResult?: RecommendationResult;
  message?: string;
  template?: FinoMessageTemplate;
  variant?: 'full' | 'compact';
  className?: string;
}

/**
 * Fino Köpeği Mesaj Component v2.0
 * 
 * Kullanım:
 * 1. Otomatik: <FinoMessage recommendationResult={result} />
 * 2. Manuel: <FinoMessage message="Merhaba!" />
 * 3. Template: <FinoMessage template={template} />
 */
const FinoMessage: React.FC<FinoMessageProps> = ({ 
  recommendationResult,
  message,
  template, 
  variant = 'full',
  className = '' 
}) => {
  // Mesajı belirle
  let finoMessage = message || '';
  
  if (recommendationResult && !message && !template) {
    finoMessage = generateFinoMessage(recommendationResult);
  } else if (template) {
    finoMessage = template.full_message;
  }

  if (!finoMessage) {
    console.warn('⚠️ FinoMessage: No message provided');
    return null;
  }

  const formattedMessage = formatFinoMessageAsMarkdown(finoMessage);

  // Compact variant için kısaltılmış mesaj
  if (variant === 'compact') {
    const lines = formattedMessage.split('\n\n');
    const compactMessage = lines.slice(0, 2).join('\n\n'); // İlk 2 paragraf

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 bg-white rounded-full p-2 shadow-md">
            <Dog className="text-purple-600" size={24} />
          </div>
          <div className="flex-1">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-800 whitespace-pre-line mb-0">
                {compactMessage}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Full variant - Tam mesaj
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-300 rounded-2xl p-6 shadow-lg ${className}`}
    >
      {/* Fino Header */}
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
          className="bg-white rounded-full p-3 shadow-md"
        >
          <Dog className="text-purple-600" size={32} />
        </motion.div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Fino Köpeği</h3>
          <p className="text-sm text-gray-600">Senin AI Finans Danışmanın</p>
        </div>
      </div>

      {/* Fino Message */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-purple-200">
        <div className="prose prose-purple max-w-none">
          <div 
            className="text-gray-800 whitespace-pre-line leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: formattedMessage
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-purple-700">$1</strong>')
                .replace(/\n\n/g, '<br /><br />')
            }}
          />
        </div>
      </div>

      {/* Footer Encouragement */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 italic">
          💡 İstediğin zaman dashboard'larını özelleştirebilirsin
        </p>
      </div>
    </motion.div>
  );
};

export default FinoMessage;

