import type { Post } from '@/types';

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
  getPostById: (id: string) => Post | undefined;
};
