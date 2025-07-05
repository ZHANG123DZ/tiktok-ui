// ProtectedButtonContext.jsx

import { createContext, useContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const ProtectedButtonContext = createContext();

export const ProtectedButtonProvider = ({ children }) => {
  const [lastTriggerTime, setLastTriggerTime] = useState(null);

  const notifyRedirect = useCallback(() => {
    setLastTriggerTime(Date.now()); // 🔁 mỗi lần login xong sẽ cập nhật time
  }, []);

  return (
    <ProtectedButtonContext.Provider
      value={{
        lastTriggerTime,
        notifyRedirect,
      }}
    >
      {children}
    </ProtectedButtonContext.Provider>
  );
};

ProtectedButtonProvider.propTypes = {
  children: PropTypes.node,
};

export const useProtectedButton = () => useContext(ProtectedButtonContext);
