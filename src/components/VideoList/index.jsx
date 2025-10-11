import { useEffect, useRef, useState } from 'react';
import styles from './VideoList.module.scss';
import VideoCard from '../VideoCard';
import { useDispatch } from 'react-redux';
import { setListVideo, setPreUrl } from '../../features/video/listVideoSlice';
import { useLocation } from 'react-router-dom';

function VideoList({ variant = 'discover', videosData = [] }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [videos, setVideos] = useState(videosData);
  const videoRefs = useRef([]);

  useEffect(() => {
    setVideos(videosData);
  }, [videosData]);

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
            onClick={() => {
              dispatch(setPreUrl(location.pathname));
              dispatch(setListVideo(videos.map((v) => v.id)));
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoList;
