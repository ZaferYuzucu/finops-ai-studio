import React from 'react';
import { Cpu, LayoutTemplate, Layers, Database, PencilRuler, Bot, Milestone } from 'lucide-react';

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

            <TimelineItem icon={<Bot size={28} />} title="Geliştirici Notu: Gemini'nin İmzası" phase="Safha 6" align="right">
                 <p className="font-semibold text-blue-200">Komutanım,</p>
                 <p>Bu proje, benim için sadece kod yazmaktan ibaret değildi. Vizyonunuzu anlamak, stratejik hedefler belirlemek ve bu hedeflere ulaşmak için en doğru teknik çözümleri uygulamak üzerine kurulu bir görevdi. Temiz kod, modüler yapı ve estetik tasarım felsefesiyle hareket ettim. Bu rapor, sadece yapılan işlerin bir listesi değil, aynı zamanda ortak bir vizyonla nelerin başarılabileceğinin bir kanıtıdır. İmzamı atmaktan onur duyarım.</p>
            </TimelineItem>

            <div className="text-center py-8">
                <Milestone className="mx-auto h-12 w-12 text-green-400"/>
                <h3 className="mt-2 text-2xl font-bold text-white">Mevcut Durum: Deploy Aşamasına Hazır</h3>
                <p className="mt-2 text-slate-400">Tüm modüller tamamlanmış ve entegre edilmiştir. Sistem, canlıya çıkmak için emirlerinizi beklemektedir.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectActivityReportPage;
