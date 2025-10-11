import { useEffect, useRef, useState } from 'react';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useTabs,
} from '../../components/Tabs/Tabs';
import VideoList from '../../components/VideoList';
import topicService from '../../services/topic/topic.service';
import styles from './Discover.module.scss';
import Loading from '../../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function VideoTopic({ topics = [] }) {
  const { activeValue } = useTabs();
  const [postsByTopic, setPostsByTopic] = useState({});

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef(null);

  const updateScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    updateScrollPosition();
  }, [topics]);

  const fetchPosts = async (topicKey) => {
    try {
      const data = await topicService.getTopic(topicKey, 1, 18);
      setPostsByTopic((prev) => ({
        ...prev,
        [topicKey]: data.posts,
      }));
    } catch (error) {
      console.error('Failed to fetch posts for topic:', topicKey, error);
    }
  };

  useEffect(() => {
    if (activeValue && !postsByTopic[activeValue]) {
      fetchPosts(activeValue);
    }
  }, [activeValue]);

  if (topics.length === 0) return null;

  return (
    <>
      <div
        className={styles.DivCategoryListWrapper}
        style={{ top: '0px', width: '100%', zIndex: '10' }}
      >
        <div className={styles.DivCategoryListContainer}>
          <TabList>
            {canScrollLeft && (
              <div
                className={styles.DivArrowContainer}
                style={{ left: '0px' }}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollBy({
                      left: -150,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                <div className={styles.DivArrowIconContainer}>
                  <div className={styles.DivChevron}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </div>
                </div>
                <div className={styles.DivShadow}></div>
              </div>
            )}
            {canScrollRight && (
              <div
                className={styles.DivArrowContainer}
                onClick={() => {
                  if (scrollRef.current) {
                    scrollRef.current.scrollBy({
                      left: 150,
                      behavior: 'smooth',
                    });
                  }
                }}
              >
                <div className={styles.DivArrowIconContainer}>
                  <div className={styles.DivChevron}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </div>
                </div>
                <div className={styles.DivShadow}></div>
              </div>
            )}
            <div
              className={styles.DivCategoryList}
              ref={scrollRef}
              onScroll={updateScrollPosition}
            >
              {topics.map((t) => {
                const key = t.toLowerCase();
                return (
                  <Tab value={key} key={key}>
                    <div className={styles.ButtonCategoryItemContainer}>
                      <span className={styles.SpanCategoryName}>{t}</span>
                    </div>
                  </Tab>
                );
              })}
            </div>
          </TabList>
        </div>
      </div>

      <TabPanels>
        {topics.map((t) => {
          const key = t.toLowerCase();
          return (
            <TabPanel value={key} key={key}>
              {postsByTopic[key] ? (
                <VideoList variant="discover" videosData={postsByTopic[key]} />
              ) : (
                <Loading />
              )}
            </TabPanel>
          );
        })}
      </TabPanels>
    </>
  );
}

export default VideoTopic;
