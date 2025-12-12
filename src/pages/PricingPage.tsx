import React, { useState } from 'react';
import { Check, Lock } from 'lucide-react';

const initialTiers = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '#',
    price: { monthly: '$0', annually: '$0' },
    description: 'Temel özelliklerle platformu keşfedin.',
    features: [
      'Günde 3 Mesaj',
      '3 gün Sohbet Geçmişi',
      '2MB Dosya Boyutu',
      'Sohbet başına 2 Dosya',
      'Mesaj başına 1 Dosya',
      '5 AI Araç İsteği',
      'Sınırsız Mesaj/Sohbet',
      'Limitli İş Zekası',
      '1 BI Paneli',
      '1 BI Veri Kaynağı',
      '48 saat içinde E-posta Desteği'
    ],
    cta: 'Ücretsiz Dene',
    mostPopular: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    price: { monthly: '$20', annually: '$16' },
    description: 'Bireyler ve küçük ekipler için ideal.',
    features: [
      'Ayda 250 AI Mesajı',
      '30 gün Sohbet Geçmişi',
      '20MB Dosya Boyutu',
      'Sohbet başına 5 Dosya',
      'Mesaj başına 2 Dosya',
      'Sınırsız AI Araç İsteği',
      'Sınırsız Mesaj/Sohbet',
      'Limitli İş Zekası',
      '1 BI Paneli',
      '1 BI Veri Kaynağı',
      '48 saat içinde E-posta Desteği'
    ],
    cta: 'Yükselt',
    mostPopular: false,
  },
  {
    name: 'Expert',
    id: 'tier-expert',
    href: '#',
    price: { monthly: '$50', annually: '$40' },
    description: 'Profesyoneller ve büyüyen işletmeler için.',
    features: [
      'Sınırsız AI Mesajı',
      '90 gün Sohbet Geçmişi',
      '50MB Dosya Boyutu',
      'Sohbet başına 10 Dosya',
      'Mesaj başına 5 Dosya',
      'Sınırsız AI Araç İsteği',
      'Sınırsız Mesaj/Sohbet',
      'Tam İş Zekası Erişimi',
      '10 BI Paneli',
      '20 BI Veri Kaynağı',
      '24 saat içinde E-posta Desteği'
    ],
    cta: 'Yükselt',
    mostPopular: true,
  },
  {
    name: 'Business',
    id: 'tier-business',
    href: '#',
    price: { monthly: '$299', annually: '$239' }, 
    description: 'Geniş ölçekli operasyonlar için güçlü özellikler.',
    features: [
      'Sınırsız AI Mesajı',
      'Sınırsız Sohbet Geçmişi',
      '200MB Dosya Boyutu',
      'Sohbet başına 20 Dosya',
      'Mesaj başına 10 Dosya',
      'Sınırsız AI Araç İsteği',
      'Sınırsız Mesaj/Sohbet',
      'Tam İş Zekası Erişimi',
      'Sınırsız BI Paneli',
      '100 BI Veri Kaynağı',
      'Öncelikli E-posta Desteği'
    ],
    cta: 'Yükselt',
    mostPopular: false,
  },
]

const PricingPage: React.FC = () => {
    const [frequency, setFrequency] = useState('monthly');

    return (
        <div className="bg-slate-50 py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-base font-semibold leading-7 text-blue-600">Fiyatlandırma</h1>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Bütçenize Uygun Planı Seçin
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                   Şeffaf ve basit fiyatlandırma. Yıllık ödemelerde %20 indirimden yararlanın.
                </p>
                <div className="mt-16 flex justify-center">
                    <div className="flex items-center gap-x-4 rounded-full p-1 bg-gray-100">
                        <button
                            onClick={() => setFrequency('monthly')}
                            className={`${frequency === 'monthly' ? 'bg-white shadow-sm' : ''} rounded-full py-2 px-6 text-sm font-semibold text-gray-700`}>
                            Aylık
                        </button>
                        <button
                            onClick={() => setFrequency('annually')}
                            className={`${frequency === 'annually' ? 'bg-white shadow-sm' : ''} rounded-full py-2 px-6 text-sm font-semibold text-gray-700`}>
                            Yıllık
                        </button>
                    </div>
                </div>
                <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-none lg:grid-cols-4">
                    {initialTiers.map((tier) => (
                        <div
                            key={tier.id}
                            className={`rounded-3xl bg-white p-8 xl:p-10 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${tier.mostPopular ? 'ring-2 ring-blue-600' : 'ring-1 ring-gray-200'}`}>
                            <h3 id={tier.id} className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency]}</span>
                                {tier.name !== 'Free' && <span className="text-sm font-semibold leading-6 text-gray-600">/ay</span>}
                            </p>
                            <a href={tier.href} aria-describedby={tier.id} className={`mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 ${tier.mostPopular ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-500' : 'text-blue-600 ring-1 ring-inset ring-blue-200 hover:ring-blue-300'}`}>
                                {tier.cta}
                            </a>
                            <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <Check className="h-6 w-5 flex-none text-blue-600" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
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
            </div>
        </div>
    );
}

export default PricingPage;
