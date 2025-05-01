import { WordCloud } from '@/components/WordCloud';
import { SelectedKeywordList } from '@/components/SelectedKeywordList';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';

export const PostList = () => {
  return (
    <Layout showNav={false}>
      <Header />
      <WordCloud />
      <SelectedKeywordList />
    </Layout>
  );
};


