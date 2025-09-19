import { useRef, useState } from 'react';
import VideoSimple from '../VideoSimple';
import styles from './VideoSimpleList.module.scss';
import video from '/public/Download (3).mp4';
//Call API
function VideoSimpleList() {
  const dataVideos = [
    {
      id: 5,
      thumbnail:
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-1.jpg',
      video: video,
      views: 6000,
    },
    {
      id: 6,
      thumbnail:
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-1.jpg',
      video: video,
      views: 300,
    },
    {
      id: 7,
      thumbnail:
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-1.jpg',
      video: video,
      views: 31000,
    },
    {
      id: 8,
      thumbnail:
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/05/anh-cho-hai-1.jpg',
      video: video,
      views: 3000,
    },
  ];
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState();

  const handleHover = (index) => {
    videoRefs.current.forEach((v, i) => {
      if (i !== index && v) {
        v.pause();
        v.currentTime = 0;
      }
    });

    const video = videoRefs.current[index];
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Play prevented:', error);
        });
      }
    }

    setActiveIndex(index);
  };

  const handleLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div
      className={styles.DivListContainer}
      style={{ marginLeft: '-23.5px', width: '544px' }}
    >
      <div className={styles.DivVideoListContainer}>
        {dataVideos.map((video, i) => (
          <VideoSimple
            key={video.id}
            data={video}
            currentIndex={i}
            activeIndex={activeIndex}
            setRef={(el) => (videoRefs.current[i] = el)}
            onHover={() => handleHover(i)}
            onLeave={() => handleLeave(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoSimpleList;
