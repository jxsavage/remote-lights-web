import React from 'react';
import Card from 'react-bootstrap/Card';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroState } from 'Shared/types';
import { SegmentEditor } from 'components/segments';
import { Button } from 'react-bootstrap';
import { resetMicro, writeEEPROM } from 'socket';
import LEDSegments from './LEDSegments';
import BrightnessSlider from './BrightnessSlider';

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
  function writeEEPROMOnClick(): void {
    writeEEPROM(microId);
  }
  function resetMicroOnClick(): void {
    resetMicro(microId);
  }
  return (
    <Card className="mb-3">
      <Card.Header className="h2">
        Microcontroller:
        {` ${microId}`}
      </Card.Header>
      <Card.Body>
        <BrightnessSlider {...{ microId, brightness }} />
        <SegmentEditor {...{ micro }} />
        <hr />
        <LEDSegments {...{
          totalLEDs, segmentIds, microId,
        }}
        />
      </Card.Body>
      <Card.Footer>
        <Button onClick={writeEEPROMOnClick} variant="info">
          Write EEPROM
        </Button>
        <Button onClick={resetMicroOnClick} variant="info">
          Reset
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default MicroController;
