import React, { useState, useEffect } from 'react';
import { Dialog } from "@headlessui/react";
import { Activity, Eye, EyeOff } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode }: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialMode: 'login' | 'signup'; 
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <Dialog.Panel className="relative bg-white rounded-[40px] p-6 md:p-8 max-w-md w-full shadow-xl transition-all">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition-colors text-2xl font-bold"
          >
            ⛌
          </button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-sm">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {mode === "login" ? "Welcome to NutriCalc" : "Welcome to NutriCalc"}
              <p className="text-xs text-black font-normal">
                {mode === "signup" && "Transform your nutrition here"}
              </p>
            </h3>

            <div className="text-center">
              <label className="text-left block text-sm font-medium text-gray-700 pl-4 md:pl-14 mb-1">Email address</label>
              <input
                type="email"
                placeholder={mode === "signup" ? "Email address" : "Email"}
                className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="text-center relative">
              <label className="text-left block text-sm font-medium text-gray-700 pl-4 md:pl-14 mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={mode === "signup" ? "Create a password" : "Password"}
                className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-300 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 md:right-14 top-10 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {mode === "login" && (
                <p className="text-left pl-4 md:pl-12 text-sm text-black font-semibold hover:underline cursor-pointer mt-1">
                  Forgotten your password?
                </p>
              )}
            </div>

            {mode === "signup" && (
              <div className="text-center">
                <label className="text-left block text-sm font-medium text-gray-700 pl-4 md:pl-14 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-300"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full max-w-xs px-4 py-3 bg-blue-600 text-white rounded-3xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
              {mode === "login" ? "Log In" : "Continue"}
            </button>

            <p className="text-black text-xs font-semibold">
              {mode === "login" ? "Not on NutriCalc yet?" : "Already a member?"} {" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-black hover:underline font-semibold"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
