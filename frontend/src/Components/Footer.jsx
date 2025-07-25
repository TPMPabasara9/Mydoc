import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 text-gray-800">
      {/* Main Footer Content */}
      <div className="w-full px-6 md:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MediBook</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted partner in healthcare booking. Connect with qualified doctors and schedule appointments with ease.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="w-9 h-9 bg-gray-200 hover:bg-blue-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-200 hover:bg-blue-400 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-200 hover:bg-pink-600 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-200 hover:bg-blue-700 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Find Doctors', 'Specialties', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {['Online Consultation', 'Appointment Booking', 'Health Records', 'Prescription Refills', 'Emergency Care'].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center group">
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Phone size={12} />
                </div>
                <span className="text-gray-600 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mail size={12} />
                </div>
                <span className="text-gray-600 text-sm">support@medibook.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <MapPin size={12} />
                </div>
                <span className="text-gray-600 text-sm">123 Healthcare Ave, Medical City</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-600 text-sm mb-3">Get health tips and booking updates.</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleNewsletterSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300">
        <div className="w-full px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="font-semibold text-gray-800">MediBook</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a>
            </div>
          </div>
          
          <div className="text-center md:text-left mt-4 pt-4 border-t border-gray-300">
            <p className="text-gray-500 text-sm">
              © 2024 MediBook. All rights reserved. | Connecting patients with healthcare providers seamlessly.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;