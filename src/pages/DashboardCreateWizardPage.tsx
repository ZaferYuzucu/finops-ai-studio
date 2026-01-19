import React from 'react';
import { DashboardWizard } from '../components/dashboard-wizard';

const DashboardCreateWizardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <DashboardWizard />
    </div>
  );
};

export default DashboardCreateWizardPage;
