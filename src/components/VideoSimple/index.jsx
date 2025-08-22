import { useEffect, useState } from 'react';
import styles from './VideoSimple.module.scss'; // Giả sử bạn đang dùng CSS Module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import formatNumberShort from '../../utils/formatNumberShort';
import NowPlayingSVG from '../Icon/NowPlayingSVG';

function VideoSimple({
  data = {},
  currentIndex,
  activeIndex,
  setRef = () => {},
  onHover = () => {},
  onLeave = () => {},
}) {
  const [showVideo, setShowVideo] = useState(activeIndex === currentIndex);

  useEffect(() => {
    setShowVideo(activeIndex === currentIndex);
  }, [activeIndex, currentIndex]);

  return (
    <div className={styles.DivItemContainer}>
      <div
        className={styles.DivCoverContainer}
        onMouseEnter={() => setShowVideo(true)}
      >
        <img
          src={data.thumbnail}
          alt="Video cover"
          className={styles.ImgCover}
        />
        {showVideo && (
          <div className={styles.DivBasicPlayerWrapper}>
            <div
              id="xgwrapper-1-7536193134053985554"
              className="xgplayer-container tiktok-web-player"
            >
              <div>
                <video
                  ref={setRef}
                  data-version="0.3.22"
                  preload=""
                  style={{
                    width: '100%',
                    height: '100%',
                    verticalAlign: 'middle',
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    objectFit: 'cover',
                  }}
                  onMouseEnter={onHover}
                  onMouseLeave={() => {
                    setShowVideo(false);
                    onLeave();
                  }}
                  src={data.video}
                  autoPlay
                  playsInline
                ></video>
                <div></div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.DivPlayingMaskContainer}>
          <div className={styles.DivPlayingMaskWrapper}>
            <div
              style={{ width: '29px', height: '22px' }}
              className={styles.DivContainer}
            >
              <NowPlayingSVG />
            </div>
            <span className={styles.SpanText}>Now playing</span>
          </div>
        </div>
        <div className={styles.DivPlayCount}>
          <FontAwesomeIcon icon={faPlay} />
          {formatNumberShort(data.views)}
        </div>
      </div>
    </div>
  );
}

export default VideoSimple;
