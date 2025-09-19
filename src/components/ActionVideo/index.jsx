import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ActionVideo.module.scss';
import {
  faBookmark,
  faCode,
  faCommentDots,
  faHeart,
  faPaperPlane,
  faRepeat,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { FaFacebookF } from 'react-icons/fa';
import Icon from '../Icon/Icon';
import { useState } from 'react';
import ShareModal from '../ShareModal';
import handleCopy from '../../utils/handleCopy';
import formatNumberShort from '../../utils/formatNumberShort';

const ActionVideo = ({ data }) => {
  const buttons = [
    {
      icon: (
        <FontAwesomeIcon
          icon={faRepeat}
          style={{
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            padding: '5px',
            backgroundColor: '#FFC300',
            color: 'white',
          }}
        />
      ),
      name: 'repost',
      label: 'Đăng lại',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faCode}
          style={{
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            padding: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: 'white',
          }}
        />
      ),
      name: 'embed',
      label: 'Nhúng',
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faPaperPlane}
          style={{
            width: '13px',
            height: '13px',
            borderRadius: '50%',
            padding: '5px',
            backgroundColor: 'rgba(255, 59, 92, 1)',
            color: 'white',
          }}
        />
      ),
      color: 'bg-pink-500',
      name: 'message',
      label: 'Gửi đến bạn bè',
    },
    {
      icon: (
        <FaFacebookF
          size={13}
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            padding: '5px',
            backgroundColor: '#1877F2',
            color: 'white',
          }}
        />
      ),
      name: 'facebook',
      label: 'Chia sẻ lên Facebook',
    },
    {
      icon: (
        <Icon
          name="WhatsApp"
          color={'white'}
          style={{
            backgroundColor: 'rgb(37, 211, 102)',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            padding: '5px',
          }}
          size={'13px'}
        />
      ),
      name: 'whatsapp',
      label: 'Chia sẻ lên WhatsApp',
    },
  ];
  const [activeShare, setActiveShare] = useState(false);
  const [liked, setLiked] = useState(data?.isLiked || false);
  const [likes, setLikes] = useState(data?.likeCount || 0);
  const [bookMarks, setBookMarks] = useState(data?.bookMarkCount || 0);
  const [bookMarked, setBookMarked] = useState(data?.isBookMarked || false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const toggleBookMarked = async () => {
    setBookMarked(!bookMarked);
    setBookMarks((prev) => (bookMarks ? prev - 1 : prev + 1));
  };

  return (
    <div className={styles.DivMainContent}>
      <div className={styles.DivContainer}>
        <div className={styles['DivFlexCenterRow-StyledWrapper']}>
          <div className={styles.DivFlexCenterRow} style={{ gap: '20px' }}>
            {/* Like Button */}
            <button
              type="button"
              aria-label={`${likes} Lượt thích`}
              aria-pressed="false"
              className={styles.ButtonActionItem}
            >
              <span
                data-e2e="browse-like-icon"
                className={styles.SpanIconWrapper}
                onClick={() => toggleLike()}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    width: '20px',
                    height: '20px',
                    color: liked
                      ? 'var(--ui-shape-primary)'
                      : 'rgba(255, 255, 255, .9)',
                  }}
                />
              </span>
              <strong
                data-e2e="browse-like-count"
                className={styles.StrongText}
              >
                {formatNumberShort(likes)}
              </strong>
            </button>

            {/* Comment Button */}
            <button type="button" disabled className={styles.ButtonActionItem}>
              <span
                data-e2e="browse-comment-icon"
                className={styles.SpanIconWrapper}
              >
                <FontAwesomeIcon
                  icon={faCommentDots}
                  style={{
                    width: '20px',
                    height: '20px',
                  }}
                />
              </span>
              <strong
                data-e2e="browse-comment-count"
                className={styles.StrongText}
              >
                {data?.commentCount}
              </strong>
            </button>

            {/* Collect Button */}
            <div aria-expanded="false" aria-haspopup="dialog">
              <button type="button" className={styles.ButtonActionItem}>
                <span
                  className={styles.SpanIconWrapper}
                  onClick={() => toggleBookMarked()}
                >
                  <FontAwesomeIcon
                    icon={faBookmark}
                    style={{
                      width: '20px',
                      height: '20px',
                      color: bookMarked
                        ? 'rgb(255, 195, 0)'
                        : 'rgba(255, 255, 255, .9)',
                    }}
                  />
                </span>
                <strong className={styles.StrongText}>
                  {formatNumberShort(bookMarks)}
                </strong>
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div
            data-e2e="browse-share-group"
            className={styles.DivFlexCenterRow}
          >
            {buttons.map((btn) => (
              <a
                key={btn.name}
                id={`icon-element-${btn.name}`}
                mode="0"
                href="#"
                data-e2e="video-share-repost"
                aria-label="Đăng lại"
                className={styles.AShareLink}
              >
                {btn.icon}
              </a>
            ))}

            {/* Share Dropdown */}
            <button
              aria-expanded="false"
              aria-label="Chia sẻ"
              className={styles.ButtonShare}
              onClick={() => setActiveShare(true)}
            >
              <FontAwesomeIcon icon={faShare} size="16px" />
            </button>
            {activeShare && (
              <ShareModal
                isOpen={activeShare}
                onClose={() => setActiveShare(false)}
              />
            )}
          </div>
        </div>

        {/* Copy Link */}
        <div className={styles.DivCopyLinkContainer}>
          <p data-e2e="browse-video-link" className={styles.PCopyLinkText}>
            {window.location.href}
          </p>
          <button
            data-e2e="browse-copy"
            className={styles.ButtonCopyLink}
            onClick={() => {
              handleCopy();
            }}
          >
            Sao chép liên kết
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionVideo;
