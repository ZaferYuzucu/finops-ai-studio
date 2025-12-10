import React, { useState } from 'react';

type Plan = {
  name: string;
  priceMonthly: number;
  highlight: string;
  features: string[];
  popular?: boolean;
  free?: boolean;
};

const basePlans: Plan[] = [
  {
    name: 'Free',
    priceMonthly: 0,
    highlight: 'Tek kullanıcı, temel deneme',
    features: [
    'Aylık 15 AI mesajı',
    'Notebooklara erişim',
    'Dosya Depolama Biçimleri',
    'GoogleDrive Veri Bağlayıcı',
    '2GB RAM ile çalışma alanı'
],
    free: true
  },
  {
    name: 'Start Up',
    priceMonthly: 29,
    highlight: "Yeni başlayan KOBİ'ler için",
    features: [
      'Aylık 250 AI mesajı',
      'Tek işletme / tek şube',
      'Standart dashboard kütüphanesi',
      'E-posta ile temel destek',
      '16GB RAM ile çalisma alanı'
    ]
  },
  {
    name: 'Profesyonel',
    priceMonthly: 49,
    highlight: 'Çok şubeli işletmeler için',
    features: [
      '3 işletmeye kadar çoklu şirket',
      'Gelişmiş dashboard setleri',
      'Öncelikli destek',
      '32GB RAM ile çalışma alanı'
    ],
    popular: true
  },
  {
    name: 'Kurumsal',
    priceMonthly: 299,
    highlight: 'Grup şirketleri ve zincirler',
    features: [
      'Sınırsız şirket & kullanıcı',
      'Özel entegrasyon projeleri',
      'Veri bağlantılarında tablo sınırsizliğı',
      'Saha ekibi ile eğitim',
      'SLA anlaşmalı kurumsal destek'
    ]
  }
];

const PricingPage: React.FC = () => {
  const [yearly, setYearly] = useState(true);

  const plans = basePlans.map((p) => {
    const priceUsd = yearly ? p.priceMonthly * 0.8 : p.priceMonthly;
    return { ...p, priceUsd };
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-2xl font-semibold text-slate-50">Fiyatlandırma</h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-300">
          Fiyatlar ABD Doları üzerinden listelenir; Türkiye&apos;deki müşteriler
          için faturalar Türk Lirası (₺) üzerinden, fatura tarihindeki TCMB
          döviz alış kuru baz alınarak kesilir.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-2 py-1 text-[11px]">
          <button
            className={`rounded-full px-3 py-1 ${
              yearly ? 'bg-finops-blue text-white' : 'text-slate-300'
            }`}
            onClick={() => setYearly(true)}
          >
            Yıllık (%20 indirim)
          </button>
          <button
            className={`rounded-full px-3 py-1 ${
              !yearly ? 'bg-finops-blue text-white' : 'text-slate-300'
            }`}
            onClick={() => setYearly(false)}
          >
            Aylık
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border bg-slate-900/70 p-5 text-sm ${
              plan.popular
                ? 'border-finops-blue shadow-lg shadow-blue-900/40'
                : 'border-slate-800'
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-slate-100">
                  {plan.name}
                </div>
                <div className="text-[11px] text-slate-400">
                  {plan.highlight}
                </div>
              </div>
              <div className="text-right">
                {plan.free ? (
                  <div className="text-[11px] font-semibold text-emerald-300">
                    Ücretsiz
                  </div>
                ) : (
                  <>
                    <div className="text-xl font-semibold text-slate-50">
                      ${plan.priceUsd.toFixed(0)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      kullanıcı / ay
                    </div>
                  </>
                )}
              </div>
            </div>
            <ul className="mb-4 flex-1 space-y-2 text-[11px] text-slate-300">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button
              className={`mt-auto rounded-full px-4 py-2 text-[11px] font-semibold ${
                plan.popular
                  ? 'bg-finops-blue text-white hover:bg-blue-500'
                  : 'bg-slate-800 text-slate-100 hover:bg-slate-700'
              }`}
            >
              {plan.free ? 'Ücretsiz Başla' : 'Planı Seç'}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 text-[11px] text-slate-300 space-y-2">
        <div className="font-semibold text-slate-100">
          Faturalandırma &amp; Ödeme Altyapısı
        </div>
        <p>
          Türkiye&apos;deki müşteriler için tüm faturalandırma Türk Lirası (₺)
          üzerinden yapılır. Kur, fatura tarihindeki TCMB döviz alış kuru baz
          alınarak hesaplanır. E-fatura / e-arşiv entegrasyonu opsiyoneldir.
        </p>
        <p>
          Ödemeler iyzico ve PayTR altyapılarıyla tahsil edilir. 256-bit SSL ve
          PCI-DSS uyumlu altyapı sayesinde güvenli ödeme sunulur.
        </p>
      </div>
    </div>
  );
};

export default PricingPage;
