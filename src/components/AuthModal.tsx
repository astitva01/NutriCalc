import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Activity, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, initialMode }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log(mode, { email, password });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="relative bg-white rounded-[40px] p-8 max-w-md w-full mx-4 shadow-xl transition-all">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                  Welcome to NutriCalc
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-left text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      placeholder="Email address"
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-[200px] md:w-[250px] lg:w-[300px] px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 
                        focus:ring-blue-200 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-left text-gray-700 mb-2">
                      {mode === 'login' ? 'Password' : 'Create a Password'}
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      placeholder="Create a password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-[200px] md:w-[250px] lg:w-[300px] px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 
                        focus:ring-blue-200 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>

                  {mode === 'signup' && (
                    <div className="flex flex-col">
                      <label className="block text-left text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          value={dob ? new Date(dob).toLocaleDateString('en-GB') : ''}
                          placeholder="dd/mm/yyyy"
                          className="w-[200px] md:w-[250px] lg:w-[300px] px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 
                            focus:ring-blue-200 focus:border-blue-500 transition-all pr-10"
                        />
                        <input
                          type="date"
                          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-[250px] md:w-[300px] lg:w-[300px] px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white 
                      rounded-3xl hover:scale-[1.02] transition-all duration-300 font-medium shadow-sm 
                      hover:shadow-md"
                  >
                    {mode === 'login' ? 'Log In' : 'Continue'}
                  </button>

                  {mode === 'signup' && (
                    <p className="text-gray-500 text-xs text-center mt-4">
                      By continuing, you agree to NutriCalc's{' '}
                      <Link to="/terms" className="underline text-gray-500">
                        Terms of Service
                      </Link>{' '}
                      and acknowledge you've read our{' '}
                      <Link to="/privacy" className="underline text-gray-500">
                        Privacy Policy
                      </Link>.
                    </p>
                  )}
                </form>

                {mode === 'login' && (
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </p>
                )}

                {mode === 'signup' && (
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('login')}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Log in here
                    </button>
                  </p>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}; 