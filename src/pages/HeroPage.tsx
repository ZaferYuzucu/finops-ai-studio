import { BarChart, Check, Shield, Zap, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    name: 'Anlık Maliyet Görünürlüğü',
    description: 'Tüm bulut harcamalarınızı tek bir yerden, anlık olarak takip edin ve beklenmedik maliyet artışlarını anında tespit edin.',
    icon: BarChart,
  },
  {
    name: 'Akıllı Optimizasyon Önerileri',
    description: 'Yapay zeka destekli motorumuz, kullanılmayan kaynakları ve yanlış boyutlandırılmış servisleri bularak size özel tasarruf önerileri sunar.',
    icon: Zap,
  },
  {
    name: 'Otomatik Bütçe Yönetimi',
    description: 'Proje, ekip veya departman bazında bütçeler oluşturun, limit aşımlarını önlemek için otomatik uyarılar ve aksiyonlar ayarlayın.',
    icon: Shield,
  },
  {
    name: 'Finansal Raporlama ve Tahminleme',
    description: 'Geçmiş verilerinizi analiz ederek gelecekteki bulut harcamalarınızı yüksek doğrulukla tahminleyin ve finansal planlamanızı güçlendirin.',
    icon: TrendingUp,
  },
  {
    name: 'Ekipler Arası İş Birliği',
    description: 'Finans, mühendislik ve yönetim ekipleri arasında ortak bir dil oluşturarak maliyet sorumluluğunu tüm organizasyona yayın.',
    icon: Users,
  },
  {
    name: 'Birim Ekonomisi Analizi',
    description: 'Maliyetlerinizi "müşteri başına maliyet" veya "işlem başına maliyet" gibi iş metriklerine bağlayarak gerçek kârlılığınızı ölçün.',
    icon: DollarSign,
  },
];

const testimonials = [
    {
      body: 'Finops AI sayesinde bulut maliyetlerimizi %35 oranında düşürdük. Artık bütçemizi aşma korkusu olmadan inovasyona odaklanabiliyoruz.',
      author: {
        name: 'Ahmet Yılmaz',
        handle: 'CTO, TechStart A.Ş.',
        imageUrl:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    },
    {
        body: 'Platformun sunduğu anlık görünürlük ve optimizasyon önerileri oyun değiştirici oldu. Finans ve mühendislik ekiplerimiz nihayet aynı dili konuşuyor.',
        author: {
          name: 'Elif Kaya',
          handle: 'Bulut Operasyonları Direktörü, CodeCore',
          imageUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
    },
    {
        body: 'Birim ekonomisi analizleri sayesinde hangi ürünlerimizin gerçekten kârlı olduğunu net bir şekilde gördük. Stratejik kararlarımızı artık veriye dayalı alıyoruz.',
        author: {
          name: 'Mehmet Öztürk',
          handle: 'Ürün Yönetimi Lideri, InnovateX',
          imageUrl:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
      },
  ]

const faqs = [
    {
      id: 1,
      question: "FinOps AI tam olarak ne işe yarar?",
      answer:
        "FinOps AI, şirketinizin bulut altyapısı maliyetlerini optimize etmenize yardımcı olan bir platformdur. Harcamalarınızı anlık olarak gösterir, yapay zeka ile tasarruf önerileri sunar, bütçelerinizi yönetir ve finansal raporlar oluşturarak bulut kaynaklarınızı en verimli şekilde kullanmanızı sağlar.",
    },
    {
      id: 2,
      question: "Hangi bulut sağlayıcıları destekleniyor?",
      answer:
        "Şu anda Amazon Web Services (AWS), Microsoft Azure ve Google Cloud Platform (GCP) ile tam entegrasyon sunuyoruz. Desteklediğimiz platformların sayısını sürekli artırıyoruz.",
    },
    {
        id: 3,
        question: "Kurulum süreci ne kadar sürer?",
        answer:
          "Kurulum oldukça basittir. Sadece birkaç tıklama ile bulut hesabınıza salt okunur (read-only) erişim izni vermeniz yeterlidir. Genellikle 10 dakikadan daha kısa bir sürede ilk maliyet verilerinizi panelinizde görmeye başlarsınız.",
    },
    {
        id: 4,
        question: "Verilerimiz güvende mi?",
        answer:
          "Evet, güvenlik en büyük önceliğimizdir. Platformumuz, bulut hesabınıza yalnızca maliyet ve kullanım verilerini okuma yetkisiyle erişir. Hiçbir şekilde kaynaklarınızı değiştirme veya yönetme yetkisine sahip değildir. Tüm verileriniz endüstri standardı şifreleme yöntemleriyle korunmaktadır.",
    },
  ]

export default function HeroPage() {
    return (
        <div className="bg-slate-50">
            {/* Hero */}
            <main>
                <div className="relative isolate">
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 sm:text-6xl">
                                        Bulut Maliyetlerinizi Kontrol Altına Alın.
                                    </h1>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                        Finops AI, bulut harcamalarınızı anlık olarak izlemenizi, optimize etmenizi ve tahminlemenizi sağlayan yapay zeka destekli bir FinOps platformudur. Verimsiz kaynakları ortadan kaldırın, bütçenizi koruyun ve inovasyona daha fazla odaklanın.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <Link
                                            to="/signup"
                                            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                        >
                                            Ücretsiz Başlayın
                                        </Link>
                                        <Link to="/features" className="text-sm font-semibold leading-6 text-gray-900">
                                            Özellikleri Keşfet <span aria-hidden="true">→</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Her Şey Kontrol Altında</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 sm:text-4xl">
                            Bulut Finans Yönetiminde İhtiyacınız Olan Her Şey
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Karmaşık bulut faturalarını anlamaktan, kaynakları verimli kullanmaya kadar Finops AI, tüm süreci sizin için basitleştirir ve otomatikleştirir.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex flex-col p-8 bg-white rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                        <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                        <p className="flex-auto">{feature.description}</p>
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonials */}
             <div className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Referanslar</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 sm:text-4xl">
                        Binlerce Mutlu Müşterimiz Var
                    </p>
                </div>
                <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
                    <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.author.handle} className="pt-8 sm:inline-block sm:w-full sm:px-4">
                        <figure className="rounded-2xl bg-white p-8 text-sm leading-6 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-slate-200">
                            <blockquote className="text-gray-900">
                            <p>{`“${testimonial.body}”`}</p>
                            </blockquote>
                            <figcaption className="mt-6 flex items-center gap-x-4">
                            <img className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" />
                            <div>
                                <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                                <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
                            </div>
                            </figcaption>
                        </figure>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600 text-center">Sıkça Sorulan Sorular</h2>
                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="pt-6">
                        <dt>
                            <div className="flex w-full items-start justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-7">{faq.question}</span>
                            </div>
                        </dt>
                        <dd className="mt-2 pr-12">
                            <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                        </dd>
                        </div>
                    ))}
                    </dl>
                </div>
            </div>

            {/* CTA */}
            <div className="pb-24 sm:pb-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Maliyetlerinizi Optimize Etmeye Bugün Başlayın.
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                            Sadece birkaç tıklamayla bulut hesabınızı bağlayın ve tasarruf potansiyelinizi anında keşfedin.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/signup"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            14 Gün Ücretsiz Deneyin
                        </Link>
                        <Link to="/contact" className="text-sm font-semibold leading-6 text-white">
                            Bize Ulaşın <span aria-hidden="true">→</span>
                        </Link>
                        </div>
                        <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                        >
                        <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                        <defs>
                            <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                            <stop stopColor="#7775D6" />
                            <stop offset={1} stopColor="#E935C1" />
                            </radialGradient>
                        </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
