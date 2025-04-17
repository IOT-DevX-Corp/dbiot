import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bell, CheckCircle, Clock, LineChart } from "lucide-react";
import { database } from '../../../firebase';
import { ref, onValue } from 'firebase/database';

export default function MainDashboard({ setActiveComponent, name }) {
    const [medications, setMedications] = useState([]);
    const [dispenserStatus, setDispenserStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reference to the medications node
        const medicationsRef = ref(database, 'medications');
        const dispenserRef = ref(database, 'pillDispenser');

        // Listen for medications data
        const medicationsUnsubscribe = onValue(medicationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const medicationsData = snapshot.val();
                const medicationsList = Object.keys(medicationsData).map(key => {
                    const med = medicationsData[key];
                    return {
                        id: key,
                        name: med.name,
                        dosage: `Chamber ${med.chamber}`,
                        time: `${med.hour}:${med.minute.toString().padStart(2, '0')}`,
                        status: med.dispensed ? "Taken" : "Upcoming",
                        icon: med.name.charAt(0),
                        statusColor: med.dispensed ? 
                            "bg-green-100 text-green-700" : 
                            "bg-blue-100 text-blue-700",
                        timeIcon: med.dispensed ? 
                            <CheckCircle className="text-green-500 w-4 h-4 inline" /> : 
                            <Clock className="text-gray-500 w-4 h-4 inline" />,
                        lastDispensed: med.lastDispensed
                    };
                });
                setMedications(medicationsList);
            } else {
                setMedications([]);
            }
            setLoading(false);
        });

        // Listen for dispenser data
        const dispenserUnsubscribe = onValue(dispenserRef, (snapshot) => {
            if (snapshot.exists()) {
                setDispenserStatus(snapshot.val());
            }
        });

        return () => {
            medicationsUnsubscribe();
            dispenserUnsubscribe();
        };
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Good Morning, {name}</h1>
                    <p className="text-gray-500">Here's your medication schedule for today</p>
                </div>
                <div className="flex flex-col gap-2">
                    {dispenserStatus && (
                        <div className="text-sm text-gray-500">
                            <p>Dispenser: {dispenserStatus.isOnline ? 
                                <span className="text-green-500">Online</span> : 
                                <span className="text-red-500">Offline</span>}
                            </p>
                            <p>Last Active: {dispenserStatus.lastSeen}</p>
                        </div>
                    )}
                    <button 
                        onClick={() => setActiveComponent('notifications')}
                        className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-medical-100"
                    >
                        <Bell className="w-4 h-4" />
                        Notifications
                    </button>
                    <button 
                        onClick={() => setActiveComponent('medicine-report')}
                        className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-medical-100"
                    >
                        <LineChart className="w-4 h-4" />
                        Medicine Report
                    </button>
                </div>
            </div>

            <h2 className="text-lg font-semibold">Today's Medications</h2>

            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                {medications.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No medications scheduled.</p>
                ) : (
                    medications.map((med) => (
                        <div
                            key={med.id}
                            className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm hover:shadow transition"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-white bg-blue-500">
                                    {med.icon}
                                </div>
                                <div>
                                    <div className="font-semibold">{med.name}</div>
                                    <div className="text-sm text-gray-500">{med.dosage}</div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        {med.time} {med.timeIcon}
                                    </div>
                                    {med.lastDispensed && (
                                        <div className="text-xs text-gray-400">
                                            Last taken: {med.lastDispensed}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${med.statusColor}`}>
                                    {med.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-end">
                <button 
                    onClick={() => setActiveComponent('medicine-doses')}
                    className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm shadow-sm hover:bg-medical-100"
                >
                    <span className="text-xl font-bold">+</span>
                    Add Medication
                </button>
            </div>
        </div>
    );
}

MainDashboard.propTypes = {
    setActiveComponent: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
};

MainDashboard.defaultProps = {
    name: 'User'
};
