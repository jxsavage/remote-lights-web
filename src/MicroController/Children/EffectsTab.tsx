import React, { Component } from "react";
import { Tab, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {WebMicroSegment} from '../../Shared/MicroTypes';
import {WebEffect} from '../../Shared/MicroCommands';
import { SharedMicroState } from "../../Shared/MicroShared";
interface EffectsTabProps extends WebMicroSegment {
  socket: SocketIOClient.Socket;
  micro: SharedMicroState;
  segmentIndex: number;
}
interface EffectTabProps
extends WebMicroSegment {
  index: number;
  setEffect: (index: number, effect: WebEffect) => void;
}
interface EffectsTabState extends WebMicroSegment {}
const POSSIBLE_EFFECTS = Object.values(WebEffect);
export function EffectTabContainer
  (props: EffectTabProps){
  const {effect} = props;

  return (
  <Card>
      <Card.Header className="h4">
        Effects
      </Card.Header>
      <Card.Body>
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey={effect}>
        <Row>
          <Col sm={3}>
            <EffectTab></EffectTab>
          </Col>
          <Col sm={9}>
            <EffectTabContent
            {...props}>

            </EffectTabContent>
          </Col>
        </Row>
      </Tab.Container>
      </Card.Body>
    </Card>
  )}
export function EffectTab() {
  return (
    <Nav variant="pills" className="flex-column">
      {POSSIBLE_EFFECTS.map((effect) => (
      <Nav.Item key={effect}>
        <Nav.Link
          className="h5"
          eventKey={effect}>{effect}</Nav.Link>
      </Nav.Item>
      ))}
    </Nav>
)}
function activateEffect(
  effect: WebEffect,
  index: number,
  setEffect: (index: number, effect: WebEffect) => void
){
  return function() {
    setEffect(index, effect);
  }
}
export function EffectTabContent({effect, index, setEffect}: EffectTabProps) {
  return (
    <Tab.Content>
    {POSSIBLE_EFFECTS.map((possibleEffect) => {
      const possible = possibleEffect as WebEffect;
      return (
      <Tab.Pane
        key={possibleEffect}
        eventKey={possibleEffect}>
        <Card>
          <Card.Header className="h5">
            {possibleEffect} Settings
          </Card.Header>
          <Card.Body>
    
          </Card.Body>
          <Card.Footer>
            <ButtonGroup>
              <Button
                disabled={possible === effect} 
                onClick={activateEffect(possible, index, setEffect)} variant="info">Activate</Button>
              {/* <Button variant="warning">Set Effect</Button> */}
            </ButtonGroup>
          </Card.Footer>
        </Card>
      </Tab.Pane>
    )})}
    </Tab.Content>
  )
}
class EffectsTab extends Component<EffectsTabProps> {
  microId: string;
  micro: SharedMicroState;
  initialized: boolean;
  segmentIndex: number;
  state: EffectsTabState;
  socket: SocketIOClient.Socket;
  
  constructor(props: EffectsTabProps) {
    super(props);
    this.socket = props.socket;
    this.micro = props.micro;
    this.microId = this.micro.getId();
    this.segmentIndex = props.segmentIndex;
    this.initialized = false;
    //this.socket.on(`setEffect.${this.microId}`, this.setEffect);
    this.state = {
      offset: props.offset,
      effect: props.effect,
      numLEDs: props.numLEDs,
    }
  }
  setEffect = (effect: WebEffect) => {
    console.log('setEffect', effect);
    this.setState({effect: effect});
  }
  setMicroEffect = (effect: WebEffect) => {
    console.log('CLIENT: settingMicroEffect', this.microId)
    this.socket.emit('setMicroEffect', {
      microId: this.microId,
      effect
    });
    this.setEffect(effect);
  }
  getMicroEffect = () => {
    this.socket.emit('getMicroEffect', {
      microId: this.microId
    }, this.setEffect);
  }
  componentDidMount = () => {
    //this.getMicroEffect();
  };
  
  changeEffect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const effect: WebEffect = event.target.value as WebEffect;
    this.setMicroEffect(effect);
  }
  changeEffectsTab = (event: React.ChangeEvent<HTMLInputElement>) => {
  }
  /**
   * @param {Event} event
   * @memberof EffectsTab
   */
  handleActivateClick = (event: React.MouseEvent) => {
    const effect: WebEffect = event.currentTarget.id as WebEffect;
    this.setMicroEffect(effect);
  }
  render() {
    return (
    <Card>
      <Card.Header>
        Effects
      </Card.Header>
      <Card.Body>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Colorwaves</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Blendwave</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Card>
                  <Card.Header>
                    Colorwaves
                  </Card.Header>
                  <Card.Body>

                  </Card.Body>
                  <Card.Footer>
                    <ButtonGroup>
                      <Button id={WebEffect.ColorWaves} disabled={this.state.effect === WebEffect.ColorWaves} onClick={this.handleActivateClick} variant="info">Activate</Button>
                      {/* <Button variant="warning">Set Effect</Button> */}
                    </ButtonGroup>
                  </Card.Footer>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <Card>
                <Card.Header>
                  Blendwave
                </Card.Header>
                <Card.Body>

                </Card.Body>
                <Card.Footer>
                  <ButtonGroup>
                    <Button id={WebEffect.BlendWave} disabled={this.state.effect === WebEffect.BlendWave} onClick={this.handleActivateClick} variant="info">Activate</Button>
                    {/* <Button variant="warning">Set Effect</Button> */}
                  </ButtonGroup>
                </Card.Footer>
              </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      </Card.Body>
    </Card>
    );
  }
}

export default EffectsTab;