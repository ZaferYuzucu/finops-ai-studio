import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-4 text-sm">
      <h1 className="text-2xl font-semibold">Hakkında</h1>
      <p className="text-slate-300">
        FINOPS AI Studio, finans, veri bilimi ve KOBİ yönetimi deneyimini
        birleştiren bir FinOps girişimidir. Amaç; Türkiye ve bölgedeki
        işletmelerin veriyle karar alma kültürünü güçlendirmektir.
      </p>
    </div>
  );
};

export default AboutPage;
