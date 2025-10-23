import VideoList from '../../components/VideoList';
import { useEffect, useState } from 'react';
import repostService from '../../services/repost/repost.service';

function RepostPanel({ profile }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (profile.id) {
      const fetchPosts = async () => {
        const res = await repostService.getReposts(profile.id);
        setPosts(res.posts);
      };
      fetchPosts();
    }
  }, [profile?.id]);

  return <VideoList variant="profile" videosData={posts} />;
}

export default RepostPanel;
