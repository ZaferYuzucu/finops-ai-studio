import React from 'react';
import { Building, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Prop tipleri tanımlandı
interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, children }) => (
  <div className="flex gap-x-4">
    <div className="flex-shrink-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="text-base font-semibold leading-7 text-gray-900">{title}</h3>
      <div className="mt-2 leading-7 text-gray-600">{children}</div>
    </div>
  </div>
);

export default function ContactPage() {
  const { t } = useTranslation();
  
  return (
    <div className="relative isolate bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">{t('contact.badge')}</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t('contact.title')}
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('contact.subtitle')}
            </p>
        </div>

        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="grid grid-cols-1 gap-y-10">
                <ContactInfo
                    icon={<Building className="h-6 w-6 text-white" />}
                    title={t('contact.website')}
                >
                    <a href="https://www.finops.ist" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                        www.finops.ist
                    </a>
                </ContactInfo>

                <ContactInfo
                    icon={<Mail className="h-6 w-6 text-white" />}
                    title={t('contact.email')}
                >
                    <a href="mailto:info@finops.ist" className="hover:text-blue-600 transition-colors">
                        info@finops.ist
                    </a>
                </ContactInfo>

                <ContactInfo
                    icon={<Phone className="h-6 w-6 text-white" />}
                    title={t('contact.phone')}
                >
                     <a href="tel:+905324551045" className="hover:text-blue-600 transition-colors">
                        +90 532 455 1045
                    </a>
                </ContactInfo>
            </div>
        </div>
      </div>
    </div>
  );
}
