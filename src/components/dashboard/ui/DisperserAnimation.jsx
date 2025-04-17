import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

export default function DispenserAnimation() {
    const radius = 47;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Updates every minute

        return () => clearInterval(timer);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="flex items-center justify-center bg-white-100"> 
            <div className="relative w-32 h-44 bg-white shadow-lg rounded-xl p-3"> {/* Reduced from w-48 h-64 to w-32 h-44, rounded-2xl to rounded-xl, p-4 to p-3 */}
                {/* Blue Background */}
                <div className="absolute top-0 left-0 w-full h-3/5 bg-blue-500 rounded-t-xl"></div> {/* Changed rounded-t-2xl to rounded-t-xl */}

                {/* White Circle */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center"> {/* Reduced from w-28 h-28 to w-20 h-20, top-6 to top-4 */}
                    {/* Black Screen with Time */}
                    <div className="w-14 h-7 bg-black rounded-md flex items-center justify-center"> {/* Reduced from w-20 h-10 to w-14 h-7 */}
                        <span className="text-green-400 text-xs font-mono">{formattedTime}</span> {/* Changed text-sm to text-xs */}
                    </div>

                    {/* Animated Blue Capsule */}
                    <motion.div
                        className="absolute w-3.5 h-3.5 bg-blue-300 rounded-full"
                        initial={{ rotate: 0 }}
                        animate={{
                            rotate: 360
                        }}
                        style={{
                            transformOrigin: `${radius}px center`,
                            left: "50%",
                            marginLeft: `-${radius}px`,
                            top: "50%",
                            marginTop: "-6px"
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Button at the bottom */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-14 h-4 bg-gray-800 rounded-md"></div> {/* Reduced from w-20 h-6 to w-14 h-4, bottom-4 to bottom-3 */}
            </div>
        </div>
    );
}
