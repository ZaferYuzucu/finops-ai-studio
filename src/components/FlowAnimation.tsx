// src/components/FlowAnimation.tsx
import React from 'react';

const sources = ['AWS / Azure', 'Logo / Netsis', 'Diğer ERP', 'Excel Dosyaları'];
const cores = ['Finansal Analiz', 'Maliyet Motoru', 'Nakit Akışı'];
const outputs = ['Müşteri Maliyeti', 'Ürün Maliyeti', 'Özellik Maliyeti', 'Anormallik Tespiti'];
const teams = ['Mühendislik', 'Finans', 'Yönetim', 'FinOps Ekibi'];

const FlowAnimation: React.FC = () => {
  return (
    <div className="neon-panel relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 p-4 text-[11px] text-slate-200">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-100">
            Veri Akışı · Neon Pipeline
          </div>
          <div className="text-[10px] text-slate-400">
            Tüm finans, stok ve satış verileri tek bir veri hattında birleşir.
          </div>
        </div>
        <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-200">
          Gerçek zamanlı güncelleme
        </div>
      </div>

      <div className="relative mt-2 grid grid-cols-[1.1fr_1.1fr_1.1fr_1fr] gap-4">
        {/* Sol kaynak kutuları */}
        <div className="space-y-3">
          {sources.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-100 shadow-sm shadow-slate-900/70"
            >
              {s}
            </div>
          ))}
        </div>

        {/* Orta çekirdek kutular */}
        <div className="space-y-6 pt-4">
          {cores.map((c, idx) => (
            <div
              key={c}
              className="core-node relative rounded-2xl border border-violet-600/60 bg-violet-900/40 px-4 py-3 text-[11px] text-slate-50 shadow-lg shadow-violet-900/60"
            >
              <div className="mb-1 text-[10px] uppercase tracking-wide text-violet-200/80">
                {idx === 0 && 'FinOps Motoru'}
                {idx === 1 && 'Maliyet Katmanı'}
                {idx === 2 && 'Nakit Akışı'}
              </div>
              <div className="text-sm font-semibold">{c}</div>
            </div>
          ))}
        </div>

        {/* Sağ çıktı kutuları */}
        <div className="space-y-3 pt-1">
          {outputs.map((o) => (
            <div
              key={o}
              className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-100"
            >
              {o}
            </div>
          ))}
        </div>

        {/* En sağ ekip kutuları */}
        <div className="space-y-3 pt-1">
          {teams.map((t) => (
            <div
              key={t}
              className="rounded-xl border border-emerald-600/50 bg-emerald-900/30 px-3 py-2 text-[11px] text-emerald-100"
            >
              {t}
            </div>
          ))}
        </div>

        {/* Çizgiler ve hareketli noktalar */}
        <div className="pointer-events-none absolute inset-0">
          {/* Diyagonal arka plan çizgileri */}
          <div className="absolute inset-[-40px] -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.16),_transparent_55%)]" />
          <div className="diagonal-lines absolute inset-[-80px] -z-20" />

          {/* Soldan çekirdeğe giden hatlar */}
          {[0, 1, 2, 3].map((row) => (
            <React.Fragment key={`left-${row}`}>
              <div
                className={`pipeline-line pipeline-line--left pipeline-line--left-${row + 1}`}
              />
              <div
                className={`pipeline-dot pipeline-dot--left pipeline-dot--left-${row + 1}`}
              />
            </React.Fragment>
          ))}

          {/* Çekirdekten çıktılara giden hatlar */}
          {[0, 1, 2, 3].map((row) => (
            <React.Fragment key={`right-${row}`}>
              <div
                className={`pipeline-line pipeline-line--right pipeline-line--right-${row + 1}`}
              />
              <div
                className={`pipeline-dot pipeline-dot--right pipeline-dot--right-${row + 1}`}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowAnimation;
