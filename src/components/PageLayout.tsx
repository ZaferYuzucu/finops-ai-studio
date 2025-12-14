import React, { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="bg-background-dark min-h-screen">
      {/* Page Header */}
      <div className="pt-32 pb-16 text-center border-b border-gray-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-primary-blue via-primary-purple to-primary-blue text-transparent bg-clip-text bg-300% animate-gradient">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-muted">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
