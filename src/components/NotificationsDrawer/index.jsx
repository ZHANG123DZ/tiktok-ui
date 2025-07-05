import styles from './NotificationsDrawer.module.scss';

export default function NotificationsDrawer() {
  return (
    <div className={styles['DivActivityContainer']}>
      <div
        data-e2e="inbox-notifications"
        className={styles['DivInboxContainer']}
      >
        <div className={styles['DivInboxHeaderContainer']}>
          <h2 id="header-inbox-title" className={styles['H2InboxTitle']}>
            Notifications
          </h2>
          <div
            data-e2e="inbox-bar"
            id="header-inbox-bar"
            role="tablist"
            aria-labelledby="header-inbox-title"
            className={styles['DivGroupContainer']}
          >
            <button
              data-e2e="all"
              id="inbox-tab-0"
              tabIndex={0}
              role="tab"
              aria-selected="true"
              aria-controls="header-inbox-list"
              className={styles['ButtonGroupItem']}
            >
              All activity
            </button>
            <button
              data-e2e="likes"
              id="inbox-tab-1"
              tabIndex={-1}
              role="tab"
              aria-selected="false"
              aria-controls="header-inbox-list"
              className={styles['ButtonGroupItem']}
            >
              Likes
            </button>
            <button
              data-e2e="comments"
              id="inbox-tab-2"
              tabIndex={-1}
              role="tab"
              aria-selected="false"
              aria-controls="header-inbox-list"
              className={styles['ButtonGroupItem']}
            >
              Comments
            </button>
            <button
              data-e2e="mentions"
              id="inbox-tab-3"
              tabIndex={-1}
              role="tab"
              aria-selected="false"
              aria-controls="header-inbox-list"
              className={styles['ButtonGroupItem']}
            >
              Mentions and tags
            </button>
            <button
              data-e2e="followers"
              id="inbox-tab-4"
              tabIndex={-1}
              role="tab"
              aria-selected="false"
              aria-controls="header-inbox-list"
              className={styles['ButtonGroupItem']}
            >
              Followers
            </button>
          </div>
        </div>
        <div
          data-e2e="inbox-list"
          id="header-inbox-list"
          tabIndex={0}
          role="tabpanel"
          aria-labelledby="inbox-tab-0"
          className={styles['DivInboxContentContainer']}
        >
          <svg
            preserveAspectRatio="none"
            viewBox="0 0 200 200"
            width="32"
            height="32"
            className={styles['SvgContainer']}
          >
            <defs>
              <mask id="redhole-1">
                <rect width="100%" height="100%" fill="white" />
                <circle className={styles['Circle']} />
              </mask>
              <mask id="greenhole-1">
                <rect width="100%" height="100%" fill="white" />
                <circle className={styles['Circle']} />
              </mask>
            </defs>
            <circle
              strokeWidth="2"
              stroke="#3AF2FF"
              className={styles['Circle']}
            />
            <circle mask="url(#redhole-1)" className={styles['Circle']} />
            <circle mask="url(#greenhole-1)" className={styles['Circle']} />
          </svg>
        </div>
      </div>
    </div>
  );
}
