import {
  faCompass,
  faHome,
  faSquarePlus,
  faTelevision,
  faUser,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import config from '../../../configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigation = {
  home: {
    label: 'home',
    link: config.routes.home,
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  explore: {
    label: 'explore',
    link: config.routes.explore,
    icon: <FontAwesomeIcon icon={faCompass} />,
  },
  following: {
    label: 'following',
    link: config.routes.following,
    icon: <FontAwesomeIcon icon={faUserMinus} />,
  },
  upload: {
    label: 'upload',
    link: config.routes.upload,
    icon: <FontAwesomeIcon icon={faSquarePlus} />,
    protected: true,
  },
  live: {
    label: 'live',
    link: config.routes.live,
    icon: <FontAwesomeIcon icon={faTelevision} />,
  },
  profile: {
    label: 'profile',
    link: config.routes.profile,
    icon: <FontAwesomeIcon icon={faUser} />,
    protected: true,
  },
};

export default navigation;
