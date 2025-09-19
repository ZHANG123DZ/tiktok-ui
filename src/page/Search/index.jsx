import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '../../components/Tabs/Tabs';
import styles from './Search.module.scss';
import UserList from '../../components/UserList/UserList';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import VideoList from '../../components/VideoList';
import RecommendationFeed from '../../components/RecommendationFeed';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchService from '../../services/search/search.service';
//Call API
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
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const [resultSearch, setResultSearch] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await searchService.search(query);
      setResultSearch(res);
    };
    fetchData();
  }, [query]);

  return (
    <div className={styles.DivMainContainer} style={{ width: '100%' }}>
      <div className={styles.DivSearchContainer}>
        <Tabs defaultValue={'top'}>
          <TabList>
            <div className={styles.DivTabsContainer}>
              {/* Top */}
              <Tab value={'top'}>
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
              <Tab value={'user'}>
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
              <Tab value={'video'}>
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
              <Tab value={'live'}>
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
            </div>
          </TabList>
          <TabPanels>
            {/* Notify */}
            <TabPanel value={'top'}>
              <div className={styles.DivPanelContainer}>
                <div className={styles.DivPanelContainer}>
                  {resultSearch && <RecommendationFeed data={resultSearch} />}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={'user'}>
              <div className={styles.DivPanelContainer}>
                {resultSearch?.users && <UserList data={resultSearch?.users} />}
              </div>
            </TabPanel>
            <TabPanel value={'video'}>
              <div className={styles.DivPanelContainer}>
                {resultSearch?.posts && (
                  <div className={styles.DivPanelContainer}>
                    <VideoList
                      variant="search"
                      videosData={resultSearch?.posts}
                    />
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value={'live'}>
              <div className={styles.DivPanelContainer}>
                <div className={styles.DivPanelContainer}>
                  {resultSearch?.posts && (
                    <VideoList
                      variant="live"
                      videosData={resultSearch?.posts}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
}

export default Search;
