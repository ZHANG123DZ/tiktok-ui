import ReactPlayer from 'react-player';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import Text from '../Text';

function VideoItem({ url }) {
  const { ref: viewRef, inView } = useInView({
    threshold: 0.6,
  });
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    playerRef.current?.getCurrentTime?.() || 0
  );
  const [played, setPlayed] = useState(0);
  const progressBarRef = useRef(null);
  const isDraggingRef = useRef(false);

  const togglePlay = () => setPlaying((prev) => !prev);
  const toggleMute = () => setMuted((prev) => !prev);

  const seekForward = () => {
    if (currentTime !== undefined) {
      playerRef.current.seekTo(currentTime + 10);
    }
  };

  const seekBackward = () => {
    if (currentTime !== undefined) {
      playerRef.current.seekTo(currentTime - 10);
    }
  };
  let percentClickProgress = 0;
  const seekToTime = (currentTime) => {
    playerRef.current?.seekTo(currentTime, 'fraction');
  };
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    updateProgress(e);
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      updateProgress(e);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const updateProgress = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    playerRef.current?.showPreview?.();
    playerRef.current?.seekTo(percent, 'fraction');
    setPlayed(percent);
    setCurrentTime(percent * playerRef.current?.getDuration?.());
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  // seekToTime(percentClickProgress);
  return (
    <div ref={viewRef} style={{ height: '100%', width: '100%' }}>
      <ReactPlayer
        ref={playerRef}
        url={url}
        muted={muted}
        playing={inView && playing}
        width="100%"
        height="100%"
        loop
        // light={
        //   <img
        //     src="https://hoseiki.vn/wp-content/uploads/2025/03/gai-xinh-mac-bikini-25.jpg?v=1741738692"
        //     alt="gái xinh"
        //   />
        // }
        onProgress={({ playedSeconds, played }) => {
          setCurrentTime(Math.round(playedSeconds));
          setPlayed(played);
        }}
      />
      {/* class="TUXText TUXText--tiktok-display TUXText--weight-bold ex6bx1a0 css-fl3jcf-StyledTUXText-StyledTimeDisplayText e1vx58lt0" */}
      {/* Thanh tua video */}
      <div className={styles.DivVideoProgressContainer}>
        <Text
          className="StyledTUXText-StyledTimeDisplayText"
          weight={'bold'}
          display
          style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            textWrap: 'nowrap',
          }}
        >
          {currentTime}:{playerRef.current?.getDuration()}
        </Text>
        <div className={styles.DivProgressBar}>
          <div className={styles.DivProgressBarScrubHead}></div>
          <div
            className={styles.DivProgressBarContainer}
            ref={progressBarRef}
            onMouseDown={handleMouseDown}
          >
            <div
              className={styles.DivProgressBarElapsed}
              style={{ width: `${played * 100 + 2}%` }}
            ></div>
            <div className={styles.DivProgressBarBounds}></div>
          </div>
        </div>
      </div>
      <div className={styles.DivMediaCardTop}>
        <div className={styles.DivMediaControlsTop}>
          <div className={styles.DivFlexCenter}>
            <div className={styles.DivAudioControlContainer}>
              <div className={styles.DivMuteIconContainer} onClick={toggleMute}>
                <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
              </div>
            </div>
          </div>
          {/* <div className={styles.DivFlexCenter}>
                        <div className={styles.moreActionSetting}>
                          <Button
                            icon={
                              <FontAwesomeIcon
                                icon={faEllipsis}
                                onClick={() => setActive(true)}
                              />
                            }
                          />
                          {isActive && (
                            <PopoverArticle
                              data={data}
                              active={isActive}
                              setActive={setActive}
                            />
                          )}
                        </div>
                      </div> */}
        </div>
      </div>
    </div>
  );
}

export default VideoItem;
