import React from 'react';
import { UserData, MacroResults, WeightLossResults } from '../types';
import { MacroChart } from './MacroChart';

interface ResultsProps {
  results: MacroResults | null;
  weightLossResults: WeightLossResults | null;
  userData: UserData;
  onRecalculate: () => void;
}

export const Results = ({ results, weightLossResults, userData, onRecalculate }: ResultsProps) => {
  if (!results) {
    return null;
  }

  const { calories, protein, carbs, fat } = results;

  return (
    <div className="space-y-10 max-w-5xl mx-auto px-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200/50 ring-1 ring-blue-200/30">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-bold text-blue-800 bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            🎯 Your Personalized Nutrition Plan
          </h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                🔥 Daily Caloric Intake
              </h4>
              <div className="flex justify-between items-center bg-blue-50/50 p-4 rounded-lg">
                <span className="text-gray-600 font-medium">Total Calories</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {calories} kcal
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
              <h4 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                📊 Macronutrient Breakdown
              </h4>
              <div className="space-y-4">
                <MacroRow 
                  label="🍗 Protein" 
                  grams={protein.grams}
                  percentage={protein.percentage}
                  color="from-blue-500 to-cyan-500"
                />
                <MacroRow
                  label="🍚 Carbohydrates"
                  grams={carbs.grams}
                  percentage={carbs.percentage}
                  color="from-green-500 to-emerald-500"
                />
                <MacroRow
                  label="🥑 Fat"
                  grams={fat.grams}
                  percentage={fat.percentage}
                  color="from-amber-500 to-orange-500"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
            <h4 className="text-lg font-semibold text-blue-700 mb-6 flex items-center gap-2">
              📈 Macro Distribution
            </h4>
            <div className="h-80 w-full flex items-center justify-center">
              <div className="aspect-square w-full max-w-[300px] p-4 flex flex-col items-center">
                <div className="flex-1 w-full relative">
                  <MacroChart protein={protein.percentage} carbs={carbs.percentage} fat={fat.percentage} showLegend={false}/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600">
                        {protein.percentage + carbs.percentage + fat.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="text-sm text-gray-600">Protein</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-sm text-gray-600">Carbs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                    <span className="text-sm text-gray-600">Fat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {weightLossResults && (
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-200/50">
          <div className="flex items-center gap-3 mb-6">
            <h3 className="text-2xl font-bold text-green-800 bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              ✅ Weight Loss Projection
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StatCard title="Current Stats" color="green">
              <StatItem label="Current Weight" value={`${userData.weight} kg`} />
              <StatItem label="Body Fat" value={`${userData.bodyFat}%`} />
              <StatItem 
                label="Lean Body Mass" 
                value={`${weightLossResults.leanBodyMass.toFixed(1)} kg`} 
              />
            </StatCard>
            
            <StatCard title="Target Stats" color="green">
              <StatItem 
                label="Target Weight" 
                value={`${weightLossResults.targetWeight.toFixed(1)} kg`} 
              />
              <StatItem 
                label="Target Body Fat" 
                value={`${userData.targetBodyFat}%`} 
              />
              <StatItem 
                label="Weight to Lose" 
                value={`${weightLossResults.weightToLose.toFixed(1)} kg`} 
                highlight
              />
            </StatCard>
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-green-100">
            <h4 className="text-lg font-semibold text-green-700 mb-4">📅 Estimated Timeline</h4>
            <div className="space-y-4">
              <TimelineItem 
                label="Fat Loss Rate" 
                value={`${userData.fatLossRate}% of body weight/week`} 
              />
              <TimelineItem
                label="Weekly Fat Loss"
                value={`${weightLossResults.weeklyLoss.toFixed(2)} kg/week`}
              />
              <div className="pt-4 border-t border-green-50">
                <TimelineItem
                  label="Estimated Time to Goal"
                  value={`${weightLossResults.weeksToGoal.toFixed(1)} weeks`}
                  highlight
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          💡 Nutrition Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TipCard 
            icon="🥩" 
            title="Protein Sources" 
            content="Chicken breast, turkey, lean beef, fish, eggs, tofu, tempeh, legumes, Greek yogurt, cottage cheese" 
          />
          <TipCard
            icon="🌾"
            title="Carbohydrate Sources"
            content="Brown rice, quinoa, sweet potatoes, oats, whole grain bread, fruits, vegetables"
          />
          <TipCard
            icon="🥑"
            title="Healthy Fat Sources"
            content="Avocados, nuts, seeds, olive oil, fatty fish, nut butters"
          />
          <div className="md:col-span-2">
            <TipCard
              icon="📌"
              title="General Tips"
              content={
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Stay hydrated by drinking at least 2-3 liters of water daily</li>
                  <li>Aim for 3-5 balanced meals throughout the day</li>
                  <li>Include a variety of colorful vegetables in your diet</li>
                  <li>Consider tracking your food intake for better adherence</li>
                  <li>Adjust your plan based on progress</li>
                </ul>
              }
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={onRecalculate}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          Recalculate Plan
        </button>
      </div>
    </div>
  );
};

const MacroRow = ({ label, grams, percentage, color }: { label: string; grams: number; percentage: number; color: string }) => (
  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
    <span className="text-gray-600 font-medium">{label}</span>
    <div className="flex items-center gap-2">
      <span className={`font-bold text-lg bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {grams}g
      </span>
      <span className="text-gray-500 font-medium text-sm">({percentage}%)</span>
    </div>
  </div>
);

const StatCard = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
  <div className={`bg-white p-6 rounded-xl shadow-sm border border-${color}-100`}>
    <h4 className={`text-lg font-semibold text-${color}-700 mb-4 flex items-center gap-2`}>
      {title}
    </h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const StatItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
    <span className="text-gray-600">{label}</span>
    <span className={`font-medium ${highlight ? 'text-red-500' : 'text-gray-700'}`}>{value}</span>
  </div>
);

const TimelineItem = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className={`font-medium ${highlight ? 'text-green-600 font-bold' : 'text-gray-700'}`}>{value}</span>
  </div>
);

const TipCard = ({ icon, title, content }: { icon: string; title: string; content: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-200 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-2xl">{icon}</span>
      <h4 className="text-lg font-semibold text-gray-700">{title}</h4>
    </div>
    <div className="text-gray-600 text-sm leading-relaxed">{content}</div>
  </div>
);