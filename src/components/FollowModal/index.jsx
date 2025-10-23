import { Tabs } from '../Tabs/Tabs';
import styles from './FollowModal.module.scss';

import TabsFollow from './TabsFollow';

const FollowModal = ({
  data,
  defaultValue = 'following',
  onClose = () => {},
}) => {
  return (
    <div
      role="dialog"
      data-e2e="follow-info-popup"
      className={styles.DivModalContainer}
    >
      {/* Header */}
      <div className={styles.DivHeaderContainer}>
        <h1 className={styles.H1Header}>{data.username}</h1>
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
        <TabsFollow profile={data} />
      </Tabs>
    </div>
  );
};

export default FollowModal;
