import { BrowserRouter as Router } from 'react-router-dom';

import { useState } from 'react';
import store, { persistor } from './store/store';
import Loading from './components/Loading';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import AppContent from './AppContent';
import { ProtectedButtonProvider } from './contexts/ProtectedButtonContext';

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
