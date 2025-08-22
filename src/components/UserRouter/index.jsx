import { useLocation } from 'react-router-dom';
import ProfileWrapper from '../ProfileWrapper';
import NotFound from '../../page/NotFound';
import VideoDetail from '../../page/VideoDetail';
import Profile from '../../page/Profile';

// Logic xử lý KÝ Tự trước params
function UserRouter() {
  const location = useLocation();
  const path = location.pathname;

  if (path.startsWith('/@')) {
    const subPath = path.slice(2);

    const segments = subPath.split('/');
    const username = segments[0];

    if (!username) return <NotFound />;

    if (segments[1] === 'video' && segments[2]) {
      const postId = segments[2];
      return <VideoDetail username={username} postId={postId} />;
    }

    if (segments.length === 1) {
      return <Profile username={username} />;
    }
  }

  return <NotFound />;
}

export default UserRouter;
