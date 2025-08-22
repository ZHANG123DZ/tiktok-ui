import { Tab, TabList, TabPanels, Tabs } from '../../components/Tabs/Tabs';
import styles from './Search.module.scss';
import UserList from '../../components/UserList/UserList';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import VideoList from '../../components/VideoList';
import RecommendationFeed from '../../components/RecommendationFeed';

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

function Search() {
  const postsLive = mockPosts;

  return (
    <div className={styles.DivMainContainer} style={{ width: '100%' }}>
      <div className={styles.DivSearchContainer}>
        <Tabs>
          <TabList className={styles.DivTabsContainer}>
            {/* Top */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_top"
                  aria-controls="tabs-0-panel-search_top"
                >
                  Top
                </div>
              </div>
            </Tab>
            {/* User */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_user"
                  aria-controls="tabs-0-panel-search_user"
                >
                  Người dùng
                </div>
              </div>
            </Tab>
            {/* Video */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_video"
                  aria-controls="tabs-0-panel-search_video"
                >
                  Video
                </div>
              </div>
            </Tab>
            {/* LIVE */}
            <Tab>
              <div
                data-e2e="tab-item"
                className={styles['DivTab']}
                style={{
                  justifyContent: 'flex-start',
                  width: 'auto',
                  paddingRight: '80px',
                }}
              >
                <div
                  role="tab"
                  tabIndex={0}
                  aria-selected="true"
                  id="tabs-0-tab-search_live"
                  aria-controls="tabs-0-panel-search_live"
                >
                  LIVE
                </div>
              </div>
            </Tab>
          </TabList>
          <TabPanels>
            {/* Notify */}
            <div className={styles.DivPanelContainer}>
              <div className={styles.DivPanelContainer}>
                <RecommendationFeed />
              </div>
            </div>
            <div className={styles.DivPanelContainer}>
              <UserList />
            </div>
            <div className={styles.DivPanelContainer}>
              <div className={styles.DivPanelContainer}>
                <VideoList variant="search" />
              </div>
            </div>
            <div className={styles.DivPanelContainer}>
              <div className={styles.DivPanelContainer}>
                <VideoList variant="live" />
              </div>
            </div>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default Search;
