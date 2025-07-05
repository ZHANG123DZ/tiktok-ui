import { useTransition, animated } from 'react-spring';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

import styles from './DrawerHost.module.scss';

import { useDrawerStore } from '../../store/drawerStore';

function DrawerHost({ mask = true, closeButton = true, stylesDrawer = {} }) {
  const { drawers, closeDrawer } = useDrawerStore();

  const transitions = useTransition(Object.entries(drawers), {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
    keys: ([key]) => key,
    config: { tension: 300, friction: 30 },
  });

  return transitions((style, [key, Component]) => (
    <animated.div
      className={styles.DivDrawerWrapper}
      style={{ ...style, ...stylesDrawer }}
      key={key}
    >
      {mask && (
        <div
          className={styles.DivDrawerMask}
          onClick={() => closeDrawer(key)}
        />
      )}
      <div className={styles.DivDrawerContainer}>
        {Component}
        {closeButton && (
          <div
            className={styles.DivDrawerCloseButtonContainer}
            onClick={() => closeDrawer(key)}
          >
            <Button
              icon={<FontAwesomeIcon icon={faClose} />}
              capsule
              size="medium"
              secondary
              className={styles.StyledTUXMoreCloseButton}
            />
          </div>
        )}
      </div>
    </animated.div>
  ));
}

export default DrawerHost;
