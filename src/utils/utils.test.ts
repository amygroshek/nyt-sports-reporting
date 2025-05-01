import { describe, it, expect } from 'vitest';
import {
  getFormattedDate,
  cleanHtml,
  truncateAtWordBoundary,
  decodeHtml,
} from './';

describe('getFormattedDate', () => {
  it('formats a unix timestamp correctly', () => {
    const ts = 1745961029; // Example: 2025-04-29
    const result = getFormattedDate(ts);
    expect(result).toBe('2025-04-29');
  });
});

describe('decodeHtml', () => {
  it('decodes HTML entities into raw characters', () => {
    const encoded = '&lt;div&gt;hello &amp; goodbye&lt;/div&gt;';
    expect(decodeHtml(encoded)).toBe('<div>hello & goodbye</div>');
  });
});

describe('cleanHtml', () => {
  it('removes SC_OFF/SC_ON and decodes HTML', () => {
    const input =
      '&lt;!-- SC_OFF --&gt;&lt;div&gt;Test&lt;/div&gt;&lt;!-- SC_ON --&gt;';
    const result = cleanHtml(input);
    expect(result).toBe('<div>Test</div>');
  });

  it('handles nullish input safely', () => {
    const result = cleanHtml('');
    expect(result).toBe('');
  });
});

describe('truncateAtWordBoundary', () => {
  it('truncates long text at word boundary', () => {
    const input =
      'This is a long paragraph that should be truncated at a reasonable point.';
    const result = truncateAtWordBoundary(input, 40);
    expect(result).toBe('This is a long paragraph that should be...');
  });

  it('returns full text if under limit', () => {
    const input = 'Short text.';
    const result = truncateAtWordBoundary(input, 100);
    expect(result).toBe('Short text.');
  });

  it('falls back to hard cutoff if no space found', () => {
    const input = 'Loooooooooooooooooooooooooooooooongword';
    const result = truncateAtWordBoundary(input, 10);
    expect(result).toBe('Looooooooo...');
  });
});
