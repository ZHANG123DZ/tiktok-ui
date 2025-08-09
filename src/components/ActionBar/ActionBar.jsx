import clsx from 'clsx';
import styles from './ActionBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faComment,
  faHeart,
  faPlus,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

export default function ActionBar() {
  return (
    <section
      className={clsx(styles.SectionActionBarContainer, styles.ees02z00)}
    >
      <div
        className={clsx(styles.DivAvatarActionItemContainer, styles.eth6dzb0)}
      >
        <a
          data-e2e="video-author-avatar"
          className={clsx(
            styles.AvatarLink,
            styles.e1g2yhv83,
            'link-a11y-focus'
          )}
          href="/@pleasejustkama"
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
                  styles['css-1ilbfm8-SpanAvatarContainer-StyledAvatar']
                )}
                style={{ width: '48px', height: '48px' }}
              >
                <img
                  loading="lazy"
                  alt="pleasejustkama"
                  src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/85123a4f1138b56e65e302541fad4e8d~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=02c4fcca&x-expires=1754733600&x-signature=cwXzXr8rKLmCX7ubSt66ENjj2oM%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2"
                  className={clsx(styles.ImgAvatar, styles.e1e9er4e1)}
                />
              </span>
            </div>
          </div>
        </a>

        <button
          className={clsx(
            styles.eth6dzb1,
            styles['Button-StyledAvatarFollowButton'],
            styles.e1v8cfre0
          )}
          shape="capsule"
          data-e2e="feed-follow"
        >
          <div className={clsx(styles.ButtonContent, styles.e1v8cfre2)}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        </button>
      </div>

      {/* Like Button */}
      <button
        type="button"
        aria-label="Like video&#10;137.5K likes"
        aria-pressed="false"
        className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
      >
        <span
          data-e2e="like-icon"
          className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          {/* Heart SVG omitted for brevity */}
          <FontAwesomeIcon icon={faHeart} />
        </span>
        <strong
          data-e2e="like-count"
          className={clsx(styles.StrongText, styles.e1hk3hf92)}
        >
          137.5K
        </strong>
      </button>

      {/* Comment Button */}
      <button
        type="button"
        aria-label="Read or add comments&#10;1271 comments"
        className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
      >
        <span
          data-e2e="comment-icon"
          className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          <FontAwesomeIcon icon={faComment} />
        </span>
        <strong
          data-e2e="comment-count"
          className={clsx(styles.StrongText, styles.e1hk3hf92)}
        >
          1271
        </strong>
      </button>

      {/* Favorite Button */}
      <div aria-expanded="false" aria-haspopup="dialog">
        <button
          type="button"
          aria-label="Add to Favorites. 19K added to Favorites"
          className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
        >
          <span
            data-e2e="favorite-icon"
            className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
            style={{ color: 'rgba(255, 255, 255, 0.9)' }}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </span>
          <strong
            data-e2e="favorite-count"
            className={clsx(styles.StrongText, styles.e1hk3hf92)}
          >
            19K
          </strong>
        </button>
      </div>

      {/* Share Button */}
      <button
        type="button"
        aria-label="Share video&#10;4371 shares"
        aria-expanded="false"
        className={clsx(styles.ButtonActionItem, styles.e1hk3hf90)}
      >
        <span
          data-e2e="share-icon"
          className={clsx(styles.SpanIconWrapper, styles.e1hk3hf91)}
          style={{ color: 'rgba(255, 255, 255, 0.9)' }}
        >
          <FontAwesomeIcon icon={faShare} />
        </span>
        <strong
          data-e2e="share-count"
          className={clsx(styles.StrongText, styles.e1hk3hf92)}
        >
          4371
        </strong>
      </button>

      {/* Music Link */}
      <a
        target="_self"
        rel="opener"
        data-e2e="video-music"
        aria-label="Watch more videos with music оригинальный звук - Yussupova Camilla"
        className="link-a11y-focus"
        href="/music/оригинальный-звук-7516973298736286469"
      >
        <div
          className={clsx(styles.MusicCoverDisc, styles.e1nplrh00)}
          style={{
            backgroundImage:
              'url("https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/85123a4f1138b56e65e302541fad4e8d~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=02c4fcca&x-expires=1754733600&x-signature=cwXzXr8rKLmCX7ubSt66ENjj2oM%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=my2")',
          }}
        ></div>
      </a>
    </section>
  );
}
