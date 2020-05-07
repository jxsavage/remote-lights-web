import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroController } from 'components/microcontrollers';

const MicrocontrollersPage:
React.FunctionComponent = () => {
  const allMicroIds = useShallowRootSelector((state) => state.remoteLightsEntity.micros.allIds);
  return (
    <div className="card">
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
              microId={microId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default MicrocontrollersPage;
