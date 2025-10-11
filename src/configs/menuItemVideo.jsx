import {
  faClosedCaptioning,
  faFlag,
  faHeartBroken,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Icon from '../components/Icon/Icon';
import AutoscrollIcon from '../components/Icon/AutoScrollIcon';
import FloatingPlayerIcon from '../components/Icon/FloatingPlayerIcon';

const menuItemVideo = [
  {
    label: 'Quality',
    secondaryText: 'Auto',
    icon: <Icon name={'hd'} />,
    action: () => console.log('Change quality'),
  },
  {
    label: 'Captions',
    icon: <FontAwesomeIcon icon={faClosedCaptioning} />,
    action: () => console.log('Toggle captions'),
  },
  {
    label: 'Auto scroll',
    icon: <AutoscrollIcon />,
    hasToggle: true,
    key: 'autoScroll',
  },
  {
    label: 'Floating Player',
    icon: <FloatingPlayerIcon />,
    action: () => console.log('Open floating player'),
  },
  {
    label: 'Not interested',
    icon: <FontAwesomeIcon icon={faHeartBroken} />,
    action: () => console.log('Mark as not interested'),
  },
  {
    label: 'Report',
    icon: <FontAwesomeIcon icon={faFlag} />,
    action: () => console.log('Report video'),
    isDestructive: true,
  },
];

export default menuItemVideo;
