import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone, Mail, ChevronDown } from 'lucide-react';
import acpmLogo from '../assets/ACPM_LOGO.webp';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About & Team' },
  { path: '/events', label: 'Events' },
  { path: '/articles', label: 'Articles' },
  { path: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
    }`}>
      <div className="hidden md:block bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2.5 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+919890610595" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
                <Phone size={14} />
                +91 9890610595, +91 9137848181
              </a>
              <a href="mailto:acpmaha01@gmail.com" className="flex items-center gap-2 hover:text-primary-200 transition-colors">
                <Mail size={14} />
                acpmaha01@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-primary-200">Established </span>
              <span className="font-semibold">2016, Maharashtra</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div>
                  <img src={acpmLogo} alt="acpm-logo" className="h-16 w-16 " />
                </div>
                
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900 leading-tight tracking-tight">ACPM</h1>
                <p className="text-[10px] lg:text-xs text-gray-500 font-medium">Est. 2016 • Maharashtra</p>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    location.pathname === link.path
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-4">
              <Link to="/membership" className="btn-primary text-sm">
                Join Now
              </Link>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <Link to="/membership" className="hidden sm:inline-flex btn-primary text-sm py-2 px-4">
                Join
              </Link>
              <button
                className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`xl:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                )}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link
                to="/membership"
                className="btn-primary w-full text-center block"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
