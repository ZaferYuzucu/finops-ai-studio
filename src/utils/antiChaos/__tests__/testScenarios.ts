/**
 * 🧪 TEST SCENARIOS - Anti-Chaos System
 * 
 * 5 kritik test senaryosu:
 * 1) TR CSV (; ,)
 * 2) EN CSV (, .)
 * 3) Bozuk numeric
 * 4) Refresh sonrası devam
 * 5) Farklı cihazdan login
 */

import { runAntiChaosPipeline } from '../index';
import { ShieldedCSVData } from '../inputShield';

/**
 * Senaryo 1: TR CSV (noktalı virgül delimiter, Türkçe decimal)
 */
export const TR_CSV_SAMPLE = `Tarih;Gelir;Gider;Kar
2024-01-01;1.234,56;987,65;246,91
2024-01-02;1.456,78;1.023,45;433,33
2024-01-03;1.789,12;1.234,56;554,56`;

/**
 * Senaryo 2: EN CSV (virgül delimiter, İngilizce decimal)
 */
export const EN_CSV_SAMPLE = `Date,Revenue,Expense,Profit
2024-01-01,1234.56,987.65,246.91
2024-01-02,1456.78,1023.45,433.33
2024-01-03,1789.12,1234.56,554.56`;

/**
 * Senaryo 3: Bozuk numeric (belirsiz sütunlar)
 */
export const BROKEN_NUMERIC_SAMPLE = `Date,Amount,Notes
2024-01-01,1234.56,Payment
2024-01-02,ABC123,Invalid
2024-01-03,567.89,OK
2024-01-04,N/A,Missing`;

/**
 * Senaryo 4: UTF-8 BOM ile CSV
 */
export const BOM_CSV_SAMPLE = `\uFEFFTarih,Gelir,Gider
2024-01-01,1000,500
2024-01-02,1200,600`;

/**
 * Senaryo 5: Boş ve eksik veriler
 */
export const EMPTY_DATA_SAMPLE = `Date,Revenue,Expense
2024-01-01,1000,
2024-01-02,,500
2024-01-03,1200,600`;

/**
 * Test helper: Senaryoyu çalıştır ve sonuçları kontrol et
 */
export async function runTestScenario(
  scenarioName: string,
  csvContent: string
): Promise<{
  success: boolean;
  confidenceScore?: number;
  warnings: string[];
  errors?: string[];
  riskFlags?: string[];
}> {
  console.group(`🧪 Test Senaryosu: ${scenarioName}`);
  
  try {
    const result = await runAntiChaosPipeline(csvContent);
    
    if (result.success) {
      console.log('✅ Başarılı');
      console.log('Confidence Score:', result.diagnosis?.confidenceScore);
      console.log('Risk Flags:', result.diagnosis?.riskFlags.length);
      console.log('Warnings:', result.warnings.length);
      
      return {
        success: true,
        confidenceScore: result.diagnosis?.confidenceScore,
        warnings: result.warnings,
        riskFlags: result.diagnosis?.riskFlags.map(f => f.code),
      };
    } else {
      console.log('❌ Başarısız');
      console.log('Error:', result.error?.message);
      
      return {
        success: false,
        warnings: result.warnings,
        errors: [result.error?.message || 'Bilinmeyen hata'],
      };
    }
  } catch (error) {
    console.error('❌ Test hatası:', error);
    return {
      success: false,
      warnings: [],
      errors: [error instanceof Error ? error.message : 'Bilinmeyen hata'],
    };
  } finally {
    console.groupEnd();
  }
}

/**
 * Tüm senaryoları çalıştır
 */
export async function runAllTestScenarios(): Promise<void> {
  console.log('🚀 Tüm test senaryoları başlatılıyor...\n');
  
  const scenarios = [
    { name: 'TR CSV (; ,)', content: TR_CSV_SAMPLE },
    { name: 'EN CSV (, .)', content: EN_CSV_SAMPLE },
    { name: 'Bozuk Numeric', content: BROKEN_NUMERIC_SAMPLE },
    { name: 'BOM CSV', content: BOM_CSV_SAMPLE },
    { name: 'Boş Veriler', content: EMPTY_DATA_SAMPLE },
  ];
  
  const results = [];
  
  for (const scenario of scenarios) {
    const result = await runTestScenario(scenario.name, scenario.content);
    results.push({ scenario: scenario.name, ...result });
  }
  
  // Özet
  console.log('\n📊 TEST SONUÇLARI ÖZETİ');
  console.log('='.repeat(50));
  
  results.forEach((result, index) => {
    const status = result.success ? '✅' : '❌';
    const confidence = result.confidenceScore 
      ? ` (Confidence: ${(result.confidenceScore * 100).toFixed(0)}%)`
      : '';
    console.log(`${index + 1}. ${status} ${result.scenario}${confidence}`);
    
    if (result.warnings && result.warnings.length > 0) {
      console.log(`   ⚠️  Uyarılar: ${result.warnings.length}`);
    }
    
    if (result.riskFlags && result.riskFlags.length > 0) {
      console.log(`   🚩 Risk Flags: ${result.riskFlags.join(', ')}`);
    }
  });
  
  const successCount = results.filter(r => r.success).length;
  const totalCount = results.length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`Toplam: ${successCount}/${totalCount} başarılı`);
  
  if (successCount === totalCount) {
    console.log('🎉 Tüm testler başarılı!');
  } else {
    console.log('⚠️  Bazı testler başarısız. Lütfen kontrol edin.');
  }
}

// Browser console'da çalıştırmak için
if (typeof window !== 'undefined') {
  (window as any).runAntiChaosTests = runAllTestScenarios;
}
