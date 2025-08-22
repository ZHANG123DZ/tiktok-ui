import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import VerifyBadge from '../VerifyBadge';

function UserCard({
  data,
  activeIndex = 0,
  currentIndex,
  setRef,
  onHover = () => {},
}) {
  const [follow, setFollow] = useState(data.isFollow);
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(activeIndex === currentIndex);

  useEffect(() => {
    setShowVideo(activeIndex === currentIndex);
  }, [activeIndex, currentIndex]);

  const toggleFollow = async (e) => {
    e.preventDefault();
    setFollow((prev) => !prev);
  };

  return (
    <div
      tabIndex={0}
      role="link"
      aria-label={`${data.name}’s profile`}
      data-e2e="recommend-card"
      className={styles.DivUserCard}
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowVideo(true)}
    >
      <Link
        to={`/@${data.username}`}
        target="_blank"
        rel="opener"
        tabIndex={-1}
        aria-label={`${data.name}’s profile`}
        className={styles.AUserCardLink}
      >
        <div mode="1" className={styles.DivContainer}>
          <div className={styles.imageWrapper}>
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
                  alt=""
                  decoding="async"
                  src={data.videoIntro.thumbnail}
                  className={styles.coverImg}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxSizing: 'border-box',
                    padding: 0,
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: 0,
                    height: 0,
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />
              </picture>
            </span>
          </div>
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
                    autoPlay
                    onMouseEnter={onHover}
                    src={data.videoIntro.video}
                    muted
                  ></video>
                  <div></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.DivInfoContainer}>
          <span
            shape="circle"
            data-e2e="user-avatar"
            className={styles.SpanAvatarContainer}
            style={{
              marginBottom: '14px',
              flexShrink: 0,
              width: '48px',
              height: '48px',
            }}
          >
            <img
              loading="lazy"
              alt=""
              src={data.avatar}
              className={styles.ImgAvatar}
            />
          </span>

          <h3 data-e2e="user-title" className={styles.H3Username}>
            {data.name}
          </h3>

          <h4 data-e2e="user-subtitle" className={styles.H4UniqueIdContainer}>
            <span className={styles.SpanUniqueId}>{data.username}</span>
            {data?.isVerifiedBadge && <VerifyBadge />}
          </h4>

          <div className={styles.DivButtonContainer}>
            <button
              type="button"
              data-e2e="card-followbutton"
              className={styles[follow ? 'unFollowButton' : 'followButton']}
              onClick={(e) => toggleFollow(e)}
            >
              Follow
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
