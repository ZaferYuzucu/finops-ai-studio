import React, { useState, useEffect } from 'react';
import { FileText, Save, Trash2, Play, AlertCircle } from 'lucide-react';
import type { VideoTemplate } from '../types/studio';
import { getTemplateLibrary, saveTemplate, deleteTemplate } from '../services/studioService';

interface VideoTemplatesProps {
  onUseTemplate: (scenarioText: string) => void;
}

const VideoTemplates: React.FC<VideoTemplatesProps> = ({ onUseTemplate }) => {
  const [templates, setTemplates] = useState<VideoTemplate[]>([]);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editScenario, setEditScenario] = useState('');

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const library = getTemplateLibrary();
    setTemplates(library.templates);
  };

  const handleStartEdit = (slotNumber: number) => {
    const template = templates.find(t => t.slot_number === slotNumber);
    setEditingSlot(slotNumber);
    setEditTitle(template?.title || `Video ${slotNumber}`);
    setEditScenario(template?.scenario_text || '');
  };

  const handleSave = () => {
    if (editingSlot === null) return;

    if (!editTitle.trim() || !editScenario.trim()) {
      alert('Lütfen başlık ve senaryo giriniz');
      return;
    }

    saveTemplate({
      slot_number: editingSlot,
      title: editTitle.trim(),
      scenario_text: editScenario.trim()
    });

    loadTemplates();
    setEditingSlot(null);
    setEditTitle('');
    setEditScenario('');
  };

  const handleDelete = (slotNumber: number) => {
    if (confirm('Bu şablonu silmek istediğinizden emin misiniz?')) {
      deleteTemplate(slotNumber);
      loadTemplates();
    }
  };

  const handleUse = (scenarioText: string) => {
    onUseTemplate(scenarioText);
  };

  const getSlotTemplate = (slotNumber: number): VideoTemplate | undefined => {
    return templates.find(t => t.slot_number === slotNumber);
  };

  const renderSlot = (slotNumber: number) => {
    const template = getSlotTemplate(slotNumber);
    const isEditing = editingSlot === slotNumber;

    if (isEditing) {
      return (
        <div className="bg-gray-900 rounded-lg p-4 border-2 border-blue-500">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-bold text-blue-400">Video #{slotNumber} Düzenle</h4>
            <button
              onClick={() => setEditingSlot(null)}
              className="text-gray-400 hover:text-gray-300 text-sm"
            >
              İptal
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Başlık
              </label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Örn: FinOps Dashboard Tanıtımı"
                className="w-full bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Senaryo Metni (Claude'dan kopyala)
              </label>
              <textarea
                value={editScenario}
                onChange={(e) => setEditScenario(e.target.value)}
                placeholder="Claude'dan aldığınız senaryo metnini buraya yapıştırın..."
                rows={8}
                className="w-full bg-gray-800 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2 text-sm font-mono"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Şablonu Kaydet
            </button>
          </div>
        </div>
      );
    }

    if (template) {
      return (
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded">
                  {slotNumber}
                </span>
                <h4 className="text-white font-semibold">{template.title}</h4>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">
                {template.scenario_text.substring(0, 100)}...
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleUse(template.scenario_text)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Kullan
            </button>
            <button
              onClick={() => handleStartEdit(slotNumber)}
              className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(slotNumber)}
              className="bg-red-600/20 hover:bg-red-600/30 text-red-400 text-sm font-semibold py-2 px-3 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      );
    }

    // Empty slot
    return (
      <button
        onClick={() => handleStartEdit(slotNumber)}
        className="w-full bg-gray-900 rounded-lg p-6 border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors group"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 bg-gray-800 group-hover:bg-blue-600/20 rounded-full flex items-center justify-center transition-colors">
            <span className="text-2xl font-bold text-gray-600 group-hover:text-blue-400">
              {slotNumber}
            </span>
          </div>
          <p className="text-sm text-gray-500 group-hover:text-blue-400">
            + Senaryo Ekle
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-purple-600/10 border border-purple-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-purple-300 font-semibold mb-2">🎞️ Gösterimdeki İçerikler</h4>
            <p className="text-sm text-purple-200/90 leading-relaxed mb-2">
              Oluşturulmuş video senaryoları ve içerik paketleri. Her slot bir "film afişi" gibi düşünülebilir.
            </p>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              <strong>Not:</strong> Bu içerikler <strong>Canva / ajans / AI video araçlarında</strong> videoya dönüştürülür. 
              FinOps Theatre video render etmez.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of 10 slots */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(slotNumber => (
          <div key={slotNumber}>
            {renderSlot(slotNumber)}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-gray-400 pt-2">
        {templates.length} / 10 şablon dolu
      </div>
    </div>
  );
};

export default VideoTemplates;


