import React from 'react';
import { motion } from 'framer-motion';
import {
  Cloud, Database, FileText, BarChart, BrainCircuit, Wallet,
  Users, DollarSign, Package, Wrench, LineChart, ShieldCheck, PieChart, UserCog
} from 'lucide-react';

// Defines a single styled node in the flow diagram
const Node = ({ icon, title, subtitle, variant, className = '' }) => {
  let variantClasses = '';
  let titleClasses = 'text-white';
  let detailElement = null;

  switch (variant) {
    case 'source':
      variantClasses = 'border-sky-500/50';
      titleClasses = 'text-sky-400';
      break;
    case 'processing':
      variantClasses = 'border-purple-500/50';
      titleClasses = 'text-purple-400';
      detailElement = <div className="absolute bottom-3 h-0.5 w-3/5 bg-purple-500" />;
      break;
    case 'output':
      variantClasses = 'border-orange-500/50';
      titleClasses = 'text-orange-400';
      detailElement = (
        <div className="absolute bottom-3 h-1 w-3/5 bg-slate-700 rounded-full">
          <div className="h-full w-4/5 bg-orange-500 rounded-full"></div>
        </div>
      );
      break;
    case 'outcome':
      variantClasses = 'border-green-500/50';
      titleClasses = 'text-green-400'; // Title color updated to green
      break;
  }

  return (
    <div className={`relative bg-slate-900 border ${variantClasses} rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xl h-28 w-40 ${className}`}>
      <div className="relative mb-1">{icon}</div>
      <p className={`font-semibold text-sm ${titleClasses}`}>{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1 px-1">{subtitle}</p>}
      {detailElement}
    </div>
  );
};

// Defines an animated SVG path with a moving dot
const Path = ({ d, id, color }) => (
  <>
    <path d={d} stroke={color} strokeWidth="2" fill="none" id={id} />
    <motion.circle r="4" fill="white">
      <animateMotion dur={`${6 + Math.random() * 8}s`} repeatCount="indefinite" begin={`${Math.random() * 5}s`}>
        <mpath href={`#${id}`} />
      </animateMotion>
    </motion.circle>
  </>
);

const FlowAnimation = () => {
  const sourceIcon = { className: "w-7 h-7 text-sky-400" };
  const processingIcon = { className: "w-7 h-7 text-purple-400" };
  const outputIcon = { className: "w-7 h-7 text-orange-400" };
  const outcomeIcon = { className: "w-7 h-7 text-green-400" }; // Icon color updated to green

  return (
    <div className="bg-gray-900/50 border border-slate-700 rounded-2xl p-4 shadow-2xl shadow-cyan-500/10">
      <div className="w-full relative h-[700px]">
        <svg width="100%" height="100%" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 z-0">
          {/* Col 1 (ends at x=160) -> Col 2 (starts at x=413) */}
          <Path id="p1" d="M 160,88 C 280,88 300,175 413,175" color="#38bdf8" />
          <Path id="p2" d="M 160,244 C 280,244 300,175 413,175" color="#38bdf8" />
          <Path id="p3" d="M 160,244 C 280,244 300,350 413,350" color="#38bdf8" />
          <Path id="p4" d="M 160,400 C 280,400 300,350 413,350" color="#38bdf8" />
          <Path id="p5" d="M 160,556 C 280,556 300,525 413,525" color="#38bdf8" />
          <Path id="p5a" d="M 160,556 C 280,556 300,350 413,350" color="#38bdf8" />

          {/* Col 2 (ends at x=573) -> Col 3 (starts at x=827) */}
          <Path id="p6" d="M 573,175 C 690,175 710,88 827,88" color="#c084fc" />
          <Path id="p7" d="M 573,175 C 690,175 710,244 827,244" color="#c084fc" />
          <Path id="p8" d="M 573,350 C 690,350 710,244 827,244" color="#c084fc" />
          <Path id="p9" d="M 573,350 C 690,350 710,400 827,400" color="#c084fc" />
          <Path id="p10" d="M 573,525 C 690,525 710,556 827,556" color="#c084fc" />

          {/* Col 3 (ends at x=987) -> Col 4 (starts at x=1240) */}
          <Path id="p11" d="M 987,88 C 1100,88 1120,175 1240,175" color="#fb923c" />
          <Path id="p12" d="M 987,400 C 1100,400 1120,175 1240,175" color="#fb923c" />
          <Path id="p13" d="M 987,244 C 1100,244 1120,525 1240,525" color="#fb923c" />
          <Path id="p14" d="M 987,556 C 1100,556 1120,525 1240,525" color="#fb923c" />
        </svg>

        <div className="relative z-10 flex justify-between h-full items-center">
          <div className="flex flex-col justify-between h-full py-5">
            <Node variant="source" icon={<Cloud {...sourceIcon} />} title="AWS / Azure" />
            <Node variant="source" icon={<Database {...sourceIcon} />} title="Logo / Netsis" />
            <Node variant="source" icon={<Database {...sourceIcon} />} title="Diğer ERP" />
            <Node variant="source" icon={<FileText {...sourceIcon} />} title="Excel Dosyaları" />
          </div>

          <div className="flex flex-col justify-around h-full py-20">
            <Node variant="processing" icon={<BarChart {...processingIcon} />} title="Finansal Analiz" />
            <Node variant="processing" icon={<BrainCircuit {...processingIcon} />} title="Maliyet Motoru" />
            <Node variant="processing" icon={<Wallet {...processingIcon} />} title="Nakit Akışı" />
          </div>

          <div className="flex flex-col justify-between h-full py-5">
            <Node variant="output" icon={<Users {...outputIcon} />} title="Müşteri Maliyeti" />
            <Node variant="output" icon={<Package {...outputIcon} />} title="Ürün Maliyeti" />
            <Node variant="output" icon={<Wrench {...outputIcon} />} title="Özellik Maliyeti" />
            <Node variant="output" icon={<LineChart {...outputIcon} />} title="Anormallik Tespiti" />
          </div>

          <div className="flex flex-col justify-around h-full py-10">
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
