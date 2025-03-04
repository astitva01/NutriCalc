import React, { useState } from 'react';

interface BodyFatSelectorProps {
  value?: number;
  onChange: (value?: number) => void;
}

export const BodyFatSelector = ({ value, onChange }: BodyFatSelectorProps) => {
  const [customValue, setCustomValue] = useState<string>('');
  const [useCustom, setUseCustom] = useState(false);

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomValue(val);
    
    const numVal = parseFloat(val);
    if (!isNaN(numVal) && numVal >= 0 && numVal <= 100) {
      onChange(numVal);
    } else if (val === '') {
      onChange(undefined);
    }
  };

  const handlePresetSelect = (preset?: number) => {
    onChange(preset);
    setUseCustom(false);
  };

  const toggleCustom = () => {
    setUseCustom(!useCustom);
    if (!useCustom) {
      setCustomValue(value?.toString() || '');
    }
  };

  const bodyFatOptions = [
    { 
      value: undefined, 
      label: "I don't know", 
      imageUrl: '/images/body-fat-unknown.png'
    },
    { 
      value: 5, 
      label: '5%', 
      imageUrl: '/images/body-fat-5.png'
    },
    { 
      value: 10, 
      label: '10%', 
      imageUrl: '/images/body-fat-10.png'
    },
    { 
      value: 15, 
      label: '15%', 
      imageUrl: '/images/body-fat-15.png'
    },
    { 
      value: 20, 
      label: '20%', 
      imageUrl: '/images/body-fat-20.png'
    },
    { 
      value: 25, 
      label: '25%', 
      imageUrl: '/images/body-fat-25.png'
    },
    { 
      value: 30, 
      label: '30%', 
      imageUrl: '/images/body-fat-30.png'
    },
    { 
      value: 35, 
      label: '35%', 
      imageUrl: '/images/body-fat-35.png'
    },
    { 
      value: 40, 
      label: '40%', 
      imageUrl: '/images/body-fat-40.png'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bodyFatOptions.map((option) => (
          <div
            key={option.value ?? 'unknown'}
            onClick={() => handlePresetSelect(option.value)}
            className={`group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all
              transform hover:scale-105 hover:shadow-lg ${
                value === option.value && !useCustom
                  ? 'border-blue-500 ring-4 ring-blue-100 scale-105 shadow-md'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
          >
            <div className="aspect-w-1 aspect-h-1 w-full">
              <img
                src={option.imageUrl}
                alt={`Body fat percentage example: ${option.label}`}
                className="object-cover w-full h-32 brightness-90 group-hover:brightness-100 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-semibold drop-shadow-md">
                {option.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={toggleCustom}
            className={`flex-shrink-0 w-5 h-5 flex items-center justify-center border rounded-md transition-colors
              ${useCustom ? 'bg-blue-500 border-blue-600' : 'bg-white border-gray-300'}`}
          >
            {useCustom && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <label 
            htmlFor="customBodyFat" 
            className="block text-sm font-medium text-gray-700 cursor-pointer"
          >
            Custom Body Fat Percentage
          </label>
        </div>
        
        {useCustom && (
          <div className="mt-4 pl-8">
            <div className="max-w-xs space-y-1">
              <input
                type="number"
                value={customValue}
                onChange={handleCustomChange}
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="Enter body fat percentage"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="text-sm text-gray-500">
                Enter a value between 0 and 100 (e.g. 22.5)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};