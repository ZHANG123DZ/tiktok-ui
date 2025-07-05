import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  useState,
  useCallback,
  useEffect,
  isValidElement,
  cloneElement,
} from 'react';
import { ModalProvider } from '../../contexts/ModalContext';
import Login from '../../page/Login';
import { nextUrl } from '../../features/url/urlSlice';
import { setRedirectAfterLogin } from '../../features/auth/authSlice';
import { useProtectedButton } from '../../contexts/ProtectedButtonContext';

const PENDING_ACTION_KEY = 'pendingActionAfterLogin';
const CONTEXT_EXPIRATION_TIME = 10 * 60 * 1000; // 10 phút

function ProtectedButton({
  children,
  to,
  href,
  onClick,
  requireAuth = true,
  showModal = true,
  redirectToLogin = true,
  ...props
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const destination = to || href;

  const { lastTriggerTime } = useProtectedButton();

  const saveCurrentContext = useCallback(() => {
    const context = {
      currentPath: location.pathname + location.search,
      destination,
      timestamp: Date.now(),
      hasClicked: true,
    };
    localStorage.setItem(PENDING_ACTION_KEY, JSON.stringify(context));
  }, [location, destination]);

  const clearSavedContext = useCallback(() => {
    localStorage.removeItem(PENDING_ACTION_KEY);
  }, []);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!requireAuth || isAuthenticated) {
        onClick?.(event);
        if (destination) {
          navigate(destination);
        }
        return;
      }

      saveCurrentContext();

      if (redirectToLogin) {
        dispatch(nextUrl(destination));
        dispatch(setRedirectAfterLogin(true));
      }

      if (showModal) {
        setShowLoginModal(true);
      }
    },
    [
      isAuthenticated,
      requireAuth,
      saveCurrentContext,
      redirectToLogin,
      showModal,
      dispatch,
      destination,
      onClick,
      navigate,
    ]
  );

  // ⏱ Trigger recheck khi context báo redirect sau login
  useEffect(() => {
    if (!lastTriggerTime || !isAuthenticated) return;

    const savedContext = localStorage.getItem(PENDING_ACTION_KEY);
    if (savedContext) {
      try {
        const context = JSON.parse(savedContext);
        const isValid =
          context?.hasClicked &&
          Date.now() - context.timestamp < CONTEXT_EXPIRATION_TIME;

        if (isValid && context.destination) {
          navigate(context.destination, { replace: true });
        }
      } catch (err) {
        console.error('Error parsing saved redirect context', err);
      } finally {
        clearSavedContext();
        setShowLoginModal(false);
        dispatch(setRedirectAfterLogin(false));
      }
    }
  }, [lastTriggerTime, isAuthenticated, navigate, clearSavedContext, dispatch]);

  const renderClickableElement = () => {
    const commonProps = {
      ...props,
      onClick: handleClick,
      'data-protected': requireAuth,
      'data-auth-status': isAuthenticated ? 'authenticated' : 'unauthenticated',
    };

    if (isValidElement(children)) {
      return cloneElement(children, commonProps);
    }

    return (
      <button type="button" {...commonProps}>
        {children}
      </button>
    );
  };

  return (
    <>
      {renderClickableElement()}
      {showModal && showLoginModal && (
        <ModalProvider isActive={showLoginModal} setActive={setShowLoginModal}>
          <Login />
        </ModalProvider>
      )}
    </>
  );
}

ProtectedButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  requireAuth: PropTypes.bool,
  showModal: PropTypes.bool,
  redirectToLogin: PropTypes.bool,
};

export default ProtectedButton;
