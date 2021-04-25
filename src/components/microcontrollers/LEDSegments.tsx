/* eslint-disable @typescript-eslint/no-use-before-define */
import { Tab, Nav, Card } from 'react-bootstrap';
import React from 'react';
import { MicroState, LEDSegment } from 'Shared/types';
import { useShallowRootSelector } from 'components/RootStateProvider';
import segmentTabWidth from 'components/utils';
import { EffectTabContainer } from 'components/effects';
import SegmentInfoCard from 'components/segments/SegmentInfoCard';
import { setSegmentEffectButtonFactory } from 'components/segments/SetSegmentEffectButton';

const segmentButtonStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};

interface LEDSegmentsProps {
  microId: MicroState['microId'];
  totalLEDs: number;
  segmentIds: MicroState['segmentIds'];
}
const LEDSegments: React.FunctionComponent<LEDSegmentsProps> = (
  { segmentIds, totalLEDs, microId },
) => {
  const segmentsArray = useShallowRootSelector(
    (state) => segmentIds.map(
      (segmentId) => state.remoteLightsEntity.segments.byId[segmentId],
    ),
  );
  return (
    <Tab.Container defaultActiveKey="segment1Tab">
      <SegmentNav
        {...{ microId, totalLEDs, segments: segmentsArray }}
      />
      <hr />
      <SegmentTabContent
        {...{ microId, segments: segmentsArray }}
      />
    </Tab.Container>
  );
};

interface SegmentNavProps {
  segments: LEDSegment[];
  totalLEDs: MicroState['totalLEDs'];
}
const SegmentNav:
React.FunctionComponent<SegmentNavProps> = (
  { segments, totalLEDs },
) => (
  <Nav style={segmentButtonStyle} variant="tabs">
    {segments.map(({ numLEDs, offset, segmentId }, segmentIndex: number) => (
      <Nav.Item
        key={segmentId}
        style={segmentTabWidth(totalLEDs, numLEDs, segmentIndex, offset)}
      >
        <Nav.Link
          className="h3 text-center"
          eventKey={`segment${segmentIndex + 1}Tab`}
        >
          {`Segment ${segmentIndex + 1}`}
        </Nav.Link>
      </Nav.Item>
    ))}
  </Nav>
);

interface SegmentTabContentProps {
  segments: LEDSegment[];
}
export const SegmentTabContent:
React.FunctionComponent<SegmentTabContentProps> = (
  { segments },
) => (
  <Tab.Content>
    {segments.map((segment: LEDSegment, segmentIndex: number) => {
      const { segmentId } = segment;
      return (
        <Tab.Pane key={segmentId} eventKey={`segment${segmentIndex + 1}Tab`}>
          <Card>
            <Card.Header
              className="h3"
            >
              {`Segment ${segmentIndex + 1} Settings`}
            </Card.Header>
            <Card.Body>
              <SegmentInfoCard
                {...{ segment }}
              />
              <EffectTabContainer
                variant="segment"
                id={segment.segmentId}
                setEffectElementFactory={setSegmentEffectButtonFactory}
              />
            </Card.Body>
          </Card>
        </Tab.Pane>
      );
    })}
  </Tab.Content>
);

export default LEDSegments;
