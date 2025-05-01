import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRedditApi } from './index';
import { usePostStore } from '@/store/postStore';

// Mock the store module
vi.mock('@/store/postStore', () => ({
  usePostStore: vi.fn((selector) => {
    // Create mock store state and functions
    const store = {
      posts: [],
      setPosts: vi.fn(),
      cloudLoading: false,
      setCloudLoading: vi.fn(),
      cloudError: null,
      setCloudError: vi.fn(),
    };
    // Return the selected value from the store
    return selector(store);
  }),
}));

const mockPost = {
  id: '1',
  name: 't3_1',
  created_utc: 1745961029,
  author: 'testuser',
  media: null,
  media_embed: null,
  num_comments: 3,
  permalink: '/r/vanlife/comments/1',
  selftext: 'Test post',
  selftext_html: '<p>Test post</p>',
  subreddit: 'vanlife',
  subreddit_id: 't5_vanlife',
  subreddit_subscribers: 123456,
  subreddit_type: 'public',
  thumbnail: 'https://example.com/image.jpg',
  thumbnail_height: 100,
  thumbnail_width: 100,
  title: 'Van life rules',
  ups: 100,
  upvote_ratio: 0.95,
  url: 'https://reddit.com/r/vanlife/comments/1',
  media_metadata: {},
};

describe('useRedditApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches and sets posts on success', async () => {
    const jsonMock = vi.fn().mockResolvedValue({
      data: {
        children: [{ data: mockPost }],
      },
    });

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: jsonMock,
      })
    );

    const { fetchLatestPosts } = useRedditApi();
    await fetchLatestPosts();

    // Get the mock functions from the last calls to usePostStore
    const setPosts = vi.mocked(usePostStore).mock.results[0].value;
    const setCloudLoading = vi.mocked(usePostStore).mock.results[1].value;
    const setCloudError = vi.mocked(usePostStore).mock.results[2].value;

    expect(setCloudLoading).toHaveBeenCalledWith(true);
    expect(setPosts).toHaveBeenCalledWith([mockPost]);
    expect(setCloudError).toHaveBeenCalledWith(null);
    expect(setCloudLoading).toHaveBeenCalledWith(false);
  });

  it('handles fetch failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    const { fetchLatestPosts } = useRedditApi();
    await fetchLatestPosts();

    const setCloudError = vi.mocked(usePostStore).mock.results[2].value;
    expect(setCloudError).toHaveBeenCalledWith('Failed to fetch posts');
  });

  it('handles fetch throwing error', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockRejectedValue(new Error('Network error'))
    );

    const { fetchLatestPosts } = useRedditApi();
    await fetchLatestPosts();

    const setCloudError = vi.mocked(usePostStore).mock.results[2].value;
    expect(setCloudError).toHaveBeenCalledWith('Network error');
  });
});
