import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { WebMicroSegment } from 'Shared/MicroTypes';
import { WebEffect } from 'Shared/MicroCommands';
import { setSegmentEffect, SetSegmentEffectStatePayload } from 'Shared/reducers/remoteLights';
import { emitAndDispatchMicroAction, useRemoteLightsDispatch } from 'components/AppState';

interface EffectTabContainerProps {
  segment: WebMicroSegment;
  segmentIndex: number;
  microId: string;
}
interface EffectTabContentProps extends EffectTabContainerProps {
  segmentIndex: number;
}
const POSSIBLE_EFFECTS = Object.values(WebEffect);
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
      {POSSIBLE_EFFECTS.map((effect) => (
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
      {POSSIBLE_EFFECTS.map((possibleEffect) => {
        const possible = possibleEffect as WebEffect;
        const { effect } = segment;
        function activateEffect(payload: SetSegmentEffectStatePayload) {
          return function emitAndDispatch(): void {
            emitAndDispatchMicroAction(
              dispatch, setSegmentEffect, payload,
            );
          };
        }
        return (
          <Tab.Pane
            key={possibleEffect}
            eventKey={possibleEffect}
          >
            <Card>
              <Card.Header className="h5">
                {possibleEffect}
                {' '}
                Settings
              </Card.Header>
              <Card.Body />
              <Card.Footer>
                <ButtonGroup>
                  <Button
                    disabled={possible === effect}
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
