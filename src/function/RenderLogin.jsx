//Logic render Login dựa trên Redux

import { useSelector } from 'react-redux';

import LoginOptionContainer from '../page/Login/LoginOptionContainer';
import LoginEmailForm from '../page/Login/LoginEmailForm';
import LoginPhoneForm from '../page/Login/LoginPhoneForm';
import LoginByQrCode from '../page/Login/LoginByQrCode';

function RenderLogin() {
  const component = useSelector((state) => state.auth.component);

  switch (component) {
    case 'optionalLogin':
      return <LoginOptionContainer />;
    case 'emailLogin':
      return <LoginEmailForm />;
    case 'phoneLogin':
      return <LoginPhoneForm />;
    case 'qrLogin':
      return <LoginByQrCode />;
    default:
      return null;
  }
}

export default RenderLogin;
