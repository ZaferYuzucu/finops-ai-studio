import { Link, NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navConfig = [
  {
    name: "Çözümler",
    href: "/solutions",
    children: [
      { name: "Finansal Veri Analizi", href: "/solutions/financial-data-analysis" },
      { name: "Maliyet ve Stok Yönetimi", href: "/solutions/cost-inventory-management" },
      { name: "Nakit Akışı-Cash Flow", href: "/solutions/cash-flow" },
      { name: "Bütçe ve Planlama", href: "/solutions/budget-planning" },
      { name: "İK- Bordo / Performans", href: "/solutions/hr-payroll-performance" },
    ],
  },
  // GÜNCELLENDİ: VERİ GÖRSELLEŞTİRME ARTIK BİR AÇILIR MENÜ
  {
    name: "Veri Görselleştirme",
    href: "/solutions/data-visualization", // Ana sayfa linki
    children: [
        { name: "Dashboard Örnekleri", href: "/solutions/dashboard-examples" },
        { name: "Özellikler", href: "/solutions/features" },
        { name: "Destek", href: "/solutions/support" },
    ]
  },
  {
    name: "Kaynaklar",
    href: "/resources",
    children: [
      { name: "Bilgi Merkezi", href: "/blog" },
      { name: "Dökümanlar", href: "/docs" },
    ],
  },
  { name: "Fiyatlandırma", href: "/pricing" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/finops-logo-dark.png" alt="Finops AI Logo" className="h-7 w-auto" />
              <span className="text-gray-800 font-semibold text-base tracking-wide">Finops AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-2">
              {navConfig.map((item) => (
                <div key={item.name} className="relative group">
                  {item.children ? (
                    <>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `px-4 py-2 flex items-center gap-1 text-sm font-medium transition-colors hover:text-blue-600 ${
                            isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                          }`
                        }
                      >
                        {item.name} <ChevronDown className="h-4 w-4" />
                      </NavLink>
                      <div className="absolute top-full left-0 w-64 rounded-md shadow-lg bg-white ring-1 ring-gray-200 p-2 z-10 hidden group-hover:block">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.name}
                            to={child.href}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-md text-sm transition-colors ${
                                isActive ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100"
                              }`
                            }
                          >
                            {child.name}
                          </NavLink>
                        ))}
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-blue-600 ${
                          isActive ? "text-blue-600 font-semibold" : "text-gray-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center border border-gray-300 rounded-full text-sm p-0.5">
              <button className="px-3 py-0.5 bg-gray-200 text-gray-800 rounded-full font-semibold">TR</button>
              <button className="px-3 py-0.5 text-gray-500 hover:bg-gray-100 rounded-full">EN</button>
            </div>

            <div className="flex items-center gap-x-2">
                <Link to="/login" className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg">
                    Giriş Yap
                </Link>
                <Link to="/signup" className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg shadow-sm">
                    Kayıt Ol
                </Link>
            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}
