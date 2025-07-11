import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import MyProfile from '../../page/MyProfile';
import Profile from '../../page/Profile';
import NotFoundAccount from '../../page/NotFoundAccount';
import userService from '../../services/user/user.service';
import Loading from '../Loading';

function ProfileWrapper({ username }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isSelf = currentUser?.username === username;

  const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await userService.getUser(username);
        setDataUser(response.data);
      } catch (err) {
        console.error('Không lấy được profile:', err);
        setDataUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [username]);

  if (isSelf) return <MyProfile data={currentUser} />;
  if (isLoading) return <Loading />;

  return dataUser ? <Profile data={dataUser} /> : <NotFoundAccount />;
}

ProfileWrapper.propTypes = {
  username: PropTypes.string,
};

export default ProfileWrapper;
