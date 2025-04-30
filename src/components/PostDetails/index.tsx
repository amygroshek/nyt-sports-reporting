import type { Post } from '@/types';
import { cleanHtml, getFormattedDate } from '@/utils';
import { ResponsiveImageList } from '@/components/ResponsiveImageList';

export const PostDetails = ({ post }: { post: Post }) => {
  return (
    <div className="post-details">
      <div className="title">{post.title}</div>
      <div className="meta">{`By ${post.author} on ${getFormattedDate(post.created_utc)}`}</div>
      <div
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
