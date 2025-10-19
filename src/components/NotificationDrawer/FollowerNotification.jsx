import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../Error';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import notificationService from '../../services/notification/notification.service';
import FollowBox from './item/FollowBox';
import styles from './NotificationDrawer.module.scss';

function FollowerNotification() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const fetchNotify = async () => {
      const res = await notificationService.getAllNotifyByType('follower');
      setNotify(res.data.items);
    };
    fetchNotify();
  }, []);

  return notify.length > 0 ? (
    <div
      data-e2e="inbox-list"
      id="header-inbox-list"
      tabIndex="0"
      role="tabpanel"
      aria-labelledby="inbox-tab-0"
      className={styles.DivInboxContentContainer}
    >
      <ul className={styles.UlInboxItemListContainer}>
        {notify?.map((i) => (
          <li className={styles.LiInboxItemWrapper} key={i.id}>
            <FollowBox data={i} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Error
      title={'Lượt theo dõi của bạn'}
      desc={'Khi ai đó theo dõi bạn, bạn sẽ nhìn thấy ở đây'}
      icon={<FontAwesomeIcon icon={faUser} fontSize={70} />}
    />
  );
}

export default FollowerNotification;
