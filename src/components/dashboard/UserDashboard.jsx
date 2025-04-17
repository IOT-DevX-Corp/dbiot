import React from 'react';
import MainDashboard from './ui/MainDashboard';
import DispenserAnimation from './ui/DisperserAnimation';
import SyncDispenser from './ui/SyncDispenser';

const UserDashboard = ({ setActiveComponent,Name }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Button */}
            <button
                onClick={() => setActiveComponent('dashboard')}
                className="absolute top-2 right-4 hover:opacity-80 transition-opacity"
            >
                <span className="text-medical-800 font-bold text-3xl">
                    Dose<span className="text-medical-500">Buddy</span>
                </span>
            </button> 

            <div className="mt-8 md:col-span-2">
                <MainDashboard setActiveComponent={setActiveComponent} name={Name} />
            </div>
            <div className="mt-12 flex flex-col gap-10">
                <DispenserAnimation />
                <SyncDispenser />
            </div>
        </div>
    );
};

export default UserDashboard;