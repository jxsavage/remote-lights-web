import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import { useDispatch } from 'react-redux';
import { RootStateDispatch } from 'components/RootStateProvider';
import {
  setSegmentEffect, convertToEmittableAction,
  POSSIBLE_EFFECTS_STRINGS, LEDSegment, MicroEffect,
} from 'Shared/store';

interface EffectTabContainerProps {
  segment: LEDSegment;
}
export const EffectTabContainer:
React.FunctionComponent<EffectTabContainerProps> = ({ segment }) => {
  const { effect } = segment;

  return (
    <Card>
      <Card.Header className="h4">
        Effects
      </Card.Header>
      <Card.Body>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={MicroEffect[effect]}
        >
          <Row>
            <Col sm={3}>
              <EffectTab />
            </Col>
            <Col sm={9}>
              <EffectTabContent {...{ segment }} />
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
interface EffectTabContentProps {
  segment: LEDSegment;
}
export const EffectTabContent:
React.FunctionComponent<EffectTabContentProps> = ({ segment }) => (
  <Tab.Content>
    {POSSIBLE_EFFECTS_STRINGS.map((effectName, effect) => (
      <Tab.Pane
        key={effectName}
        eventKey={effectName}
      >
        <Card>
          <Card.Header className="h5">
            {`${effectName} Settings`}
          </Card.Header>
          <Card.Body />
          <Card.Footer>
            <ButtonGroup>
              <ActivateEffectButton {...{ segment, effect }} />
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Tab.Pane>
    ))}
  </Tab.Content>
);
interface ActivateEffectButtonProps {
  effect: MicroEffect;
  segment: LEDSegment;
}
const ActivateEffectButton:
React.FunctionComponent<ActivateEffectButtonProps> = (
  { segment, effect },
) => {
  const dispatch = useDispatch<RootStateDispatch>();
  const currentEffect = segment.effect;
  const { microId, segmentId } = segment;
  const activateEffect = (): void => {
    dispatch(convertToEmittableAction(setSegmentEffect({
      microId, effect, segmentId,
    })));
  };
  return (
    <Button
      disabled={effect === currentEffect}
      onClick={activateEffect}
      variant="info"
    >
      Activate
    </Button>
  );
};
export default EffectTabContainer;
