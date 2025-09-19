import UserInfo from '../UserInfo';
import styles from './UserList.module.scss';

function UserList({ data = [] }) {
  if (data.length === 0) return null;
  return (
    <div className={styles.DivPanelContainer}>
      {data.map((user) => (
        <div key={user.username}>
          <UserInfo user={user} showBio showFollowers />
        </div>
      ))}
    </div>
  );
}

export default UserList;
