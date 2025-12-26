import React, { useEffect } from 'react';

const InvestorPresentationPage: React.FC = () => {
  useEffect(() => {
    window.location.href = '/YatirimciSunumu_v3.pptx';
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Yatırımcı Sunumu</h1>
      <p>Sunumunuz hazırlanıyor ve indirme işlemi başlatılıyor...</p>
      <p>İndirme işlemi otomatik olarak başlamazsa, lütfen <a href="/YatirimciSunumu_v3.pptx" download>buraya tıklayın</a>.</p>
    </div>
  );
};

export default InvestorPresentationPage;
