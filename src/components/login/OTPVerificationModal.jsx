import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const OTPVerificationModal = ({ onClose }) => {
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

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-medical-800">Verify OTP</h2>
        </div>

        <div className="space-y-4">
          <Input 
            type="text"
            placeholder="DB-XXXX"
            className="w-full text-center text-xl tracking
            -wider"
          />
          <Button className="w-full pill-button">
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};