import { describe, it, beforeEach, expect, vi } from 'vitest';
import { usePostStore } from './';
import { generateCloudSet } from '@/services/cloudSet';
import mockPosts from './__mocks__/posts.mock.json';

// Mock implementation of generateCloudSet
vi.mock('@/services/cloudSet', () => ({
  generateCloudSet: vi.fn(() => [{ text: 'mock', value: 1 }]),
}));

describe('usePostStore', () => {
  beforeEach(() => {
    usePostStore.setState(usePostStore.getInitialState());
  });

  it('sets posts and generates cloudSet', () => {
    usePostStore.getState().setPosts(mockPosts);
    const { posts, cloudSet } = usePostStore.getState();

    expect(posts).toEqual(mockPosts);
    expect(cloudSet).toEqual([{ text: 'mock', value: 1 }]);
    expect(generateCloudSet).toHaveBeenCalled();
  });

  it('gets post by ID', () => {
    usePostStore.getState().setPosts(mockPosts);
    const secondPostId = mockPosts[1].id;
    const secondPostTitle = mockPosts[1].title;
    const post = usePostStore.getState().getPostById(secondPostId);
    expect(post?.title).toBe(secondPostTitle);
  });

  it('sets cloudLoading state', () => {
    usePostStore.getState().setCloudLoading(false);
    expect(usePostStore.getState().cloudLoading).toBe(false);
  });

  it('sets cloudError', () => {
    usePostStore.getState().setCloudError('Something went wrong');
    expect(usePostStore.getState().cloudError).toBe('Something went wrong');
  });

  it('sets cloudSelection', () => {
    usePostStore.getState().setCloudSelection('battery');
    expect(usePostStore.getState().cloudSelection).toBe('battery');
  });
});
