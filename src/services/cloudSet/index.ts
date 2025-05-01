import type { CloudSetItem } from '@/store/postStore/types';
import type { Post } from '@/types';
import { EXCLUDE_WORDS, MIN_WORD_COUNT, MIN_WORD_FREQUENCY } from './constants';

// Standardize and remove excluded words
export const cleanText = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter((word) => !EXCLUDE_WORDS.has(word) && word.length > MIN_WORD_COUNT) // Not present in excluded list and greater in length than 2 chars
    .join(' ');
};

export const generateCloudSet = (posts: Post[]) => {
  // Quick exit for not data.
  if (posts.length === 0) return [];

  // Construct a big string of titles and selftext
  let allText = '';
  posts.forEach((post: Post) => {
    allText += ' ' + cleanText(post.title) + ' ' + cleanText(post.selftext);
  });

  // Determine word frequencies, construct array of objects
  const words = allText.trim().split(/\s+/);

  const wordFreq: { [key: string]: number } = {};
  words.forEach((word) => {
    if (word) {
      // Start from zero if no frequency yet set. Otherwise increment.
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Convert to react-wordcloud format
  const cloudSetData: CloudSetItem[] = Object.entries(wordFreq)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, freq]) => freq > MIN_WORD_FREQUENCY)
    .map(([word, freq]) => {
      return {
        value: word,
        count: freq,
      };
    });

  return cloudSetData;
};
