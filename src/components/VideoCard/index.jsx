import clsx from 'clsx';
import styles from './VideoCard.module.scss';
import formatTime from '../../utils/formatTime';
import React, { useEffect, useState } from 'react';
import formatNumberShort from '../../utils/formatNumberShort';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faThumbsUp,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import { setMuted } from '../../features/volume/volumeSlice';
import { useDispatch, useSelector } from 'react-redux';
import usePauseOnTabHidden from '../../hooks/usePauseOnTabHidden';

/**
 * @typedef {'discover' | 'search' | 'profile' | 'live'} VideoVariant
 */

/**
 * @param {{data: any, variant?: VideoVariant}} props
 */

function VideoCard({
  data,
  variant = 'discover',
  currentIndex,
  activeIndex,
  setRef = () => {},
  onHover = () => {},
  onClick = () => {},
}) {
  usePauseOnTabHidden(setRef);
  const isDiscover = variant === 'discover';
  const isProfile = variant === 'profile';
  const isSearch = variant === 'search';
  const isLive = variant === 'live';
  const isTopic = variant === 'topic';

  const dispatch = useDispatch();

  const isMuted = useSelector((state) => state.volume.isMuted);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (isMuted) {
      dispatch(setMuted(false));
    } else {
      dispatch(setMuted(true));
    }
  };

  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(activeIndex === currentIndex);

  useEffect(() => {
    setShowVideo(activeIndex === currentIndex);
  }, [activeIndex, currentIndex]);

  return (
    <div className={clsx(styles['DivItemContainerV2'])}>
      {/* Video */}
      <div
        data-e2e="explore-item"
        className={clsx(styles['DivContainer-StyledDivContainerV2'])}
        tabIndex={0}
        role="button"
        aria-label="Watch in full screen"
      >
        <div style={{ paddingTop: '133.333%' }}>
          <div className={clsx(styles['DivWrapper'])}>
            <div
              tabIndex={-1}
              className={clsx(styles['AVideoContainer'])}
              onMouseEnter={() => setShowVideo(true)}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/@${data.author.username}/video/${data.id}`);
              }}
            >
              <canvas
                width="75"
                height="100"
                className={clsx(styles['CanvasPlaceholder'])}
              ></canvas>
              <div className={clsx(styles['DivPlayerContainer'])}>
                <div mode="1" className={clsx(styles['DivContainer'])}>
                  {/* Thumbnail */}
                  <div className={styles['css-41hm0z']}>
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
                          alt={data.title}
                          fetchPriority="auto"
                          decoding="async"
                          src={data.thumbnail}
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
                            objectFit: 'cover',
                          }}
                        />
                      </picture>
                    </span>
                  </div>
                  {/* Video */}
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
                            src={data.content}
                            muted={isMuted}
                            onClick={onClick}
                          ></video>
                          <div></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isLive && (
                    <div className={styles.LiveTag}>
                      <div className={styles.LiveTextWrap}>
                        <div className={styles.LiveText}>LIVE</div>
                      </div>
                      <div className={styles.LiveTextWrapLike}>
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          className={styles.IconThumbsUp}
                        />
                        <div className={styles.LiveText}>
                          {formatNumberShort(data.likeCount)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {!isTopic && !isProfile && (
                  <div
                    data-e2e="explore-card-info"
                    className={clsx(styles['DivPlayContainer'])}
                  >
                    <div
                      data-e2e="explore-card-info-left"
                      className={clsx(styles['DivExploreCardText'])}
                    >
                      <div
                        data-e2e="explore-card-like-container"
                        className={clsx(styles['DivIconText'])}
                      >
                        <svg
                          fill="currentColor"
                          viewBox="0 0 48 48"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: '1em', height: '1em' }}
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M40.96 24.15c1.83-4.8 1.05-8.61-.8-11.33a10.87 10.87 0 0 0-6.34-4.49 9.43 9.43 0 0 0-6.83 1.17c-1.08.65-2.1 1.53-2.99 2.66-.9-1.13-1.9-2.01-3-2.66a9.43 9.43 0 0 0-6.82-1.17 10.87 10.87 0 0 0-6.34 4.49c-1.85 2.72-2.63 6.54-.8 11.33 1.43 3.74 4.5 7.23 7.6 9.98a46.31 46.31 0 0 0 8.6 6.12l.76.4.76-.4a46.31 46.31 0 0 0 8.6-6.12c3.1-2.75 6.17-6.24 7.6-9.98ZM24 17.58c2.3-2.88 4.7-6.2 9.03-5.33a6.95 6.95 0 0 1 3.82 2.81c1.07 1.58 1.76 4.02.37 7.66-1.09 2.86-3.6 5.82-6.51 8.43A44.84 44.84 0 0 1 24 36.09a44.84 44.84 0 0 1-6.7-4.94c-2.93-2.6-5.43-5.57-6.52-8.43-1.4-3.64-.7-6.08.37-7.66a6.95 6.95 0 0 1 3.82-2.8c4.33-.88 6.73 2.44 9.03 5.32Z"
                          />
                        </svg>
                        <span>{formatNumberShort(data.likeCount)}</span>
                      </div>
                    </div>
                  </div>
                )}
                {isTopic && (
                  <div type="1" className={styles.DivCardAvatar}>
                    <Link
                      data-e2e="music-item-avatar"
                      className="link-a11y-focus"
                      to={`/@${data?.author.username}?lang=en`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        shape="circle"
                        data-e2e=""
                        className={styles['SpanAvatarContainer-StyledAvatar']}
                        style={{ width: '24px', height: '24px' }}
                      >
                        <img
                          loading="lazy"
                          alt="ปังปังเด็กเลี้ยงควาย,apiruk_9043"
                          src={data?.author.avatar}
                          className={styles.ImgAvatar}
                        />
                      </span>
                    </Link>
                    <Link
                      title={data?.author.username}
                      className={styles.StyledLink}
                      to={`/@${data?.author.username}?lang=en`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <h4 type="1" className={styles.H4UserTitle}>
                        <p
                          data-e2e="music-item-username"
                          className={clsx('user-name', styles.PUserName)}
                          type="1"
                        >
                          {data?.author.username}
                        </p>
                      </h4>
                    </Link>
                  </div>
                )}
                {/* Button Muted */}
                {isDiscover && (
                  <div
                    className={clsx(styles['DivMuteIconContainer'])}
                    onClick={(e) => toggleMute(e)}
                  >
                    {isMuted ? (
                      <FontAwesomeIcon icon={faVolumeXmark} />
                    ) : (
                      <FontAwesomeIcon icon={faVolumeHigh} />
                    )}
                  </div>
                )}
                {isProfile && (
                  <div className={styles.DivCardFooter}>
                    <FontAwesomeIcon
                      icon={faPlay}
                      className={styles.StyledPlay}
                      style={{ color: '#fff' }}
                    />
                    <strong
                      data-e2e="video-views"
                      className={styles.StrongVideoCount}
                    >
                      {formatNumberShort(data?.viewCount || 0)}
                    </strong>
                  </div>
                )}
                {isProfile && data?.isPinned && (
                  <div className={styles.DivHeaderContainer}>
                    <div className={styles.DivLeftSection}>
                      <div
                        data-e2e="video-card-badge"
                        className={styles.DivBadge}
                      >
                        Đã ghim
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Title */}
      {isTopic && (
        <div className={clsx(styles.DivDesContainer, styles.eih2qak4)}>
          <div
            aria-label={data.title}
            data-e2e="music-item-desc"
            className={clsx(styles.DivTagCardDesc, styles.eih2qak1)}
          >
            <Link
              title={data.title}
              to={`/@${data.author.username}/video/${data.id}`}
              className={clsx(styles.AMetaCaptionLine, styles.eih2qak0)}
            >
              <div
                className={clsx(
                  styles.DivDescriptionContentContainer,
                  styles.ejg0rhn1
                )}
              >
                <span data-e2e="new-desc-span" style={{ fontWeight: 400 }}>
                  {data.title}
                </span>
              </div>
            </Link>
          </div>
          <span
            className={clsx(styles.SpanInfoExpandWrapper, styles.eih2qak5)}
          ></span>
        </div>
      )}
      {/* Author Info */}
      {!isTopic && !isProfile && (
        <div
          data-e2e="explore-card-desc"
          className={styles.DivVideoExploreCardDesc}
        >
          <div className={styles.DivCardBottomInfo}>
            <div
              data-e2e="search-card-video-caption"
              className={styles.DivMetaCaptionLine}
            >
              <div className={styles.DivDescriptionContentContainer}>
                <span data-e2e="new-desc-span" style={{ fontWeight: '400' }}>
                  {data.title}{' '}
                </span>
                {data.tags?.map((tag, i) => (
                  <React.Fragment key={tag}>
                    <a
                      data-e2e="search-common-link"
                      target="_self"
                      rel="opener"
                      aria-label={`Watch more videos of the #${tag} category`}
                      className={styles.StyledCommonLink}
                      href={`/tag/${tag}`}
                    >
                      <strong
                        style={{ color: 'rgba(143, 190, 233, 1)' }}
                        className={styles.StrongText}
                      >
                        #{tag}
                      </strong>
                    </a>

                    {i !== data.tags.length - 1 && (
                      <span
                        data-e2e="new-desc-span"
                        style={{ fontWeight: 400 }}
                      >
                        {' '}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className={styles.DivPlayLine}>
              <div className={styles.DivUserInfo}>
                <a
                  data-e2e="explore-card-user-link"
                  className="link-a11y-focus"
                  href={`/@${data.author.username}`}
                >
                  <span
                    shape="circle"
                    className={styles.SpanAvatarContainer}
                    style={{
                      flexShrink: 0,
                      width: '24px',
                      height: '24px',
                    }}
                  >
                    <img
                      loading="lazy"
                      alt="ERROR"
                      src={data.thumbnail}
                      className={styles.ImgAvatar}
                    />
                  </span>
                </a>
                <a
                  data-e2e="explore-card-user-link"
                  className="link-a11y-focus"
                  href={`/@${data.author.username}`}
                  style={{ overflow: 'hidden' }}
                >
                  <p
                    data-e2e="explore-card-user-unique-id"
                    className={styles.PUniqueId}
                  >
                    {data.author.username}
                  </p>
                </a>
              </div>
              <div className={styles.DivExploreCardText}></div>
              {isSearch && (
                <div className={styles.DivTimeTag}>
                  {formatTime(data.publishedAt)} ago{' '}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoCard;
