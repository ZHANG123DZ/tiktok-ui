import UserCard from '../../components/UserCard';
import styles from './styles.module.scss';

function Following() {
  return (
    <main className={styles.DivMainContainer}>
      <div className={styles.DivUserListWrapper}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
      <div className={styles.DivFixedTopContainer}></div>
      <div className={styles.DivFixedBottomContainer}></div>
    </main>
  );
}

export default Following;
