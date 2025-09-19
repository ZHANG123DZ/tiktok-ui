import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import MyProfile from '../../page/MyProfile';
import Profile from '../../page/Profile';
import NotFoundAccount from '../../page/NotFoundAccount';
import userService from '../../services/user/user.service';
import Loading from '../Loading';

function ProfileWrapper({ username }) {
  const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await userService.getUser(username);
        setDataUser(response);
      } catch (err) {
        console.error('Không lấy được profile:', err);
        setDataUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, [username]);

  if (isLoading) return <Loading />;

  return dataUser ? <Profile profile={dataUser} /> : <NotFoundAccount />;
}

ProfileWrapper.propTypes = {
  username: PropTypes.string,
};

export default ProfileWrapper;
