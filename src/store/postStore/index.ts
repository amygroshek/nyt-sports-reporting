import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { generateCloudSet } from '@/services/cloudSet';
import type { Post } from '@/types';

import type { PostState, CloudSetItem } from './types';

export const usePostStore = create<PostState>()(
  immer((set, get) => ({
    posts: [],
    setPosts: (posts: Post[]) => {
      set(() => ({
        posts,
        cloudSet: generateCloudSet(posts),
      }));
    },
    getPostById: (id: string) =>
      get().posts.find((post: Post) => post.id === id),
    postsLoading: true,
    postsError: null,
    cloudLoading: true,
    setCloudLoading: (val: boolean) => set({ cloudLoading: val }),
    cloudSet: [],
    setCloudSet: (data: CloudSetItem[]) => set({ cloudSet: data }),
    cloudError: null,
    setCloudError: (val: string | null) => set({ cloudError: val }),
    cloudSelection: null,
    setCloudSelection: (word: string | null) => set({ cloudSelection: word }),
  }))
);
