export type Post = {
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

export type CloudSetItem = {
  value: string;
  count: number;
};

export type PostState = {
  cloudError: string | null;
  setCloudError: (val: string | null) => void;
  cloudLoading: boolean;
  setCloudLoading: (val: boolean) => void;
  cloudSet: CloudSetItem[];
  setCloudSet: (data: CloudSetItem[]) => void;
  cloudSelection: string | null;
  setCloudSelection: (word: string | null) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
};
