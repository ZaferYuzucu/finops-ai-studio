import React from 'react';
import entegrasyonImg from "@/assets/dashboards/Entegrasyon.png";

const DashboardPreview = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-2xl">
      <img 
        src={entegrasyonImg} 
        alt="Veri Entegrasyonu Paneli" 
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default DashboardPreview;
