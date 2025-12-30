import React, { useState } from 'react';
import { Loader2, Download, Copy, CheckCircle, XCircle, Film, FileText, List, Folder } from 'lucide-react';
import type {
  StudioGenerationInput,
  StudioGeneration,
  SectorType,
  GoalType,
  ToneType,
  LanguageType,
  DurationType
} from '../types/studio';
import { generateVideoContent, saveGeneration, getHistory } from '../services/studioService';
import { exportGenerationAsZip, copyToClipboard } from '../utils/studioExport';
import StudioHistory from './StudioHistory';
import VideoTemplates from './VideoTemplates';

type TabType = 'script' | 'subtitles' | 'storyboard';
type ViewMode = 'generator' | 'templates' | 'guide';

const FinOpsTheatre: React.FC = () => {
  // Form state
  const [sector, setSector] = useState<SectorType>('teknoloji');
  const [goal, setGoal] = useState<GoalType>('marka-farkindaligi');
  const [tone, setTone] = useState<ToneType>('profesyonel');
  const [duration, setDuration] = useState<DurationType>(20);
  const [language, setLanguage] = useState<LanguageType>('tr');
  const [keywords, setKeywords] = useState('');

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentGeneration, setCurrentGeneration] = useState<StudioGeneration | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('script');
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});
  const [showHistory, setShowHistory] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('generator');

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setCopySuccess({});

    try {
      const input: StudioGenerationInput = {
        sector,
        goal,
        tone,
        duration,
        language,
        keywords: keywords.trim() || undefined
      };

      const output = await generateVideoContent(input);

      const generation: StudioGeneration = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        input,
        output
      };

      saveGeneration(generation);
      setCurrentGeneration(generation);
      setActiveTab('script');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Video içeriği oluşturulurken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!currentGeneration) return;
    try {
      await exportGenerationAsZip(currentGeneration);
    } catch (err) {
      console.error('Export error:', err);
      alert('ZIP dosyası oluşturulurken bir hata oluştu');
    }
  };

  const handleCopy = async (key: string, text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopySuccess({ ...copySuccess, [key]: true });
      setTimeout(() => {
        setCopySuccess({ ...copySuccess, [key]: false });
      }, 2000);
    }
  };

  const handleHistorySelect = (generation: StudioGeneration) => {
    setCurrentGeneration(generation);
    setShowHistory(false);
    setActiveTab('script');
  };

  const handleUseTemplate = (scenarioText: string) => {
    setKeywords(scenarioText);
    setViewMode('generator');
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
      <div className="flex items-center justify-between mb-4 border-b border-gray-600 pb-4">
        <div>
          <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Film className="w-6 h-6" />
            🎭 FinOps Theatre – Video İçerik Yönetim Platformu
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Video senaryolarınızı, sahne planlarınızı ve yayına hazır içerik paketlerinizi oluşturmak, yönetmek ve sergilemek için tasarlanmıştır
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            Geçmiş ({getHistory().generations.length})
          </button>
        </div>
      </div>

      {/* Theatre Info */}
      <div className="mb-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">
            🎭
          </div>
          <div className="flex-1">
            <h4 className="text-purple-300 font-bold mb-2 text-lg">🎭 FinOps Theatre – Video İçerik Yönetim Platformu</h4>
            <p className="text-purple-100 text-sm leading-relaxed mb-3">
              <strong>Bu modül video üretimi yapmaz.</strong><br/>
              FinOps Theatre; video senaryolarınızı, sahne planlarınızı ve yayına hazır içerik paketlerinizi 
              <strong> oluşturmak, yönetmek ve sergilemek</strong> için tasarlanmıştır.
            </p>
            <p className="text-purple-200 text-xs leading-relaxed mb-3">
              Gerçek video üretimi (MP4 render) <strong>Faz-2</strong> kapsamında harici araçlar 
              (Canva, ajanslar, AI video platformları) ile yapılır.
            </p>
            <div className="bg-purple-900/40 rounded-lg p-3 mt-3">
              <h5 className="text-purple-300 font-semibold text-xs mb-2">🎥 Çıktılar:</h5>
              <ul className="space-y-1 text-purple-200 text-xs">
                <li>• Video senaryosu</li>
                <li>• Sahne planı</li>
                <li>• Ekran metinleri & altyazı</li>
                <li>• Ajansa / Canva'ya hazır içerik brief'i</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setViewMode('guide')}
          className={`px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            viewMode === 'guide'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <FileText className="w-5 h-5" />
          📖 Rehber
        </button>
        <button
          onClick={() => setViewMode('generator')}
          className={`px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            viewMode === 'generator'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Film className="w-5 h-5" />
          🎬 Senaryo Oluştur
        </button>
        <button
          onClick={() => setViewMode('templates')}
          className={`px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
            viewMode === 'templates'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          <Folder className="w-5 h-5" />
          🎞️ Gösterimdeki İçerikler
        </button>
      </div>

      {/* History Sidebar */}
      {showHistory && (
        <StudioHistory
          onSelect={handleHistorySelect}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Guide View */}
      {viewMode === 'guide' && (
        <div className="bg-gray-900 rounded-lg p-6 space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-3xl font-bold text-white flex items-center gap-3">
              🎭 FinOps Theatre Nedir?
            </h3>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-lg p-6">
            <p className="text-gray-200 text-base leading-relaxed mb-4">
              FinOps Theatre, <strong>pazarlama videolarınızın senaryodan yayına kadar olan yolculuğunu yöneten</strong> bir içerik sahnesidir.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2">
                  ❌ Bu platform:
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Video üretmez</li>
                  <li>• Kamera veya render motoru değildir</li>
                </ul>
              </div>
              <div>
                <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
                  ✅ FinOps Theatre:
                </h4>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Video fikirlerini</li>
                  <li>• Senaryoları</li>
                  <li>• Sahne planlarını</li>
                  <li>• Yayına hazır içerik paketlerini</li>
                </ul>
                <p className="text-purple-200 text-sm mt-3 font-semibold">
                  tek merkezde toplar ve sergiler.
                </p>
              </div>
            </div>
          </div>

          {/* Video Process */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-gray-700 pb-3">
              🎬 Video Oluşturma Prosesi
            </h3>

            {/* Step 1: Senaryo */}
            <div className="bg-gray-800 rounded-lg p-5 border-l-4 border-purple-500">
              <h4 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                1️⃣ Senaryo (Yazar)
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Video fikri ve metni hazırlanır.
              </p>
              <p className="text-gray-400 text-sm mt-2 italic">
                (Bu aşamada yapay zekâ veya ekip içi üretim kullanılabilir.)
              </p>
            </div>

            {/* Step 2: Sahneleme */}
            <div className="bg-gray-800 rounded-lg p-5 border-l-4 border-blue-500">
              <h4 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
                2️⃣ Sahneleme (FinOps Theatre)
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Senaryo:
              </p>
              <ul className="space-y-2 text-gray-400 ml-6">
                <li>• FinOps Theatre'a girilir</li>
                <li>• Şablonlara yerleştirilir</li>
                <li>• Film afişi gibi listelenir</li>
              </ul>
              <div className="mt-4 bg-blue-900/30 rounded p-3">
                <p className="text-blue-200 text-sm font-semibold mb-2">Bu aşamada içerik:</p>
                <ul className="space-y-1 text-blue-300 text-sm ml-4">
                  <li>✓ Düzenlenir</li>
                  <li>✓ Arşivlenir</li>
                  <li>✓ Tekrar kullanılabilir hale gelir</li>
                </ul>
              </div>
            </div>

            {/* Step 3: Çekim */}
            <div className="bg-gray-800 rounded-lg p-5 border-l-4 border-green-500">
              <h4 className="text-xl font-bold text-green-300 mb-3 flex items-center gap-2">
                3️⃣ Çekim (Dış Araçlar)
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Video:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-green-900/20 rounded px-3 py-2 text-center text-green-300 text-sm">
                  Canva
                </div>
                <div className="bg-green-900/20 rounded px-3 py-2 text-center text-green-300 text-sm">
                  CapCut
                </div>
                <div className="bg-green-900/20 rounded px-3 py-2 text-center text-green-300 text-sm">
                  Premiere
                </div>
                <div className="bg-green-900/20 rounded px-3 py-2 text-center text-green-300 text-sm">
                  Ajans / editör
                </div>
              </div>
              <p className="text-gray-400 text-sm mt-3">
                gibi araçlarda gerçek <strong className="text-green-400">MP4 dosyasına</strong> dönüştürülür.
              </p>
            </div>

            {/* Step 4: Gösterim */}
            <div className="bg-gray-800 rounded-lg p-5 border-l-4 border-orange-500">
              <h4 className="text-xl font-bold text-orange-300 mb-3 flex items-center gap-2">
                4️⃣ Gösterim
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                Hazır video:
              </p>
              <ul className="space-y-2 text-gray-400 ml-6">
                <li>• Web sitesinde (hero video)</li>
                <li>• YouTube</li>
                <li>• Instagram</li>
                <li>• LinkedIn</li>
              </ul>
              <p className="text-gray-400 mt-2">gibi kanallarda yayınlanır.</p>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-300 mb-4 flex items-center gap-2">
              🎥 Önemli Not
            </h3>
            <p className="text-red-200 text-lg font-semibold mb-4">
              FinOps Theatre bir <span className="underline">film stüdyosu değil</span>, bir <span className="underline">tiyatrodur</span>.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-green-300 font-semibold mb-2">✅ Sahne vardır</h4>
                <h4 className="text-green-300 font-semibold mb-2">✅ Afiş vardır</h4>
                <h4 className="text-green-300 font-semibold mb-2">✅ Program vardır</h4>
              </div>
              <div>
                <h4 className="text-red-300 font-semibold mb-2">❌ Kamera yoktur</h4>
                <h4 className="text-red-300 font-semibold mb-2">❌ Çekim yoktur</h4>
                <h4 className="text-red-300 font-semibold mb-2">❌ Render yoktur</h4>
              </div>
            </div>

            <div className="mt-6 bg-orange-900/30 rounded-lg p-4">
              <p className="text-orange-200 font-semibold mb-2">Bu yaklaşım:</p>
              <ul className="space-y-2 text-orange-100 text-sm ml-4">
                <li>✓ Maliyeti düşürür</li>
                <li>✓ Kontrolü artırır</li>
                <li>✓ Ajans bağımlılığını azaltır</li>
              </ul>
            </div>
          </div>

          {/* Why This Approach */}
          <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/50">
            <h3 className="text-2xl font-bold text-purple-300 mb-4 flex items-center gap-2">
              🎯 Neden Bu Yaklaşım?
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span>Her video için sıfırdan başlamak yerine</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span>Senaryoları sistematik üretmek</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span>Aynı içeriği farklı kanallarda kullanmak</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">→</span>
                <span><strong>Pazarlama sürecini ölçeklemek</strong></span>
              </li>
            </ul>
          </div>

          {/* Films in Theatre */}
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
              🎞️ Gösterimdeki Filmler
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              FinOps Theatre'da listelenen her içerik:
            </p>
            <ul className="space-y-3 text-gray-300 ml-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Bir <strong>"film"</strong> olarak düşünülür</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Her film bir <strong>iş problemini</strong> çözer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">•</span>
                <span>Her film <strong>karar üretmeye</strong> odaklanır</span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* Templates View */}
      {viewMode === 'templates' && (
        <VideoTemplates onUseTemplate={handleUseTemplate} />
      )}

      {/* Generator View */}
      {viewMode === 'generator' && (
        <>
          {/* Form Helper Text */}
          <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
            <p className="text-blue-200 text-xs leading-relaxed">
              <strong>📋 Not:</strong> Sektör, hedef, ton ve süre seçimleri; oluşturulacak <strong>video senaryosunun</strong> 
              dili, temposu ve vurgusunu belirler. Bu bilgiler doğrudan video üretmez, <strong>içerik planını</strong> şekillendirir.
            </p>
          </div>

          {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Sector */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sektör
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value as SectorType)}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          >
            <option value="teknoloji">Teknoloji</option>
            <option value="finans">Finans</option>
            <option value="saglik">Sağlık</option>
            <option value="egitim">Eğitim</option>
            <option value="eticaret">E-Ticaret</option>
            <option value="hizmet">Hizmet</option>
            <option value="uretim">Üretim</option>
            <option value="medya">Medya</option>
          </select>
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Hedef
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as GoalType)}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          >
            <option value="marka-farkindaligi">Marka Farkındalığı</option>
            <option value="urun-tanitimi">Ürün Tanıtımı</option>
            <option value="musteri-kazanimi">Müşteri Kazanımı</option>
            <option value="egitim-icerik">Eğitim İçeriği</option>
            <option value="sosyal-kanit">Sosyal Kanıt</option>
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ton
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as ToneType)}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          >
            <option value="profesyonel">Profesyonel</option>
            <option value="samimi">Samimi</option>
            <option value="enerjik">Enerjik</option>
            <option value="mizahi">Mizahi</option>
            <option value="duygusal">Duygusal</option>
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Süre
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value) as DurationType)}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          >
            <option value={20}>20 saniye</option>
            <option value={30}>30 saniye</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dil
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageType)}
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          >
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Anahtar Kelimeler (Opsiyonel)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="yapay zeka, finops, dashboard"
            className="w-full bg-gray-900 text-white rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 p-2"
            disabled={loading}
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="mb-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1"
        >
          {loading ? (
            <>
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Senaryo Oluşturuluyor...</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5" />
                <span>🎬 Video Senaryosu & Sahne Planı Oluştur</span>
              </div>
              <span className="text-xs text-blue-200 opacity-80">
                (Video render edilmez – içerik planı oluşturulur)
              </span>
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-900/50 border border-red-700 rounded-lg p-4 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-red-300 font-semibold">Hata</h4>
            <p className="text-red-200 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Results */}
      {currentGeneration && (
        <div className="bg-gray-900 rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
            <div>
              <h4 className="text-xl font-bold text-white">{currentGeneration.output.title}</h4>
              <p className="text-sm text-gray-400 mt-1">
                CTA: {currentGeneration.output.cta}
              </p>
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Pack (ZIP)
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('script')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'script'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Script
            </button>
            <button
              onClick={() => setActiveTab('subtitles')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'subtitles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Subtitles (SRT)
            </button>
            <button
              onClick={() => setActiveTab('storyboard')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'storyboard'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <List className="w-4 h-4 inline mr-2" />
              Storyboard
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-gray-800 rounded-lg p-4">
            {/* Script Tab */}
            {activeTab === 'script' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-sm font-semibold text-gray-300">Voiceover Script</h5>
                  <button
                    onClick={() => handleCopy('script', currentGeneration.output.voiceover_script)}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {copySuccess.script ? (
                      <><CheckCircle className="w-4 h-4" /> Kopyalandı</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Kopyala</>
                    )}
                  </button>
                </div>
                <pre className="text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                  {currentGeneration.output.voiceover_script}
                </pre>
              </div>
            )}

            {/* Subtitles Tab */}
            {activeTab === 'subtitles' && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-sm font-semibold text-gray-300">SRT Subtitles</h5>
                  <button
                    onClick={() => handleCopy('srt', currentGeneration.output.subtitle_srt)}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    {copySuccess.srt ? (
                      <><CheckCircle className="w-4 h-4" /> Kopyalandı</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Kopyala</>
                    )}
                  </button>
                </div>
                <pre className="text-gray-200 whitespace-pre-wrap text-sm font-mono bg-gray-900 p-3 rounded">
                  {currentGeneration.output.subtitle_srt}
                </pre>
              </div>
            )}

            {/* Storyboard Tab */}
            {activeTab === 'storyboard' && (
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-3">Visual Storyboard</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-3 py-2 text-left text-gray-300">#</th>
                        <th className="px-3 py-2 text-left text-gray-300">Time</th>
                        <th className="px-3 py-2 text-left text-gray-300">On-Screen Text</th>
                        <th className="px-3 py-2 text-left text-gray-300">B-Roll/Visual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentGeneration.output.storyboard.map((scene, index) => (
                        <tr key={index} className="border-b border-gray-700">
                          <td className="px-3 py-3 text-gray-400">{index + 1}</td>
                          <td className="px-3 py-3 text-gray-300 whitespace-nowrap">
                            {scene.t_start}s - {scene.t_end}s
                            <span className="text-xs text-gray-500 ml-2">
                              ({scene.t_end - scene.t_start}s)
                            </span>
                          </td>
                          <td className="px-3 py-3 text-gray-200">{scene.on_screen_text}</td>
                          <td className="px-3 py-3 text-gray-400">{scene.broll_suggestion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

          {/* Instructions */}
          {!currentGeneration && !loading && (
            <div className="bg-gray-900 rounded-lg p-6 text-gray-400 text-sm">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                ℹ️ Nasıl Kullanılır?
              </h4>
              <ol className="list-decimal list-inside space-y-2 mb-4">
                <li>Sektör, hedef, ton, süre ve dil seçin</li>
                <li>İsteğe bağlı anahtar kelimeler ekleyin (veya şablondan kullanın)</li>
                <li>"Video Senaryosu & Sahne Planı Oluştur" butonuna tıklayın</li>
                <li>Oluşturulan senaryoyu, sahne planını ve altyazıları görüntüleyin</li>
                <li>İçerikleri kopyalayın veya ZIP paketi olarak indirin</li>
              </ol>
              <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                <h5 className="text-yellow-300 font-semibold text-sm mb-2">⚠️ Önemli:</h5>
                <p className="text-yellow-200 text-xs leading-relaxed mb-2">
                  <strong>Bu platform video render etmez.</strong> FinOps Theatre sadece video içeriklerini 
                  (senaryo, sahne planı, altyazı) oluşturur ve yönetir.
                </p>
                <p className="text-yellow-200 text-xs leading-relaxed">
                  Gerçek MP4 çıktısı için bu içerikleri <strong>Canva, CapCut, Premiere</strong> veya 
                  bir video ajansına aktarın.
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FinOpsTheatre;
