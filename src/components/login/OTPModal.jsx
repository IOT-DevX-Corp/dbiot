import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const OTPModal = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-medical-800">
            <span className="text-medical-800 font-bold">Dose<span className="text-medical-500">Buddy</span></span>
          </h2>
          <h3 className="text-m text-gray-400 mt-2">Welcome Back!</h3>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input 
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10"
            />
          </div>

          <Button 
            className="w-full pill-button"
            disabled={!email.includes('@')}
          >
            Get OTP via Email
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                OR LOGIN WITH EMAIL/USERNAME
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={onSwitchToLogin}
          >
            Login with Email/Username
          </Button>
        </div>
      </div>
    </div>
  );
};