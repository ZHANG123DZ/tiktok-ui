import styles from './UserInfo.module.scss';

function UserInfo({ user }) {
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
          <a
            tabIndex={-1}
            data-e2e="search-user-avatar"
            aria-label={`${user.name}’s profile`}
            className={`${styles['StyledAvatarUserLink']} link-a11y-focus`}
            href={`/@${user.username}`}
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
          </a>
          <a
            data-e2e="search-user-info-container"
            tabIndex={-1}
            className={`${styles['StyledDivInfoWrapper']} link-a11y-focus`}
            href={`/@${user.username}`}
            style={{ textDecoration: 'none' }}
          >
            <p data-e2e="search-user-unique-id" className={styles['PTitle']}>
              {user.username}
            </p>
            <div className={styles['DivSubTitleWrapper']}>
              <p
                data-e2e="search-user-nickname"
                className={styles['PUserSubTitle']}
              >
                {user.name}
              </p>{' '}
              ·{' '}
              <strong data-e2e="search-follow-count">
                {user.followers} <span>Followers</span>
              </strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
