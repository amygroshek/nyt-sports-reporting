import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponsiveImage } from './index';
import type { RedditImage } from '@/types';

describe('ResponsiveImage', () => {
  const createMockImage = (overrides = {}): RedditImage => ({
    e: 'Image',
    id: 'test-id',
    m: 'image/jpg',
    p: [
      { u: 'https://example.com/small.jpg', x: 108, y: 108 },
      { u: 'https://example.com/medium.jpg', x: 216, y: 216 },
    ],
    s: {
      u: 'https://example.com/full.jpg',
      x: 432,
      y: 432,
    },
    status: 'valid',
    ...overrides,
  });

  it('returns null when image.s.u is missing', () => {
    const invalidImage = createMockImage({
      s: undefined,
    });

    const { container } = render(
      <ResponsiveImage image={invalidImage} alt="test" />
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders img with correct src and srcSet', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} alt="test" />);

    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('src', 'https://example.com/full.jpg');
    expect(img).toHaveAttribute(
      'srcSet',
      'https://example.com/small.jpg 108w, https://example.com/medium.jpg 216w'
    );
  });

  it('handles &amp; in URLs', () => {
    const mockImage = createMockImage({
      s: { u: 'https://example.com/full&amp;.jpg', x: 432, y: 432 },
      p: [{ u: 'https://example.com/small&amp;.jpg', x: 108, y: 108 }],
    });

    render(<ResponsiveImage image={mockImage} alt="test" />);

    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('src', 'https://example.com/full&.jpg');
    expect(img).toHaveAttribute(
      'srcSet',
      'https://example.com/small&.jpg 108w'
    );
  });

  it('sets correct sizes attribute', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} alt="test" />);

    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 768px');
  });

  it('applies default className', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} alt="test" />);

    const img = screen.getByAltText('test');
    expect(img).toHaveClass('rounded-lg', 'max-w-full', 'h-auto');
  });

  it('combines custom className with defaults', () => {
    const mockImage = createMockImage();

    render(
      <ResponsiveImage image={mockImage} alt="test" className="custom-class" />
    );

    const img = screen.getByAltText('test');
    expect(img).toHaveClass(
      'rounded-lg',
      'max-w-full',
      'h-auto',
      'custom-class'
    );
  });

  it('sets alt text correctly', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} alt="test alt" />);

    const img = screen.getByAltText('test alt');
    expect(img).toHaveAttribute('alt', 'test alt');
  });

  it('uses empty string as default alt text', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} />);

    const img = screen.getByAltText('');
    expect(img).toHaveAttribute('alt', '');
  });

  it('sets lazy loading', () => {
    const mockImage = createMockImage();

    render(<ResponsiveImage image={mockImage} alt="test" />);

    const img = screen.getByAltText('test');
    expect(img).toHaveAttribute('loading', 'lazy');
  });
});
