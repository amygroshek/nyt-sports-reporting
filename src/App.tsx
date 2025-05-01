import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { Post } from './pages/Post';
import { PostList } from './pages/PostList';
import { useRedditApi } from '@/services/postSearch';

function App() {
  const { fetchLatestPosts } = useRedditApi();
  useEffect(() => {
    fetchLatestPosts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
