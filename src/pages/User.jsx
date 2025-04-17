import React, { useState, useEffect } from 'react';
import Sidebar from '../components/user/Sidebar';
import UserDashboard from '../components/user/UserDashboard';
import WeeklySchedule from '../components/user/WeeklySchedule';
import Monitor from '../components/user/ui/Monitor';
import MedicineDoses from '../components/user/MedicineDoses';
import Notification from '../components/user/Notification';
import MachineTutorial from '../components/user/MachineTutorial';
import NotConnected from '../components/user/NotConnected';

export default function User() {
    const [activeComponent, setActiveComponent] = useState('dashboard');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div>Loading...</div>;
        }

        if (!userData?.qrCode && activeComponent === 'dashboard') {
            return <NotConnected setActiveComponent={setActiveComponent} />;
        }

        switch (activeComponent) {
            case 'dashboard':
                return <UserDashboard setActiveComponent={setActiveComponent} medications={userData.medications} />;
            case 'schedule':
                return userData?.medications?.length ? 
                    <WeeklySchedule medications={userData.medications} /> : null;
            case 'medicine-doses':
                return <MedicineDoses setActiveComponent={setActiveComponent} />;
            case 'notifications':
                return <Notification setActiveComponent={setActiveComponent} />;
            case 'machine-tutorial':
                return <MachineTutorial setActiveComponent={setActiveComponent} />;
            default:
                return <NotConnected setActiveComponent={setActiveComponent} />;
        }
    };

    return (
        <div className="flex">
            <Sidebar 
                setActiveComponent={setActiveComponent}
                activeComponent={activeComponent}
                hasQR={Boolean(userData?.qrCode)}
                hasMedications={Boolean(userData?.medications?.length)}
            />
            <main className="flex-1 min-h-screen bg-gray-50">
                {renderContent()}
            </main>
        </div>
    );
}