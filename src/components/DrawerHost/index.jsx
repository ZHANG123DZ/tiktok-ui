import { useTransition, animated } from 'react-spring';
import styles from './DrawerHost.module.scss';

import { useDrawerStore } from '../../store/drawerStore';
import DrawerCloseButton from '../DrawerCloseButton';

function DrawerHost({ mask = true, closeButton = true, stylesDrawer = {} }) {
  const { drawers, closeDrawer } = useDrawerStore();

  // Animate drawer list
  const transitions = useTransition(Object.entries(drawers), {
    from: { transform: 'translateX(100%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(100%)', opacity: 0 },
    keys: ([key]) => key,
    config: { tension: 300, friction: 30 },
  });

  return transitions((style, [key, drawerData]) => {
    // 🔥 Lấy component & config của từng drawer
    const Component = drawerData?.component;
    const drawerConfig = drawerData?.config || {};

    // Ưu tiên config riêng, fallback về props mặc định
    const drawerMask = drawerConfig.mask ?? mask;
    const drawerCloseButton = drawerConfig.closeButton ?? closeButton;
    const drawerStyles = {
      ...stylesDrawer,
      ...(drawerConfig.stylesDrawer || {}),
    };

    return (
      <animated.div
        className={styles.DivDrawerWrapper}
        style={{ ...style, ...drawerStyles }}
        key={key}
      >
        {drawerMask && (
          <div
            className={styles.DivDrawerMask}
            onClick={() => closeDrawer(key)}
          />
        )}

        <div className={styles.DivDrawerContainer}>
          {Component}
          {drawerCloseButton && (
            <DrawerCloseButton onClick={() => closeDrawer(key)} />
          )}
        </div>
      </animated.div>
    );
  });
}

export default DrawerHost;
