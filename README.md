# Number Formatter

A beautiful, modern number formatting tool built with React and Tailwind CSS. Format numbers with support for multiple locales, currencies, percentages, compact notation, and custom formatting options.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![Tailwind](https://img.shields.io/badge/tailwindcss-3.4.15-blue.svg)

## Features

- **Multiple Format Types**: Standard, Currency, Percentage, Compact (1K, 1M, 1B), and Custom
- **Multi-Locale Support**: Format numbers according to 12+ regional standards
- **Currency Formatting**: Support for 10+ major currencies (USD, EUR, GBP, JPY, etc.)
- **Custom Formatting**: Define your own thousands and decimal separators
- **Beautiful UI**: Modern design with gradient backgrounds and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Copy to Clipboard**: One-click copy of formatted results
- **Real-time Validation**: Instant feedback on input validity
- **Zero Dependencies**: Core utilities have no runtime dependencies
- **TypeScript Ready**: Full TypeScript support (types included)
- **Fully Tested**: Comprehensive test suite with Vitest

## Demo

Visit the live demo at: [Your Demo URL]

## Installation

```bash
npm install hearty-number-formatter
```

## Usage

### As a React Application

Clone and run the project:

```bash
# Clone the repository
git clone https://github.com/SrinivasNarayansetty/number-formatter.git

# Navigate to the project
cd number-formatter

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will open at `http://localhost:3000`

### As a Utility Library

Import the formatting functions in your project:

```javascript
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatCompact,
  formatNumberCustom
} from 'hearty-number-formatter';

// Standard formatting
formatNumber(1234567.89);
// Output: "1,234,567.89"

// Currency formatting
formatCurrency(1234.56, 'USD', 'en-US');
// Output: "$1,234.56"

// Percentage formatting
formatPercentage(75, 2, 'en-US');
// Output: "75.00%"

// Compact notation
formatCompact(2500000, 'en-US');
// Output: "2.5M"

// Custom formatting
formatNumberCustom(1234567.89, {
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimals: 2
});
// Output: "1 234 567,89"
```

### Using React Hooks

```javascript
import { useNumberFormatter } from 'hearty-number-formatter/hooks';

function MyComponent() {
  const {
    inputValue,
    formattedValue,
    handleInputChange,
    handleFormatTypeChange,
    isValid
  } = useNumberFormatter();

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <div>{formattedValue}</div>
    </div>
  );
}
```

## API Reference

### formatNumber(number, locale)

Formats a number with locale-specific formatting.

**Parameters:**
- `number` (number|string): The number to format
- `locale` (string): Locale code (default: 'en-US')

**Returns:** Formatted number string

### formatCurrency(number, currency, locale)

Formats a number as currency.

**Parameters:**
- `number` (number|string): The number to format
- `currency` (string): Currency code (default: 'USD')
- `locale` (string): Locale code (default: 'en-US')

**Returns:** Formatted currency string

### formatPercentage(number, decimals, locale)

Formats a number as a percentage.

**Parameters:**
- `number` (number|string): The number to format
- `decimals` (number): Number of decimal places (default: 2)
- `locale` (string): Locale code (default: 'en-US')

**Returns:** Formatted percentage string

### formatCompact(number, locale)

Formats a number in compact notation (e.g., 1K, 1M, 1B).

**Parameters:**
- `number` (number|string): The number to format
- `locale` (string): Locale code (default: 'en-US')

**Returns:** Formatted compact string

### formatNumberCustom(number, options)

Formats a number with custom separators.

**Parameters:**
- `number` (number|string): The number to format
- `options` (object): Formatting options
  - `thousandsSeparator` (string): Separator for thousands (default: ',')
  - `decimalSeparator` (string): Separator for decimals (default: '.')
  - `decimals` (number): Number of decimal places

**Returns:** Formatted number string

### isValidNumber(value)

Validates if a value is a valid number.

**Parameters:**
- `value` (any): The value to validate

**Returns:** Boolean

## Supported Locales

- English (US) - `en-US`
- English (UK) - `en-GB`
- German - `de-DE`
- French - `fr-FR`
- Spanish - `es-ES`
- Italian - `it-IT`
- Japanese - `ja-JP`
- Chinese (Simplified) - `zh-CN`
- Arabic - `ar-SA`
- Hindi - `hi-IN`
- Portuguese (Brazil) - `pt-BR`
- Russian - `ru-RU`

## Supported Currencies

USD, EUR, GBP, JPY, CNY, INR, AUD, CAD, CHF, BRL

## Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Generate coverage report

# Linting
npm run lint         # Lint code
```

## Project Structure

```
number-formatter/
├── src/
│   ├── components/        # React components
│   │   ├── NumberInput.jsx
│   │   ├── FormattedOutput.jsx
│   │   ├── FormatSelector.jsx
│   │   ├── LocaleSelector.jsx
│   │   ├── CurrencySelector.jsx
│   │   └── CustomOptions.jsx
│   ├── hooks/            # Custom React hooks
│   │   └── useNumberFormatter.js
│   ├── utils/            # Utility functions
│   │   └── numberFormatter.js
│   ├── __tests__/        # Test files
│   │   ├── setup.js
│   │   └── numberFormatter.test.js
│   ├── App.jsx           # Main App component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── vite.config.js
├── vitest.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## Tech Stack

- **React 18.3.1**: Modern React with hooks
- **Vite 5.4.11**: Next-generation frontend tooling
- **Tailwind CSS 3.4.15**: Utility-first CSS framework
- **Vitest 2.1.5**: Blazing fast unit test framework
- **Modern JavaScript**: ES modules, async/await, etc.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing

The project includes a comprehensive test suite. Run tests with:

```bash
npm test
```

All core utility functions are tested with multiple scenarios including edge cases.

## Migration from v1.x

Version 2.0.0 is a complete rewrite with React and Tailwind CSS. The core formatting function remains backward compatible:

```javascript
// v1.x
const numFormatter = require('hearty-number-formatter');
numFormatter(1234); // "1,234"

// v2.x (still works)
import { formatNumber } from 'hearty-number-formatter';
formatNumber(1234); // "1,234"
```

## License

MIT © [Srinivas N](http://srinivasnarayansetty.com/)

## Author

**Srinivas Narayansetty**
- Email: srinivas69cse@gmail.com
- Website: http://srinivasnarayansetty.com/

## Changelog

### v2.0.0 (2025)
- Complete rewrite with React 18 and Tailwind CSS
- Added beautiful, modern UI with gradient themes
- Added support for multiple format types (currency, percentage, compact)
- Added multi-locale support (12+ locales)
- Added custom formatting options
- Migrated from Mocha to Vitest
- Updated all dependencies to latest versions
- Added TypeScript type definitions
- Added comprehensive test coverage
- Added React hooks for easy integration
- Improved performance with optimized React hooks
- Added clipboard copy functionality
- Added real-time input validation

### v1.0.2 (2019)
- Initial release with basic number formatting

## Support

If you encounter any issues or have questions, please file an issue on the [GitHub repository](https://github.com/SrinivasNarayansetty/number-formatter/issues).

---

Made with ❤️ by Srinivas Narayansetty
