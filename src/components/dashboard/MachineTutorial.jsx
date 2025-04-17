import React from 'react';
import { Clock, Bell, User, Check, Monitor} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Load Pills',
    description: 'Patient or caregiver loads medicine into the dispenser.',
    icon: <User className="h-8 w-8 text-white" />,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Set Schedule',
    description: 'Set reminders via the app or voice commands.',
    icon: <Clock className="h-8 w-8 text-white" />,
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Get Alerts',
    description: 'Receive LED, sound, or app notifications.',
    icon: <Bell className="h-8 w-8 text-white" />,
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    title: 'Take the Pill',
    description: 'Dispenser auto-releases the correct dose.',
    icon: <Check className="h-8 w-8 text-white" />,
    color: 'bg-medical-500'
  },
  {
    id: 5,
    title: 'Remote Monitoring',
    description: 'Caregivers track and receive alerts through the app.',
    icon: <Monitor className="h-8 w-8 text-white" />,
    color: 'bg-purple-500'
  }
];

const MachineTutorial = ({ onClose }) => {
  return (
    <div className="p-6">
      <button
        onClick={() => setActiveComponent('dashboard')}
        className="absolute top-6 right-4 hover:opacity-80 transition-opacity"
      >
        <span className="text-medical-800 font-bold text-3xl">
          Dose<span className="text-medical-500">Buddy</span>
        </span>
      </button>
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-medical-800">Machine Tutorial</h2>
              </div>
      
      {/* Tutorial Content */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our smart pill dispenser makes medication management simple and error-free.
            Follow these easy steps to ensure you never miss a dose again.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`${step.color} rounded-full p-3 flex-shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center">
                    <span className={`${step.color} text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2`}>
                      {step.id}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="aspect-video rounded-md bg-gradient-to-br from-gray-100 to-white flex items-center justify-center border border-gray-200">
                  <div className="text-gray-400 text-sm">Step {step.id} Illustration</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MachineTutorial;
