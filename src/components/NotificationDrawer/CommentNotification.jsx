import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Error from '../Error';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import notificationService from '../../services/notification/notification.service';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';

function CommentNotification() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    const fetchNotify = async () => {
      const res = await notificationService.getAllNotifyByType('new_comment');
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
      icon={<FontAwesomeIcon icon={faCommentDots} fontSize={70} />}
    />
  );
}

export default CommentNotification;
