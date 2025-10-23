import { useState } from 'react';
import styles from './UserInfo.module.scss';
import clsx from 'clsx';
import formatNumberShort from '../../utils/formatNumberShort';
import VerifyBadge from '../VerifyBadge';
import { Link } from 'react-router-dom';
import followService from '../../services/follow/follow.service';

function UserInfo({
  user,
  showFollowers = false,
  showBio = false,
  showFollowButton = false,
}) {
  const [follow, setFollow] = useState(user?.isFollow);
  const [followers, setFollowers] = useState(user?.followerCount);

  const toggleFollow = async () => {
    try {
      if (follow) {
        await followService.unfollow({
          followAbleId: user.id,
          type: 'user',
        });
      } else {
        await followService.follow({ followAbleId: user.id, type: 'user' });
      }
      setFollow((prev) => !prev);
      setFollowers((prev) => (follow ? prev - 1 : prev + 1));
    } catch (err) {
      console.log(err);
    }
  };

  if (!user?.name) return null;
  return (
    <div
      data-e2e="search-user-container"
      id="search_user-item-user-link-0"
      role="link"
      tabIndex={0}
      aria-label={`${user.name}’s profile`}
      className={styles['DivLink']}
    >
      <div className={styles['DivItemContainer']}>
        <div className={styles['DivUserInfoContainer']}>
          <Link
            tabIndex={-1}
            data-e2e="search-user-avatar"
            aria-label={`${user.name}’s profile`}
            className={`${styles['StyledAvatarUserLink']} link-a11y-focus`}
            to={`/@${user.username}`}
          >
            <div
              className={styles['DivContainer']}
              style={{ width: '60px', height: '60px' }}
            >
              <span
                shape="circle"
                className={`${styles['SpanAvatarContainer-StyledAvatar']} e1vl87hj2`}
                style={{ width: '60px', height: '60px' }}
              >
                <img
                  loading="lazy"
                  alt=""
                  src={user.avatar}
                  className={styles['ImgAvatar']}
                />
              </span>
            </div>
          </Link>
          <Link
            data-e2e="search-user-info-container"
            tabIndex={-1}
            className={`${styles['StyledDivInfoWrapper']} link-a11y-focus`}
            to={`/@${user.username}`}
            style={{ textDecoration: 'none' }}
          >
            <p data-e2e="search-user-unique-id" className={styles['PTitle']}>
              {user.username}
              {user?.isVerifiedBadge && <VerifyBadge />}
            </p>

            <div className={styles['DivSubTitleWrapper']}>
              <p
                data-e2e="search-user-nickname"
                className={styles['PUserSubTitle']}
              >
                {user.name}
              </p>{' '}
              {showFollowers && (
                <strong data-e2e="search-follow-count">
                  {'.'} {formatNumberShort(followers)} <span>Followers</span>
                </strong>
              )}
            </div>
            {showBio && (
              <p data-e2e="search-user-desc" className={styles.PDesc}>
                <strong>{user?.bio} </strong>
              </p>
            )}
          </Link>
          {showFollowButton && (
            <div className={styles.DivFollowButtonContainer}>
              <div className={styles.DivFollowButtonWrapperV2}>
                <button
                  type="button"
                  data-e2e="follow-button"
                  aria-label="Follow Aom"
                  className={
                    follow
                      ? styles['Button-StyledUnFollowButtonV2']
                      : styles['Button-StyledFollowButtonV2']
                  }
                  style={{ height: '35px' }}
                  onClick={toggleFollow}
                >
                  {follow ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
