import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileWrapper from '../ProfileWrapper';
import NotFound from '../../page/NotFound';
import VideoView from '../../page/VideoView';
import Home from '../../page/Home';
import postService from '../../services/post/post.service';

function UserRouter() {
  const location = useLocation();
  const path = location.pathname;
  const videos = useSelector((state) => state.listVideo.listVideo);
  const [initialPost, setInitialPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // Xử lý URL
  if (path.startsWith('/@')) {
    const subPath = path.slice(2);
    const segments = subPath.split('/');
    const username = segments[0];

    if (!username) return <NotFound />;

    // ✅ Có danh sách video trong Redux
    if (segments[1] === 'video' && segments[2] && videos.length > 0) {
      const postId = segments[2];
      return <VideoView username={username} postId={postId} />;
    }

    // ✅ Nếu không có trong Redux, thì fetch từ API
    if (segments[1] === 'video' && segments[2]) {
      const postId = segments[2];

      useEffect(() => {
        let isMounted = true;
        const fetchPost = async () => {
          setLoading(true);
          try {
            const post = await postService.getPost(postId);
            if (isMounted) setInitialPost(post);
          } catch (err) {
            console.error(err);
          } finally {
            if (isMounted) setLoading(false);
          }
        };
        fetchPost();
        return () => {
          isMounted = false;
        };
      }, [postId]);

      if (loading) return <div>Đang tải...</div>;
      if (!initialPost) return <NotFound />;
      return <Home initialPost={initialPost} />;
    }

    // ✅ Trang profile người dùng
    if (segments.length === 1) {
      return <ProfileWrapper username={username} />;
    }
  }

  return <NotFound />;
}

export default UserRouter;
