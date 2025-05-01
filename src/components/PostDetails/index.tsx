import { clsx } from 'clsx';

import type { Post } from '@/types';
import { cleanHtml, getFormattedDate } from '@/utils';
import { ResponsiveImageList } from '@/components/ResponsiveImageList';
import styles from './PostDetails.module.scss';

export const PostDetails = ({ post }: { post: Post }) => {
  return (
    <div className="post-details max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="title text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-cabin-sketch text-primary mb-6 xl:leading-13">
        {post.title}
      </div>
      <div className="meta text-2xl sm:text-2xl md:text-4xl  text-bold text-vantext font-reenie-beanie-regular mb-4">{`By ${post.author} on ${getFormattedDate(post.created_utc)}`}</div>
      <div
        className={clsx(
          'prose',
          'prose-sm',
          'max-w-none',
          'font-open-sans',
          'text-vantext',
          styles.dangerousInnerHtml
        )}
        dangerouslySetInnerHTML={{
          __html: cleanHtml(post!.selftext_html!),
        }}
      ></div>
      {post!.media_metadata && (
        <ResponsiveImageList mediaMetadata={post.media_metadata} />
      )}
    </div>
  );
};
