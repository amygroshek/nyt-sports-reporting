import { useParams } from 'react-router-dom';
import { usePostStore } from '@/store/postStore';
import { PostDetails } from '@/components/PostDetails';

import { Layout } from '@/components/Layout';

export const Post = () => {
  const { id } = useParams();
  const post = usePostStore((state) => state.getPostById(id!));

  return (
    <Layout showNav>
      {post && post?.selftext_html && <PostDetails post={post} />}
    </Layout>
  );
};


