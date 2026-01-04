// FinOps AI Studio - Fino Conversation Engine
// Fino köpeği için akıllı, kişiselleştirilmiş konuşma sistemi

import type { RecommendationResult, SectorType, CompanySizeType, PrimaryGoalType, FinancialMaturityType } from '@/types/recommendationEngine';
import { KPI_LEVELS } from '@/config/recommendationRules';

// ==========================================
// FİNO'NUN KULLANDIĞI VERİLER
// ==========================================

export interface FinoContext {
  sector?: SectorType;
  company_size?: CompanySizeType;
  primary_goal?: PrimaryGoalType;
  financial_maturity?: FinancialMaturityType;
  recommended_dashboards: any[];
  default_dashboard: string;
  kpi_level: 'BASIC' | 'STANDARD' | 'ADVANCED';
  sector_template: string;
}

// ==========================================
// KONUŞMA ŞABLONLARı
// ==========================================

/**
 * AŞAMA-1: KULLANICIYI TANIDIĞINI GÖSTER
 * Template: "{Sektör} işletmesi yönettiğini ve özellikle {Hedef} istediğini anladım."
 */
const generatePhase1_Recognition = (context: FinoContext): string => {
  const sectorLabels: Record<SectorType, string> = {
    restaurant_cafe: 'Restoran/Cafe',
    hotel_tourism: 'Otel/Turizm',
    agriculture: 'Tarım',
    manufacturing: 'Üretim/Endüstri',
    healthcare: 'Sağlık',
    retail: 'Perakende',
    automotive: 'Otomotiv',
    education: 'Eğitim',
    other: 'İşletme'
  };

  const goalLabels: Record<PrimaryGoalType, string> = {
    cash_flow: 'nakit akışını daha net görmek',
    profitability: 'kârlılığı artırmak',
    cost_control: 'maliyetleri kontrol etmek',
    reporting: 'daha iyi raporlama yapmak',
    all: 'genel bir bakış elde etmek'
  };

  const sector = context.sector ? sectorLabels[context.sector] : 'İşletme';
  const goal = context.primary_goal ? goalLabels[context.primary_goal] : 'işini geliştirmek';

  return `${sector} işletmesi yönettiğini ve özellikle ${goal} istediğini anladım.`;
};

/**
 * AŞAMA-2: NEDEN BU DASHBOARD'LAR?
 * Template: "Bu yüzden sana önce {Dashboard1} ve {Dashboard2} panellerini önerdim."
 * 
 * KURAL:
 * ✅ Hep "senin ihtiyacına göre" de
 * ❌ Asla "algoritmamız böyle dedi" deme
 */
const generatePhase2_Explanation = (context: FinoContext): string => {
  const dashboardCount = context.recommended_dashboards.length;
  
  if (dashboardCount === 0) {
    return 'Sana en uygun panelleri hazırladım.';
  }

  // İlk 2-3 dashboard'ı isimlendir
  const primaryDashboards = context.recommended_dashboards
    .filter(d => d.isPrimary || d.relevanceScore >= 90)
    .slice(0, 2)
    .map(d => d.dashboard.name);

  if (primaryDashboards.length === 0) {
    // Fallback: İlk 2 dashboard
    const first = context.recommended_dashboards[0]?.dashboard.name || 'Ana Panel';
    const second = context.recommended_dashboards[1]?.dashboard.name || 'Finans Panel';
    return `Bu yüzden sana önce **${first}** ve **${second}** panellerini önerdim.`;
  }

  if (primaryDashboards.length === 1) {
    return `Bu yüzden sana önce **${primaryDashboards[0]}** panelini önerdim.`;
  }

  // 2 veya daha fazla
  const dashboardList = primaryDashboards.map((name, idx) => {
    if (idx === primaryDashboards.length - 1) {
      return `**${name}**`;
    }
    return `**${name}**`;
  }).join(' ve ');

  return `Bu yüzden sana önce ${dashboardList} panellerini önerdim.`;
};

/**
 * AŞAMA-3: KARMAŞIKLIĞI AZALT
 * Template: "Şimdilik sadece temel rakamları gösteriyoruz. Amacımız seni yormadan resmi görmek."
 */
const generatePhase3_Simplification = (context: FinoContext): string => {
  const kpiLevelExplanations = {
    BASIC: {
      current: 'Şimdilik sadece temel rakamları gösteriyoruz.',
      goal: 'Amacımız seni yormadan resmi görmek.'
    },
    STANDARD: {
      current: 'Hem temel hem de detaylı rakamları gösteriyoruz.',
      goal: 'Kategorilere göre ayırdık ki daha rahat anlaşılsın.'
    },
    ADVANCED: {
      current: 'Tüm detaylı göstergeleri açtık.',
      goal: 'Sektördeki yerini görebilir, gelecek tahmini yapabilirsin.'
    }
  };

  const explanation = kpiLevelExplanations[context.kpi_level];

  return `${explanation.current}\n${explanation.goal}`;
};

/**
 * AŞAMA-4: MİNİ YOL HARİTASI VER ✅ YENİ
 * Template: "Önerim: Önce bu dashboard'a bak, haftada bir kontrol et..."
 */
const generatePhase4_MiniRoadmap = (context: FinoContext): string => {
  const primaryDashboard = context.recommended_dashboards.find(d => d.isPrimary);
  const defaultDashboardName = primaryDashboard?.dashboard.name || 'bu panellere';

  // Sektöre göre özel tavsiyeler
  const sectorAdvice: Record<SectorType, string> = {
    restaurant_cafe: 'Gün sonunda kasaya ne giriyor, ne çıkıyor onu net görmek önemli.',
    hotel_tourism: 'Otelcilikte doluluk kadar bir odadan ne kazandığın da önemlidir.',
    agriculture: 'Girdi maliyetleri sezona göre değiştiği için bunu ayrı ayrı izlemek gerekir.',
    manufacturing: 'Üretim maliyetlerini parça parça görmek, tasarruf noktalarını bulmayı kolaylaştırır.',
    healthcare: 'Hasta başına maliyet ve gelir dengesini görmek, planlamayı kolaylaştırır.',
    retail: 'Hangi ürünler daha çok satıyor, hangilerinde stok fazla, bunları takip et.',
    automotive: 'Araç satışı yanında servis geliri de önemli, ikisini birlikte izle.',
    education: 'Öğrenci başına maliyet ve gelir dengesini görmek önemli.',
    other: 'İşletmende en çok para nereye gidiyor, onu görmek ilk adım.'
  };

  const advice = context.sector ? sectorAdvice[context.sector] : sectorAdvice.other;

  // Kontrol sıklığı önerisi (company size'a göre)
  const checkFrequency = context.company_size === '1-10' 
    ? 'Haftada bir' 
    : context.company_size === '11-50' 
      ? 'Haftada iki kez'
      : 'Her gün';

  return `Önerim:
– Önce ${defaultDashboardName} bir göz at
– ${checkFrequency} kontrol et
– Sonra istersen detaylara birlikte geçeriz

💡 ${advice}`;
};

// ==========================================
// ANA KONUŞMA OLUŞTURUCU
// ==========================================

/**
 * Fino'nun tam konuşma metnini oluşturur
 * 4 aşamalı strateji ile ✅ Güncellendi
 */
export const generateFinoMessage = (
  recommendationResult: RecommendationResult
): string => {
  const context: FinoContext = {
    sector: recommendationResult.profile.sector,
    company_size: recommendationResult.profile.company_size,
    primary_goal: recommendationResult.profile.primary_goal,
    financial_maturity: recommendationResult.profile.financial_maturity,
    recommended_dashboards: recommendationResult.recommended_dashboards,
    default_dashboard: recommendationResult.default_dashboard,
    kpi_level: recommendationResult.kpi_level,
    sector_template: recommendationResult.sector_template
  };

  // AŞAMA 1: Tanıdığını göster
  const phase1 = generatePhase1_Recognition(context);

  // AŞAMA 2: Neden bu dashboard'lar
  const phase2 = generatePhase2_Explanation(context);

  // AŞAMA 3: Karmaşıklığı azalt
  const phase3 = generatePhase3_Simplification(context);

  // AŞAMA 4: Mini yol haritası ✅ YENİ
  const phase4 = generatePhase4_MiniRoadmap(context);

  // Fino'nun tam mesajı (4 aşama)
  const finoMessage = `
Merhaba, ben Fino 🐕

Yanıtlarına baktım.
${phase1}

Bu yüzden sana önce:
${phase2}

${phase3}

${phase4}
  `.trim();

  // Yasaklı kelime kontrolü
  const sanitizedMessage = sanitizeForbiddenWords(finoMessage);

  return sanitizedMessage;
};

// ==========================================
// KISA MESAJLAR (Farklı Senaryolar)
// ==========================================

/**
 * Dashboard açıldığında Fino'nun açıklama mesajı
 */
export const generateDashboardWelcome = (
  dashboardName: string,
  context: FinoContext
): string => {
  const templates = [
    `Harika! **${dashboardName}** paneline hoş geldin. Burada en önemli metriklerini görebilirsin. 📊`,
    `Mükemmel seçim! **${dashboardName}** ile işinin nabzını tutacaksın. 💪`,
    `**${dashboardName}** sana çok şey anlatacak. Merak ettiğin bir şey olursa sor! 🔍`
  ];

  // Rastgele bir template seç (veya context'e göre)
  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * KPI açıklama mesajları
 */
export const explainKPI = (
  kpiName: string,
  sector?: SectorType
): string => {
  // Sektöre özgü KPI açıklamaları
  const kpiExplanations: Record<string, string> = {
    'Food Cost %': 'Gıda maliyetinin cironuza oranı. İdeal oran %28-35 arası. 🍽️',
    'Labor Cost %': 'Personel maliyetinin cironuza oranı. İdeal oran %25-35 arası. 👥',
    'ADR': 'Ortalama oda fiyatınız. Yüksek ADR = daha yüksek gelir per oda. 🏨',
    'RevPAR': 'Oda başına gelir. ADR × Doluluk oranı ile hesaplanır. 📊',
    'Nakit Akışı': 'İşletmenize giren ve çıkan paranın dengesi. Pozitif olması önemli! 💰',
    'Kâr Marjı': 'Her 100 TL satıştan kaç TL kâr ediyorsunuz. Yüksek = iyi! 📈'
  };

  return kpiExplanations[kpiName] || `${kpiName} metriği işletmeniz için önemli bir gösterge.`;
};

/**
 * Teşvik mesajları
 */
export const generateEncouragement = (context: FinoContext): string => {
  const encouragements = [
    'İşler iyi gidiyor! Metriklerine düzenli bak, daha da iyileşecek. 💪',
    'Harika bir başlangıç yaptın! Panellerini her gün kontrol etmeyi unutma. 🎯',
    'Data-driven kararlar almaya başladın bile. Süper! 🚀',
    'Finansal sağlığını takip etmen gurur verici. Devam böyle! ⭐'
  ];

  return encouragements[Math.floor(Math.random() * encouragements.length)];
};

// ==========================================
// TON & STİL KURALLARI
// ==========================================

export const FINO_CONVERSATION_RULES = {
  // ✅ YAP
  DO: [
    'Sıcak ve samimi ol',
    '"Sen" dili kullan (sen, sana, senin)',
    'Emojiler kullan (ama fazla kaçırma)',
    'Basit, günlük dil kullan',
    '"Senin ihtiyacına göre" de',
    'Kullanıcıyı tanıdığını göster',
    'Teşvik edici ol',
    'Açıklayıcı ol'
  ],

  // ❌ YAPMA
  DONT: [
    'Teknik jargon kullanma',
    '"Algoritma", "sistem", "model" deme',
    'Resmi/kurumsal dil kullanma',
    'Çok uzun paragraflar yazma',
    'Belirsiz ifadeler kullanma',
    'Negatif dil kullanma'
  ],

  // Emoji Kuralları
  EMOJI_USAGE: {
    financial_success: '💰 📈 💎 ⭐',
    encouragement: '💪 🚀 🎯 ✨',
    sector_specific: '🍽️ 🏨 🏭 🌾 🛒',
    understanding: '👍 😊 🙌',
    celebration: '🎉 🎊 ✅ 🏆'
  }
};

// ==========================================
// YASAKLI KELİME KONTROLÜ ✅ YENİ
// ==========================================

/**
 * Fino'nun ASLA kullanmaması gereken kelimeler
 * Bu kelimeleri daha sıcak alternatiflerle değiştirir
 */
const FORBIDDEN_WORDS: Record<string, string> = {
  // Teknik terimler
  'AI': 'yapay zeka',
  'algoritma': 'hesaplama',
  'model': 'sistem',
  'machine learning': 'öğrenme',
  'optimize': 'iyileştir',
  'optimizasyon': 'iyileştirme',
  'benchmark': 'karşılaştırma',
  'benchmarking': 'kıyaslama',
  'prediction': 'tahmin',
  'anomaly': 'anormallik',
  'implement': 'uygula',
  'deployment': 'yayınlama',
  'automation': 'otomatik',
  
  // Resmi terimler (daha sıcak versiyonlar)
  'müşteri': 'sen',
  'kullanıcı': 'sen',
  'işletmeniz': 'işletmen',
  'şirketiniz': 'şirketin',
  'verileriniz': 'verilerin'
};

/**
 * Yasaklı kelimeleri kontrol eder ve değiştirir
 */
const sanitizeForbiddenWords = (message: string): string => {
  let sanitized = message;
  
  Object.entries(FORBIDDEN_WORDS).forEach(([forbidden, replacement]) => {
    // Case-insensitive replace
    const regex = new RegExp(forbidden, 'gi');
    sanitized = sanitized.replace(regex, replacement);
  });

  // Development modunda uyarı ver
  if (process.env.NODE_ENV === 'development') {
    Object.keys(FORBIDDEN_WORDS).forEach(word => {
      if (message.toLowerCase().includes(word.toLowerCase())) {
        console.warn(`⚠️ Fino: Yasaklı kelime "${word}" bulundu ve "${FORBIDDEN_WORDS[word]}" ile değiştirildi.`);
      }
    });
  }

  return sanitized;
};

/**
 * Fino'nun kullanması gereken samimi kelimeler
 */
export const FINO_FRIENDLY_PHRASES = [
  'bakalım',
  'istersen',
  'şöyle düşünebiliriz',
  'bir göz at',
  'beraber bakalım',
  'kontrol edelim',
  'ne dersin',
  'seninle',
  'birlikte'
];

// ==========================================
// JSON TEMPLATE YAPISI (API/UI için) ✅ YENİ
// ==========================================

export interface FinoMessageTemplate {
  greeting: string;
  phase1_recognition: string;
  phase2_explanation: string;
  phase3_simplification: string;
  phase4_roadmap: string;
  sector_advice: string;
  full_message: string;
}

/**
 * Fino mesajını JSON template formatında döner
 * Frontend için structured data
 */
export const generateFinoMessageTemplate = (
  recommendationResult: RecommendationResult
): FinoMessageTemplate => {
  const context: FinoContext = {
    sector: recommendationResult.profile.sector,
    company_size: recommendationResult.profile.company_size,
    primary_goal: recommendationResult.profile.primary_goal,
    financial_maturity: recommendationResult.profile.financial_maturity,
    recommended_dashboards: recommendationResult.recommended_dashboards,
    default_dashboard: recommendationResult.default_dashboard,
    kpi_level: recommendationResult.kpi_level,
    sector_template: recommendationResult.sector_template
  };

  const phase1 = generatePhase1_Recognition(context);
  const phase2 = generatePhase2_Explanation(context);
  const phase3 = generatePhase3_Simplification(context);
  const phase4 = generatePhase4_MiniRoadmap(context);

  // Sektörel tavsiye çıkar
  const sectorAdviceMatch = phase4.match(/💡 (.*)/);
  const sectorAdvice = sectorAdviceMatch ? sectorAdviceMatch[1] : '';

  return {
    greeting: 'Merhaba, ben Fino 🐕',
    phase1_recognition: phase1,
    phase2_explanation: phase2,
    phase3_simplification: phase3,
    phase4_roadmap: phase4,
    sector_advice: sectorAdvice,
    full_message: sanitizeForbiddenWords(
      `${phase1}\n\n${phase2}\n\n${phase3}\n\n${phase4}`
    )
  };
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Fino mesajını markdown formatında döner
 */
export const formatFinoMessageAsMarkdown = (message: string): string => {
  return message
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n\n');
};

/**
 * Debug için mesajı console'a yazdır
 */
export const debugFinoMessage = (context: FinoContext, message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.group('🐕 Fino Message Generated');
    console.log('Context:', context);
    console.log('Message:', message);
    console.groupEnd();
  }
};

