import React from 'react';
import { CURRENCY_OPTIONS } from '../utils/numberFormatter';

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Currency
      </label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white dark:bg-dark-800 dark:border-dark-600 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 cursor-pointer"
      >
        {CURRENCY_OPTIONS.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
