import React from 'react';
import PropTypes from 'prop-types';
import { Bell, CheckCircle, Clock, LineChart } from "lucide-react";

const medications = [
    {
        name: "Aspirin",
        dosage: "100mg - 1 pill",
        time: "8:00 AM",
        status: "Taken",
        icon: "A",
        statusColor: "bg-green-100 text-green-700",
        timeIcon: <CheckCircle className="text-green-500 w-4 h-4 inline" />,
    },
    {
        name: "Metformin",
        dosage: "500mg - 1 pill",
        time: "1:00 PM",
        status: "Upcoming",
        icon: "M",
        statusColor: "bg-blue-100 text-blue-700",
        timeIcon: <Clock className="text-gray-500 w-4 h-4 inline" />,
    },
    {
        name: "Atorvastatin",
        dosage: "20mg - 1 pill",
        time: "9:00 PM",
        status: "Upcoming",
        icon: "A",
        statusColor: "bg-blue-100 text-blue-700",
        timeIcon: <Clock className="text-gray-500 w-4 h-4 inline" />,
    },
    
    {
        name: "Crocine",
        dosage: "10mg - 1 pill",
        time: "10:00 PM",
        status: "Upcoming",
        icon: "C",
        statusColor: "bg-blue-100 text-blue-700",
        timeIcon: <Clock className="text-gray-500 w-4 h-4 inline" />,
    },
];

export default function MainDashboard({ setActiveComponent, name }) {
    return (
        <div className="p-6 space-y-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Good Morning, {name}</h1>
                    <p className="text-gray-500">Here's your medication schedule for today</p>
                </div>
                <div className="flex flex-col gap-2">
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

            {/* Added max-height and overflow-y-auto to create scrollable container */}
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
                {medications.map((med, index) => (
                    <div
                        key={index}
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
                            </div>
                        </div>
                        <div>
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${med.statusColor}`}
                            >
                                {med.status}
                            </span>
                        </div>
                    </div>
                ))}
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
