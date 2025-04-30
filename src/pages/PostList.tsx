import { WordCloud } from '@/components/WordCloud';
import { SelectedKeywordList } from '@/components/SelectedKeywordList';

export const PostList = () => {
  return (
    <div>
      <h1>Van Life Word Cloud</h1>
      <p>What's being discussed on Subreddit VanLife?</p>
      <p>
        Select a word from the wordcloud below to see a list of relevant posts.
      </p>
      <WordCloud />
      <SelectedKeywordList />
    </div>
  );
};
