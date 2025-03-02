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
    // Calculate maintenance calories
    const maintenanceCalories = calculateMaintenance(userData);
    
    // Calculate macros based on fitness goal
    const macros = calculateMacros(userData, maintenanceCalories);
    
    // Calculate weight loss timeline if applicable
    let weightLoss = null;
    if (userData.bodyFat > userData.targetBodyFat) {
      weightLoss = calculateWeightLossTime(userData);
    }
    
    setResults(macros);
    setWeightLossResults(weightLoss);
    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Personalized Nutrition Calculator
          </h2>
          
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
  );
};