import React from 'react';
import { FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Title Section */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white mb-2"><span className="text-medical-500 font-bold text-2xl">Dose<span className="text-medical-200">Buddy</span></span></h3>
            <p className="mb-6">Revolutionizing medication management with smart technology.</p>
          </div>
          
          {/* Links Section */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-xl font-bold text-white mb-6">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="hover:text-medical-300 transition-colors"
                >
                  Website
                </Link>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="hover:text-medical-300 transition-colors"
                >
                  Application
                </a>
              </li>
            </ul>
          </div>
          
          {/* Socials Section with Icons */}
          <div className="flex flex-col md:items-center">
            <h3 className="text-xl font-bold text-white mb-6">Socials</h3>
            <ul className="flex space-x-4">
              <li>
                <a 
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="hover:text-medical-300 transition-colors text-2xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-medical-300 transition-colors text-2xl"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400">
          <div className="flex justify-center space-x-4">
            <a href="#privacy" className="hover:text-medical-300 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-medical-300 transition-colors">Terms</a>
            <a href="#sitemap" className="hover:text-medical-300 transition-colors">Sitemap</a>
          </div>
          <p className="text-center mt-4">© 2025 DoseBuddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
