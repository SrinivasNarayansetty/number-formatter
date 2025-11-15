import React from 'react';
import { LOCALE_OPTIONS } from '../utils/numberFormatter';

const LocaleSelector = ({ selectedLocale, onLocaleChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Locale
      </label>
      <select
        value={selectedLocale}
        onChange={(e) => onLocaleChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white dark:bg-dark-800 dark:border-dark-600 dark:text-white focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-500 transition-all duration-300 cursor-pointer"
      >
        {LOCALE_OPTIONS.map((locale) => (
          <option key={locale.value} value={locale.value}>
            {locale.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSelector;
