export default function BrandingKitPage() {
  return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-bold mb-6">Finops AI Studio – Brand Kit</h1>

      <p className="text-gray-400 mb-8">
        Aşağıdaki tüm logolar <b>public/brand</b> klasöründen otomatik olarak gelir.
      </p>

      {/*  Logo Grid  */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

        {/* LIGHT LOGO */}
        <div className="text-center">
          <img src="/brand/finops-logo-light.png" alt="Light Logo" className="w-40 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-logo-light.png</p>
        </div>

        {/* DARK LOGO */}
        <div className="text-center">
          <img src="/brand/finops-logo-dark.png" alt="Dark Logo" className="w-40 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-logo-dark.png</p>
        </div>

        {/* PROFILE LIGHT */}
        <div className="text-center">
          <img src="/brand/finops-profile-light.png" className="w-40 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-profile-light.png</p>
        </div>

        {/* PROFILE DARK */}
        <div className="text-center">
          <img src="/brand/finops-profile-dark.png" className="w-40 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-profile-dark.png</p>
        </div>

        {/* BANNER LIGHT */}
        <div className="text-center">
          <img src="/brand/finops-banner-light.png" className="w-64 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-banner-light.png</p>
        </div>

        {/* BANNER DARK */}
        <div className="text-center">
          <img src="/brand/finops-banner-dark.png" className="w-64 mx-auto" />
          <p className="mt-3 text-sm text-gray-500">finops-banner-dark.png</p>
        </div>
      </div>
    </div>
  );
}

