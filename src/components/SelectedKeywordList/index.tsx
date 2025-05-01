import { Link } from 'react-router-dom';
import { SiSlickpic } from 'react-icons/si';

import { usePostStore } from '@/store/postStore';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { truncateAtWordBoundary } from '@/utils/truncateAtWordBoundary';

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
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl text-bold font-cabin-sketch-regular text-primary mb-4">
        Selected keyword:{' '}
        <span className="italic text-vangreen" data-testid="cloud-selection">
          {cloudSelection}
        </span>
      </h2>

      <ul className="space-y-4 selected-keyword-list">
        {displayPosts?.length > 0 &&
          displayPosts?.map((item) => {
            return (
              <li
                key={`item-${item.id}`}
                className="bg-vantan p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Link to={`/post/${item.id}`} className="block">
                  <div className="title font-bold text-2xl text-primary font-cabin-sketch-regular mb-1">
                    {item.title}
                  </div>
                  <div
                    className={`meta text-2xl text-vantext mb-2 font-reenie-beanie-regular`}
                  >
                    {`By ${item.author} on ${getFormattedDate(item.created_utc)}`}
                    {item.media_metadata && (
                      <SiSlickpic className="inline ml-2 text-xl" />
                    )}
                  </div>
                  <p className="text-vantext">
                    {truncateAtWordBoundary(item.selftext, 100)}
                  </p>
                </Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};
