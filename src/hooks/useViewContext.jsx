import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState();

  return (
    <ViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </ViewContext.Provider>
  );
};

ViewProvider.propTypes = {
  children: PropTypes.element,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useViewContext = () => useContext(ViewContext);
