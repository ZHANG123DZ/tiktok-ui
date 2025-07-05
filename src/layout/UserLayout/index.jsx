import { Outlet } from 'react-router-dom';
import styles from './UserLayout.module.scss';
import SideNavUser from '../../components/SideNavUser';

function UserLayout() {
  return (
    <div className={styles.DivBodyContainer}>
      <SideNavUser />
      <Outlet />
    </div>
  );
}

export default UserLayout;
