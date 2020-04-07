import { WebMicroSegment } from 'Shared/MicroTypes';
import { Tab, Nav, Card } from 'react-bootstrap';
import React from 'react';
import { EffectTabContainer } from './EffectsTab';

const segmentButtonStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};

interface LEDSegmentsProps {
  microId: string;
  totalLEDs: number;
  segments: WebMicroSegment[];
}
function LEDSegments(props: LEDSegmentsProps): JSX.Element {
  return (
    <Tab.Container defaultActiveKey="segment1Tab">
      <SegmentNav
        {...props}
      />
      <hr />
      <SegmentTabContent
        {...props}
      />
    </Tab.Container>
  );
}
export function segmentTabWidth(
  totalLEDs: number, segmentLEDs: number, segmentIndex: number, offset: number,
): React.CSSProperties {
  return {
    marginLeft: `${segmentIndex === 0 ? ((offset / totalLEDs) * 100) : 0}%`,
    width: `${(segmentLEDs / totalLEDs) * 100}%`,
  };
}
interface SegmentTabContentProps {
  microId: string;
  segments: WebMicroSegment[];
}
function SegmentNav({ segments, totalLEDs }: LEDSegmentsProps): JSX.Element {
  return (
    <Nav style={segmentButtonStyle} variant="tabs">
      {segments.map(({ numLEDs, offset }, segmentIndex) => (
        <Nav.Item
          // eslint-disable-next-line react/no-array-index-key
          key={`segmentNav${segmentIndex}`}
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
}
export function SegmentTabContent({ segments, microId }: SegmentTabContentProps): JSX.Element {
  return (
    <Tab.Content>
      {segments.map((segment: WebMicroSegment, segmentIndex: number) => {
        const props = {
          segment,
          microId,
          segmentIndex,

        };
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Tab.Pane key={`segmentPane${segmentIndex}`} eventKey={`segment${segmentIndex + 1}Tab`}>
            <Card>
              <Card.Header
                className="h3"
              >
                {`Segment ${segmentIndex + 1} Settings`}
              </Card.Header>
              <Card.Body>
                <SegmentInfoCard
                  {...segment}
                />
                <EffectTabContainer
                  {...props}
                />
              </Card.Body>
            </Card>
          </Tab.Pane>
        );
      })}
    </Tab.Content>
  );
}
function SegmentInfoCard({ effect, numLEDs, offset }: WebMicroSegment) {
  return (
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
}
export default LEDSegments;
