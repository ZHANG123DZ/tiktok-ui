import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setComponent } from '../../../features/auth/authSlice';

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
      </div>
    </div>
  );
}

export default RegisterOptionContainer;
