import { useState } from 'react';
import { LoginModal } from './login/LoginModal';
import { OTPModal } from './login/OTPModal';
import { OTPVerificationModal } from './login/OTPVerificationModal';
import { RegisterModal } from './login/RegisterModal';

export const Login = ({ onClose, initialModal = 'login' }) => {
  const [currentModal, setCurrentModal] = useState(initialModal);

  // When any modal is closed, call the parent's onClose
  const handleClose = () => {
    setCurrentModal(null);
    onClose();
  };

  return (
    <>
      {currentModal === 'login' && (
        <LoginModal 
          onClose={handleClose}
          onSwitchToOTP={() => setCurrentModal('otp')}
          onSwitchToRegister={() => setCurrentModal('register')}
        />
      )}
      
      {currentModal === 'otp' && (
        <OTPModal 
          onClose={handleClose}
          onSwitchToLogin={() => setCurrentModal('login')}
        />
      )}
      
      {currentModal === 'otpVerification' && (
        <OTPVerificationModal 
          onClose={handleClose}
        />
      )}
      
      {currentModal === 'register' && (
        <RegisterModal 
          onClose={handleClose}
          onSwitchToLogin={() => setCurrentModal('login')}
        />
      )}
    </>
  );
};