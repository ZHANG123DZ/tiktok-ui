import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './register.module.scss';
import { useModal } from '../../contexts/ModalContext';
import Login from '../Login';
import { setComponent } from '../../features/auth/authSlice';
import RenderRegister from '../../function/RenderRegister';
function Register() {
  const { openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Đăng ký | TikTok';
    dispatch(setComponent('optionalRegister'));
  }, [dispatch]);

  return (
    <div className="DivCenterWrapper">
      <div className="DivContentContainer">
        <div className="DivModalContent">
          <div className={styles.DivPageWrapper}>
            <a href="" />
            <div className="DivLoginContainer">
              <div className="DivHomeContainer">{RenderRegister()}</div>
            </div>
          </div>

          <div className="DivAgreement">
            <p className={styles.PText}>
              Bằng việc tiếp tục với tài khoản có vị trí tại
              <Link className={styles.ALink}> Việt Nam </Link>
              <a href="#" target="_blank" className={styles.ALink}>
                Điều khoản dịch vụ
              </a>
              , đồng thời xác nhận rằng bạn đã đọc
              <a
                href="#"
                target="_blank"
                className={styles.ALink}
                style={{ margin: '0px 2px' }}
              >
                Chính sách quyền riêng tư
              </a>
              của chúng tôi.
            </p>
          </div>

          <div className={styles.DivContainer}>
            <div>Bạn có tài khoản?</div>
            <Link className={styles.ALink} onClick={() => openModal(<Login />)}>
              <span className={styles.spanLinkText}>Đăng nhập</span>
            </Link>
          </div>
        </div>
        <button className="DivCloseWrapper" onClick={() => closeModal()}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
}

Register.propTypes = {
  switchToLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Register;
