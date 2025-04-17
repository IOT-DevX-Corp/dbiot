import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPills, FaCalendarAlt } from 'react-icons/fa';

export const MedicineDoses = ({ onClose }) => {
    const initialMedicineState = {
        name: '',
        pills: '',
        doses: '',
        fromDate: null,
        toDate: null,
        conditions: ''
    };

    const [medicines, setMedicines] = useState(Array(6).fill().map(() => ({ ...initialMedicineState })));

    const handleChange = (index, field, value) => {
        const updatedMedicines = [...medicines];
        updatedMedicines[index] = {
            ...updatedMedicines[index],
            [field]: value
        };
        setMedicines(updatedMedicines);
    };

    const handleSubmit = () => {
        // Validate the form data
        const hasData = medicines.some(medicine =>
            medicine.name || medicine.pills || medicine.doses || medicine.fromDate || medicine.toDate
        );

        if (!hasData) {
            alert('Please fill in at least one medicine\'s details');
            return;
        }

        // Filter out empty medicine entries
        const filledMedicines = medicines.filter(medicine =>
            medicine.name && medicine.pills && medicine.doses && medicine.fromDate && medicine.toDate
        );

        // TODO: Handle the submission logic here
        console.log('Submitting medicines:', filledMedicines);

        // Close the form after successful submission
        onClose();
    };

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

                            {/* Number of Doses */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Number of Doses
                                </label>
                                <input
                                    type="number"
                                    value={medicine.doses}
                                    onChange={(e) => handleChange(index, 'doses', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                    placeholder="Enter number of doses"
                                    min="1"
                                />
                            </div>

                            {/* Duration */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration
                                </label>
                                <div className="flex items-center space-x-2">
                                    <div className="relative flex-1">
                                        <DatePicker
                                            selected={medicine.fromDate}
                                            onChange={(date) => handleChange(index, 'fromDate', date)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                            placeholderText="From"
                                        />
                                        <FaCalendarAlt className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                    <span className="text-gray-500">to</span>
                                    <div className="relative flex-1">
                                        <DatePicker
                                            selected={medicine.toDate}
                                            onChange={(date) => handleChange(index, 'toDate', date)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                            placeholderText="To"
                                            minDate={medicine.fromDate}
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