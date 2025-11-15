import React from 'react';
import { useNumberFormatter } from './hooks/useNumberFormatter';
import NumberInput from './components/NumberInput';
import FormattedOutput from './components/FormattedOutput';
import FormatSelector from './components/FormatSelector';
import LocaleSelector from './components/LocaleSelector';
import CurrencySelector from './components/CurrencySelector';
import CustomOptions from './components/CustomOptions';

function App() {
  const {
    inputValue,
    formattedValue,
    locale,
    formatType,
    currency,
    customOptions,
    isValid,
    handleInputChange,
    handleLocaleChange,
    handleFormatTypeChange,
    handleCurrencyChange,
    handleCustomOptionsChange,
    reset,
  } = useNumberFormatter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 bg-clip-text text-transparent animate-pulse-slow">
            Number Formatter
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your numbers into beautifully formatted strings with support for multiple locales, currencies, and custom formatting options.
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-gray-100 dark:border-dark-700">
            {/* Input Section */}
            <NumberInput
              value={inputValue}
              onChange={handleInputChange}
              isValid={isValid}
            />

            {/* Format Type Selector */}
            <FormatSelector
              selectedFormat={formatType}
              onFormatChange={handleFormatTypeChange}
            />

            {/* Options based on format type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LocaleSelector
                selectedLocale={locale}
                onLocaleChange={handleLocaleChange}
              />
              {formatType === 'currency' && (
                <CurrencySelector
                  selectedCurrency={currency}
                  onCurrencyChange={handleCurrencyChange}
                />
              )}
            </div>

            {/* Custom Options */}
            {formatType === 'custom' && (
              <CustomOptions
                options={customOptions}
                onOptionsChange={handleCustomOptionsChange}
              />
            )}

            {/* Output Section */}
            <FormattedOutput value={formattedValue} />

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button
                onClick={reset}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Reset
              </button>
              <button
                onClick={() => handleInputChange('1234567.89')}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Try Example
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Multi-Locale Support
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Format numbers according to different regional standards and conventions.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built with React and optimized hooks for instant formatting.
              </p>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-dark-700 transform hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Beautiful UI
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Modern design with Tailwind CSS and smooth animations.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600 dark:text-gray-400">
          <p>
            Built with ❤️ using React + Tailwind CSS | Open Source MIT License
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
