import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPills, FaCalendarAlt } from 'react-icons/fa';

export const MedicineDoses = ({ onClose }) => {
    const initialMedicineState = {
        id: '',
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
                <h2 className="text-2xl font-bold text-medical-800">Manage Medications</h2>

                {/* Add Medication Form */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-medical-100">
                    <h3 className="text-xl font-semibold text-medical-700 mb-4">Add Medication</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={newMedicine.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                placeholder="Enter medicine name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Next Available Chamber</label>
                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
                                {availableChambers.length > 0 ? availableChambers[0] : 'No available chambers'}
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
                    <button
                        onClick={handleAddMedication}
                        className="mt-4 px-6 py-2 bg-medical-500 text-white rounded-md hover:bg-medical-600"
                    >
                        Add Medication
                    </button>
                </div>

                {/* List of Medications */}
                <div className="space-y-4">
                    {medicines.map((medicine) => (
                        <div
                            key={medicine.id}
                            className="bg-white rounded-lg shadow-md p-6 border border-medical-100 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-medical-700">{medicine.name}</h3>
                                <p className="text-sm text-gray-500">
                                    Chamber: {medicine.chamber}, Time: {medicine.hour}:{medicine.minute}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeleteMedication(medicine.id)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MedicineDoses;