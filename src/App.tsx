import React from 'react';
import AppStateDispatchProvider from 'components/AppState';
import Routes from 'Routes';

const App = (): JSX.Element => (
  <AppStateDispatchProvider>
    <Routes />
  </AppStateDispatchProvider>
);

export default App;
