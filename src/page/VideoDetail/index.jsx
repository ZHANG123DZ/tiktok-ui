import clsx from 'clsx';
import styles from './VideoDetail.module.scss';
import DescriptionVideo from '../../components/DescriptionVideo/DescriptionVideo';
import ActionVideo from '../../components/ActionVideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faCircleXmark,
  faClose,
  faEllipsis,
  faPlay,
  faSearch,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import video from '/public/Download (6).mp4';
import { Tab, TabList, TabPanels, Tabs } from '../../components/Tabs/Tabs';
import VideoSimpleList from '../../components/VideoSimpleList';
import PostComment from '../../components/PostComment';
import FloatingPlayerIcon from '../../components/Icon/FloatingPlayerIcon';
import { useEffect, useRef, useState } from 'react';

function VideoDetail({ postId, username }) {
  console.log(postId);
  const videoData = {
    video: postId,
  };

  const getInitialVolume = () => {
    const storedVolume = localStorage.getItem('videoVolume');
    return storedVolume !== null ? parseFloat(storedVolume) : 0.5;
  };

  const getInitialMuted = () => {
    const storedVolume = localStorage.getItem('videoVolume');
    return storedVolume !== null ? parseFloat(storedVolume) === 0 : false;
  };

  const [showVideo, setShowVideo] = useState(false);
  const [search, setSearch] = useState('');
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(getInitialMuted);
  const [volume, setVolume] = useState(0);
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
  //Video Function
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

  const onMouseUp = (e) => {
    setIsDragging(false);

    if (videoRef.current && videoRef.current.contains(e.target)) {
      if (wasPlaying) {
        videoRef.current.play();
      }
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

  //Gắn sự kiện cho nút volume
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

  //Search Function
  const handleResetSearchForm = () => {
    setSearch('');
  };
  return (
    <div className={styles.DivBrowserModeContainer} style={{ zIndex: '3000' }}>
      {/* Video */}
      <div className={styles.DivVideoContainer}>
        {/* Search Bar */}
        <div
          className={clsx(styles.DivSearchBarContainer, styles['e11s2kul20'])}
        >
          <div
            className={clsx(
              styles.DivSearchBarBackground,
              styles['e11s2kul25']
            )}
          ></div>
          <div
            className={clsx(styles.DivSearchFormContainer, styles['e1hi1cmj0'])}
          >
            <form
              data-e2e="search-box"
              className={clsx(
                'search-input',
                styles.FormElement,
                styles.e14ntknm0
              )}
              action="/search"
            >
              <h1 style={{ display: 'none', alignItems: 'center' }}>
                kết quả cuộc gặp nga mỹ
              </h1>
              <input
                placeholder="cận cảnh đón tổng thống mỹ"
                name="q"
                type="text"
                autoComplete="off"
                role="combobox"
                aria-controls=""
                aria-label="cận cảnh đón tổng thống mỹ"
                aria-expanded="false"
                aria-autocomplete="list"
                data-e2e="search-user-input"
                className={clsx(styles.InputElement, styles.e14ntknm3)}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
              <div data-e2e="reset-search-form" onClick={handleResetSearchForm}>
                {search && (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{
                      margin: '0 12px',
                      width: '16px',
                      height: '16px',
                      color: 'rgba(255, 255, 255, 0.34)',
                    }}
                  />
                )}
              </div>
              <span
                className={clsx(styles.SpanSpliter, styles.e14ntknm6)}
              ></span>
              <button
                data-e2e="search-box-button"
                type="submit"
                aria-label="Tìm kiếm"
                className={clsx(styles.ButtonSearch, styles.e14ntknm7)}
              >
                <div
                  className={clsx(
                    styles.DivSearchIconContainer,
                    styles.e14ntknm8
                  )}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{
                      width: '24px',
                      height: '24px',
                      color: 'rgba(255, 255, 255, 0.75',
                    }}
                  />
                </div>
              </button>
              <div
                className={clsx(
                  styles.DivBrowserModeInputBorder,
                  styles.e14ntknm2
                )}
              ></div>
            </form>
          </div>
        </div>
        {/* Video Wrapper*/}
        <div className={clsx(styles.DivVideoWrapper, styles.e11s2kul3)}>
          <div mode="2" className={clsx(styles.DivContainer, styles.e1yey0rl0)}>
            {/* <div className={clsx(styles.cssSq145r)}>
              <span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  overflow: 'hidden',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  inset: 0,
                }}
              >
                <picture>
                  <img
                    alt="Cuộc gặp thượng đỉnh lịch sử giữa hai tổng Thống thống Mỹ, Nga đã kết thúc. Hai ông đã có buổi họp báo chung thông báo kết quả. #tintuc #tinnong24 #trump #putin #xuhuong "
                    fetchPriority="auto"
                    decoding="async"
                    src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oMQf0jjIgDA8DgZfFRyAeQkMoCWVF2PM9slddC~tplv-tiktokx-origin.image?dr=14575&amp;x-expires=1755568800&amp;x-signature=vr01XdxPiHEjEwVlng8krOJpbJ8%3D&amp;t=4d5b0474&amp;ps=13740610&amp;shp=81f88b70&amp;shcp=43f4a2f9&amp;idc=my2"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      boxSizing: 'border-box',
                      padding: 0,
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
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                >
                  <div></div>
                </div>
              </span>
            </div> */}

            <div
              data-e2e="browse-video"
              className={clsx(styles.DivBasicPlayerWrapper, styles.e1yey0rl2)}
            >
              <div
                id="xgwrapper-2-7539003870823992584"
                className="xgplayer-container tiktok-web-player"
              >
                <div>
                  <video
                    ref={videoRef}
                    onClick={togglePlay}
                    data-version="0.3.24"
                    preload=""
                    autoPlay
                    loop
                    muted
                    style={{
                      width: '100%',
                      height: '100%',
                      verticalAlign: 'middle',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                    src={videoData.video}
                  ></video>
                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={clsx(styles.DivVideoControlContainer, styles.e1rpry1m5)}
          >
            <div className={clsx(styles.DivSeekBarContainer, styles.e1rpry1m0)}>
              <div
                tabIndex={0}
                role="slider"
                aria-label="progress bar"
                aria-valuenow={0.6101330186080747}
                aria-valuetext="07:28"
                className={clsx(styles.DivSeekBarProgress, styles.e1rpry1m2)}
              ></div>
              <div
                className={clsx(styles.DivSeekBarCircle, styles.e1rpry1m4)}
                style={{ left: 'calc(61.0133%)' }}
              ></div>
              <div
                className={clsx(styles.DivSeekBar, styles.e1rpry1m3)}
                style={{ transform: 'scaleX(0.610133) translateY(-50%)' }}
              ></div>
            </div>
            <div
              className={clsx(styles.DivSeekBarTimeContainer, styles.e1rpry1m1)}
            >
              07:28/12:14
            </div>
          </div>

          <div className={clsx(styles.DivVideoControlTop, styles.e1rpry1m7)}>
            <div
              className={clsx(
                styles.DivVideoClosedCaptionContainer,
                styles.e11s2kul26
              )}
            ></div>
          </div>

          <div
            className={clsx(styles.DivVideoControlBottom, styles.e1rpry1m6)}
          ></div>
        </div>
        {!isPlaying && (
          <FontAwesomeIcon
            icon={faPlay}
            className={styles.StyledPlayIcon}
            style={{ width: '64px', height: '64px' }}
          />
        )}
        {/* Close Button */}
        <button
          role="button"
          aria-label="Đóng"
          data-e2e="browse-close"
          className={clsx(
            styles['ButtonBasicButtonContainer-StyledCloseIconContainer'],
            styles.e11s2kul6
          )}
        >
          <FontAwesomeIcon
            icon={faClose}
            style={{ width: '18px', height: '18px', fontSize: '18px' }}
          />
        </button>
        {/* Voice Control*/}
        <div
          className={clsx(styles.DivVoiceControlContainer, styles.e11s2kul17)}
        >
          <button
            tabIndex="0"
            role="button"
            aria-label="Volume"
            data-e2e="browse-sound"
            className={clsx(styles.ButtonVoiceControlNew, styles.e11s2kul16)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              fontSize: '20px',
            }}
          >
            <FontAwesomeIcon
              icon={isMuted ? faVolumeXmark : faVolumeHigh}
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
          </button>
        </div>
        {/*  */}
        <button
          data-e2e="arrow-left"
          role="button"
          aria-label="Go to previous video"
          className={clsx(
            styles['ButtonBasicButtonContainer-StyledVideoSwitchUp'],
            styles.e11s2kul10
          )}
        >
          <FontAwesomeIcon
            icon={faChevronUp}
            style={{ width: '26px', height: '26px', fontSize: '26px' }}
          />
        </button>
        <button
          data-e2e="arrow-left"
          role="button"
          aria-label="Go to next video"
          className={clsx(
            styles['ButtonBasicButtonContainer-StyledVideoSwitchDown'],
            styles.e11s2kul10
          )}
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ width: '26px', height: '26px', fontSize: '26px' }}
          />
        </button>
        {/* Floating */}
        <div className={clsx(styles.DivMiniPlayerContainer, styles.e11s2kul19)}>
          <div
            className={clsx(
              styles.DivMiniPlayerButtonContainer,
              styles.e1vz198y0
            )}
            style={{ fontSize: '20px' }}
          >
            <FloatingPlayerIcon />
          </div>
        </div>
        {/* Action */}
        <div className={clsx(styles.DivIconWrapper, styles.e11s2kul14)}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className={clsx(styles.FooterBtnWrapper, styles.e11s2kul23)}></div>
      </div>
      {/* Video Info */}
      <div className={styles.DivContentContainer}>
        <div className={styles.DivCommentContainer}>
          <div className={styles.DivCommentListContainer}>
            <div className={styles.DivProfileWrapper}>
              <DescriptionVideo />
              <ActionVideo data={videoData} />
            </div>

            {/* Tab */}
            <Tabs defaultIndex={0}>
              <div className={styles.DivTabMenuWrapper}>
                <TabList className={styles.DivTabMenuContainer}>
                  <Tab className={styles.DivTabItemContainer}>
                    <div className={styles.DivTabItem}>Comments (173)</div>
                  </Tab>
                  <Tab className={styles.DivTabItemContainer}>
                    <div className={styles.DivTabItem}>Creator videos</div>
                  </Tab>
                </TabList>
              </div>
              <div className={styles.DivBorder}></div>
              <TabPanels>
                <PostComment />
                <VideoSimpleList />
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;
