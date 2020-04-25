import React from 'react';
import RootStateProvider from 'components/RootStateProvider';
import Routes from 'Routes';

const App = (): JSX.Element => (
  <RootStateProvider>
    <Routes />
  </RootStateProvider>
);

export default App;
