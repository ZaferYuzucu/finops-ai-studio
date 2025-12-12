import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BringingTeamsTogetherPage: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                Bilgi Merkezine Geri Dön
            </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Ekipleri Buluşturmak: Finans ve Mühendislik İş Birliği</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Geleneksel olarak, finans ekipleri maliyetleri kontrol etmeye odaklanırken, mühendislik ekipleri ise hız ve yenilik peşindedir. Bu farklı hedefler, sık sık sürtüşmelere yol açar. FinOps, bu iki dünyayı "Birim Maliyet" ve "Paylaşılan Sorumluluk" kavramlarıyla ortak bir dilde buluşturarak bu sorunu çözer.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
             <div className="flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Ekiplerin iş birliği yaptığı bir toplantı"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
            </div>
            <div className="space-y-8 text-gray-600 leading-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Birim Maliyet (Unit Cost) Nedir?</h2>
                <p>Bulut maliyetlerini sadece toplam harcama olarak görmek, anlamlı bir diyalog kurmayı engeller. Bunun yerine FinOps, maliyetleri iş metriklerine bağlar. Örneğin, "toplam sunucu maliyeti" yerine "müşteri başına düşen maliyet" veya "işlem başına maliyet" gibi metrikler kullanılır. Bu, mühendislerin yaptıkları teknik seçimlerin finansal etkisini, finans ekiplerinin de iş büyümesinin maliyetler üzerindeki etkisini anlamasını sağlar.</p>
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Paylaşılan Sorumluluk (Shared Responsibility)</h2>
                <p>FinOps, maliyet yönetimini sadece finans departmanının bir görevi olmaktan çıkarır. Bunun yerine, her mühendisin, geliştirdiği servisin maliyetinden sorumlu olduğu bir kültür yaratır. Bu, maliyetin bir "suçlama" aracı değil, herkesin optimize etmeye çalıştığı bir "metrik" haline gelmesini sağlar. Finans, merkezi bütçeleme ve yönetişim sağlarken, mühendislik ekipleri de kendi kaynaklarını verimli kullanma ve optimize etme yetkisine sahip olur.</p>
                
                <p className="font-semibold text-gray-800">Bu iki kavram birleştiğinde, finans ve mühendislik artık karşı karşıya değil, aynı hedefe koşan, aynı dili konuşan ortaklar haline gelir. Sonuç, maliyet açısından verimli, ancak aynı zamanda yenilikçi ve hızlı bir organizasyondur.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BringingTeamsTogetherPage;
