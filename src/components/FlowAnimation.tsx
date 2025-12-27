import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Database, FileText, BarChart, BrainCircuit, Wallet,
  Users, DollarSign, Package, Wrench, LineChart, ShieldCheck, PieChart, UserCog
} from 'lucide-react';

// Defines a single styled node in the flow diagram
const Node: React.FC<{ icon: React.ReactNode; title: string; subtitle?: string; variant: string; className?: string }> = ({ icon, title, subtitle, variant, className = '' }) => {
  let variantClasses = '';
  let titleClasses = 'text-white';
  let detailElement = null;
  let hoverShadow = '';

  switch (variant) {
    case 'source':
      variantClasses = 'border-2 border-sky-500/60 bg-gradient-to-br from-sky-950/30 via-slate-900/95 to-slate-950';
      titleClasses = 'text-sky-400';
      hoverShadow = 'hover:shadow-sky-500/30';
      break;
    case 'processing':
      variantClasses = 'border-2 border-purple-500/60 bg-gradient-to-br from-purple-950/30 via-slate-900/95 to-slate-950';
      titleClasses = 'text-purple-400';
      hoverShadow = 'hover:shadow-purple-500/30';
      detailElement = (
        <div className="absolute bottom-3 w-3/5 h-0.5 bg-purple-900/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-purple-500 to-transparent"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      );
      break;
    case 'output':
      variantClasses = 'border-2 border-orange-500/60 bg-gradient-to-br from-orange-950/30 via-slate-900/95 to-slate-950';
      titleClasses = 'text-orange-400';
      hoverShadow = 'hover:shadow-orange-500/30';
      detailElement = (
        <div className="absolute bottom-3 h-1 w-3/5 bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-orange-500 rounded-full"
            animate={{
              width: ['0%', '90%', '70%', '95%', '60%', '85%']
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      );
      break;
    case 'outcome':
      variantClasses = 'border-2 border-green-500/60 bg-gradient-to-br from-green-950/30 via-slate-900/95 to-slate-950';
      titleClasses = 'text-green-400';
      hoverShadow = 'hover:shadow-green-500/30';
      break;
  }

  return (
    <div className={`relative ${variantClasses} rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xl ${hoverShadow} h-28 w-40 hover:scale-105 hover:shadow-3xl transition-all duration-300 cursor-pointer ${className}`}>
      <div className="relative mb-1">{icon}</div>
      <p className={`font-semibold text-sm ${titleClasses}`}>{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1 px-1">{subtitle}</p>}
      {detailElement}
    </div>
  );
};

// Defines an animated SVG path with a moving dot
const Path: React.FC<{ d: string; id: string; color: string }> = ({ d, id, color }) => (
  <>
    <path d={d} stroke={color} strokeWidth="2" fill="none" id={id} />
    <motion.circle r="4" fill="white">
      <animateMotion dur={`${6 + Math.random() * 8}s`} repeatCount="indefinite" begin={`${Math.random() * 5}s`}>
        <mpath href={`#${id}`} />
      </animateMotion>
    </motion.circle>
  </>
);

const FlowAnimation: React.FC = () => {
  const sourceIcon: React.ComponentProps<any> = { className: "w-7 h-7 text-sky-400" };
  const processingIcon: React.ComponentProps<any> = { className: "w-7 h-7 text-purple-400" };
  const outputIcon: React.ComponentProps<any> = { className: "w-7 h-7 text-orange-400" };
  const outcomeIcon: React.ComponentProps<any> = { className: "w-7 h-7 text-green-400" };

  return (
    <div className="bg-gradient-to-br from-gray-900/60 via-slate-900/50 to-gray-900/60 border border-slate-700 rounded-2xl p-3 sm:p-6 shadow-2xl shadow-cyan-500/10 overflow-x-auto">
      <div className="w-full min-w-[1000px] relative h-[500px] sm:h-[600px] lg:h-[700px]">
        <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 z-0">
          {/* GERÇEK KUTU POZİSYONLARI (w-40 = 160px, justify-between):
              S1: x=8 end=168, S2: x=349 end=509, S3: x=690 end=850, S4: x=1031 end=1191
              Y pozisyonları: 4-kutu=[88,263,437,612], 3-kutu=[195,350,505] */}
          
          {/* SÜTUN 1 (Turkuaz) -> SÜTUN 2 (Mor) */}
          {/* Mesafe: 349-168=181px, Control offset: ~90px */}
          {/* Node 1 -> Processing 1 */}
          <Path id="p1" d="M 168,88 C 258,88 259,195 349,195" color="#38bdf8" />
          {/* Node 2 -> Processing 1 */}
          <Path id="p2" d="M 168,263 C 258,263 259,195 349,195" color="#38bdf8" />
          {/* Node 2 -> Processing 2 */}
          <Path id="p3" d="M 168,263 C 258,263 259,350 349,350" color="#38bdf8" />
          {/* Node 3 -> Processing 2 */}
          <Path id="p4" d="M 168,437 C 258,437 259,350 349,350" color="#38bdf8" />
          {/* Node 4 -> Processing 3 */}
          <Path id="p5" d="M 168,612 C 258,612 259,505 349,505" color="#38bdf8" />
          {/* Node 4 -> Processing 2 (extra link) */}
          <Path id="p5a" d="M 168,612 C 258,612 259,350 349,350" color="#38bdf8" />

          {/* SÜTUN 2 (Mor) -> SÜTUN 3 (Turuncu) */}
          {/* Mesafe: 690-509=181px, Control offset: ~90px */}
          {/* Processing 1 (y=195) -> Output 1 (y=88) */}
          <Path id="p6" d="M 509,195 C 599,195 600,88 690,88" color="#c084fc" />
          {/* Processing 1 (y=195) -> Output 2 (y=263) */}
          <Path id="p7" d="M 509,195 C 599,195 600,263 690,263" color="#c084fc" />
          {/* Processing 2 (y=350) -> Output 2 (y=263) */}
          <Path id="p8" d="M 509,350 C 599,350 600,263 690,263" color="#c084fc" />
          {/* Processing 2 (y=350) -> Output 3 (y=437) */}
          <Path id="p9" d="M 509,350 C 599,350 600,437 690,437" color="#c084fc" />
          {/* Processing 3 (y=505) -> Output 4 (y=612) */}
          <Path id="p10" d="M 509,505 C 599,505 600,612 690,612" color="#c084fc" />

          {/* SÜTUN 3 (Turuncu) -> SÜTUN 4 (Yeşil) */}
          {/* Mesafe: 1031-850=181px, Control offset: ~90px */}
          {/* Outcome Y pozisyonları: 1=145, 2=310, 3=475, 4=570 */}
          {/* Output 1 (Müşteri Maliyeti, y=88) -> Outcome 1 (Mühendislik, y=145) */}
          <Path id="p11" d="M 850,88 C 940,88 941,145 1031,145" color="#fb923c" />
          {/* Output 2 (Ürün Maliyeti, y=263) -> Outcome 4 (FinOps Ekibi, y=570) */}
          <Path id="p13" d="M 850,263 C 940,263 941,570 1031,570" color="#fb923c" />
          {/* Output 2 (Ürün Maliyeti, y=263) -> Outcome 3 (Yönetim, y=475) - YENİ */}
          <Path id="p15" d="M 850,263 C 940,263 941,475 1031,475" color="#fb923c" />
          {/* Output 3 (Özellik Maliyeti, y=437) -> Outcome 1 (Mühendislik, y=145) */}
          <Path id="p12" d="M 850,437 C 940,437 941,145 1031,145" color="#fb923c" />
          {/* Output 3 (Özellik Maliyeti, y=437) -> Outcome 2 (Finans, y=310) - YENİ */}
          <Path id="p16" d="M 850,437 C 940,437 941,310 1031,310" color="#fb923c" />
          {/* Output 4 (Anormallik Tespiti, y=612) -> Outcome 4 (FinOps Ekibi, y=570) */}
          <Path id="p14" d="M 850,612 C 940,612 941,570 1031,570" color="#fb923c" />
        </svg>

        <div className="relative z-10 flex justify-between h-full items-stretch px-2">
          {/* Sütun 1: Turkuaz - Veri Kaynakları (4 kutu) */}
          <div className="flex flex-col justify-between h-full py-8">
            <Node variant="source" icon={<Cloud {...sourceIcon} />} title="AWS / Azure" />
            <Node variant="source" icon={<Database {...sourceIcon} />} title="Logo / Netsis" />
            <Node variant="source" icon={<Database {...sourceIcon} />} title="Diğer ERP" />
            <Node variant="source" icon={<FileText {...sourceIcon} />} title="Excel Dosyaları" />
          </div>

          {/* Sütun 2: Mor - İşleme Motorları (3 kutu) */}
          <div className="flex flex-col justify-around h-full py-24">
            <Node variant="processing" icon={<BarChart {...processingIcon} />} title="Finansal Analiz" />
            <Node variant="processing" icon={<BrainCircuit {...processingIcon} />} title="Maliyet Motoru" />
            <Node variant="processing" icon={<Wallet {...processingIcon} />} title="Nakit Akışı" />
          </div>

          {/* Sütun 3: Turuncu - Maliyet Analizi (4 kutu) */}
          <div className="flex flex-col justify-between h-full py-8">
            <Node variant="output" icon={<Users {...outputIcon} />} title="Müşteri Maliyeti" />
            <Node variant="output" icon={<Package {...outputIcon} />} title="Ürün Maliyeti" />
            <Node variant="output" icon={<Wrench {...outputIcon} />} title="Özellik Maliyeti" />
            <Node variant="output" icon={<LineChart {...outputIcon} />} title="Anormallik Tespiti" />
          </div>

          {/* Sütun 4: Yeşil - İş Sonuçları (4 kutu) */}
          <div className="flex flex-col justify-around h-full py-16">
            <Node variant="outcome" icon={<UserCog {...outcomeIcon} />} title="Mühendislik" subtitle="Ekipleri kârlılık hedeflerinde birleştir." />
            <Node variant="outcome" icon={<PieChart {...outcomeIcon} />} title="Finans" subtitle="Bütçe tahminlerini otomatikleştir." />
            <Node variant="outcome" icon={<ShieldCheck {...outcomeIcon} />} title="Yönetim" subtitle="Brüt kâr marjını iyileştir." />
            <Node variant="outcome" icon={<Users {...outcomeIcon} />} title="FinOps Ekibi" subtitle="Birim maliyetleri optimize et." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowAnimation;
// Trigger rebuild
