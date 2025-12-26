import React from 'react';

const VisionOcrPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-4">
      <h1 className="text-2xl font-semibold text-slate-50">Vision OCR</h1>
      <p className="text-sm text-slate-300 max-w-2xl">
        Fatura, fiş ve ekstrelerin fotoğraf veya PDF&apos;lerinden satır satır
        veri yakalayan OCR katmanı ile manuel veri girişini azaltın.
      </p>
      <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-[11px] text-slate-300">
        Burada ileride örnek belge yükleme ve önizleme bileşenleri
        konumlandırılabilir.
      </div>
    </div>
  );
};

export default VisionOcrPage;
