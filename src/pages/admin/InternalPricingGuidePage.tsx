import React from 'react';
import { Shield, FileText, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function InternalPricingGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-full mb-4">
              <Shield className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700">
                ADMIN / GİZLİ — Kullanıcıya gösterilmez
              </span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              Kurumsal Pazarlık Rehberi
            </h1>
            <p className="mt-2 text-gray-600">
              Kurumsal satış görüşmelerinde fiyat konuşurken iç kullanım dokümanı.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/office"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all text-sm font-semibold text-gray-800"
            >
              <FileText className="w-4 h-4" />
              Yönetim Ofisi
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-10">
            <section>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-700" /> 1) Dokümanın Amacı
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Kurumsal müşterilerle fiyat konuşurken:
              </p>
              <ul className="mt-3 list-disc pl-6 space-y-2 text-gray-700">
                <li>Alt sınırı korumak</li>
                <li>İndirim baskısına teknik &amp; ticari cevap vermek</li>
                <li>Maliyetin neden sorun olmadığı</li>
                <li>Değerin nereden geldiğini netleştirmek</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900">
                2) Kurumsal Fiyat Modeli (Referans)
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-extrabold text-gray-900">
                        Base Paket
                      </div>
                      <div className="mt-1 text-gray-700">
                        <span className="text-2xl font-extrabold text-indigo-700">
                          3.500 TL
                        </span>{' '}
                        <span className="text-sm text-gray-600">/ ay</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-bold text-gray-900">Dahil:</div>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700">
                    <li>1 ana işletme</li>
                    <li>1 CFO view-only link</li>
                    <li>Cache’li canlı dashboard</li>
                    <li>PDF export</li>
                    <li>Okuma logları</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-gray-900">
                    Ek İşletme / Şube
                  </div>
                  <div className="mt-1 text-gray-700">
                    <span className="text-2xl font-extrabold text-indigo-700">
                      +400 TL
                    </span>{' '}
                    <span className="text-sm text-gray-600">/ ay / şube</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Alt sınır: <span className="font-bold text-gray-900">300 TL</span>{' '}
                    (özel durumlarda)
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900">
                3) Örnek Senaryolar (İç Kullanım)
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-gray-900">
                    🏨 5 Şubeli Otel Grubu
                  </div>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <div>
                      Base: <span className="font-bold">3.500</span>
                    </div>
                    <div>
                      4 × 400 = <span className="font-bold">1.600</span>
                    </div>
                    <div className="pt-2">
                      👉 Toplam: <span className="text-lg font-extrabold text-indigo-700">5.100 TL</span>{' '}
                      <span className="text-sm text-gray-600">/ ay</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-gray-900">
                    🍽️ 15 Şubeli Restoran Zinciri
                  </div>
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <div>
                      Base: <span className="font-bold">3.500</span>
                    </div>
                    <div>
                      14 × 300 = <span className="font-bold">4.200</span>
                    </div>
                    <div className="pt-2">
                      👉 Toplam: <span className="text-lg font-extrabold text-indigo-700">7.700 TL</span>{' '}
                      <span className="text-sm text-gray-600">/ ay</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900">
                4) Pazarlıkta Kullanılacak Argümanlar
              </h2>

              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-sm font-extrabold text-gray-900">
                  “Maliyetiniz nedir?”
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  Cevap (iç kullanım):
                </div>
                <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700">
                  <li>Firestore maliyeti düşüktür</li>
                  <li>
                    Asıl değer:
                    <ul className="mt-1 list-disc pl-6 space-y-1">
                      <li>Güvenli paylaşım</li>
                      <li>Cache &amp; performans</li>
                      <li>Yönetici zaman tasarrufu</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-sm font-extrabold text-gray-900">
                  “Şube başı neden ücretli?”
                </div>
                <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700">
                  <li>Her şube: ayrı veri seti</li>
                  <li>Ayrı raporlama sorumluluğu</li>
                  <li>CFO ekranı tek, veri çok</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-gray-900">
                5) İndirim Kuralları (Kırmızı Çizgi)
              </h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <div className="text-sm font-extrabold text-red-700">❌ Asla</div>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-red-800">
                    <li>Base paket asla düşmez</li>
                    <li>CFO linki ücretsiz verilmez</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-5">
                  <div className="text-sm font-extrabold text-green-700">✅ Esneklik</div>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-green-800">
                    <li>Sadece şube başı fiyat</li>
                    <li>Uzun dönem (6–12 ay) durumlarında</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

