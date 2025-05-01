import { describe, it, expect } from 'vitest';
import { generateCloudSet, cleanText } from './index';
import type { Post } from '@/types';

describe('cleanText', () => {
  it('converts text to lowercase', () => {
    expect(cleanText('MAGNIFICENT')).toBe('magnificent');
  });

  it('removes punctuation', () => {
    expect(cleanText('magnificent, munchkins!')).toBe('magnificent munchkins');
  });

  it('removes words shorter than 6 characters', () => {
    expect(cleanText('the cat jumped over something')).toBe('jumped something');
  });

  it('removes excluded words from the constant list', () => {
    expect(cleanText('because through everything something')).toBe('something');
  });

  it('handles empty string', () => {
    expect(cleanText('')).toBe('');
  });

  it('handles string with only excluded words', () => {
    expect(cleanText('the and or because')).toBe('');
  });

  it('handles multiple spaces and special characters', () => {
    expect(cleanText('hello    world!!!   testing')).toBe('testing');
  });
});

describe('generateCloudSet', () => {
  const createMockPost = (title: string, selftext: string): Post => ({
    title,
    selftext,
    id: '1',
    name: 't3_1',
    created_utc: 1234567890,
    author: 'testuser',
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
    media_metadata: {},
  });

  it('returns empty array for empty posts array', () => {
    expect(generateCloudSet([])).toEqual([]);
  });

  it('generates correct word frequencies from single post', () => {
    const posts = [
      createMockPost(
        'testing testing testing testing testing something interesting interesting',
        'testing another interesting concept interesting interesting interesting interesting interesting'
      ),
    ];

    const result = generateCloudSet(posts);

    expect(result).toContainEqual({
      value: 'testing',
      count: 6,
    });
    expect(result).toContainEqual({
      value: 'interesting',
      count: 8,
    });
  });

  it('filters out words with frequency <= 5', () => {
    const posts = [
      createMockPost('testing', 'testing'),
      createMockPost('something', 'something'),
    ];

    const result = generateCloudSet(posts);
    // Since each word appears only twice, result should be empty
    expect(result).toEqual([]);
  });

  it('combines frequencies across title and selftext', () => {
    const posts = [
      createMockPost(
        'interesting interesting interesting',
        'interesting interesting interesting'
      ),
    ];

    const result = generateCloudSet(posts);
    expect(result).toContainEqual({
      value: 'interesting',
      count: 6,
    });
  });

  it('handles posts with empty title or selftext', () => {
    const posts = [
      createMockPost('', 'interesting interesting interesting'),
      createMockPost('interesting interesting interesting', ''),
    ];

    const result = generateCloudSet(posts);
    expect(result).toContainEqual({
      value: 'interesting',
      count: 6,
    });
  });

  it('handles special characters and mixed case', () => {
    const posts = [
      createMockPost(
        'INTERESTING! interesting, InTeReStInG.',
        'interesting!!! INTERESTING interesting'
      ),
    ];

    const result = generateCloudSet(posts);
    expect(result).toContainEqual({
      value: 'interesting',
      count: 6,
    });
  });
});
