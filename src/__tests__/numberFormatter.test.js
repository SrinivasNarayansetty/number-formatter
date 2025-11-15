import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatNumberCustom,
  formatCurrency,
  formatPercentage,
  formatCompact,
  parseFormattedNumber,
  isValidNumber,
} from '../utils/numberFormatter';

describe('formatNumber', () => {
  it('should convert single digits', () => {
    const result = formatNumber(1);
    expect(result).toBe('1');
  });

  it('should convert double digits', () => {
    const result = formatNumber(12);
    expect(result).toBe('12');
  });

  it('should convert triple digits', () => {
    const result = formatNumber(123);
    expect(result).toBe('123');
  });

  it('should convert 4 digits', () => {
    const result = formatNumber(1234);
    expect(result).toBe('1,234');
  });

  it('should convert 5 digits', () => {
    const result = formatNumber(12345);
    expect(result).toBe('12,345');
  });

  it('should convert 6 digits', () => {
    const result = formatNumber(123456);
    expect(result).toBe('123,456');
  });

  it('should convert 7 digits', () => {
    const result = formatNumber(1234567);
    expect(result).toBe('1,234,567');
  });

  it('should convert 8 digits', () => {
    const result = formatNumber(12345678);
    expect(result).toBe('12,345,678');
  });

  it('should handle decimal numbers', () => {
    const result = formatNumber(1234.56);
    expect(result).toBe('1,234.56');
  });

  it('should handle negative numbers', () => {
    const result = formatNumber(-1234);
    expect(result).toBe('-1,234');
  });

  it('should format with different locale', () => {
    const result = formatNumber(1234.56, 'de-DE');
    expect(result).toBe('1.234,56');
  });

  it('should return empty string for null', () => {
    const result = formatNumber(null);
    expect(result).toBe('');
  });

  it('should return empty string for undefined', () => {
    const result = formatNumber(undefined);
    expect(result).toBe('');
  });

  it('should return empty string for empty string', () => {
    const result = formatNumber('');
    expect(result).toBe('');
  });
});

describe('formatNumberCustom', () => {
  it('should format with custom thousands separator', () => {
    const result = formatNumberCustom(1234567, { thousandsSeparator: '.' });
    expect(result).toBe('1.234.567');
  });

  it('should format with custom decimal separator', () => {
    const result = formatNumberCustom(1234.56, { decimalSeparator: ',' });
    expect(result).toBe('1,234,56');
  });

  it('should format with specified decimal places', () => {
    const result = formatNumberCustom(1234.5, { decimals: 2 });
    expect(result).toBe('1,234.50');
  });

  it('should format with all custom options', () => {
    const result = formatNumberCustom(1234567.89, {
      thousandsSeparator: ' ',
      decimalSeparator: ',',
      decimals: 2,
    });
    expect(result).toBe('1 234 567,89');
  });
});

describe('formatCurrency', () => {
  it('should format as USD currency', () => {
    const result = formatCurrency(1234.56, 'USD', 'en-US');
    expect(result).toBe('$1,234.56');
  });

  it('should format as EUR currency', () => {
    const result = formatCurrency(1234.56, 'EUR', 'de-DE');
    expect(result).toBe('1.234,56\xa0€');
  });

  it('should handle negative currency', () => {
    const result = formatCurrency(-1234.56, 'USD', 'en-US');
    expect(result).toBe('-$1,234.56');
  });
});

describe('formatPercentage', () => {
  it('should format as percentage', () => {
    const result = formatPercentage(50, 2, 'en-US');
    expect(result).toBe('50.00%');
  });

  it('should format with custom decimal places', () => {
    const result = formatPercentage(33.333, 1, 'en-US');
    expect(result).toBe('33.3%');
  });

  it('should handle zero percentage', () => {
    const result = formatPercentage(0, 2, 'en-US');
    expect(result).toBe('0.00%');
  });
});

describe('formatCompact', () => {
  it('should format large numbers compactly', () => {
    const result = formatCompact(1500, 'en-US');
    expect(result).toBe('1.5K');
  });

  it('should format millions', () => {
    const result = formatCompact(2500000, 'en-US');
    expect(result).toBe('2.5M');
  });

  it('should format billions', () => {
    const result = formatCompact(3500000000, 'en-US');
    expect(result).toBe('3.5B');
  });

  it('should handle small numbers', () => {
    const result = formatCompact(999, 'en-US');
    expect(result).toBe('999');
  });
});

describe('parseFormattedNumber', () => {
  it('should parse formatted number', () => {
    const result = parseFormattedNumber('1,234.56');
    expect(result).toBe(1234.56);
  });

  it('should parse currency', () => {
    const result = parseFormattedNumber('$1,234.56');
    expect(result).toBe(1234.56);
  });

  it('should handle negative numbers', () => {
    const result = parseFormattedNumber('-1,234.56');
    expect(result).toBe(-1234.56);
  });

  it('should return null for invalid input', () => {
    const result = parseFormattedNumber('abc');
    expect(result).toBe(null);
  });

  it('should return null for empty string', () => {
    const result = parseFormattedNumber('');
    expect(result).toBe(null);
  });
});

describe('isValidNumber', () => {
  it('should return true for valid numbers', () => {
    expect(isValidNumber(123)).toBe(true);
    expect(isValidNumber(123.45)).toBe(true);
    expect(isValidNumber(-123)).toBe(true);
    expect(isValidNumber('123')).toBe(true);
  });

  it('should return false for invalid values', () => {
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber('')).toBe(false);
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber(NaN)).toBe(false);
    expect(isValidNumber(Infinity)).toBe(false);
  });
});
