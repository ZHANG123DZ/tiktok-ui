import styles from './Home.module.scss';
import { getPosts } from '../../services/Posts/posts.service';
import { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { ArticleProvider } from '../../contexts/ArticleContext';
import CommentTab from '../../components/CommentTab';
import { DrawerProvider } from '../../contexts/DrawerContext';

import socketClient from '../../utils/socketClient';
function Home() {
  //Comments
  const [activeComments, setActiveComments] = useState(false);
  //CurrentPost
  const [currentPost, setCurrentPost] = useState(null);
  //Posts
  const [posts, setPosts] = useState([]);

  //Cơ chế đảo  bài viết ngẫu nhiên => sau này sẽ sửa thành một thuật toán phân phối người dùng
  const shufflePosts = useCallback((posts) => {
    const shuffled = [...posts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const data = await getPosts();
      const postsData = shufflePosts(data.data);
      setPosts(postsData);
    };

    getData();
  }, [shufflePosts]);

  useEffect(() => {
    const channel = socketClient.subscribe('k12');
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <main className={styles.DivMainContainer}>
      <div className={styles.DivColumnListContainer}>
        {posts.map((postData) => (
          <div key={postData.id} className={styles.DivArticle}>
            <ArticleProvider
              data={postData}
              setActiveComments={setActiveComments}
              activeComments={activeComments}
              setPost={setCurrentPost}
            />
          </div>
        ))}

        {/* Comment */}
      </div>
      <DrawerProvider isActive={activeComments}>
        {currentPost && <CommentTab post_id={currentPost.id} />}
      </DrawerProvider>
    </main>
  );
}

export default Home;
