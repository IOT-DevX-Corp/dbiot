import React, { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Footer from '@/components/dashboard/Footer';
import MachineTutorial from '@/components/dashboard/MachineTutorial';
import MedicineDoses from '@/components/dashboard/MedicineDoses';
import WeeklySchedule from '@/components/dashboard/WeeklySchedule';
import MonitoringRequest from '@/components/dashboard/MonitoringRequest';
import Notification from '@/components/dashboard/Notification';
import NotConnected from '@/components/dashboard/NotConnected';
import UserDashboard from '@/components/dashboard/UserDashboard';
import Monitor from '@/components/dashboard/ui/Monitor';

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderContent = () => {
    switch (activeComponent) {
      case 'machine-tutorial':
        return <MachineTutorial />;
      case 'medicine-doses':
        return <MedicineDoses />;
      case 'schedule':
        return <WeeklySchedule />;
      case 'add-member':
        return <MonitoringRequest />;
      case 'notifications':
        return <Notification />;
      case 'member-sister':
        return <NotConnected />;
      case 'dashboard':
        return <UserDashboard setActiveComponent={setActiveComponent} Name="Sung" />;
      case 'member-mama':
        return <UserDashboard setActiveComponent={setActiveComponent} Name="Mama" />;
      case 'medicine-report':
        return <Monitor setActiveComponent={setActiveComponent} />;
      default:
        return <NotConnected />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex bg-gray-50">
        <Sidebar 
          setActiveComponent={setActiveComponent} 
          activeComponent={activeComponent}
        />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
