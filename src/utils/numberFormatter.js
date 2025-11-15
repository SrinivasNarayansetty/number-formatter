/**
 * Number formatting utilities
 */

/**
 * Formats a number with locale-specific formatting
 * @param {number|string} number - The number to format
 * @param {string} locale - The locale to use (default: 'en-US')
 * @returns {string} Formatted number string
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (number === null || number === undefined || number === '') {
    return '';
  }

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(numValue)) {
    return '';
  }

  return numValue.toLocaleString(locale);
};

/**
 * Formats a number with custom separators
 * @param {number|string} number - The number to format
 * @param {Object} options - Formatting options
 * @param {string} options.thousandsSeparator - Separator for thousands (default: ',')
 * @param {string} options.decimalSeparator - Separator for decimals (default: '.')
 * @param {number} options.decimals - Number of decimal places
 * @returns {string} Formatted number string
 */
export const formatNumberCustom = (number, options = {}) => {
  const {
    thousandsSeparator = ',',
    decimalSeparator = '.',
    decimals = null,
  } = options;

  if (number === null || number === undefined || number === '') {
    return '';
  }

  let numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(numValue)) {
    return '';
  }

  // Apply decimal places if specified
  if (decimals !== null) {
    numValue = numValue.toFixed(decimals);
  }

  const parts = numValue.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousands separator
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

  // Combine with decimal part if exists
  if (decimalPart !== undefined) {
    return formattedInteger + decimalSeparator + decimalPart;
  }

  return formattedInteger;
};

/**
 * Formats a number as currency
 * @param {number|string} number - The number to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (number, currency = 'USD', locale = 'en-US') => {
  if (number === null || number === undefined || number === '') {
    return '';
  }

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(numValue)) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(numValue);
};

/**
 * Formats a number as a percentage
 * @param {number|string} number - The number to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (number, decimals = 2, locale = 'en-US') => {
  if (number === null || number === undefined || number === '') {
    return '';
  }

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(numValue)) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(numValue / 100);
};

/**
 * Formats a number in compact notation (e.g., 1K, 1M, 1B)
 * @param {number|string} number - The number to format
 * @param {string} locale - Locale code (default: 'en-US')
 * @returns {string} Formatted compact number string
 */
export const formatCompact = (number, locale = 'en-US') => {
  if (number === null || number === undefined || number === '') {
    return '';
  }

  const numValue = typeof number === 'string' ? parseFloat(number) : number;

  if (isNaN(numValue)) {
    return '';
  }

  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(numValue);
};

/**
 * Parses a formatted number string back to a number
 * @param {string} formattedNumber - The formatted number string
 * @returns {number|null} Parsed number or null if invalid
 */
export const parseFormattedNumber = (formattedNumber) => {
  if (!formattedNumber || typeof formattedNumber !== 'string') {
    return null;
  }

  // Remove all non-numeric characters except decimal point and minus sign
  const cleaned = formattedNumber.replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? null : parsed;
};

/**
 * Validates if a value is a valid number
 * @param {any} value - The value to validate
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return false;
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(numValue) && isFinite(numValue);
};

/**
 * Available locale options
 */
export const LOCALE_OPTIONS = [
  { value: 'en-US', label: 'English (US)' },
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'de-DE', label: 'German' },
  { value: 'fr-FR', label: 'French' },
  { value: 'es-ES', label: 'Spanish' },
  { value: 'it-IT', label: 'Italian' },
  { value: 'ja-JP', label: 'Japanese' },
  { value: 'zh-CN', label: 'Chinese (Simplified)' },
  { value: 'ar-SA', label: 'Arabic' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'ru-RU', label: 'Russian' },
];

/**
 * Available currency options
 */
export const CURRENCY_OPTIONS = [
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
  { value: 'CNY', label: 'Chinese Yuan (¥)' },
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'AUD', label: 'Australian Dollar ($)' },
  { value: 'CAD', label: 'Canadian Dollar ($)' },
  { value: 'CHF', label: 'Swiss Franc (Fr)' },
  { value: 'BRL', label: 'Brazilian Real (R$)' },
];
