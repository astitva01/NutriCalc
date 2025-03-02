export interface UserData {
  weight: number;
  height: number;
  age: number;
  gender: 'male' | 'female';
  bodyFat: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessGoal: 'fat_loss' | 'muscle_gain' | 'maintain' | 'bulk' | 'cut';
  targetBodyFat: number;
  fatLossRate: number;
}

export interface MacroNutrient {
  grams: number;
  calories: number;
  percentage: number;
}

export interface MacroResults {
  calories: number;
  protein: MacroNutrient;
  carbs: MacroNutrient;
  fat: MacroNutrient;
}

export interface WeightLossResults {
  leanBodyMass: number;
  targetWeight: number;
  weightToLose: number;
  weeklyLoss: number;
  weeksToGoal: number;
}