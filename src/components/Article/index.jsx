import PropTypes from 'prop-types';

import {
  faCommentDots,
  faHeart,
  faPlus,
  faShare,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './styles.module.scss';
import { useArticle } from '../../contexts/ArticleContext';
import VideoItem from '../VideoItem';

function Article({ data }) {
  const { clickCommentsButton, clickShareButton } = useArticle();

  return (
    <div className={styles.DivContentFlexLayout}>
      <section className={styles.SectionMediaCardContainer}>
        <canvas className={styles.CanvasMediaCardPlaceholder}></canvas>
        <div className={styles['BasePlayerContainer-DivVideoPlayerContainer']}>
          <div className={styles.DivContainer} style={{ borderRadius: '16px' }}>
            <div className={styles.thumbnailVideo}>
              <span className={styles.thumbnailVideoContainer}>
                <picture>
                  <img src="#" alt="error" className={styles.thumbnailImg} />
                </picture>
              </span>
            </div>
            <div className={styles.DivBasicPlayerWrapper}>
              <div
                className={clsx(
                  styles.DivBasicPlayerWrapper,
                  styles['tiktok-web']
                )}
              >
                {/* {data.image && <img src={`${data.image}`} alt={data.title} className={styles.ImgArticle}/>} */}
                {data.files[0] && <VideoItem url={data.files[0]} />}
              </div>
            </div>
          </div>
          <div className={styles.DivActionBGMask}></div>
          <div className={styles.DivMediaCardBottom}>
            <div className={styles.CaptionContainer}></div>
            <div className={styles.DivANchorTagContainer}>
              <div className={styles.DivAnchorTagWrapper}></div>
            </div>
            <div className={styles.DivInlineMusicAndIconContainer}>
              <div className={styles.DivFlexColumn}>
                <div className={styles.DivAuthorContentWrapper}>
                  <div className={styles.DivAuthorContainer}>
                    <a href="#" className={styles.StyledAuthorAnchor}>
                      <h3 className={styles.H3AuthorTitle}>{data.author}</h3>
                    </a>
                  </div>
                </div>
                <div className={styles.DivDescriptionWrapper}>
                  <div className={styles.DivMultilineTextContainer}>
                    <div className={styles.DivMultilineText}>
                      <div className={styles.DivDescriptionContentContainer}>
                        {data.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.DivPlayerControlsRight}></div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.SectionActionBarContainer}>
        <div className={styles.DivAvatarActionItemContainer}>
          <a href="#" className={styles.AvatarLink}>
            <div
              className={styles.DivAvatarActionItemContainer}
              style={{ width: '48px', height: '48px' }}
            >
              <div className={styles.DivAvatarWrapper}>
                <span
                  className={styles.DivAvatarActionItemContainer}
                  shape="circle"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                  }}
                >
                  <img
                    src="https://images2.thanhnien.vn/528068263637045248/2024/1/25/c3c8177f2e6142e8c4885dbff89eb92a-65a11aeea03da880-1706156293184503262817.jpg"
                    alt="Hi"
                    className={styles.ImgAvatar}
                  />
                </span>
              </div>
            </div>
          </a>
          <button className={styles['Button-StyledAvatarFollowButton']}>
            <div className={styles.ButtonContent}>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </button>
        </div>
        <button className={styles.ButtonActionItem}>
          <span
            className={styles.SpanIconWrapper}
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </span>
          <strong className={styles.StrongText}>Lượt thích</strong>
        </button>
        <button
          className={styles.ButtonActionItem}
          onClick={() => clickCommentsButton()}
        >
          <span className={styles.SpanIconWrapper}>
            <FontAwesomeIcon icon={faCommentDots} />
          </span>
          <strong className={styles.StrongText}>Bình luận</strong>
        </button>
        {/* Book mark Button */}
        <button className={styles.ButtonActionItem}>
          <span className={styles.SpanIconWrapper}>
            <FontAwesomeIcon icon={faTag} />
          </span>
          <strong className={styles.StrongText}>Nhãn dán</strong>
        </button>
        {/* Share Button */}
        <button className={styles.ButtonActionItem}>
          <span className={styles.SpanIconWrapper}>
            <FontAwesomeIcon icon={faShare} />
          </span>
          <strong className={styles.StrongText}>Chia sẻ</strong>
        </button>
        <a href="#">
          <div className={styles.MusicCoverDisc}></div>
        </a>
      </section>
    </div>
  );
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Article;
