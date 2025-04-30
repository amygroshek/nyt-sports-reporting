export type RedditPost = {
  data: {
    created_utc: number; // UNIX timestamp
    author: string;
    media: unknown;
    media_embed: unknown;
    num_comments: number;
    permalink: string;
    selftext: string;
    selftext_html: string;
    subreddit: string;
    subreddit_id: string;
    subreddit_subscribers: number;
    subreddit_type: string;
    thumbnail: string;
    thumbnail_height: number;
    thumbnail_width: number;
    title: string;
    ups: number;
    upvote_ratio: number;
    url: string;
  };
};

export type RedditApiResponse = {
  data: {
    children: RedditPost[];
  };
};
