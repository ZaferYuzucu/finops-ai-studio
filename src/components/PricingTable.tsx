
import React, { useState } from 'react';
import { Check, Lock, Award } from 'lucide-react';

// TEK DOĞRU: Fiyatlandırma verileri ve mantığı için merkezi bileşen.
// Herhangi bir değişiklik sadece bu dosyada yapılır.
const tiers = [
  {
    name: 'Girişimci',
    id: 'tier-free',
    href: '/signup', 
    price: { monthly: '0 TL', annually: '0 TL' },
    description: 'Finansal röntgeninizi ücretsiz çekin.',
    features: [
      '1 İşletme Tanımlama',
      'Aylık Temel Gelir/Gider Takibi',
      'e-Fatura Görüntüleme',
    ],
    cta: 'Ücretsiz Başla',
    mostPopular: false,
    style: {
        background: 'bg-green-50',
        ring: 'ring-green-200',
        shadow: 'hover:shadow-green-200/60',
        button: 'text-green-600 ring-1 ring-inset ring-green-200 hover:ring-green-300',
    }
  },
  {
    name: 'İşletme Dostu',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '599 TL', annually: '479 TL' },
    description: 'Kapasitenizi doldurun, kârınızı artırın.',
    features: [
      'Girişimci Planındaki Her Şey',
      'Banka ve POS Entegrasyonu',
      'Haftalık Maliyet Artış Raporu',
      '3 Kullanıcı Erişimi',
    ],
    cta: 'Yükselt',
    mostPopular: false,
    style: {
        background: 'bg-orange-50', 
        ring: 'ring-orange-200',
        shadow: 'hover:shadow-orange-200/60',
        button: 'text-orange-600 ring-1 ring-inset ring-orange-200 hover:ring-orange-300',
    }
  },
  {
    name: 'Premium',
    id: 'tier-premium',
    href: '#',
    price: { monthly: '1.799 TL', annually: '1.439 TL' }, // FİYAT GÜNCELLENDİ
    description: 'Veriyle yönetin, farkınızı koyun.',
    features: [
        'İşletme Dostu Planındaki Her Şey',
        'Regalo ve Stok Analizi (Sektörel)',
        'Personel Verimlilik Karnesi',
        '10 Özel Dashboard Panel Kurulumu',
    ],
    cta: 'Yükselt',
    mostPopular: true,
    style: {
        background: 'bg-blue-100',
        ring: 'ring-blue-600',
        shadow: 'hover:shadow-blue-300/60',
        button: 'bg-blue-600 text-white shadow-sm hover:bg-blue-500',
    }
  },
  {
    name: 'Kurumsal',
    id: 'tier-business',
    href: '/contact', 
    price: { monthly: 'Teklif Alın', annually: 'Teklif Alın' },
    description: 'Tam hakimiyet, sınırsız güç',
    features: [
        'Premium Planındaki Her Şey',
        'Çoklu Şube / Otel Yönetimi',
        'Özel AI Danışmanlık',
        '7/24 Öncelikli Destek',
    ],
    cta: 'Teklif Alın',
    mostPopular: false,
    style: {
        background: 'bg-violet-50', 
        ring: 'ring-violet-200',
        shadow: 'hover:shadow-violet-200/60',
        button: 'text-violet-600 ring-1 ring-inset ring-violet-200 hover:ring-violet-300',
    }
  },
];

const PricingTable: React.FC = () => {
    const [frequency, setFrequency] = useState('monthly');

    return (
        <>
            <div className="mt-16 flex justify-center">
                <div className="flex items-center gap-x-1 rounded-full p-1 bg-gray-200">
                    <button
                        onClick={() => setFrequency('monthly')}
                        className={`${frequency === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700'} rounded-full py-2 px-5 text-sm font-semibold focus:outline-none transition-colors`}>
                        Aylık
                    </button>
                    <button
                        onClick={() => setFrequency('annually')}
                        className={`${frequency === 'annually' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700'} rounded-full py-2 px-5 text-sm font-semibold focus:outline-none transition-colors`}>
                        Yıllık (%20 İndirim)
                    </button>
                </div>
            </div>

            <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-4">
                {tiers.map((tier) => (
                    <div
                        key={tier.id}
                        className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl ${tier.style.background} ${tier.mostPopular ? 'ring-2' : 'ring-1'} ${tier.style.ring} ${tier.style.shadow}`}>
                        {tier.mostPopular && (
                            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                <div className="flex items-center justify-center gap-x-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-md">
                                    <Award className="h-4 w-4" />
                                    Önerilen
                                </div>
                            </div>
                        )}
                        <div className="flex-grow mt-4">
                            <h3 id={tier.id} className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                            <div className="mt-6 flex items-center h-14">
                                <p className="flex items-baseline gap-x-1">
                                    <span className={`text-4xl font-bold tracking-tight ${tier.name === 'Kurumsal' ? 'text-blue-600' : 'text-gray-900'}`}>
                                        {tier.price[frequency as keyof typeof tier.price]}
                                    </span>
                                    {tier.name !== 'Girişimci' && tier.name !== 'Kurumsal' && <span className="text-sm font-semibold leading-6 text-gray-600">/ay</span>}
                                </p>
                            </div>
                            <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a href={tier.href} aria-describedby={tier.id} className={`mt-10 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 ${tier.style.button}`}>
                            {tier.cta}
                        </a>
                    </div>
                ))}
            </div>
             <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-6 text-gray-500">
                * Yıllık planlar peşin olarak faturalandırılır.
            </p>
            <div className="mt-8 flex items-center justify-center text-center text-sm text-gray-500">
                <Lock className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                <span>
                Tüm ödemeleriniz <strong>Iyzico</strong> ve <strong>Stripe</strong> altyapısı ile güvenle gerçekleştirilmektedir.
                </span>
            </div>
        </>
    );
}

export default PricingTable;
