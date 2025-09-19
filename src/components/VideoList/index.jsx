import { useRef, useState } from 'react';
import styles from './VideoList.module.scss';
import VideoCard from '../VideoCard';

function VideoList({ topic = 'all', variant = 'discover', videosData = [] }) {
  const [videos, setVideos] = useState(videosData);
  const videoRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState();

  const handleHover = (index) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) {
        v.pause();
        v.currentTime = 0;
      }
    });
    videoRefs.current[index]?.play();
    setActiveIndex(index);
  };

  return (
    <div className={styles.DivThreeColumnContainer}>
      <div className={styles.DivVideoFeedV2}>
        {videos.map((video, i) => (
          <VideoCard
            key={video.id}
            data={video}
            variant={variant}
            onHover={() => handleHover(i)}
            setRef={(el) => (videoRefs.current[i] = el)}
            currentIndex={i}
            activeIndex={activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoList;
