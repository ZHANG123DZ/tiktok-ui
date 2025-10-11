import clsx from 'clsx';
import styles from './ActionBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faCheck,
  faCommentDots,
  faHeart,
  faPlus,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import formatNumberShort from '../../utils/formatNumberShort';
import { useRef, useState } from 'react';
import { useArticle } from '../../contexts/ArticleContext';
import followService from '../../services/follow/follow.service';
import ProtectedButton from '../ProtectedButton';
import likeService from '../../services/like/like.service';
import bookMarkService from '../../services/bookMark/bookMark.service';

export default function ActionBar({ data }) {
  const authorId = data.author?.id;
  const postId = data.id;
  const [liked, setLiked] = useState(data.isLiked);
  const [likes, setLikes] = useState(data.likeCount);
  const [bookMarked, setBookMarked] = useState(data.isBookMarked);
  const [bookMarks, setBookMarks] = useState(data.bookMarkCount);
  const [follow, setFollow] = useState(data.author.isFollow);
  const [tickShown, setTickShown] = useState(false);
  const [comments, setComments] = useState(data.commentCount);
  const [share, setShare] = useState(data.shareCount);
  const shareRef = useRef(null);
  const { clickCommentsButton, clickShareButton } = useArticle();

  const toggleFollow = async () => {
    try {
      if (follow) {
        await followService.unfollow({ followAbleId: authorId, type: 'user' });
      } else {
        await followService.follow({ followAbleId: authorId, type: 'user' });
      }
      setFollow((prev) => !prev);
      setTickShown(!follow);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = async () => {
    try {
      if (liked) {
        await likeService.unlike({ likeAbleId: postId, type: 'post' });
      } else {
        await likeService.like({ likeAbleId: postId, type: 'post' });
      }
      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.log(err);
    }
  };

  const toggleBookMark = async () => {
    try {
      if (bookMarked) {
        await bookMarkService.unBookMark({
          bookMarkAbleId: postId,
          type: 'post',
        });
      } else {
        await bookMarkService.bookmark({
          bookMarkAbleId: postId,
          type: 'post',
        });
      }
      setBookMarked((prev) => !prev);
      setBookMarks((prev) => (bookMarked ? prev - 1 : prev + 1));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section
      className={clsx(styles.SectionActionBarContainer, styles.ees02z00)}
    >
      <div
        className={clsx(styles.DivAvatarActionItemContainer, styles.eth6dzb0)}
      >
        <Link
          data-e2e="video-author-avatar"
          className={clsx(
            styles.AvatarLink,
            styles.e1g2yhv83,
            'link-a11y-focus'
          )}
          to={`/@${data.author.username}`}
        >
          <div
            size="48"
            className={clsx(styles.DivContainer, styles.e7u9pde0)}
            style={{ width: '48px', height: '48px' }}
          >
            <div className={clsx(styles.DivAvatarWrapper, styles.e7u9pde1)}>
              <span
                shape="circle"
                data-e2e=""
                className={clsx(
                  styles.SpanAvatarContainer,
                  styles.e1e9er4e0,
                  styles['SpanAvatarContainer-StyledAvatar']
                )}
                style={{ width: '48px', height: '48px' }}
              >
                <img
                  loading="lazy"
                  alt={data.author.username}
                  src={data.author.avatar}
                  className={clsx(styles.ImgAvatar, styles.e1e9er4e1)}
                />
              </span>
            </div>
          </div>
        </Link>

        {(!follow || tickShown) && (
          <ProtectedButton onClick={toggleFollow}>
            <button
              className={clsx(
                styles.eth6dzb1,
                styles['Button-StyledAvatarFollowButton'],
                styles.e1v8cfre0,
                tickShown && styles.checkFollow
              )}
              shape="capsule"
              data-e2e="feed-follow"
            >
              <div className={clsx(styles.ButtonContent, styles.e1v8cfre2)}>
                <FontAwesomeIcon
                  icon={follow ? faCheck : faPlus}
                  style={{ color: follow ? 'rgb(255, 59, 92)' : 'white' }}
                />
              </div>
            </button>
          </ProtectedButton>
        )}
      </div>

      {/* Like Button */}
      <ProtectedButton onClick={toggleLike}>
        <button
          type="button"
          aria-label={`Like video&#10;${likes} likes`}
          aria-pressed="false"
          className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
        >
          <span
            data-e2e="like-icon"
            className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
            style={{
              color: liked ? '#FE2C55' : 'rgba(255, 255, 255, 0.9)',
            }}
          >
            {/* Heart SVG omitted for brevity */}
            <FontAwesomeIcon
              icon={faHeart}
              style={{ width: '24px', height: '24px' }}
            />
          </span>
          <strong
            data-e2e="like-count"
            className={clsx(styles.StrongText, styles.e1hk3hf92)}
          >
            {formatNumberShort(likes)}
          </strong>
        </button>
      </ProtectedButton>

      {/* Comment Button */}

      <button
        type="button"
        aria-label={`Read or add comments&#10;${comments} comments`}
        className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
      >
        <span
          data-e2e="comment-icon"
          className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          onClick={() => clickCommentsButton()}
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            style={{ width: '24px', height: '24px' }}
          />
        </span>
        <strong
          data-e2e="comment-count"
          className={clsx(styles.StrongText, styles.e1hk3hf92)}
        >
          {formatNumberShort(comments)}
        </strong>
      </button>

      {/* Favorite Button */}
      <ProtectedButton onClick={toggleBookMark}>
        <div aria-expanded="false" aria-haspopup="dialog">
          <button
            type="button"
            aria-label={`Add to Favorites. ${bookMarks} added to Favorites`}
            className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
          >
            <span
              data-e2e="favorite-icon"
              className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
              style={{
                color: bookMarked ? '#FFC300' : 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ width: '24px', height: '24px' }}
              />
            </span>
            <strong
              data-e2e="favorite-count"
              className={clsx(styles.StrongText, styles.e1hk3hf92)}
            >
              {formatNumberShort(bookMarks)}
            </strong>
          </button>
        </div>
      </ProtectedButton>

      {/* Share Button */}
      <button
        type="button"
        aria-label={`Share video&#10;${share} shares`}
        aria-expanded="false"
        className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
      >
        <span
          ref={shareRef}
          data-e2e="share-icon"
          className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          onClick={() => clickShareButton()}
        >
          <FontAwesomeIcon
            icon={faShare}
            style={{ width: '24px', height: '24px' }}
          />
        </span>
        <strong
          data-e2e="share-count"
          className={clsx(styles.StrongText, styles.e1hk3hf92)}
        >
          {formatNumberShort(share)}
        </strong>
      </button>

      {/* Music Link */}
      {data.music && (
        <Link
          target="_self"
          rel="opener"
          data-e2e="video-music"
          aria-label={`Watch more videos with music nhạc nền - ${data.music.author}`}
          className="link-a11y-focus"
          to={`/music/${
            data.music.author?.name.replaceAll(' ', '-') + '-' || ''
          }${data.music.id}`}
        >
          <div
            className={clsx(styles.MusicCoverDisc, styles.e1nplrh00)}
            style={{
              backgroundImage: `url(${data.music.thumbnail})`,
            }}
          ></div>
        </Link>
      )}
    </section>
  );
}
