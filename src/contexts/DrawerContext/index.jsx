import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import styles from './styles.module.scss';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const DrawerContext = createContext();

export const DrawerProvider = ({
  children,
  isActive = false,
  mask = false,
  closeButton = true,
}) => {
  const [content, setContent] = useState(children);
  const [isOpen, setIsOpen] = useState(isActive);
  const [config, setConfig] = useState({});

  useEffect(() => {
    setIsOpen(isActive);
    setContent(children);
  }, [isActive, children]);

  const openDrawer = (drawerContent, configDrawer = {}) => {
    setContent(drawerContent);
    setConfig(configDrawer);
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setContent(null);
    setConfig({});
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{ isOpen, openDrawer, closeDrawer, config, content, setContent }}
    >
      {mask && (
        <div
          className={styles.DivDrawerMask}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {isOpen && (
        <Drawer
          open={isOpen}
          direction="right"
          zIndex={100}
          className={styles.DivDrawerContainer}
          enableOverlay={false}
        >
          {content}
          {closeButton && (
            <div
              className={styles.DivDrawerCloseButtonContainer}
              onClick={() => setIsOpen(false)}
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
        </Drawer>
      )}
    </DrawerContext.Provider>
  );
};

DrawerProvider.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  mask: PropTypes.bool,
  closeButton: PropTypes.bool,
  setActive: PropTypes.func,
};

export const useDrawer = () => useContext(DrawerContext);
