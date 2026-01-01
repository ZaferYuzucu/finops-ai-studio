/**
 * Fino RAG (Retrieval-Augmented Generation) Service
 * 
 * Basit keyword-based search sistemi
 * OpenAI API ile entegre
 */

import type { ChatMessage, KnowledgeDocument } from '../types/fino';
import finoLogger from '../utils/finoLogger';

// Knowledge Base index
const KB_INDEX = {
  version: "1.0",
  lastUpdated: "2024-12-31",
  documents: [
    {
      id: "product",
      title: "Ürün Özellikleri",
      description: "FinOps AI Studio platform özellikleri ve modülleri",
      category: "product",
      keywords: ["dashboard", "excel", "csv", "ai", "yapay zeka", "modül", "özellik", "finops theatre", "karar kartları"],
      priority: 1,
      content: "" // Will be loaded dynamically
    },
    {
      id: "pricing",
      title: "Fiyatlandırma",
      description: "Planlar, fiyatlar, beta partner programı",
      category: "pricing",
      keywords: ["fiyat", "plan", "ödeme", "beta", "partner", "lansman", "ücretsiz", "deneme", "kredi kartı"],
      priority: 2,
      content: ""
    },
    {
      id: "faq",
      title: "Sıkça Sorulan Sorular",
      description: "Genel sorular, veri güvenliği, özellikler, destek",
      category: "support",
      keywords: ["sss", "faq", "soru", "güvenlik", "veri", "nasıl", "destek", "yardım"],
      priority: 3,
      content: ""
    },
    {
      id: "sectors",
      title: "Sektörel Çözümler",
      description: "Üretim, restoran, tarım, e-ticaret için özel çözümler",
      category: "solutions",
      keywords: ["sektör", "üretim", "restoran", "tarım", "e-ticaret", "insan kaynakları", "otel", "finans", "satış"],
      priority: 2,
      content: ""
    }
  ]
};

// Cache for loaded documents
let documentsCache: Map<string, string> | null = null;

/**
 * Load all KB documents from public/data
 */
async function loadKnowledgeBase(): Promise<Map<string, string>> {
  if (documentsCache) {
    return documentsCache;
  }

  const cache = new Map<string, string>();

  try {
    // Load each document
    for (const doc of KB_INDEX.documents) {
      try {
        const response = await fetch(`/data/fino-kb/${doc.id}.md`);
        if (response.ok) {
          const content = await response.text();
          cache.set(doc.id, content);
        }
      } catch (error) {
        console.warn(`Failed to load KB document: ${doc.id}`, error);
      }
    }

    documentsCache = cache;
    return cache;
  } catch (error) {
    console.error('Failed to load knowledge base:', error);
    return new Map();
  }
}

/**
 * Simple keyword-based search
 */
function searchKeywords(query: string, documents: typeof KB_INDEX.documents): KnowledgeDocument[] {
  const queryLower = query.toLowerCase()
    .replace(/[ğ]/g, 'g')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ç]/g, 'c');

  const results: Array<{ doc: typeof documents[0], score: number }> = [];

  for (const doc of documents) {
    let score = 0;

    // Check title match
    const titleLower = doc.title.toLowerCase();
    if (titleLower.includes(queryLower) || queryLower.includes(titleLower)) {
      score += 10;
    }

    // Check keyword matches
    for (const keyword of doc.keywords) {
      const keywordLower = keyword.toLowerCase();
      if (queryLower.includes(keywordLower) || keywordLower.includes(queryLower)) {
        score += 5;
      }
    }

    // Check description match
    const descLower = doc.description.toLowerCase();
    if (descLower.includes(queryLower)) {
      score += 3;
    }

    // Boost priority docs
    score *= (4 - doc.priority); // Priority 1 = 3x, Priority 3 = 1x

    if (score > 0) {
      results.push({ doc, score });
    }
  }

  // Sort by score
  results.sort((a, b) => b.score - a.score);

  // Return top 2 documents
  return results.slice(0, 2).map(r => ({
    id: r.doc.id,
    title: r.doc.title,
    description: r.doc.description,
    category: r.doc.category,
    keywords: r.doc.keywords,
    priority: r.doc.priority,
    content: ''
  }));
}

/**
 * Extract relevant sections from document content
 */
function extractRelevantSections(content: string, query: string, maxLength: number = 1500): string {
  const lines = content.split('\n');
  const queryLower = query.toLowerCase();
  const relevantSections: string[] = [];
  let currentSection: string[] = [];
  let currentSectionRelevance = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineLower = line.toLowerCase();

    // Check if this is a header
    if (line.startsWith('#')) {
      // Save previous section if relevant
      if (currentSectionRelevance > 0 && currentSection.length > 0) {
        relevantSections.push(currentSection.join('\n'));
      }

      // Start new section
      currentSection = [line];
      currentSectionRelevance = 0;

      // Check header relevance
      if (lineLower.includes(queryLower)) {
        currentSectionRelevance += 10;
      }
    } else {
      currentSection.push(line);

      // Check line relevance
      if (lineLower.includes(queryLower)) {
        currentSectionRelevance += 2;
      }
    }
  }

  // Save last section
  if (currentSectionRelevance > 0 && currentSection.length > 0) {
    relevantSections.push(currentSection.join('\n'));
  }

  // If no relevant sections, return first part of document
  if (relevantSections.length === 0) {
    return lines.slice(0, 30).join('\n');
  }

  // Join sections and limit length
  let result = relevantSections.join('\n\n');
  if (result.length > maxLength) {
    result = result.substring(0, maxLength) + '...';
  }

  return result;
}

/**
 * Generate AI response using server-side API
 */
async function generateResponse(
  userQuery: string,
  context: string,
  conversationHistory: ChatMessage[]
): Promise<string> {
  try {
    // Prepare history for API
    const history = conversationHistory.slice(-4).map(msg => ({
      role: msg.role === 'ai' ? 'assistant' : 'user',
      content: msg.text
    }));

    // Call server-side API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userQuery,
        context,
        history
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Fino] API error:', response.status, errorData);
      throw new Error(errorData.error || 'API request failed');
    }

    const data = await response.json();
    return data.message || "Üzgünüm, bir hata oluştu.";

  } catch (error) {
    console.error('[Fino] Error calling API:', error);
    return "Üzgünüm, şu anda bir sorun yaşıyorum. Lütfen daha sonra tekrar dene 🐕";
  }
}

/**
 * Check for special 2026 New Year questions
 */
function check2026Question(message: string): string | null {
  const messageLower = message.toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

  // 2026 beklenti soruları
  const patterns2026 = [
    /2026.*beklenti/,
    /2026.*ne.*dusun/,
    /2026.*ne.*bekl/,
    /2026.*icin.*ne/,
    /2026.*hakkinda/,
    /yeni.*yil.*beklenti/,
    /yeni.*yil.*ne.*dusun/,
    /yeni.*yildan.*ne.*bekl/
  ];

  for (const pattern of patterns2026) {
    if (pattern.test(messageLower)) {
      return "🎉 2026 yılında sizlerle çalışmaktan büyük keyif alacağım! Sizleri daha kârlı yapmak beni çok mutlu eder. 💪\n\nBirlikte daha akıllı kararlar alacak, Excel'deki verilerinizi güçlü analizlere dönüştürecek ve işinizi büyüteceğiz! 🚀\n\nHep yanınızdayım! 🐾";
    }
  }

  return null;
}

/**
 * Main chat function
 */
export async function processFinoChat(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  try {
    // Log user message
    finoLogger.logUserMessage(userMessage);

    // Check for special 2026 questions first
    const special2026Answer = check2026Question(userMessage);
    if (special2026Answer) {
      finoLogger.logAiResponse(special2026Answer, { special: '2026-greeting' });
      return special2026Answer;
    }

    // Load knowledge base
    const kbCache = await loadKnowledgeBase();

    // Search for relevant documents
    const relevantDocs = searchKeywords(userMessage, KB_INDEX.documents);

    // Extract context from relevant documents
    let context = '';
    for (const doc of relevantDocs) {
      const content = kbCache.get(doc.id);
      if (content) {
        const relevantSection = extractRelevantSections(content, userMessage);
        context += `\n\n# ${doc.title}\n${relevantSection}`;
      }
    }

    // If no relevant context found, use general info
    if (!context.trim()) {
      context = `FinOps AI Studio, KOBİ'ler için yapay zeka destekli finansal karar platformudur.
Ana özellikler: Dashboard oluşturma, Excel/CSV yükleme, AI analiz, Karar Kartları.
Daha fazla bilgi için /dashboards ve /pricing sayfalarını ziyaret edebilirsin.`;
    }

    // Generate AI response
    const response = await generateResponse(userMessage, context, conversationHistory);

    // Log AI response
    finoLogger.logAiResponse(response, {
      relevantDocs: relevantDocs.map(d => d.id),
      contextLength: context.length
    });

    return response;

  } catch (error) {
    console.error('Fino chat error:', error);
    finoLogger.logError('Chat processing error', { error: String(error) });
    return "Hoppala! Bir sorun oluştu 🐕 Lütfen tekrar dener misin?";
  }
}

/**
 * Get conversation starters
 */
export function getConversationStarters(): string[] {
  return [
    "FinOps AI Studio nedir?",
    "Fiyatlar ne kadar?",
    "Beta Partner nasıl olurum?",
    "Hangi sektörler için çözüm var?",
    "Verilerim güvende mi?"
  ];
}

