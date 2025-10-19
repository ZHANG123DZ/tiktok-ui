import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotificationDrawer.module.scss';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import DrawerCloseButton from '../DrawerCloseButton';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '../Tabs/Tabs';
import { useTranslation } from 'react-i18next';
import Error from '../Error';
import LikeNotification from './LikeNotification';
import AllActivity from './AllActivity';
import FollowerNotification from './FollowerNotification';
import CommentNotification from './CommentNotification';

export default function NotificationDrawer() {
  const { t } = useTranslation();

  return (
    <div className={styles.DivDrawerContainer}>
      {/* Activity Container */}
      <div className={styles.DivActivityContainer}>
        <Tabs
          data-e2e="inbox-notifications"
          className={styles.DivInboxContainer}
          defaultValue={'all'}
        >
          {/* Header */}
          <TabList>
            <div className={styles.DivInboxHeaderContainer}>
              <h2 id="header-inbox-title" className={styles.H2InboxTitle}>
                Notifications
              </h2>
              {/* Tabs */}
              <div
                data-e2e="inbox-bar"
                id="header-inbox-bar"
                role="tablist"
                aria-labelledby="header-inbox-title"
                className={styles.DivGroupContainer}
              >
                <Tab value={'all'}>
                  <button
                    data-e2e="all"
                    id="inbox-tab-0"
                    tabIndex="0"
                    role="tab"
                    aria-selected="true"
                    aria-controls="header-inbox-list"
                    className={styles.ButtonGroupItem}
                  >
                    All activity
                  </button>
                </Tab>
                <Tab value={'likes'}>
                  <button
                    data-e2e="likes"
                    id="inbox-tab-1"
                    tabIndex="-1"
                    role="tab"
                    aria-selected="false"
                    aria-controls="header-inbox-list"
                    className={styles.ButtonGroupItem}
                  >
                    Likes
                  </button>
                </Tab>
                <Tab value={'comments'}>
                  <button
                    data-e2e="comments"
                    id="inbox-tab-2"
                    tabIndex="-1"
                    role="tab"
                    aria-selected="false"
                    aria-controls="header-inbox-list"
                    className={styles.ButtonGroupItem}
                  >
                    Comments
                  </button>
                </Tab>
                <Tab value={'mentions'}>
                  <button
                    data-e2e="mentions"
                    id="inbox-tab-3"
                    tabIndex="-1"
                    role="tab"
                    aria-selected="false"
                    aria-controls="header-inbox-list"
                    className={styles.ButtonGroupItem}
                  >
                    Mentions and tags
                  </button>
                </Tab>
                <Tab value={'followers'}>
                  <button
                    data-e2e="followers"
                    id="inbox-tab-4"
                    tabIndex="-1"
                    role="tab"
                    aria-selected="false"
                    aria-controls="header-inbox-list"
                    className={styles.ButtonGroupItem}
                  >
                    Followers
                  </button>
                </Tab>
              </div>
            </div>
          </TabList>

          {/* Inbox Content */}
          <TabPanels>
            <TabPanel value={'all'}>
              <AllActivity />
            </TabPanel>
            <TabPanel value={'likes'}>
              <LikeNotification />
            </TabPanel>
            <TabPanel value={'comments'}>
              <CommentNotification />
            </TabPanel>
            <TabPanel value={'followers'}>
              <FollowerNotification />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      {/* Close Button */}
      <DrawerCloseButton />
    </div>
  );
}
