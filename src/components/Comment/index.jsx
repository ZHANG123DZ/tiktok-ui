import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faEllipsis,
  faFlag,
  faHeart as faHeartRegular,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import ReplyItem from './Reply';
import MorePopover from '../MorePopover/MorePopover';
import Button from '../Button';

const commentData = {
  id: 4,
  content: 'Tôi QUa dep trai',
  likes: 54657,
  createdAt: '2025-08-14 18:14:16.868',
  isLiked: false,
  author: {
    id: 234,
    avatar:
      'https://bayotech.vn/wp-content/uploads/2025/04/anh-gai-xinh-30.jpg',
    name: 'Baby Cute',
    username: 'cute',
    followers: 2345,
    likes: 23495,
    postId: 34,
  },
  replies: [
    {
      id: 5,
      content: 'Tôi QUa dep trai',
      isLiked: false,
      likes: 54657,
      createdAt: '2025-08-14 18:14:16.868',
      author: {
        id: 234,
        avatar:
          'https://bayotech.vn/wp-content/uploads/2025/04/anh-gai-xinh-30.jpg',
        name: 'Baby Cute',
        username: 'cute',
        followers: 2345,
        likes: 23495,
        postId: 34,
      },
    },
    {
      id: 6,
      content: 'Tôi QUa dep trai',
      isLiked: false,
      likes: 54657,
      createdAt: '2025-08-14 18:14:16.868',
      author: {
        id: 234,
        avatar:
          'https://bayotech.vn/wp-content/uploads/2025/04/anh-gai-xinh-30.jpg',
        name: 'Baby Cute',
        username: 'cute',
        followers: 2345,
        likes: 23495,
        postId: 34,
      },
    },
    {
      id: 7,
      content: 'Tôi QUa dep trai',
      isLiked: true,
      likes: 54657,
      createdAt: '2025-08-14 18:14:16.868',
      author: {
        id: 234,
        avatar:
          'https://bayotech.vn/wp-content/uploads/2025/04/anh-gai-xinh-30.jpg',
        name: 'Baby Cute',
        username: 'cute',
        followers: 2345,
        likes: 23495,
        postId: 34,
      },
    },
    {
      id: 8,
      content: 'Tôi QUa dep trai',
      likes: 54657,
      createdAt: '2025-08-14 18:14:16.868',
      isLiked: true,
      author: {
        id: 234,
        avatar:
          'https://bayotech.vn/wp-content/uploads/2025/04/anh-gai-xinh-30.jpg',
        name: 'Baby Cute',
        username: 'cute',
        followers: 2345,
        likes: 2395,
        postId: 34,
      },
    },
  ],
};

function Comment({ data, post, setComments }) {
  const [comment, setComment] = useState(data); // dùng props thay vì hardcode
  const [seeMoreReply, setSeeMoreReply] = useState(0);
  const [liked, setLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);

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

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const totalReplies = comment.replies.length;
  const displayedReplies = comment.replies.slice(0, seeMoreReply);

  const handleViewMore = () =>
    seeMoreReply ? setSeeMoreReply((prev) => prev + 3) : setSeeMoreReply(3);

  const handleHide = () => setSeeMoreReply(0);

  return (
    <div className={styles.DivCommentItemContainer}>
      <div
        id={`${comment.author.username}-${comment.postId}-${comment.id}`}
        className={styles.DivCommentContentContainer}
      >
        {/* Avatar */}
        <a
          data-e2e="comment-avatar-1"
          className={styles.StyledUserLinkAvatar}
          href={`/@${comment.author.username}`}
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
              src={comment.author.avatar}
              className={styles.ImgAvatar}
            />
          </span>
        </a>

        {/* Content */}
        <div className={styles.DivContentContainer}>
          <a
            className={styles.StyledUserLinkName}
            href={`/@${comment.author.username}`}
          >
            <span className={styles.SpanUserNameText}>
              {comment.author.name}
              {comment.author.id === post.author.id && (
                <>
                  {'.'}
                  <span
                    data-e2e="comment-creator-2"
                    className={styles.SpanIdentity}
                  >
                    Creator
                  </span>
                </>
              )}
            </span>
          </a>
          <p className={styles.PCommentText}>{comment.content}</p>
          <div className={styles.PCommentSubContent}>
            <span className={styles.SpanCreatedTime}>2d ago</span>
            <span className={styles.SpanReplyButton} role="button" tabIndex={0}>
              Reply
            </span>
            {/* If creator like this comment */}
            {data?.isAuthorLiked && (
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

        {/* Actions */}
        <div className={styles.DivActionContainer}>
          <div
            ref={buttonRef}
            role="button"
            tabIndex={0}
            className={styles.DivMoreContainer}
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

      {/* Replies */}
      <div className={styles.DivReplyContainer}>
        {displayedReplies.map((rep) => (
          <ReplyItem key={rep.id} rep={rep} post={post} />
        ))}
        <div className={styles.DivReplyActionContainer}>
          {totalReplies > seeMoreReply && (
            <p
              role="button"
              tabIndex={0}
              className={styles.PReplyActionText}
              onClick={handleViewMore}
            >
              View{' '}
              {seeMoreReply
                ? `${totalReplies - seeMoreReply} more`
                : `${totalReplies} replies`}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={styles.StyledChevronDownFill}
              />
            </p>
          )}

          {seeMoreReply > 0 && (
            <p
              role="button"
              tabIndex={0}
              className={styles.PReplyActionText}
              onClick={handleHide}
            >
              Hide <FontAwesomeIcon icon={faChevronUp} />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
