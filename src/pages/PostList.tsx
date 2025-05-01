import { ErrorBoundary } from 'react-error-boundary';

import { Fallback } from '@/components/Fallback';
import { WordCloud } from '@/components/WordCloud';
import { SelectedKeywordList } from '@/components/SelectedKeywordList';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';

export const PostList = () => {
  return (
    <Layout showNav={false}>
      <Header />

      <ErrorBoundary FallbackComponent={Fallback}>
        <WordCloud />
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={Fallback}>
        <SelectedKeywordList />
      </ErrorBoundary>
    </Layout>
  );
};
