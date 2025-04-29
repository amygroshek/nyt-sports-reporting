import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { useEffect } from 'react';

import { Post } from './pages/Post';
import { PostList } from './pages/PostList';
// import { fetchRecentSportsArticles } from './services/postSearch/index';

import './App.css';

function App() {
  // useEffect(() => {
  //   fetchRecentSportsArticles(true);
  // }, []);

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
