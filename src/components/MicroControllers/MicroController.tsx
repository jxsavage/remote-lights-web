import React from 'react';
import Card from 'react-bootstrap/Card';
import {
  WebMicroInfo,
} from 'Shared/MicroTypes';
import { StateActions } from 'Shared/reducers/remoteLights';
import LEDSegments from './Children/LEDSegments';
import BrightnessSlider from './Children/BrightnessSlider';
import SegmentEditor from './Children/SegmentEditor';

interface MicroControllerProps {
  micro: WebMicroInfo;
}
const MicroController: React.
  FunctionComponent<MicroControllerProps> = ({ micro }) => {
  const {
    id, brightness, totalLEDs, segments,
  } = micro;
  const microId = id;
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
