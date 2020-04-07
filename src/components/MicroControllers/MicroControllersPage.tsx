import React from 'react';
import { useRemoteLightsState } from 'components/AppState';
import MicroController from './MicroController';

const MicroControllersPage:
React.FunctionComponent = () => {
  const { allMicroIds, byMicroId } = useRemoteLightsState();
  return (
    <div className="App card">
      <div className="h1 card-header">MicroControllers</div>
      <div className="card-body">
        {allMicroIds.map((microId) => (
          <div className="card" key={microId}>
            <div className="h2 card-header">
              MicroController:
              {microId}
            </div>
            <MicroController
              key={microId}
              micro={byMicroId[microId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MicroControllersPage;
