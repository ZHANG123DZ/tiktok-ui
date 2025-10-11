import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import { useState } from 'react';
import store, { persistor } from './store/store';
import Loading from './components/Loading';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AppContent from './AppContent';
import { ProtectedButtonProvider } from './contexts/ProtectedButtonContext';
import i18n from '../src/i18n';

function App() {
  const [ready, setReady] = useState(false);

  return (
    <Provider store={store}>
      <ProtectedButtonProvider>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
          onBeforeLift={() => {
            setReady(true);
            const lang = store.getState().language.language;
            i18n.changeLanguage(lang);
          }}
        >
          {ready ? (
            <Router>
              <AppContent />
            </Router>
          ) : null}
        </PersistGate>
      </ProtectedButtonProvider>
    </Provider>
  );
}

export default App;
