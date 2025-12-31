# 🐕 Fino AI Chat - Dokümantasyon

## Genel Bakış

Fino, FinOps AI Studio'nun yapay zeka destekli chat asistanıdır. Kullanıcılara platform hakkında bilgi verir, soruları cevaplar ve yönlendirme yapar.

**Durum:** ✅ Aktif ve Çalışıyor (31 Aralık 2024)

---

## Özellikler

### ✅ Tamamlanan Özellikler

1. **RAG (Retrieval-Augmented Generation) Sistemi**
   - Knowledge Base ile entegre
   - Keyword-based search
   - Context extraction
   - 4 ana KB dokümanı

2. **OpenAI GPT-4 Turbo Entegrasyonu**
   - Akıllı yanıt üretimi
   - Kısa ve öz cevaplar (max 3-4 cümle)
   - Türkçe & İngilizce destek
   - Samimi ve dostça ton

3. **Güvenlik & Rate Limiting**
   - 10 mesaj / dakika limiti
   - Input validasyonu (max 500 karakter)
   - Spam koruması
   - URL engelleme

4. **State Management**
   - Conversation history
   - localStorage persistence
   - Auto-scroll
   - Conversation starters

5. **Loglama & Analytics**
   - User message tracking
   - AI response logging
   - Error tracking
   - Analytics dashboard ready

6. **UI/UX**
   - Modern gradient design
   - Typing indicators
   - User/AI message differentiation
   - Mobile responsive
   - Emoji support
   - "Geçmişi Temizle" özelliği

7. **i18n**
   - Türkçe & İngilizce
   - Translation ready
   - Dynamic language switching

---

## Teknik Mimari

### 📁 Dosya Yapısı

```
src/
├── components/
│   └── FinoChatWidget.tsx          # Main chat component
├── services/
│   └── finoRagService.ts           # RAG & OpenAI integration
├── utils/
│   ├── rateLimiter.ts              # Rate limiting & validation
│   └── finoLogger.ts               # Logging system
├── types/
│   └── fino.ts                     # TypeScript definitions
data/
└── fino-kb/                        # Knowledge Base (source)
    ├── index.json
    ├── product.md
    ├── pricing.md
    ├── faq.md
    └── sectors.md
public/
└── data/
    └── fino-kb/                    # KB (deployed)
        ├── product.md
        ├── pricing.md
        ├── faq.md
        └── sectors.md
```

### 🔄 İşleyiş Akışı

```
1. User sends message
   ↓
2. Input validation (max 500 chars, no spam)
   ↓
3. Rate limit check (10 msg/min)
   ↓
4. Load Knowledge Base (4 documents)
   ↓
5. Keyword search → Find relevant docs
   ↓
6. Extract relevant sections
   ↓
7. Build context (max 1500 chars)
   ↓
8. Send to OpenAI GPT-4 Turbo
   ↓
9. Generate response (max 300 tokens)
   ↓
10. Log everything
   ↓
11. Display to user
```

---

## Knowledge Base

### 📚 KB Dokümanları

| ID | Dosya | İçerik | Priority |
|---|---|---|---|
| `product` | `product.md` | Platform özellikleri, modüller, teknik stack | 1 |
| `pricing` | `pricing.md` | Planlar, fiyatlar, beta partner programı | 2 |
| `faq` | `faq.md` | SSS, güvenlik, kullanım, destek | 3 |
| `sectors` | `sectors.md` | Sektörel çözümler (üretim, restoran, tarım...) | 2 |

### 🔍 Search Algoritması

**Keyword-based search:**
- Title match: +10 puan
- Keyword match: +5 puan
- Description match: +3 puan
- Priority boost: x(4-priority)

**Top 2 document** seçilir ve context olarak kullanılır.

### ✂️ Context Extraction

- İlgili section'lar bulunur
- Max 1500 karakter (per document)
- Header'lar korunur
- Uzun içerik kesilir: `...`

---

## OpenAI Integration

### 🤖 Model: GPT-4 Turbo Preview

**Parameters:**
```javascript
{
  model: 'gpt-4-turbo-preview',
  temperature: 0.7,
  max_tokens: 300,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0.3
}
```

### 💬 System Prompt

```
Sen Fino, FinOps AI Studio'nun yardımcı ve samimi AI asistanısın. 🐕

KURALLAR:
1. Kısa ve öz cevap ver (max 3-4 cümle)
2. Samimi ve dostça ol
3. Sadece CONTEXT bilgisini kullan
4. CONTEXT'te yoksa: "Bu konuda detaylı bilgim yok, /contact sayfasından sorabilirsin"
5. Linkler: [Sayfa Adı](/url)
6. Emoji kullan ama abartma (max 2-3)
7. Türkçe karakter kullan
8. "Ben bir AI'yım" deme, direkt yardım et
```

### 🔑 API Key

**Environment Variable:** `VITE_OPENAI_API_KEY`

**Fallback:** API key yoksa kullanıcıya bilgi verilir:
```
"Üzgünüm, şu anda AI özelliği aktif değil. 
Lütfen /contact sayfasından bizimle iletişime geçin."
```

---

## Güvenlik

### 🛡️ Rate Limiting

**Limit:** 10 mesaj / 60 saniye

**Client-side implementation:**
- `Map<string, RateLimitRecord>`
- Session-based tracking
- Auto cleanup (5 dakikada bir)

**Error message:**
```
⏰ Çok fazla mesaj gönderdin! Lütfen X saniye bekle.
```

### ✅ Input Validation

**Kontroller:**
1. Boş mesaj ❌
2. Max 500 karakter ❌
3. Tekrarlayan karakterler (10+) ❌
4. ALL CAPS (50+ chars) ❌
5. URL'ler ❌

**Error messages:**
- `❌ Mesaj boş olamaz`
- `❌ Mesaj çok uzun (max 500 karakter)`
- `❌ Geçersiz mesaj formatı`

---

## Loglama

### 📊 Log Types

| Type | Açıklama |
|---|---|
| `user_message` | Kullanıcı mesajı |
| `ai_response` | AI yanıtı + metadata |
| `error` | Hata mesajları |
| `rate_limit` | Rate limit hit |
| `validation_error` | Validation hataları |

### 💾 Storage

**localStorage:** `fino-logs`

**Retention:** 7 gün

**Max logs in memory:** 100

### 📈 Analytics

```typescript
{
  totalMessages: number,
  totalConversations: number,
  averageMessagesPerSession: number,
  errorRate: number,
  commonQueries: string[]
}
```

**Erişim:**
```javascript
import finoLogger from '@/utils/finoLogger';
const analytics = finoLogger.getAnalytics();
```

---

## State Management

### 💾 localStorage Keys

| Key | İçerik |
|---|---|
| `fino-chat-history` | Conversation history |
| `fino-session-id` | Session ID |
| `fino-logs` | Logs |

### 🔄 Conversation History

**Format:**
```typescript
{
  conversations: ChatMessage[],
  lastUpdated: number
}
```

**ChatMessage:**
```typescript
{
  role: 'user' | 'ai',
  text: string,
  timestamp: number
}
```

**Auto-save:** Her mesajdan sonra

**Load:** Component mount'ta

---

## UI/UX

### 🎨 Design

**Renk Paleti:**
- Primary: Orange-400 → Amber-500 gradient
- Background: Gray-50
- Text: Gray-800
- Border: Gray-200

**Boyutlar:**
- Widget: 96px (w) x 80px (h)
- Chat Window: 384px (w) x 560px (h)
- Input: Full width, auto height

### 🐕 Fino Karakteri

- **Emoji:** 🐕
- **Kişilik:** Samimi, yardımsever, enerjik
- **Ton:** Profesyonel ama dostça
- **Emoji kullanımı:** Dengeli (2-3 per message)

### 💡 Conversation Starters

```javascript
[
  "FinOps AI Studio nedir?",
  "Fiyatlar ne kadar?",
  "Beta Partner nasıl olurum?",
  "Hangi sektörler için çözüm var?",
  "Verilerim güvende mi?"
]
```

**Görünüm:** İlk 2 mesajdan sonra

**Click:** Otomatik gönderim

---

## Deployment

### ✅ Production Checklist

- [x] OpenAI API Key env variable
- [x] KB files in `/public/data/fino-kb/`
- [x] Rate limiting active
- [x] Logging enabled
- [x] i18n configured
- [x] Error handling
- [x] Mobile responsive

### 🔧 Environment Variables

```bash
# .env.local
VITE_OPENAI_API_KEY=sk-...
```

**Vercel:**
Settings → Environment Variables → Add

---

## Testing

### ✅ Test Scenarios

1. **Normal Conversation**
   - ✅ User sends message
   - ✅ AI responds
   - ✅ History saved
   - ✅ Auto-scroll works

2. **Rate Limiting**
   - ✅ 10+ messages → Error
   - ✅ Wait time shown
   - ✅ Reset after timeout

3. **Validation**
   - ✅ Empty message → Error
   - ✅ 500+ chars → Error
   - ✅ Spam patterns → Error

4. **Knowledge Base**
   - ✅ Product question → Correct answer
   - ✅ Pricing question → Correct answer
   - ✅ FAQ question → Correct answer
   - ✅ Unknown question → Fallback

5. **Error Handling**
   - ✅ No API key → Fallback message
   - ✅ API error → Error message
   - ✅ Network error → Error message

6. **Persistence**
   - ✅ Close/reopen → History loaded
   - ✅ Clear history → Reset
   - ✅ Logs saved

---

## Maintenance

### 🔄 KB Güncelleme

1. Edit: `/data/fino-kb/*.md`
2. Copy: `/public/data/fino-kb/*.md`
3. Update: `index.json` (if new file)
4. Deploy

### 📊 Analytics İnceleme

```javascript
// Browser console
const analytics = finoLogger.getAnalytics();
console.log(analytics);
```

### 🧹 Log Temizleme

```javascript
// Programmatic
finoLogger.clearLogs();

// User action
"Geçmişi Temizle" button
```

### 🐛 Debug Mode

```javascript
// Enable in finoLogger.ts
if (import.meta.env.DEV) {
  console.error('[Fino Error]', error, metadata);
}
```

---

## Gelecek Geliştirmeler

### 🚀 Faz-2 (Planlanıyor)

- [ ] Vector embedding (Pinecone/Weaviate)
- [ ] Semantic search
- [ ] Multi-turn context memory
- [ ] Suggested actions
- [ ] File attachment support
- [ ] Voice input
- [ ] Analytics dashboard
- [ ] A/B testing
- [ ] Sentiment analysis

---

## Sorun Giderme

### ❌ "AI özelliği aktif değil" Hatası

**Çözüm:** OpenAI API Key ekle
```bash
VITE_OPENAI_API_KEY=sk-...
```

### ❌ KB Yüklenmedi

**Çözüm:** KB files `/public/data/fino-kb/` altında mı kontrol et

### ❌ Rate Limit Çalışmıyor

**Çözüm:** Browser cache temizle, sessionStorage clear

### ❌ Logs Doldu

**Çözüm:** `finoLogger.clearLogs()` veya localStorage temizle

---

## İletişim

**Geliştirici:** Claude (AI Assistant)  
**Tarih:** 31 Aralık 2024  
**Proje:** FinOps AI Studio  
**GitHub:** https://github.com/ZaferYuzucu/finops-ai-studio

---

**Son Güncelleme:** 31 Aralık 2024, 15:45  
**Versiyon:** 1.0.0  
**Durum:** ✅ Production Ready

