import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
// eslint-disable-next-line import/no-cycle
import { MicroController } from '../MicroControllers';

const SegmentsPage:
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
              {...{ microId }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SegmentsPage;
