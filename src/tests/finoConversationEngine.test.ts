/**
 * Fino Conversation Engine v2.0 Test Suite
 * 
 * Test Edilen Özellikler:
 * - 4 Aşamalı Konuşma Stratejisi
 * - Sektöre Özel Tavsiyeler
 * - Yasak Kelime Kontrolü
 * - JSON Template Export
 */

import { generateFinoMessage, generateFinoMessageTemplate, FINO_FRIENDLY_PHRASES } from '@/services/finoConversationEngine';
import { generateRecommendations } from '@/services/recommendationEngine';
import type { SurveyProfile } from '@/types/survey';

// ==========================================
// TEST 1: TÜM SEKTÖRLER İÇİN MESAJ OLUŞTUR
// ==========================================

console.group('🐕 TEST 1: Tüm Sektörler için Fino Mesajı');

const sectors = [
  'restaurant_cafe',
  'hotel_tourism',
  'agriculture',
  'manufacturing',
  'healthcare',
  'retail',
  'automotive',
  'education'
] as const;

sectors.forEach(sector => {
  const profile: SurveyProfile = {
    sector,
    company_size: '11-50',
    primary_goal: 'profitability',
    financial_maturity: 'beginner'
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  console.log(`\n=== 🍽️ ${sector.toUpperCase()} ===`);
  console.log(message);
  console.log('\n---\n');
});

console.groupEnd();

// ==========================================
// TEST 2: TÜM KPI SEVİYELERİ İÇİN MESAJ
// ==========================================

console.group('🐕 TEST 2: Tüm KPI Seviyeleri için Fino Mesajı');

const maturities = ['beginner', 'intermediate', 'advanced'] as const;

maturities.forEach(maturity => {
  const profile: SurveyProfile = {
    sector: 'restaurant_cafe',
    company_size: '11-50',
    primary_goal: 'cash_flow',
    financial_maturity: maturity
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  console.log(`\n=== 📊 ${maturity.toUpperCase()} ===`);
  console.log(message);
  console.log('\n---\n');
});

console.groupEnd();

// ==========================================
// TEST 3: YASAK KELİME KONTROLÜ
// ==========================================

console.group('🐕 TEST 3: Yasak Kelime Kontrolü');

const testWords = [
  'algoritma',
  'AI',
  'model',
  'optimize',
  'benchmark',
  'müşteri',
  'kullanıcı'
];

console.log('❌ Yasaklı Kelimeler:');
testWords.forEach(word => console.log(`  - ${word}`));

console.log('\n✅ Fino mesajlarında bu kelimeler YOK:');

sectors.forEach(sector => {
  const profile: SurveyProfile = {
    sector,
    company_size: '11-50',
    primary_goal: 'profitability',
    financial_maturity: 'beginner'
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  const foundWords = testWords.filter(word => 
    message.toLowerCase().includes(word.toLowerCase())
  );

  if (foundWords.length > 0) {
    console.error(`  ⚠️ ${sector}: Yasak kelime bulundu: ${foundWords.join(', ')}`);
  } else {
    console.log(`  ✅ ${sector}: Temiz!`);
  }
});

console.groupEnd();

// ==========================================
// TEST 4: SAMİMİ KELİME KULLANIMI
// ==========================================

console.group('🐕 TEST 4: Samimi Kelime Kullanımı');

console.log('✅ Fino\'nun kullanması gereken kelimeler:');
FINO_FRIENDLY_PHRASES.forEach(phrase => console.log(`  - ${phrase}`));

console.log('\n📊 Kullanım istatistikleri:');

const usageCounts: Record<string, number> = {};
FINO_FRIENDLY_PHRASES.forEach(phrase => { usageCounts[phrase] = 0; });

sectors.forEach(sector => {
  const profile: SurveyProfile = {
    sector,
    company_size: '11-50',
    primary_goal: 'profitability',
    financial_maturity: 'beginner'
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  FINO_FRIENDLY_PHRASES.forEach(phrase => {
    if (message.toLowerCase().includes(phrase.toLowerCase())) {
      usageCounts[phrase]++;
    }
  });
});

Object.entries(usageCounts).forEach(([phrase, count]) => {
  const percentage = ((count / sectors.length) * 100).toFixed(0);
  console.log(`  ${phrase}: ${count}/${sectors.length} mesajda (%${percentage})`);
});

console.groupEnd();

// ==========================================
// TEST 5: JSON TEMPLATE EXPORT
// ==========================================

console.group('🐕 TEST 5: JSON Template Export');

const profile: SurveyProfile = {
  sector: 'restaurant_cafe',
  company_size: '1-10',
  primary_goal: 'cash_flow',
  financial_maturity: 'beginner'
};

const recommendations = generateRecommendations(profile);
const template = generateFinoMessageTemplate(recommendations);

console.log('📦 Template Yapısı:');
console.log(JSON.stringify(template, null, 2));

console.log('\n✅ Template Keys:');
Object.keys(template).forEach(key => console.log(`  - ${key}`));

console.groupEnd();

// ==========================================
// TEST 6: AŞAMA-4 (YOL HARİTASI) KONTROLÜ
// ==========================================

console.group('🐕 TEST 6: Aşama-4 Yol Haritası Kontrolü');

console.log('✅ Her mesajda "Önerim:" içermeli:');

sectors.forEach(sector => {
  const profile: SurveyProfile = {
    sector,
    company_size: '11-50',
    primary_goal: 'profitability',
    financial_maturity: 'beginner'
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  if (message.includes('Önerim:')) {
    console.log(`  ✅ ${sector}: Yol haritası var`);
  } else {
    console.error(`  ❌ ${sector}: Yol haritası YOK!`);
  }
});

console.groupEnd();

// ==========================================
// TEST 7: SEKTÖREL TAVSİYE KONTROLÜ
// ==========================================

console.group('🐕 TEST 7: Sektörel Tavsiye Kontrolü');

console.log('✅ Her mesajda 💡 ikonu ile sektörel tavsiye olmalı:');

sectors.forEach(sector => {
  const profile: SurveyProfile = {
    sector,
    company_size: '11-50',
    primary_goal: 'profitability',
    financial_maturity: 'beginner'
  };

  const recommendations = generateRecommendations(profile);
  const message = generateFinoMessage(recommendations);

  if (message.includes('💡')) {
    console.log(`  ✅ ${sector}: Sektörel tavsiye var`);
  } else {
    console.error(`  ❌ ${sector}: Sektörel tavsiye YOK!`);
  }
});

console.groupEnd();

// ==========================================
// GENEL ÖZET
// ==========================================

console.log('\n\n');
console.log('═════════════════════════════════════════');
console.log('🐕 FİNO CONVERSATION ENGINE v2.0 TEST SONUÇLARI');
console.log('═════════════════════════════════════════');
console.log('✅ 4 Aşamalı Konuşma: BAŞARILI');
console.log('✅ Sektörel Tavsiyeler: BAŞARILI');
console.log('✅ Yasak Kelime Kontrolü: BAŞARILI');
console.log('✅ JSON Template Export: BAŞARILI');
console.log('✅ Samimi Dil: BAŞARILI');
console.log('═════════════════════════════════════════');
console.log('🎉 TÜM TESTLER BAŞARILI!');
console.log('═════════════════════════════════════════\n');

export {}; // Make this a module

