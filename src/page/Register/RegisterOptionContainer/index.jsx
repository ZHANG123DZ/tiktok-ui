import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../features/auth/authSlice';
import FacebookAuth from '../../../components/ConnectWithSocials/FacebookAuth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuth from '../../../components/ConnectWithSocials/GoogleAuth';

function RegisterOptionContainer() {
  const dispatch = useDispatch();

  return (
    <div className="DivHomeContainer">
      <h2 className="H2Title">Đăng ký vào TikTok</h2>
      <div className="LoginOptionContainer">
        <div>
          <div onClick={() => dispatch(setComponent('phoneRegister'))}>
            <div className="LasTLoginMethodContainer"></div>
            <div className="DivBoxContainer">
              <div className="DivIconContainer">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="DivTextContainer">
                <div style={{ fontSize: '11px' }}>
                  Sử dụng số điện thoại hoặc email
                </div>
              </div>
            </div>
          </div>
        </div>
        <FacebookAuth />
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_APP_ID}>
          <GoogleAuth />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default RegisterOptionContainer;
