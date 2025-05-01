import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Post } from '@/types';

// Mock declarations must come before imports that use them
vi.mock('react-icons/si', () => ({
  SiSlickpic: () => <span data-testid="media-icon" />,
}));

// Mock the utils individually
vi.mock('@/utils/getFormattedDate', () => ({
  getFormattedDate: vi.fn().mockReturnValue('2023-01-01'),
}));

vi.mock('@/utils/truncateAtWordBoundary', () => ({
  truncateAtWordBoundary: vi
    .fn()
    .mockImplementation((text: string) => text.substring(0, 100)),
}));

import { truncateAtWordBoundary } from '@/utils/truncateAtWordBoundary';

// Mock the store
vi.mock('@/store/postStore', () => ({
  usePostStore: vi.fn(),
}));

// Import components and hooks after mocks
import { SelectedKeywordList } from './index';
import { usePostStore } from '@/store/postStore';

const mockPostStore = {
  cloudSet: [],
  setCloudSelection: vi.fn(),
  cloudLoading: true,
  cloudError: '',
  setCloudSet: vi.fn(),
  setCloudError: vi.fn(),
  setCloudLoading: vi.fn(),
  cloudSelection: '',
  posts: [],
  setPosts: vi.fn(),
  getPostById: vi.fn(),
};

const createMockPost = (overrides = {}): Post => ({
  id: '1',
  title: 'Test Title',
  selftext: 'Test Content',
  author: 'testuser',
  created_utc: 1234567890,
  media_metadata: {},
  name: 't3_1',
  media: null,
  media_embed: null,
  num_comments: 0,
  permalink: '',
  selftext_html: '',
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

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe('SelectedKeywordList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when posts array is empty', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: [],
        cloudSelection: 'test',
      })
    );

    const { container } = renderWithRouter(<SelectedKeywordList />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when cloudSelection is null', () => {
    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: [createMockPost()],
        cloudSelection: null,
      })
    );

    const { container } = renderWithRouter(<SelectedKeywordList />);
    expect(container.firstChild).toBeNull();
  });

  it('displays matching posts when cloudSelection matches post content', () => {
    const mockPosts = [
      createMockPost({
        id: '1',
        title: 'Test Title',
        selftext:
          'matching content matching matching matching matching matching matching matching matching matching matching',
      }),
      createMockPost({
        id: '2',
        title: 'Another Title',
        selftext: 'bleep bloop',
      }),
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: mockPosts,
        cloudSelection: 'matching',
      })
    );

    renderWithRouter(<SelectedKeywordList />);

    expect(screen.getByTestId('cloud-selection')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.queryByText('Another Title')).not.toBeInTheDocument();
  });

  it('displays media icon when post has media_metadata', () => {
    const mockPosts = [
      createMockPost({
        id: '1',
        title: 'Test Title',
        selftext: 'test content',
        media_metadata: { test: {} },
      }),
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: mockPosts,
        cloudSelection: 'test',
      })
    );

    renderWithRouter(<SelectedKeywordList />);
    expect(screen.getByTestId('media-icon')).toBeInTheDocument();
  });

  it('formats date correctly', () => {
    const mockPosts = [
      createMockPost({
        id: '1',
        title: 'Test Title',
        selftext: 'test content',
        created_utc: 1234567890,
      }),
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: mockPosts,
        cloudSelection: 'test',
      })
    );

    renderWithRouter(<SelectedKeywordList />);
    expect(screen.getByText('By testuser on 2023-01-01')).toBeInTheDocument();
  });

  // TODO: Wake up from vitest mocking nightmare...
  it.skip('truncates long selftext content', () => {
    const longText = 'a'.repeat(200);
    const mockPosts = [
      createMockPost({
        id: '1',
        title: 'Test Title',
        selftext: longText,
      }),
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: mockPosts,
        cloudSelection: 'test',
      })
    );

    renderWithRouter(<SelectedKeywordList />);
    expect(vi.mocked(truncateAtWordBoundary)).toHaveBeenCalledWith(
      longText,
      100
    );
  });

  it('renders correct link for each post', () => {
    const mockPosts = [
      createMockPost({
        id: '123',
        title: 'Test Title',
        selftext: 'test content',
      }),
    ];

    vi.mocked(usePostStore).mockImplementation((selector) =>
      selector({
        ...mockPostStore,
        posts: mockPosts,
        cloudSelection: 'test',
      })
    );

    renderWithRouter(<SelectedKeywordList />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/post/123');
  });
});
