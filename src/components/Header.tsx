import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthModal } from './AuthModal.tsx';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const authParam = searchParams.get('auth');
    if (authParam === 'signup') {
      openAuthModal('signup');
      searchParams.delete('auth');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-md border-b border-blue-100' 
        : 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg border-b border-blue-100'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              NutriCalc
            </h1>
          </Link>
          
          <nav className="hidden md:block">
            <ul className="flex space-x-8 items-center">
              <li>
                <Link 
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium 
                    hover:-translate-y-0.5 flex items-center group"
                >
                  <span className="relative">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </span>
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium 
                    hover:-translate-y-0.5 flex items-center group"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium 
                    hover:-translate-y-0.5 flex items-center group"
                >
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </span>
                </a>
              </li>
              <li className="flex space-x-4">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                    transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 
                    flex items-center space-x-2"
                >
                  <span>Login</span>
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                    transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 
                    flex items-center space-x-2"
                >
                  <span>Sign Up</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};