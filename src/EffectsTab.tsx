import React, { Component } from "react";
import { Tab, Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
interface EffectsTabProps {
  socket: SocketIOClient.Socket;
  microId: string;
}
interface EffectsTabState {
  effect: EffectType | null;
}
export enum EffectType {
  ColorWaves = "COLORWAVES",
  BlendWave = "BLENDWAVE"
}
class EffectsTab extends Component<EffectsTabProps> {
  microId: string;
  state: EffectsTabState;
  socket: SocketIOClient.Socket;
  initialized: boolean;
  constructor(props: EffectsTabProps) {
    super(props);
    this.socket = props.socket;
    this.microId = props.microId;
    this.initialized = false;
    this.socket.on(`setEffect.${this.microId}`, this.setEffect);
    this.state = {
      effect: null
    }
  }
  setEffect = (effect: EffectType) => {
    console.log('setEffect', effect);
    this.setState({effect: effect});
  }
  setMicroEffect = (effect: EffectType) => {
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
    this.getMicroEffect();
  };
  
  changeEffect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const effect: EffectType = event.target.value as EffectType;
    this.setMicroEffect(effect);
  }
  changeEffectsTab = (event: React.ChangeEvent<HTMLInputElement>) => {
  }
  /**
   * @param {Event} event
   * @memberof EffectsTab
   */
  handleActivateClick = (event: React.MouseEvent) => {
    const effect: EffectType = event.currentTarget.id as EffectType;
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
                      <Button id={EffectType.ColorWaves} disabled={this.state.effect === EffectType.ColorWaves} onClick={this.handleActivateClick} variant="info">Activate</Button>
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
                    <Button id={EffectType.BlendWave} disabled={this.state.effect === EffectType.BlendWave} onClick={this.handleActivateClick} variant="info">Activate</Button>
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