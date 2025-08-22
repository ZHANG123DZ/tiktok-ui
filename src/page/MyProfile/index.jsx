import Button from '../../components/Button';
import styles from './styles.module.scss';
import defaultAvatar from '../../assets/imgs/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFire,
  faGear,
  faPenToSquare,
  faShare,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { ModalProvider } from '../../contexts/ModalContext';
import EditProfile from '../../components/EditProfile';
import { useState } from 'react';
import PropTypes from 'prop-types';
import ShareModal from '../../components/ShareModal';

function MyProfile({ data }) {
  const [activeShare, setActiveShare] = useState(false);
  const [isActive, setActive] = useState(false);

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
                  src={data.avatar_url || defaultAvatar}
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
                    {data.username}
                  </h1>
                  <h2 className={styles.H2ShareSubTitle}>{data.fullname}</h2>
                </div>
              </div>
              <div
                className={clsx(
                  styles.DivButtonPanelWrapper,
                  styles.actionsProfile
                )}
              >
                <Button
                  label="Sửa hồ sơ"
                  icon={<FontAwesomeIcon icon={faPenToSquare} />}
                  isDefault
                  responsiveButton
                  size="medium"
                  primary
                  onClick={() => setActive(!isActive)}
                />
                {isActive && (
                  <ModalProvider isActive={isActive}>
                    <EditProfile />
                  </ModalProvider>
                )}
                <Button
                  label="Quảng bá bài đăng"
                  icon={<FontAwesomeIcon icon={faFire} />}
                  isDefault
                  responsiveButton
                  size="medium"
                  secondary
                />
                <Button
                  icon={<FontAwesomeIcon icon={faGear} />}
                  isDefault
                  iconOnlyButton
                  size="medium"
                  secondary
                />
                <Button
                  icon={<FontAwesomeIcon icon={faShare} />}
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
              </div>
              <div
                className={clsx(
                  styles.CreatorPageHeaderTextContainer,
                  styles.moreUserInfo
                )}
              >
                <h3 className={styles.H3CountInfos}>
                  <div className={styles.DivNumber}>
                    <strong title="Following">{data.total_following}</strong>
                    <span className={styles.SpanUnit}>Đã follow</span>
                  </div>
                  <div className={styles.DivNumber}>
                    <strong title="Followers">{data.total_follower}</strong>
                    <span className={styles.SpanUnit}>Follower</span>
                  </div>
                  <div className={styles.DivNumber}>
                    <strong title="Likes">{data.total_likes}</strong>
                    <span className={styles.SpanUnit}>Lượt thích</span>
                  </div>
                </h3>
                <h2 className={styles.H2ShareDes}>
                  {data.bio || 'Chưa có tiểu sử.'}
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
                  <FontAwesomeIcon icon={faTableCellsLarge} fontSize={'37px'} />
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

MyProfile.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MyProfile;
