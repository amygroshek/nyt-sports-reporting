import { create } from "zustand";

import type { Article, ArticleState } from "./types";

export const useArticleStore = create<ArticleState>((set) => ({
articles: [],
loading: false,

}))