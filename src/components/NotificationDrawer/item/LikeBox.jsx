import { Link } from 'react-router-dom';
import styles from './FollowBox.module.scss';
import { useState } from 'react';
import formatRelativeTime from '../../../function/formatRelativeTime';
import likeService from '../../../services/like/like.service';

const LikeBox = ({ data }) => {
  const postId = data.actor.id;
  const [liked, setLiked] = useState(data.isLiked);

  // const toggleLike = async () => {
  //   try {
  //     if (liked) {
  //       await likeService.unlike({ likeAbleId: postId, type: 'post' });
  //     } else {
  //       await likeService.like({ likeAbleId: postId, type: 'post' });
  //     }
  //     setLiked((prev) => !prev);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
          đã thích video của bạn. {formatRelativeTime(data.createdAt)}
        </p>
      </div>

      <img src={data.post?.thumbnail} />
    </div>
  );
};

export default LikeBox;
