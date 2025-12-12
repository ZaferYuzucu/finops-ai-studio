import React from 'react';

const BusinessPlanPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4 text-sm text-slate-200">
      <h1 className="text-2xl font-semibold text-slate-50">Business Plan</h1>
      <p className="text-slate-300">
        Buraya PDF&apos;ten dönüştürdüğümüz iş planının özet versiyonu
        yerleştirilebilir. Şimdilik placeholder bir içerik gösteriyoruz.
      </p>
      <ul className="list-disc pl-5 space-y-1 text-[13px]">
        <li>Hedef müşteri: Türkiye ve bölgedeki KOBİ&apos;ler</li>
        <li>Çözüm: AI destekli finans &amp; operasyon yönetimi platformu</li>
        <li>Gelir modeli: Abonelik bazlı SaaS + danışmanlık</li>
      </ul>
    </div>
  );
};

export default BusinessPlanPage;
