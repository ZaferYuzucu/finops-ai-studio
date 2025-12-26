import React from 'react';
import StudioCreator from '../components/StudioCreator';

const StudioCreatorPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <StudioCreator />
      </div>
    </div>
  );
};

export default StudioCreatorPage;
