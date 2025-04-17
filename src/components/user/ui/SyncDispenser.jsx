import React from 'react';
import { Wifi, BatteryFull, AlertTriangle } from 'lucide-react';
import { RefreshCw } from 'lucide-react';

const SyncDispenser = () => {
    const getProgressBarColor = (color) => {
        switch (color) {
            case 'blue':
                return 'bg-medical-500';
            case 'red':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const pills = {
        A: { name: 'Aspirin', current: 15, total: 30, color: 'blue' },
        B: { name: 'Metformin', current: 8, total: 30, color: 'blue' },
        C: { name: 'Atorvastatin', current: 4, total: 30, color: 'red' },
        D: { name: 'Diprolene', current: 3, total: 30, color: 'red' }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-3 max-w-xs"> {/* Changed p-4 to p-3 and max-w-md to max-w-xs */}
            {/* Header */}
            <div className="flex justify-between items-center mb-1"> {/* Reduced mb-2 to mb-1 */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">Bedroom Dispenser</h2> {/* Changed text-lg to text-sm */}
                </div>
                <div className="flex items-center space-x-1"> {/* Changed space-x-2 to space-x-1 */}
                    <div className="flex items-center text-[10px] text-gray-600"> {/* Changed text-xs to text-[10px] */}
                        <BatteryFull className="h-2.5 w-2.5" /> {/* Changed h-3 w-3 to h-2.5 w-2.5 */}
                        <span className="ml-0.5">78%</span> {/* Changed ml-1 to ml-0.5 */}
                    </div>
                    <div className="flex items-center text-[10px] text-gray-600">
                        <Wifi className="h-2.5 w-2.5" />
                        <span className="ml-0.5">92%</span>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="flex items-center text-xs text-gray-600 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                <span>Online</span>
                <span className="ml-1">• 10m ago</span>
            </div>

            {/* Pills Remaining */}
            <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Pills Remaining</h3>
                
                {['A', 'B', 'C', 'D'].map((compartment) => {
                    const pill = pills[compartment];
                    const percentage = (pill.current / pill.total) * 100;
                    const isLow = percentage <= 20;

                    return (
                        <div key={compartment} className="mb-1.5">
                            <div className="flex justify-between items-center text-xs text-gray-700 mt-4">
                                <span className="truncate">{`${compartment} (${pill.name})`}</span>
                                <span>{`${pill.current}/${pill.total}`}</span>
                            </div>
                            <div className="bg-gray-200 rounded-full h-1.5">
                                <div 
                                    className={`${getProgressBarColor(pill.color)} rounded-full h-1.5`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                            {isLow && (
                                <div className="flex items-center text-xs text-red-500 mt-0.5">
                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                    <span>Low</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Sync Button */}
            <button className="flex items-center justify-center w-full py-2 bg-white rounded-md shadow-sm hover:bg-medical-100 text-xs font-medium text-gray-700">
                <RefreshCw className="h-3 w-3 mr-1 text-gray-500" />
                Sync Dispenser
            </button>
        </div>
    );
};

export default SyncDispenser;