import React from 'react';
import Card from 'react-bootstrap/Card';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroState } from 'Shared/store';
import LEDSegments from './Children/LEDSegments';
import BrightnessSlider from './Children/BrightnessSlider';
import SegmentEditor from './Children/SegmentEditor';

interface MicroControllerProps {
  microId: MicroState['microId'];
}
const MicroController:
React.FunctionComponent<MicroControllerProps> = (
  { microId },
) => {
  const micro = useShallowRootSelector(
    (state) => state.remoteLightsEntity.micros.byId[microId],
  );
  const {
    brightness, totalLEDs, segments,
  } = micro;
  return (
    <Card.Body>
      <BrightnessSlider {...{ microId, brightness }} />
      <SegmentEditor {...{ micro }} />
      <hr />
      <LEDSegments {...{
        totalLEDs, segments, microId,
      }}
      />
    </Card.Body>
  );
};

export default MicroController;
