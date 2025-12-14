import React from 'react';

const integrations = [
  { name: 'Logo Yazılım', logoUrl: '/images/integrations/logo-yazilim.svg' },
  { name: 'Netsis', logoUrl: '/images/integrations/netsis.svg' },
  { name: 'Paraşüt', logoUrl: '/images/integrations/parasut.svg' },
  { name: 'Microsoft Azure', logoUrl: '/images/integrations/azure.svg' },
  { name: 'Amazon Web Services', logoUrl: '/images/integrations/aws.svg' },
  { name: 'Microsoft Excel', logoUrl: '/images/integrations/excel.svg' },
  { name: 'Google Sheets', logoUrl: '/images/integrations/google-sheets.svg' },
  { name: 'SAP', logoUrl: '/images/integrations/sap.svg' },
  { name: 'Oracle', logoUrl: '/images/integrations/oracle.svg' },
  { name: 'Salesforce', logoUrl: '/images/integrations/salesforce.svg' },
  { name: 'QuickBooks', logoUrl: '/images/integrations/quickbooks.svg' },
  { name: 'Shopify', logoUrl: '/images/integrations/shopify.svg' },
  { name: 'WooCommerce', logoUrl: '/images/integrations/woocommerce.svg' },
  { name: 'Google Cloud', logoUrl: '/images/integrations/google-cloud.svg' },
];

// Kutucuklar için renk paleti tanımlandı.
const colorPalette = [
  'bg-sky-900',
  'bg-teal-900',
  'bg-violet-900',
  'bg-indigo-900',
  'bg-rose-900',
  'bg-cyan-900',
];

const IntegrationsSection = () => {
  return (
    // Arka plan, okunabilirliği koruyarak iki ton açıldı (bg-slate-600).
    <div className="bg-slate-600 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-400">Sorunsuz Entegrasyon</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Mevcut Yazılımlarınızla Uyumlu
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Platformumuz, Türkiye pazarında yaygın olarak kullanılan ERP, bulut ve ofis yazılımlarıyla sorunsuz bir şekilde entegre olarak veri akışınızı otomatikleştirir ve size zaman kazandırır.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {integrations.map((integration, index) => {
              // Renk paletinden sırayla bir renk seçilir.
              const bgColor = colorPalette[index % colorPalette.length];
              const finalClassName = `flex h-24 w-40 items-center justify-center rounded-lg ${bgColor} p-4 transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl`;

              return (
                <div 
                  key={integration.name}
                  className={finalClassName}
                  title={integration.name}
                >
                  <img
                    className="max-h-12 w-auto object-contain"
                    src={integration.logoUrl}
                    alt={integration.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
