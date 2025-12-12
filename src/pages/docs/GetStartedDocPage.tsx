
import { Link } from "react-router-dom";

const GetStartedDocPage = () => {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Başlarken</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Finops AI Kurulum ve İlk Adımlar</h1>
        <p className="mt-6 text-xl leading-8">
            Bu rehber, Finops AI platformuna hızlı bir başlangıç yapmanız için gereken tüm adımları içerir. Kurulumdan ilk dashboard'unuzu oluşturmaya kadar her adımı basit ve anlaşılır bir şekilde ele alacağız.
        </p>
        <div className="mt-10 max-w-2xl">
            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">1. Kurulum ve Proje Oluşturma</h2>
            <p className="mt-6">
                Platformumuzu kullanmaya başlamak için öncelikle bir hesap oluşturmanız ve ilk projenizi tanımlamanız gerekmektedir. Projeniz, tüm veri kaynaklarınızı, dashboardlarınızı ve raporlarınızı barındıran merkezi çalışma alanınız olacaktır.
            </p>
            <figure className="mt-10 border-l border-indigo-600 pl-9">
                <blockquote className="font-semibold text-gray-900">
                <p>“Sadece birkaç tıklama ile bulut sağlayıcılarınızı (AWS, Azure, GCP) veya yerel veritabanlarınızı bağlayarak veri entegrasyonu sürecini başlatabilirsiniz.”</p>
                </blockquote>
            </figure>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">2. Güvenlik ve Yetkilendirme</h2>
            <p className="mt-8">
                Veri güvenliği en büyük önceliğimizdir. Finops AI, rol bazlı erişim kontrolü (RBAC) ile hassas verilerinize yalnızca yetkili kişilerin erişmesini sağlar. Ekip üyelerinizi farklı rollere (Yönetici, Editör, Görüntüleyici) atayarak veri ve dashboard erişimlerini kolayca yönetebilirsiniz.
            </p>
            <figure className="mt-10">
                <img 
                    className="aspect-video rounded-xl bg-gray-50 object-cover shadow-lg"
                    src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Güvenlik ayarları ekranı"
                />
                <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                    Kullanıcı rolleri ve izin ayarları paneli.
                </figcaption>
            </figure>

            <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">3. Veri Odaklı Kararlar Alın</h2>
            <p className="mt-6">
                Kurulum tamamlandıktan sonra, artık verilerinizi konuşturma zamanı! Platformumuz, farklı departmanlardan (Finans, Satış, Pazarlama, Operasyon) gelen verileri bir araya getirerek 360 derecelik bir şirket görünümü sunar. Bu bütünsel bakış açısı, siloları ortadan kaldırır ve ekipler arası iş birliğini teşvik eder.
            </p>
             <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">Stratejik Hizalama:</strong> Tüm departmanlar aynı veri seti üzerinden çalışarak ortak hedeflere odaklanır.
                    </span>
                </li>
                <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">Verimlilik Artışı:</strong> Manuel raporlama ve veri toplama süreçlerini otomatikleştirerek zaman kazanın.
                    </span>
                </li>
                 <li className="flex gap-x-3">
                    <span>
                    <strong className="font-semibold text-gray-900">Anlık İçgörüler:</strong> Gerçek zamanlı verilerle donatılmış dashboardlar sayesinde pazar değişikliklerine anında yanıt verin.
                    </span>
                </li>
            </ul>
            <p className="mt-8">
                Artık Finops AI platformunun temellerini biliyorsunuz. Daha fazla bilgi için diğer dökümantasyon başlıklarını inceleyebilir veya <Link to="/solutions/dashboard-examples" className="text-indigo-600 font-semibold hover:text-indigo-500">Dashboard Örnekleri</Link> sayfamızdan ilham alabilirsiniz.
            </p>
        </div>
      </div>
    </div>
  );
};

export default GetStartedDocPage;
