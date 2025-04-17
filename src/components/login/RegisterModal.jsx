import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUser, 
  faEnvelope, 
  faPhone, 
  faLock, 
  faEye, 
  faEyeSlash 
} from "@fortawesome/free-solid-svg-icons";

export const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-1 sm:p-0 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-sm relative p-2 sm:p-4 my-1 sm:my-0 flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>
        
        <div className="text-center mb-3 sm:mb-6 mt-1 sm:mt-2">
          <span className="text-base sm:text-xl font-bold">
            <span className="text-medical-800">Dose<span className="text-medical-500">Buddy</span></span>
          </span>
          <h3 className="text-xs text-gray-400 mt-0.5 sm:mt-1">Welcome!</h3>
          <h3 className="text-sm sm:text-lg font-bold text-medical-800 mt-0.5 sm:mt-1">Create Account</h3>
        </div>

        <div className="space-y-2 sm:space-y-3 flex-1">
          <div className="relative">
            <FontAwesomeIcon 
              icon={faUser} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type="text"
              name="firstName"
              placeholder="First Name" 
              className="w-full pl-7 sm:pl-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faUser} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type="text"
              name="lastName"
              placeholder="Last Name" 
              className="w-full pl-7 sm:pl-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type="email"
              name="email"
              placeholder="Email" 
              className="w-full pl-7 sm:pl-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faPhone} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type="tel"
              name="mobile"
              placeholder="Mobile Number" 
              className="w-full pl-7 sm:pl-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faLock} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password" 
              className="w-full pl-7 sm:pl-8 pr-7 sm:pr-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-xs sm:text-sm" />
            </button>
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faLock} 
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm"
            />
            <Input 
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password" 
              className="w-full pl-7 sm:pl-8 pr-7 sm:pr-8 h-8 sm:h-10 text-xs sm:text-sm"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} className="text-xs sm:text-sm" />
            </button>
          </div>
          
          <Button className="w-full pill-button h-8 sm:h-10 text-xs sm:text-sm font-medium mt-1">
            Register and Verify
          </Button>

          <p className="text-center text-gray-600 text-xs sm:text-sm py-0.5 sm:py-1">
            Already have an account?{" "}
            <button 
              className="text-medical-600 hover:text-medical-500 px-0.5 sm:px-1 py-0.5"
              onClick={onSwitchToLogin}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};