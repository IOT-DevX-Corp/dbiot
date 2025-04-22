import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { FaTachometerAlt, FaPills, FaVideo, FaUsers, FaChevronDown, FaPlus, FaCalendarAlt, FaBell, FaSignOutAlt} from "react-icons/fa";

const Sidebar = ({ setActiveComponent, activeComponent }) => {
    const [isMembersOpen, setIsMembersOpen] = useState(false);
    const [userData, setUserData] = useState({
        username: 'Sung Jinwoo',
        email: 'solo@leveling.com'
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Future: fetch user profile here
    }, [navigate]);

    const buttonClass = "flex items-center gap-2 px-4 py-2.5 w-full rounded-lg transition-all duration-200 font-medium";

    // This function handles the active state styling
    const getButtonClass = (key) => {
        return `${buttonClass} ${activeComponent === key
                ? "bg-medical-50 text-medical-600 shadow-sm border border-medical-100 mt-2"
                : "text-gray-700 hover:text-medical-600 hover:bg-medical-50 hover:shadow-sm mt-2"
            }`;
    };

    const handleLogout = () => {
        // Add any logout logic here (clear session, cookies, etc.)
        navigate('/');
    };

    return (
        <div className="w-64 bg-gradient-to-b from-white to-gray-50 shadow-xl p-4 overflow-y-auto">
            {/* Profile Section */}
            <div className="flex flex-col items-center pb-6 border-b border-gray-200">
                <div className="w-20 h-20 rounded-full mb-3 bg-gradient-to-br from-medical-400 to-medical-600 flex items-center justify-center shadow-lg ring-2 ring-medical-200">
                    <span className="text-2xl font-bold text-white">
                        {userData?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                {/* Add username and email */}
                <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-800">
                        {userData.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {userData.email}
                    </p>
                </div>
                {/* Add logout button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-6 space-y-2">
                <button
                    onClick={() => setActiveComponent("dashboard")}
                    className={`${getButtonClass("dashboard")}`}
                >
                    <FaTachometerAlt className={activeComponent === "dashboard" ? "text-medical-600" : "text-medical-500"} />
                    Dashboard
                </button>

                <button
                    onClick={() => setActiveComponent("medicine-doses")}
                    className={getButtonClass("medicine-doses")}
                >
                    <FaPills className={activeComponent === "medicine-doses" ? "text-medical-600" : "text-medical-500"} />
                    Medicine Doses
                </button>


                <button
                    onClick={() => setActiveComponent("schedule")}
                    className={getButtonClass("schedule")}
                >
                    <FaCalendarAlt className={activeComponent === "schedule" ? "text-medical-600" : "text-medical-500"} />
                    Schedule
                </button>

                {/* Members Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsMembersOpen(!isMembersOpen)}
                        className={`${buttonClass} justify-between ${isMembersOpen
                                ? "bg-medical-50 text-medical-600 shadow-sm border border-medical-100"
                                : "text-gray-700 hover:text-medical-600 hover:bg-medical-50 hover:shadow-sm"
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <FaUsers className={isMembersOpen ? "text-medical-600" : "text-medical-500"} />
                            Members
                        </div>
                        <FaChevronDown
                            className={`transition-transform duration-200 ${isMembersOpen ? "rotate-180 text-medical-600" : "text-medical-500"
                                }`}
                        />
                    </button>

                    {isMembersOpen && (
                        <div className="mt-1 pl-4 space-y-1">
                            <button
                                onClick={() => setActiveComponent("member-mama")}
                                className={getButtonClass("member-mama")}
                            >
                                <FaUsers className={activeComponent === "member-mama" ? "text-medical-600" : "text-medical-500"} />
                                Mama Pizza
                            </button>
                            <button
                                onClick={() => setActiveComponent("member-sister")}
                                className={getButtonClass("member-sister")}
                            >
                                <FaUsers className={activeComponent === "member-sister" ? "text-medical-600" : "text-medical-500"} />
                                Sister Spaghetti
                            </button>
                            <button
                                onClick={() => setActiveComponent("add-member")}
                                className={getButtonClass("add-member")}
                            >
                                <FaPlus className={activeComponent === "add-member" ? "text-medical-600" : "text-medical-500"} />
                                Add a Member
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => setActiveComponent("notifications")}
                        className={getButtonClass("notifications")}
                    >
                        <FaBell className={activeComponent === "notifications" ? "text-medical-600" : "text-medical-500"} />
                        Notifications
                    </button>

                    <button
                        onClick={() => setActiveComponent("machine-tutorial")}
                        className={getButtonClass("machine-tutorial")}
                    >
                        <FaVideo className={activeComponent === "machine-tutorial" ? "text-medical-600" : "text-medical-500"} />
                        Machine Tutorial
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
