import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';
  
  // Handle scroll event for transparent header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Determine header background class
  const headerClass = isHomePage 
    ? isScrolled 
      ? 'bg-white shadow-md' 
      : 'bg-transparent'
    : 'bg-white shadow-md';
  
  const textClass = isHomePage && !isScrolled
    ? 'text-white'
    : 'text-neutral-800';
  
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ];
  
  // Get dashboard link based on user role
  const getDashboardLink = () => {
    if (!currentUser) return null;
    
    switch (currentUser.role) {
      case 'hospital':
        return '/hospital-dashboard';
      case 'patient':
        return '/patient-dashboard';
      default:
        return '/';
    }
  };
  
  const dashboardLink = getDashboardLink();
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo color={isHomePage && !isScrolled ? 'white' : 'primary'} />
          <span className={`ml-2 text-xl font-inter font-semibold ${textClass}`}>PreQ</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${textClass} hover:text-primary-400 transition-colors font-medium ${
                location.pathname === link.path ? 'text-primary-400' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        {/* Auth Buttons or User Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <>
              {dashboardLink && (
                <Link to={dashboardLink}>
                  <Button variant="outline">Dashboard</Button>
                </Link>
              )}
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-neutral-800 focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <X size={24} className={textClass} />
          ) : (
            <Menu size={24} className={textClass} />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-neutral-800 hover:text-primary-400 transition-colors font-medium ${
                    location.pathname === link.path ? 'text-primary-400' : ''
                  }`}
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Auth Links */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col space-y-3">
                {currentUser ? (
                  <>
                    {dashboardLink && (
                      <Link 
                        to={dashboardLink} 
                        className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center border border-primary-400 text-primary-400 hover:bg-primary-50 w-full"
                        onClick={toggleMenu}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center text-primary-400 hover:bg-primary-50 w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center text-primary-400 hover:bg-primary-50 w-full"
                      onClick={toggleMenu}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center bg-primary-400 text-white hover:bg-primary-500 w-full"
                      onClick={toggleMenu}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;