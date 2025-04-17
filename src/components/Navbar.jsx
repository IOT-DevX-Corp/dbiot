import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { X, Menu} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-scroll';
import { Login } from './Login';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { to: "home", label: "Home" },
    { to: "how-it-works", label: "How it Works" },
    { to: "features", label: "Features" },
    { to: "testimonials", label: "Testimonials" },
    { to: "contact", label: "Contact" }
  ];

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button and Logo Container */}
            <div className="flex items-center gap-4 md:gap-0">
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-medical-600 focus:outline-none"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Logo */}
              <div className="flex items-center md:justify-start">
                <span className="text-medical-800 font-bold text-2xl">Dose<span className="text-medical-500">Buddy</span></span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    spy={true}
                    smooth={true}
                    offset={-64} // Adjust based on navbar height
                    duration={500}
                    className="text-gray-600 hover:text-medical-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* CTA Button - Visible on both mobile and desktop */}
            <div className="flex items-center">
              <Button 
                className="pill-button text-sm"
                onClick={() => setShowLogin(true)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/70 backdrop-blur-lg shadow-lg rounded-b-lg">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-64}
                duration={500}
                className="text-gray-600 hover:text-medical-600 block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                onClick={handleCloseMenu}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button 
                className="pill-button w-full"
                onClick={() => {
                  setIsMenuOpen(false);
                  setShowLogin(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <Login 
          onClose={() => setShowLogin(false)} 
          initialModal="login"
        />
      )}
    </>
  );
};

export default Navbar;
