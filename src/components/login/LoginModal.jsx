import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export const LoginModal = ({ onClose, onSwitchToOTP, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    // Dummy authentication
    if (credentials.email === 'solo@leveling.com' && credentials.password === 'Arise') {
      const user = {
        username: 'Sung Jinwoo',
        email: credentials.email
      };
      localStorage.setItem('user', JSON.stringify(user));
      onClose();
      navigate('/user');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-0">
      <div className="bg-white rounded-xl w-full max-w-md relative p-4 sm:p-6 min-h-[calc(100vh-2rem)] sm:min-h-0 flex flex-col">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        
        <div className="text-center mb-6 sm:mb-8 mt-4">
          <h2 className="text-xl sm:text-2xl font-bold text-medical-800">
            <span className="text-medical-800 font-bold">Dose<span className="text-medical-500">Buddy</span></span>
          </h2>
          <h3 className="text-sm sm:text-base text-gray-400 mt-2">Welcome Back!</h3>
        </div>

        <div className="space-y-4 flex-1">
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <div className="relative">
            <FontAwesomeIcon 
              icon={faEnvelope} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input 
              type="text"
              name="email"
              placeholder="Email/Username"
              className="w-full pl-10 h-12 text-base"
              value={credentials.email}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="relative">
            <FontAwesomeIcon 
              icon={faLock} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input 
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full pl-10 pr-10 h-12 text-base"
              value={credentials.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          <Button 
            className="w-full pill-button h-12 text-base font-medium"
            onClick={handleLogin}
          >
            Login
          </Button>
          
          <p className="text-center">
            <button className="text-medical-600 hover:text-medical-700 py-2 px-4">
              Forgot Password?
            </button>
          </p>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                OR LOGIN WITH OTP
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full h-12 text-base font-medium"
            onClick={onSwitchToOTP}
          >
            Login with OTP
          </Button>

          <p className="text-center text-gray-600 py-2">
            New to DoseBuddy?{" "}
            <button 
              className="text-medical-600 hover:text-medical-500 px-2 py-1"
              onClick={onSwitchToRegister}
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};