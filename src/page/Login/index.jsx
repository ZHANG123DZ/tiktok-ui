import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './login.module.scss';
import RenderLogin from '../../function/RenderLogin';
import { useModal } from '../../contexts/ModalContext';
import Register from '../Register';
import { setComponent } from '../../features/auth/authSlice';

function Login() {
  const { closeModal, openModal } = useModal();
  const component = useSelector((state) => state.auth.component);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Đăng nhập | TikTok';
    dispatch(setComponent('optionalLogin'));
  }, [dispatch]);

  return (
    <div className="DivCenterWrapper">
      <div className="DivContentContainer">
        <div className="DivModalContent">
          <div className={styles.DivPageWrapper}>
            <a href="#" />
            <div className="DivLoginContainer">
              <div className="DivHomeContainer">
                <RenderLogin />
              </div>
            </div>
          </div>
          {/*  */}
          {component === 'optionalLogin' ? (
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
          ) : null}
          {/*  */}
          <div className={styles.DivContainer}>
            <div>Bạn không có tài khoản?</div>
            <Link
              className={styles.ALink}
              onClick={() => openModal(<Register />)}
            >
              <span className={styles.spanLinkText}>Đăng ký</span>
            </Link>
          </div>
        </div>
        <button
          className="DivCloseWrapper"
          onClick={() => {
            closeModal();
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
}

export default Login;
