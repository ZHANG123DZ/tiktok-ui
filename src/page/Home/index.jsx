import styles from './Home.module.scss';
import { getPosts } from '../../services/Posts/posts.service';
import { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { ArticleProvider } from '../../contexts/ArticleContext';
import CommentTab from '../../components/CommentTab';
import { DrawerProvider } from '../../contexts/DrawerContext';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';

const mockPosts = [
  {
    id: 5,
    video: video2,
    slug: 'hot-search-video',
    thumbnail: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    likes: 490,
    comments: 45,
    bookMarks: 45,
    share: 12,
    isLiked: true,
    isBookMarked: false,
    isFollow: false,
    music: {
      slug: 'hello',
      name: 'Video này hot vc',
      poster: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
      source: video2,
    },
    author: {
      id: 7,
      username: 'tinnongmoingay08',
      name: 'Hello Kitty',
      avatar: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    },
    tags: [
      { slug: 'theanh28news', name: 'theanh2t8news' },
      { slug: 'skibidi', name: 'skibidi' },
      { slug: 'theanhs28news', name: 'theanh28ntews' },
    ],
    location: 'Hanoi',
  },
  {
    id: 6,
    video: video3,
    slug: 'hot-search-video',
    thumbnail: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    likes: 490,
    comments: 45,
    bookMarks: 45,
    share: 12,
    isLiked: true,
    isBookMarked: true,
    isFollow: true,
    music: {
      slug: 'hello',
      name: 'Video này hot vc',
      poster: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    },
    author: {
      id: 4,
      username: 'tinnongmoingay08',
      name: 'Hello Kitty',
      avatar: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    },
    tags: [
      { slug: 'theanh28news', name: 'theanh28tenews' },
      { slug: 'skibidi', name: 'skibidi' },
      { slug: 'theanh28rnews', name: 'theanh28ntews' },
    ],
  },
  {
    id: 7,
    video: video4,
    slug: 'hot-search-video',
    thumbnail: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    likes: 490,
    comments: 45,
    bookMarks: 45,
    share: 12,
    isLiked: true,
    isBookMarked: true,
    isFollow: false,
    music: {
      slug: 'hello',
      name: 'Video này hot vc',
      poster: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    },
    author: {
      id: 4,
      username: 'tinnongmoingay08',
      name: 'Hello Kitty',
      avatar: 'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
    },
    tags: [
      { slug: 'theanh28news', name: 'theanh28tenews' },
      { slug: 'skibidi', name: 'skibidi' },
      { slug: 'theanh28rnews', name: 'theanh28ntews' },
    ],
  },
];

const mockComments = [{}];

function Home() {
  //Comments
  const [activeComments, setActiveComments] = useState(false);
  const [comments, setComments] = useState(mockComments);
  //CurrentPost
  const [currentPost, setCurrentPost] = useState(null);

  return (
    <main className={styles.DivMainContainer}>
      <div className={styles.DivColumnListContainer}>
        {mockPosts.map((post) => (
          <ArticleProvider
            key={post.id}
            data={post}
            setActiveComments={setActiveComments}
            activeComments={activeComments}
            setPost={setCurrentPost}
          />
        ))}
      </div>
      <DrawerProvider isActive={activeComments} setActive={setActiveComments}>
        {currentPost && <CommentTab postId={currentPost.id} />}
      </DrawerProvider>
    </main>
  );
}

export default Home;
