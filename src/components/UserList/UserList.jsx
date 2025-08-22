import UserInfo from '../UserInfo';
import styles from './UserList.module.scss';

function UserList() {
  const userList = [
    {
      username: 'iran.vs.israel5',
      name: 'Iran vs Israel',
      avatar:
        'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-3.jpg',
      followers: 7507,
      description: 'Tôi đang học React',
    },
    {
      username: 'meow',
      name: 'Mèo béo',
      avatar:
        'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-7.jpg',
      followers: 131,
      description: 'Tôi đang học ExpressJS',
    },
    {
      username: 'a3a3apzqayd',
      name: 'Skibidi Toilet',
      avatar:
        'https://maunailxinh.com/wp-content/uploads/2025/05/anh-meo-ngao-cute-10.jpg',
      followers: 7607,
      description: 'Tôi đang học code',
      isVerifiedBadge: true,
    },
  ];
  return (
    <div className={styles.DivPanelContainer}>
      {userList.map((user) => (
        <div key={user.username}>
          <UserInfo user={user} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
