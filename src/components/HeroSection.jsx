import React from 'react';
import { Button } from "@/components/ui/button";
import {Bell, Clock, UserCheck } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-26 mt-5 section-padding bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="h1 text-gray-900">
              <span className="text-medical-900 font-bold">Never miss<span className="text-sky-blue-900"> a </span><span className="text-medical-500">dose again</span></span>
            </h1>
            <h2 className="text-2xl font-medium text-gray-600">
              Smart, Secure, Automated.
            </h2>
            <p className="text-gray-600 text-lg max-w-md">
              The DoseBuddy revolutionizes medication management with intelligent dispensing, 
              real-time notifications, and caregiver monitoring to ensure perfect medication adherence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button className="pill-button">
                Get Started
              </Button>
              <Button 
                variant="outline" 
                className="rounded-full border-medical-300 text-medical-600"
                onClick={() => {
                  document.getElementById('how-it-works').scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
              >
                See How It Works
              </Button>
            </div>
            
            {/* Quick Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-medical-500" />
                </div>
                <span className="text-gray-700">Automated Dispensing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-medical-500" />
                </div>
                <span className="text-gray-700">Real-Time Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <UserCheck className="h-5 w-5 text-medical-500" />
                </div>
                <span className="text-gray-700">Remote Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-medical-100 p-2 rounded-full">
                  <Bell className="h-5 w-5 text-medical-500" />
                </div>
                <span className="text-gray-700">AI-Based Smart Alerts</span>
              </div>
            </div>
          </div>
          
          <div className="relative flex justify-center items-center lg:justify-end h-full sticky top-24 self-start">
            <div className="w-full max-w-md transform transition-all duration-300 ease-in-out">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-medical-100 to-blue-50 shadow-lg flex items-center justify-center p-8">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-xl transform rotate-3 border-2 border-medical-200"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-xl transform -rotate-3 border-2 border-medical-300">
                      <div className="w-full h-full flex flex-col items-center justify-center p-4">
                        <div className="w-full rounded-md bg-medical-100 h-8 mb-3"></div>
                        <div className="grid grid-cols-2 gap-2 w-full">
                          <div className="h-8 rounded-md bg-medical-200"></div>
                          <div className="h-8 rounded-md bg-medical-200"></div>
                          <div className="h-8 rounded-md bg-medical-200"></div>
                          <div className="h-8 rounded-md bg-medical-200"></div>
                        </div>
                        <div className="mt-auto w-full h-10 rounded-md bg-medical-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-white rounded-full shadow-lg h-16 w-16 flex items-center justify-center animate-pulse-light">
                <Bell className="h-8 w-8 text-medical-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
