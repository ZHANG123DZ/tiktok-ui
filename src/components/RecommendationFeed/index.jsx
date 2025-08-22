import NoticeCard from '../NoticeCard';
import UserInfo from '../UserInfo';
import VideoList from '../VideoList';

import styles from './RecommendationFeed.module.scss';

function RecommendationFeed() {
  const recommendUser = {
    id: 6,
    username: 'iran.vs.israel5',
    name: 'Iran vs Israel',
    avatar:
      'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-1.jpg',
    description: 'Tôi là chú mèo siu dễ thương',
    followers: 7607,
    isFollow: false,
  };

  return (
    <div className={styles.DivThreeColumnContainer}>
      <NoticeCard />
      <div className={styles.DivBlockContainer}>
        <div className={styles.DivTitleContainer}>
          <h2 data-e2e="search-top-user-title" className={styles.H2Title}>
            Users
          </h2>
        </div>
        <UserInfo user={recommendUser} showFollowButton />
      </div>

      <div className={styles.DivBlockContainer}>
        <div className={styles.DivTitleContainer}>
          <h2 data-e2e="search-top-video-title" className={styles.H2Title}>
            Videos
          </h2>
        </div>
        <VideoList variant="search" />
      </div>
    </div>
  );
}

export default RecommendationFeed;
