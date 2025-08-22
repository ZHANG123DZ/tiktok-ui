import clsx from 'clsx';
import styles from './Tag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHashtag,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import { useEffect, useRef, useState } from 'react';
import VideoCard from '../../components/VideoCard';
import ShareModal from '../../components/ShareModal';

function Tag() {
  const params = useParams();
  const [activeShare, setActiveShare] = useState(false);
  const [videos, setVideos] = useState([]);
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

  useEffect(() => {
    // Gọi API get list post của topic
    const mockVideos = [
      {
        video: video1,
        thumbnail:
          'https://p9-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oYGJwPDEI8inA2YBM6EBSviVBLEYdgkAyIaqg~tplv-photomode-zoomcover:720:720.jpeg?dr=14555&x-expires=1755320400&x-signature=nnAkMV6Mr%2F1PnkRrmOXqq1QI53I%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2&ftpl=1',
        description:
          'Tổng thống Mỹ Donald Trump tuyên bố, sự kiên nhẫn của Mỹ đã cạn kiệt và ông đang cân nhắc có nên can dự sâu hơn vào cuộc xung đột này hay không. Những tuyên bố này của người đứng đầu Nhà Trắng như đổ thêm dầu vào ngọn lửa xung đột',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video2,
        thumbnail:
          'https://p9-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oYGJwPDEI8inA2YBM6EBSviVBLEYdgkAyIaqg~tplv-photomode-zoomcover:720:720.jpeg?dr=14555&x-expires=1755320400&x-signature=nnAkMV6Mr%2F1PnkRrmOXqq1QI53I%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2&ftpl=1',
        description: 'Tôi bị gay',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video3,
        thumbnail:
          'https://p9-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oYGJwPDEI8inA2YBM6EBSviVBLEYdgkAyIaqg~tplv-photomode-zoomcover:720:720.jpeg?dr=14555&x-expires=1755320400&x-signature=nnAkMV6Mr%2F1PnkRrmOXqq1QI53I%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2&ftpl=1',
        description: 'Tôi bị gay',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video4,
        thumbnail:
          'https://p9-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oYGJwPDEI8inA2YBM6EBSviVBLEYdgkAyIaqg~tplv-photomode-zoomcover:720:720.jpeg?dr=14555&x-expires=1755320400&x-signature=nnAkMV6Mr%2F1PnkRrmOXqq1QI53I%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2&ftpl=1',
        publishedAt: '2025-08-12 18:02:00.956',
        description: 'Tôi bị gay',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          username: 'huyenthor_',
        },
        likes: 12343,
      },
    ];
    setVideos(mockVideos);
  }, []);

  return (
    <div className={styles['DivShareLayoutBase-StyledShareLayoutV2']}>
      <div className={styles.DivShareLayoutContentV2}>
        <div
          className={clsx(
            styles['DivShareLayoutHeader-StyledDivShareLayoutHeaderV2'],
            styles.e13xij562
          )}
        >
          <div className={clsx(styles.DivShareInfo, styles.evkpurd2)}>
            <div
              className={clsx(styles.DivDefaultImgContainer, styles.evkpurd9)}
            >
              <FontAwesomeIcon
                icon={faHashtag}
                style={{ width: '80px', height: '80px' }}
              />
            </div>

            <div
              className={clsx(styles.DivShareTitleContainer, styles.evkpurd3)}
            >
              <h1
                data-e2e="challenge-title"
                className={clsx(styles.H1ShareTitle, styles.evkpurd4)}
              >
                #{params.name}
              </h1>
              <h2
                data-e2e="challenge-vvcount"
                title="posts"
                className={clsx(styles.H2ShareSubTitleThin)}
              >
                1.1M posts
              </h2>
            </div>
          </div>

          <div className={clsx(styles.DivButtonsContainer, styles.e6y15916)}>
            <div
              role="button"
              aria-label="Share"
              data-e2e="share-btn"
              tabIndex={0}
              className={clsx(styles.DivShareActions, styles.e6y15919)}
            >
              <FontAwesomeIcon
                icon={faShare}
                className={styles.StyledShareIcon}
                style={{ width: '24px', height: '24px' }}
                onClick={() => setActiveShare(true)}
              />
            </div>
            {activeShare && (
              <ShareModal
                isOpen={activeShare}
                onClose={() => setActiveShare(false)}
              />
            )}
            <div
              role="button"
              aria-label="Actions"
              tabIndex={0}
              data-e2e="challenge-more"
              className={clsx(styles.DivMoreActions, styles.e6y159110)}
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ width: '24px', height: '24px' }}
              />
            </div>
          </div>
        </div>
        <div className={styles.DivThreeColumnContainer}>
          <div className={styles.DivVideoFeedV2}>
            {videos.map((video, i) => (
              <VideoCard
                key={video.video}
                data={video}
                variant="topic"
                onHover={() => handleHover(i)}
                setRef={(el) => (videoRefs.current[i] = el)}
                currentIndex={i}
                activeIndex={activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tag;
