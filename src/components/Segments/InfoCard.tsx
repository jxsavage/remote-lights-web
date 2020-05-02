import React from 'react';
import { LEDSegment } from 'Shared/store';
import { Card } from 'react-bootstrap';

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

export default SegmentInfoCard;
