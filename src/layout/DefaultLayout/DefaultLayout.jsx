import { Outlet } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import styles from './DefaultLayout.module.scss';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal';

function DefaultLayout() {

  return (
    <div className={styles.DivBodyContainer}>
      <SideNav />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
