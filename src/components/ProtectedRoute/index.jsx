import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalProvider } from '../../contexts/ModalContext';
import Login from '../../page/Login';
import { useState } from 'react';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const link = useSelector((state) => state.url.link);
  const [isActive, setActive] = useState(true);

  if (isAuth) {
    navigate(link, { replace: true });
    return children;
  } else  {
    return (<><ModalProvider isActive={isActive}>
        <Login/>
      </ModalProvider>
      </>
    );
  }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
