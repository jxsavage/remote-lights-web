import React from 'react';
import RootStateProvider from 'components/RootStateProvider';
import Routes from 'Routes';
import { initWebClient } from 'socket';

const App = (): JSX.Element => {
  initWebClient();
  return (
    <RootStateProvider>
      <Routes />
    </RootStateProvider>
  );
};

export default App;
