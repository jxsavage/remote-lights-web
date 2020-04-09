import React from 'react';
import Card from 'react-bootstrap/Card';
import {
  MicroState,
} from 'Shared/MicroTypes';
import LEDSegments from './Children/LEDSegments';
import BrightnessSlider from './Children/BrightnessSlider';
import SegmentEditor from './Children/SegmentEditor';

interface MicroControllerProps {
  micro: MicroState;
}
const MicroController: React.
  FunctionComponent<MicroControllerProps> = ({ micro }) => {
  const {
    microId, brightness, totalLEDs, segments,
  } = micro;
  return (
    <Card.Body>
      <BrightnessSlider {...{ microId, brightness }} />
      <SegmentEditor {...{ micro }} />
      <hr />
      <LEDSegments {...{
        microId, totalLEDs, segments,
      }}
      />
    </Card.Body>
  );
};

export default MicroController;
