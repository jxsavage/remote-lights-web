import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { SegmentInfoCard } from 'components/segments';
import { EffectTabContainer } from 'components/effects';
import { setSegmentEffectButtonFactory } from 'components/segments/SetSegmentEffectButton';

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
              variant="segment"
              id={segmentId}
              setEffectElementFactory={setSegmentEffectButtonFactory}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SegmentsPage;
