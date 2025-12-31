/**
 * Fino Chat API Route
 * Server-side OpenAI integration for security
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ChatRequest {
  message: string;
  context: string;
  history: Array<{ role: string; content: string }>;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context, history } = req.body as ChatRequest;

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    // Check API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('[Fino API] OpenAI API key not found');
      return res.status(500).json({ 
        error: 'AI servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.' 
      });
    }

    // Build messages for OpenAI
    const systemPrompt = `Sen Fino, FinOps AI Studio'nun yardımcı ve samimi AI asistanısın. 🐕

Görevin: Kullanıcılara FinOps AI Studio hakkında yardımcı olmak.

KURALLAR:
1. Kısa ve öz cevap ver (max 3-4 cümle)
2. Samimi ve dostça ol
3. Sadece verilen CONTEXT bilgisini kullan
4. CONTEXT'te yoksa: "Bu konuda detaylı bilgim yok, /contact sayfasından sorabilirsin"
5. Linkler verirken: [Sayfa Adı](/url) formatını kullan
6. Emoji kullan ama abartma (max 2-3)
7. Türkçe karakter kullan
8. "Ben bir AI'yım" deme, direkt yardım et

CONTEXT:
${context || 'FinOps AI Studio, KOBİ\'ler için yapay zeka destekli finansal karar platformudur.'}

Şimdi kullanıcıya yardım et!`;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-4),
      { role: 'user', content: message }
    ];

    // Call OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[Fino API] OpenAI error:', errorData);
      return res.status(500).json({ 
        error: 'Bir hata oluştu. Lütfen tekrar deneyin.' 
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content || 'Üzgünüm, bir hata oluştu.';

    return res.status(200).json({ 
      message: aiMessage,
      success: true 
    });

  } catch (error) {
    console.error('[Fino API] Server error:', error);
    return res.status(500).json({ 
      error: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' 
    });
  }
}

