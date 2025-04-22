import { useState, useEffect } from "react";
import { FaBell, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { formatTimeFromDate } from '../../utils/timeUtils';

export default function Notification({ onClose }) {
    const [activeTab, setActiveTab] = useState("All");
    const [notifications, setNotifications] = useState([]);
    const [medications, setMedications] = useState({});
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        // Request notification permission properly
        const requestNotificationPermission = async () => {
            try {
                if ('Notification' in window) {
                    const permission = await window.Notification.requestPermission();
                    setPermissionGranted(permission === 'granted');
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            }
        };

        requestNotificationPermission();

        // Listen for medication updates
        const medicationsRef = ref(database, 'medications');
        const unsubscribe = onValue(medicationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const medicationsData = snapshot.val();
                setMedications(medicationsData);
                checkMedicationTimes(medicationsData);
            }
        });

        // Check medications every minute
        const intervalId = setInterval(() => {
            if (medications) {
                checkMedicationTimes(medications);
            }
        }, 60000);

        return () => {
            unsubscribe();
            clearInterval(intervalId);
        };
    }, []);

    const checkMedicationTimes = (medicationsData) => {
        if (!medicationsData) return;

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        Object.entries(medicationsData).forEach(([id, med]) => {
            // Check if it's time for medication
            if (med.hour === currentHour && med.minute === currentMinute && !med.dispensed) {
                sendMedicationNotification(med);
            }

            // Check for missed medications (past due)
            if (!med.dispensed && (
                med.hour < currentHour || 
                (med.hour === currentHour && med.minute < currentMinute)
            )) {
                sendMissedMedicationNotification(med);
            }
        });
    };

    const sendMedicationNotification = (medication) => {
        const notificationData = {
            id: Date.now(),
            type: "reminder",
            title: `Time to take ${medication.name}`,
            message: `Your medication in Chamber ${medication.chamber} is due now`,
            icon: <FaBell className="text-blue-500" />,
            time: formatTimeFromDate(new Date()),
            bg: "bg-blue-100"
        };

        // Browser notification
        if (permissionGranted) {
            try {
                new window.Notification(notificationData.title, {
                    body: notificationData.message,
                    icon: '/favicon.ico',
                    requireInteraction: true,
                    tag: `med-${medication.chamber}`
                });
            } catch (error) {
                console.error('Error showing notification:', error);
            }
        }

        // Update notifications state
        setNotifications(prev => [notificationData, ...prev]);
    };

    const sendMissedMedicationNotification = (medication) => {
        const notificationData = {
            id: Date.now(),
            type: "warning",
            title: `Missed medication: ${medication.name}`,
            message: `You missed your medication scheduled for ${medication.hour}:${medication.minute.toString().padStart(2, '0')}`,
            icon: <FaExclamationTriangle className="text-orange-500" />,
            time: formatTimeFromDate(new Date()),
            bg: "bg-orange-100"
        };

        if (Notification.permission === 'granted') {
            new Notification(notificationData.title, {
                body: notificationData.message,
                icon: '/favicon.ico',
                requireInteraction: true
            });
        }

        setNotifications(prev => [notificationData, ...prev]);
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    const filteredNotifications =
        activeTab === "All"
            ? notifications
            : notifications.filter((n) => n.type === activeTab.toLowerCase());

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
            <button
                onClick={() => setActiveComponent('dashboard')}
                className="absolute top-3 right-4 hover:opacity-80 transition-opacity"
            >
                <span className="text-medical-800 font-bold text-3xl">
                    Dose<span className="text-medical-500">Buddy</span>
                </span>
            </button>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Notifications</h2>
                    <p className="text-gray-500 text-sm">
                        Stay updated on medication alerts and system status
                    </p>
                </div>
                <div className="flex space-x-2">
                    <button 
                        className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100"
                        onClick={markAllAsRead}
                    >
                        Mark All as Read
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                {["All", "Reminders", "System"].map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 text-sm rounded-md ${activeTab === tab
                                ? "bg-blue-100 text-blue-600"
                                : "hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Recent Notifications */}
            <h3 className="text-lg font-semibold mb-2">Recent Notifications</h3>
            <div className="space-y-3">
                {filteredNotifications.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No notifications</p>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-start p-3 rounded-md ${notification.bg} ${
                                notification.read ? 'opacity-60' : ''
                            }`}
                        >
                            <div className="text-lg">{notification.icon}</div>
                            <div className="ml-3">
                                <p className="font-semibold">{notification.title}</p>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                            <div className="ml-auto text-sm text-gray-500">{notification.time}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
