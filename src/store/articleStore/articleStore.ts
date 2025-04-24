import { create } from "zustand";

import type { ArticleState } from "./types";

export const useArticleStore = create<ArticleState>((set) => ({
  articles: [],
  loading: false,
  fetchArticles: async () => {},
}));