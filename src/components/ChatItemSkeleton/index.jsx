import styles from './ChatItemSkeleton.module.scss';

function ChatItemSkeleton() {
  return (
    <div className={styles.DivSkeletonContainer}>
      <div className={styles.StyledSkeletonAvatar}></div>
      <div className={styles.DivSkeletonTextWrapper}>
        <div className={styles.StyledSkeletonTitle}></div>
        <div className={styles.StyledSkeletonTitle}></div>
      </div>
    </div>
  );
}

export default ChatItemSkeleton;
