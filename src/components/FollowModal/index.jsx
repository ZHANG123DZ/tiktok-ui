import formatNumberShort from '../../utils/formatNumberShort';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../Tabs/Tabs';
import styles from './FollowModal.module.scss';
import UserInfo from '../UserInfo';

const FollowModal = ({
  username,
  defaultValue = 'following',
  onClose = () => {},
}) => {
  // Fake API data
  const data = {
    followers: 243,
    following: 3433,
    followersList: [
      {
        id: 4,
        username: 'bbhafg',
        name: 'Quốc Kang',
        avatar:
          'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-xinh-trung-quoc-2.jpg',
        isFollow: false,
      },
    ],
    followingList: [
      {
        id: 5,
        username: 'alice',
        name: 'Alice',
        avatar:
          'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-xinh-trung-quoc-2.jpg',
        isFollow: true,
      },
    ],
    suggestList: [
      {
        id: 6,
        username: 'bob',
        name: 'Bob',
        avatar:
          'https://auvi.edu.vn/wp-content/uploads/2025/02/anh-gai-xinh-trung-quoc-2.jpg',
        isFollow: false,
      },
    ],
  };

  return (
    <div
      role="dialog"
      data-e2e="follow-info-popup"
      className={styles.DivModalContainer}
    >
      {/* Header */}
      <div className={styles.DivHeaderContainer}>
        <h1 className={styles.H1Header}>{username}</h1>
        <div
          aria-label="Close_button"
          role="button"
          tabIndex={0}
          data-e2e="follow-popup-close"
          className={styles.DivCloseContainer}
          onClick={onClose}
        >
          <svg
            fill="currentColor"
            fontSize="32px"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
          >
            <path d="M38.7 12.12a1 1 0 0 0 0-1.41l-1.4-1.42a1 1 0 0 0-1.42 0L24 21.17 12.12 9.3a1 1 0 0 0-1.41 0l-1.42 1.42a1 1 0 0 0 0 1.41L21.17 24 9.3 35.88a1 1 0 0 0 0 1.41l1.42 1.42a1 1 0 0 0 1.41 0L24 26.83 35.88 38.7a1 1 0 0 0 1.41 0l1.42-1.42a1 1 0 0 0 0-1.41L26.83 24 38.7 12.12Z" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue={defaultValue}>
        <div className={styles.DivTabs}>
          <TabList>
            <Tab value="following">
              <div className={styles.DivTabItem}>
                <div>Following</div>
                <strong>{formatNumberShort(data.following)}</strong>
              </div>
            </Tab>
            <Tab value="followers">
              <div className={styles.DivTabItem}>
                <div>Followers</div>
                <strong>{formatNumberShort(data.followers)}</strong>
              </div>
            </Tab>
            <Tab value="suggested">
              <div className={styles.DivTabItem}>Suggested</div>
            </Tab>
          </TabList>
        </div>
        {/* Panels */}
        <TabPanels>
          <TabPanel value="followers">
            <ul className={styles.DivUserListContainer}>
              {data.followersList.map((u) => (
                <li key={u.id} className={styles.ListUser}>
                  <UserInfo user={u} showFollowButton />
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value="following">
            <ul className={styles.DivUserListContainer}>
              {data.followingList.map((u) => (
                <li key={u.id} className={styles.ListUser}>
                  <UserInfo user={u} showFollowButton />
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value="suggested">
            <ul className={styles.DivUserListContainer}>
              {data.suggestList.map((u) => (
                <li key={u.id} className={styles.ListUser}>
                  <UserInfo user={u} showFollowButton />
                </li>
              ))}
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default FollowModal;
