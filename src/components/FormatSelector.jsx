import React from 'react';

const formatTypes = [
  { value: 'standard', label: 'Standard', icon: '🔢', description: 'Basic number formatting' },
  { value: 'currency', label: 'Currency', icon: '💰', description: 'Format as currency' },
  { value: 'percentage', label: 'Percentage', icon: '📊', description: 'Format as percentage' },
  { value: 'compact', label: 'Compact', icon: '📦', description: 'Compact notation (1K, 1M)' },
  { value: 'custom', label: 'Custom', icon: '⚙️', description: 'Custom separators' },
];

const FormatSelector = ({ selectedFormat, onFormatChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        Format Type
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {formatTypes.map((format) => (
          <button
            key={format.value}
            onClick={() => onFormatChange(format.value)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
              selectedFormat === format.value
                ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-accent-50 shadow-lg scale-105 dark:from-primary-900/20 dark:to-accent-900/20'
                : 'border-gray-200 bg-white hover:border-primary-300 dark:bg-dark-800 dark:border-dark-600 dark:hover:border-primary-600'
            }`}
          >
            <div className="text-3xl mb-2">{format.icon}</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {format.label}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {format.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormatSelector;
