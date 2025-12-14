import type { Dashboard } from "../data/dashboards";
import { Link } from "react-router-dom";

interface DashboardCardProps {
  dashboard: Dashboard;
}

export default function DashboardCard({ dashboard }: DashboardCardProps) {
  
  // HATA AYIKLAMA: Gelen imageUrl değerini tarayıcı konsoluna yazdır.
  // Bu, Vite sunucusunun doğru veriyi gönderip göndermediğini bize gösterecek.
  console.log(dashboard.imageUrl);

  return (
    <Link 
      to={`/solutions/dashboard/${dashboard.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 overflow-hidden">
        <img
          src={dashboard.imageUrl}
          alt={`Önizleme: ${dashboard.name}`}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {dashboard.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 flex-grow line-clamp-2">{dashboard.description}</p>
        <div className="mt-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {dashboard.category}
            </span>
        </div>
      </div>
    </Link>
  );
}
