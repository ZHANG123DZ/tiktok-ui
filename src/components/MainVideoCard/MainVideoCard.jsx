import { useState, useEffect, useRef } from 'react';
import styles from './MainVideoCard.module.scss';
import clsx from 'clsx';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';

import video from '/public/Download (13).mp4';
import Text from '../Text';

const mockVideoData = {
  id: '7532762172477197598',
  src: video,
  poster:
    'https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/osWBDxgQfAQrlZlxBDRoKmBmJEBUFEe5GSZQOh~tplv-tiktokx-origin.image?dr=14575&x-expires=1754816400&x-signature=KMYUzF0IyfSmnrwWZa1GxlGU%2FF0%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2',
  user: {
    username: 'tinnongmoingay08',
  },
  caption: [
    { type: 'hashtag', text: '#theanh28news' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#tinhot' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#tiktoknew' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#theanh28' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#tinmoimoingay' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#vtvcab' },
    { type: 'text', text: ' ' },
    { type: 'hashtag', text: '#tinmoi' },
    { type: 'text', text: ' ' },
  ],
  location: 'Hanoi',
};

const fetchVideoData = (videoId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (videoId === mockVideoData.id) {
        resolve(mockVideoData);
      } else {
        reject(new Error('Video not found'));
      }
    }, 1500);
  });
};

const getInitialVolume = () => {
  const storedVolume = localStorage.getItem('videoVolume');
  return storedVolume !== null ? parseFloat(storedVolume) : 0.5;
};

const getInitialMuted = () => {
  const storedVolume = localStorage.getItem('videoVolume');
  return storedVolume !== null ? parseFloat(storedVolume) === 0 : false;
};

const MainVideoCard = ({ videoId = '7532762172477197598' }) => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(getInitialMuted);
  const [volume, setVolume] = useState(getInitialVolume);
  const [lastVolume, setLastVolume] = useState(getInitialVolume);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);

  const [isVolumeDragging, setIsVolumeDragging] = useState(false);
  const volumeSliderRef = useRef(null);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchVideoData(videoId)
      .then((data) => {
        setVideoData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [videoId]);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (progressBar) {
      setProgressBarWidth(progressBar.offsetWidth);
    }
  }, [videoData]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Đặt âm lượng và trạng thái muted ban đầu
    video.volume = volume;
    video.muted = isMuted;

    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const total = video.duration;
      if (total) {
        setProgress((current / total) * 100);
        setCurrentTime(current);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    // Thêm các event listener
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    // Nếu video đã được tải, cập nhật duration
    if (video.readyState >= 1) {
      setDuration(video.duration);
    }

    return () => {
      // Dọn dẹp các event listener
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [volume, isMuted, videoData]);

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video || !duration) return;

    const newProgressInPixels = e.nativeEvent.offsetX;
    const newProgressPercent =
      (newProgressInPixels / progressBar.offsetWidth) * 100;

    const newTime = (newProgressPercent / 100) * duration;
    video.currentTime = newTime;
    setProgress(newProgressPercent);
  };

  const handleDrag = (clientX) => {
    const progressBar = progressBarRef.current;
    const video = videoRef.current;
    if (!progressBar || !video || !duration) return;

    const rect = progressBar.getBoundingClientRect();
    let newProgressInPixels = clientX - rect.left;
    newProgressInPixels = Math.max(
      0,
      Math.min(newProgressInPixels, rect.width)
    );

    const newProgressPercent = (newProgressInPixels / rect.width) * 100;
    setProgress(newProgressPercent);
    video.currentTime = (newProgressPercent / 100) * duration;
  };

  const onMouseDown = (e) => {
    const video = videoRef.current;
    if (!video) return;
    setIsDragging(true);
    setWasPlaying(!video.paused);
    video.pause();
    handleDrag(e.clientX);
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      handleDrag(e.clientX);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    if (wasPlaying) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, wasPlaying]);

  const handleVolumeDrag = (clientX) => {
    const slider = volumeSliderRef.current;
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    let newVolume = (clientX - rect.left) / rect.width;
    newVolume = Math.max(0, Math.min(newVolume, 1));

    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    localStorage.setItem('videoVolume', newVolume.toString());
  };

  const onVolumeMouseDown = (e) => {
    setIsVolumeDragging(true);
    handleVolumeDrag(e.clientX);
  };

  const onVolumeMouseMove = (e) => {
    if (isVolumeDragging) {
      handleVolumeDrag(e.clientX);
    }
  };

  const onVolumeMouseUp = () => {
    setIsVolumeDragging(false);
  };

  useEffect(() => {
    window.addEventListener('mousemove', onVolumeMouseMove);
    window.addEventListener('mouseup', onVolumeMouseUp);

    return () => {
      window.removeEventListener('mousemove', onVolumeMouseMove);
      window.removeEventListener('mouseup', onVolumeMouseUp);
    };
  }, [isVolumeDragging]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      const newVolume = lastVolume || 0.5;
      setVolume(newVolume);
      setIsMuted(false);
      localStorage.setItem('videoVolume', newVolume.toString());
    } else {
      setLastVolume(volume);
      setVolume(0);
      setIsMuted(true);
      localStorage.setItem('videoVolume', '0');
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const changeVolume = (e) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
    localStorage.setItem('videoVolume', value.toString());
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  if (loading) {
    return (
      <section className="css-1p5s595-SectionMediaCardContainer">
        Loading video...
      </section>
    );
  }

  if (error) {
    return (
      <section className="css-1p5s595-SectionMediaCardContainer">
        Error: {error}
      </section>
    );
  }

  if (!videoData) {
    return null;
  }

  return (
    <section
      id="one-column-item-0"
      shape="vertical"
      tabIndex="0"
      role="button"
      aria-label="Watch in full screen"
      data-e2e="feed-video"
      className={clsx(styles.SectionMediaCardContainer, 'e1heooat0')}
    >
      <canvas
        width="56.25"
        height="100"
        className={clsx(styles.CanvasMediaCardPlaceholder, 'e16pyws80')}
      ></canvas>
      <div
        className={clsx(
          styles['BasePlayerContainer-DivVideoPlayerContainer'],
          'e16pyws83'
        )}
      >
        <div
          mode="0"
          className={clsx(styles.DivContainer, 'e1yey0rl0')}
          style={{ borderRadius: '16px' }}
        >
          <div className="css-41hm0z">
            <span
              style={{
                boxSizing: 'border-box',
                display: 'block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: '1',
                border: '0px',
                margin: '0px',
                padding: '0px',
                position: 'absolute',
                inset: '0px',
              }}
            >
              <picture>
                <img
                  alt={videoData.caption.map((c) => c.text).join('')}
                  fetchPriority="auto"
                  decoding="async"
                  src={videoData.poster}
                  srcSet={videoData.poster}
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    boxSizing: 'border-box',
                    padding: '0px',
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: '0px',
                    height: '0px',
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />
              </picture>
            </span>
          </div>
          <div className={clsx(styles.DivBasicPlayerWrapper, 'e1yey0rl2')}>
            <div
              id={`xgwrapper-0-${videoData.id}`}
              className={clsx(
                'xgplayer-container',
                styles['tiktok-web-player']
              )}
            >
              <video
                ref={videoRef}
                className=""
                onClick={togglePlay}
                muted={isMuted}
                autoPlay
                loop
                playsInline
                data-index="-1"
                data-xgplayerid={`11c5990f-28d4-4fbd-a70c-86a8a8308f3f`}
                poster={videoData.poster}
                preload="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                }}
              >
                <source
                  className=""
                  src={videoData.src}
                  type="video/mp4"
                  data-index="1"
                />
              </video>
            </div>
          </div>
        </div>
        <div className={clsx(styles.DivMediaCardTop, 'e1yeguby0')}>
          <div className={clsx(styles.DivMediaControlsTop, 'e1yeguby2')}>
            <div className={clsx(styles.DivFlexCenter, 'e1yeguby3')}>
              <div
                className={clsx(styles.DivAudioControlContainer, 'eva82x91')}
              >
                <div
                  data-e2e="video-sound"
                  tabIndex="0"
                  role="button"
                  aria-label="Volume"
                  aria-pressed="false"
                  className={clsx(styles.DivMuteIconContainer, 'eva82x90')}
                >
                  <>
                    <FontAwesomeIcon
                      icon={isMuted ? faVolumeXmark : faVolumeHigh}
                      style={{ width: '24px', height: '24px' }}
                      onClick={toggleMute}
                    />
                    <div className={styles.volumeSlider}>
                      <input
                        ref={volumeSliderRef}
                        style={{
                          width: '70px',
                          '--progressVolume': `${volume * 100}%`,
                        }}
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={changeVolume}
                        onMouseDown={onVolumeMouseDown}
                      />
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className={clsx(styles.DivFlexCenter, 'e1yeguby3')}>
              <div className={styles['css-1dux0b3']}>
                <Button
                  capsule
                  size="medium"
                  secondary
                  icon={<FontAwesomeIcon icon={faEllipsis} />}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={clsx(styles.DivMediaCardBottom, 'e1qm78nh0')}>
          <div className={clsx(styles.DivCaptionContainer, 'e1qm78nh5')}></div>
          <div className={clsx(styles.DivMainInfoContainer, 'e1qm78nh1')}>
            <div className={clsx(styles.DivAnchorTagContainer, 'e1qm78nh2')}>
              <div className={clsx(styles.DivAnchorTagWrapper, 'e1sksq2r0')}>
                <div className={clsx(styles.DivAnchorTag, 'e1sksq2r5')}>
                  <a
                    rel="opener"
                    target="_self"
                    className={clsx(
                      styles.StyledLink,
                      'e65hkrg0',
                      'link-a11y-focus'
                    )}
                    href={`/place/${videoData.location}?lang=en`}
                  >
                    <svg
                      fontSize="14px"
                      viewBox="0 0 48 48"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                    >
                      <path
                        d="M0 5a5 5 0 0 1 5-5h38a5 5 0 0 1 5 5v38a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5Z"
                        fill="#00C39B"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 40.5c.88 0 14-11.43 14-19.1 0-7.68-6.27-13.9-14-13.9s-14 6.22-14 13.9c0 7.67 13.13 19.1 14 19.1Zm0-14.76c2.9 0 5.25-2.34 5.25-5.21A5.23 5.23 0 0 0 24 15.32a5.23 5.23 0 0 0-5.25 5.2A5.23 5.23 0 0 0 24 25.75Z"
                        fill="#fff"
                      ></path>
                    </svg>
                    <p className={clsx(styles.PAnchorTagName, 'e1sksq2r4')}>
                      {videoData.location}
                    </p>
                  </a>
                </div>
              </div>
            </div>
            <div
              className={clsx(
                styles.DivInlineMusicAndIconContainer,
                'e1qm78nh6'
              )}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: '1',
                }}
              >
                <div
                  className={clsx(styles.DivAuthorContentWrapper, 'e1qm78nh3')}
                >
                  <div className={clsx(styles.DivAuthorContainer, 'e1g2yhv84')}>
                    <a
                      className={clsx(
                        styles.StyledAuthorAnchor,
                        'e1g2yhv81',
                        'link-a11y-focus'
                      )}
                      href={`/@${videoData.user.username}?lang=en`}
                    >
                      <div
                        data-e2e="video-author-uniqueid"
                        className={clsx(styles.H3AuthorTitle, 'e1g2yhv80')}
                      >
                        {videoData.user.username}
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  data-tux-color-scheme="dark"
                  className={clsx(styles.DivDescriptionWrapper, 'exnv47g0')}
                >
                  <div
                    className={clsx(
                      styles.DivMultilineTextContainer,
                      'e1ozkfi0'
                    )}
                  >
                    <div className={clsx(styles.DivMultilineText, 'e1ozkfi1')}>
                      <div
                        data-e2e="video-desc"
                        className={clsx(
                          styles.DivDescriptionContentContainer,
                          'ejg0rhn1'
                        )}
                      >
                        {videoData.caption.map((item, index) => {
                          if (item.type === 'hashtag') {
                            return (
                              <a
                                key={index}
                                data-e2e="search-common-link"
                                target="_self"
                                rel="opener"
                                className={clsx(
                                  styles.StyledCommonLink,
                                  'ejg0rhn6',
                                  'link-a11y-focus'
                                )}
                                href={`/tag/${item.text.replace(
                                  '#',
                                  ''
                                )}?lang=en`}
                              >
                                <strong
                                  color="rgba(143, 190, 233, 1)"
                                  className={clsx(
                                    styles.StrongText,
                                    'ejg0rhn2'
                                  )}
                                >
                                  {item.text}{' '}
                                </strong>
                              </a>
                            );
                          }
                          return (
                            <span key={index} data-e2e="new-desc-span">
                              {item.text}{' '}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      type="button"
                      height="18"
                      className={clsx(
                        styles['ButtonExpand-StyledButtonBottom'],
                        'e1ozkfi3'
                      )}
                    >
                      more
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={clsx(styles.DivPlayerControlsRight, 'e16pyws85')}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className={clsx(styles.DivVideoProgressContainer, 'e14k2ouv0')}>
        <Text
          as="p"
          weight={'bold'}
          display
          className="StyledTUXText-StyledTimeDisplayText"
          style={{ color: 'inherit', fontSize: '32px' }}
        >
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
        <div className={clsx(styles.DivProgressBar, 'e14k2ouv5')}>
          <div
            className={clsx(styles.DivProgressBarScrubHead, styles.e14k2ouv2)}
            style={{
              transform: `translateX(${(progress * progressBarWidth) / 100}px)`,
            }}
            onMouseDown={onMouseDown}
          ></div>
          <div
            ref={progressBarRef}
            className={clsx(styles.DivProgressBarContainer, 'e14k2ouv1')}
            onMouseDown={handleProgressClick}
          >
            <div
              tabIndex="0"
              role="slider"
              aria-label="Video progress"
              aria-valuenow={progress}
              aria-valuetext={`${currentTime.toFixed(1)}s`}
              className={clsx(styles.DivProgressBarElapsed, styles.e14k2ouv3)}
              style={{ width: `${progress}%` }}
            ></div>
            <div
              className={clsx(styles.DivProgressBarBounds, styles.e14k2ouv4)}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainVideoCard;
