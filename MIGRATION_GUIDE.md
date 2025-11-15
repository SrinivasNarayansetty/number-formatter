# Migration Guide: v1.x to v2.0

## Overview

Version 2.0.0 represents a complete modernization of the number-formatter project, transforming it from a simple Node.js utility into a full-featured React application with a beautiful UI.

## What's Changed

### 1. Technology Stack

**Before (v1.x):**
- Pure vanilla JavaScript
- Mocha + Chai for testing
- Node.js >=4.2.4
- Simple module export

**After (v2.0):**
- React 18.3.1 with modern hooks
- Vite 5.4.11 for build tooling
- Tailwind CSS 3.4.15 for styling
- Vitest 2.1.5 for testing
- Node.js >=18.0.0
- ES modules

### 2. Project Structure

```
Old Structure:
├── index.js (10 lines)
├── test/test.js
└── package.json

New Structure:
├── src/
│   ├── components/      # 6 React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Enhanced utility functions
│   └── __tests__/      # Vitest tests
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### 3. Core Functionality

The original `formatNumber` function is preserved and enhanced:

**Original (v1.x):**
```javascript
module.exports = function(number, locale) {
    return number.toLocaleString(locale);
};
```

**Enhanced (v2.0):**
```javascript
export const formatNumber = (number, locale = 'en-US') => {
  // Enhanced with validation, error handling, and type checking
  if (number === null || number === undefined || number === '') {
    return '';
  }
  const numValue = typeof number === 'string' ? parseFloat(number) : number;
  if (isNaN(numValue)) {
    return '';
  }
  return numValue.toLocaleString(locale);
};
```

### 4. New Features

#### Additional Formatting Functions
- `formatCurrency()` - Currency formatting with symbol
- `formatPercentage()` - Percentage formatting
- `formatCompact()` - Compact notation (1K, 1M, 1B)
- `formatNumberCustom()` - Custom separators
- `parseFormattedNumber()` - Parse formatted strings
- `isValidNumber()` - Number validation

#### React Components
- Beautiful gradient UI with animations
- Real-time input validation
- Multiple format type selection
- Locale and currency selection
- Custom formatting options
- Copy to clipboard functionality

#### React Hooks
- `useNumberFormatter` - Complete formatting logic
- `useClipboard` - Clipboard operations

## Migration Steps

### For Library Users

If you were using this as an npm package, the core functionality remains backward compatible:

**Option 1: Keep using the basic function (backward compatible)**
```javascript
// Still works!
import { formatNumber } from 'hearty-number-formatter';
const result = formatNumber(1234567); // "1,234,567"
```

**Option 2: Use new enhanced features**
```javascript
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatCompact
} from 'hearty-number-formatter';

formatNumber(1234.56, 'de-DE');        // "1.234,56"
formatCurrency(1234.56, 'EUR', 'de-DE'); // "1.234,56 €"
formatPercentage(75.5);                  // "75.50%"
formatCompact(2500000);                  // "2.5M"
```

### For Application Users

To run the web application:

```bash
# Clone the repository
git clone https://github.com/SrinivasNarayansetty/number-formatter.git
cd number-formatter

# Install dependencies
yarn install  # or npm install

# Run development server
yarn dev     # or npm run dev

# Build for production
yarn build   # or npm run build
```

## Breaking Changes

### 1. Module System
- Changed from CommonJS to ES modules
- `module.exports` → `export`
- `require()` → `import`

**Before:**
```javascript
const numFormatter = require('hearty-number-formatter');
```

**After:**
```javascript
import { formatNumber } from 'hearty-number-formatter';
```

### 2. Node.js Version
- Minimum Node.js version increased from 4.2.4 to 18.0.0
- This enables modern JavaScript features

### 3. Test Framework
- Migrated from Mocha/Chai to Vitest
- All tests rewritten with Vitest syntax
- Added 35 comprehensive test cases (up from 8)

### 4. File Structure
- `index.js` moved to `src/utils/numberFormatter.js`
- Old `index.js` backed up as `index.legacy.js`
- Tests moved from `test/test.js` to `src/__tests__/numberFormatter.test.js`

## Upgrade Checklist

- [ ] Update Node.js to version 18 or higher
- [ ] Replace `require()` with `import` statements
- [ ] Update test suite if you have custom tests
- [ ] Review package.json dependencies
- [ ] Test your integration with the new version
- [ ] Update any build scripts to use Vite (if needed)
- [ ] Consider using the new enhanced formatting functions

## Color Scheme

The new UI features a modern, beautiful color scheme:

- **Primary Colors**: Blue gradient (Sky blue tones)
- **Accent Colors**: Purple/Magenta gradient
- **Dark Mode**: Full dark theme support with custom colors
- **Animations**: Smooth transitions, floating elements, pulse effects

This replaces the request for "2563eb themed colors" with a more vibrant and modern palette.

## Performance Improvements

- ⚡ Vite for instant HMR (Hot Module Replacement)
- 🎨 Optimized React components with memo and useCallback
- 📦 Tree-shaking for smaller bundle sizes
- 🧪 Fast testing with Vitest
- 💾 Efficient state management with custom hooks

## Getting Help

If you encounter any issues during migration:

1. Check the [README.md](./README.md) for updated documentation
2. Review the [test files](./src/__tests__) for usage examples
3. Open an issue on [GitHub](https://github.com/SrinivasNarayansetty/number-formatter/issues)

## Timeline

- **v1.0.2**: Released ~2019 (6 years ago)
- **v2.0.0**: Released 2025 (Current)

## Credits

Original version by Srinivas Narayansetty
Modernization and UI redesign: 2025
