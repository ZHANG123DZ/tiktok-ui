import styles from './SearchUser.module.scss';

export default function SearchUser() {
  return (
    <div
      data-e2e="search-user-container"
      id="search_user-item-user-link-0"
      role="link"
      tabIndex={0}
      aria-label="Iran vs Israel’s profile"
      className={styles['DivLink']}
    >
      <div className={styles['DivItemContainer']}>
        <div className={styles['DivUserInfoContainer']}>
          <a
            tabIndex={-1}
            data-e2e="search-user-avatar"
            aria-label="Iran vs Israel’s profile"
            className={`${styles['StyledAvatarUserLink']} link-a11y-focus`}
            href="/@iran.vs.israel5?lang=en"
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
                  src="https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/7c2f20ffcb4712733cb713d50903e377~tplv-tiktokx-cropcenter:100:100.jpeg?biz_tag=tiktok_user.user_cover&dr=14579&idc=my&ps=13740610&refresh_token=3f0bae3f&shcp=c1333099&shp=30310797&t=4d5b0474&x-expires=1750503600&x-signature=u4u6XzrTr5qCQFlAwGpsfaJGyVU%3D"
                  className={styles['ImgAvatar']}
                />
              </span>
            </div>
          </a>
          <a
            data-e2e="search-user-info-container"
            tabIndex={-1}
            className={`${styles['StyledDivInfoWrapper']} link-a11y-focus`}
            href="/@iran.vs.israel5?lang=en"
            style={{ textDecoration: 'none' }}
          >
            <p data-e2e="search-user-unique-id" className={styles['PTitle']}>
              iran.vs.israel5
            </p>
            <div className={styles['DivSubTitleWrapper']}>
              <p
                data-e2e="search-user-nickname"
                className={styles['PUserSubTitle']}
              >
                Iran vs Israel
              </p>{' '}
              ·{' '}
              <strong data-e2e="search-follow-count">
                7607 <span>Followers</span>
              </strong>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
