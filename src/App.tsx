import React, { ReactPropTypes, Component } from 'react';
import MicroController from './MicroController/MicroController';
import io from 'socket.io-client';
import Card from "react-bootstrap/Card";
import './App.css';
import { WebMicroInfo } from './Shared/MicroTypes';
const serverSocket = io.connect('http://192.168.0.104:3001/server');
interface AppState {
  micros: WebMicroInfo[];
}
class App extends Component {
  socket: SocketIOClient.Socket;
  state: AppState;
  constructor(props: ReactPropTypes) {
    super(props);
    this.socket = serverSocket;
    this.socket.on('setMicros', this.setMicros);
    this.state = {
      micros: []
    };
  }
  componentDidMount = () => {
    this.socket.emit('initWebClient');
  }
  setMicros = (micros: WebMicroInfo[]) => {
    console.log(`microIds returned ${micros}`);
    this.setState({micros});
  }
  render() {
    return (
      <Card className="App">
        <Card.Header className="h1">MicroControllers</Card.Header>
        <Card.Body>
        {this.state.micros.map((micro)=> (
          <Card key={micro.id}>
            <Card.Header className="h2">MicroController: {micro.id}</Card.Header>
              <MicroController key={micro.id} micro={micro} socket={this.socket}></MicroController>
          </Card>
        ))}
        </Card.Body>
      </Card>
    );
  }
}

export default App;
