import React from 'react';

const CustomOptions = ({ options, onOptionsChange }) => {
  return (
    <div className="w-full space-y-4 p-6 bg-gray-50 dark:bg-dark-800 rounded-2xl border-2 border-gray-200 dark:border-dark-600">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Custom Formatting Options
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Thousands Separator
        </label>
        <input
          type="text"
          value={options.thousandsSeparator}
          onChange={(e) => onOptionsChange({ thousandsSeparator: e.target.value })}
          maxLength={1}
          placeholder=","
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white dark:bg-dark-700 dark:border-dark-600 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Decimal Separator
        </label>
        <input
          type="text"
          value={options.decimalSeparator}
          onChange={(e) => onOptionsChange({ decimalSeparator: e.target.value })}
          maxLength={1}
          placeholder="."
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white dark:bg-dark-700 dark:border-dark-600 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Decimal Places (leave empty for auto)
        </label>
        <input
          type="number"
          value={options.decimals === null ? '' : options.decimals}
          onChange={(e) => onOptionsChange({ decimals: e.target.value === '' ? null : parseInt(e.target.value) })}
          min={0}
          max={10}
          placeholder="Auto"
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white dark:bg-dark-700 dark:border-dark-600 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300"
        />
      </div>
    </div>
  );
};

export default CustomOptions;
