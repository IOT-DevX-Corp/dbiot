import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import PropTypes from 'prop-types';

const medicines = [
    { id: 1, name: "Aspirin", letter: "A", color: "bg-medical-500" },
    { id: 2, name: "Metformin", letter: "M", color: "bg-medical-600" },
    { id: 3, name: "Crocin", letter: "C", color: "bg-medical-500" },
    { id: 4, name: "Diprolene", letter: "D", color: "bg-medical-600" }
];

const doseData = {
    "2024-04-05": "taken",
    "2024-04-04": "missed",
    "2024-04-03": "pending",
    "2024-04-02": "selected"  // Add this line for April 2nd
};

export default function Monitor({ setActiveComponent }) {
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleMedicineClick = (medicine) => {
        setSelectedMedicine(medicine);
        setShowCalendar(true);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const getTileClassName = ({ date }) => {
        const dateStr = date.toISOString().split('T')[0];
        const status = doseData[dateStr];
        if (status === 'taken') return 'bg-green-200';
        if (status === 'missed') return 'bg-red-200';
        if (status === 'selected') return 'bg-sky-200';
        // Change the pending status to use sky-200 instead of yellow
        if (status === 'pending') return 'bg-sky-200';
        return '';
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Medicine Report</h1>
                    <p className="text-gray-500">Track your medication history</p>
                </div>
                <button
                    onClick={() => setActiveComponent('dashboard')}
                    className="flex items-center gap-2 px-4 py-2 border border-medical-100 rounded-lg text-sm font-medium text-medical-600 hover:bg-medical-50 transition-colors duration-200"
                >
                    <span>←</span> Back to Dashboard
                </button>
            </div>

            {/* Medicine Cards */}
            {!showCalendar && (
                <>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Your Medicine</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {medicines.map((medicine) => (
                            <div
                                key={medicine.id}
                                onClick={() => handleMedicineClick(medicine)}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer border border-gray-100"
                            >
                                <div className={`w-16 h-16 ${medicine.color} rounded-full flex items-center justify-center mb-4 mx-auto shadow-inner`}>
                                    <span className="text-2xl font-bold text-white">{medicine.letter}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-center text-gray-800">{medicine.name}</h3>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Calendar View */}
            {showCalendar && selectedMedicine && (
                <div className="space-y-4">
                    <button
                        onClick={() => setShowCalendar(false)}
                        className="flex items-center gap-2 text-medical-600 hover:text-medical-700 font-medium"
                    >
                        <span>←</span> Back to Medicines
                    </button>
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            {selectedMedicine.name} Dose History
                        </h2>
                        <Calendar
                            onChange={handleDateClick}
                            tileClassName={getTileClassName}
                            className="rounded-lg border-none shadow-sm"
                            minDetail="month"
                            prev2Label={null}
                            next2Label={null}
                        />
                        <div className="mt-4 flex gap-4 justify-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-200"></div>
                                <span>Taken</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-200"></div>
                                <span>Missed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-sky-200"></div>
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-sky-200"></div>
                                <span>Selected</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            {selectedMedicine.name} - {selectedDate.toDateString()}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-600">Status</span>
                                <span className="font-medium text-green-600">Taken</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <span className="text-gray-600">Time</span>
                                <span className="font-medium text-gray-800">8:00 AM</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-6 w-full bg-medical-600 text-white py-2.5 rounded-lg hover:bg-medical-700 transition-colors duration-200 font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

Monitor.propTypes = {
    setActiveComponent: PropTypes.func.isRequired
};