import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhatIsFinopsPage: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                Bilgi Merkezine Geri Dön
            </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">FinOps Nedir?: Temel Bir Rehber</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FinOps, bulut harcamalarınızdan maksimum iş değeri elde etmek için finansal hesap verebilirliği değişken bulut modeline getiren, gelişen bir bulut finansal yönetimi disiplini ve kültürel bir uygulamadır. FinOps'un özü, "Bilgilendir, Optimize Et, Yönet" olarak bilinen yinelemeli bir döngüde yatmaktadır.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div className="space-y-8 text-gray-600 leading-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Bilgilendir (Inform)</h2>
                <p>Bu ilk aşama, görünürlükle ilgilidir. Ekiplere, bulut harcamaları hakkında doğru, zamanında ve anlaşılır bilgiler sağlanır. Bu, maliyetlerin nereden geldiğini, kimin sorumlu olduğunu ve hangi iş metrikleriyle ilişkili olduğunu anlamalarını sağlar. Etkili etiketleme (tagging) stratejileri, maliyet ayırma (cost allocation) raporları ve dashboard'lar bu aşamanın temel araçlarıdır.</p>
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">2. Optimize Et (Optimize)</h2>
                <p>Görünürlük sağlandıktan sonra, optimizasyon aşamasına geçilir. Bu aşama sadece maliyetleri kesmekle ilgili değildir; verimliliği artırmakla ilgilidir. Ekipler, kullanılmayan kaynakları (idle resources) kapatmak, doğru boyutlandırma (right-sizing) yapmak ve AWS Savings Plans veya Azure Reserved Instances gibi indirimli fiyatlandırma modellerinden yararlanmak için yetkilendirilir. Amaç, performanstan ödün vermeden en düşük maliyetle en yüksek değeri elde etmektir.</p>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900">3. Yönet (Operate)</h2>
                <p>Yönetim aşaması, FinOps uygulamalarını sürekli ve otomatik hale getirmeyi hedefler. Bu, belirlenen bütçeleri aşan harcamalar için uyarılar (alerts) ayarlamayı, anormallik tespiti (anomaly detection) mekanizmaları kurmayı ve yönetişim politikalarını (governance policies) otomatikleştirmeyi içerir. Ekipler, hız ve inovasyondan ödün vermeden finansal hedeflere uygun hareket ettiklerinden emin olurlar.</p>
                 <p className="font-semibold text-gray-800">Bu döngü, FinOps'u tek seferlik bir proje değil, sürekli bir kültürel pratik haline getirir. Şirketler, bu üç adımı yineleyerek bulut harcamaları üzerinde kontrol sağlarken, mühendislik ekiplerinin de inovasyon yapma özgürlüğünü korur.</p>
            </div>
            <div className="flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e28f81?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="FinOps Döngüsü İllüstrasyonu"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsFinopsPage;
