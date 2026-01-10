import React from 'react';
import { useTranslation } from 'react-i18next';

// Import ONLY working SVG files (non-empty)
import sap from '../assets/integrations/sap.svg';
import quickbooks from '../assets/integrations/quickbooks.svg';
import xero from '../assets/integrations/xero.svg';
import zoho from '../assets/integrations/zoho.svg';
import hubspot from '../assets/integrations/hubspot.svg';
import stripe from '../assets/integrations/stripe.svg';

type IntegrationItem = {
  name: string;
  logoUrl?: string;
  /** public/ altındaki dosya yolu (örn: /integrations/microsoft-excel.png) */
  logoPath?: string;
  logoText?: string;
  subtitle?: string;
};

const integrations: IntegrationItem[] = [
  // Bu 3 marka için PNG’leri user sağlayacak (public/integrations altında)
  { name: 'Logo Yazılım', logoPath: '/integrations/logo-yazilim.png', logoText: 'LOGO', subtitle: 'Logo Yazılım' },
  { name: 'Netsis', logoPath: '/integrations/netsis.png', logoText: 'NETSİS' },
  { name: 'Paraşüt', logoPath: '/integrations/parasut.png', logoText: 'PARAŞÜT' },

  // Büyük markalar (PNG koyarsan otomatik logo olur)
  { name: 'Microsoft Azure', logoPath: '/integrations/microsoft-azure.png', logoText: 'AZURE', subtitle: 'Microsoft' },
  { name: 'Amazon AWS', logoPath: '/integrations/amazon-aws.png', logoText: 'AWS', subtitle: 'Amazon Web Services' },
  { name: 'Microsoft Excel', logoPath: '/integrations/microsoft-excel.png', logoText: 'EXCEL', subtitle: 'Microsoft' },

  // Repo’da mevcut SVG’ler
  { name: 'Google Sheets', logoPath: '/integrations/google-sheets.png' },
  { name: 'SAP', logoUrl: sap },

  // PNG koyarsan otomatik logo olur
  { name: 'Oracle', logoPath: '/integrations/oracle.png', logoText: 'ORACLE' },
  { name: 'Salesforce', logoPath: '/integrations/salesforce.png', logoText: 'SALESFORCE' },

  // Repo’da mevcut SVG’ler
  { name: 'Google Cloud', logoPath: '/integrations/google_cloud.png' },
  { name: 'QuickBooks', logoUrl: quickbooks },
  { name: 'Xero', logoUrl: xero },
  { name: 'Zoho', logoUrl: zoho },
  { name: 'HubSpot', logoUrl: hubspot },
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

  const getLogoLetters = (integration: IntegrationItem) => {
    const base = (integration.logoText || integration.name || '').trim();
    if (!base) return '•';
    // If logoText is already a short token (AWS, SAP, LOGO), use it as-is.
    if (base.length <= 6) return base.toUpperCase();
    // Otherwise take initials.
    return base
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  };

  const IntegrationLogo: React.FC<{ integration: IntegrationItem }> = ({ integration }) => {
    const [failed, setFailed] = React.useState(false);
    const src = integration.logoUrl || integration.logoPath;

    if (!src || failed) {
      return (
        <span className="text-xs font-extrabold tracking-wide text-gray-800">
          {getLogoLetters(integration)}
        </span>
      );
    }

    return (
      <img
        className="max-h-8 w-auto object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
        src={src}
        alt={integration.name}
        onError={() => setFailed(true)}
        loading="lazy"
      />
    );
  };
  
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
                  {/* Logo area (consistent for all tiles) */}
                  <div className="w-12 h-12 rounded-xl bg-white/90 border border-gray-200 shadow-sm flex items-center justify-center overflow-hidden mb-2 group-hover:shadow-md transition-shadow">
                    <IntegrationLogo integration={integration} />
                  </div>

                  {/* Name (always visible) */}
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 text-center leading-tight group-hover:text-indigo-700 transition-colors">
                    {integration.name}
                  </p>
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
