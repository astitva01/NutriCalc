import React, { useState } from 'react';
import { UserData } from '../types';
import { BodyFatSelector } from './BodyFatSelector';

interface UserInputFormProps {
  userData: UserData;
  onInputChange: (data: Partial<UserData>) => void;
  onCalculate: () => void;
}

export const UserInputForm = ({ userData, onInputChange, onCalculate }: UserInputFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!userData.weight || userData.weight <= 0) {
        newErrors.weight = 'Please enter a valid weight';
      }
      if (!userData.height || userData.height <= 0) {
        newErrors.height = 'Please enter a valid height';
      }
      if (!userData.age || userData.age <= 0) {
        newErrors.age = 'Please enter a valid age';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      onCalculate();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {currentStep === 1 && (
        <div className="space-y-6 motion-safe:animate-fade-in">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['weight', 'height', 'age'].map((field) => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                  {{
                    weight: 'Weight (kg)',
                    height: 'Height (cm)',
                    age: 'Age'
                  }[field]}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    id={field}
                    value={userData[field as keyof UserData] || ''}
                    onChange={(e) => onInputChange({
                      [field]: field === 'age' 
                        ? parseInt(e.target.value) || 0 
                        : parseFloat(e.target.value) || 0
                    })}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-4 focus:outline-none transition-all ${
                      errors[field] 
                        ? 'border-red-500 focus:ring-red-200' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                    placeholder={`Enter your ${field}`}
                    min="0"
                    step={field === 'age' ? '1' : '0.1'}
                  />
                  {errors[field] && (
                    <div className="absolute -bottom-5 left-0 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      {errors[field]}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-4">
                {['male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => onInputChange({ gender: gender as 'male' | 'female' })}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 transition-all
                      ${
                        userData.gender === gender
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                  >
                    <svg className={`w-5 h-5 ${
                      userData.gender === gender ? 'text-blue-600' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {gender === 'male' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                      )}
                    </svg>
                    <span className="capitalize">{gender}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none 
                focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              Next Step
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-6 motion-safe:animate-fade-in">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Body Composition & Activity
          </h3>
          
          <div className="space-y-8">
            <div className="p-6 border-2 border-gray-100 rounded-xl bg-white">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Body Fat Percentage
              </label>
              <BodyFatSelector
                value={userData.bodyFat}
                onChange={(value) => onInputChange({ bodyFat: value })}
              />
            </div>
            
            <div>
              <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-3">
                Physical Activity Level
              </label>
              <div className="relative">
                <select
                  id="activityLevel"
                  value={userData.activityLevel}
                  onChange={(e) => onInputChange({ activityLevel: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 
                    focus:outline-none focus:border-blue-500 focus:ring-blue-200 appearance-none"
                >
                  <option value="sedentary">Not Active (Little or no exercise)</option>
                  <option value="light">Low (Light exercise 1-3 days/week)</option>
                  <option value="moderate">Intermediate (Moderate exercise 3-5 days/week)</option>
                  <option value="active">High Active (Hard exercise 6-7 days/week)</option>
                  <option value="very_active">Very High Active (Professional athlete level)</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none 
                focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              Next Step
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && (
        <div className="space-y-6 motion-safe:animate-fade-in">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Fitness Goals
          </h3>
          
          <div className="space-y-8">
            <div>
              <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Fitness Goal
              </label>
              <div className="relative">
                <select
                  id="fitnessGoal"
                  value={userData.fitnessGoal}
                  onChange={(e) => onInputChange({ fitnessGoal: e.target.value as any })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 
                    focus:outline-none focus:border-blue-500 focus:ring-blue-200 appearance-none"
                >
                  <option value="fat_loss">Fat Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintain">Stay Active and Fit</option>
                  <option value="bulk">Bulk</option>
                  <option value="cut">Cut</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="targetBodyFat" className="block text-sm font-medium text-gray-700 mb-3">
                  Target Body Fat Percentage
                </label>
                <div className="relative">
                  <select
                    id="targetBodyFat"
                    value={userData.targetBodyFat}
                    onChange={(e) => onInputChange({ targetBodyFat: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 
                      focus:outline-none focus:border-blue-500 focus:ring-blue-200 appearance-none"
                  >
                    {[5, 8, 10, 12, 15, 18, 20, 22, 25].map((value) => (
                      <option key={value} value={value}>{value}%</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="fatLossRate" className="block text-sm font-medium text-gray-700 mb-3">
                  Fat Loss Rate
                </label>
                <div className="relative">
                  <select
                    id="fatLossRate"
                    value={userData.fatLossRate}
                    onChange={(e) => onInputChange({ fatLossRate: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 
                      focus:outline-none focus:border-blue-500 focus:ring-blue-200 appearance-none"
                  >
                    <option value="0.5">0.5% (Conservative)</option>
                    <option value="1">1% (Moderate)</option>
                    <option value="1.5">1.5% (Aggressive)</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none 
                focus:ring-4 focus:ring-gray-300 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none 
                focus:ring-4 focus:ring-green-500 focus:ring-offset-2 transition-all flex items-center gap-2"
            >
              Calculate Results
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </form>
  );
};