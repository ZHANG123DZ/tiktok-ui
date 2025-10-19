import { Link } from 'react-router-dom';
import styles from './FollowBox.module.scss';
import followService from '../../../services/follow/follow.service';
import { useState } from 'react';
import formatRelativeTime from '../../../function/formatRelativeTime';

const FollowBox = ({ data }) => {
  const authorId = data.actor.id;
  const [follow, setFollow] = useState(data.actor.isFollow);

  const toggleFollow = async () => {
    try {
      if (follow) {
        await followService.unfollow({ followAbleId: authorId, type: 'user' });
      } else {
        await followService.follow({ followAbleId: authorId, type: 'user' });
      }
      setFollow((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div data-e2e="inbox-list-item" className={`${styles.DivItemContainer}`}>
      <span
        shape="circle"
        data-e2e=""
        data-method="click_head"
        className={`${styles.SpanAvatarContainer}`}
        style={{ flex: '0 0 48px', width: '48px', height: '48px' }}
      >
        <img src={data.actor.avatar} alt="avatar" />
      </span>

      <div className={`${styles.DivContentContainer}`}>
        <Link
          data-e2e="inbox-title"
          to={`/@${data.actor.username}`}
          data-method="click_name"
          aria-label={`Hồ sơ của ${data.actor.name}`}
          className={`${styles.ATitleLink}`}
        >
          {data.actor.name}
        </Link>
        <p data-e2e="inbox-content" className={`${styles.PDescText}`}>
          đã bắt đầu follow bạn. {formatRelativeTime(data.createdAt)}
        </p>
      </div>

      <button
        type="button"
        data-e2e="follow-back"
        className={`${
          follow ? styles.ButtonFollowBack : styles.StyledFollowButtonInPanel
        }`}
        onClick={toggleFollow}
      >
        {follow ? 'Follow lại' : 'Bạn bè'}
      </button>
    </div>
  );
};

export default FollowBox;
