import React from 'react';

const NumberInput = ({ value, onChange, isValid, label = "Enter a number" }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., 1234567.89"
          className={`w-full px-6 py-4 text-lg rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
            value && !isValid
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-200'
              : 'border-primary-200 bg-white focus:border-primary-500 focus:ring-primary-100 dark:bg-dark-800 dark:border-dark-600 dark:text-white'
          }`}
        />
        {value && !isValid && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        )}
        {value && isValid && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        )}
      </div>
      {value && !isValid && (
        <p className="mt-2 text-sm text-red-600">Please enter a valid number</p>
      )}
    </div>
  );
};

export default NumberInput;
