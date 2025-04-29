import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { generateCloudSet } from '@/services/cloudSet';

import type { PostState, Post, CloudSetItem } from './types';

// const data = [
//   { value: 'JavaScript', count: 38 },
//   { value: 'React', count: 30 },
//   { value: 'Nodejs', count: 28 },
//   { value: 'Express.js', count: 25 },
//   { value: 'HTML5', count: 33 },
//   { value: 'MongoDB', count: 18 },
//   { value: 'CSS3', count: 20 },
// ];

export const usePostStore = create<PostState>()(
  immer((set) => ({
    posts: [],
    // setPosts: (posts: Post[]) => set({ posts: posts }),
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
