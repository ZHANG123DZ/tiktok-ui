import styles from './next.module.scss';

function Next() {
  return (
    <div
      tabIndex="0"
      role="link"
      aria-label="Hồ sơ của CrisDevilGamer"
      data-e2e="recommend-card"
      className={styles.DivUserCard}
    >
      <a
        href="/@crisdevilgamer7"
        target="_blank"
        rel="opener"
        tabIndex="-1"
        aria-label="Hồ sơ của CrisDevilGamer"
        className={styles.AUserCard}
      >
        <div className={styles.DivContainer}>
          <div className={styles.ImageWrapper}>
            <span style={{ position: 'absolute', inset: 0 }}>
              <picture>
                <img
                  alt=""
                  src="https://p16-sign-sg.tiktokcdn.com/..."
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </picture>
            </span>
          </div>
          <div
            data-e2e="card-background"
            className={styles.DivBasicPlayerWrapper}
          >
            <div className="xgplayer-container tiktok-web-player">
              <video
                autoPlay
                playsInline
                muted
                preload="auto"
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  objectFit: 'cover',
                }}
              >
                <source src="https://v16-webapp-prime.tiktok.com/..." />
              </video>
            </div>
          </div>
        </div>
        <div className={styles.DivInfoContainer}>
          <span className={styles.SpanAvatarContainer}>
            <img
              alt=""
              loading="lazy"
              src="https://p16-sign-sg.tiktokcdn.com/..."
              className={styles.ImgAvatar}
            />
          </span>
          <h3 className={styles.H3Username}>CrisDevilGamer</h3>
          <h4 className={styles.H4UniqueIdContainer}>
            <span className={styles.SpanUniqueId}>crisdevilgamer7</span>
            <div className={styles.DivVerifiedBadgeContainer}>
              <svg width="12" height="12" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M37.1213 15.8787C38.2929 17.0503..."
                  fill="white"
                />
              </svg>
            </div>
          </h4>
          <div className={styles.DivButtonContainer}>
            <button type="button" className={styles.Button}>
              Follow
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Next;
