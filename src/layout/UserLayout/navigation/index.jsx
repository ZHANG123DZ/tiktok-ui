import {
  faCompass,
  faHome,
  faMessage,
  faPaperPlane,
  faSquarePlus,
  faTelevision,
  faUserGroup,
  faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import config from '../../../configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotificationDrawer from '../../../components/NotificationDrawer';
import MessageDrawer from '../../../components/MessageDrawer';

export const navigation = (
  toggleDrawer,
  closeDrawer,
  openDrawer,
  closeAllDrawers
) => ({
  home: {
    label: 'home',
    link: config.routes.home,
    icon: <FontAwesomeIcon icon={faHome} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
  explore: {
    label: 'explore',
    link: config.routes.explore,
    icon: <FontAwesomeIcon icon={faCompass} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
  following: {
    label: 'following',
    link: config.routes.following,
    icon: <FontAwesomeIcon icon={faUserMinus} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
  friends: {
    label: 'friends',
    link: config.routes.friends,
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
  upload: {
    label: 'upload',
    link: config.routes.upload,
    icon: <FontAwesomeIcon icon={faSquarePlus} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
  active: {
    label: 'activity',
    icon: <FontAwesomeIcon icon={faMessage} />,
    onClick: () => {
      toggleDrawer('activity', <NotificationDrawer />);
    },
  },
  message: {
    label: 'messages',
    link: config.routes.message,
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
    onClick: () => {
      closeAllDrawers();
      openDrawer('messages', <MessageDrawer />, { mask: false });
    },
  },
  live: {
    label: 'live',
    link: config.routes.live,
    icon: <FontAwesomeIcon icon={faTelevision} />,
    onClick: () => {
      closeAllDrawers();
    },
  },
});
