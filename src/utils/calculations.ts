import { UserData, MacroResults, WeightLossResults } from '../types';

// Activity level multipliers
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,      // Little or no exercise
  light: 1.375,        // Light exercise 1-3 days/week
  moderate: 1.55,      // Moderate exercise 3-5 days/week
  active: 1.725,       // Hard exercise 6-7 days/week
  very_active: 1.9     // Professional athlete level
};

// Calorie content per gram of macronutrients
const PROTEIN_CALORIES_PER_GRAM = 4;
const CARBS_CALORIES_PER_GRAM = 4;
const FAT_CALORIES_PER_GRAM = 9;

/**
 * Calculate maintenance calories using the Mifflin-St Jeor Equation
 */
export const calculateMaintenance = (userData: UserData): number => {
  const { weight, height, age, gender, activityLevel } = userData;
  
  // Base BMR calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  // Apply activity multiplier
  const activityMultiplier = ACTIVITY_MULTIPLIERS[activityLevel];
  const maintenanceCalories = Math.round(bmr * activityMultiplier);
  
  return maintenanceCalories;
};

/**
 * Calculate macronutrient distribution based on fitness goal
 */
export const calculateMacros = (userData: UserData, maintenanceCalories: number): MacroResults => {
  const { weight, fitnessGoal } = userData;
  
  let targetCalories: number;
  let proteinPerKg: number;
  let carbPercentage: number;
  
  // Adjust calories and macros based on fitness goal
  switch (fitnessGoal) {
    case 'fat_loss':
      targetCalories = maintenanceCalories - 300;
      proteinPerKg = 2.2; // Higher protein for fat loss
      carbPercentage = 30; // Lower carbs
      break;
    case 'muscle_gain':
      targetCalories = maintenanceCalories + 200;
      proteinPerKg = 2.0;
      carbPercentage = 40;
      break;
    case 'maintain':
      targetCalories = maintenanceCalories;
      proteinPerKg = 1.6;
      carbPercentage = 45;
      break;
    case 'bulk':
      targetCalories = maintenanceCalories + 500;
      proteinPerKg = 1.8;
      carbPercentage = 50; // Higher carbs for energy
      break;
    case 'cut':
      targetCalories = maintenanceCalories - 500;
      proteinPerKg = 2.5; // Highest protein to preserve muscle
      carbPercentage = 25; // Lowest carbs
      break;
    default:
      targetCalories = maintenanceCalories;
      proteinPerKg = 1.6;
      carbPercentage = 45;
  }
  
  // Calculate protein
  const proteinGrams = Math.round(weight * proteinPerKg);
  const proteinCalories = proteinGrams * PROTEIN_CALORIES_PER_GRAM;
  
  // Calculate carbs
  const carbCalories = Math.round(targetCalories * (carbPercentage / 100));
  const carbGrams = Math.round(carbCalories / CARBS_CALORIES_PER_GRAM);
  
  // Calculate fat (remaining calories)
  const fatCalories = targetCalories - proteinCalories - carbCalories;
  const fatGrams = Math.round(fatCalories / FAT_CALORIES_PER_GRAM);
  
  // Calculate percentages
  const proteinPercentage = Math.round((proteinCalories / targetCalories) * 100);
  const carbPercentage2 = Math.round((carbCalories / targetCalories) * 100);
  const fatPercentage = Math.round((fatCalories / targetCalories) * 100);
  
  return {
    calories: Math.round(targetCalories),
    protein: {
      grams: proteinGrams,
      calories: proteinCalories,
      percentage: proteinPercentage
    },
    carbs: {
      grams: carbGrams,
      calories: carbCalories,
      percentage: carbPercentage2
    },
    fat: {
      grams: fatGrams,
      calories: fatCalories,
      percentage: fatPercentage
    }
  };
};

/**
 * Calculate weight loss timeline
 */
export const calculateWeightLossTime = (userData: UserData): WeightLossResults => {
  const { weight, bodyFat, targetBodyFat, fatLossRate } = userData;
  
  // Calculate lean body mass
  const leanBodyMass = weight * (1 - (bodyFat / 100));
  
  // Calculate target weight
  const targetWeight = leanBodyMass / (1 - (targetBodyFat / 100));
  
  // Calculate weight to lose
  const weightToLose = weight - targetWeight;
  
  // Calculate weekly weight loss
  const weeklyLoss = weight * (fatLossRate / 100);
  
  // Calculate weeks to goal
  const weeksToGoal = weightToLose / weeklyLoss;
  
  return {
    leanBodyMass,
    targetWeight,
    weightToLose,
    weeklyLoss,
    weeksToGoal
  };
};