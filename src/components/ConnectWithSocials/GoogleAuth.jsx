import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogo from '../Icon/GoogleLogo';
import styles from '../../page/Login/LoginOptionContainer/style.module.scss';
import authService from '../../services/auth/auth.service';
import { useDispatch } from 'react-redux';
import { useModal } from '../../contexts/ModalContext';
import { getCurrentUser } from '../../features/auth/authAsync';

function GoogleAuth() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const login = useGoogleLogin({
    flow: 'auth-code',
    // scope:
    //   'openid profile email https://www.googleapis.com/auth/user.birthday.read',
    scope: 'openid profile email',
    onSuccess: async (tokenResponse) => {
      const res = await authService.social(
        { code: tokenResponse.code },
        'google'
      );
      if (res.success === true) {
        dispatch(getCurrentUser());
        closeModal();
      }
    },
  });

  return (
    <div>
      <div className={styles.LasTLoginMethodContainer}></div>
      <div className="DivBoxContainer" onClick={login}>
        <div className="DivIconContainer">
          <GoogleLogo width={19} height={19} />
        </div>
        <div className="DivTextContainer">
          <div style={{ fontSize: '11px' }}>Tiếp tục với Google</div>
        </div>
      </div>
    </div>
  );
}

export default GoogleAuth;
