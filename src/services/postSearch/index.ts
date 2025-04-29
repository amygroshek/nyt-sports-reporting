// 1. Fetch last 100 posts	GET https://www.reddit.com/r/vanlife/new.json?limit=100	No auth
// 2. Build word cloud	Extract title + selftext from each post	Use local processing
// 3. User selects word	Filter memory OR new search
// 4. Fetch search results	GET https://www.reddit.com/r/vanlife/search.json?q={word}&restrict_sr=1&sort=relevance

// src/hooks/useRedditApi.ts
import { usePostStore } from '@/store/postStore';
import { useShallow } from 'zustand/shallow';

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
    console.log('fetchLatestPosts');
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

      // author: 'KingDusty72';
      // category: null;
      // clicked: false;
      // content_categories: null;
      // contest_mode: false;
      // created: 1745889675;
      // created_utc: 1745889675;
      // discussion_type: null;
      // distinguished: null;
      // domain: 'self.VanLife';
      // downs: 0;
      // id: '1kac2r8';
      // is_created_from_ads_ui: false;
      // is_crosspostable: false;
      // is_meta: false;
      // is_original_content: false;
      // is_reddit_media_domain: false;
      // is_robot_indexable: true;
      // is_self: true;
      // is_video: false;
      // likes: null;
      // media: null;
      // media_embed: {
      // }
      // num_comments: 0;
      // num_crossposts: 0;
      // num_reports: null;
      // over_18: false;
      // permalink: '/r/VanLife/comments/1kac2r8/battery_fan_issue/';
      // pinned: false;
      // secure_media: null;
      // secure_media_embed: {
      // }
      // selftext: 'I have been getting the green beeps on my Maxair fan for a bit now. Based on a different post on this sub I installed a 12v controller - after doing that the fan could not turn on at all. \n\nI bought a new motherboard, still could not run at all without beeps even at lowest speed. \n\nRemoved controller, now can run from levels 1-4, but beep above 4. Am noticing pretty significant voltage drops as I increase load. Specifically:\n\nOff - 12.8\n1 - 12.75\n2 - 12.65\n3 - 12.5\n4 - 12.3\n5 - green lights of death. \n\n\nIs this a battery issue? Battery is roughly 4 yo.\nIs that much decrease in voltage common?\n\nThanks for the help. Frustrated and hot. \n\n';
      // selftext_html: '&lt;!-- SC_OFF --&gt;&lt;div class="md"&gt;&lt;p&gt;I have been getting the green beeps on my Maxair fan for a bit now. Based on a different post on this sub I installed a 12v controller - after doing that the fan could not turn on at all. &lt;/p&gt;\n\n&lt;p&gt;I bought a new motherboard, still could not run at all without beeps even at lowest speed. &lt;/p&gt;\n\n&lt;p&gt;Removed controller, now can run from levels 1-4, but beep above 4. Am noticing pretty significant voltage drops as I increase load. Specifically:&lt;/p&gt;\n\n&lt;p&gt;Off - 12.8\n1 - 12.75\n2 - 12.65\n3 - 12.5\n4 - 12.3\n5 - green lights of death. &lt;/p&gt;\n\n&lt;p&gt;Is this a battery issue? Battery is roughly 4 yo.\nIs that much decrease in voltage common?&lt;/p&gt;\n\n&lt;p&gt;Thanks for the help. Frustrated and hot. &lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;';
      // subreddit: 'VanLife';
      // subreddit_id: 't5_2wii5';
      // subreddit_name_prefixed: 'r/VanLife';
      // subreddit_subscribers: 278222;
      // subreddit_type: 'public';
      // thumbnail: 'self';
      // thumbnail_height: null;
      // thumbnail_width: null;
      // title: 'Battery/ fan issue';
      // ups: 1;
      // upvote_ratio: 1;
      // url: 'https://www.reddit.com/r/VanLife/comments/1kac2r8/battery_fan_issue/';
      const posts = data.data.children.map((item: any) => item.data);
      console.log('posts: ', posts);
      setPosts(posts);

      setCloudError(null);
    } catch (error: unknown) {
      setCloudError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setCloudLoading(false);
    }
  };

  // const searchPosts = async (subreddit: string, query: string) => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `${BASE_URL}/r/${subreddit}/search.json?q=${encodeURIComponent(query)}&restrict_sr=1&sort=relevance&limit=50`,
  //       {
  //         headers: {
  //           'User-Agent': 'vanlife-wordcloud-app/0.1 by yourusername',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to search posts');
  //     }

  //     const data = await response.json();
  //     const results = data.data.children.map((child: any) => ({
  //       id: child.data.id,
  //       title: child.data.title,
  //       selftext: child.data.selftext,
  //       permalink: child.data.permalink,
  //     }));

  //     setSearchResults(results);
  //     setError(null);
  //   } catch (error: any) {
  //     setError(error.message || 'Unknown error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return {
    fetchLatestPosts,
    // searchPosts,
  };
};
