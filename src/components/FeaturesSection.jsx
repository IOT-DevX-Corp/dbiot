
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Bell, Monitor, Check, User, Info, Clock, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const coreFeatures = [
  {
    id: 1,
    title: 'Automated Dispensing',
    description: 'Precisely timed medication release ensuring the right pill at the right time.',
    icon: <Clock className="h-8 w-8 text-medical-500" />
  },
  {
    id: 2,
    title: 'LED and Voice Alerts',
    description: 'Visual and vocal reminders with color-coded LED indicators and Speakers for different medication events.',
    icon: <Bell className="h-8 w-8 text-medical-500" />
  },
  {
    id: 3,
    title: 'App Control',
    description: 'User-friendly mobile app for setting schedules and monitoring medication adherence.',
    icon: <Monitor className="h-8 w-8 text-medical-500" />
  },
  {
    id: 4,
    title: 'Missed Dose Notifications',
    description: 'Immediate alerts for patients and caregivers if a scheduled dose is missed.',
    icon: <Info className="h-8 w-8 text-medical-500" />
  }
];

const advancedFeatures = [
  {
    id: 1,
    title: 'AI-Based Alerts',
    description: 'Machine learning algorithms that adapt to user behavior and provide smarter notifications.',
    icon: <Bell className="h-8 w-8 text-white" />,
    color: 'bg-medical-500'
  },
  {
    id: 2,
    title: 'Emergency SOS',
    description: 'One-touch emergency contact feature that alerts predefined contacts in case of emergency.',
    icon: <Bell className="h-8 w-8 text-white" />,
    color: 'bg-red-500'
  },
  {
    id: 3,
    title: 'Smart Assistant Integration',
    description: 'Voice command capabilities through Google Assistant, Amazon Alexa, and Apple Siri.',
    icon: <User className="h-8 w-8 text-white" />,
    color: 'bg-blue-500'
  },
  {
    id: 4,
    title: 'Biometric Security',
    description: 'Fingerprint or facial recognition ensures only authorized access to medication.',
    icon: <User className="h-8 w-8 text-white" />,
    color: 'bg-green-500'
  },
  {
    id: 5,
    title: 'Health Monitoring',
    description: 'Optional vitals monitoring with data synchronization to healthcare providers.',
    icon: <Monitor className="h-8 w-8 text-white" />,
    color: 'bg-purple-500'
  }
];

const FeatureCard = ({ feature, isAdvanced = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "feature-card overflow-hidden group",
        isAdvanced && "relative border-t-4 hover:border-t-4",
        isAdvanced && `border-t-${feature.color.split('-')[1]}`
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          {isAdvanced ? (
            <div className={cn(
              feature.color,
              "rounded-full p-4 mb-4 group-hover:scale-110 transition-transform",
            )}>
              {feature.icon}
            </div>
          ) : (
            <div className="bg-medical-100 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          
          <p className={cn(
            "text-gray-600 transition-all duration-300",
            isHovered ? "opacity-100" : isAdvanced ? "opacity-0 h-0" : "opacity-100"
          )}>
            {feature.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="h2 mb-4 text-gray-900">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our smart pill dispenser combines essential medication management with
            next-generation technology to provide comprehensive care.
          </p>
        </div>
        
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Next-Level Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedFeatures.map(feature => (
              <FeatureCard key={feature.id} feature={feature} isAdvanced={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
