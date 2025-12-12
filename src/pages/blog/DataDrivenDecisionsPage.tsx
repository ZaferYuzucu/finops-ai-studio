import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DataDrivenDecisionsPage: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
            <Link to="/blog" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8">
                <ArrowLeft className="h-4 w-4" />
                Bilgi Merkezine Geri Dön
            </Link>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Veri Odaklı Kararlar Almak</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FinOps kültüründe kararlar, içgüdülere veya varsayımlara değil, somut verilere dayanır. Bu, şirketlerin hem maliyetleri kontrol altında tutmasını hem de geleceği daha isabetli bir şekilde planlamasını sağlar. Özellikle anormallik tespiti ve bütçe tahminleme gibi alanlarda veri, en kritik rolü oynar.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl lg:max-w-7xl grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-8">
            <div className="space-y-8 text-gray-600 leading-7">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Anormallik Tespiti (Anomaly Detection)</h2>
                <p>Bulut ortamları dinamiktir ve maliyetler beklenmedik bir şekilde fırlayabilir. Bir geliştiricinin yanlışlıkla sonsuz bir döngüye giren bir kod yazması veya bir servisin aniden aşırı kaynak tüketmeye başlaması gibi durumlar, maliyet faturalarını şişirebilir. Veri odaklı anormallik tespiti sistemleri, normal harcama düzenlerini öğrenir ve bu düzenin dışına çıkan ani artışları anında tespit ederek ilgili ekiplere uyarı gönderir. Bu, sürpriz faturaların önüne geçerek finansal öngörülebilirliği artırır.</p>
                
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Bütçe Tahminleme ve Kapasite Planlaması</h2>
                <p>Geçmiş harcama verileri, gelecekteki bulut maliyetlerini tahmin etmek için altın değerindedir. FinOps ekipleri, bu verileri kullanarak mevsimsel trendleri, büyüme oranlarını ve yeni projelerin potansiyel maliyetlerini analiz eder. Bu, sadece daha doğru bütçeler oluşturmayı sağlamakla kalmaz, aynı zamanda kapasite planlamasını da kolaylaştırır. Ekipler, gelecekteki kaynak ihtiyaçlarını önceden tahmin ederek, ne zaman ve ne kadar yatırım yapmaları gerektiğini bilirler.</p>

                <p className="font-semibold text-gray-800">Veriye dayalı karar alma, FinOps'u reaktif bir maliyet kontrol mekanizmasından, proaktif bir stratejik yönetim disiplinine dönüştürür. Şirketler, kaynaklarını en verimli şekilde kullanarak inovasyon için daha fazla alan yaratır.</p>
            </div>
            <div className="flex items-center justify-center">
                <img 
                    src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Veri analizi ve grafiklerin olduğu bir dashboard ekranı"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DataDrivenDecisionsPage;
