// ReplyItem.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faFlag,
  faHeart as faHeartRegular,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import MorePopover from '../MorePopover/MorePopover';

export default function ReplyItem({ rep, post }) {
  const [liked, setLiked] = useState(rep.isLiked);
  const [likes, setLikes] = useState(rep.likes);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  const popoverContent = [
    {
      button: (
        <Button
          icon={<FontAwesomeIcon icon={faFlag} />}
          label="Report"
          secondary
          borderless
          size="medium"
          style={{ margin: '0px 8px' }}
        />
      ),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopover]);

  return (
    <div
      key={rep.id}
      id={`${rep.author.username}-${rep.postId}-${rep.id}`}
      className={styles.DivCommentContentContainer}
    >
      <a
        data-e2e="comment-avatar-1"
        className={styles.StyledUserLinkAvatar}
        href={`/@${rep.author.username}`}
        style={{ flex: '0 0 40px' }}
      >
        <span
          shape="circle"
          data-e2e=""
          className={styles.SpanAvatarContainer}
          style={{ width: '40px', height: '40px' }}
        >
          <img
            loading="lazy"
            alt=""
            src={rep.author.avatar}
            className={styles.ImgAvatar}
          />
        </span>
      </a>

      <div className={styles.DivContentContainer}>
        <a
          className={styles.StyledUserLinkName}
          href={`/@${rep.author.username}`}
        >
          <span className={styles.SpanUserNameText}>{rep.author.name}</span>
        </a>
        <p className={styles.PCommentText}>
          <span>{rep.content}</span>
        </p>
        <div className={styles.PCommentSubContent}>
          <span className={styles.SpanCreatedTime}>2d ago</span>
          <span className={styles.SpanReplyButton} role="button" tabIndex={0}>
            Reply
          </span>
          {rep?.isAuthorLiked && (
            <div className={styles.DivFloaterBoundsWrapper}>
              <img
                src={post.author.avatar}
                alt="avatar"
                style={{ width: '16px', height: '16px' }}
                className={styles['TUXBaseAvatar-src']}
              />
              <div
                className={styles.DivBottomFloaterContainer}
                style={{
                  insetInlineEnd: '-3px',
                  height: '10px',
                  width: '10px',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderColor: 'var(--ui-page-flat-1)',
                  borderImage: 'initial',
                  borderRadius: '50%',
                  bottom: '-3px',
                }}
              >
                <svg
                  color="inherit"
                  fontSize="inherit"
                  viewBox="0 0 48 48"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                >
                  <g clipPath="url(#Icon_Color-Like_Circle_svg__a)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M24 48a24 24 0 1 0 0-48 24 24 0 0 0 0 48Z"
                      fill="#FE2C55"
                    ></path>
                    <path
                      d="M24 15.9c2-2.52 4.76-3.48 7.5-2.92a8.3 8.3 0 0 1 4.85 3.42c1.4 2.08 2 5 .6 8.66-1.09 2.86-3.43 5.52-5.8 7.63a35.37 35.37 0 0 1-6.57 4.67l-.58.3-.58-.3a35.37 35.37 0 0 1-6.58-4.67c-2.36-2.11-4.7-4.77-5.8-7.63-1.4-3.66-.8-6.58.61-8.66a8.3 8.3 0 0 1 4.85-3.42c2.74-.56 5.5.4 7.5 2.92Z"
                      fill="#fff"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="Icon_Color-Like_Circle_svg__a">
                      <path fill="#fff" d="M0 0h48v48H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.DivActionContainer}>
        <div
          role="button"
          tabIndex={0}
          className={styles.DivMoreContainer}
          ref={buttonRef}
          onClick={() => setShowPopover((prev) => !prev)}
        >
          <FontAwesomeIcon
            icon={faEllipsis}
            className={styles.StyledMoreIcon}
          />
        </div>
        {showPopover && (
          <MorePopover
            onlyButton
            showDirection
            ref={popoverRef}
            triggerElement={buttonRef}
            list={popoverContent}
          />
        )}
        <div role="button" tabIndex={0} className={styles.DivLikeWrapper}>
          <div className={styles.DivLikeIcon}>
            <FontAwesomeIcon
              icon={liked ? faHeartRegular : faHeart}
              style={{
                width: '20px',
                height: '20px',
                color: liked ? 'var(--ui-shape-primary)' : 'inherit',
              }}
              onClick={() => toggleLike()}
            />
          </div>
          <span className={styles.SpanCount}>{likes}</span>
        </div>
      </div>
    </div>
  );
}
