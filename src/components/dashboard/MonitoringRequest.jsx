import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser, FaEnvelope, FaMicrochip } from "react-icons/fa";

export default function MonitoringRequest ({ onClose }){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        modelNumber: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.username || !formData.email) {
            setError('Username and email are required');
            return;
        }

        try {
            const sender = JSON.parse(localStorage.getItem('user'));
            const response = await fetch('/api/monitoring/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetUsername: formData.username,
                    targetEmail: formData.email,
                    modelNumber: formData.modelNumber,
                    senderUsername: sender.username,
                    senderEmail: sender.email
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Request sent successfully!');
                setTimeout(() => {
                    onClose();
                }, 2000);
            } else {
                setError(data.message || 'Failed to send request');
            }
        } catch (err) {
            setError('Failed to send request');
        }
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.14))] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-6">

                <h2 className="text-2xl font-bold text-center text-medical-800 mb-6">
                    Add a Member
                </h2>

                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                {success && (
                    <p className="text-green-500 text-center mb-4">{success}</p>
                )}

                <div className="space-y-4">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                            type="text"
                            name="username"
                            placeholder="Username *"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-10"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email *"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-10"
                            required
                            aria-required="true"
                        />
                    </div>

                    <div className="relative">
                        <FaMicrochip className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                            type="text"
                            name="modelNumber"
                            placeholder="DoseBuddy Model Number (Optional)"
                            value={formData.modelNumber}
                            onChange={handleChange}
                            className="w-full pl-10"
                        />
                    </div>

                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-medical-600 hover:bg-medical-700 text-white"
                        disabled={!formData.username || !formData.email}
                    >
                        Request Monitoring
                    </Button>
                </div>
            </div>
        </div>
    );
};