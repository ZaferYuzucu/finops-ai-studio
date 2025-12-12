import React from 'react';

const AiAssistantPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-50">AI Asistan</h1>
      <p className="text-sm text-slate-300 max-w-2xl">
        Finans direktörleri ve işletme sahipleri için tasarlanmış AI asistan;
        dashboard verileriniz üzerinden doğal dilde sorular sorup anında cevap
        almanızı sağlar.
      </p>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-[11px] text-slate-300 space-y-2">
        <p>Örnek sorular:</p>
        <ul className="list-disc pl-4 space-y-1">
          <li>“Son 3 ayda oda başı gelirdeki trend nedir?”</li>
          <li>“Hangi şubeler stok maliyetinde hedefin üzerinde?”</li>
          <li>“Önümüzdeki 8 hafta için nakit açığı riski var mı?”</li>
        </ul>
      </div>
    </div>
  );
};

export default AiAssistantPage;
