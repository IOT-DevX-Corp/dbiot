import React from 'react';
import { FaQrcode, FaUserPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const NotConnected = ({ setActiveComponent }) => {
    return (
        <div className="ml-50 mt-6 min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
            {/* Logo Button */}
            <button 
                onClick={() => setActiveComponent('dashboard')} 
                className="absolute top-[-25px] right-4 hover:opacity-80 transition-opacity"
            >
                <span className="text-medical-800 font-bold text-3xl">
                    Dose<span className="text-medical-500">Buddy</span>
                </span>
            </button>

            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Icon Container */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-medical-400 to-medical-600 rounded-full flex items-center justify-center">
                        <FaQrcode className="text-white w-12 h-12" />
                    </div>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-bold text-medical-800">
                    Not Connected
                </h1>

                {/* Primary Message */}
                <div className="space-y-4">
                    <p className="text-xl text-gray-600">
                        Looks like you have not yet connected with your DoseBuddy
                    </p>
                    <p className="text-lg text-gray-500">
                      <a href='https://www.google.com' className='text-medical-500' target='_'> Download the app </a> and scan the QR code of the machine to connect
                    </p>

                    <p className="text-lg text-gray-500">
                    If you have not bought the device yet, <a href='https://www.google.com' className='text-medical-500' target='_'>Buy it from here</a> and scan the QR and Login!
                    </p>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center">
                    <div className="w-16 h-1 bg-medical-200 rounded-full"></div>
                </div>

                {/* Secondary Message */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-medical-100">
                    <div className="flex items-center justify-center mb-4">
                        <FaUserPlus className="text-medical-500 w-6 h-6 mr-2" />
                        <span className="text-lg font-medium text-gray-700">
                            Here to monitor someone?
                        </span>
                    </div>
                    <p className="text-gray-600">
                        Click the <span className="font-semibold text-medical-600">Members</span> button and then 
                        <span className="font-semibold text-medical-600"> Add a Member</span> to start monitoring
                    </p>
                </div>
            </div>
        </div>
    );
};

NotConnected.propTypes = {
    setActiveComponent: PropTypes.func.isRequired
};

export default NotConnected;