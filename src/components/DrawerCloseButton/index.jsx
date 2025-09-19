// DrawerCloseButton.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import styles from './DrawerCloseButton.module.scss';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const DrawerCloseButton = ({ onClick }) => {
  return (
    <div className={styles.DivDrawerCloseButtonContainer}>
      <Button
        capsule
        size="medium"
        secondary
        closeButton
        onClick={onClick}
        icon={<FontAwesomeIcon icon={faClose} fontSize={16} />}
      />
    </div>
  );
};

export default DrawerCloseButton;
