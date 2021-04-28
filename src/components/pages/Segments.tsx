import React from 'react';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { SegmentInfoCard } from 'components/segments';
import { EffectTabContainer } from 'components/effects';
import { Card } from 'react-bootstrap';

const SegmentsPage:
React.FunctionComponent = () => {
  const {
    byId, allIds,
  } = useShallowRootSelector((state) => state.remoteLightsEntity.segments);
  return (
    <Card>
      <Card.Header className="h1">Segments</Card.Header>
      <Card.Body>
        {allIds.map((segmentId) => (
          <Card key={segmentId}>
            <Card.Header className="h2">
              {`Segment ${segmentId}`}
            </Card.Header>
            <SegmentInfoCard
              segment={byId[segmentId]}
            />
            <EffectTabContainer
              variant="segment"
              id={segmentId}
              // setEffectElementFactory={setSegmentEffectButtonFactory}
            />
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
};
export default SegmentsPage;
