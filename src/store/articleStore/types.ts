export type Article = {
  title: string;
  url: string;
  section: string;
  keywords: string[];
};

export type ArticleState = {
  articles: Article[];
  loading: boolean;
  fetchArticles: () => Promise<void>;
};
