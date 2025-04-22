import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPills, FaCalendarAlt } from 'react-icons/fa';
import { database } from '../../firebase';
import { ref, set, onValue, push } from 'firebase/database';

// Add this utility function at the top of your file
const generateUniqueId = () => {
    return 'med_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const MedicineDoses = ({ onClose }) => {
    const initialMedicineState = {
        id: '',
        name: '',
        pills: '',
        hour: undefined,
        minute: undefined,
        fromDate: null,
        toDate: null,
        conditions: '',
        dispensed: false,
        lastDispensed: ''
    };

    const [medicines, setMedicines] = useState(Array(4).fill().map(() => ({ ...initialMedicineState })));

    // Load existing medicines from Firebase
    useEffect(() => {
        const medicinesRef = ref(database, 'medications');
        onValue(medicinesRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const medicineArray = Object.values(data);
                // Fill remaining slots with empty medicine states
                const filledMedicines = [
                    ...medicineArray,
                    ...Array(4 - medicineArray.length).fill().map(() => ({ ...initialMedicineState }))
                ].slice(0, 4);
                setMedicines(filledMedicines);
            }
        });
    }, []);

    const handleChange = (index, field, value) => {
        const updatedMedicines = [...medicines];
        if (field === 'time') {
            // Convert time string to hour and minute
            const timeValue = value.split(':');
            const hour = parseInt(timeValue[0], 10);
            const minute = parseInt(timeValue[1], 10);
            updatedMedicines[index] = {
                ...updatedMedicines[index],
                hour,
                minute
            };
        } else {
            updatedMedicines[index] = {
                ...updatedMedicines[index],
                [field]: value
            };
        }
        setMedicines(updatedMedicines);
    };

    // Update the handleSubmit function
    const handleSubmit = async () => {
        try {
            // Validate the form data
            const filledMedicines = medicines.filter(medicine =>
                medicine.name && medicine.pills && (medicine.hour !== undefined) && medicine.fromDate && medicine.toDate
            );

            if (filledMedicines.length === 0) {
                alert('Please fill in at least one medicine\'s details');
                return;
            }

            // Save each medicine to Firebase
            for (const medicine of filledMedicines) {
                const medicineId = generateUniqueId();
                const medicineData = {
                    id: medicineId,
                    name: medicine.name,
                    chamber: medicines.indexOf(medicine) + 1,
                    hour: medicine.hour,
                    minute: medicine.minute,
                    dispensed: false,
                    lastDispensed: '',
                    conditions: medicine.conditions || '',
                    // Fix the date formatting
                    fromDate: medicine.fromDate ? new Date(medicine.fromDate).toISOString() : null,
                    toDate: medicine.toDate ? new Date(medicine.toDate).toISOString() : null,
                    pills: parseInt(medicine.pills, 10)
                };

                // Save to Firebase using the generated ID
                const medicinesRef = ref(database, `medications/${medicineId}`);
                await set(medicinesRef, medicineData);
            }

            alert('Medicines saved successfully!');
            // Check if onClose exists before calling it
            if (typeof onClose === 'function') {
                onClose();
            }
        } catch (error) {
            console.error('Error saving medicines:', error);
            alert('Failed to save medicines. Please try again.');
        }
    };

    // Update the time input in render section
    const renderTimeInput = (medicine, index) => (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Time (24-hour format)
            </label>
            <input
                type="time"
                value={medicine.hour !== undefined ? 
                    `${medicine.hour.toString().padStart(2, '0')}:${medicine.minute.toString().padStart(2, '0')}` : 
                    ''}
                onChange={(e) => handleChange(index, 'time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                placeholder="Select time"
                step="900"
                pattern="[0-9]{2}:[0-9]{2}"
            />
            <span className="text-xs text-gray-500">
                Example: 13:00 for 1:00 PM, 08:00 for 8:00 AM
            </span>
        </div>
    );

    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <div className="space-y-6">
                <button
                    onClick={() => setActiveComponent('dashboard')}
                    className="absolute top-6 right-4 hover:opacity-80 transition-opacity"
                >
                    <span className="text-medical-800 font-bold text-3xl">
                        Dose<span className="text-medical-500">Buddy</span>
                    </span>
                </button>
                {/* Title Section */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-medical-800">Medicine Doses Setup</h2>
                </div>

                {/* Medicine Forms */}
                {medicines.map((medicine, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-md p-6 border border-medical-100"
                    >
                        <h2 className="text-xl font-semibold text-medical-700 mb-4 flex items-center">
                            <FaPills className="mr-2 text-medical-500" />
                            Medicine {index + 1}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name of Medicine */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name of Medicine
                                </label>
                                <input
                                    type="text"
                                    value={medicine.name}
                                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                    placeholder="Enter medicine name"
                                />
                            </div>

                            {/* Number of Pills */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Number of Pills
                                </label>
                                <input
                                    type="number"
                                    value={medicine.pills}
                                    onChange={(e) => handleChange(index, 'pills', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                    placeholder="Enter number of pills"
                                    min="1"
                                />
                            </div>

                            {/* Time */}
                            {renderTimeInput(medicine, index)}

                            {/* Duration */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration
                                </label>
                                <div className="flex items-center space-x-2">
                                    <div className="relative flex-1">
                                        <DatePicker
                                            selected={medicine.fromDate ? new Date(medicine.fromDate) : null}
                                            onChange={(date) => handleChange(index, 'fromDate', date)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                            placeholderText="From"
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <span className="text-gray-500">to</span>
                                    <div className="relative flex-1">
                                        <DatePicker
                                            selected={medicine.toDate ? new Date(medicine.toDate) : null}
                                            onChange={(date) => handleChange(index, 'toDate', date)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                            placeholderText="To"
                                            minDate={medicine.fromDate ? new Date(medicine.fromDate) : null}
                                            dateFormat="yyyy-MM-dd"
                                        />
                                        <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Special Conditions */}
                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Special Conditions
                                </label>
                                <textarea
                                    value={medicine.conditions}
                                    onChange={(e) => handleChange(index, 'conditions', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                    placeholder="Enter any special conditions"
                                    rows="2"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="sticky bottom-6 flex justify-end pt-6">
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 bg-gradient-to-r from-medical-500 to-medical-600 
                                 text-white font-medium rounded-lg shadow-md 
                                 hover:from-medical-600 hover:to-medical-700 
                                 focus:ring-4 focus:ring-medical-500/50 
                                 transition-all duration-200"
                    >
                        Save Medicine Doses
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MedicineDoses;