import React from 'react';
import { Clock, Bell, User, Check, Monitor } from 'lucide-react';

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

const MachineTutorial = () => {
  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="h2 mb-4 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our smart pill dispenser makes medication management simple and error-free.
            Follow these easy steps to ensure you never miss a dose again.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className={`relative ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}`}>
                <div className="step-card hover:shadow-md transition-shadow group">
                  <div className="flex items-start gap-4">
                    <div className={`${step.color} rounded-full p-3 flex-shrink-0 group-hover:scale-110 transition-transform`}>
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
                  
                  {/* Step visual */}
                  <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <div className="aspect-video rounded-md bg-gradient-to-br from-gray-100 to-white flex items-center justify-center border border-gray-200">
                      <div className="text-gray-400 text-sm">[Step {step.id} Illustration]</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachineTutorial;
