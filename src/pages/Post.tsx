import { useParams } from 'react-router-dom';

export const Post = () => {
  const { id } = useParams();
  return <div>Post ID: {id}</div>;
};
