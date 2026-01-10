import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  ClipboardList,
  Route,
  Shield,
} from 'lucide-react';

type Status = 'Var' | 'Kısmen' | 'Yok';

function StatusPill({ status }: { status: Status }) {
  const ui =
    status === 'Var'
      ? {
          text: 'Var',
          cls: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-700" />,
        }
      : status === 'Kısmen'
        ? {
            text: 'Kısmen',
            cls: 'bg-amber-50 text-amber-900 border-amber-200',
            icon: <AlertTriangle className="w-4 h-4 text-amber-700" />,
          }
        : {
            text: 'Yok',
            cls: 'bg-rose-50 text-rose-800 border-rose-200',
            icon: <XCircle className="w-4 h-4 text-rose-700" />,
          };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold ${ui.cls}`}>
      {ui.icon}
      {ui.text}
    </span>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-gray-600">{subtitle}</p> : null}
      </div>
    </div>
  );
}

export default function ExecutiveStatusReportPage() {
  const lastUpdated = useMemo(() => new Date().toLocaleDateString('tr-TR'), []);

  const statuses = useMemo(
    () =>
      [
        {
          key: 'A',
          title: 'Veri Girişi & Kullanıcı Rehberliği',
          status: 'Kısmen' as const,
          note: 'Rehber içerikleri var; erişim iyileştirildi ancak veri girişiyle uçtan uca ürünleşme kısmi.',
        },
        {
          key: 'B',
          title: 'Veri Alma Altyapısı',
          status: 'Kısmen' as const,
          note: 'Kullanıcı akışında simülasyon izleri var; admin tarafında local veri katmanı mevcut.',
        },
        {
          key: 'C',
          title: 'Hazır Dashboard Şablonları',
          status: 'Var' as const,
          note: 'Sektörlere göre ayrılmış çok sayıda şablon mevcut.',
        },
        {
          key: 'D',
          title: 'Manuel Dashboard Oluşturma',
          status: 'Var' as const,
          note: 'Kullanıcı dashboard oluşturabilir, kaydedebilir, listeleyebilir ve düzenleyebilir (beta: localStorage).',
        },
        {
          key: 'E',
          title: 'PDF & Paylaşım Yetenekleri',
          status: 'Kısmen' as const,
          note: 'Demo/şablonda A4 yatay PDF var; paylaşım MVP + opsiyonel expire/watermark/log (client-only).',
        },
        {
          key: 'F',
          title: 'Dashboard Sihirbazı & AI Desteği',
          status: 'Kısmen' as const,
          note: 'Wizard/AI demo var; gerçek veriyle uçtan uca standartlar tam teyit değil.',
        },
        {
          key: 'G',
          title: 'Dashboard Kütüphanesi & Şablonlaştırma',
          status: 'Kısmen' as const,
          note: 'Admin; kullanıcı dashboard’larını (verisiz) inceleyip uyarı bırakabilir ve şablon kütüphanesine ekleyebilir (beta: localStorage, cihaz bazlı).',
        },
      ] as const,
    [],
  );

  const templateCounts = useMemo(
    () => [
      { label: 'Restoran & Kafe', value: 6 },
      { label: 'Otel & Konaklama', value: 4 },
      { label: 'E‑Ticaret & Retail', value: 3 },
      { label: 'Finans & Muhasebe', value: 7 },
      { label: 'Üretim & Operasyon', value: 8 },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full mb-4">
              <ClipboardList className="w-4 h-4 text-indigo-700" />
              <span className="text-sm font-extrabold text-indigo-800">
                Yönetici Bilgilendirme Raporu
              </span>
              <span className="text-xs font-bold text-indigo-700/80">• Son güncelleme: {lastUpdated}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              FİNO — Dashboard Platformu Durum Analizi
            </h1>
            <p className="mt-3 text-gray-700 max-w-3xl leading-relaxed">
              Amaç: “Fino dashboard platformu, uçtan uca bir yönetici karar destek sistemi olarak bugün ne durumda?”
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/office"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all text-sm font-semibold text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Yönetim Ofisi
            </Link>
          </div>
        </div>

        {/* Executive summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-500">Genel olgunluk</div>
            <div className="mt-2 text-xl font-extrabold text-gray-900">Kısmen</div>
            <div className="mt-1 text-sm text-gray-600">Demo/şablon güçlü, ürün zinciri tamam değil.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-500">PDF (A4 yatay)</div>
            <div className="mt-2 text-xl font-extrabold text-gray-900">Var</div>
            <div className="mt-1 text-sm text-gray-600">Demo/şablon akışında çalışır.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-500">View‑only paylaşım</div>
            <div className="mt-2 text-xl font-extrabold text-gray-900">Kısmen</div>
            <div className="mt-1 text-sm text-gray-600">MVP var; kurumsal güvenlik yok.</div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-bold text-gray-500">Kullanıcı dashboard üretimi</div>
            <div className="mt-2 text-xl font-extrabold text-gray-900">Yok</div>
            <div className="mt-1 text-sm text-gray-600">Kaydetme / düzenleme teyit edilemiyor.</div>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-8 space-y-10">
            <section>
              <SectionTitle
                icon={<FileText className="w-6 h-6 text-white" />}
                title="Genel Ürün Olgunluk Değerlendirmesi"
                subtitle="Net özet: hazır dashboard + PDF + view-only paylaşım (demo/şablon) çalışır; gerçek kullanıcı zinciri tamam değil."
              />
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="text-sm font-extrabold text-gray-900">Çalışan ana değer (bugün)</div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700" />
                      Hazır dashboard şablonları ile hızlı “demo değer” gösterimi
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700" />
                      A4 yatay PDF çıktısı (demo/şablon akışı)
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-700" />
                      View‑only paylaşım linki (MVP)
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="text-sm font-extrabold text-amber-900">Ürünleşme riski (bugün)</div>
                  <ul className="mt-3 space-y-2 text-sm text-amber-900">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700" />
                      Gerçek veri alma → doğrulama → kaydetme → dashboard’a bağlama zinciri net değil
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700" />
                      Kurumsal view‑only güvenliği (expire/log/watermark) yok
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 text-amber-700" />
                      Kullanıcıların oluşturduğu dashboard’ların kaydı/düzenlenmesi teyit edilemiyor
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<Route className="w-6 h-6 text-white" />}
                title="Kullanıcı Yolculuğu Analizi (Veri → Dashboard → Yönetici)"
                subtitle="Bugün çalışan akış ile kopan halkalar ayrıştırıldı."
              />
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="text-sm font-extrabold text-gray-900">Bugün çalıştığı teyit edilen</div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li>Şablon seç → dashboard görüntüle</li>
                    <li>PDF indir → A4 yatay çıktı</li>
                    <li>Paylaş (view‑only) → /share sayfasında görüntüle</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <div className="text-sm font-extrabold text-gray-900">Kopan halkalar (ürün zinciri)</div>
                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li>Gerçek veriyi al → doğrula → kalıcı sakla</li>
                    <li>Dashboard üret → kullanıcı hesabına kaydet</li>
                    <li>Tekrar aç → düzenle → aynı standardı PDF/share’e uygula</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<Shield className="w-6 h-6 text-white" />}
                title="A–G Denetim Sonuçları (Var / Yok / Kısmen)"
                subtitle="Yönetici için netlik: her alan ayrı değerlendirilmiştir."
              />

              <div className="mt-5 overflow-x-auto rounded-2xl border border-gray-200">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-extrabold text-gray-900">Kod</th>
                      <th className="px-4 py-3 text-left font-extrabold text-gray-900">Alan</th>
                      <th className="px-4 py-3 text-left font-extrabold text-gray-900">Durum</th>
                      <th className="px-4 py-3 text-left font-extrabold text-gray-900">Kısa not</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {statuses.map((row) => (
                      <tr key={row.key} className="align-top">
                        <td className="px-4 py-3 font-extrabold text-gray-900">{row.key}</td>
                        <td className="px-4 py-3 text-gray-900 font-semibold">{row.title}</td>
                        <td className="px-4 py-3">
                          <StatusPill status={row.status} />
                        </td>
                        <td className="px-4 py-3 text-gray-700">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<FileText className="w-6 h-6 text-white" />}
                title="Hazır Şablonlar — Sektör Kırılımı (Özet)"
                subtitle="Mevcut içerik envanterinden kısa görünüm."
              />
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {templateCounts.map((c) => (
                  <div key={c.label} className="rounded-2xl border border-gray-200 bg-white p-4">
                    <div className="text-xs font-bold text-gray-500">{c.label}</div>
                    <div className="mt-2 text-2xl font-extrabold text-gray-900">{c.value}</div>
                    <div className="text-xs text-gray-600">hazır dashboard</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<ClipboardList className="w-6 h-6 text-white" />}
                title="Güçlü Alanlar"
                subtitle="Bugün gösterilebilir değer üreten alanlar."
              />
              <ul className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <span className="font-extrabold text-gray-900">Hazır şablon envanteri:</span> Sektörlere ayrılmış güçlü başlangıç seti.
                </li>
                <li className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <span className="font-extrabold text-gray-900">Yönetici PDF standardı:</span> A4 yatay çıktı hedefi teknik olarak ele alınmış.
                </li>
                <li className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <span className="font-extrabold text-gray-900">View‑only paylaşım MVP:</span> Link üretimi + ayrı paylaşım sayfası yaklaşımı var.
                </li>
                <li className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <span className="font-extrabold text-gray-900">Grafik rehberi + kural tabanı:</span> Doğru grafik seçimini destekleyen altyapı mevcut.
                </li>
              </ul>
            </section>

            <section>
              <SectionTitle
                icon={<AlertTriangle className="w-6 h-6 text-white" />}
                title="Eksik / Riskli Alanlar"
                subtitle="Ürünleşme ve kurumsal kullanım açısından açık noktalar."
              />
              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="font-extrabold text-amber-900">Gerçek veri entegrasyon stabilitesi</div>
                  <div className="mt-1 text-amber-900">
                    Kullanıcı veri girişi akışında simülasyon izleri var; validasyon/hata sınıfları/persist net değil.
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="font-extrabold text-amber-900">Rehber erişim tutarsızlığı</div>
                  <div className="mt-1 text-amber-900">
                    Bazı kritik rehberlerin admin-only olması kullanıcı yolculuğunu kesebilir.
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="font-extrabold text-amber-900">Kullanıcı dashboard üretimi/persist/düzenleme</div>
                  <div className="mt-1 text-amber-900">
                    Ürün çekirdeği açısından en kritik eksik: “veri → dashboard → yönetici” zinciri burada kırılıyor.
                  </div>
                </div>
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="font-extrabold text-amber-900">Kurumsal paylaşım güvenliği</div>
                  <div className="mt-1 text-amber-900">
                    Expire/IP/watermark/okuma logları gibi kurumsal beklentiler yok; mevcut yapı demo için uygun.
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle
                icon={<CheckCircle2 className="w-6 h-6 text-white" />}
                title="Kısa Vadede Tamamlanması Gerekenler"
                subtitle="Bu liste, raporda tespit edilen boşlukları kapatmak için zorunlu başlıkları özetler."
              />
              <ul className="mt-5 list-disc pl-6 space-y-2 text-sm text-gray-700">
                <li>Kullanıcı rehberlerinin erişim modelini netleştirme (admin-only kilitler ayrıştırılmalı).</li>
                <li>Veri alma akışında gerçek işlem + hata açıklaması (upload/URL entegrasyonu ürünleşmeli).</li>
                <li>Kullanıcı dashboard oluşturma ve kaydetme (yeniden açma/düzenleme dahil).</li>
                <li>PDF + view-only paylaşım standartlarının “her dashboard” için genelleştirilmesi.</li>
              </ul>
            </section>

            <section>
              <SectionTitle
                icon={<ClipboardList className="w-6 h-6 text-white" />}
                title="Yönetici için Net Sonuç & Tavsiye"
                subtitle="Tek cümlelik net yön."
              />
              <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="text-gray-800 font-semibold leading-relaxed">
                  Platform bugün “demo/şablon tabanlı yönetici raporlama” deneyimini gösterebiliyor; karar destek sistemi
                  seviyesine çıkmak için öncelik, <span className="font-extrabold">gerçek veri alma + kullanıcı dashboard kaydı/düzenleme + standart PDF/share</span>{' '}
                  zincirinin tamamlanması olmalı.
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

