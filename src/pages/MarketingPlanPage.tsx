import React from 'react';

const MarketingPlanPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4 text-sm text-slate-200">
      <h1 className="text-2xl font-semibold text-slate-50">Marketing Plan</h1>
      <p className="text-slate-300">
        Türkiye odaklı SaaS pazarlama stratejisi için örnek bir çerçeve:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-[13px]">
        <li>LinkedIn &amp; YouTube üzerinden finans yöneticilerine içerik</li>
        <li>Turizm bölgesi otelleri ve restoranları için bölgesel roadshow</li>
        <li>ERP ve muhasebe ofisleri ile stratejik iş ortaklıkları</li>
      </ul>
    </div>
  );
};

export default MarketingPlanPage;
