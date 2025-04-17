import React from 'react';
import { FaCalendarAlt, FaClock} from 'react-icons/fa';

const WeeklySchedule = () => {
    // Sample data structure for the weekly schedule
    const weeklySchedule = [
        {
            day: 'Monday',
            date: 'April 8, 2024',
            medicines: [
                { time: '08:00 AM', name: 'Aspirin', dosage: '10mg - 1 pill' },
                { time: '02:00 PM', name: 'Vitamin C', dosage: '500mg - 2 pills' },
            ]
        },
        {
            day: 'Tuesday',
            date: 'April 9, 2024',
            medicines: [
                { time: '09:00 AM', name: 'Ibuprofen', dosage: '20mg - 1 pill' },
                { time: '03:00 PM', name: 'Calcium', dosage: '600mg - 1 pill' },
            ]
        },
        // Add more days as needed
    ];

    return (
        <div className="min-h-[calc(100vh-theme(spacing.14))] bg-gray-50">
            <button
                onClick={() => setActiveComponent('dashboard')}
                className="absolute top-6 right-4 hover:opacity-80 transition-opacity"
            >
                <span className="text-medical-800 font-bold text-3xl">
                    Dose<span className="text-medical-500">Buddy</span>
                </span>
            </button>
            {/* Header */}
            <div className="bg-white border-b px-6 py-4">
                <div className="flex items-center space-x-3">
                    <FaCalendarAlt className="text-2xl text-medical-600" />
                    <h1 className="text-2xl font-bold text-medical-800">Weekly Schedule</h1>
                </div>
            </div>

            {/* Schedule Content */}
            <div className="p-6 space-y-6 overflow-auto max-h-[calc(100vh-10rem)]">
                {weeklySchedule.map((day, dayIndex) => (
                    <div key={dayIndex} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">{day.day}</h2>
                            <span className="text-sm text-gray-500">{day.date}</span>
                        </div>

                        {/* Timeline */}
                        <div className="relative pl-8">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-medical-100"></div>
                            
                            {day.medicines.map((medicine, medIndex) => (
                                <div key={medIndex} className="relative mb-6 last:mb-0">
                                    {/* Timeline dot */}
                                    <div className="absolute -left-8 w-4 h-4 rounded-full bg-medical-500 border-2 border-white"></div>
                                    
                                    {/* Medicine details */}
                                    <div className="bg-gray-50 rounded-lg p-4 ml-4">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <FaClock className="text-medical-500" />
                                                    <span className="text-sm font-medium text-medical-600">
                                                        {medicine.time}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-gray-800">{medicine.name}</h3>
                                                <p className="text-sm text-gray-500">{medicine.dosage}</p>
                                            </div>
                                            
                                            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                                                Scheduled
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklySchedule;