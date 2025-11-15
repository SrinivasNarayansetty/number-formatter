/**
 * Number formatting utilities
 */

/**
 * Validates and sanitizes locale string
 * @param {string} locale - The locale to validate
 * @returns {string} Valid locale or default
 */
const validateLocale = (locale) => {
  // Security: Validate locale format to prevent injection
  if (typeof locale !== 'string' || !locale) return 'en-US';
  // Locale format: language-COUNTRY or language
  if (!/^[a-z]{2}(-[A-Z]{2})?$/.test(locale)) return 'en-US';
  return locale;
};

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

  if (isNaN(numValue) || !isFinite(numValue)) {
    return '';
  }

  const safeLocale = validateLocale(locale);
  return numValue.toLocaleString(safeLocale);
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

  if (isNaN(numValue) || !isFinite(numValue)) {
    return '';
  }

  // Security: Sanitize separator inputs to prevent injection
  const safeSeparators = (sep, defaultSep) => {
    if (typeof sep !== 'string' || sep.length > 1) return defaultSep;
    // Only allow safe characters for separators
    if (/^[,.\s-_]$/.test(sep)) return sep;
    return defaultSep;
  };

  const safeThousandsSep = safeSeparators(thousandsSeparator, ',');
  const safeDecimalSep = safeSeparators(decimalSeparator, '.');

  // Security: Validate decimals parameter
  const safeDecimals = (decimals !== null && typeof decimals === 'number' && decimals >= 0 && decimals <= 20)
    ? decimals
    : null;

  // Apply decimal places if specified
  if (safeDecimals !== null) {
    numValue = numValue.toFixed(safeDecimals);
  }

  const parts = numValue.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];

  // Add thousands separator
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, safeThousandsSep);

  // Combine with decimal part if exists
  if (decimalPart !== undefined) {
    return formattedInteger + safeDecimalSep + decimalPart;
  }

  return formattedInteger;
};

/**
 * Validates currency code
 * @param {string} currency - The currency code to validate
 * @returns {string} Valid currency or default
 */
const validateCurrency = (currency) => {
  // Security: Validate currency code format (ISO 4217: 3 uppercase letters)
  if (typeof currency !== 'string' || !currency) return 'USD';
  if (!/^[A-Z]{3}$/.test(currency)) return 'USD';
  return currency;
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

  if (isNaN(numValue) || !isFinite(numValue)) {
    return '';
  }

  const safeLocale = validateLocale(locale);
  const safeCurrency = validateCurrency(currency);

  return new Intl.NumberFormat(safeLocale, {
    style: 'currency',
    currency: safeCurrency,
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

  if (isNaN(numValue) || !isFinite(numValue)) {
    return '';
  }

  // Security: Validate decimals parameter
  const safeDecimals = typeof decimals === 'number' && decimals >= 0 && decimals <= 20 ? decimals : 2;
  const safeLocale = validateLocale(locale);

  return new Intl.NumberFormat(safeLocale, {
    style: 'percent',
    minimumFractionDigits: safeDecimals,
    maximumFractionDigits: safeDecimals,
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

  if (isNaN(numValue) || !isFinite(numValue)) {
    return '';
  }

  const safeLocale = validateLocale(locale);

  return new Intl.NumberFormat(safeLocale, {
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

  // Security: Only allow strings that contain primarily numeric characters
  // Reject strings with script tags, code, or other suspicious patterns
  if (/<|>|script|javascript|alert|eval|function|\(|\)/i.test(formattedNumber)) {
    return null;
  }

  // Remove all non-numeric characters except decimal point and minus sign
  const cleaned = formattedNumber.replace(/[^\d.-]/g, '');

  // Additional validation: ensure cleaned string is not empty and looks like a number
  if (!cleaned || !/^-?\d*\.?\d+$/.test(cleaned)) {
    return null;
  }

  const parsed = parseFloat(cleaned);

  return (isNaN(parsed) || !isFinite(parsed)) ? null : parsed;
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
