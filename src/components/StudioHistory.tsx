import React, { useState, useEffect } from 'react';
import { X, Calendar, Globe, Target, Zap, Clock, Trash2 } from 'lucide-react';
import type { StudioGeneration } from '../types/studio';
import { getHistory, clearHistory } from '../services/studioService';

interface StudioHistoryProps {
  onSelect: (generation: StudioGeneration) => void;
  onClose: () => void;
}

const StudioHistory: React.FC<StudioHistoryProps> = ({ onSelect, onClose }) => {
  const [generations, setGenerations] = useState<StudioGeneration[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const history = getHistory();
    setGenerations(history.generations);
  };

  const handleClearHistory = () => {
    if (confirm('Tüm geçmiş silinecek. Emin misiniz?')) {
      clearHistory();
      setGenerations([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getSectorLabel = (sector: string) => {
    const labels: Record<string, string> = {
      teknoloji: 'Teknoloji',
      finans: 'Finans',
      saglik: 'Sağlık',
      egitim: 'Eğitim',
      eticaret: 'E-Ticaret',
      hizmet: 'Hizmet',
      uretim: 'Üretim',
      medya: 'Medya'
    };
    return labels[sector] || sector;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h3 className="text-xl font-bold text-white">Üretim Geçmişi</h3>
            <p className="text-sm text-gray-400 mt-1">
              {generations.length} üretim kaydı
            </p>
          </div>
          <div className="flex items-center gap-2">
            {generations.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center gap-2 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                Geçmişi Temizle
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {generations.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Henüz üretim kaydı yok</p>
              <p className="text-sm mt-1">İlk video içeriğinizi oluşturun</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {generations.map((generation) => (
                <button
                  key={generation.id}
                  onClick={() => onSelect(generation)}
                  className="w-full bg-gray-900 hover:bg-gray-900/80 rounded-lg p-4 transition-colors text-left border border-gray-700 hover:border-blue-500"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Title */}
                      <h4 className="text-white font-semibold truncate mb-2">
                        {generation.output.title}
                      </h4>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(generation.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {getSectorLabel(generation.input.sector)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {generation.input.duration}s
                        </span>
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          {generation.input.language.toUpperCase()}
                        </span>
                      </div>

                      {/* CTA */}
                      <p className="text-sm text-gray-500 mt-2 truncate">
                        CTA: {generation.output.cta}
                      </p>
                    </div>

                    {/* Badge */}
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                        <Zap className="w-3 h-3" />
                        {generation.output.storyboard.length} sahne
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudioHistory;




