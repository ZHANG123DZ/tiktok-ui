import { Tabs } from '../../components/Tabs/Tabs';
import styles from './Discover.module.scss';
import topicService from '../../services/topic/topic.service';
import { useEffect, useState } from 'react';
import VideoTopic from './VideoTopic';
//Call API
function Discover() {
  const [topics, setTopics] = useState([]);
  const fetchTopics = async () => {
    const topicsData = await topicService.getAll();
    setTopics(topicsData.map((t) => t.name));
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div
      className={styles['DivShareLayoutBase-StyledShareLayoutV2-ExploreLayout']}
    >
      <div className={styles.DivShareLayoutContentV2}>
        <Tabs defaultValue={'all'}>
          {topics && <VideoTopic topics={topics} />}
        </Tabs>
        {/* DivCategoryListWrapper */}

        {/* DivThreeColumnContainer */}
      </div>
    </div>
  );
}

export default Discover;
