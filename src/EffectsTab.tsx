import React, { Component } from "react";
import { Tab, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {WebMicroSegment, WebEffect} from 'Shared/MicroTypes';
interface EffectsTabProps extends WebMicroSegment {
  socket: SocketIOClient.Socket;
  microId: string;
  segmentIndex: number;
}
interface EffectsTabState extends WebMicroSegment {}

class EffectsTab extends Component<EffectsTabProps> {
  microId: string;
  initialized: boolean;
  segmentIndex: number;
  state: EffectsTabState;
  socket: SocketIOClient.Socket;
  
  constructor(props: EffectsTabProps) {
    super(props);
    this.socket = props.socket;
    this.microId = props.microId;
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