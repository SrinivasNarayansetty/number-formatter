import { describe, it, expect } from 'vitest';
import {
  formatNumber,
  formatNumberCustom,
  formatCurrency,
  formatPercentage,
  formatCompact,
  parseFormattedNumber,
} from '../utils/numberFormatter';

describe('Security Tests', () => {
  describe('Input Sanitization', () => {
    it('should handle malicious locale strings safely', () => {
      // Invalid locale formats should fallback to en-US
      expect(formatNumber(1234, '<script>alert("xss")</script>')).toBe('1,234');
      expect(formatNumber(1234, 'javascript:alert(1)')).toBe('1,234');
      expect(formatNumber(1234, '../../../etc/passwd')).toBe('1,234');
      expect(formatNumber(1234, 'en US')).toBe('1,234'); // Space instead of dash
      expect(formatNumber(1234, 'EN-US')).toBe('1,234'); // Wrong case
    });

    it('should handle malicious currency codes safely', () => {
      // Invalid currency codes should fallback to USD
      expect(formatCurrency(1234, '<script>alert("xss")</script>')).toContain('1,234');
      expect(formatCurrency(1234, 'javascript:alert(1)')).toContain('1,234');
      expect(formatCurrency(1234, 'US')).toContain('1,234'); // Too short
      expect(formatCurrency(1234, 'USDD')).toContain('1,234'); // Too long
      expect(formatCurrency(1234, 'usd')).toContain('1,234'); // Wrong case
    });

    it('should sanitize custom separator inputs', () => {
      // Only allow safe separator characters
      const number = 1234567.89;

      // Malicious separators should fallback to defaults
      expect(formatNumberCustom(number, { thousandsSeparator: '<script>' })).toBe('1,234,567.89');
      expect(formatNumberCustom(number, { decimalSeparator: 'alert(1)' })).toBe('1,234,567.89');
      expect(formatNumberCustom(number, { thousandsSeparator: '&&' })).toBe('1,234,567.89');
      expect(formatNumberCustom(number, { decimalSeparator: '||' })).toBe('1,234,567.89');

      // Valid separators should work
      expect(formatNumberCustom(number, { thousandsSeparator: ' ' })).toBe('1 234 567.89');
      expect(formatNumberCustom(number, { thousandsSeparator: '.' })).toBe('1.234.567.89');
      expect(formatNumberCustom(number, { decimalSeparator: ',' })).toBe('1,234,567,89');
    });

    it('should validate decimal places parameter', () => {
      const number = 123.456789;

      // Invalid decimals should fallback safely
      expect(formatNumberCustom(number, { decimals: -1 })).toBe('123.456789');
      expect(formatNumberCustom(number, { decimals: 100 })).toBe('123.456789');
      expect(formatNumberCustom(number, { decimals: 'invalid' })).toBe('123.456789');
      expect(formatNumberCustom(number, { decimals: null })).toBe('123.456789');

      // Valid decimals should work
      expect(formatNumberCustom(number, { decimals: 2 })).toBe('123.46');
      expect(formatNumberCustom(number, { decimals: 0 })).toBe('123');
    });

    it('should handle percentage decimals safely', () => {
      const number = 50.123456;

      // Invalid decimals should fallback to 2
      expect(formatPercentage(number, -5)).toBe('50.12%');
      expect(formatPercentage(number, 100)).toBe('50.12%');
      expect(formatPercentage(number, 'invalid')).toBe('50.12%');
      expect(formatPercentage(number, NaN)).toBe('50.12%');

      // Valid decimals should work
      expect(formatPercentage(number, 0)).toBe('50%');
      expect(formatPercentage(number, 4)).toBe('50.1235%');
    });
  });

  describe('XSS Prevention', () => {
    it('should not execute script tags in formatted output', () => {
      // Even if someone tries to inject through separators
      const result = formatNumberCustom(1234, {
        thousandsSeparator: '<script>alert("xss")</script>'
      });
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('alert');
    });

    it('should safely parse formatted numbers without code execution', () => {
      expect(parseFormattedNumber('<script>alert("xss")</script>')).toBe(null);
      expect(parseFormattedNumber('javascript:alert(1)')).toBe(null);
      expect(parseFormattedNumber('onload=alert(1)')).toBe(null);
    });
  });

  describe('Type Safety', () => {
    it('should handle non-string locale inputs', () => {
      expect(formatNumber(1234, null)).toBe('1,234');
      expect(formatNumber(1234, undefined)).toBe('1,234');
      expect(formatNumber(1234, 123)).toBe('1,234');
      expect(formatNumber(1234, {})).toBe('1,234');
      expect(formatNumber(1234, [])).toBe('1,234');
    });

    it('should handle non-string currency inputs', () => {
      expect(formatCurrency(1234, null)).toContain('1,234');
      expect(formatCurrency(1234, undefined)).toContain('1,234');
      expect(formatCurrency(1234, 123)).toContain('1,234');
      expect(formatCurrency(1234, {})).toContain('1,234');
    });

    it('should handle non-string separator inputs', () => {
      expect(formatNumberCustom(1234, { thousandsSeparator: null })).toBe('1,234');
      expect(formatNumberCustom(1234, { thousandsSeparator: 123 })).toBe('1,234');
      expect(formatNumberCustom(1234, { thousandsSeparator: {} })).toBe('1,234');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers safely', () => {
      const large = Number.MAX_SAFE_INTEGER;
      expect(() => formatNumber(large)).not.toThrow();
      expect(() => formatCurrency(large)).not.toThrow();
      expect(() => formatCompact(large)).not.toThrow();
    });

    it('should handle very small numbers safely', () => {
      const small = Number.MIN_SAFE_INTEGER;
      expect(() => formatNumber(small)).not.toThrow();
      expect(() => formatCurrency(small)).not.toThrow();
      expect(() => formatPercentage(small)).not.toThrow();
    });

    it('should handle special numeric values safely', () => {
      expect(formatNumber(Infinity)).toBe('');
      expect(formatNumber(-Infinity)).toBe('');
      expect(formatNumber(NaN)).toBe('');
      expect(formatCurrency(Infinity)).toBe('');
      expect(formatPercentage(NaN)).toBe('');
    });

    it('should prevent prototype pollution attempts', () => {
      const malicious = JSON.parse('{"__proto__": {"isAdmin": true}, "number": 1234}');
      expect(formatNumber(malicious.number)).toBe('1,234');
      expect(({}).isAdmin).toBeUndefined(); // Prototype not polluted
    });
  });

  describe('Injection Prevention', () => {
    it('should not allow command injection through parameters', () => {
      const result1 = formatNumberCustom(1234, {
        thousandsSeparator: '`cat /etc/passwd`'
      });
      expect(result1).toBe('1,234');

      const result2 = formatNumberCustom(1234, {
        thousandsSeparator: '$(whoami)'
      });
      expect(result2).toBe('1,234');
    });

    it('should not allow SQL injection patterns', () => {
      expect(formatNumber(1234, "' OR '1'='1")).toBe('1,234');
      expect(formatNumber(1234, "1; DROP TABLE users--")).toBe('1,234');
    });

    it('should not allow path traversal', () => {
      expect(formatNumber(1234, '../../../etc/passwd')).toBe('1,234');
      expect(formatNumber(1234, '..\\..\\..\\windows\\system32')).toBe('1,234');
    });
  });

  describe('Resource Exhaustion Prevention', () => {
    it('should limit decimal places to prevent memory exhaustion', () => {
      // Attempting to use extremely large decimal places
      const result = formatNumberCustom(123.456, { decimals: 999999 });
      expect(result).toBe('123.456'); // Should fallback to no decimal limit
    });

    it('should handle extremely long separator strings safely', () => {
      const longString = 'x'.repeat(10000);
      const result = formatNumberCustom(1234, { thousandsSeparator: longString });
      expect(result).toBe('1,234'); // Should use default separator
    });
  });
});
