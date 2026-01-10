import React, { useMemo } from 'react';
import {
  Activity,
  AreaChart,
  ArrowDownUp,
  BarChart3,
  BarChartBig,
  CheckCircle2,
  Gauge,
  Grid3X3,
  LineChart,
  LayoutDashboard,
  Lock,
  PieChart,
  Table,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { hasCompletedDataImport } from '../../utils/dataImportGate';
import { useTranslation } from 'react-i18next';
import { useRobotsMeta } from '../../hooks/useRobotsMeta';

type TocItem = { id: string; label: string };

export default function ChartGuidePage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  useRobotsMeta('noarchive, noimageindex');
  const isUnlocked = hasCompletedDataImport();
  const isTr = i18n.language?.toLowerCase().startsWith('tr');

  const copy = useMemo(() => {
    if (isTr) {
      return {
        toc: [
          { id: 'neden-onemli', label: '1) Grafik seçimi neden önemli?' },
          { id: 'veri-turleri', label: '2) Veri türleri ve grafik uyumu' },
          { id: 'grafik-turleri', label: '3) Grafik türleri (ana)' },
          { id: 'hatalar', label: '4) Sık hatalar (anti‑pattern)' },
          { id: 'sektor', label: '5) Sektör bazlı öneriler' },
          { id: 'akilli', label: 'Akıllı grafik önerisi mantığı' },
        ],
        locked: {
          badge: 'Bu içerik için önce veri girişi tamamlanmalı',
          title: 'Grafik Rehberi',
          description:
            'Fino’da doğru görselleştirme, doğru karar demektir. Grafik rehberi; veri türünü analiz etmeden dashboard oluşturmaya başlamayı engeller ve adım adım doğru grafik seçimini öğretir.',
          ctaDataImport: 'Veri Girişine Git',
          ctaDemo: 'Demo Dashboard’u Gör',
          howToTitle: 'Nasıl açılır?',
          howToSteps: [
            'Veri Girişi sayfasından dosya yükle / URL ile bağlan',
            '“Başarılı” ekranında “📘 Grafik Rehberi” butonuna bas',
          ],
        },
        header: {
          badge: 'Bilgi Merkezi • Grafik Rehberi',
          title: 'Grafik Rehberi & Akıllı Dashboard Mantığı',
          subtitle:
            'Amaç: Kullanıcıyı yanlış grafik seçiminden korumak, adım adım eğitmek ve ileride AI destekli dashboard üretimine sağlam bir zemin hazırlamak.',
        },
        sidebar: {
          contents: 'İçindekiler',
          backToDashboard: 'Dashboard’a Dön',
          createDashboard: 'Dashboard Oluştur',
        },
        section1: {
          title: '1) Grafik Seçimi Neden Önemli?',
          body:
            'Finansal dashboard’larda yanlış grafik seçimi, yanlış yorum ve yanlış aksiyon üretir. Fino’da her grafik, net bir “karar cümlesi” üretmelidir.',
          cards: [
            { title: 'Trend', desc: 'Zaman içinde ne oluyor?' },
            { title: 'Kıyas', desc: 'A mı B mi daha iyi?' },
            { title: 'Dağılım', desc: 'Değerler nasıl yayılıyor?' },
            { title: 'Parça–Bütün', desc: 'Toplamın içindeki paylar ne?' },
          ],
          iconRulesTitle: '🎨 İkon Kullanım Kuralları (Fino Standardı)',
          iconRulesItems: [
            'Ana ikon seti: Lucide Icons',
            'Tutarlılık: aynı stroke kalınlığı, aynı boyut (24–32px)',
            'Renk: tema rengi veya nötr gri',
            'PDF ve Web: aynı ikon = tutarlı algı',
          ],
          philosophyTitle: '🧠 Fino Tasarım Felsefesi',
          philosophyBody:
            '“Grafik ikonları süs değildir; kullanıcının doğru kararı vermesine yardım eder.”',
        },
        section2: {
          title: '2) Veri Türleri ve Grafik Uyumu',
          subtitle:
            'Önce “ikon–grafik” eşleşmesini öğren, sonra veri türüne göre doğru grafiği seç.',
          mappingTitle: 'İkon – Grafik Eşleşme Tablosu (Lucide)',
          mappingSubtitle:
            'Her kartta: ne zaman kullanılır, uygun veri türleri, finansal örnekler ve kaçınılması gerekenler.',
          mapping: {
            line: {
              title: 'Line Chart (Çizgi Grafik)',
              when: ['Zaman içinde değişimi göstermek', 'Trend analizi'],
              dataTypes: ['Tarih / zaman serisi', 'Günlük, haftalık, aylık metrikler'],
              examples: ['Günlük gelir trendi', 'Aylık ciro gelişimi', 'Nakit akışı'],
              avoid: ['Kategorik (zamansız) veriler', 'Çok fazla seri (5+ çizgi)'],
            },
            bar: {
              title: 'Bar / Column Chart (Çubuk Grafik)',
              when: ['Kategoriler arası karşılaştırma'],
              dataTypes: ['Kategori + sayısal değer'],
              examples: ['Şube bazında gelir', 'Ürün bazında satış', 'Departman giderleri'],
              avoid: ['Çok uzun kategori listeleri (15+)'],
              note: 'İkon: BarChart3 (yatay) • Alternatif: BarChartBig (dikey)',
            },
            stacked: {
              title: 'Stacked Bar (Yığılmış Çubuk)',
              when: ['Parça + toplam ilişkisini birlikte göstermek'],
              dataTypes: ['Alt kategori + toplam'],
              examples: ['Şubeye göre gelir + ürün kırılımı', 'Gelir vs maliyet dağılımı'],
              avoid: ['Çok fazla katman (5+)'],
            },
            area: {
              title: 'Area Chart (Alan Grafik)',
              when: ['Trend + hacim etkisini göstermek'],
              dataTypes: ['Zaman serisi'],
              examples: ['Kümülatif gelir', 'Toplam satış hacmi'],
              avoid: ['Birden fazla alanın üst üste gelmesi'],
            },
            pie: {
              title: 'Pie / Donut (Pasta / Halka)',
              when: ['Parça–bütün ilişkisi'],
              dataTypes: ['Oransal dağılım'],
              examples: ['Gelir dağılımı (ürün bazlı)', 'Gider türleri'],
              avoid: ['6’dan fazla dilim', 'Zaman serisi veriler'],
              note: 'Not: PDF raporlarda Donut, Pie’dan daha okunaklıdır.',
            },
            table: {
              title: 'Table (Tablo)',
              when: ['Kesin değerlerin okunması gerektiğinde'],
              dataTypes: ['Detaylı satır–sütun verisi'],
              examples: ['Top 5 ürün', 'Günlük gelir listesi', 'Şube detayları'],
              avoid: [],
              note: 'En iyi kullanım: grafiklerin ALTINDA destekleyici tablo.',
            },
            kpi: {
              title: 'KPI Card (Özet Kart)',
              when: ['Tek bir kritik metriği vurgulamak'],
              dataTypes: ['Toplam, ortalama, oran'],
              examples: ['Toplam gelir', 'Brüt kâr marjı', 'Ortalama sepet'],
              avoid: ['Çok fazla KPI (5 üstü)'],
            },
            heatmap: {
              title: 'Heatmap (Isı Haritası)',
              when: ['Yoğunluk ve desenleri görmek'],
              dataTypes: ['Zaman × kategori'],
              examples: ['Saatlik satış yoğunluğu', 'Gün–şube performansı'],
              avoid: ['Küçük veri setleri'],
            },
            waterfall: {
              title: 'Waterfall (Şelale Grafik)',
              when: ['Başlangıç → ara adımlar → sonuç'],
              dataTypes: ['Ardışık finansal etkiler'],
              examples: ['Gelir → maliyet → net kâr', 'Bütçe sapma analizi'],
              avoid: [],
              note: '📌 CFO’ların en sevdiği grafiklerden biridir.',
            },
            combo: {
              title: 'Combo (Line + Bar)',
              when: ['İki farklı metrik aynı eksende gösterilecekse'],
              dataTypes: ['Zaman + iki metrik'],
              examples: ['Gelir (bar) + kâr marjı (line)', 'Satış adedi + ciro'],
              avoid: ['3+ metrik'],
            },
          },
          types: {
            timeSeries: {
              title: 'Zaman Serisi',
              description: 'Tarih/zaman ekseni olan metrikler.',
              example: 'Örn: Günlük gelir, aylık kâr, haftalık gider.',
            },
            categorical: {
              title: 'Kategorik Veri',
              description: 'Şube/ürün/kategori gibi gruplar arası kıyas.',
              example: 'Örn: Şube bazlı ciro, ürün bazlı net kâr.',
            },
            proportional: {
              title: 'Oransal Veri',
              description: '% veya pay gibi oranlar.',
              example: 'Örn: Brüt marj %, kategori payı %.',
            },
            distribution: {
              title: 'Dağılım Verisi',
              description: 'Tek tek gözlemler ve yayılım (outlier dahil).',
              example: 'Örn: Fatura tutarları, sepet büyüklüğü.',
            },
            comparison: {
              title: 'Kıyaslama Verisi',
              description: 'Hedef/plan vs gerçekleşen, önceki dönem karşılaştırması.',
              example: 'Örn: Bütçe vs gerçekleşen, YoY büyüme.',
            },
            hierarchical: {
              title: 'Hiyerarşik Veri',
              description: 'Kategori → alt kategori gibi ağaç yapılar.',
              example: 'Örn: Gider → alt gider kalemleri.',
            },
            cumulative: {
              title: 'Kümülatif / Akış',
              description: 'Toplamın zamanla birikmesi veya köprü analizi.',
              example: 'Örn: Kümülatif gelir, kâr köprüsü.',
            },
            matrix: {
              title: 'Çok Boyutlu (Matris)',
              description: 'İki eksenli yoğunluk veya çok kırılımlı tablo ihtiyacı.',
              example: 'Örn: Gün × saat satış yoğunluğu, şube × kategori.',
            },
          },
        },
        section3: {
          title: '3) Grafik Türleri (Ana Rehber)',
          subtitle:
            'Her grafik için aynı şablon: Ne zaman? Ne zaman değil? Finans örnekleri. PDF vs canlı notu.',
          charts: {
            line: {
              title: 'Line Chart (Çizgi)',
              when: 'Zaman serisi trend, az seri (1–5).',
              notWhen: '8+ seri, düzensiz zaman aralığı açıklamasız.',
              examples: ['Gelir trendi', 'Kâr trendi', 'Nakit akışı trendi'],
              pdfNote: 'PDF’te son değer etiketi + küçük özet (min/max).',
              liveNote: 'Canlıda tooltip: tarih + değer + karşılaştırma (MoM/YoY).',
            },
            bar: {
              title: 'Bar / Column (Çubuk)',
              when: 'Kategori kıyası, Top‑N sıralama.',
              notWhen: 'Uzun zaman serisini bar ile anlatmak.',
              examples: ['Şube performansı', 'Ürün Top‑10', 'Gider kalemleri'],
              pdfNote: 'Değer etiketleri açık, Top‑N + Diğer.',
              liveNote: 'Sıralama, filtre, drilldown.',
            },
            stacked: {
              title: 'Stacked Bar (Yığılmış)',
              when: 'Toplam + alt kırılım kompozisyonu aynı anda.',
              notWhen: 'Çok segment (7+), renk/legend karmaşası.',
              examples: ['Şube geliri kanal kırılımı', 'Kategori→alt kategori dağılımı'],
              pdfNote: 'Legend sade, segment sayısı limitli.',
              liveNote: 'Hover ile segment detay, segment seçici.',
            },
            area: {
              title: 'Area Chart (Alan)',
              when: 'Trend + hacim hissi (kümülatif/akış).',
              notWhen: 'Çok seri, negatif değer karmaşası.',
              examples: ['Kümülatif gelir', 'Kümülatif nakit'],
              pdfNote: 'Opaklık düşük, grid açık.',
              liveNote: 'Tooltip + zoom (opsiyonel).',
            },
            pie: {
              title: 'Pie / Donut',
              when: 'Parça‑bütün, az dilim (≤5).',
              notWhen: '6+ dilim, benzer oranlar, zaman serisi.',
              examples: ['Gider payları', 'Kategori payları'],
              pdfNote: 'Yan listede % + tutar; “Diğer” otomatik.',
              liveNote: 'Hover: pay + payda (örn. ciro) birlikte.',
            },
            table: {
              title: 'Table (Tablo)',
              when: 'Detay/denetim, CFO kanıt ihtiyacı.',
              notWhen: 'Trend anlatmak için tek başına.',
              examples: ['Günlük kayıt', 'Fatura detay', 'Bütçe satırları'],
              pdfNote: 'Kolonlar sade, sayfaya sığan düzen.',
              liveNote: 'Sort/filter/pin, kolon gizleme.',
            },
            kpi: {
              title: 'KPI Card',
              when: '1 sayı + bağlam (Δ%, hedef, önceki dönem).',
              notWhen: 'Bağlamsız tek sayı.',
              examples: ['Toplam gelir', 'Net kâr', 'Brüt marj %'],
              pdfNote: 'Δ% sabit göster, küçük sparkline opsiyonel.',
              liveNote: 'Tooltip: hesaplama detayı, karşılaştırma.',
            },
            gauge: {
              title: 'Gauge / Speedometer (Hedef Takibi)',
              when: 'Tek kişi • tek hedef • tek zaman dilimi ve net eşiklerle (kırmızı/sarı/yeşil).',
              notWhen: 'Kıyas grafiği değildir: çok kişi, çok gauge, yönetici/CFO ekranı, PDF rapor.',
              examples: ['Garson – günlük satış hedefi (Hedef 5.000 TL • Gerçekleşen 4.300 TL)'],
              pdfNote: 'PDF’te önerilmez → KPI + hedef/gerçekleşen tablo kullan.',
              liveNote: 'Canlıda (mobil/personel ekranı) motivasyon & anlık durum için uygundur.',
            },
            heatmap: {
              title: 'Heatmap',
              when: 'Zaman×kategori yoğunluk (gün×saat).',
              notWhen: 'Tek boyutlu küçük veri.',
              examples: ['Satış yoğunluğu', 'Gecikme yoğunluğu'],
              pdfNote: 'Renk skalası + legend şart.',
              liveNote: 'Hover ile hücre değeri.',
            },
            waterfall: {
              title: 'Waterfall (Finans için kritik)',
              when: 'Başlangıç→artış/azalış→sonuç (köprü analizi).',
              notWhen: 'Zaman serisi yerine kullanmak.',
              examples: ['Kâr köprüsü', 'Bütçe sapma köprüsü'],
              pdfNote: 'Toplam barlar farklı renk; etiketler açık.',
              liveNote: 'Kalem drilldown, açıklama tooltip.',
            },
            combo: {
              title: 'Combo (Line + Bar)',
              when: 'Hacim + oran birlikte (ciro + marj%).',
              notWhen: '3+ metrik, ölçek belirsizliği.',
              examples: ['Gelir(bar) + Marj%(line)', 'Bütçe vs gerçekleşen'],
              pdfNote: 'Dual‑axis net etiket; legend sade.',
              liveNote: 'Tooltip iki metrik birlikte, seri seçici.',
            },
            areaLine: {
              title: 'Çoklu İşletme (Area + Line)',
              when: 'Zaman serisi + çoklu işletme: Area=toplam hacim, Line=seçili tek işletme trendi.',
              notWhen: 'Area ile çok sayıda işletmeyi “ayrı ayrı kıyaslamak” (Area kıyas grafiği değildir).',
              examples: ['Tüm işletmeler toplam ciro trendi (Area) + seçili işletme (Line)'],
              pdfNote: 'PDF’te tek seri + alt tablo zorunlu. Çoklu seri sadeleştir.',
              liveNote: 'Canlıda tooltip açık; CFO/yönetici ekranı için uygundur.',
            },
          },
        },
        section4: {
          title: '4) En Sık Yapılan Hatalar (Anti‑Pattern)',
          items: [
            'Çok dilimli pie (6+): Top‑N + “Diğer” ya da bar chart kullan.',
            'Zaman serisini bar ile göstermek: Line/Area tercih et (bar sadece “aylık toplam”).',
            'Oranı mutlak değer gibi sunmak: % yanında payda/ciro mutlaka göster.',
            'KPI’ı grafiğe boğmak: KPI + küçük trend (sparkline) + Δ% yeterli.',
            '8+ seri legend kaosu: seri seçici/filtre ekle, varsayılan 5 seri ile başla.',
          ],
        },
        section5: {
          title: '5) Sektör Bazlı Öneriler',
          hotel: {
            title: 'Otel',
            items: [
              'Doluluk trendi (Line)',
              'ADR/RevPAR KPI + trend',
              'Kanal payı (Donut)',
              'Gelir köprüsü (Waterfall)',
            ],
          },
          restaurant: {
            title: 'Restoran',
            items: [
              'Günlük ciro trendi (Line)',
              'Şube kıyası (Bar)',
              'Menü ürün Top‑N (Bar/Table)',
              'Kampanya etkisi (Combo)',
            ],
          },
          retail: {
            title: 'Perakende',
            items: [
              'Satış trendi (Line)',
              'Stok devir KPI + trend',
              'Kategori payları (Donut/Stacked)',
              'Kâr köprüsü (Waterfall)',
            ],
          },
          multiBranch: {
            title: 'Çok şubeli yapı',
            items: [
              'Şube liderlik tablosu (Table)',
              'Şube Top‑N (Bar)',
              'Bölge/segment filtreleri',
              'CFO görünümü: 1 sayfa özet + 1 sayfa detay',
            ],
          },
        },
        smart: {
          title: 'Akıllı Dashboard Kurgusu (Tasarım Mantığı)',
          b1Title: '1) Akıllı Grafik Önerisi (Data Profiling → Recommendation)',
          b1Items: [
            'Alan türleri: tarih / sayı / kategori / oran(%) / para',
            'Kardinalite: kategori sayısı → Top‑N ihtiyacı',
            'Zaman frekansı: günlük/haftalık/aylık',
            'Kıyas sinyali: budget/actual/target/previous kolonları',
          ],
          b2Title: '2) Mini Sihirbaz (Goal‑first)',
          b2Items: [
            'Trend mi? Kıyas mı? Parça‑bütün mü? Dağılım mı? Detay mı?',
            'Hangi kırılım önemli: Şube / Ürün / Kategori / Zaman?',
            'CFO modu mu (Özet / Detay)?',
          ],
          b3Title: '3) Guardrails (Yanlış grafik koruması)',
          b3Body:
            'Örn: “Pie seçtin ama 12 kategori var → Bar chart daha doğru” (tek tıkla düzelt).',
        },
      } as const;
    }

    // English
    return {
      toc: [
        { id: 'neden-onemli', label: '1) Why chart selection matters' },
        { id: 'veri-turleri', label: '2) Data types & chart fit' },
        { id: 'grafik-turleri', label: '3) Chart types (core)' },
        { id: 'hatalar', label: '4) Common mistakes (anti‑patterns)' },
        { id: 'sektor', label: '5) Sector recommendations' },
        { id: 'akilli', label: 'Smart chart recommendation logic' },
      ],
      locked: {
        badge: 'Complete data import to access this content',
        title: 'Chart Guide',
        description:
          'In Fino, correct visualization means correct decisions. The chart guide prevents building dashboards without understanding the data type and teaches chart selection step by step.',
        ctaDataImport: 'Go to Data Import',
        ctaDemo: 'View Demo Dashboard',
        howToTitle: 'How to unlock?',
        howToSteps: [
          'Upload a file / connect via URL on the Data Import page',
          'On the “Success” screen, click “📘 Chart Guide”',
        ],
      },
      header: {
        badge: 'Knowledge Base • Chart Guide',
        title: 'Chart Guide & Smart Dashboard Logic',
        subtitle:
          'Goal: protect users from wrong chart choices, teach step-by-step, and create a solid foundation for AI-assisted dashboard generation.',
      },
      sidebar: {
        contents: 'Contents',
        backToDashboard: 'Back to Dashboard',
        createDashboard: 'Create Dashboard',
      },
      section1: {
        title: '1) Why Chart Selection Matters',
        body:
          'In financial dashboards, the wrong chart leads to the wrong interpretation and the wrong action. In Fino, each chart should produce a clear “decision sentence.”',
        cards: [
          { title: 'Trend', desc: 'What is happening over time?' },
          { title: 'Comparison', desc: 'Is A better than B?' },
          { title: 'Distribution', desc: 'How do values spread?' },
          { title: 'Part-to-Whole', desc: 'What are the shares within the total?' },
        ],
        iconRulesTitle: '🎨 Icon Usage Rules (Fino Standard)',
        iconRulesItems: [
          'Primary icon set: Lucide Icons',
          'Consistency: same stroke weight, same size (24–32px)',
          'Color: theme color or neutral gray',
          'PDF & Web: same icon = consistent mental model',
        ],
        philosophyTitle: '🧠 Fino Design Philosophy',
        philosophyBody:
          '“Chart icons are not decoration; they help users make the right decision.”',
      },
      section2: {
        title: '2) Data Types & Chart Fit',
        subtitle:
          'First learn the icon–chart mapping, then choose the right chart based on your data type.',
        mappingTitle: 'Icon – Chart Mapping (Lucide)',
        mappingSubtitle:
          'Each card includes: when to use, best-fit data types, finance examples, and what to avoid.',
        mapping: {
          line: {
            title: 'Line Chart',
            when: ['Show change over time', 'Trend analysis'],
            dataTypes: ['Date / time series', 'Daily, weekly, monthly metrics'],
            examples: ['Daily revenue trend', 'Monthly revenue growth', 'Cash flow'],
            avoid: ['Categorical (non-time) data', 'Too many series (5+ lines)'],
          },
          bar: {
            title: 'Bar / Column Chart',
            when: ['Compare categories'],
            dataTypes: ['Category + numeric value'],
            examples: ['Revenue by branch', 'Sales by product', 'Department expenses'],
            avoid: ['Very long category lists (15+)'],
            note: 'Icon: BarChart3 (horizontal) • Alternative: BarChartBig (vertical)',
          },
          stacked: {
            title: 'Stacked Bar',
            when: ['Show part + total together'],
            dataTypes: ['Subcategory + total'],
            examples: ['Branch revenue + product mix', 'Revenue vs cost composition'],
            avoid: ['Too many stacks (5+)'],
          },
          area: {
            title: 'Area Chart',
            when: ['Trend + volume effect'],
            dataTypes: ['Time series'],
            examples: ['Cumulative revenue', 'Total sales volume'],
            avoid: ['Overlapping multiple areas'],
          },
          pie: {
            title: 'Pie / Donut',
            when: ['Part-to-whole'],
            dataTypes: ['Proportional distribution'],
            examples: ['Revenue mix (by product)', 'Expense types'],
            avoid: ['More than 6 slices', 'Time series data'],
            note: 'Note: In PDF reports, Donut is usually more readable than Pie.',
          },
          table: {
            title: 'Table',
            when: ['When precise values must be read'],
            dataTypes: ['Detailed rows & columns'],
            examples: ['Top 5 products', 'Daily revenue list', 'Branch details'],
            avoid: [],
            note: 'Best practice: supporting table UNDER charts.',
          },
          kpi: {
            title: 'KPI Card',
            when: ['Highlight a single critical metric'],
            dataTypes: ['Total, average, ratio'],
            examples: ['Total revenue', 'Gross margin', 'Average basket'],
            avoid: ['Too many KPIs (more than 5)'],
          },
          heatmap: {
            title: 'Heatmap',
            when: ['See intensity and patterns'],
            dataTypes: ['Time × category'],
            examples: ['Hourly sales intensity', 'Day–branch performance'],
            avoid: ['Very small datasets'],
          },
          waterfall: {
            title: 'Waterfall',
            when: ['Start → steps → result'],
            dataTypes: ['Sequential financial impacts'],
            examples: ['Revenue → cost → net profit', 'Budget variance analysis'],
            avoid: [],
            note: "CFOs love this chart type.",
          },
          combo: {
            title: 'Combo (Line + Bar)',
            when: ['Two different metrics on the same axis'],
            dataTypes: ['Time + two metrics'],
            examples: ['Revenue (bar) + margin (line)', 'Units sold + revenue'],
            avoid: ['3+ metrics'],
          },
        },
        types: {
          timeSeries: {
            title: 'Time Series',
            description: 'Metrics with a date/time axis.',
            example: 'Ex: daily revenue, monthly profit, weekly expenses.',
          },
          categorical: {
            title: 'Categorical',
            description: 'Compare groups such as branch/product/category.',
            example: 'Ex: revenue by branch, net profit by product.',
          },
          proportional: {
            title: 'Proportional',
            description: 'Ratios or shares (%, part of total).',
            example: 'Ex: gross margin %, category share %.',
          },
          distribution: {
            title: 'Distribution',
            description: 'Individual observations and spread (including outliers).',
            example: 'Ex: invoice amounts, basket size.',
          },
          comparison: {
            title: 'Comparison',
            description: 'Target/plan vs actual, previous period comparisons.',
            example: 'Ex: budget vs actual, YoY growth.',
          },
          hierarchical: {
            title: 'Hierarchical',
            description: 'Tree structures like category → subcategory.',
            example: 'Ex: expenses → sub-expense items.',
          },
          cumulative: {
            title: 'Cumulative / Flow',
            description: 'Accumulation over time or bridge analysis.',
            example: 'Ex: cumulative revenue, profit bridge.',
          },
          matrix: {
            title: 'Multi-dimensional (Matrix)',
            description: 'Two-axis intensity or multi-breakdown tabular needs.',
            example: 'Ex: day × hour sales intensity, branch × category.',
          },
        },
      },
      section3: {
        title: '3) Chart Types (Core Guide)',
        subtitle:
          'Same template for each chart: when to use, when not to use, finance examples, PDF vs live note.',
        charts: {
          line: {
            title: 'Line Chart',
            when: 'Time series trend, few series (1–5).',
            notWhen: '8+ series, irregular time intervals without explanation.',
            examples: ['Revenue trend', 'Profit trend', 'Cash flow trend'],
            pdfNote: 'Show last value label + a small summary (min/max).',
            liveNote: 'Tooltip: date + value + comparison (MoM/YoY).',
          },
          bar: {
            title: 'Bar / Column',
            when: 'Category comparison, Top‑N ranking.',
            notWhen: 'Using bars to tell long time-series trends.',
            examples: ['Branch performance', 'Top‑10 products', 'Expense items'],
            pdfNote: 'Value labels on, Top‑N + Other.',
            liveNote: 'Sorting, filters, drilldown.',
          },
          stacked: {
            title: 'Stacked Bar',
            when: 'Show total and composition together.',
            notWhen: 'Too many segments (7+), legend/color overload.',
            examples: ['Branch revenue by channel', 'Category → subcategory mix'],
            pdfNote: 'Keep legend simple, limit segments.',
            liveNote: 'Hover segment details, segment selector.',
          },
          area: {
            title: 'Area Chart',
            when: 'Trend + sense of volume (cumulative/flow).',
            notWhen: 'Many series, negative value ambiguity.',
            examples: ['Cumulative revenue', 'Cumulative cash'],
            pdfNote: 'Low opacity, light grid.',
            liveNote: 'Tooltip + zoom (optional).',
          },
          pie: {
            title: 'Pie / Donut',
            when: 'Part-to-whole with few slices (≤5).',
            notWhen: '6+ slices, similar ratios, time series.',
            examples: ['Expense shares', 'Category shares'],
            pdfNote: 'Show % + amount list; auto “Other”.',
            liveNote: 'Hover: share + base (e.g., revenue) together.',
          },
          table: {
            title: 'Table',
            when: 'Detail/audit; CFO proof needs.',
            notWhen: 'Using tables alone to communicate trends.',
            examples: ['Daily records', 'Invoice details', 'Budget lines'],
            pdfNote: 'Simplify columns; fit to page.',
            liveNote: 'Sort/filter/pin, column hide.',
          },
          kpi: {
            title: 'KPI Card',
            when: 'One number + context (Δ%, target, previous period).',
            notWhen: 'A context-free single number.',
            examples: ['Total revenue', 'Net profit', 'Gross margin %'],
            pdfNote: 'Show Δ% clearly; sparkline optional.',
            liveNote: 'Tooltip: calculation details, comparisons.',
          },
          gauge: {
            title: 'Gauge / Speedometer (Target Tracking)',
            when: 'Single person • single target • single period with clear thresholds (red/amber/green).',
            notWhen: 'Not for comparisons: many people, many gauges, executive/CFO dashboards, PDF reports.',
            examples: ['Waiter – daily sales target (Target 5,000 TL • Actual 4,300 TL)'],
            pdfNote: 'Not recommended in PDF → use KPI + target/actual table.',
            liveNote: 'Great for live mobile/staff screens: motivation & instant status.',
          },
          heatmap: {
            title: 'Heatmap',
            when: 'Time×category intensity (day×hour).',
            notWhen: 'Tiny data or single dimension.',
            examples: ['Sales intensity', 'Delay intensity'],
            pdfNote: 'Color scale + legend required.',
            liveNote: 'Hover to see cell value.',
          },
          waterfall: {
            title: 'Waterfall (Finance-critical)',
            when: 'Bridge analysis: start → +/- drivers → result.',
            notWhen: 'Replacing time series with waterfall.',
            examples: ['Profit bridge', 'Budget variance bridge'],
            pdfNote: 'Totals in distinct color; labels on.',
            liveNote: 'Driver drilldown, explanatory tooltip.',
          },
          combo: {
            title: 'Combo (Line + Bar)',
            when: 'Volume + ratio together (revenue + margin%).',
            notWhen: '3+ metrics; unclear axes/scales.',
            examples: ['Revenue(bar) + Margin%(line)', 'Budget vs actual'],
            pdfNote: 'Clear dual-axis labels; simple legend.',
            liveNote: 'Tooltip shows both metrics; series selector.',
          },
          areaLine: {
            title: 'Multi-business (Area + Line)',
            when: 'Time series + multiple businesses: Area=aggregate volume, Line=selected single business trend.',
            notWhen: 'Using Area to compare many businesses individually (Area is not a comparison chart).',
            examples: ['Aggregate revenue trend (Area) + selected business (Line)'],
            pdfNote: 'In PDF: keep single series + require a bottom table; simplify multi-series.',
            liveNote: 'In live: tooltips on; suitable for CFO/leadership views.',
          },
        },
      },
      section4: {
        title: '4) Common Mistakes (Anti‑patterns)',
        items: [
          'Too many pie slices (6+): use Top‑N + “Other” or a bar chart.',
          'Showing time series with bars: prefer line/area (bars for monthly totals only).',
          'Presenting ratios as absolute values: always show the base (e.g., revenue) with %.',
          'Overloading KPIs with charts: KPI + small trend + Δ% is enough.',
          'Legend chaos with 8+ series: add a selector/filter; default to 5 series.',
        ],
      },
      section5: {
        title: '5) Sector Recommendations',
        hotel: {
          title: 'Hotel',
          items: [
            'Occupancy trend (Line)',
            'ADR/RevPAR KPI + trend',
            'Channel share (Donut)',
            'Revenue bridge (Waterfall)',
          ],
        },
        restaurant: {
          title: 'Restaurant',
          items: [
            'Daily revenue trend (Line)',
            'Branch comparison (Bar)',
            'Menu product Top‑N (Bar/Table)',
            'Campaign impact (Combo)',
          ],
        },
        retail: {
          title: 'Retail',
          items: [
            'Sales trend (Line)',
            'Inventory turnover KPI + trend',
            'Category shares (Donut/Stacked)',
            'Profit bridge (Waterfall)',
          ],
        },
        multiBranch: {
          title: 'Multi-branch',
          items: [
            'Branch leaderboard table (Table)',
            'Branch Top‑N (Bar)',
            'Region/segment filters',
            'CFO view: 1-page overview + 1-page detail',
          ],
        },
      },
      smart: {
        title: 'Smart Dashboard Flow (Design Logic)',
        b1Title: '1) Smart Chart Recommendation (Data Profiling → Recommendation)',
        b1Items: [
          'Field types: date / number / category / ratio(%) / currency',
          'Cardinality: category count → Top‑N need',
          'Time frequency: daily/weekly/monthly',
          'Comparison signals: budget/actual/target/previous columns',
        ],
        b2Title: '2) Mini Wizard (Goal-first)',
        b2Items: [
          'What do you want: Trend / Comparison / Part‑to‑whole / Distribution / Detail?',
          'Which breakdown matters: Branch / Product / Category / Time?',
          'CFO mode (Overview / Detail)?',
        ],
        b3Title: '3) Guardrails (Wrong-chart protection)',
        b3Body:
          'Example: “You chose Pie but you have 12 categories → Bar chart is more appropriate” (one-click fix).',
      },
    } as const;
  }, [isTr]);

  const toc: TocItem[] = copy.toc;

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full">
                <Lock className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-semibold text-amber-800">
                  {copy.locked.badge}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
                {copy.locked.title}
              </h1>
              <p className="mt-3 text-gray-600 leading-relaxed">
                {copy.locked.description}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(`/veri-girisi?lang=${isTr ? 'tr' : 'en'}`)}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors"
                >
                  {copy.locked.ctaDataImport}
                </button>
                <button
                  onClick={() => navigate('/dashboard/demo-preview')}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-white text-gray-800 font-bold border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  {copy.locked.ctaDemo}
                </button>
              </div>

              <div className="mt-6 rounded-xl bg-gray-50 border border-gray-200 p-5">
                <div className="text-sm font-extrabold text-gray-900 mb-2">
                  {copy.locked.howToTitle}
                </div>
                <ol className="list-decimal pl-6 space-y-1 text-sm text-gray-700">
                  {copy.locked.howToSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full">
            <Sparkles className="w-4 h-4 text-indigo-700" />
            <span className="text-sm font-semibold text-indigo-800">
              {copy.header.badge}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900">
            {copy.header.title}
          </h1>
          <p className="mt-3 text-gray-600 max-w-3xl leading-relaxed">
            {copy.header.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="text-sm font-extrabold text-gray-900 mb-3">{copy.sidebar.contents}</div>
              <nav className="space-y-2">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-700 hover:text-indigo-700 hover:underline"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="mt-5 pt-5 border-t border-gray-200 flex flex-col gap-2">
                <button
                  onClick={() => navigate('/dashboard/demo-preview')}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-black transition-colors"
                >
                  {copy.sidebar.backToDashboard}
                </button>
                <button
                  onClick={() => navigate('/dashboard/create')}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-bold hover:bg-indigo-700 transition-colors"
                >
                  {copy.sidebar.createDashboard}
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <main className="lg:col-span-9 space-y-6">
            <section id="neden-onemli" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.section1.title}
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {copy.section1.body}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { ...copy.section1.cards[0], icon: LineChart },
                  { ...copy.section1.cards[1], icon: BarChart3 },
                  { ...copy.section1.cards[2], icon: Grid3X3 },
                  { ...copy.section1.cards[3], icon: PieChart },
                ].map((b) => (
                  <div key={b.title} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2">
                      <b.icon className="w-5 h-5 text-indigo-700" />
                      <div className="font-extrabold text-gray-900">{b.title}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">{b.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="veri-turleri" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.section2.title}
              </h2>
              <p className="mt-2 text-gray-600">
                {copy.section2.subtitle}
              </p>

              <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
                <div className="font-extrabold text-indigo-900">{copy.section2.mappingTitle}</div>
                <div className="mt-1 text-sm text-indigo-800">{copy.section2.mappingSubtitle}</div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ChartMappingCard
                    title={copy.section2.mapping.line.title}
                    Icon={LineChart}
                    when={copy.section2.mapping.line.when}
                    dataTypes={copy.section2.mapping.line.dataTypes}
                    examples={copy.section2.mapping.line.examples}
                    avoid={copy.section2.mapping.line.avoid}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.bar.title}
                    Icon={BarChart3}
                    when={copy.section2.mapping.bar.when}
                    dataTypes={copy.section2.mapping.bar.dataTypes}
                    examples={copy.section2.mapping.bar.examples}
                    avoid={copy.section2.mapping.bar.avoid}
                    note={copy.section2.mapping.bar.note}
                    extraIcons={[{ Icon: BarChartBig, label: 'BarChartBig' }]}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.stacked.title}
                    Icon={Layers}
                    when={copy.section2.mapping.stacked.when}
                    dataTypes={copy.section2.mapping.stacked.dataTypes}
                    examples={copy.section2.mapping.stacked.examples}
                    avoid={copy.section2.mapping.stacked.avoid}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.area.title}
                    Icon={AreaChart}
                    when={copy.section2.mapping.area.when}
                    dataTypes={copy.section2.mapping.area.dataTypes}
                    examples={copy.section2.mapping.area.examples}
                    avoid={copy.section2.mapping.area.avoid}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.pie.title}
                    Icon={PieChart}
                    when={copy.section2.mapping.pie.when}
                    dataTypes={copy.section2.mapping.pie.dataTypes}
                    examples={copy.section2.mapping.pie.examples}
                    avoid={copy.section2.mapping.pie.avoid}
                    note={copy.section2.mapping.pie.note}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.table.title}
                    Icon={Table}
                    when={copy.section2.mapping.table.when}
                    dataTypes={copy.section2.mapping.table.dataTypes}
                    examples={copy.section2.mapping.table.examples}
                    avoid={copy.section2.mapping.table.avoid}
                    note={copy.section2.mapping.table.note}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.kpi.title}
                    Icon={LayoutDashboard}
                    when={copy.section2.mapping.kpi.when}
                    dataTypes={copy.section2.mapping.kpi.dataTypes}
                    examples={copy.section2.mapping.kpi.examples}
                    avoid={copy.section2.mapping.kpi.avoid}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.heatmap.title}
                    Icon={Grid3X3}
                    when={copy.section2.mapping.heatmap.when}
                    dataTypes={copy.section2.mapping.heatmap.dataTypes}
                    examples={copy.section2.mapping.heatmap.examples}
                    avoid={copy.section2.mapping.heatmap.avoid}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.waterfall.title}
                    Icon={TrendingDown}
                    when={copy.section2.mapping.waterfall.when}
                    dataTypes={copy.section2.mapping.waterfall.dataTypes}
                    examples={copy.section2.mapping.waterfall.examples}
                    avoid={copy.section2.mapping.waterfall.avoid}
                    note={copy.section2.mapping.waterfall.note}
                    extraIcons={[{ Icon: TrendingUp, label: 'TrendingUp' }]}
                  />
                  <ChartMappingCard
                    title={copy.section2.mapping.combo.title}
                    Icon={Activity}
                    when={copy.section2.mapping.combo.when}
                    dataTypes={copy.section2.mapping.combo.dataTypes}
                    examples={copy.section2.mapping.combo.examples}
                    avoid={copy.section2.mapping.combo.avoid}
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <DataTypeCard
                  title={copy.section2.types.timeSeries.title}
                  description={copy.section2.types.timeSeries.description}
                  example={copy.section2.types.timeSeries.example}
                  charts={[
                    { label: 'Line', Icon: LineChart },
                    { label: 'Area', Icon: AreaChart },
                    { label: 'Combo', Icon: Activity },
                    { label: 'Table', Icon: Table },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.categorical.title}
                  description={copy.section2.types.categorical.description}
                  example={copy.section2.types.categorical.example}
                  charts={[
                    { label: 'Bar', Icon: BarChart3 },
                    { label: 'Stacked', Icon: Layers },
                    { label: 'Table', Icon: Table },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.proportional.title}
                  description={copy.section2.types.proportional.description}
                  example={copy.section2.types.proportional.example}
                  charts={[
                    { label: 'KPI', Icon: TrendingUp },
                    { label: 'Donut', Icon: PieChart },
                    { label: 'Bar %', Icon: BarChart3 },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.distribution.title}
                  description={copy.section2.types.distribution.description}
                  example={copy.section2.types.distribution.example}
                  charts={[
                    { label: 'Heatmap', Icon: Grid3X3 },
                    { label: 'Table', Icon: Table },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.comparison.title}
                  description={copy.section2.types.comparison.description}
                  example={copy.section2.types.comparison.example}
                  charts={[
                    { label: 'Combo', Icon: Activity },
                    { label: 'Bar', Icon: BarChart3 },
                    { label: 'Waterfall', Icon: ArrowDownUp },
                    { label: 'KPI', Icon: TrendingUp },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.hierarchical.title}
                  description={copy.section2.types.hierarchical.description}
                  example={copy.section2.types.hierarchical.example}
                  charts={[
                    { label: 'Stacked', Icon: Layers },
                    { label: 'Bar', Icon: BarChart3 },
                    { label: 'Table', Icon: Table },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.cumulative.title}
                  description={copy.section2.types.cumulative.description}
                  example={copy.section2.types.cumulative.example}
                  charts={[
                    { label: 'Area', Icon: AreaChart },
                    { label: 'Line', Icon: LineChart },
                    { label: 'Waterfall', Icon: ArrowDownUp },
                  ]}
                />
                <DataTypeCard
                  title={copy.section2.types.matrix.title}
                  description={copy.section2.types.matrix.description}
                  example={copy.section2.types.matrix.example}
                  charts={[
                    { label: 'Heatmap', Icon: Grid3X3 },
                    { label: 'Table', Icon: Table },
                    { label: 'Bar', Icon: BarChart3 },
                  ]}
                />
              </div>
            </section>

            <section id="grafik-turleri" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.section3.title}
              </h2>
              <p className="mt-2 text-gray-600">
                {copy.section3.subtitle}
              </p>

              <div className="mt-4 space-y-3">
                <ChartBlock
                  title={copy.section3.charts.line.title}
                  Icon={LineChart}
                  when={copy.section3.charts.line.when}
                  notWhen={copy.section3.charts.line.notWhen}
                  examples={copy.section3.charts.line.examples}
                  pdfNote={copy.section3.charts.line.pdfNote}
                  liveNote={copy.section3.charts.line.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.bar.title}
                  Icon={BarChart3}
                  when={copy.section3.charts.bar.when}
                  notWhen={copy.section3.charts.bar.notWhen}
                  examples={copy.section3.charts.bar.examples}
                  pdfNote={copy.section3.charts.bar.pdfNote}
                  liveNote={copy.section3.charts.bar.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.stacked.title}
                  Icon={Layers}
                  when={copy.section3.charts.stacked.when}
                  notWhen={copy.section3.charts.stacked.notWhen}
                  examples={copy.section3.charts.stacked.examples}
                  pdfNote={copy.section3.charts.stacked.pdfNote}
                  liveNote={copy.section3.charts.stacked.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.area.title}
                  Icon={AreaChart}
                  when={copy.section3.charts.area.when}
                  notWhen={copy.section3.charts.area.notWhen}
                  examples={copy.section3.charts.area.examples}
                  pdfNote={copy.section3.charts.area.pdfNote}
                  liveNote={copy.section3.charts.area.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.pie.title}
                  Icon={PieChart}
                  when={copy.section3.charts.pie.when}
                  notWhen={copy.section3.charts.pie.notWhen}
                  examples={copy.section3.charts.pie.examples}
                  pdfNote={copy.section3.charts.pie.pdfNote}
                  liveNote={copy.section3.charts.pie.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.table.title}
                  Icon={Table}
                  when={copy.section3.charts.table.when}
                  notWhen={copy.section3.charts.table.notWhen}
                  examples={copy.section3.charts.table.examples}
                  pdfNote={copy.section3.charts.table.pdfNote}
                  liveNote={copy.section3.charts.table.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.kpi.title}
                  Icon={LayoutDashboard}
                  when={copy.section3.charts.kpi.when}
                  notWhen={copy.section3.charts.kpi.notWhen}
                  examples={copy.section3.charts.kpi.examples}
                  pdfNote={copy.section3.charts.kpi.pdfNote}
                  liveNote={copy.section3.charts.kpi.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.gauge.title}
                  Icon={Gauge}
                  when={copy.section3.charts.gauge.when}
                  notWhen={copy.section3.charts.gauge.notWhen}
                  examples={copy.section3.charts.gauge.examples}
                  pdfNote={copy.section3.charts.gauge.pdfNote}
                  liveNote={copy.section3.charts.gauge.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.heatmap.title}
                  Icon={Grid3X3}
                  when={copy.section3.charts.heatmap.when}
                  notWhen={copy.section3.charts.heatmap.notWhen}
                  examples={copy.section3.charts.heatmap.examples}
                  pdfNote={copy.section3.charts.heatmap.pdfNote}
                  liveNote={copy.section3.charts.heatmap.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.waterfall.title}
                  Icon={TrendingDown}
                  when={copy.section3.charts.waterfall.when}
                  notWhen={copy.section3.charts.waterfall.notWhen}
                  examples={copy.section3.charts.waterfall.examples}
                  pdfNote={copy.section3.charts.waterfall.pdfNote}
                  liveNote={copy.section3.charts.waterfall.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.combo.title}
                  Icon={Activity}
                  when={copy.section3.charts.combo.when}
                  notWhen={copy.section3.charts.combo.notWhen}
                  examples={copy.section3.charts.combo.examples}
                  pdfNote={copy.section3.charts.combo.pdfNote}
                  liveNote={copy.section3.charts.combo.liveNote}
                />
                <ChartBlock
                  title={copy.section3.charts.areaLine.title}
                  Icon={Activity}
                  when={copy.section3.charts.areaLine.when}
                  notWhen={copy.section3.charts.areaLine.notWhen}
                  examples={copy.section3.charts.areaLine.examples}
                  pdfNote={copy.section3.charts.areaLine.pdfNote}
                  liveNote={copy.section3.charts.areaLine.liveNote}
                />
              </div>
            </section>

            <section id="hatalar" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.section4.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {copy.section4.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-indigo-700 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="sektor" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.section5.title}
              </h2>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectorCard
                  title={copy.section5.hotel.title}
                  items={copy.section5.hotel.items}
                />
                <SectorCard
                  title={copy.section5.restaurant.title}
                  items={copy.section5.restaurant.items}
                />
                <SectorCard
                  title={copy.section5.retail.title}
                  items={copy.section5.retail.items}
                />
                <SectorCard
                  title={copy.section5.multiBranch.title}
                  items={copy.section5.multiBranch.items}
                />
              </div>
            </section>

            <section id="akilli" className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-extrabold text-gray-900">
                {copy.smart.title}
              </h2>
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="font-extrabold text-gray-900">
                    {copy.smart.b1Title}
                  </div>
                  <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700">
                    {copy.smart.b1Items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="font-extrabold text-gray-900">
                    {copy.smart.b2Title}
                  </div>
                  <ol className="mt-2 list-decimal pl-6 space-y-1 text-gray-700">
                    {copy.smart.b2Items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ol>
                </div>
                <div className="rounded-xl border border-gray-200 bg-indigo-50 p-5">
                  <div className="font-extrabold text-indigo-900">
                    {copy.smart.b3Title}
                  </div>
                  <p className="mt-2 text-sm text-indigo-900">
                    {copy.smart.b3Body}
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function ChartBlock(props: {
  title: string;
  Icon: React.ElementType;
  when: string;
  notWhen: string;
  examples: string[];
  pdfNote: string;
  liveNote: string;
}) {
  const { title, Icon, when, notWhen, examples, pdfNote, liveNote } = props;
  const { i18n } = useTranslation();
  const isTr = i18n.language?.toLowerCase().startsWith('tr');
  const ui = useMemo(
    () =>
      isTr
        ? {
            openHint: 'Detay için aç',
            toggle: 'Aç/Kapat',
            when: '📌 Ne zaman kullanılır?',
            notWhen: '❌ Ne zaman kullanılmaz?',
            examples: '💼 Finansal kullanım örnekleri',
            pdf: '📄 PDF notu',
            live: '🟢 Canlı dashboard notu',
          }
        : {
            openHint: 'Open for details',
            toggle: 'Toggle',
            when: '📌 When to use?',
            notWhen: '❌ When not to use?',
            examples: '💼 Finance examples',
            pdf: '📄 PDF note',
            live: '🟢 Live dashboard note',
          },
    [isTr]
  );
  return (
    <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
      <summary className="cursor-pointer select-none flex items-center justify-between gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-indigo-700" />
          </div>
          <div>
            <div className="font-extrabold text-gray-900">{title}</div>
            <div className="text-xs text-gray-500">{ui.openHint}</div>
          </div>
        </div>
        <div className="text-xs font-bold text-gray-500 group-open:text-indigo-700">
          {ui.toggle}
        </div>
      </summary>
      <div className="px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-3">
            <div className="text-xs font-extrabold text-gray-900 mb-1">{ui.when}</div>
            <div className="text-sm text-gray-700">{when}</div>
          </div>
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <div className="text-xs font-extrabold text-red-800 mb-1">{ui.notWhen}</div>
            <div className="text-sm text-red-800">{notWhen}</div>
          </div>
        </div>
        <div className="mt-3 rounded-lg bg-white border border-gray-200 p-3">
          <div className="text-xs font-extrabold text-gray-900 mb-2">{ui.examples}</div>
          <ul className="list-disc pl-6 space-y-1 text-sm text-gray-700">
            {examples.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <div className="text-xs font-extrabold text-amber-800 mb-1">{ui.pdf}</div>
            <div className="text-sm text-amber-900">{pdfNote}</div>
          </div>
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3">
            <div className="text-xs font-extrabold text-indigo-800 mb-1">{ui.live}</div>
            <div className="text-sm text-indigo-900">{liveNote}</div>
          </div>
        </div>
      </div>
    </details>
  );
}

function SectorCard(props: { title: string; items: string[] }) {
  const { title, items } = props;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="font-extrabold text-gray-900">{title}</div>
      <ul className="mt-3 list-disc pl-6 space-y-1 text-sm text-gray-700">
        {items.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

function DataTypeCard(props: {
  title: string;
  description: string;
  example: string;
  charts: { label: string; Icon: React.ElementType }[];
}) {
  const { title, description, example, charts } = props;
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="font-extrabold text-gray-900">{title}</div>
          <div className="mt-1 text-sm text-gray-700">{description}</div>
          <div className="mt-2 text-xs text-gray-500">{example}</div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {charts.map(({ label, Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-50 border border-indigo-200"
              title={label}
            >
              <Icon className="w-5 h-5 text-indigo-700" />
              <span className="text-xs font-extrabold text-indigo-900">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChartMappingCard(props: {
  title: string;
  Icon: React.ElementType;
  when: string[];
  dataTypes: string[];
  examples: string[];
  avoid: string[];
  note?: string;
  extraIcons?: { Icon: React.ElementType; label: string }[];
}) {
  const { title, Icon, when, dataTypes, examples, avoid, note, extraIcons } = props;
  const { i18n } = useTranslation();
  const isTr = i18n.language?.toLowerCase().startsWith('tr');

  const labels = useMemo(
    () =>
      isTr
        ? {
            when: 'Ne zaman kullanılır?',
            data: 'Uygun veri türleri',
            ex: 'Finans örnekleri',
            avoid: 'Kaçınılması gerekenler',
          }
        : {
            when: 'When to use',
            data: 'Best-fit data types',
            ex: 'Finance examples',
            avoid: 'Avoid',
          },
    [isTr]
  );

  return (
    <div className="rounded-2xl border border-indigo-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-indigo-700" />
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-gray-900 truncate">{title}</div>
            {note && <div className="mt-1 text-xs text-indigo-800">{note}</div>}
          </div>
        </div>
        {extraIcons && extraIcons.length > 0 && (
          <div className="flex items-center gap-2">
            {extraIcons.map((x) => (
              <div
                key={x.label}
                className="w-9 h-9 rounded-xl bg-white border border-indigo-200 flex items-center justify-center"
                title={x.label}
              >
                <x.Icon className="w-5 h-5 text-indigo-700" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 text-sm">
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs font-extrabold text-gray-900 mb-1">{labels.when}</div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {when.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs font-extrabold text-gray-900 mb-1">{labels.data}</div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {dataTypes.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3">
          <div className="text-xs font-extrabold text-gray-900 mb-1">{labels.ex}</div>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            {examples.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>

        {avoid.length > 0 && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3">
            <div className="text-xs font-extrabold text-red-800 mb-1">{labels.avoid}</div>
            <ul className="list-disc pl-6 space-y-1 text-red-800">
              {avoid.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

