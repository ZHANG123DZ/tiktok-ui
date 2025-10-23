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
import { Link, useParams } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';
import ShareModal from '../../components/ShareModal';
import Button from '../../components/Button';
import MorePopover from '../../components/MorePopover/MorePopover';
import musicService from '../../services/music/music.service';
import usePauseOnTabHidden from '../../hooks/usePauseOnTabHidden';
import VideoList from '../../components/VideoList';
//Call API
function Music() {
  const params = useParams();
  const musicId = params.name.split('-').at(-1);

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

  const videoRef = useRef(null);
  usePauseOnTabHidden(videoRef);

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

  useEffect(() => {
    const fetchMusic = async () => {
      const musicData = await musicService.getMusic(musicId);
      setMusic(musicData);
      setVideos(musicData.posts);
    };
    fetchMusic();
  }, [musicId]);

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
                  <video ref={videoRef} src={music.audio} playsInline />
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
                {music.author?.name}
              </h1>
              <h2 data-e2e="music-creator" className={styles.H2ShareSubTitle}>
                <Link
                  className="link-a11y-focus"
                  to={`/@${music.author?.username}`}
                >
                  {music.author?.name}
                </Link>
              </h2>
              <h2
                data-e2e="music-video-count"
                className={clsx(styles.H2ShareSubTitleThin)}
              >
                {music.videoCount} video
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
                isSharePost={false}
                isOpen={activeShare}
                onClose={() => setActiveShare(false)}
                shareToFriends={false}
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
        <VideoList variant="topic" videosData={videos} />
      </div>
    </div>
  );
}

export default Music;
