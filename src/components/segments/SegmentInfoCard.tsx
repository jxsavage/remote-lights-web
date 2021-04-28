import React from 'react';
import { LEDSegment, MicroEffect } from 'Shared/types';
import { Card } from 'react-bootstrap';

interface SegmentInfoCardProps {
  segment: LEDSegment;
}
const SegmentInfoCard:
React.FunctionComponent<SegmentInfoCardProps> = (
  {
    segment: {
      effect, numLEDs, offset, segmentId,
    },
  },
) => (
  <Card>
    <Card.Header className="h4">
      Segment Information
    </Card.Header>
    <Card.Body>
      <ul className="d-flex flex-row justify-content-around mb-0">
        <li className="h5">
          <span>Effect: </span>
          <span>{MicroEffect[effect]}</span>
        </li>
        <li className="h5">
          <span>LEDs: </span>
          <span>{numLEDs}</span>
        </li>
        <li className="h5">
          <span>Offset: </span>
          <span>{offset}</span>
        </li>
        <li className="h5">
          <span>ID: </span>
          <span>{segmentId}</span>
        </li>
      </ul>
    </Card.Body>
  </Card>
);

export default SegmentInfoCard;
