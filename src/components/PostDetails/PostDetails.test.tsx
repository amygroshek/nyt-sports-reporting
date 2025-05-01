import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostDetails } from '.';
import type { Post } from '@/types';

// Mock the utilities
vi.mock('@/utils', () => ({
  cleanHtml: vi.fn((html) => `Cleaned: ${html}`),
}));

vi.mock('@/utils/getFormattedDate', () => ({
  getFormattedDate: vi.fn(() => '2023-01-01'),
}));

// Mock the ResponsiveImageList component
vi.mock('@/components/ResponsiveImageList', () => ({
  ResponsiveImageList: vi.fn(({ mediaMetadata }) => (
    <div
      data-testid="responsive-image-list"
      data-media={JSON.stringify(mediaMetadata)}
    />
  )),
}));

// Mock the CSS module
vi.mock('./PostDetails.module.scss', () => ({
  default: {
    dangerousInnerHtml: 'mocked-dangerous-html-class',
  },
}));

describe('PostDetails', () => {
  const createMockPost = (overrides = {}): Post => ({
    id: '1',
    title: 'Test Title',
    selftext: 'Test Content',
    selftext_html: '<p>Test Content</p>',
    author: 'testuser',
    created_utc: 1234567890,
    media_metadata: {},
    name: 't3_1',
    media: null,
    media_embed: null,
    num_comments: 0,
    permalink: '',
    subreddit: 'test',
    subreddit_id: 't5_test',
    subreddit_subscribers: 0,
    subreddit_type: 'public',
    thumbnail: '',
    thumbnail_height: 0,
    thumbnail_width: 0,
    ups: 0,
    upvote_ratio: 1,
    url: '',
    ...overrides,
  });

  it('renders post title', () => {
    const mockPost = createMockPost({ title: 'Test Post Title' });
    render(<PostDetails post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders author and formatted date', () => {
    const mockPost = createMockPost({
      author: 'testuser',
      created_utc: 1234567890,
    });

    render(<PostDetails post={mockPost} />);
    expect(screen.getByText('By testuser on 2023-01-01')).toBeInTheDocument();
  });

  it('renders cleaned HTML content', () => {
    const mockPost = createMockPost({
      selftext_html: '<p>Original HTML</p>',
    });

    render(<PostDetails post={mockPost} />);
    expect(screen.getByText('Original HTML')).toBeInTheDocument();
  });

  it('renders ResponsiveImageList when media_metadata exists', () => {
    const mediaMetadata = {
      image1: {
        s: { u: 'https://example.com/image.jpg', x: 100, y: 100 },
        p: [],
      },
    };

    const mockPost = createMockPost({
      media_metadata: mediaMetadata,
    });

    render(<PostDetails post={mockPost} />);

    const imageList = screen.getByTestId('responsive-image-list');
    expect(imageList).toBeInTheDocument();
    expect(JSON.parse(imageList.getAttribute('data-media') || '')).toEqual(
      mediaMetadata
    );
  });

  it('does not render ResponsiveImageList when media_metadata is null', () => {
    const mockPost = createMockPost({ media_metadata: null });
    render(<PostDetails post={mockPost} />);
    expect(
      screen.queryByTestId('responsive-image-list')
    ).not.toBeInTheDocument();
  });
});
