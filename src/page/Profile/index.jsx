import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faShare,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';

import defaultAvatar from '../../assets/imgs/user.png';
import styles from './styles.module.scss';
import Button from '../../components/Button';
import ProtectedButton from '../../components/ProtectedButton';
import ShareModal from '../../components/ShareModal';
import { useSelector } from 'react-redux';
function Profile({ username }) {
  const mockUser = {
    id: 4,
    name: `Hello ${username}`,
    username,
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-22.jpg',
    followers: 563,
    followings: 2343,
    likes: 21131313,
  };

  const currentUser = useSelector((state) => state.auth.currentUser);
  const isSelf = currentUser?.username === username;

  const [activeShare, setActiveShare] = useState(false);

  //Gọi API load user, post của user
  //Tạm thời giờ giả lập thế thôi

  return (
    <div className={styles.UserContainer}>
      <div className={styles[`DivShareLayoutBase-StyledShareLayoutV2`]}>
        <div className={styles.DivShareLayoutContentV2}>
          <div
            className={
              styles[
                `DivShareLayoutHeader-StyledDivShareLayoutHeaderV2-CreatorPageHeader`
              ]
            }
          >
            <div
              className={styles.DivContainer}
              style={{ width: '212px', height: '212px' }}
            >
              <span
                className={styles[`SpanAvatarContainer-StyledAvatar`]}
                style={{ width: '212px', height: '212px' }}
              >
                <img
                  src={data?.avatar_url || defaultAvatar}
                  alt=""
                  className={styles.ImgAvatar}
                />
              </span>
            </div>
            <div
              className={
                styles[`DivShareTitleContainer-CreatorPageHeaderShareContainer`]
              }
            >
              <div
                className={clsx(
                  styles.DivUserIdentifierWrapper,
                  styles.userName
                )}
              >
                <div
                  className={clsx(
                    styles.DivUserTextWrapper,
                    styles.textUserName
                  )}
                >
                  <h1
                    className={clsx(
                      styles.H1ShareSubTitle,
                      styles.textUserName
                    )}
                  >
                    {data?.username}
                  </h1>
                  <h2 className={styles.H2ShareSubTitle}>{data?.fullname}</h2>
                </div>
              </div>
              <div
                className={clsx(
                  styles.DivButtonPanelWrapper,
                  styles.actionsProfile
                )}
              >
                <ProtectedButton redirectToLogin={false}>
                  <Button label="Theo dõi" isDefault size="medium" primary />
                </ProtectedButton>
                <Button label="Nhắn tin" isDefault size="medium" secondary />
                <Button
                  icon={
                    <FontAwesomeIcon
                      icon={faShare}
                      onClick={() => setActiveShare(true)}
                    />
                  }
                  isDefault
                  iconOnlyButton
                  size="medium"
                  secondary
                />
                {activeShare && (
                  <ShareModal
                    isOpen={activeShare}
                    onClose={() => setActiveShare(false)}
                  />
                )}
                <Button
                  icon={<FontAwesomeIcon icon={faEllipsis} />}
                  isDefault
                  iconOnlyButton
                  size="medium"
                  secondary
                />
              </div>
              <div
                className={clsx(
                  styles.CreatorPageHeaderTextContainer,
                  styles.moreUserInfo
                )}
              >
                <h3 className={styles.H3CountInfos}>
                  <div className={styles.DivNumber}>
                    <strong title="Following">{data?.followings}</strong>
                    <span className={styles.SpanUnit}>Đã follow</span>
                  </div>
                  <div className={styles.DivNumber}>
                    <strong title="Followers">{data?.followers}</strong>
                    <span className={styles.SpanUnit}>Follower</span>
                  </div>
                  <div className={styles.DivNumber}>
                    <strong title="Likes">{data?.likes}</strong>
                    <span className={styles.SpanUnit}>Lượt thích</span>
                  </div>
                </h3>
                <h2 className={styles.H2ShareDes}>
                  {data?.bio || 'Chưa có tiểu sử.'}
                </h2>
              </div>
            </div>
          </div>
          <div
            className={styles.DivShareLayoutMain}
            style={{ minWidth: '0px' }}
          >
            <div className={styles.DivFeedWrapper}>
              <div className={styles.DivVideoFeedTab}></div>
              <div
                className={styles.TUXSegmentedControl}
                style={{
                  padding: '2px',
                  marginTop: '2px',
                  marginBottom: '8px',
                }}
              >
                <Button unstyledButton segmentControl />
                <Button unstyledButton segmentControl />
                <Button unstyledButton segmentControl />
              </div>
            </div>
            <main className={styles.MainDetailWrapper}>
              <div className={styles.DivErrorContainer}>
                <div className={styles.DivErrorIconWrapper}>
                  <FontAwesomeIcon icon={faTableCellsLarge} />
                </div>
                <p className={styles.PTitle}>Tải lên video đầu tiên của bạn</p>
                <p className={styles.PDesc}>
                  Video của bạn sẽ xuất hiện tại đây
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Profile;
