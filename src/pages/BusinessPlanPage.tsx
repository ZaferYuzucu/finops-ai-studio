
import React, { useState } from 'react';
import { 
  FileText, 
  Wrench, 
  Layers, 
  Tags, 
  TrendingUp, 
  ClipboardList, 
  LayoutGrid,
  PieChart,
  Target,
  Users,
  AlertTriangle,
  Lightbulb,
  Check,
  Lock,
  DollarSign,
  Calendar,
  Shield,
  Download,
  Presentation
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import pptxgen from 'pptxgenjs';
import PricingSection from '../components/PricingSection'; // YENİ FİYATLANDIRMA BİLEŞENİ
import { useTranslation } from 'react-i18next';

// --- Yardımcı Bileşenler (Değişiklik yok) ---

const SectionTitle: React.FC<{ icon: React.ElementType; children: React.ReactNode }> = ({ icon: Icon, children }) => (
  <div className="flex items-center mt-20 mb-10">
    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-5 shadow-lg">
      <Icon className="h-7 w-7 text-white" />
    </div>
    <h2 className="text-4xl font-bold tracking-tight text-gray-900">{children}</h2>
  </div>
);

const SectionParagraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600 leading-relaxed mb-6 text-lg">{children}</p>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
      <span className="text-indigo-600 text-xs font-bold">✓</span>
    </div>
    <span className="text-gray-700 leading-relaxed">{children}</span>
  </li>
);

const SwotBox: React.FC<{ title: string; items: string[]; color: string; icon: React.ElementType }> = ({ title, items, color, icon: Icon }) => (
  <div className={`bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border-l-4 ${color} shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}>
    <div className="flex items-center mb-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
        color.includes('green') ? 'bg-green-100' :
        color.includes('yellow') ? 'bg-yellow-100' :
        color.includes('blue') ? 'bg-blue-100' : 'bg-red-100'
      }`}>
        <Icon className={`w-6 h-6 ${
          color.includes('green') ? 'text-green-600' :
          color.includes('yellow') ? 'text-yellow-600' :
          color.includes('blue') ? 'text-blue-600' : 'text-red-600'
        }`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="text-gray-700 flex items-start text-sm leading-relaxed">
          <span className="text-indigo-500 mr-3 mt-1 font-bold">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const HighlightNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <blockquote className="mt-8 p-8 bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-r-2xl shadow-xl">
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <div className="prose prose-p:text-gray-700 prose-strong:text-gray-900">
                {children}
            </div>
        </div>
    </blockquote>
);

// --- Ana Sayfa Bileşeni ---

const BusinessPlanPage: React.FC = () => {
  const [frequency, setFrequency] = useState('monthly');
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');

  // PDF İndirme Fonksiyonu
  const handleDownloadPDF = () => {
    const element = document.getElementById('business-plan-content');
    
    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'FINOPS_Is_Plani_2026-2028.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  // PPTX Sunum Oluşturma Fonksiyonu - TEKNOKENT JÜRİSİ (V2 - PROFESYONEL)
  const handleDownloadPPTX = () => {
    const pptx = new pptxgen();
    
    // Tema Renkleri
    const PRIMARY = '4F46E5';
    const SECONDARY = '9333EA';
    const ACCENT = 'EC4899';
    const SUCCESS = '10B981';
    const WARNING = 'F59E0B';
    const DARK = '1F2937';
    const LIGHT = 'F9FAFB';
    const TECH_BG = '0F172A'; // Teknolojik koyu arka plan
    
    // Logo ve Marka Fonksiyonu (Her slayta eklenecek)
    const addLogoAndBrand = (slide: any) => {
      // Sol üst köşe - Shield Logo + FINOPS AI Studio
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.2, y: 0.15, w: 2.5, h: 0.45,
        fill: { color: 'FFFFFF', transparency: 90 },
        line: { color: PRIMARY, width: 1 }
      });
      
      // Shield emoji (logo placeholder)
      slide.addText('🛡️', {
        x: 0.25, y: 0.17, w: 0.4, h: 0.4,
        fontSize: 20
      });
      
      // FINOPS AI Studio yazısı
      slide.addText('FINOPS AI Studio', {
        x: 0.7, y: 0.22, w: 1.9, h: 0.3,
        fontSize: 14, bold: true, color: PRIMARY
      });
    };
    
    // Teknolojik Arka Plan Fonksiyonu
    const addTechBackground = (slide: any, isDark = false) => {
      if (isDark) {
        slide.background = { fill: TECH_BG };
        // Gradient overlay
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 0, w: 10, h: 7.5,
          fill: { 
            type: 'solid',
            color: PRIMARY,
            transparency: 95
          }
        });
      } else {
        // Açık tema - gradient arka plan
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 0, w: 10, h: 7.5,
          fill: { 
            type: 'solid',
            color: 'F0F4FF',
            transparency: 0
          }
        });
        
        // Teknolojik pattern (köşe aksentleri)
        slide.addShape(pptx.ShapeType.rect, {
          x: 7, y: 0, w: 3, h: 0.5,
          fill: { color: PRIMARY, transparency: 90 }
        });
        slide.addShape(pptx.ShapeType.rect, {
          x: 0, y: 7, w: 3, h: 0.5,
          fill: { color: SECONDARY, transparency: 90 }
        });
      }
    };

    // SLAYT 1: KAPAK
    let slide1 = pptx.addSlide();
    addTechBackground(slide1, true);
    
    // Büyük Shield Logo
    slide1.addText('🛡️', {
      x: 4.2, y: 1.2, w: 1.6, h: 1.6,
      fontSize: 80, align: 'center'
    });
    
    slide1.addText('FINOPS AI STUDIO', {
      x: 1, y: 3, w: 8, h: 0.8,
      fontSize: 44, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    slide1.addText('Türkiye KOBİ\'leri İçin İlk Yerli\nYapay Zekâ Destekli Finansal Dashboard Platformu', {
      x: 1, y: 4, w: 8, h: 1,
      fontSize: 18, color: 'FFFFFF',
      align: 'center', valign: 'middle'
    });
    slide1.addText('Teknokent Kuluçka Başvurusu | 2026-2028', {
      x: 1, y: 5.5, w: 8, h: 0.5,
      fontSize: 14, color: ACCENT,
      align: 'center', italic: true
    });

    // SLAYT 2: PROBLEM - KOBİ'LERİN FİNANSAL ZORLUKLARI
    let slide2 = pptx.addSlide();
    addTechBackground(slide2);
    addLogoAndBrand(slide2);
    
    slide2.addText('KOBİ\'lerin Finansal Zorlukları', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    // Problem kutuları
    const problems = [
      {
        icon: '📊',
        title: 'Finansal Veriyi Anlamakta Zorluk',
        items: ['Excel\'de saatlerce manuel çalışma', 'Veriler dağınık: Banka, POS, e-fatura']
      },
      {
        icon: '💸',
        title: 'Nakit Akışı Krizi',
        items: ['Ödemelerin ne zaman geleceği belirsiz', 'Ani giderlere hazırlıksız yakalanma']
      },
      {
        icon: '💰',
        title: 'Yüksek Danışmanlık Maliyetleri',
        items: ['Aylık 5.000-15.000 TL mali müşavir', 'Anlık karar desteği yok']
      }
    ];
    
    problems.forEach((prob, i) => {
      slide2.addShape(pptx.ShapeType.rect, {
        x: 0.5, y: 1.7 + i * 1.7, w: 9, h: 1.4,
        fill: { color: 'FFFFFF' },
        line: { color: 'DC2626', width: 2 }
      });
      
      slide2.addText(prob.icon, {
        x: 0.7, y: 1.85 + i * 1.7, w: 0.5, h: 0.5,
        fontSize: 24
      });
      
      slide2.addText(prob.title, {
        x: 1.3, y: 1.85 + i * 1.7, w: 7.5, h: 0.4,
        fontSize: 16, bold: true, color: 'DC2626'
      });
      
      slide2.addText(prob.items.map(item => '• ' + item).join('\n'), {
        x: 1.3, y: 2.3 + i * 1.7, w: 7.5, h: 0.6,
        fontSize: 12, color: '4B5563'
      });
    });

    // SLAYT 3: PAZAR BOŞLUĞU - MÜNHASİRAN İLK YERLI SAAS
    let slide3 = pptx.addSlide();
    addTechBackground(slide3);
    addLogoAndBrand(slide3);
    
    slide3.addText('Pazar Boşluğu: Münhasır Fırsat', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    // BÜYÜK SARI VURGU KUTUSU
    slide3.addShape(pptx.ShapeType.rect, {
      x: 1, y: 1.7, w: 8, h: 2.3,
      fill: { color: 'FEF3C7' },
      line: { color: WARNING, width: 3 }
    });
    slide3.addText('⚠', {
      x: 1.5, y: 1.9, w: 0.6, h: 0.6,
      fontSize: 32
    });
    slide3.addText('Türkiye\'de KOBİ\'lerin finansal verisini:\n• Otomatik toplayan\n• Yapay zekâ ile sınıflandıran\n• Anlaşılır dashboard + içgörü üreten\n\nYERLİ, SELF-SERVICE SAAS PLATFORM YOKTUR.', {
      x: 1.5, y: 2.1, w: 7, h: 1.7,
      fontSize: 14, bold: true, color: '92400E',
      align: 'center', valign: 'middle'
    });
    
    slide3.addText('Mevcut Çözümler:', {
      x: 0.5, y: 4.3, w: 9, h: 0.4,
      fontSize: 18, bold: true, color: DARK
    });
    slide3.addText('• Muhasebe yazılımları → Sadece kayıt, analiz yok\n• ERP sistemleri → Karmaşık, pahalı, KOBİ\'ye uygun değil\n• Global araçlar → Türkçe destek zayıf, yerel entegrasyon yok\n• Danışmanlar → Pahalı, gerçek zamanlı değil', {
      x: 1, y: 4.8, w: 8, h: 1.5,
      fontSize: 12, color: '4B5563', bullet: true
    });

    // SLAYT 4: ÇÖZÜM - FINOPS AI STUDIO
    let slide4 = pptx.addSlide();
    addTechBackground(slide4);
    addLogoAndBrand(slide4);
    
    slide4.addText('Çözüm: FINOPS AI Studio', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    slide4.addText('Türkiye\'nin İLK ve TEK Yerli SaaS Platformu', {
      x: 0.5, y: 1.5, w: 9, h: 0.4,
      fontSize: 16, bold: true, color: SUCCESS,
      align: 'center'
    });
    
    // 4 Kutu - KÜÇÜLTÜLMÜŞ
    const boxes = [
      { icon: '🤖', title: 'Yapay Zeka', text: 'Otomatik veri toplama\nAkıllı sınıflandırma', color: '3B82F6' },
      { icon: '📊', title: 'Dashboard', text: 'Görselleştirme\nTek bakışta karar', color: '8B5CF6' },
      { icon: '⚡', title: 'Gerçek Zamanlı', text: 'Anlık uyarılar\nErken müdahale', color: 'EC4899' },
      { icon: '🇹🇷', title: 'Yerli', text: 'Logo/Netsis entegre\nTürkçe destek 7/24', color: '10B981' }
    ];
    
    boxes.forEach((box, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide4.addShape(pptx.ShapeType.rect, {
        x: 0.5 + col * 4.8, y: 2.1 + row * 1.9, w: 4.4, h: 1.7,
        fill: { color: box.color }
      });
      slide4.addText(box.icon, {
        x: 0.5 + col * 4.8, y: 2.2 + row * 1.9, w: 4.4, h: 0.4,
        fontSize: 20, align: 'center'
      });
      slide4.addText(box.title, {
        x: 0.5 + col * 4.8, y: 2.6 + row * 1.9, w: 4.4, h: 0.4,
        fontSize: 16, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide4.addText(box.text, {
        x: 0.5 + col * 4.8, y: 3.1 + row * 1.9, w: 4.4, h: 0.6,
        fontSize: 11, color: 'FFFFFF',
        align: 'center', valign: 'middle'
      });
    });

    // SLAYT 5: YAPAY ZEKA OTOMASYON AKIŞI
    let slide5 = pptx.addSlide();
    addTechBackground(slide5);
    addLogoAndBrand(slide5);
    
    slide5.addText('Yapay Zeka Destekli Otomasyon Akışı', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 24, bold: true, color: PRIMARY
    });
    
    // Akış diyagramı - DİKEY YERLEŞİM
    const flow = [
      { num: '1', title: 'VERİ TOPLAMA', desc: 'Banka • POS • e-Fatura\nLogo • Netsis • Excel', color: '3B82F6' },
      { num: '2', title: 'AI SINIFLANDIRMA', desc: 'Gider/Gelir otomatik\nKategori tanıma', color: '8B5CF6' },
      { num: '3', title: 'ANALİZ', desc: 'Nakit akışı tahmini\nTrend analizi', color: 'EC4899' },
      { num: '4', title: 'DASHBOARD', desc: 'Görsel raporlar\nAnlık içgörüler', color: '10B981' },
      { num: '5', title: 'UYARI', desc: 'Erken uyarı sistemi\nAksiyon önerileri', color: 'F59E0B' }
    ];
    
    flow.forEach((step, i) => {
      slide5.addShape(pptx.ShapeType.rect, {
        x: 0.7 + i * 1.82, y: 1.8, w: 1.7, h: 2.8,
        fill: { color: step.color },
        line: { color: 'FFFFFF', width: 2 }
      });
      
      // Numara
      slide5.addShape(pptx.ShapeType.ellipse, {
        x: 1.2 + i * 1.82, y: 1.95, w: 0.6, h: 0.6,
        fill: { color: 'FFFFFF' }
      });
      slide5.addText(step.num, {
        x: 1.2 + i * 1.82, y: 1.95, w: 0.6, h: 0.6,
        fontSize: 18, bold: true, color: step.color,
        align: 'center', valign: 'middle'
      });
      
      slide5.addText(step.title, {
        x: 0.7 + i * 1.82, y: 2.65, w: 1.7, h: 0.5,
        fontSize: 10, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide5.addText(step.desc, {
        x: 0.75 + i * 1.82, y: 3.2, w: 1.6, h: 1.2,
        fontSize: 8, color: 'FFFFFF',
        align: 'center', valign: 'middle'
      });
      
      // Ok işareti
      if (i < 4) {
        slide5.addText('→', {
          x: 2.32 + i * 1.82, y: 3.05, w: 0.25, h: 0.4,
          fontSize: 20, bold: true, color: DARK
        });
      }
    });
    
    slide5.addText('⏱ Süre: Saniyeler içinde tamamlanır!', {
      x: 0.5, y: 5.2, w: 9, h: 0.4,
      fontSize: 14, bold: true, color: SUCCESS,
      align: 'center'
    });

    // SLAYT 6: TEMEL ÖZELLİKLER
    let slide6 = pptx.addSlide();
    addTechBackground(slide6);
    addLogoAndBrand(slide6);
    
    slide6.addText('Platform Özellikleri', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    const features = [
      { icon: '📊', title: 'Finansal Dashboard\'lar', desc: 'Gelir, gider, kâr marjı, nakit akışı tek ekranda' },
      { icon: '🤖', title: 'AI Finans Asistanı', desc: '"Bu ay kârım neden düştü?" → Anında yanıt' },
      { icon: '📈', title: 'Tahmine Dayalı Analiz', desc: 'Gelecek 3 ay nakit akışı tahmini' },
      { icon: '⚠️', title: 'Erken Uyarı Sistemi', desc: 'Stok maliyeti artışı, nakit darboğazı uyarıları' },
      { icon: '🔗', title: 'Logo & Netsis Entegrasyonu', desc: 'Türkiye\'nin en yaygın ERP\'leri ile otomatik senkronizasyon' },
      { icon: '📱', title: 'Mobil Uyumlu', desc: 'Her yerden, her cihazdan erişim' }
    ];
    
    features.forEach((feat, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide6.addText(feat.icon, {
        x: 0.5 + col * 4.8, y: 1.6 + row * 1.4, w: 0.4, h: 0.4,
        fontSize: 18
      });
      slide6.addText(feat.title, {
        x: 1 + col * 4.8, y: 1.6 + row * 1.4, w: 3.8, h: 0.4,
        fontSize: 14, bold: true, color: DARK
      });
      slide6.addText(feat.desc, {
        x: 1 + col * 4.8, y: 2.05 + row * 1.4, w: 3.8, h: 0.4,
        fontSize: 10, color: '6B7280'
      });
    });

    // SLAYT 7: VERİ GÖRSELLEŞTİRME ÖRNEKLER
    let slide7 = pptx.addSlide();
    addTechBackground(slide7);
    addLogoAndBrand(slide7);
    
    slide7.addText('Dashboard Örnekleri', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    const dashboards = [
      { title: 'Nakit Akışı', desc: 'Günlük/haftalık/aylık giriş-çıkış' },
      { title: 'Gelir Analizi', desc: 'Ürün/hizmet bazlı kârlılık' },
      { title: 'Gider Takibi', desc: 'Kategori bazlı maliyet dağılımı' },
      { title: 'Stok Maliyeti', desc: 'FIFO/LIFO analizi, uyarılar' }
    ];
    
    dashboards.forEach((dash, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide7.addShape(pptx.ShapeType.rect, {
        x: 0.8 + col * 4.6, y: 1.7 + row * 2, w: 4.2, h: 1.7,
        fill: { color: LIGHT },
        line: { color: PRIMARY, width: 2 }
      });
      slide7.addText(dash.title, {
        x: 1 + col * 4.6, y: 1.9 + row * 2, w: 3.8, h: 0.4,
        fontSize: 16, bold: true, color: PRIMARY
      });
      slide7.addText(dash.desc, {
        x: 1 + col * 4.6, y: 2.4 + row * 2, w: 3.8, h: 0.7,
        fontSize: 11, color: '6B7280'
      });
    });
    
    slide7.addText('💡 Tek tıkla rapor oluşturma, Excel\'e aktarma', {
      x: 0.5, y: 5.8, w: 9, h: 0.4,
      fontSize: 12, color: SUCCESS,
      align: 'center', italic: true
    });

    // SLAYT 8: HEDEF PAZAR
    let slide8 = pptx.addSlide();
    addTechBackground(slide8);
    addLogoAndBrand(slide8);
    
    slide8.addText('Hedef Pazar: 300.000 KOBİ', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    slide8.addShape(pptx.ShapeType.rect, {
      x: 1.5, y: 1.8, w: 7, h: 3.5,
      fill: { color: 'EEF2FF' }
    });
    
    slide8.addText('Türkiye\'de Toplam KOBİ:', {
      x: 2, y: 2.2, w: 6, h: 0.5,
      fontSize: 20, bold: true, color: DARK
    });
    slide8.addText('~4.000.000', {
      x: 2, y: 2.8, w: 6, h: 0.8,
      fontSize: 48, bold: true, color: PRIMARY,
      align: 'center'
    });
    
    slide8.addText('Hedef Pazar (SAM):', {
      x: 2, y: 3.8, w: 6, h: 0.5,
      fontSize: 20, bold: true, color: DARK
    });
    slide8.addText('300.000 KOBİ', {
      x: 2, y: 4.3, w: 6, h: 0.7,
      fontSize: 40, bold: true, color: SUCCESS,
      align: 'center'
    });
    
    slide8.addText('Finansal verisi düzenli, banka/POS/e-fatura kullanan,\ndijital çözüme açık işletmeler', {
      x: 1.5, y: 5.5, w: 7, h: 0.8,
      fontSize: 12, color: '6B7280',
      align: 'center', italic: true
    });

    // SLAYT 9: REKABET AVANTAJI
    let slide9 = pptx.addSlide();
    addTechBackground(slide9);
    addLogoAndBrand(slide9);
    
    slide9.addText('Rekabet Avantajlarımız', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    const advantages = [
      { title: '🇹🇷 Yerli ERP Entegrasyonu', desc: 'Logo, Netsis ile DOĞRUDAN entegrasyon\nGlobal rakipler bu entegrasyonu sunmuyor' },
      { title: '💬 Türkçe AI Asistanı', desc: 'Doğal Türkçe ile soru-cevap\n"Geçen ay hangi ürün en çok kâr etti?"' },
      { title: '🏦 Yerel Banka Entegrasyonu', desc: 'Türk bankalarının API\'leri ile otomatik senkronizasyon' },
      { title: '💰 Uygun Fiyat', desc: '599 TL/ay (Global rakipler $50-200/ay)\nKOBİ bütçesine uygun' },
      { title: '🛡️ KVKK Uyumlu', desc: 'Veriler Türkiye\'de saklanır\nTam KVKK uyumluluğu' },
      { title: '👨‍💼 Yerel Destek', desc: '7/24 Türkçe müşteri desteği\nAnlık çözüm, yerel anlayış' }
    ];
    
    advantages.forEach((adv, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      slide9.addText(adv.title.substring(0, 2), {
        x: 0.5 + col * 4.8, y: 1.6 + row * 1.5, w: 0.4, h: 0.4,
        fontSize: 16
      });
      slide9.addText(adv.title.substring(3), {
        x: 1 + col * 4.8, y: 1.6 + row * 1.5, w: 3.8, h: 0.4,
        fontSize: 13, bold: true, color: PRIMARY
      });
      slide9.addText(adv.desc, {
        x: 1 + col * 4.8, y: 2.05 + row * 1.5, w: 3.8, h: 0.6,
        fontSize: 9, color: '4B5563'
      });
    });

    // SLAYT 10: FİYATLANDIRMA
    let slide10 = pptx.addSlide();
    addTechBackground(slide10);
    addLogoAndBrand(slide10);
    
    slide10.addText('Fiyatlandırma', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    // İşletme Dostu Paketi
    slide10.addShape(pptx.ShapeType.rect, {
      x: 1, y: 2, w: 4, h: 3.5,
      fill: { color: '3B82F6' }
    });
    slide10.addText('İşletme Dostu', {
      x: 1, y: 2.2, w: 4, h: 0.5,
      fontSize: 20, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('599 TL', {
      x: 1, y: 2.8, w: 4, h: 0.8,
      fontSize: 48, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('/ay', {
      x: 1, y: 3.5, w: 4, h: 0.3,
      fontSize: 18, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('✓ 5 Kullanıcı\n✓ Temel Dashboard\'lar\n✓ 1 ERP Entegrasyonu\n✓ Email Destek', {
      x: 1.2, y: 4, w: 3.6, h: 1.2,
      fontSize: 12, color: 'FFFFFF',
      bullet: false
    });
    
    // Premium Paketi
    slide10.addShape(pptx.ShapeType.rect, {
      x: 5.5, y: 1.5, w: 4, h: 4,
      fill: { color: '8B5CF6' }
    });
    slide10.addText('⭐ Premium', {
      x: 5.5, y: 1.7, w: 4, h: 0.5,
      fontSize: 22, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('1.799 TL', {
      x: 5.5, y: 2.4, w: 4, h: 0.8,
      fontSize: 48, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('/ay', {
      x: 5.5, y: 3.1, w: 4, h: 0.3,
      fontSize: 18, color: 'FFFFFF',
      align: 'center'
    });
    slide10.addText('✓ Sınırsız Kullanıcı\n✓ Tüm Dashboard\'lar\n✓ Çoklu ERP Entegrasyonu\n✓ AI Finans Asistanı\n✓ 7/24 Öncelikli Destek\n✓ Özel Rapor Tasarımı', {
      x: 5.7, y: 3.6, w: 3.6, h: 1.6,
      fontSize: 11, color: 'FFFFFF',
      bullet: false
    });
    
    slide10.addText('📊 Ortalama Gelir (ARPU): 959 TL/ay', {
      x: 0.5, y: 6, w: 9, h: 0.4,
      fontSize: 13, bold: true, color: SUCCESS,
      align: 'center'
    });

    // SLAYT 11: TABLO-9 FİNANSAL PROJEKSİYON
    let slide11 = pptx.addSlide();
    addTechBackground(slide11);
    addLogoAndBrand(slide11);
    
    slide11.addText('3 Yıllık Finansal Projeksiyon', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 26, bold: true, color: PRIMARY
    });
    
    const tableData = [
      [
        { text: 'Metrik', options: { bold: true, color: 'FFFFFF', fill: PRIMARY } },
        { text: '2026', options: { bold: true, color: 'FFFFFF', fill: PRIMARY } },
        { text: '2027', options: { bold: true, color: 'FFFFFF', fill: PRIMARY } },
        { text: '2028', options: { bold: true, color: 'FFFFFF', fill: PRIMARY } }
      ],
      ['Ödeyen Kullanıcı', '15.000', '30.000', '45.000'],
      ['Penetrasyon', '%5', '%10', '%15'],
      ['Yıllık Gelir (TL)', '172.620', '345.240', '517.860'],
      ['Yıllık Gider (TL)', '8.000', '20.000', '35.000'],
      [
        { text: 'Net Kâr (TL)', options: { bold: true, fill: 'DCFCE7' } },
        { text: '164.620', options: { bold: true, fill: 'DCFCE7', color: SUCCESS } },
        { text: '325.240', options: { bold: true, fill: 'DCFCE7', color: SUCCESS } },
        { text: '482.860', options: { bold: true, fill: 'DCFCE7', color: SUCCESS } }
      ],
      ['Kâr Marjı', '%95.4', '%94.2', '%93.2']
    ];
    
    slide11.addTable(tableData, {
      x: 0.5, y: 1.6, w: 9, h: 3.2,
      fontSize: 12,
      border: { type: 'solid', color: PRIMARY, pt: 1 },
      align: 'center',
      valign: 'middle'
    });
    
    slide11.addText('🎯 Toplam 3 Yıllık Kümülatif Kâr: 972.720 TL', {
      x: 0.5, y: 5.2, w: 9, h: 0.5,
      fontSize: 18, bold: true, color: SUCCESS,
      align: 'center'
    });
    slide11.addText('✅ İlk yıldan itibaren pozitif nakit akışı!', {
      x: 0.5, y: 5.8, w: 9, h: 0.4,
      fontSize: 14, color: DARK,
      align: 'center', italic: true
    });

    // SLAYT 12: BÜYÜME POTANSİYELİ
    let slide12 = pptx.addSlide();
    addTechBackground(slide12);
    addLogoAndBrand(slide12);
    
    slide12.addText('Büyüme Potansiyeli', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    slide12.addText('Yıllık Büyüme Oranları:', {
      x: 0.5, y: 1.5, w: 9, h: 0.5,
      fontSize: 22, bold: true, color: DARK
    });
    
    // Büyüme barları
    const growthData = [
      { year: '2026 → 2027', growth: '%100', desc: 'Kullanıcı sayısı 2 katına çıkıyor' },
      { year: '2027 → 2028', growth: '%50', desc: 'Organik büyüme devam ediyor' }
    ];
    
    growthData.forEach((data, i) => {
      slide12.addShape(pptx.ShapeType.rect, {
        x: 1, y: 2.5 + i * 1.8, w: 8, h: 1.3,
        fill: { color: i === 0 ? '3B82F6' : '8B5CF6' }
      });
      slide12.addText(data.year, {
        x: 1.2, y: 2.7 + i * 1.8, w: 2.5, h: 0.4,
        fontSize: 18, bold: true, color: 'FFFFFF'
      });
      slide12.addText(data.growth, {
        x: 4, y: 2.6 + i * 1.8, w: 1.5, h: 0.6,
        fontSize: 32, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide12.addText(data.desc, {
        x: 5.8, y: 2.7 + i * 1.8, w: 3, h: 0.4,
        fontSize: 14, color: 'FFFFFF'
      });
    });
    
    slide12.addText('🌍 Gelecek Planlar:', {
      x: 0.5, y: 5.5, w: 9, h: 0.4,
      fontSize: 16, bold: true, color: DARK
    });
    slide12.addText('• MENA Bölgesi Ekspansiyonu\n• Türki Cumhuriyetler Pazarı\n• Yeni Sektör Entegrasyonları (E-ticaret, Lojistik)', {
      x: 1, y: 6, w: 8, h: 1,
      fontSize: 11, color: '4B5563',
      bullet: true
    });

    // SLAYT 13: TEKNOKENT & EKİP
    let slide13 = pptx.addSlide();
    addTechBackground(slide13);
    addLogoAndBrand(slide13);
    
    slide13.addText('Teknokent Kuluçka & Ekip', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    slide13.addText('🎓 Teknokent Avantajları:', {
      x: 0.5, y: 1.5, w: 9, h: 0.5,
      fontSize: 22, bold: true, color: DARK
    });
    slide13.addText('✓ Düşük ofis gideri\n✓ Mentörlük desteği\n✓ Networking fırsatları\n✓ Yatırımcı erişimi', {
      x: 1, y: 2.1, w: 4, h: 1.5,
      fontSize: 16, color: '4B5563',
      bullet: false
    });
    
    slide13.addText('👥 Ekip Yapısı:', {
      x: 5.5, y: 1.5, w: 4, h: 0.5,
      fontSize: 22, bold: true, color: DARK
    });
    slide13.addText('• Çekirdek Ekip: 3 kişi\n• Full-Stack Developer\n• AI/ML Engineer\n• İş Geliştirme Uzmanı', {
      x: 5.5, y: 2.1, w: 4, h: 1.5,
      fontSize: 16, color: '4B5563',
      bullet: true
    });
    
    slide13.addText('💼 Operasyonel Maliyet:', {
      x: 0.5, y: 4, w: 9, h: 0.5,
      fontSize: 22, bold: true, color: DARK
    });
    slide13.addShape(pptx.ShapeType.rect, {
      x: 1.5, y: 4.7, w: 7, h: 1.8,
      fill: { color: 'FEF3C7' }
    });
    slide13.addText('2026: 8.000 TL/yıl\n2027: 20.000 TL/yıl\n2028: 35.000 TL/yıl', {
      x: 1.5, y: 4.9, w: 7, h: 1.4,
      fontSize: 18, bold: true, color: '92400E',
      align: 'center', valign: 'middle'
    });
    
    slide13.addText('🌱 Bulut ve AI maliyetleri ölçeklenebilir yapıdadır', {
      x: 0.5, y: 6.2, w: 9, h: 0.4,
      fontSize: 11, color: '6B7280',
      align: 'center', italic: true
    });

    // SLAYT 14: YOL HARİTASI
    let slide14 = pptx.addSlide();
    addTechBackground(slide14);
    addLogoAndBrand(slide14);
    
    slide14.addText('Yol Haritası (2026-2028)', {
      x: 0.5, y: 0.8, w: 9, h: 0.6,
      fontSize: 28, bold: true, color: PRIMARY
    });
    
    const roadmap = [
      { 
        quarter: 'Q1 2026', 
        title: 'MVP & Beta', 
        items: '• Platform geliştirme\n• Logo/Netsis entegrasyonu\n• 50 beta kullanıcısı',
        color: '3B82F6'
      },
      { 
        quarter: 'Q2-Q3 2026', 
        title: 'Piyasa Lansmanı', 
        items: '• Resmi lansman\n• İlk 1.000 kullanıcı\n• Pazarlama kampanyaları',
        color: '8B5CF6'
      },
      { 
        quarter: 'Q4 2026', 
        title: 'Büyüme', 
        items: '• 5.000 kullanıcıya ulaşma\n• AI asistanı geliştirme\n• Mobil uygulama',
        color: 'EC4899'
      },
      { 
        quarter: '2027', 
        title: 'Ölçeklendirme', 
        items: '• 30.000 ödeyen kullanıcı\n• Yeni sektör entegrasyonları\n• İkinci ofis',
        color: '10B981'
      },
      { 
        quarter: '2028', 
        title: 'Uluslararası', 
        items: '• 45.000 ödeyen kullanıcı\n• MENA ekspansiyonu\n• Seri A yatırım',
        color: 'F59E0B'
      }
    ];
    
    roadmap.forEach((phase, i) => {
      slide14.addShape(pptx.ShapeType.rect, {
        x: 0.5 + i * 1.9, y: 1.8, w: 1.7, h: 3.8,
        fill: { color: phase.color }
      });
      slide14.addText(phase.quarter, {
        x: 0.5 + i * 1.9, y: 1.9, w: 1.7, h: 0.4,
        fontSize: 12, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide14.addText(phase.title, {
        x: 0.5 + i * 1.9, y: 2.4, w: 1.7, h: 0.5,
        fontSize: 14, bold: true, color: 'FFFFFF',
        align: 'center'
      });
      slide14.addText(phase.items, {
        x: 0.6 + i * 1.9, y: 3.1, w: 1.5, h: 2.3,
        fontSize: 9, color: 'FFFFFF',
        valign: 'top'
      });
    });
    
    slide14.addText('🚀 Her aşamada ölçülebilir hedefler ve kontrol noktaları', {
      x: 0.5, y: 6, w: 9, h: 0.4,
      fontSize: 11, color: '6B7280',
      align: 'center', italic: true
    });

    // SLAYT 15: SON SLAYT - İLETİŞİM & TEŞEKKÜR
    let slide15 = pptx.addSlide();
    addTechBackground(slide15, true);
    
    slide15.addText('TEŞEKKÜR EDERİZ', {
      x: 0.5, y: 1.5, w: 9, h: 1,
      fontSize: 44, bold: true, color: 'FFFFFF',
      align: 'center'
    });
    
    slide15.addText('FINOPS AI STUDIO', {
      x: 0.5, y: 2.8, w: 9, h: 0.8,
      fontSize: 32, bold: true, color: ACCENT,
      align: 'center'
    });
    
    slide15.addText('Türkiye KOBİ\'lerinin Finansal Geleceği', {
      x: 0.5, y: 3.7, w: 9, h: 0.6,
      fontSize: 20, color: 'FFFFFF',
      align: 'center', italic: true
    });
    
    slide15.addShape(pptx.ShapeType.rect, {
      x: 2, y: 4.8, w: 6, h: 1.5,
      fill: { color: 'FFFFFF', transparency: 10 }
    });
    
    slide15.addText('📧 info@finops.ist\n🌐 www.finops.ist\n📱 +90 (XXX) XXX XX XX', {
      x: 2, y: 4.9, w: 6, h: 1.3,
      fontSize: 16, color: 'FFFFFF',
      align: 'center', valign: 'middle',
      bold: true
    });
    
    slide15.addText('💡 Sorularınız için hazırız!', {
      x: 0.5, y: 6.3, w: 9, h: 0.5,
      fontSize: 18, color: 'FFFFFF',
      align: 'center'
    });

    // PPTX'i kaydet
    pptx.writeFile({ fileName: 'FINOPS_Teknokent_Sunum_V2_Profesyonel.pptx' });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 text-gray-900 min-h-screen">
      <div id="business-plan-content">
      {/* Hero Bölümü */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="text-center">
            {/* Language Toggle */}
            <div className="flex justify-end mb-4">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full p-1">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    language === 'tr' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'
                  }`}
                >
                  🇹🇷 TR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    language === 'en' ? 'bg-white text-indigo-600' : 'text-white hover:bg-white/10'
                  }`}
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
              <FileText className="w-4 h-4" />
              <span>{language === 'tr' ? 'Stratejik İş Planı Dokümantasyonu' : 'Strategic Business Plan Documentation'}</span>
            </div>
            <h1 className="mt-4 text-5xl lg:text-7xl font-extrabold tracking-tight">
              FINOPS.ist İş Planı
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              2026-2028 vizyonu, stratejik hedefleri, pazar analizi, operasyonel planı ve finansal projeksiyonları.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">📈 3 Yıllık Projeksiyon</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">🎯 Hedef: 12K Abone</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm font-semibold">💰 ₺322M Net Kazanç</span>
              </div>
            </div>
          </header>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

        <div id="business-plan-content">
          <section id="executive-summary" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
            <SectionTitle icon={FileText}>1. Yönetici Açıklaması</SectionTitle>
            <SectionParagraph>
              FINOPS AI Studio, Türkiye'deki KOBİ'lerin finansal okuryazarlığını artırmak ve yapay zeka destekli operasyonel mükemmelliğe ulaşmalarını sağlamak amacıyla kurulmuş yeni nesil bir SaaS platformudur. Yüksek enflasyon ortamında işletmelere "Nakit Akışı", "Stok Maliyeti" ve "Kârlılık" konularında anlık içgörü sunar. Yerli ERP entegrasyonları (Logo, Netsis) ile global rakiplerinden ayrışır.
            </SectionParagraph>
            <SectionParagraph>
              FINOPS AI Studio'nun temel işlevi, kullanıcıların doğal dil kullanarak (yani düz İngilizce veya Türkçe cümlelerle) karmaşık elektronik tablo görevlerini saniyeler içinde yerine getirmesini sağlamaktır. Platform, iş akışı otomasyonu ve veri analizi üzerine odaklanır.
            </SectionParagraph>
          </section>

          <section id="tools-features" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={Wrench}>2. Temel Araçlar ve Özellikler</SectionTitle>
             <ul className="list-none p-0 space-y-4">
                <ListItem><strong>Formül Üretici (AI Formula Generator):</strong> Kullanıcı, yapmak istediği işlemi doğal dilde yazar. Sistem, bu isteği anında doğru Excel veya Google Sheets formülüne dönüştürür.</ListItem>
                <ListItem><strong>VBA/Komut Dosyası Üretici:</strong> Daha karmaşık otomasyon görevleri için gerekli olan Visual Basic for Applications (VBA) veya Google Apps Script kodlarını otomatik olarak oluşturur.</ListItem>                
                <ListItem><strong>Veri Analizi:</strong> Veri setlerini analiz eder, eğilimleri tespit eder ve bu eğilimler hakkında özetler çıkarır.</ListItem>
                <ListItem><strong>Veri Görselleştirme (BI):</strong> Veri setlerinden otomatik olarak iş zekası (Business Intelligence) panoları ve görselleştirmeler oluşturmaya yardımcı olur.</ListItem>
            </ul>
            <SectionParagraph>
              Özetle, FINOPS AI Studio, Otel/Turizm, Restoran/Cafe, Sağlık Kurumları, Otomotiv/Servis, Perakende Zincirleri gibi sektörlerin Finans, Muhasebe, Pazarlama, Operasyon gibi alanlarda çalışan daha çok CEO, CFO, Yönetim Kurulu ve Üst Yöneticilerin, işletmelerinin faaliyet sonuçlarını net görebilmek ve kararlar alabilmek beklentilerini karşılamak ve gününün büyük bir bölümünü Excel/Sheets'te geçiren kişilerin üretkenliğini artırmayı hedefler.
           </SectionParagraph>
          </section>

          <section id="tech-stack" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={Layers}>3. Arka Planda Çalışan Yazılım Grupları ve Teknolojiler</SectionTitle>
              <ul className="list-none p-0 mt-4 space-y-4">
                  <ListItem><strong>Doğal Dil İşleme (NLP):</strong> Kullanıcının doğal dilde yazdığı istekleri anlamak ve amacını çözümlemek için gelişmiş NLP modelleri kullanılır.</ListItem>
                  <ListItem><strong>Büyük Dil Modelleri (LLM'ler):</strong> Formül veya kod çıktısını üretmek için GPT gibi büyük dil modellerinin optimize edilmiş versiyonları kullanılır.</ListItem>                
                  <ListItem><strong>Bulut Altyapısı:</strong> Platform, tahminen AWS, Azure veya Google Cloud gibi büyük bir bulut sağlayıcısının altyapısında çalışmaktadır.</ListItem>
                  <ListItem><strong>API Entegrasyonları:</strong> Excel ve Google Sheets gibi üçüncü taraf uygulamalarla sorunsuz çalışabilmek için API'ler ve eklentiler kullanılır.</ListItem>
                  <ListItem><strong>Domain/Alan Adı ve E-Posta:</strong> Web tabanlı yapı için www.finops.ist alan adı ve info@finops.ist e-posta adresi tescillenmiştir.</ListItem>
                  <ListItem><strong>Sosyal Medya Platformları:</strong> Bilinirliği güçlendirmek için YouTube, Linkedin, Facebook (@finopsai) ve Instagram (@finops.ist) hesapları oluşturulmuştur.</ListItem>
              </ul>
              <HighlightNote>
                  <p><strong>FinOpsist Nedir?</strong> FinOpsist terimi, FinOps (Finansal Operasyonlar) disiplininde çalışan uzmanları tanımlar. Bu rol, bir şirketin bulut bilişim harcamalarını yönetir, optimize eder ve finans, mühendislik ve iş birimleri arasında bir köprü görevi görür. FinOpsist, kontrolsüz harcamaları durdurarak ve her harcamanın iş değeriyle hizalanmasını sağlayarak şirketin kâr marjını doğrudan artırır. FinOps disiplini, "Herkesin bulut harcamaları konusunda hesap verebilir olduğu bir kültürel uygulama" olarak tanımlanır.</p>
              </HighlightNote>
          </section>


          {/* ----- YENİLENMİŞ FİYATLANDIRMA BÖLÜMÜ ----- */}
          <section id="pricing" className="my-20">
            <SectionTitle icon={Tags}>4. Fiyatlandırma Modeli ve Stratejisi</SectionTitle>
            
            {/* Fiyatlandırma Stratejisi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Esnek Fiyatlandırma</h3>
                <p className="text-gray-600">
                  İşletmelerin büyüklüğüne göre ölçeklenen 5 farklı paket seçeneği. 
                  Girişimci'den Kurumsal'a kadar her ihtiyaca uygun çözüm.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Yıllık İndirim</h3>
                <p className="text-gray-600">
                  Yıllık ödemelerde %20 indirim avantajı. 
                  Uzun vadeli kullanıcılara özel fiyat garantisi ve avantajlar.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beta Partner Programı</h3>
                <p className="text-gray-600">
                  İlk 20 işletmeye 1 yıl ücretsiz kullanım. 
                  1 yıl sonunda %75 indirimli sabit fiyat garantisi.
                </p>
              </div>
            </div>

            <SectionParagraph>
                İşletmelerin ihtiyaçlarına göre ölçeklenen, ücretsiz bir başlangıç katmanı ve yıllık ödemelerde %20 indirim avantajı sağlayan beş temel abonelik katmanı sunulmaktadır. 
                Fiyatlandırma stratejimiz, KOBİ'lerin bütçelerine uygun, şeffaf ve rekabetçi bir yapı sunmaktadır.
            </SectionParagraph>
            
            {/* Fiyatlandırma Özellikleri */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Fiyatlandırma Özellikleri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Taahhütsüz Abonelik</h4>
                    <p className="text-sm text-gray-600">İstediğiniz zaman paketinizi değiştirebilir veya iptal edebilirsiniz.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">14 Gün Para İade Garantisi</h4>
                    <p className="text-sm text-gray-600">İlk 14 gün içinde memnun kalmazsanız tam iade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Yıllık Ödemede %20 İndirim</h4>
                    <p className="text-sm text-gray-600">Peşin ödeme yaparak yıllık %20 tasarruf edin.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Güvenli Ödeme Altyapısı</h4>
                    <p className="text-sm text-gray-600">Iyzico ve Stripe ile SSL sertifikalı güvenli ödeme.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Merkezi Fiyatlandırma Bileşeni */}
            <div className="-mx-4 sm:-mx-6 lg:-mx-8">
              <PricingSection />
            </div>

            {/* Fiyatlandırma Karşılaştırma Tablosu */}
            <div className="mt-16 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">📊 Plan Karşılaştırması</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Özellik</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Girişimci</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">İşletme Dostu</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Premium</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Kurumsal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Kullanıcı Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">1</td>
                      <td className="px-4 py-3 text-center text-gray-600">3</td>
                      <td className="px-4 py-3 text-center text-gray-600">10</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">İşletme Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">1</td>
                      <td className="px-4 py-3 text-center text-gray-600">3</td>
                      <td className="px-4 py-3 text-center text-gray-600">10</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Dashboard Sayısı</td>
                      <td className="px-4 py-3 text-center text-gray-600">5</td>
                      <td className="px-4 py-3 text-center text-gray-600">15</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Sınırsız</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">AI Danışmanlık</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-red-500">❌</td>
                      <td className="px-4 py-3 text-center text-yellow-500">Standart</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">Özel</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-gray-700 font-medium">Destek</td>
                      <td className="px-4 py-3 text-center text-gray-600">Email</td>
                      <td className="px-4 py-3 text-center text-gray-600">Email + Chat</td>
                      <td className="px-4 py-3 text-center text-gray-600">7/24 VIP</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">7/24 Öncelikli</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          {/* ----- BİTİŞ ----- */}

          <section id="competitor-analysis" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={ClipboardList}>5. Türkiye'de Rakip Analizi</SectionTitle>
            <SectionParagraph>
                FINOPS AI Studio’nun "doğal dilden anında Excel formülü ve kodu üretme" işlevi, günümüzde genellikle global teknoloji devlerinin (Microsoft, Google, OpenAI) veya bazı küresel niş firmaların sunduğu bir hizmettir. Türkiye'de bu işlevi tam anlamıyla bağımsız olarak yerine getiren ve öne çıkan bir işletme şu an için bulunmamaktadır; ancak Türk kullanıcılar bu ihtiyacı global YZ araçları veya yerel RPA çözümleri aracılığıyla giderebilmektedir.
            </SectionParagraph>
          </section>

          <section id="swot" className="mt-8">
            <SectionTitle icon={LayoutGrid}>6. SWOT Analizi</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SwotBox 
                    title="Güçlü Yönler"
                    color="border-green-500"
                    icon={Lightbulb}
                    items={[
                        "Yerli ERP'ler (Logo, Netsis) ile tam entegrasyon.",
                        "Türk vergi mevzuatı ve finansal dinamiklere hakimiyet.",
                        "Esnek, modüler ve ölçeklenebilir SaaS mimarisi.",
                        "Finans ve teknoloji alanında deneyimli, çevik kurucu ekip."
                    ]}
                />
                <SwotBox 
                    title="Zayıf Yönler"
                    color="border-yellow-500"
                    icon={AlertTriangle}
                    items={[
                        "Pazarda yeni olmanın getirdiği düşük marka bilinirliği.",
                        "Sınırlı başlangıç pazarlama ve satış bütçesi.",
                        "Nitelikli yapay zeka yeteneğini ekibe katma ve elde tutma zorluğu.",
                        "Geniş entegrasyon yelpazesi sunmanın getireceği teknik karmaşıklık."
                    ]}
                />
                <SwotBox 
                    title="Fırsatlar"
                    color="border-blue-500"
                    icon={Target}
                    items={[
                        "Türkiye'deki KOBİ'lerin artan dijitalleşme ve verimlilik arayışı.",
                        "Enflasyonist ortamın, maliyet kontrolü ve nakit akışı yönetimi ihtiyacını artırması.",
                        "E-fatura ve e-arşiv gibi dijital araçların veri erişimini kolaylaştırması.",
                        "MENA ve Türki Cumhuriyetler gibi yeni pazarlara açılma potansiyeli."
                    ]}
                />
                <SwotBox 
                    title="Tehditler"
                    color="border-red-500"
                    icon={Users}
                    items={[
                        "Global teknoloji devlerinin (Microsoft, Google) benzer özellikleri kendi platformlarına entegre etmesi.",
                        "Büyük ERP oyuncularının KOBİ'ler için rekabetçi modüller geliştirmesi.",
                        "Veri güvenliği ve KVKK uyumluluğu ile ilgili artan düzenleyici riskler.",
                        "Ekonomik dalgalanmaların KOBİ'lerin teknoloji yatırım bütçelerini olumsuz etkilemesi."
                    ]}
                />
            </div>
          </section>

          <section id="market-share" className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200 mt-8">
            <SectionTitle icon={PieChart}>7. Türkiye ERP ve Muhasebe Yazılımı Pazar Payı Dağılımı</SectionTitle>
            <SectionParagraph>
               Türkiye'deki muhasebe ve finansal veri yazılımı pazarı, Kurumsal Kaynak Planlaması (ERP) ve ön/genel muhasebe yazılımları olarak ele alınır. Pazar liderleri ve tahmini pazar payı dağılımı şöyledir. Yerel oyuncular, mevzuat uyumu ve yerel destek ağı avantajlarıyla pazarda baskın konumdadır.
            </SectionParagraph>
             <div className="overflow-x-auto mt-6 shadow-lg rounded-lg bg-white ring-1 ring-gray-200">
                <table className="w-full text-sm text-left text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Oyuncu Grubu</th>
                            <th scope="col" className="px-6 py-3">Tahmini Pazar Payı Aralığı</th>
                            <th scope="col" className="px-6 py-3">Örnek Firmalar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Yerel Büyük/Orta Ölçekli Oyuncular</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%50 - %60</td>
                            <td className="px-6 py-4">Logo Yazılım (Netsis dahil), Mikro Yazılım, Uyumsoft</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Niş ve Diğer Küçük Oyuncular</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%30 - %45</td>
                            <td className="px-6 py-4">Paraşüt, Akınsoft, Zirve</td>
                        </tr>
                        <tr>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900">Küresel Çözüm Tedarikçileri</th>
                            <td className="px-6 py-4 font-bold text-blue-600">%5 - %10</td>
                            <td className="px-6 py-4">SAP, Oracle, Microsoft Dynamics</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </section>

          {/* FİNANSAL FİZİBİLİTE BÖLÜMÜ */}
          <section id="finansal-fizibilite" className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-2xl shadow-xl border-2 border-green-200 mt-12">
            <SectionTitle icon={DollarSign}>
              {language === 'tr' ? '8. Finansal Fizibilite' : '8. Financial Feasibility'}
            </SectionTitle>
            
            <HighlightNote>
              <p className="font-bold text-lg text-gray-900 mb-2">
                {language === 'tr' 
                  ? '3 YILLIK FİNANSAL PROJEKSİYON (2026-2028)' 
                  : '3-YEAR FINANCIAL PROJECTION (2026-2028)'}
              </p>
              <p className="font-semibold text-gray-700">
                {language === 'tr'
                  ? 'Güncellenmiş Finansal Fizibilite Raporu'
                  : 'Updated Financial Feasibility Report'}
              </p>
            </HighlightNote>

            {/* A) GELİRLER */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">A</span>
                {language === 'tr' ? 'GELİRLER' : 'REVENUE'}
              </h3>
              
              <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      <th className="px-6 py-4 text-left font-bold text-base">{language === 'tr' ? 'Metrik' : 'Metric'}</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2026</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2027</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2028</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">
                        {language === 'tr' ? 'Hedef Pazar (KOBİ)' : 'Target Market (SMEs)'}
                      </td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">300,000</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">300,000</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">300,000</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">FINOPS Hedef Kullanıcı %</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">2%</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">4%</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">6%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">FINOPS Hedef Kullanıcı</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">6,000</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">12,000</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">18,000</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Ödeyen Penetrasyon</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">40%</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">50%</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">50%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Ödeyen Kullanıcı</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">2,400</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">6,000</td>
                      <td className="px-6 py-3 text-center font-bold text-purple-600 text-lg">9,000</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Ortalama Aylık Gelir (TL) *1.30</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">959</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">1,247</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">1,621</td>
                    </tr>
                    <tr className="bg-green-100 hover:bg-green-200">
                      <td className="px-6 py-4 text-gray-900 font-bold text-base">Yıllık Brüt Gelir (TL) Mio</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">₺27,619</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">₺89,762</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">₺175,037</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">1$ Parite</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">43</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">56</td>
                      <td className="px-6 py-3 text-center font-bold text-indigo-600">73</td>
                    </tr>
                    <tr className="bg-green-100 hover:bg-green-200">
                      <td className="px-6 py-4 text-gray-900 font-bold text-base">Yıllık Brüt Gelir (USD),000K</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">$642</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">$1,606</td>
                      <td className="px-6 py-4 text-center font-bold text-green-700 text-xl">$2,409</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* B) MALİYETLER */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">B</span>
                {language === 'tr' ? 'MALİYETLER' : 'COSTS'}
              </h3>
              
              <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                      <th className="px-6 py-4 text-left font-bold text-base">Metrik</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2026</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2027</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2028</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Personel Giderleri (TL)</td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">2,340</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">3,042</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">3,955</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Bulut & AI Altyapı (TL)</td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">3,000</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">3,900</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">10%</span> • <span className="font-bold">5,070</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Pazarlama & Satış (TL)</td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">8%</span> • <span className="font-bold">2,200</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">8%</span> • <span className="font-bold">2,860</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">8%</span> • <span className="font-bold">3,720</span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Genel Giderler (TL)</td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">2%</span> • <span className="font-bold">460</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">2%</span> • <span className="font-bold">598</span>
                      </td>
                      <td className="px-6 py-3 text-center text-gray-600">
                        <span className="text-xs text-orange-600">2%</span> • <span className="font-bold">777</span>
                      </td>
                    </tr>
                    <tr className="bg-orange-100 hover:bg-orange-200">
                      <td className="px-6 py-4 text-gray-900 font-bold text-base">Toplam Yıllık Gider (TL)Mio</td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">30%</span><br /><span className="font-bold text-xl">₺8,000</span>
                      </td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">30%</span><br /><span className="font-bold text-xl">₺10,400</span>
                      </td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">30%</span><br /><span className="font-bold text-xl">₺13,522</span>
                      </td>
                    </tr>
                    <tr className="bg-orange-100 hover:bg-orange-200">
                      <td className="px-6 py-4 text-gray-900 font-bold text-base">Toplam Yıllık Gider (USD),000K</td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">54%</span><br /><span className="font-bold text-xl">$344</span>
                      </td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">36%</span><br /><span className="font-bold text-xl">$581</span>
                      </td>
                      <td className="px-6 py-4 text-center text-orange-700">
                        <span className="text-xs">41%</span><br /><span className="font-bold text-xl">$983</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* C) KÂR / ZARAR */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">C</span>
                {language === 'tr' ? 'KÂR / ZARAR' : 'PROFIT / LOSS'}
              </h3>
              
              <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
                      <th className="px-6 py-4 text-left font-bold text-base">Metrik</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2026</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2027</th>
                      <th className="px-6 py-4 text-center font-bold text-base">2028</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Yıllık Brüt Gelir (TL)</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">₺27,619</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">₺89,762</td>
                      <td className="px-6 py-3 text-center font-bold text-green-600">₺175,037</td>
                    </tr>
                    <tr className="bg-gray-50 hover:bg-gray-100">
                      <td className="px-6 py-3 text-gray-700 font-semibold">Toplam Yıllık Gider (TL)</td>
                      <td className="px-6 py-3 text-center font-bold text-orange-600">₺8,000</td>
                      <td className="px-6 py-3 text-center font-bold text-orange-600">₺10,400</td>
                      <td className="px-6 py-3 text-center font-bold text-orange-600">₺13,522</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-300 hover:to-green-300">
                      <td className="px-6 py-5 text-gray-900 font-bold text-base">NET KÂR (TL),000Mio</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">₺19,619</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">₺79,362</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">₺161,515</td>
                    </tr>
                    <tr className="bg-gradient-to-r from-emerald-200 to-green-200 hover:from-emerald-300 hover:to-green-300">
                      <td className="px-6 py-5 text-gray-900 font-bold text-base">NET KÂR (USD),000K</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">$298</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">$1,024</td>
                      <td className="px-6 py-5 text-center font-bold text-emerald-700 text-2xl">$1,426</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                  <p className="text-sm text-gray-600 mb-2">
                    2026 - {language === 'tr' ? 'İlk Yıl' : 'First Year'}
                  </p>
                  <p className="text-3xl font-bold text-green-700">₺19,619</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {language === 'tr' ? 'Net Kâr' : 'Net Profit'}
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300">
                  <p className="text-sm text-gray-600 mb-2">
                    2027 - {language === 'tr' ? 'İkinci Yıl' : 'Second Year'}
                  </p>
                  <p className="text-3xl font-bold text-blue-700">₺79,362</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {language === 'tr' ? 'Net Kâr (+305%)' : 'Net Profit (+305%)'}
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border-2 border-purple-300">
                  <p className="text-sm text-gray-600 mb-2">
                    2028 - {language === 'tr' ? 'Üçüncü Yıl' : 'Third Year'}
                  </p>
                  <p className="text-3xl font-bold text-purple-700">₺161,515</p>
                  <p className="text-xs text-gray-600 mt-1">
                    {language === 'tr' ? 'Net Kâr (+103%)' : 'Net Profit (+103%)'}
                  </p>
                </div>
              </div>

              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                <div className="flex items-center gap-4">
                  <Check className="w-12 h-12 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-semibold text-lg mb-2">
                      {language === 'tr'
                        ? <>İlk yıldan itibaren <span className="text-green-700 font-bold">pozitif nakit akışı</span> ile sürdürülebilir büyüme</>
                        : <><span className="text-green-700 font-bold">Positive cash flow</span> from the first year with sustainable growth</>
                      }
                    </p>
                    <p className="text-sm text-gray-600">
                      {language === 'tr'
                        ? <>3 yıl sonunda toplam <span className="font-bold text-green-700">₺260,496</span> kümülatif net kâr projeksiyonu</>
                        : <>Projected cumulative net profit of <span className="font-bold text-green-700">₺260,496</span> after 3 years</>
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Geçiş Notu */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-md border-2 border-indigo-200">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-indigo-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Yukarıdaki finansal fizibilite analizi, projenin <strong className="text-indigo-700">ekonomik sürdürülebilirliğini</strong> ve 
                    <strong className="text-indigo-700"> ölçeklenebilirlik potansiyelini</strong> somut verilerle ortaya koymaktadır.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Teknokent kuluçka desteği ve inovatif iş modeli sayesinde, platform ilk günden itibaren 
                    <strong className="text-green-700"> pozitif nakit akışı</strong> yaratarak büyüme yolculuğuna başlamaktadır.
                  </p>
                </div>
              </div>
            </div>

            {/* PDF & PPTX İNDİRME BUTONLARI */}
            <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
              <button
                onClick={handleDownloadPDF}
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <Download className="w-6 h-6 group-hover:animate-bounce" />
                <span>İş Planını PDF Olarak İndir</span>
              </button>

              <button
                onClick={handleDownloadPPTX}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 justify-center"
              >
                <Presentation className="w-6 h-6 group-hover:animate-bounce" />
                <span>Teknokent Sunumunu İndir (PPTX)</span>
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              {language === 'tr'
                ? '📄 PDF: Detaylı iş planı • 🎤 PPTX: 15 slayt Teknokent sunumu'
                : '📄 PDF: Detailed business plan • 🎤 PPTX: 15-slide Technopark presentation'
              }
            </p>
            <p className="text-center text-xs text-gray-400 mt-2">
              {language === 'tr'
                ? 'Dosyalar otomatik olarak "İndirilenler" klasörünüze kaydedilecektir'
                : 'Files will be automatically saved to your "Downloads" folder'
              }
            </p>
          </section>

        </div>

      </div>
      </div>
    </div>
  );
};

export default BusinessPlanPage;
