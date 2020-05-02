import React from 'react';
import Card from 'react-bootstrap/Card';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroState } from 'Shared/store';
import LEDSegments from './LEDSegments';
import BrightnessSlider from './BrightnessSlider';
import { SegmentEditor } from '../Segments';

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
    brightness, totalLEDs, segmentIds,
  } = micro;
  return (
    <Card.Body>
      <BrightnessSlider {...{ microId, brightness }} />
      <SegmentEditor {...{ micro }} />
      <hr />
      <LEDSegments {...{
        totalLEDs, segmentIds, microId,
      }}
      />
    </Card.Body>
  );
};

export default MicroController;
