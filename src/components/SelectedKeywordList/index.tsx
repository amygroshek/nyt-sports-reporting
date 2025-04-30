import { Link } from 'react-router-dom';

import { usePostStore } from '@/store/postStore';
import { getFormattedDate, truncateAtWordBoundary } from '@/utils';

export const SelectedKeywordList = () => {
  const posts = usePostStore((state) => state.posts);
  const cloudSelection = usePostStore((state) => state.cloudSelection);

  // Quick exit for no data.
  if (posts.length === 0 || !cloudSelection) return null;

  const displayPosts = posts.filter((post) => {
    const postConcat = `${post.title + ' ' + post.selftext}`;
    return postConcat.indexOf(cloudSelection) > -1 && postConcat.length > 0;
  });

  // Return a list of items
  // Each one is a link to a details page
  return (
    <>
      <h2>{`Selected keyword: ${cloudSelection}`}</h2>
      <ul>
        {displayPosts?.length > 0 &&
          displayPosts?.map((item) => {
            return (
              <li key={item.subreddit_id}>
                <Link to={`/post/${item.id}`}>
                  <div className="title">{item.title}</div>
                  <div className="meta">{`By ${item.author} on ${getFormattedDate(item.created_utc)}`}</div>
                  <span>{truncateAtWordBoundary(item.selftext, 100)}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};
