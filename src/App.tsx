import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import ClientManagement from './pages/ClientManagement';
import DocumentIntake from './pages/DocumentIntake';
import TaxFilingWorkflow from './pages/TaxFilingWorkflow';
import RPABotManagement from './pages/RPABotManagement';
import { mockUser, mockStats, mockClients, mockNotifications } from './data/mockData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={mockStats} />;
      case 'clients':
        return <ClientManagement clients={mockClients} />;
      case 'intake':
        return <DocumentIntake clients={mockClients} />;
      case 'filings':
        return <TaxFilingWorkflow filings={[]} />;
      case 'automation':
        return <RPABotManagement />;
      default:
        return (
          <div className="p-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module
              </h2>
              <p className="text-blue-200">This module is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="flex h-screen">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header user={mockUser} notifications={mockNotifications} />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
