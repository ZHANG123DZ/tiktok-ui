import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import 'react-modern-drawer/dist/index.css';
import styles from './styles.module.scss';

const DrawerContext = createContext();

export const DrawerProvider = ({
  children,
  isActive = false,
  mask = false,
  setActive = () => {},
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
    setActive(false);
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
      {isOpen && children}
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
