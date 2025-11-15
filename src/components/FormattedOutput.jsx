import React from 'react';
import { useClipboard } from '../hooks/useNumberFormatter';

const FormattedOutput = ({ value, label = "Formatted Result" }) => {
  const { copied, copyToClipboard } = useClipboard();

  const handleCopy = () => {
    if (value) {
      copyToClipboard(value);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-accent-200 bg-gradient-to-br from-accent-50 to-primary-50 dark:from-dark-700 dark:to-dark-800 dark:border-dark-600 min-h-[60px] flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            {value || 'Your formatted number will appear here'}
          </span>
        </div>
        {value && (
          <button
            onClick={handleCopy}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
              </svg>
            )}
          </button>
        )}
      </div>
      {copied && (
        <p className="mt-2 text-sm text-green-600 font-medium animate-pulse">
          Copied to clipboard!
        </p>
      )}
    </div>
  );
};

export default FormattedOutput;
