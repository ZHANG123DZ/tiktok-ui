import { useEffect, useRef, useState } from 'react';
import styles from './VideoList.module.scss';
import VideoCard from '../VideoCard';

import video1 from '/public/Download (1).mp4';
import video2 from '/public/Download (2).mp4';
import video3 from '/public/Download (3).mp4';
import video4 from '/public/Download (4).mp4';
import video5 from '/public/Download (5).mp4';
import video6 from '/public/Download (6).mp4';
import video7 from '/public/Download (7).mp4';
import video8 from '/public/Download (8).mp4';
import video9 from '/public/Download (9).mp4';

function VideoList({ topic = 'all', variant = 'discover' }) {
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
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-12.jpg',
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
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-34.jpg',
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
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-32.jpg',
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
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-31.jpg',
        publishedAt: '2025-08-12 18:02:00.956',
        description: 'Tôi bị gay',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video5,
        thumbnail:
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-30.jpg',
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
        video: video6,
        thumbnail:
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-38.jpg',
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
        video: video7,
        thumbnail:
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-40.jpg',
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
        video: video8,
        thumbnail:
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-37.jpg',
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
        video: video9,
        thumbnail:
          'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-39.jpg',
        description:
          'Tổng thống Mỹ Donald Trump tuyên bố, sự kiên nhẫn của Mỹ đã cạn kiệt và ông đang cân nhắc có nên can dự sâu hơn vào cuộc xung đột này hay không. Những tuyên bố này của người đứng đầu Nhà Trắng như đổ thêm dầu vào ngọn lửa xung đột',
        publishedAt: '2025-08-12 18:02:00.956',
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
    <div className={styles.DivThreeColumnContainer}>
      <div className={styles.DivVideoFeedV2}>
        {videos.map((video, i) => (
          <VideoCard
            key={video.video}
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
