import clsx from 'clsx';
import styles from './Music.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faFlag,
  faPause,
  faPlay,
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
import Button from '../../components/Button';
import MorePopover from '../../components/MorePopover/MorePopover';

function Music() {
  const params = useParams();
  const [activeShare, setActiveShare] = useState(false);
  const [videos, setVideos] = useState([]);
  const [music, setMusic] = useState({});

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const popoverContent = [
    {
      button: (
        <Button
          icon={<FontAwesomeIcon icon={faFlag} />}
          label="Report"
          secondary
          borderless
          size="medium"
          style={{ margin: '0px 8px' }}
        />
      ),
    },
  ];

  const videoRefs = useRef([]);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // phần trăm tiến trình

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const pct = (video.currentTime / video.duration) * 100;
      setProgress(pct);
    };

    video.addEventListener('timeupdate', updateProgress);
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  // vòng tròn (SVG Circle)
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;

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
    const mockMusic = {
      thumbnail:
        'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-22.jpg',
      video: video4,
      videos: {
        total: 300,
      },
      author: {
        username: 'hi#dj',
      },
    };
    setMusic(mockMusic);
  }, []);

  useEffect(() => {
    // Gọi API get list post của topic
    const mockVideos = [
      {
        video: video1,
        thumbnail:
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg',
        description:
          'Tổng thống Mỹ Donald Trump tuyên bố, sự kiên nhẫn của Mỹ đã cạn kiệt và ông đang cân nhắc có nên can dự sâu hơn vào cuộc xung đột này hay không. Những tuyên bố này của người đứng đầu Nhà Trắng như đổ thêm dầu vào ngọn lửa xung đột',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          avatar:
            'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg',
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video2,
        thumbnail:
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg',
        description: 'Tôi bị gay',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          avatar:
            'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg',
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video3,
        thumbnail:
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg',
        description: 'Tôi bị gay',
        publishedAt: '2025-08-12 18:02:00.956',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          avatar:
            'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg',
          username: 'huyenthor_',
        },
        likes: 12343,
      },
      {
        video: video4,
        thumbnail:
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-11.jpg',
        publishedAt: '2025-08-12 18:02:00.956',
        description: 'Tôi bị sẽ',
        tags: ['tiktoknews', '#vtvdigital', '#vtv24', '#iran', '#israel'],
        author: {
          avatar:
            'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg',
          username: 'superman',
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
            <div className={clsx(styles.DivMusicCardWrapper, styles.evkpurd9)}>
              <div
                className={styles.DivMusicCardContainer}
                style={{
                  backgroundImage: `url(${music.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className={styles.DivPlayer}>
                  <video ref={videoRef} src={music.video} playsInline />
                </div>
                {isPlaying && (
                  <>
                    {' '}
                    <div className={styles.DivProgressMark}></div>
                    <div className={styles.DivProgressBarWrapper}>
                      <div
                        data-pct="50"
                        className={styles.DivProgressBarContainer}
                        style={{ width: '78px', height: '78px' }}
                      >
                        <svg
                          className="absolute"
                          width="78"
                          height="78"
                          viewBox="0 0 78 78"
                          style={{ rotate: '-90deg' }}
                        >
                          <circle
                            strokeWidth="3"
                            stroke="rgba(255,255,255,0.3)"
                            fill="transparent"
                            r={radius}
                            cx="39"
                            cy="39"
                          />
                          <circle
                            strokeWidth="3"
                            stroke="#fff"
                            fill="transparent"
                            r={radius}
                            cx="39"
                            cy="39"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            style={{
                              transition: 'stroke-dashoffset 0.2s linear',
                            }}
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
                <div
                  data-e2e="music-play-icon"
                  className={styles.DivControlWrapper}
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <FontAwesomeIcon
                      icon={faPause}
                      style={{ width: '32px', height: '32px' }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPlay}
                      style={{ width: '32px', height: '32px' }}
                    />
                  )}
                </div>
              </div>
            </div>

            <div
              className={clsx(styles.DivShareTitleContainer, styles.evkpurd3)}
            >
              <h1
                data-e2e="music-title"
                className={clsx(styles.H1ShareTitle, styles.evkpurd4)}
                style={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxHeight: '80px',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                }}
              >
                {params.name}
              </h1>
              <h2 data-e2e="music-creator" className={styles.H2ShareSubTitle}>
                <a
                  className="link-a11y-focus"
                  href={`/@${music.author?.username}`}
                >
                  {music.author?.username}
                </a>
              </h2>
              <h2
                data-e2e="music-video-count"
                className={clsx(styles.H2ShareSubTitleThin)}
              >
                {music.videos?.total} videos
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
              ref={buttonRef}
              role="button"
              aria-label="Actions"
              tabIndex={0}
              data-e2e="challenge-more"
              className={clsx(styles.DivMoreActions, styles.e6y159110)}
              onClick={() => setShowPopover((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={faEllipsis}
                style={{ width: '24px', height: '24px' }}
              />
            </div>
            {showPopover && (
              <MorePopover
                onlyButton
                showDirection
                ref={popoverRef}
                triggerElement={buttonRef}
                list={popoverContent}
              />
            )}
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

export default Music;
