import React from "react";
import { ArrowRight, LineChart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FlowAnimation from "../components/FlowAnimation";
import SectorCards from "../components/SectorCards";
import DashboardPreview from "../components/DashboardPreview";

const HeroPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-100">
            <Sparkles className="h-3 w-3" />
            <span>KOBİ Finans · Yapay Zeka Destekli FINOPS Platformu</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 md:text-4xl lg:text-5xl">
            Veri kaosuna son verin,
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              kârlılığınızı artırın.
            </span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-slate-300">
            FINOPS AI Studio; Turizm/Otel, Restoran/Cafe, Sağlık, Perakende,
            Otomotiv ve Tarım işletmeleri için nakit akışı, stok maliyeti, bütçe
            ve kârlılık analizlerini tek bir ekranda toplar.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/dashboards"
              className="inline-flex items-center gap-2 rounded-full bg-finops-blue px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500"
            >
              Dashboardları incele
              <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              to="/pricing"
              className="text-xs font-medium text-slate-300 underline-offset-4 hover:text-white hover:underline"
            >
              Fiyatları gör (₺ bazlı faturalama)
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <LineChart className="h-3 w-3 text-emerald-300" />
              <span>Gerçek zamanlı nakit akışı & kârlılık</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>Logo, Netsis, Mikro, Paraşüt entegrasyonuna hazır mimari*</span>
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {/* Finansal Özet */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/60 text-[11px]">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-slate-200">
                  Aylık Finansal Özet
                </div>
                <div className="text-[11px] text-slate-400">Tüm işletmeler · Toplam</div>
              </div>
              <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-200">
                +%22,4 büyüme
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-1 rounded-xl bg-slate-950/70 p-3">
                <div className="text-slate-400">Ciro</div>
                <div className="text-sm font-semibold text-slate-50">₺3.250.000</div>
                <div className="text-[10px] text-emerald-300">+%18,2 önceki aya göre</div>
              </div>

              <div className="space-y-1 rounded-xl bg-slate-950/70 p-3">
                <div className="text-slate-400">Net Kâr</div>
                <div className="text-sm font-semibold text-slate-50">₺254.000</div>
                <div className="text-[10px] text-emerald-300">Net marj: %7,8</div>
              </div>

              <div className="space-y-1 rounded-xl bg-slate-950/70 p-3">
                <div className="text-slate-400">Nakit Pozisyonu</div>
                <div className="text-sm font-semibold text-slate-50">₺1.850.000</div>
                <div className="text-[10px] text-sky-300">12 haftalık runway</div>
              </div>

              <div className="space-y-1 rounded-xl bg-slate-950/70 p-3">
                <div className="text-slate-400">Stok Maliyeti</div>
                <div className="text-sm font-semibold text-slate-50">₺970.000</div>
                <div className="text-[10px] text-amber-300">Hedefe göre +%4,2</div>
              </div>
            </div>
          </div>

          <FlowAnimation />
        </div>
      </div>

      <SectorCards />
      <DashboardPreview />
    </div>
  );
};

export default HeroPage;
