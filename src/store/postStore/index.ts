import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { generateCloudSet } from '@/services/cloudSet';

import type { PostState, Post, CloudSetItem } from './types';

export const usePostStore = create<PostState>()(
  immer((set) => ({
    posts: [],
    setPosts: (posts: Post[]) => {
      set(() => ({
        posts,
        cloudSet: generateCloudSet(posts),
      }));
    },
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
