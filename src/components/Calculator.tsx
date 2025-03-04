import React, { useState, useEffect } from 'react';
import { UserInputForm } from './UserInputForm';
import { Results } from './Results';
import { calculateMaintenance, calculateMacros, calculateWeightLossTime } from '../utils/calculations';
import { UserData, MacroResults, WeightLossResults } from '../types';

export const Calculator = () => {
  const [userData, setUserData] = useState<UserData>({
    weight: 0,
    height: 0,
    age: 0,
    gender: 'male',
    bodyFat: 15,
    activityLevel: 'moderate',
    fitnessGoal: 'maintain',
    targetBodyFat: 10,
    fatLossRate: 1
  });

  const [results, setResults] = useState<MacroResults | null>(null);
  const [weightLossResults, setWeightLossResults] = useState<WeightLossResults | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
    setShowResults(false);
  };

  const handleCalculate = () => {
    const maintenanceCalories = calculateMaintenance(userData);
    const macros = calculateMacros(userData, maintenanceCalories);
    
    let weightLoss = null;
    if (userData.bodyFat && userData.targetBodyFat && userData.bodyFat > userData.targetBodyFat) {
      weightLoss = calculateWeightLossTime(userData);
    }
    
    setResults(macros);
    setWeightLossResults(weightLoss);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="p-6 md:p-10 relative">
          <div className="absolute top-6 right-6 opacity-20">
            <svg className="w-16 h-16 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m-6 3h6m-6 3h6m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
            Personalized Nutrition Calculator
          </h2>
          
          <div className="motion-safe:animate-fade-in">
            {!showResults ? (
              <UserInputForm 
                userData={userData} 
                onInputChange={handleInputChange} 
                onCalculate={handleCalculate} 
              />
            ) : (
              <Results 
                results={results} 
                weightLossResults={weightLossResults}
                userData={userData}
                onRecalculate={() => setShowResults(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};