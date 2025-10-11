import { createPortal } from 'react-dom';
import styles from './LogoutConfirm.module.scss';
import authService from '../../services/auth/auth.service';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../features/auth/authAsync';

export default function LogoutConfirm({ isOpen = false, onClose = () => {} }) {
  const dispatch = useDispatch();
  const logOutHandle = async () => {
    await authService.logout();
    dispatch(getCurrentUser());
  };
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.DivModalContainer}>
      <div className={styles.DivModalMask} onClick={onClose}></div>
      <div className={styles.DivCenterWrapper}>
        <div className={styles.DivContentContainer}>
          <div className={styles.DivLogoutConfirmContainer}>
            <div className={styles.DivLogoutConfirmTitle}>
              Are you sure you want to log out?
            </div>
            <div className={styles.DivButtonWrapper}>
              <button
                type="button"
                className={`${styles.Button} ${styles.StyledLogoutCancelButton}`}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`${styles.Button} ${styles.StyledLogoutButton}`}
                onClick={() => {
                  logOutHandle();
                  onClose();
                }}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
