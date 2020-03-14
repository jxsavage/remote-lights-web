import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import EffectsTab from "./EffectsTab";

interface MicroControllerProps {
  socket: SocketIOClient.Socket;
  microId: string;
}
interface MicroControllerState {
  brightness: number;

}
class MicroController extends Component<MicroControllerProps> {
  microId: string;
  state: MicroControllerState;
  socket: SocketIOClient.Socket;
  constructor(props: MicroControllerProps) {
    super(props);
    this.socket = props.socket;
    this.microId = props.microId;
    this.state = {
      brightness: 0
    }
    this.socket.on(`setBrightness.${this.microId}`, this.setBrightness);
  }
  componentDidMount = () => {
    this.getMicroBrightness();
  };
  setBrightness = (brightness: number) => {
    console.log('setBrightness', brightness);
    this.setState({brightness: brightness});
  }
  setMicroBrightness = (brightness: number) => {
    console.log('CLIENT: settingMicroBrightness', this.microId)
    this.socket.emit('setMicroBrightness', {
      microId: this.microId,
      brightness
    });
  }
  getMicroBrightness = () => {
    this.socket.emit('getMicroBrightness', {
      microId: this.microId
    });
  }
  changeBrightness = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = Number(event.target.value)
    this.setState({brightness});
    this.setMicroBrightness(brightness);
  }
  render() {
    return (
        <Card.Body>
          <input type="range" className="custom-range" id="cowbell" name="cowbell" 
          min="0" max="255" value={this.state.brightness.toString()} onChange={this.changeBrightness}></input>
          <EffectsTab microId={this.microId} socket={this.socket}></EffectsTab>
        </Card.Body>
    );
  }
}
export default MicroController;