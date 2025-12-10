import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#0B1221] px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img
          src="/brand/finops-logo-light.png"
          alt="Finops Logo"
          className="h-8 w-auto"
        />
        <span className="text-white font-semibold text-lg tracking-wide">
          FINOPS AI STUDIO
        </span>
      </Link>

      {/* Menü */}
      <div className="flex items-center gap-6 text-white opacity-90">
        <Link to="/about" className="hover:text-blue-400">Hakkında</Link>
        <Link to="/pricing" className="hover:text-blue-400">Fiyatlar</Link>
        <Link to="/dashboards" className="hover:text-blue-400">Dashboardlar</Link>
        <Link to="/studio" className="hover:text-blue-400">Studio Creator</Link>
      </div>
    </nav>
  );
}
