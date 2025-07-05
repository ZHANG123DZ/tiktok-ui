import { faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';

import styles from './style.module.scss';
import { setComponent } from '../../../features/auth/authSlice';
function LoginOptionContainer() {
  const dispatch = useDispatch();

  return (
    <>
      <h2 className="H2Title">Đăng nhập vào TikTok</h2>
      <div className="DivLoginOptionContainer">
        <div>
          <div>
            <div className="LasTLoginMethodContainer"></div>
            <div className="DivBoxContainer">
              <div className="DivIconContainer">
                <FontAwesomeIcon icon={faQrcode} />
              </div>
              <div className="DivTextContainer">
                <div style={{ fontSize: '11px' }}>Sử dụng mã QR</div>
              </div>
            </div>
          </div>
          <div onClick={() => dispatch(setComponent('phoneLogin'))}>
            <div className={styles.LasTLoginMethodContainer}></div>
            <div className="DivBoxContainer">
              <div className="DivIconContainer">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="DivTextContainer">
                <div style={{ fontSize: '11px' }}>
                  Sử dụng số điện thoại/email/tên người dùng
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginOptionContainer;
