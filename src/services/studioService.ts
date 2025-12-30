// OpenAI import kaldırıldı - MVP mockup mode
import type {
  StudioGenerationInput,
  StudioGenerationOutput,
  StudioGeneration,
  StudioHistory
} from '../types/studio';

// ============================================
// MOCKUP MODE - Beta/MVP Aşaması
// ============================================
// Gerçek video generation Faz-2'de eklenecek
// Şu anda sadece template ve senaryo yönetimi
// ============================================

const SECTOR_NAMES: Record<string, { tr: string; en: string }> = {
  teknoloji: { tr: 'Teknoloji', en: 'Technology' },
  finans: { tr: 'Finans', en: 'Finance' },
  saglik: { tr: 'Sağlık', en: 'Healthcare' },
  egitim: { tr: 'Eğitim', en: 'Education' },
  eticaret: { tr: 'E-Ticaret', en: 'E-Commerce' },
  hizmet: { tr: 'Hizmet', en: 'Service' },
  uretim: { tr: 'Üretim', en: 'Manufacturing' },
  medya: { tr: 'Medya', en: 'Media' }
};

const GOAL_NAMES: Record<string, { tr: string; en: string }> = {
  'marka-farkindaligi': { tr: 'Marka Farkındalığı', en: 'Brand Awareness' },
  'urun-tanitimi': { tr: 'Ürün Tanıtımı', en: 'Product Introduction' },
  'musteri-kazanimi': { tr: 'Müşteri Kazanımı', en: 'Customer Acquisition' },
  'egitim-icerik': { tr: 'Eğitim İçeriği', en: 'Educational Content' },
  'sosyal-kanit': { tr: 'Sosyal Kanıt', en: 'Social Proof' }
};

const TONE_NAMES: Record<string, { tr: string; en: string }> = {
  profesyonel: { tr: 'Profesyonel', en: 'Professional' },
  samimi: { tr: 'Samimi', en: 'Friendly' },
  enerjik: { tr: 'Enerjik', en: 'Energetic' },
  mizahi: { tr: 'Mizahi', en: 'Humorous' },
  duygusal: { tr: 'Duygusal', en: 'Emotional' }
};

function buildPrompt(input: StudioGenerationInput): string {
  const lang = input.language;
  const sector = SECTOR_NAMES[input.sector]?.[lang] || input.sector;
  const goal = GOAL_NAMES[input.goal]?.[lang] || input.goal;
  const tone = TONE_NAMES[input.tone]?.[lang] || input.tone;

  if (lang === 'tr') {
    return `Sen bir profesyonel sosyal medya içerik üreticisisin. ${input.duration} saniyelik bir Reels/Shorts videosu için içerik paketi oluştur.

PARAMETRE:
- Sektör: ${sector}
- Hedef: ${goal}
- Ton: ${tone}
- Süre: ${input.duration} saniye
- Dil: Türkçe
${input.keywords ? `- Anahtar Kelimeler: ${input.keywords}` : ''}

ÇIKTI FORMATI (JSON):
{
  "title": "Video başlığı (max 60 karakter)",
  "cta": "Call-to-action metni (max 30 karakter)",
  "voiceover_script": "Tam seslendirme metni (net zamanlama ile)",
  "subtitle_srt": "SRT formatında altyazı dosyası içeriği",
  "storyboard": [
    {
      "t_start": 0,
      "t_end": 3,
      "on_screen_text": "Ekranda görünecek metin",
      "broll_suggestion": "B-roll/görsel öneri"
    }
  ]
}

ÖNEMLİ:
- Türkçe karakterleri doğru kullan (ı, İ, ş, Ş, ğ, Ğ, ü, Ü, ö, Ö, ç, Ç)
- Storyboard sahnelerinin toplam süresi tam olarak ${input.duration} saniye olmalı
- SRT formatı doğru olmalı (1\\n00:00:00,000 --> 00:00:03,000\\nAltyazı metni)
- Hook ilk 3 saniyede olmalı
- CTA son 3 saniyede olmalı

Sadece JSON yanıtı ver, başka açıklama ekleme.`;
  } else {
    return `You are a professional social media content creator. Create a content pack for a ${input.duration}-second Reels/Shorts video.

PARAMETERS:
- Sector: ${sector}
- Goal: ${goal}
- Tone: ${tone}
- Duration: ${input.duration} seconds
- Language: English
${input.keywords ? `- Keywords: ${input.keywords}` : ''}

OUTPUT FORMAT (JSON):
{
  "title": "Video title (max 60 characters)",
  "cta": "Call-to-action text (max 30 characters)",
  "voiceover_script": "Complete voiceover script (with clear timing)",
  "subtitle_srt": "SRT format subtitle file content",
  "storyboard": [
    {
      "t_start": 0,
      "t_end": 3,
      "on_screen_text": "On-screen text",
      "broll_suggestion": "B-roll/visual suggestion"
    }
  ]
}

IMPORTANT:
- Total storyboard scenes duration must be exactly ${input.duration} seconds
- SRT format must be correct (1\\n00:00:00,000 --> 00:00:03,000\\nSubtitle text)
- Hook must be in first 3 seconds
- CTA must be in last 3 seconds

Return only JSON response, no additional explanation.`;
  }
}

export async function generateVideoContent(
  input: StudioGenerationInput
): Promise<StudioGenerationOutput> {
  // ============================================
  // MOCKUP MODE - Beta/MVP
  // API çağrısı yok, örnek veri döndürülüyor
  // Faz-2'de gerçek AI entegrasyonu yapılacak
  // ============================================
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const sectorName = SECTOR_NAMES[input.sector]?.[input.language] || input.sector;
  const goalName = GOAL_NAMES[input.goal]?.[input.language] || input.goal;
  
  // Generate mockup content based on input
  const output: StudioGenerationOutput = {
    title: `${sectorName} için ${goalName} - ${input.duration}sn`,
    cta: input.language === 'tr' 
      ? 'Detaylı bilgi için linke tıklayın → www.finops.ist'
      : 'Click the link for details → www.finops.ist',
    voiceover_script: input.language === 'tr'
      ? `Merhaba! FINOPS AI Studio ile ${sectorName.toLowerCase()} sektöründe ${goalName.toLowerCase()} hedefine ulaşabilirsiniz. Verilerinizi otomatik topluyoruz, yapay zeka ile analiz ediyoruz ve size "Şimdi ne yapmalıyım?" sorusunun cevabını veriyoruz. Excel raporlarının ötesinde, gerçek zamanlı karar desteği. Hemen demo için bize ulaşın!`
      : `Hello! With FINOPS AI Studio, you can achieve your ${goalName.toLowerCase()} goals in the ${sectorName.toLowerCase()} sector. We automatically collect your data, analyze it with AI, and answer "What should I do now?" Real-time decision support beyond Excel reports. Contact us for a demo!`,
    subtitle_srt: generateMockupSRT(input.duration, input.language),
    storyboard: generateMockupStoryboard(input.duration, sectorName, input.language)
  };

  return output;
}

function generateMockupSRT(duration: number, language: string): string {
  const scenes = Math.ceil(duration / 5);
  let srt = '';
  
  for (let i = 0; i < scenes; i++) {
    const start = i * 5;
    const end = Math.min((i + 1) * 5, duration);
    srt += `${i + 1}\n`;
    srt += `00:00:${start.toString().padStart(2, '0')},000 --> 00:00:${end.toString().padStart(2, '0')},000\n`;
    
    if (language === 'tr') {
      const texts = [
        'FINOPS AI Studio ile verilerinizi kolayca yönetin',
        'Yapay zeka destekli otomatik analiz',
        'Gerçek zamanlı karar desteği',
        'Excel raporlarının ötesinde çözümler',
        'Hemen demo için bize ulaşın!'
      ];
      srt += texts[i % texts.length] + '\n\n';
    } else {
      const texts = [
        'Manage your data easily with FINOPS AI Studio',
        'AI-powered automatic analysis',
        'Real-time decision support',
        'Solutions beyond Excel reports',
        'Contact us for a demo now!'
      ];
      srt += texts[i % texts.length] + '\n\n';
    }
  }
  
  return srt.trim();
}

function generateMockupStoryboard(duration: number, sector: string, language: string): any[] {
  const sceneDuration = Math.floor(duration / 4);
  const storyboard = [];
  
  const trScenes = [
    { text: `${sector} Sektörüne Özel Çözüm`, broll: 'Dashboard ekranı, grafikler' },
    { text: 'Otomatik Veri Toplama', broll: 'Veri entegrasyonu animasyonu' },
    { text: 'Yapay Zeka Analizi', broll: 'AI işlem görseli, graflar' },
    { text: 'www.finops.ist → Demo', broll: 'Logo, CTA butonu, iletişim' }
  ];
  
  const enScenes = [
    { text: `Solution for ${sector} Sector`, broll: 'Dashboard screen, charts' },
    { text: 'Automatic Data Collection', broll: 'Data integration animation' },
    { text: 'AI Analysis', broll: 'AI processing visual, graphs' },
    { text: 'www.finops.ist → Demo', broll: 'Logo, CTA button, contact' }
  ];
  
  const scenes = language === 'tr' ? trScenes : enScenes;
  
  for (let i = 0; i < 4; i++) {
    const start = i * sceneDuration;
    const end = (i === 3) ? duration : (i + 1) * sceneDuration;
    
    storyboard.push({
      t_start: start,
      t_end: end,
      on_screen_text: scenes[i].text,
      broll_suggestion: scenes[i].broll
    });
  }
  
  return storyboard;
}

// LocalStorage History Management
const HISTORY_KEY = 'finops_studio_history';
const MAX_HISTORY = 20;

export function saveGeneration(generation: StudioGeneration): void {
  const history = getHistory();
  history.generations.unshift(generation);
  
  // Keep only last MAX_HISTORY items
  if (history.generations.length > MAX_HISTORY) {
    history.generations = history.generations.slice(0, MAX_HISTORY);
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): StudioHistory {
  const stored = localStorage.getItem(HISTORY_KEY);
  if (!stored) {
    return { generations: [] };
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return { generations: [] };
  }
}

export function getGenerationById(id: string): StudioGeneration | null {
  const history = getHistory();
  return history.generations.find(g => g.id === id) || null;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

// ============================================
// TEMPLATE MANAGEMENT
// ============================================

const TEMPLATE_KEY = 'finops_studio_templates';

export function saveTemplate(template: Omit<import('../types/studio').VideoTemplate, 'id' | 'created_at' | 'updated_at'>): void {
  const library = getTemplateLibrary();
  
  // Check if slot already exists
  const existingIndex = library.templates.findIndex(t => t.slot_number === template.slot_number);
  
  const now = new Date().toISOString();
  
  if (existingIndex >= 0) {
    // Update existing
    library.templates[existingIndex] = {
      ...library.templates[existingIndex],
      title: template.title,
      scenario_text: template.scenario_text,
      updated_at: now
    };
  } else {
    // Create new
    library.templates.push({
      id: crypto.randomUUID(),
      slot_number: template.slot_number,
      title: template.title,
      scenario_text: template.scenario_text,
      created_at: now,
      updated_at: now
    });
  }
  
  // Sort by slot number
  library.templates.sort((a, b) => a.slot_number - b.slot_number);
  
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(library));
}

export function getTemplateLibrary(): import('../types/studio').TemplateLibrary {
  const stored = localStorage.getItem(TEMPLATE_KEY);
  if (!stored) {
    return { templates: [] };
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    return { templates: [] };
  }
}

export function getTemplateBySlot(slotNumber: number): import('../types/studio').VideoTemplate | null {
  const library = getTemplateLibrary();
  return library.templates.find(t => t.slot_number === slotNumber) || null;
}

export function deleteTemplate(slotNumber: number): void {
  const library = getTemplateLibrary();
  library.templates = library.templates.filter(t => t.slot_number !== slotNumber);
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(library));
}

export function clearAllTemplates(): void {
  localStorage.removeItem(TEMPLATE_KEY);
}

