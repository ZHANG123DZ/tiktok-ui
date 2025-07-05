import styles from './styles.module.scss';

function UserCard() {
  return (
    <div
      tabIndex={0}
      role="link"
      aria-label="CrisDevilGamer’s profile"
      data-e2e="recommend-card"
      className={styles.DivUserCard}
      style={{ position: 'relative' }}
    >
      <a
        href="/@crisdevilgamer7"
        target="_blank"
        rel="opener"
        tabIndex={-1}
        aria-label="CrisDevilGamer’s profile"
        className={styles.AUserCardLink}
      >
        <div mode="1" className={styles.DivContainer}>
          <div className={styles.imageWrapper}>
            <span
              style={{
                boxSizing: 'border-box',
                display: 'block',
                overflow: 'hidden',
                width: 'initial',
                height: 'initial',
                background: 'none',
                opacity: 1,
                border: 0,
                margin: 0,
                padding: 0,
                position: 'absolute',
                inset: 0,
              }}
            >
              <picture>
                <img
                  alt=""
                  decoding="async"
                  src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oEDmUFDsREBwUIAsU0EE78CAPAJgy9AzNoffCA~tplv-photomode-zoomcover:480:480.jpeg?dr=14555&x-expires=1750428000&x-signature=vw%2BfKowRaFtmi9D69Wl0iQctw78%3D&t=4d5b0474&ps=13740610&shp=b59d6b55&shcp=43f4a2f9&idc=my&ftpl=1"
                  srcSet="https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oEDmUFDsREBwUIAsU0EE78CAPAJgy9AzNoffCA~tplv-photomode-zoomcover:480:480.jpeg?dr=14555&x-expires=1750428000&x-signature=vw%2BfKowRaFtmi9D69Wl0iQctw78%3D&t=4d5b0474&ps=13740610&shp=b59d6b55&shcp=43f4a2f9&idc=my&ftpl=1 1x, https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oEDmUFDsREBwUIAsU0EE78CAPAJgy9AzNoffCA~tplv-photomode-zoomcover:480:480.jpeg?dr=14555&x-expires=1750428000&x-signature=vw%2BfKowRaFtmi9D69Wl0iQctw78%3D&t=4d5b0474&ps=13740610&shp=b59d6b55&shcp=43f4a2f9&idc=my&ftpl=1 2x"
                  className={styles.coverImg}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxSizing: 'border-box',
                    padding: 0,
                    border: 'none',
                    margin: 'auto',
                    display: 'block',
                    width: 0,
                    height: 0,
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                />
              </picture>
            </span>
          </div>
        </div>

        <div className={styles.DivInfoContainer}>
          <span
            shape="circle"
            data-e2e="user-avatar"
            className={styles.SpanAvatarContainer}
            style={{
              marginBottom: '14px',
              flexShrink: 0,
              width: '48px',
              height: '48px',
            }}
          >
            <img
              loading="lazy"
              alt=""
              src="https://p9-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/cfad1886bf6c13d8d0debfbfa9177343~tplv-tiktokx-cropcenter:100:100.jpeg?dr=14579&refresh_token=b2d571c5&x-expires=1750428000&x-signature=wLqyKegbws2mKd0pKC7xBGXXBAY%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=b59d6b55&idc=my"
              className={styles.ImgAvatar}
            />
          </span>

          <h3 data-e2e="user-title" className={styles.H3Username}>
            CrisDevilGamer
          </h3>

          <h4 data-e2e="user-subtitle" className={styles.H4UniqueIdContainer}>
            <span className={styles.SpanUniqueId}>crisdevilgamer7</span>
            <div
              data-e2e="follow-bluev"
              className={styles.DivVerifiedBadgeContainer}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="24" cy="24" r="24" fill="#20D5EC" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M37.1213 15.8787C38.2929 17.0503 38.2929 18.9497 37.1213 20.1213L23.6213 33.6213C22.4497 34.7929 20.5503 34.7929 19.3787 33.6213L10.8787 25.1213C9.70711 23.9497 9.70711 22.0503 10.8787 20.8787C12.0503 19.7071 13.9497 19.7071 15.1213 20.8787L21.5 27.2574L32.8787 15.8787C34.0503 14.7071 35.9497 14.7071 37.1213 15.8787Z"
                  fill="white"
                />
              </svg>
            </div>
          </h4>

          <div className={styles.DivButtonContainer}>
            <button
              type="button"
              data-e2e="card-followbutton"
              className={styles.followButton}
            >
              Follow
            </button>
          </div>
        </div>
      </a>
    </div>
  );
}

export default UserCard;
