import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotFoundAccount.module.scss'; // Đổi tên file SCSS tùy bạn
import { faUser } from '@fortawesome/free-solid-svg-icons';

function NotFoundAccount() {
  return (
    <div className={styles.UserContainer}>
      <div className={styles['DivShareLayoutBase-StyledShareLayoutV2']}>
        <div
          data-e2e="user-page"
          id="main-content-others_homepage"
          className={styles.DivShareLayoutContentV2}
        >
          <main className={styles.MainDetailWrapper}>
            <div className={styles.DivErrorContainer}>
              <FontAwesomeIcon icon={faUser} fontSize={'90px'} />
              <p className={styles.PTitle}>Không thể tìm thấy tài khoản này</p>
              <p className={styles.PDesc}>
                Bạn đang tìm video? Hãy thử trình duyệt qua những người sáng
                tạo, hashtag và âm thanh thịnh hành của chúng tôi.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default NotFoundAccount;
