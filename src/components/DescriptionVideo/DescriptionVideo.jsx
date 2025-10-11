import React, { useEffect, useState } from 'react';
import styles from './DescriptionVideo.module.scss'; // nếu bạn muốn tách CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import formatTime from '../../utils/formatTime';
import Translate from '../Translate/Translate';
import followService from '../../services/follow/follow.service';
import ProtectedButton from '../ProtectedButton';

const DescriptionVideo = ({ data }) => {
  const authorId = data?.author?.id;
  const [title, setTitle] = useState(data?.title);
  const [follow, setFollow] = useState(false);

  useEffect(() => {
    if (data?.title) {
      setTitle(data.title);
    }
  }, [data?.title]);

  const toggleFollow = async () => {
    try {
      if (follow) {
        await followService.unfollow({ followAbleId: authorId, type: 'user' });
      } else {
        await followService.follow({ followAbleId: authorId, type: 'user' });
      }
      setFollow((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.DivDescriptionContentWrapper}>
      <div className={styles.DivInfoContainer}>
        {/* Avatar */}
        <Link
          rel="opener"
          target="_self"
          data-e2e="browse-user-avatar"
          className={styles['css-1q3wyxm']}
          to={`/@${data?.author.username}`}
        >
          <div
            className={styles.DivContainer}
            style={{ width: '40px', height: '40px' }}
          >
            <span
              shape="circle"
              data-e2e=""
              className={styles['SpanAvatarContainer-StyledAvatar']}
              style={{ width: '40px', height: '40px' }}
            >
              <img
                loading="lazy"
                alt=""
                src={data?.author.avatar}
                className={styles.ImgAvatar}
              />
            </span>
          </div>
        </Link>

        {/* Username + nickname */}
        <Link
          target="_self"
          rel="opener"
          className={styles.StyledLink}
          to={`/@${data?.author.username}`}
        >
          <span data-e2e="browse-username" className={styles.SpanUniqueId}>
            <span className={styles.SpanEllipsis}>{data?.author.username}</span>
          </span>
          <br />
          <span data-e2e="browser-nickname" className={styles.SpanOtherInfos}>
            <span className={styles.SpanEllipsis}>{data?.author.name}</span>
            <span style={{ margin: '0px 4px' }}> · </span>
            <span>{formatTime(data?.createdAt)} trước</span>
          </span>
        </Link>

        {/* Follow button */}
        <ProtectedButton>
          <div data-e2e="browse-follow" className={styles.DivBtnWrapper}>
            <button
              className={styles.Button}
              style={{
                backgroundColor: follow
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'var(--tux-colorPrimary)',
                border: follow && '0px',
              }}
            >
              <div className={styles.ButtonContent}>
                <div
                  className={styles.ButtonLabel}
                  onClick={() => toggleFollow()}
                >
                  {follow ? 'Following' : 'Follow'}
                </div>
              </div>
            </button>
          </div>
        </ProtectedButton>
      </div>

      {/* Main content */}
      <div className={styles.DivMainContent}>
        <div
          className={styles.DivWrapper}
          style={{ paddingBottom: showMore ? '55px' : 'unset' }}
        >
          <div
            className={styles.DivText}
            style={{
              maxHeight: showMore ? 'unset' : '44px',
              WebkitLineClamp: showMore ? '999' : '2',
            }}
          >
            {!showMore && (
              <div className={styles.DivBtnWrapper}>
                <button
                  type="button"
                  className={styles.ButtonExpand}
                  onClick={() => setShowMore(true)}
                >
                  thêm
                </button>
              </div>
            )}

            <div className={showMore ? styles.DivOverflowContainer : ''}>
              <div
                data-e2e="browse-video-desc"
                className={styles.DivDescriptionContentContainer}
              >
                <span data-e2e="new-desc-span" style={{ fontWeight: 400 }}>
                  {title}{' '}
                </span>
                {data?.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <Link
                      data-e2e="search-common-link"
                      target="_self"
                      rel="opener"
                      aria-label={`Watch more videos of the #${tag} category`}
                      className={styles.StyledCommonLink}
                      to={`/tag/${tag}`}
                    >
                      <strong
                        color="rgba(143, 190, 233, 1)"
                        className={styles.StrongText}
                      >
                        #{tag}{' '}
                      </strong>
                    </Link>

                    {idx + 1 !== data?.tags.length && (
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
          </div>
          {showMore && (
            <button
              type="button"
              className={styles['ButtonExpand-StyledButtonBottom']}
              onClick={() => setShowMore(false)}
              style={{ marginLeft: '5px' }}
            >
              ẩn bớt
            </button>
          )}
        </div>
        {/* Translation */}
        <Translate
          content={title}
          source={data?.title}
          setNewContent={setTitle}
        />
        {/* Music */}
        <h4 data-e2e="browse-music" className={styles.H4Link}>
          <Link
            target="_self"
            rel="opener"
            aria-label={`Watch more videos with music nhạc nền  - ${data?.music?.author?.name}`}
            className={styles.StyledLink}
            style={{ display: 'flex', alignItems: 'center' }}
            to={`/music/${data?.music?.author?.name}-${data?.music?.id}`}
          >
            <FontAwesomeIcon
              icon={faMusic}
              className={styles.MusicNoteIcon}
              style={{ color: 'rgba(255, 255, 255, .9)' }}
            />
            <div className={styles.DivMusicText}>
              nhạc nền - {data?.music?.author?.name}
            </div>
          </Link>
        </h4>

        <div className={styles.DivAnchorTagWrapper}></div>
      </div>
    </div>
  );
};

export default DescriptionVideo;
