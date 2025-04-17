import { useState } from "react";
import { FaBell, FaCheckCircle, FaExclamationTriangle, FaSyncAlt } from "react-icons/fa";

export default function Notification({ onClose }) {
    const [activeTab, setActiveTab] = useState("All");

    const notifications = [
        {
            id: 1,
            type: "reminder",
            icon: <FaBell className="text-blue-500" />,
            title: "Time to take Aspirin",
            message: "Your 8:00 AM dose is ready",
            time: "8:00 AM • Today",
            bg: "bg-blue-100",
        },
        {
            id: 2,
            type: "reminder",
            icon: <FaCheckCircle className="text-green-500" />,
            title: "Medication taken",
            message: "Metformin 500mg was dispensed and taken",
            time: "1:00 PM • Yesterday",
            bg: "",
        },
        {
            id: 3,
            type: "reminder",
            icon: <FaExclamationTriangle className="text-orange-500" />,
            title: "Missed medication",
            message: "You missed your Atorvastatin dose",
            time: "9:00 PM • Yesterday",
            bg: "",
        },
        {
            id: 4,
            type: "system",
            icon: <FaSyncAlt className="text-purple-500" />,
            title: "Time to refill",
            message: "Atorvastatin is running low (4 pills remaining)",
            time: "10:30 AM • May 9",
            bg: "",
        },
        {
            id: 5,
            type: "system",
            icon: <FaSyncAlt className="text-gray-500" />,
            title: "Dispenser synced",
            message: "Your dispenser successfully synced",
            time: "4:15 PM • May 8",
            bg: "",
        },
    ];

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
                    <button className="border px-4 py-2 text-sm rounded-md hover:bg-gray-100">
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
                {filteredNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex items-start p-3 rounded-md ${notification.bg}`}
                    >
                        <div className="text-lg">{notification.icon}</div>
                        <div className="ml-3">
                            <p className="font-semibold">{notification.title}</p>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                        <div className="ml-auto text-sm text-gray-500">{notification.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
