## İş Planı — Stabil Kullanıcı Kimliği ve Dashboard Güvenilirliği

Bu doküman, FinOps AI Studio’da **prestij riski yaratan** kullanıcı kimliği (UID) ve dashboard görünürlüğü sorunlarını kalıcı şekilde çözmek için adım adım uygulama planıdır.

### Hedefler
- **H1 (Kritik)**: Aynı e‑posta her zaman aynı kullanıcı kimliğine (UID) denk gelsin.
- **H2 (Kritik)**: UID standardı değişse bile kullanıcı “Dashboard’larım” altında dashboard kaybetmesin.
- **H3 (Ürün)**: Demo/seed ve wizard aynı işlem hattını kullansın (CSV parse + layout üretimi tek yerden).
- **H4 (UX)**: Dashboard “işleniyor / hata” durumları net görülsün.
- **H5 (Kalite)**: Build/typecheck ile runtime’da patlayan hatalar daha yakalanabilir olsun.

---

## 1) Tamamlandı: Kullanıcı UID standardizasyonu (Prestij Fix)

### Yapılanlar
- **UID standardı**: `user_${email.toLowerCase().trim()}` (deterministik)
- **User management kaydı**: tek anahtar olarak `finops_users_management` kullanımı (admin ekranlarıyla uyum)
- **Otomatik migration**:
  - Login sırasında eski UID kovalarındaki dashboard’lar yeni UID’ye taşınır.
  - Mevcut oturumda (sayfa açılışında) UID eski ise otomatik normalize edilir ve dashboard’lar taşınır.

### Beklenen sonuç
- Kullanıcılar giriş yaptığında **dashboard’lar kaybolmaz**, aynı e‑postayla her zaman aynı UID oluşur.

---

## 2) Kısa Vadeli Onarım (Bug temizliği) — Sıradaki Adımlar

### 2.1 Boş/bozuk demo dashboard’u kaldır
- **Amaç**: “boş sayfa” algısını bitirmek.
- **Yapılacaklar**
  - `ProfessionalDashboardsPage` içinden bozuk demo seçeneğini kaldırmak.
  - `App.tsx` içindeki bozuk demo route’u kaldırmak veya çalışan sayfaya yönlendirmek.
- **Kriter**: Kullanıcı demo seçtiğinde boş ekran görmemeli.

### 2.2 Seed (Elba/Test1) akışını yeni UID ve yeni dashboard işlem hattına bağla
- **Amaç**: Seed edilen dashboard’lar gerçekten görünsün.
- **Yapılacaklar**
  - Seed edilen kullanıcıların yönetim kaydında `id` deterministik olsun.
  - Dashboard seed işlemi `dashboardProcessor.createDashboardFromLibrary()` üzerinden yapılsın (CSV parse + layout garantili).
- **Kriter**: Elba kullanıcısıyla login → “Dashboard’larım”da seed dashboard görünür → açıldığında render olur.

### 2.3 Dashboard hata ekranı
- **Amaç**: “işleniyor” ile “hata” ayrımı netleşsin.
- **Yapılacaklar**
  - `DashboardViewPage` içinde `status === 'error'` için ayrı mesaj ve yönlendirme (tekrar dene / sil / geri dön).
- **Kriter**: Bozuk dashboard “sonsuz işleniyor” ekranında kalmamalı.

---

## 3) Orta Vadeli Sağlamlaştırma (Kalite + Bakım Kolaylığı)

### 3.1 Tek dashboard processing hattı
- **Amaç**: `userDashboards.ts` içindeki legacy processing ve `dashboardProcessor.ts` çakışmasını azaltmak.
- **Yapılacaklar**
  - Yeni dashboard üretimi her yerde `dashboardProcessor` üzerinden yürüsün.
  - Legacy path sadece geriye dönük destek için minimal tutulur.

### 3.2 Typecheck komutu ekle
- **Amaç**: “build geçti ama runtime’da patladı” sorunlarını azaltmak.
- **Yapılacaklar**
  - `package.json` içine `typecheck: tsc --noEmit` eklemek.
- **Kriter**: `npm run typecheck` hatasız çalışmalı.

---

## 4) Finans Profesyoneli için Test Planı (Kod bilmeden)

Bu testler “sahada prestij” için en kritik kontrol listesidir:
- **T1**: Aynı e‑posta ile 2 kez login → “Dashboard’larım” aynı kalmalı.
- **T2**: Login → dashboard oluştur → logout/login → dashboard hâlâ görünmeli.
- **T3**: Elba hesabı ile login → seed dashboard görünmeli ve açılmalı.
- **T4**: Bozuk demo linki/route’u yok; demo sayfaları boş kalmıyor.

