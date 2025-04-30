export type Post = {
  name: string;
  id: string;
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
  media_metadata: RedditMediaMetadata;
};



export interface RedditImagePreview {
  x: number;
  y: number;
  u: string;
}

export interface RedditImage {
  e: 'Image'; // type of media
  id: string;
  m: string; // MIME type like 'image/jpg'
  p: RedditImagePreview[]; // preview sizes
  s: {
    u: string; // full-size image URL
    x: number;
    y: number;
  };
  status: 'valid' | 'failed' | string;
}

export interface RedditMediaMetadata {
  [mediaId: string]: RedditImage;
}

export type RedditPost = {
  data: Post;
};

export type RedditApiResponse = {
  data: {
    children: RedditPost[];
  };
};
