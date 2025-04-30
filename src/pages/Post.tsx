import { useParams } from 'react-router-dom';
import { usePostStore } from '@/store/postStore';
import { PostDetails } from '@/components/PostDetails';

export const Post = () => {
  const { id } = useParams();
  const post = usePostStore((state) => state.getPostById(id!));

  return (
    <div>{post && post?.selftext_html && <PostDetails post={post} />}</div>
  );
};


