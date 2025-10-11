import { Outlet } from 'react-router-dom';

import styles from './DefaultLayout.module.scss';
import SideNav from './components/SideNav';

function DefaultLayout() {
  return (
    <div className={styles.DivBodyContainer}>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
