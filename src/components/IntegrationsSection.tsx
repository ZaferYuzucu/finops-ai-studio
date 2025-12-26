import React from 'react';
import { useTranslation } from 'react-i18next';

// Import ONLY working SVG files (non-empty)
import googleSheets from '../assets/integrations/google-sheets.svg';
import sap from '../assets/integrations/sap.svg';
import googleCloud from '../assets/integrations/google-cloud.svg';
import quickbooks from '../assets/integrations/quickbooks.svg';
import xero from '../assets/integrations/xero.svg';
import zoho from '../assets/integrations/zoho.svg';
import hubspot from '../assets/integrations/hubspot.svg';
import stripe from '../assets/integrations/stripe.svg';

const integrations = [
  { name: 'Logo Yazılım', logoText: 'LOGO', subtitle: 'Logo Yazılım' },
  { name: 'Netsis', logoText: 'NETSİS' },
  { name: 'Paraşüt', logoText: 'PARAŞÜT' },
  { name: 'Microsoft Azure', logoText: 'AZURE', subtitle: 'Microsoft' },
  { name: 'Amazon AWS', logoText: 'AWS', subtitle: 'Amazon Web Services' },
  { name: 'Microsoft Excel', logoText: 'EXCEL', subtitle: 'Microsoft' },
  { name: 'Google Sheets', logoUrl: googleSheets },
  { name: 'SAP', logoUrl: sap },
  { name: 'Oracle', logoText: 'ORACLE' },
  { name: 'Salesforce', logoText: 'SALESFORCE' },
  { name: 'Google Cloud', logoUrl: googleCloud },
  { name: 'QuickBooks', logoUrl: quickbooks },
  { name: 'Xero', logoUrl: xero },
  { name: 'Zoho', logoUrl: zoho },
  { name: 'HubSpot', logoUrl: hubspot },
  { name: 'Stripe', logoUrl: stripe },
];

// FINOPS RENK SKALASI - Soft gradient tonları
const colorPalette = [
  'bg-gradient-to-br from-sky-500/10 to-sky-600/20 border-sky-500/30',      // Turkuaz
  'bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-purple-500/30', // Mor
  'bg-gradient-to-br from-orange-500/10 to-orange-600/20 border-orange-500/30', // Turuncu
  'bg-gradient-to-br from-green-500/10 to-green-600/20 border-green-500/30',   // Yeşil
  'bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 border-cyan-500/30',      // Cyan
  'bg-gradient-to-br from-indigo-500/10 to-indigo-600/20 border-indigo-500/30', // İndigo
];

const IntegrationsSection = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('integrations.title')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('integrations.subtitle')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('integrations.description')}
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-6xl">
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {integrations.map((integration, index) => {
              const colorClass = colorPalette[index % colorPalette.length];

              return (
                <div
                  key={integration.name}
                  className={`flex flex-col h-28 items-center justify-center rounded-xl ${colorClass} border-2 p-4 
                             backdrop-blur-sm bg-white/70
                             transition-all duration-300 
                             hover:scale-105 hover:shadow-2xl hover:bg-white/90
                             cursor-pointer group`}
                  title={integration.name}
                >
                  {integration.logoUrl ? (
                    <img
                      className="max-h-12 w-auto object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                      src={integration.logoUrl}
                      alt={integration.name}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <p className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                        {integration.logoText}
                      </p>
                      {integration.subtitle && (
                        <p className="text-xs text-gray-500 mt-1">{integration.subtitle}</p>
                      )}
                    </div>
                  )}
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
