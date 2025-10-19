import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../Error';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import notificationService from '../../services/notification/notification.service';

function MentionNotification() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const fetchNotify = async () => {
      const res = await notificationService.getAllNotifyByType('mention');
      setNotify(res.data.items);
    };
    fetchNotify();
  }, []);

  return (
    <Error
      title={'Lượt thích trên video của bạn'}
      desc={
        'Khi ai đó thích một trong các video của bạn, bạn sẽ nhìn thấy ở đây'
      }
      icon={<FontAwesomeIcon icon={faHeart} fontSize={70} />}
    />
  );
}

export default MentionNotification;
