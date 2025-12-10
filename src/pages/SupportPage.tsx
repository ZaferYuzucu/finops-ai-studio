import React from 'react';

const SupportPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4 text-sm text-slate-200">
      <h1 className="text-2xl font-semibold text-slate-50">Destek</h1>
      <p className="text-slate-300">
        Teknik destek, onboarding ve eğitim talepleriniz için aşağıdaki
        kanallardan bize ulaşabilirsiniz. (Şimdilik placeholder.)
      </p>
      <ul className="list-disc pl-5 space-y-1 text-[13px]">
        <li>E-posta: support@finops.ai</li>
        <li>Slack / Teams entegrasyonu ile anlık destek</li>
        <li>Onboarding call: 60 dk ürün turu ve soru-cevap</li>
      </ul>
    </div>
  );
};

export default SupportPage;
