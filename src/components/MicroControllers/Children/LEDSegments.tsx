import { Tab, Nav, Card } from 'react-bootstrap';
import React from 'react';
import { MicroState, LEDSegment } from 'Shared/store';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { EffectTabContainer } from './EffectsTab';

const segmentButtonStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};

interface LEDSegmentsProps {
  microId: MicroState['microId'];
  totalLEDs: number;
  segments: MicroState['segments'];
}
const LEDSegments: React.FunctionComponent<LEDSegmentsProps> = (
  { segments, totalLEDs, microId },
) => {
  const segmentsArray = useShallowRootSelector(
    (state) => segments.map(
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
export function segmentTabWidth(
  totalLEDs: number, segmentLEDs: number, segmentIndex: number, offset: number,
): React.CSSProperties {
  return {
    marginLeft: `${segmentIndex === 0 ? ((offset / totalLEDs) * 100) : 0}%`,
    width: `${(segmentLEDs / totalLEDs) * 100}%`,
  };
}

interface SegmentNavProps {
  segments: LEDSegment[];
  totalLEDs: MicroState['totalLEDs'];
}
const SegmentNav:
React.FunctionComponent<SegmentNavProps> = (
  { segments, totalLEDs },
) => (
  <Nav style={segmentButtonStyle} variant="tabs">
    {segments.map(({ numLEDs, offset, segmentId }, segmentIndex) => (
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
  microId: MicroState['microId'];
  segments: LEDSegment[];
}
export const SegmentTabContent:
React.FunctionComponent<SegmentTabContentProps> = (
  { segments, microId },
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
                {...{ segment, microId, segmentIndex }}
              />
            </Card.Body>
          </Card>
        </Tab.Pane>
      );
    })}
  </Tab.Content>
);
interface SegmentInfoCardProps {
  segment: LEDSegment;
}
const SegmentInfoCard:
React.FunctionComponent<SegmentInfoCardProps> = (
  { segment: { effect, numLEDs, offset } },
) => (
  <Card>
    <Card.Header className="h4">
      Segment Information
    </Card.Header>
    <Card.Body>
      <ul className="d-flex flex-row justify-content-around mb-0">
        <li className="h5">
          <span>Effect: </span>
          <span>{effect}</span>
        </li>
        <li className="h5">
          <span>LEDs: </span>
          <span>{numLEDs}</span>
        </li>
        <li className="h5">
          <span>Offset: </span>
          <span>{offset}</span>
        </li>
      </ul>
    </Card.Body>
  </Card>
);
export default LEDSegments;
