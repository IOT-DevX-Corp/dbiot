import { useState, useEffect } from "react";
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";
import { database } from '../../firebase';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { setupNotifications, sendNotification } from '../../services/notificationService';

export default function Notification({ onClose }) {
    const [activeTab, setActiveTab] = useState("All");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setupNotifications();

        // Request notification permission
        if ('Notification' in window) {
            Notification.requestPermission();
        }

        // Reference to medications and dispenser
        const medicationsRef = ref(database, 'medications');
        const dispenserRef = ref(database, 'pillDispenser');

        // Listen for medication changes
        const medicationUnsubscribe = onValue(medicationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const medicationsData = snapshot.val();
                Object.entries(medicationsData).forEach(([key, med]) => {
                    // Check if medication time is now
                    const now = new Date();
                    if (med.hour === now.getHours() && med.minute === now.getMinutes()) {
                        createNotification({
                            id: key,
                            type: "reminder",
                            icon: <FaBell className="text-blue-500" />,
                            title: `Time to take ${med.name}`,
                            message: `Your ${med.hour}:${med.minute.toString().padStart(2, '0')} dose is ready`,
                            time: `${med.hour}:${med.minute.toString().padStart(2, '0')} • Today`,
                            bg: "bg-blue-100",
                        });
                    }
                });
            }
        });

        // Listen for dispenser status
        const dispenserUnsubscribe = onValue(dispenserRef, (snapshot) => {
            if (snapshot.exists()) {
                const dispenserData = snapshot.val();
                // Check dispenser status
                if (!dispenserData.isOnline) {
                    createNotification({
                        type: "system",
                        icon: <FaExclamationTriangle className="text-orange-500" />,
                        title: "Dispenser Offline",
                        message: "Your dispenser is currently offline",
                        time: new Date().toLocaleTimeString(),
                        bg: "bg-orange-100",
                    });
                }
                // Check last dispense status
                if (dispenserData.lastDispenseTime && !dispenserData.lastDispenseSuccessful) {
                    createNotification({
                        type: "system",
                        icon: <FaExclamationTriangle className="text-red-500" />,
                        title: "Dispense Failed",
                        message: `Last dispense attempt at ${dispenserData.lastDispenseTime} failed`,
                        time: dispenserData.lastDispenseTime,
                        bg: "bg-red-100",
                    });
                }
            }
        });

        setLoading(false);

        return () => {
            medicationUnsubscribe();
            dispenserUnsubscribe();
        };
    }, []);

    const createNotification = async (notificationData) => {
        // Add to notifications state
        setNotifications(prev => [
            { ...notificationData, id: Date.now() },
            ...prev
        ]);

        // Send browser notification
        await sendNotification(notificationData.title, {
            body: notificationData.message,
            icon: '/favicon.ico'
        });
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

    if (loading) {
        return <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600"></div>
        </div>;
    }

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
