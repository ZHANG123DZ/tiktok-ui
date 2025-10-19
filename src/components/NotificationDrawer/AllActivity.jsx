import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotificationDrawer.module.scss';
import { faBox } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import notificationService from '../../services/notification/notification.service';
import FollowBox from './item/FollowBox';

function AllActivity() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const fetchNotify = async () => {
      const res = await notificationService.getAllNotification();
      setNotify(res.data.items);
    };
    fetchNotify();
  }, []);

  return (
    <div
      data-e2e="inbox-list"
      id="header-inbox-list"
      tabIndex="0"
      role="tabpanel"
      aria-labelledby="inbox-tab-0"
      className={styles.DivInboxContentContainer}
    >
      <p className={styles.PTimeGroupTitle}>Tuần này</p>
      <ul className={styles.UlInboxItemListContainer}>
        <li className={styles.LiInboxItemWrapper}>
          <div className={styles.DivSystemNotifItemContainer}>
            <div className={styles.DivSystemNotifIconContainer}>
              <FontAwesomeIcon icon={faBox} fontSize={16} />
            </div>
            <div className={styles.DivContentContainer}>
              <div className="TUXAlertBadgeDot-reference">
                <p className={styles.PTitleText}>System Notifications</p>
                <div
                  className={`${styles.StyledBadgeDot} TUXAlertBadgeDot TUXAlertBadgeDot--large`}
                  data-text-direction="ltr"
                ></div>
              </div>
              <p className={styles.PSystemNotifDescText}>
                Account Updates: Hồ sơ TikTok của bạn hiện đang được đề xuất cho
                những người mở hoặc gửi liên kết cho bạn. Trong 30 ngày, chúng
                tôi sẽ xóa cài đặt quyền riêng tư này và tiếp tục giữ nguyên tùy
                chọn của bạn. Mục cài đặt mới "Hiển thị hồ sơ khi chia sẻ liên
                kết" sẽ được triển khai và sẽ được bật đối với bạn dựa trên tùy
                chọn "Người mở hoặc gửi liên kết cho bạn" hiện tại. Bạn có thể
                thay đổi cài đặt này bất kỳ lúc nào trong mục Cài đặt quyền
                riêng tư.
              </p>
            </div>
            <div className={styles.DivArrowContainer}>
              <svg
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                className="flip-rtl"
                style={{ fontSize: '16px' }}
              >
                <path d="M28.74 24 15.08 10.33a1 1 0 0 1 0-1.41l1.84-1.84a1 1 0 0 1 1.41 0L34.54 23.3a1 1 0 0 1 0 1.42l-16.2 16.21a1 1 0 0 1-1.42 0l-1.84-1.84a1 1 0 0 1 0-1.41L28.74 24Z" />
              </svg>
            </div>
          </div>
        </li>
      </ul>
      <p className={styles.PTimeGroupTitle}>Trước đây</p>
      <ul className={styles.UlInboxItemListContainer}>
        {notify.follower?.map((i) => (
          <li className={styles.LiInboxItemWrapper} key={i.id}>
            <FollowBox data={i} />
          </li>
        ))}
      </ul>
      <ul className={styles.UlInboxItemListContainer}>
        {notify.like_comment?.map((i) => (
          <li className={styles.LiInboxItemWrapper} key={i.id}>
            <FollowBox data={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllActivity;
