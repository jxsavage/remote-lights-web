import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { LEDSegment } from 'Shared/MicroTypes';
import { MicroEffect, POSSIBLE_EFFECTS_STRINGS } from 'Shared/MicroCommands';
import { setSegmentEffect, SetSegmentEffectStatePayload } from 'Shared/reducers/remoteLights';
import { emitAndDispatchMicroStateAction, useRemoteLightsDispatch } from 'components/AppState';

interface EffectTabContainerProps {
  segment: LEDSegment;
  segmentIndex: number;
  microId: string;
}
interface EffectTabContentProps extends EffectTabContainerProps {
  segmentIndex: number;
}
export const EffectTabContainer: React.
  FunctionComponent<EffectTabContainerProps> = ({
  microId, segment, segmentIndex,
}) => {
  const { effect } = segment;

  return (
    <Card>
      <Card.Header className="h4">
        Effects
      </Card.Header>
      <Card.Body>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={effect}
        >
          <Row>
            <Col sm={3}>
              <EffectTab />
            </Col>
            <Col sm={9}>
              <EffectTabContent
                {...{
                  microId, segment, segmentIndex,
                }}
              />
            </Col>
          </Row>
        </Tab.Container>
      </Card.Body>
    </Card>
  );
};
export function EffectTab(): JSX.Element {
  return (
    <Nav variant="pills" className="flex-column">
      {POSSIBLE_EFFECTS_STRINGS.map((effect) => (
        <Nav.Item key={effect}>
          <Nav.Link
            className="h5"
            eventKey={effect}
          >
            {effect}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
  );
}

export const EffectTabContent: React.
  FunctionComponent<EffectTabContentProps> = ({
  microId, segment, segmentIndex,
}) => {
  const dispatch = useRemoteLightsDispatch();
  return (
    <Tab.Content>
      {POSSIBLE_EFFECTS_STRINGS.map((effectName, microEffect) => {
        const { effect } = segment;
        function activateEffect(payload: SetSegmentEffectStatePayload) {
          return function emitAndDispatch(): void {
            emitAndDispatchMicroStateAction(
              dispatch, setSegmentEffect, payload,
            );
          };
        }
        return (
          <Tab.Pane
            key={effectName}
            eventKey={effectName}
          >
            <Card>
              <Card.Header className="h5">
                {`${effectName} Settings`}
                Settings
              </Card.Header>
              <Card.Body />
              <Card.Footer>
                <ButtonGroup>
                  <Button
                    disabled={effectName === MicroEffect[microEffect]}
                    onClick={activateEffect({ microId, payload: { effect, segmentIndex } })}
                    variant="info"
                  >
                    Activate
                  </Button>
                  {/* <Button variant="warning">Set Effect</Button> */}
                </ButtonGroup>
              </Card.Footer>
            </Card>
          </Tab.Pane>
        );
      })}
    </Tab.Content>
  );
};

export default EffectTabContainer;
