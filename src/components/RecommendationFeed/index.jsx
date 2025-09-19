import { useEffect, useState } from 'react';
import NoticeCard from '../NoticeCard';
import UserInfo from '../UserInfo';
import VideoList from '../VideoList';

import styles from './RecommendationFeed.module.scss';

function RecommendationFeed({ data }) {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setPosts(data?.posts || []);
    setUsers(data?.users || []);
  }, [data?.posts, data?.users]);

  return (
    <div className={styles.DivThreeColumnContainer}>
      <NoticeCard />
      {users.length > 0 && (
        <div className={styles.DivBlockContainer}>
          <div className={styles.DivTitleContainer}>
            <h2 data-e2e="search-top-user-title" className={styles.H2Title}>
              Users
            </h2>
          </div>
          <UserInfo user={users[0]} showFollowButton showBio showFollowers />
        </div>
      )}

      {posts.length > 0 && (
        <div className={styles.DivBlockContainer}>
          <div className={styles.DivTitleContainer}>
            <h2 data-e2e="search-top-video-title" className={styles.H2Title}>
              Videos
            </h2>
          </div>
          <VideoList variant="search" videosData={posts} />
        </div>
      )}
    </div>
  );
}

export default RecommendationFeed;
