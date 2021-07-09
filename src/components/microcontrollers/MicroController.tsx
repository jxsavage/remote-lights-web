import React from 'react';
import Card from 'react-bootstrap/Card';
import { useShallowRootSelector } from 'components/RootStateProvider';
import { MicroState } from 'Shared/types';
import { SegmentEditor } from 'components/segments';
import { Button, Form } from 'react-bootstrap';
import {
  resetMicro, writeEEPROM, loadEEPROM, restoreDefault,
} from 'socket';
import { setMicroAlias } from 'Shared/store';
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
    brightness, totalLEDs, segmentIds, alias,
  } = micro;
  function writeEEPROMOnClick(): void {
    writeEEPROM(microId);
  }
  function resetMicroOnClick(): void {
    resetMicro(microId);
  }
  function loadEEPROMOnClick(): void {
    loadEEPROM(microId);
  }
  function restoreDefaultOnClick(): void {
    restoreDefault(microId);
  }
  function setMicroAliasOnClick(): void {
    // setMicroAlias()
  }
  return (
    <Card className="mb-3">
      <Card.Header className="h2">
        <Form>
          <Form.Group>
            <Form.Label>
              Microcontroller
            </Form.Label>
            <Form.Control placeholder={alias} />
          </Form.Group>
        </Form>
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
        <Button onClick={resetMicroOnClick} variant="info">
          Reset
        </Button>
        <Button onClick={loadEEPROMOnClick} variant="info">
          Load EEPROM
        </Button>
        <Button onClick={writeEEPROMOnClick} variant="info">
          Write EEPROM
        </Button>
        <Button onClick={restoreDefaultOnClick} variant="info">
          Restore Default
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default MicroController;
