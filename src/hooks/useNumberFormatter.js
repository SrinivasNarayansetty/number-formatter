import { useState, useCallback, useMemo } from 'react';
import {
  formatNumber,
  formatNumberCustom,
  formatCurrency,
  formatPercentage,
  formatCompact,
  parseFormattedNumber,
  isValidNumber,
} from '../utils/numberFormatter';

/**
 * Custom hook for number formatting
 */
export const useNumberFormatter = (initialValue = '', initialLocale = 'en-US') => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [locale, setLocale] = useState(initialLocale);
  const [formatType, setFormatType] = useState('standard');
  const [currency, setCurrency] = useState('USD');
  const [customOptions, setCustomOptions] = useState({
    thousandsSeparator: ',',
    decimalSeparator: '.',
    decimals: null,
  });

  const isValid = useMemo(() => isValidNumber(inputValue), [inputValue]);

  const formattedValue = useMemo(() => {
    if (!inputValue || !isValid) return '';

    switch (formatType) {
      case 'standard':
        return formatNumber(inputValue, locale);
      case 'currency':
        return formatCurrency(inputValue, currency, locale);
      case 'percentage':
        return formatPercentage(inputValue, 2, locale);
      case 'compact':
        return formatCompact(inputValue, locale);
      case 'custom':
        return formatNumberCustom(inputValue, customOptions);
      default:
        return formatNumber(inputValue, locale);
    }
  }, [inputValue, locale, formatType, currency, customOptions, isValid]);

  const handleInputChange = useCallback((value) => {
    setInputValue(value);
  }, []);

  const handleLocaleChange = useCallback((newLocale) => {
    setLocale(newLocale);
  }, []);

  const handleFormatTypeChange = useCallback((type) => {
    setFormatType(type);
  }, []);

  const handleCurrencyChange = useCallback((newCurrency) => {
    setCurrency(newCurrency);
  }, []);

  const handleCustomOptionsChange = useCallback((options) => {
    setCustomOptions((prev) => ({ ...prev, ...options }));
  }, []);

  const reset = useCallback(() => {
    setInputValue('');
    setLocale('en-US');
    setFormatType('standard');
    setCurrency('USD');
    setCustomOptions({
      thousandsSeparator: ',',
      decimalSeparator: '.',
      decimals: null,
    });
  }, []);

  return {
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
  };
};

/**
 * Hook for clipboard operations
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, []);

  return { copied, copyToClipboard };
};
