import React, { useState } from 'react';
import Text from '../Text';
import styles from './DescriptionVideo.module.scss'; // nếu bạn muốn tách CSS module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const DescriptionVideo = () => {
  const dataVideo = {
    description:
      'Cuộc gặp thượng đỉnh lịch sử giữa hai tổng Thống thống Mỹ, Nga đã kết thúc. Hai ông đã có buổi họp báo chung thông báo kết quả.',
    tags: ['tintuc', 'tinnong24', 'trump', 'putin', 'xuhuong'],
    author: {
      username: 'superman',
      avatar:
        'https://p9-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/8f8a257ee263c7f7cf3a6d7202027975~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=830bf52f&x-expires=1755525600&x-signature=VoHL41fkIlfcp%2Bg3YX6X1vaW0Go%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2',
      name: '🆃🅸🅽 🅽🅾🅽🅶 24',
    },
  };

  const [follow, setFollow] = useState(false);
  const toggleFollow = async () => {
    setFollow(!follow);
  };

  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.DivDescriptionContentWrapper}>
      <div className={styles.DivInfoContainer}>
        {/* Avatar */}
        <a
          rel="opener"
          target="_self"
          data-e2e="browse-user-avatar"
          className={styles['css-1q3wyxm']}
          href={`/@${dataVideo.author.username}`}
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
                src={dataVideo.author.avatar}
                className={styles.ImgAvatar}
              />
            </span>
          </div>
        </a>

        {/* Username + nickname */}
        <a
          target="_self"
          rel="opener"
          className={styles.StyledLink}
          href={`/@${dataVideo.author.username}`}
        >
          <span data-e2e="browse-username" className={styles.SpanUniqueId}>
            <span className={styles.SpanEllipsis}>
              {dataVideo.author.username}
            </span>
          </span>
          <br />
          <span data-e2e="browser-nickname" className={styles.SpanOtherInfos}>
            <span className={styles.SpanEllipsis}>{dataVideo.author.name}</span>
            <span style={{ margin: '0px 4px' }}> · </span>
            <span>11h ago </span>
          </span>
        </a>

        {/* Follow button */}
        <div data-e2e="browse-follow" className={styles.DivBtnWrapper}>
          <button
            className={styles.Button}
            style={{
              backgroundColor: follow ? 'inherit' : 'var(--tux-colorPrimary)',
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
                  {dataVideo.description}{' '}
                </span>
                {dataVideo.tags.map((tag, idx) => (
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
                        color="rgba(143, 190, 233, 1)"
                        className={styles.StrongText}
                      >
                        #{tag}{' '}
                      </strong>
                    </a>

                    {idx + 1 !== dataVideo.tags.length && (
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

        <Text
          weight="medium"
          className="StyledTUXText-StyledDescriptionTranslationToggleText"
          style={{ color: 'var(--ui-text-3)', fontSize: '14px' }}
        >
          See translation
        </Text>
        {/* Music */}
        <h4 data-e2e="browse-music" className={styles.H4Link}>
          <a
            target="_self"
            rel="opener"
            aria-label="Watch more videos with music nhạc nền  - 🆃🅸🅽 🅽🅾🅽🅶 24"
            className={styles.StyledLink}
            style={{ display: 'flex', alignItems: 'center' }}
            href="/music/nhạc-nền-🆃🅸🅽-🅽🅾🅽🅶-24-7539003946375875345"
          >
            <FontAwesomeIcon
              icon={faMusic}
              className={styles.MusicNoteIcon}
              style={{ color: 'rgba(255, 255, 255, .9)' }}
            />
            <div className={styles.DivMusicText}>nhạc nền - 🆃🅸🅽 🅽🅾🅽🅶 24</div>
          </a>
        </h4>

        <div className={styles.DivAnchorTagWrapper}></div>
      </div>
    </div>
  );
};

export default DescriptionVideo;
