import {
  faCompass,
  faHome,
  faSquarePlus,
  faTelevision,
  faUser,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import config from '../configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const navigation = {
  home: {
    label: 'Đề xuất',
    link: config.routes.home,
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  explore: {
    label: 'Khám phá',
    link: config.routes.explore,
    icon: <FontAwesomeIcon icon={faCompass} />,
  },
  following: {
    label: 'Đang theo dõi',
    link: config.routes.following,
    icon: <FontAwesomeIcon icon={faUserMinus} />,
  },
  upload: {
    label: 'Đăng lên',
    link: config.routes.upload,
    icon: <FontAwesomeIcon icon={faSquarePlus} />,
    protected: true,
  },
  live: {
    label: 'LIVE',
    link: config.routes.live,
    icon: <FontAwesomeIcon icon={faTelevision} />,
  },
  profile: {
    label: 'Hồ sơ',
    link: config.routes.profile,
    icon: <FontAwesomeIcon icon={faUser} />,
    protected: true,
  },
};

export default navigation;
