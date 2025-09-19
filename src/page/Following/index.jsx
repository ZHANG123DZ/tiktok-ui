import { useRef, useState } from 'react';
import UserCard from '../../components/UserCard';
import styles from './styles.module.scss';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import video5 from '/public/Download (5).mp4';
//Call API
function Following() {
  const mockProfiles = [
    {
      id: 4,
      name: 'CrisDevilGamer',
      username: 'crisdevilgamer7',
      isVerifiedBadge: true,
      avatar:
        'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
      isFollow: false,
      videoIntro: {
        id: 2,
        thumbnail:
          'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
        video: video1,
      },
    },
    {
      id: 5,
      name: 'CrisDevilGamer',
      username: 'crisdevilgamer7',
      avatar:
        'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
      isFollow: false,
      isVerifiedBadge: true,
      videoIntro: {
        id: 2,
        thumbnail:
          'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
        video: video2,
      },
    },
    {
      id: 6,
      name: 'CrisDevilGamer',
      username: 'crisdevilgamer7',
      avatar:
        'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
      isFollow: true,
      isVerifiedBadge: true,

      videoIntro: {
        id: 2,
        thumbnail:
          'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
        video: video3,
      },
    },
    {
      id: 7,
      name: 'CrisDevilGamer',
      username: 'crisdevilgamer7',
      avatar:
        'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
      isFollow: false,
      videoIntro: {
        id: 2,
        thumbnail:
          'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
        video: video4,
      },
    },
    {
      id: 8,
      name: 'CrisDevilGamer',
      username: 'crisdevilgamer7',
      avatar:
        'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
      isFollow: true,
      videoIntro: {
        id: 2,
        thumbnail:
          'https://ben.com.vn/tin-tuc/wp-content/uploads/2021/12/anh-che-cho-hai-huoc-cho-dien-thoai-1.jpg',
        video: video5,
      },
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
    videoRefs.current[index]?.play();
    setActiveIndex(index);
  };

  return (
    <main className={styles.DivMainContainer}>
      <div className={styles.DivUserListWrapper}>
        {mockProfiles.map((user, i) => (
          <UserCard
            key={user.id}
            data={user}
            onHover={() => handleHover(i)}
            setRef={(el) => (videoRefs.current[i] = el)}
            currentIndex={i}
            activeIndex={activeIndex}
          />
        ))}
      </div>
      <div className={styles.DivFixedTopContainer}></div>
      <div className={styles.DivFixedBottomContainer}></div>
    </main>
  );
}

export default Following;
