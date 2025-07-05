//Register render Login dựa trên Redux

import { useSelector } from 'react-redux';

import RegisterOptionContainer from '../page/Register/RegisterOptionContainer';
import RegisterEmailForm from '../page/Register/RegisterEmailForm';
import RegisterPhoneForm from '../page/Register/RegisterPhoneForm';
import RegisterFinal from '../page/Register/RegisterFinal';

function RenderRegister() {
  const component = useSelector((state) => state.auth.component);

  switch (component) {
    case 'optionalRegister':
      return <RegisterOptionContainer />;
    case 'emailRegister':
      return <RegisterEmailForm />;
    case 'phoneRegister':
      return <RegisterPhoneForm />;
    case 'finalRegister':
      return <RegisterFinal />;
    default:
      return null;
  }
}

export default RenderRegister;
