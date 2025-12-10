import React from 'react';
import FlowAnimation from '../components/FlowAnimation';

const steps = [
  '1. Veri toplama: ERP, POS, banka ve Excel kaynakları bağlanır.',
  '2. Veri temizleme: Tekrarlanan ve hatalı kayıtlar ayıklanır.',
  '3. Veri modelleme: Maliyet, kârlılık, bütçe ve nakit akışı modelleri kurulur.',
  '4. Dashboard üretimi: Rol bazlı yönetim panelleri oluşturulur.',
  '5. AI katmanı: Soru-cevap, tahmin ve anomali tespiti devreye alınır.'
];

const FlowPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold text-slate-50">
          FINOPS AI Studio Nasıl Çalışır?
        </h1>
        <p className="text-sm text-slate-300">
          Veri kaynaklarını tek hatta toplayan akıllı bir veri hattı ve üzerine
          kurulu AI katmanı ile çalışır.
        </p>
      </div>
<img
  src="/brand/finops-logo-light.png"
  className="h-12 w-auto opacity-70"
  alt="Flow Logo"
/>
      <FlowAnimation />

      <div className="grid gap-3 md:grid-cols-5 text-[11px] text-slate-300">
        {steps.map((s) => (
          <div
            key={s}
            className="rounded-2xl border border-slate-800 bg-slate-950/70 p-3"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowPage;
