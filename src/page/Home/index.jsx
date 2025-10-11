import styles from './Home.module.scss';
import postService from '../../services/post/post.service';
import { useEffect } from 'react';
import { useState } from 'react';
import { ArticleProvider } from '../../contexts/ArticleContext';
import CommentTab from '../../components/CommentTab';
import { DrawerProvider } from '../../contexts/DrawerContext';
import InfiniteScroller from '../../components/InfiniteScroll';

const mockComments = [{}];

function Home() {
  //Comments
  const [activeComments, setActiveComments] = useState(false);
  const [comments, setComments] = useState(mockComments);
  //CurrentPost
  const [currentPost, setCurrentPost] = useState(null);

  const LIMIT = 5;

  // Infinite scroll fetcher
  const fetchPosts = async ({ cursor }) => {
    const page = cursor || Math.ceil(Math.random() * 10); // nếu chưa có cursor thì bắt đầu từ 1
    try {
      const data = await postService.getPosts(page, LIMIT);
      return {
        data,
        hasMore: data.length === LIMIT,
        nextCursor: page + 1,
      };
    } catch (err) {
      console.error('Lỗi khi fetch posts:', err);
      return {
        data: [],
        hasMore: false,
        nextCursor: null,
      };
    }
  };

  return (
    <main className={styles.DivMainContainer}>
      <div className={styles.DivColumnListContainer}>
        <InfiniteScroller
          fetchData={fetchPosts}
          className={styles.DivColumnListContainer}
          extractKey={(post) => post.id}
          renderItem={(post) => (
            <ArticleProvider
              key={post.id}
              data={post}
              setActiveComments={setActiveComments}
              activeComments={activeComments}
              setPost={setCurrentPost}
            />
          )}
        />
      </div>
      <DrawerProvider isActive={activeComments} setActive={setActiveComments}>
        {currentPost && <CommentTab postId={currentPost.id} />}
      </DrawerProvider>
    </main>
  );
}

export default Home;
