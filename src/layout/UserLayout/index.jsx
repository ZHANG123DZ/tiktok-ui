import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.scss';
import SideNav from './components/SideNavUser';

function UserLayout() {
  return (
    <div className={styles.DivBodyContainer}>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default UserLayout;
