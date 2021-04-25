/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { Tab, Row, Col } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useShallowRootSelector } from 'components/RootStateProvider';
import {
  POSSIBLE_EFFECTS_STRINGS, LEDSegment, MicroEffect,
  SegmentGroup,
} from 'Shared/types';

type EffectTabVariants = 'segment' | 'group';
type VariantsId = SegmentGroup['segmentGroupId'] | LEDSegment['segmentId'];
interface SetEffectElementFactoryProps {
  id: VariantsId;
  newEffect: MicroEffect;
}
interface EffectTabContainerProps {
  variant: EffectTabVariants;
  id: VariantsId;
  setEffectElementFactory: React.FunctionComponentFactory<SetEffectElementFactoryProps>;
}
export const EffectTabContainer:
React.FunctionComponent<
EffectTabContainerProps
> = ({ variant, id, setEffectElementFactory }) => {
  const currentEffect = useShallowRootSelector((
    { remoteLightsEntity: { segments, segmentGroups } },
  ) => ((variant === 'segment')
    ? segments.byId[id].effect
    : segmentGroups.byId[id].groupEffect));

  return (
    <Card>
      <Card.Header className="h4">
        Effects
      </Card.Header>
      <Card.Body>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={MicroEffect[currentEffect || 0]}
        >
          <Row>
            <Col sm={3}>
              <EffectTab />
            </Col>
            <Col sm={9}>
              <EffectTabContent {...{ setEffectElementFactory, id }} />
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
  id: VariantsId;
  setEffectElementFactory: React.FunctionComponentFactory<SetEffectElementFactoryProps>;
}
export const EffectTabContent:
React.FunctionComponent<EffectTabContentProps> = (
  { id, setEffectElementFactory },
) => (
  <Tab.Content>
    {POSSIBLE_EFFECTS_STRINGS.map((effectName, newEffect) => (
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
              {setEffectElementFactory({ newEffect, id })}
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Tab.Pane>
    ))}
  </Tab.Content>
);

export default EffectTabContainer;
