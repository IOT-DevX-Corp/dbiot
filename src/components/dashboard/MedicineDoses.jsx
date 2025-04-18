import React, { useState, useEffect } from 'react';
import { database } from '../../firebase'; // Import Firebase database
import { ref, push, remove, onValue } from 'firebase/database'; // Firebase methods

export const MedicineDoses = ({ onClose }) => {
    const initialMedicineState = {
        name: '',
        hour: '',
        minute: '',
    };

    const [medicines, setMedicines] = useState([]);
    const [newMedicine, setNewMedicine] = useState({ ...initialMedicineState });
    const [availableChambers, setAvailableChambers] = useState([1, 2, 3, 4]);

    // Fetch medications from Firebase in real-time
    useEffect(() => {
        const medicationsRef = ref(database, 'medications');
        const unsubscribe = onValue(medicationsRef, (snapshot) => {
            const data = snapshot.val();
            const medications = data
                ? Object.entries(data).map(([id, med]) => ({ id, ...med }))
                : [];
            setMedicines(medications);
            
            // Calculate available chambers
            const usedChambers = medications.map(med => med.chamber);
            const available = [1, 2, 3, 4].filter(num => !usedChambers.includes(num));
            setAvailableChambers(available);
        });

        return () => unsubscribe();
    }, []);

    // Handle input changes for new medication
    const handleInputChange = (field, value) => {
        setNewMedicine((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Add a new medication to Firebase
    const handleAddMedication = () => {
        if (!newMedicine.name || !newMedicine.hour || !newMedicine.minute) {
            alert('Please fill in all fields');
            return;
        }

        if (availableChambers.length === 0) {
            alert('All chambers are occupied. Please delete a medication first.');
            return;
        }

        // Automatically assign the next available chamber
        const nextChamber = Math.min(...availableChambers);

        const medicationsRef = ref(database, 'medications');
        push(medicationsRef, {
            ...newMedicine,
            chamber: nextChamber,
            dispensed: false,
            lastDispensed: '',
        });

        setNewMedicine({ ...initialMedicineState }); // Reset form
    };

    // Delete a medication from Firebase
    const handleDeleteMedication = (id) => {
        const medicationRef = ref(database, `medications/${id}`);
        remove(medicationRef)
            .then(() => alert('Medication deleted successfully'))
            .catch((error) => console.error('Error deleting medication:', error));
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
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Hour</label>
                            <input
                                type="number"
                                value={newMedicine.hour}
                                onChange={(e) => handleInputChange('hour', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                placeholder="Enter hour (0-23)"
                                min="0"
                                max="23"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Minute</label>
                            <input
                                type="number"
                                value={newMedicine.minute}
                                onChange={(e) => handleInputChange('minute', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-medical-500 focus:border-medical-500"
                                placeholder="Enter minute (0-59)"
                                min="0"
                                max="59"
                            />
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