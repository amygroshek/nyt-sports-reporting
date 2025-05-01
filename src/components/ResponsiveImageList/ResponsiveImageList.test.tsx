import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponsiveImageList } from './index';
import type { RedditMediaMetadata } from '@/types';

// Mock the ResponsiveImage component
vi.mock('@/components/ResponsiveImage', () => ({
  ResponsiveImage: vi.fn(({ image, alt }) => (
    <div
      data-testid="responsive-image"
      data-image={JSON.stringify(image)}
      data-alt={alt}
    />
  )),
}));

describe('ResponsiveImageList', () => {
  it('returns null when mediaMetadata is null', () => {
    // @ts-expect-error passing invalid prop intentionally for testing
    const { container } = render(<ResponsiveImageList mediaMetadata={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when mediaMetadata is empty', () => {
    const { container } = render(<ResponsiveImageList mediaMetadata={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders images for each item in mediaMetadata', () => {
    const mockMediaMetadata: RedditMediaMetadata = {
      image1: {
        s: { u: 'https://example.com/image1.jpg', x: 100, y: 100 },
        p: [{ u: 'https://example.com/image1-small.jpg', x: 50, y: 50 }],
        e: 'Image',
        id: '',
        m: '',
        status: '',
      },
      image2: {
        s: { u: 'https://example.com/image2.jpg', x: 200, y: 200 },
        p: [{ u: 'https://example.com/image2-small.jpg', x: 100, y: 100 }],
        e: 'Image',
        id: '',
        m: '',
        status: '',
      },
    };

    render(<ResponsiveImageList mediaMetadata={mockMediaMetadata} />);

    const images = screen.getAllByTestId('responsive-image');
    expect(images).toHaveLength(2);

    // Check that each image received correct props
    expect(images[0]).toHaveAttribute('data-alt', 'Image image1');
    expect(images[1]).toHaveAttribute('data-alt', 'Image image2');

    // Verify image data was passed correctly
    const image1Data = JSON.parse(images[0].getAttribute('data-image') || '');
    const image2Data = JSON.parse(images[1].getAttribute('data-image') || '');

    expect(image1Data).toEqual(mockMediaMetadata['image1']);
    expect(image2Data).toEqual(mockMediaMetadata['image2']);
  });

  it('applies custom className when provided', () => {
    const mockMediaMetadata: RedditMediaMetadata = {
      image1: {
        s: { u: 'https://example.com/image1.jpg', x: 100, y: 100 },
        p: [{ u: 'https://example.com/image1-small.jpg', x: 50, y: 50 }],
        e: 'Image',
        id: '',
        m: '',
        status: '',
      },
    };

    const { container } = render(
      <ResponsiveImageList
        mediaMetadata={mockMediaMetadata}
        className="custom-class"
      />
    );

    const gridDiv = container.firstChild as HTMLElement;
    expect(gridDiv).toHaveClass('custom-class');
    expect(gridDiv).toHaveClass('grid');
    expect(gridDiv).toHaveClass('grid-cols-1');
    expect(gridDiv).toHaveClass('sm:grid-cols-2');
    expect(gridDiv).toHaveClass('gap-4');
  });

  it('renders grid with correct default classes', () => {
    const mockMediaMetadata: RedditMediaMetadata = {
      image1: {
        s: { u: 'https://example.com/image1.jpg', x: 100, y: 100 },
        p: [{ u: 'https://example.com/image1-small.jpg', x: 50, y: 50 }],
        e: 'Image',
        id: '',
        m: '',
        status: '',
      },
    };

    const { container } = render(
      <ResponsiveImageList mediaMetadata={mockMediaMetadata} />
    );

    const gridDiv = container.firstChild as HTMLElement;
    expect(gridDiv).toHaveClass('grid');
    expect(gridDiv).toHaveClass('grid-cols-1');
    expect(gridDiv).toHaveClass('sm:grid-cols-2');
    expect(gridDiv).toHaveClass('gap-4');
  });
});
