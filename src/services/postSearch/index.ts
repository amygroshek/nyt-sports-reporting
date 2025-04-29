// 1. Fetch last 100 posts	GET https://www.reddit.com/r/vanlife/new.json?limit=100	No auth
// 2. Build word cloud	Extract title + selftext from each post	Use local processing
// 3. User selects word	Filter memory OR new search
// 4. Fetch search results	GET https://www.reddit.com/r/vanlife/search.json?q={word}&restrict_sr=1&sort=relevance

// src/hooks/useRedditApi.ts
import { usePostStore } from '@/store/postStore';
import { useShallow } from 'zustand/shallow';

import type { ApiError } from '@/services/types';
import { REDDIT_BASE_URL, REDDIT_SUBREDDIT } from './constants';

export const useRedditApi = () => {
  const { setPosts, setCloudSet, setCloudLoading, setCloudError } =
    usePostStore(
      useShallow((state) => ({
        setPosts: state.setPosts,
        setCloudSet: state.setCloudSet,
        setCloudLoading: state.setCloudLoading,
        setCloudError: state.setCloudError,
      }))
    );

  const fetchLatestPosts = async (limit = 100): Promise<void> => {
    setCloudLoading(true);
    try {
      const response = await fetch(
        `${REDDIT_BASE_URL}/r/${REDDIT_SUBREDDIT}/new.json?limit=${limit}`,
        {
          headers: {
            'User-Agent': 'vanlife-wordcloud-app/0.1 by brokenindexfinger', // Reddit etiquette
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const posts = data.data.children.map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        selftext: child.data.selftext,
        permalink: child.data.permalink,
      }));

      setPosts(posts);
      setCloudError(null);
    } catch (error: ApiError) {
      setCloudError(error.message || 'Unknown error');
    } finally {
      setCloudLoading(false);
    }
  };

  const searchPosts = async (subreddit: string, query: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=relevance&limit=50`,
        {
          headers: {
            'User-Agent': 'vanlife-wordcloud-app/0.1 by yourusername',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to search posts');
      }

      const data = await response.json();
      const results = data.data.children.map((child: any) => ({
        id: child.data.id,
        title: child.data.title,
        selftext: child.data.selftext,
        permalink: child.data.permalink,
      }));

      setSearchResults(results);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchLatestPosts,
    searchPosts,
  };
};
