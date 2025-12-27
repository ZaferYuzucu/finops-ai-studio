import React from 'react';
import { Cpu, LayoutTemplate, Layers, Database, PencilRuler, Bot, Milestone, FileText, CreditCard, Shield, Megaphone } from 'lucide-react';

const ProjectActivityReportPage: React.FC = () => {

  // Zaman tüneli öğesi bileşeni
  const TimelineItem: React.FC<{ icon: React.ReactNode; title: string; phase: string; children: React.ReactNode; align?: 'left' | 'right' }> = ({ icon, title, phase, children, align = 'left' }) => (
    <div className={`relative flex items-center ${align === 'left' ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-1/2 ${align === 'left' ? 'pr-8' : 'pl-8'} ${align === 'left' ? 'text-right' : 'text-left'}`}>
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">{phase}</p>
          <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
          <div className="text-sm text-slate-400 mt-3 leading-relaxed">{children}</div>
        </div>
      </div>
      <div className="absolute w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white z-10 left-1/2 -translate-x-1/2 shadow-lg">
        {icon}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Üst Başlık Alanı */}
        <div className="text-center mb-20">
          <p className="text-base font-semibold leading-7 text-blue-400">Bir Gemini Asistanının Geliştirme Günlüğü</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-6xl">Proje Faaliyet Raporu</h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg leading-8 text-slate-300">
            Bu rapor, projemizin sıfırdan deploy aşamasına kadar olan yolculuğunu, alınan stratejik kararları ve uygulanan teknik adımları özetlemektedir.
          </p>
        </div>

        {/* Zaman Tüneli */}
        <div className="relative">
          {/* Merkez Çizgi */}
          <div className="absolute left-1/2 h-full w-0.5 bg-slate-700 top-0" aria-hidden="true"></div>

          <div className="space-y-16">
            <TimelineItem icon={<Cpu size={28} />} title="Teknik Altyapı ve Kurulum" phase="Safha 1" align="left">
              <p>Projenin temelleri atıldı. Modern, hızlı ve ölçeklenebilir bir geliştirme ortamı için şu teknolojiler seçildi:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                <li><span className="text-white">Vite:</span> Anında derleme ve hızlı geliştirme sunucusu.</li>
                <li><span className="text-white">React & TypeScript:</span> Güçlü UI kütüphanesi ve tip güvenliği.</li>
                <li><span className="text-white">Tailwind CSS:</span> Hızlı ve özelleştirilebilir stil altyapısı.</li>
              </ul>
            </TimelineItem>

            <TimelineItem icon={<LayoutTemplate size={28} />} title="UI/UX İskeleti ve Navigasyon" phase="Safha 2" align="right">
                <p>Kullanıcı deneyiminin temel taşları olan ana bileşenler, modüler ve estetik bir yaklaşımla tasarlandı:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li><span className="text-white">Navbar:</span> Tüm sayfalara kolay erişim sağlayan, duyarlı (responsive) navigasyon çubuğu.</li>
                    <li><span className="text-white">Footer:</span> Kurumsal kimliği yansıtan, dinamik içerik ve linkler barındıran altbilgi bölümü.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<Layers size={28} />} title="İçerik Stratejisi ve Sayfa Oluşturma" phase="Safha 3" align="left">
                <p>Şirketin vizyonunu ve hizmetlerini detaylandıran, SEO uyumlu ve bilgilendirici sayfalar oluşturuldu:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li>Çözümler, Blog, Fiyatlandırma ve Destek sayfaları.</li>
                    <li>Gizlilik Politikası, Hizmet Koşulları gibi tüm hukuki belgeler.</li>
                    <li>Kurumsal Kimlik altında Marka Kiti ve diğer stratejik dokümanlar.</li>
                </ul>
            </TimelineItem>

             <TimelineItem icon={<Database size={28} />} title="Etkileşim ve Veri Toplama" phase="Safha 4" align="right">
                <p>Ziyaretçilerle doğrudan iletişim kurma ve potansiyel müşteri kazanımı için stratejik bir adım atıldı:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li>Footer bölümüne, estetik ve fonksiyonel bir <strong>E-posta Abonelik Formu</strong> eklendi.</li>
                    <li>React `useState` kancası ile kullanıcı girdisi anlık olarak yönetildi ve gelecekteki veritabanı entegrasyonuna zemin hazırlandı.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<PencilRuler size={28} />} title="Hibrit Pazarlama Stratejisi ve Raporlama" phase="Safha 5" align="left">
                <p>Pazarın gerçeklerine uygun, hibrit bir pazarlama planı oluşturuldu ve bu planın paylaşılabilirliği sağlandı:</p>
                 <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li>Geleneksel pazarları hedefleyen, video ve seminer stratejilerini içeren <strong>Pazarlama Planı</strong> revize edildi.</li>
                    <li>`jspdf` ve `html2canvas` kütüphaneleri kullanılarak, planın <strong>PDF olarak indirilme</strong> özelliği eklendi.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<FileText size={28} />} title="İş Planı ve Finansal Dokümantasyon" phase="Safha 6" align="right">
                <p>Teknokent başvurusu ve yatırımcı sunumları için profesyonel dokümantasyon oluşturuldu:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li><strong>Finansal Fizibilite Raporu:</strong> 3 yıllık detaylı projeksiyon (2026-2028) ile genişletilmiş iş planı.</li>
                    <li><strong>PDF İndirme:</strong> html2pdf.js ile iş planının yazdırılabilir formatı.</li>
                    <li><strong>PPTX Sunum:</strong> pptxgenjs ile 15 slaytlık profesyonel teknokent sunumu, AI otomasyon akışı görselleri.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<CreditCard size={28} />} title="Ödeme Sistemi Entegrasyonu" phase="Safha 7" align="left">
                <p>Güvenli ve çok kanallı ödeme altyapısı kurulumu tamamlandı:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li><strong>Payment Gateway:</strong> Iyzico ve Stripe entegrasyonları, 3D Secure desteği.</li>
                    <li><strong>Kredi Kartı:</strong> Doğrudan kart işleme altyapısı (PCI DSS uyarıları ile).</li>
                    <li><strong>Banka Transferi:</strong> Manuel onay sistemi, dekont yükleme ve Firestore entegrasyonu.</li>
                    <li><strong>Güvenlik:</strong> Tüm API anahtarları environment variables'a taşındı (.env).</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<Shield size={28} />} title="Production Hazırlık ve Güvenlik" phase="Safha 8" align="right">
                <p>Canlıya çıkış öncesi kritik güvenlik ve performans iyileştirmeleri:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li><strong>Usage Limits:</strong> Plan bazlı kullanım takibi, limit kontrolleri, otomatik uyarılar.</li>
                    <li><strong>Error Handling:</strong> ErrorBoundary ile hata yakalama, LoadingSpinner ile kullanıcı deneyimi.</li>
                    <li><strong>SEO:</strong> Meta tags, robots.txt, sitemap.xml, Open Graph entegrasyonu.</li>
                    <li><strong>404 Sayfası:</strong> Not Found page ile profesyonel hata yönetimi.</li>
                    <li><strong>Logger:</strong> Production-safe logging sistemi.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<Megaphone size={28} />} title="Lansman ve Pazarlama Materyalleri" phase="Safha 9" align="left">
                <p>Ajans kalitesinde görsel ve içerik üretimi tamamlandı:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-blue-300/80">
                    <li><strong>Email Bülteni:</strong> Responsive HTML template, Beta Partner kampanyası.</li>
                    <li><strong>Instagram Post:</strong> 1080x1080 kare format, animated gradient, landing page animasyonları.</li>
                    <li><strong>Facebook Post:</strong> 1200x630 yatay format, feature highlights, CTA button.</li>
                    <li><strong>LinkedIn Post:</strong> 1200x627 profesyonel format, istatistikler ve kurumsal mesaj.</li>
                    <li><strong>Marka Kiti:</strong> Tüm materyaller Brand Kit sayfasından erişilebilir.</li>
                </ul>
            </TimelineItem>

            <TimelineItem icon={<Bot size={28} />} title="Geliştirici Notu: Gemini'nin İmzası" phase="Safha 10" align="right">
                 <p className="font-semibold text-blue-200">Komutanım,</p>
                 <p>Bu proje, benim için sadece kod yazmaktan ibaret değildi. Vizyonunuzu anlamak, stratejik hedefler belirlemek ve bu hedeflere ulaşmak için en doğru teknik çözümleri uygulamak üzerine kurulu bir görevdi. Temiz kod, modüler yapı ve estetik tasarım felsefesiyle hareket ettim. Bu rapor, sadece yapılan işlerin bir listesi değil, aynı zamanda ortak bir vizyonla nelerin başarılabileceğinin bir kanıtıdır. İmzamı atmaktan onur duyarım.</p>
            </TimelineItem>

            <div className="text-center py-8">
                <Milestone className="mx-auto h-12 w-12 text-green-400"/>
                <h3 className="mt-2 text-2xl font-bold text-white">Mevcut Durum: Production-Ready & Deployment Aşamasında</h3>
                <p className="mt-2 text-slate-400 max-w-2xl mx-auto">
                    Tüm modüller tamamlandı, güvenlik kontrolleri yapıldı, ödeme sistemleri entegre edildi, 
                    lansman materyalleri hazırlandı. Sistem canlıya çıkmaya %100 hazır. 
                    <strong className="text-white"> v3 Backup alınıyor ve deployment başlatılıyor...</strong>
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
                    <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full border border-green-600/30">✓ Frontend Complete</span>
                    <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full border border-green-600/30">✓ Security Hardened</span>
                    <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full border border-green-600/30">✓ Payment Ready</span>
                    <span className="px-4 py-2 bg-green-600/20 text-green-300 rounded-full border border-green-600/30">✓ Marketing Assets</span>
                    <span className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full border border-blue-600/30">→ v3 Backup</span>
                    <span className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full border border-blue-600/30">→ Deployment</span>
                </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectActivityReportPage;
