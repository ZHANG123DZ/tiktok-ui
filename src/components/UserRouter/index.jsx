import { useLocation } from 'react-router-dom';
import ProfileWrapper from '../ProfileWrapper';
import NotFound from '../../page/NotFound';

//Logic xử lý KÝ Tự trc params
function UserRouter() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/@')) {
    const username = path.slice(2);

    if (!username) return <NotFound />;
    return <ProfileWrapper username={username} />;
  }

  // fallback nếu không match
  return <NotFound />;
}

export default UserRouter;
