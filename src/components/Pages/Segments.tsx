import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { EffectTabContainer, SegmentInfoCard } from 'components/Segments';

const SegmentsPage:
React.FunctionComponent = () => {
  const {
    byId, allIds,
  } = useShallowRootSelector((state) => state.remoteLightsEntity.segments);
  return (
    <div className="card">
      <div className="h1 card-header">Segments</div>
      <div className="card-body">
        {allIds.map((segmentId) => (
          <div className="card" key={segmentId}>
            <div className="h2 card-header">
              {`Segment ${segmentId}`}
            </div>
            <SegmentInfoCard
              segment={byId[segmentId]}
            />
            <EffectTabContainer
              segment={byId[segmentId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SegmentsPage;
