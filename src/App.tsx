import React, { ReactPropTypes, Component } from 'react';
import MicroController from './MicroController';
import io from 'socket.io-client';
import Card from "react-bootstrap/Card";
import './App.css';
const serverSocket = io.connect('http://192.168.0.104:3001/server');
interface AppState {
  microIds: string[];
}
class App extends Component {
  socket: SocketIOClient.Socket;
  state: AppState;
  constructor(props: ReactPropTypes) {
    super(props);
    this.socket = serverSocket;
    this.socket.on('setMicros', this.setMicros);
    this.state = {
      microIds: []
    };
  }
  componentDidMount = () => {
    this.socket.emit('initWebClient');
  }
  setMicros = (microIds: Array<String>) => {
    console.log(`microIds returned ${microIds}`);
    this.setState({microIds});
  }
  render() {
    return (
      <Card className="App">
        <Card.Header>MicroControllers</Card.Header>
        <Card.Body>
        {this.state.microIds.map((microId: string)=> (
          <Card className="Brightness" key={microId}>
            <Card.Header>MicroController: {microId}</Card.Header>
              <MicroController key={microId} microId={microId} socket={this.socket}></MicroController>
          </Card>
        ))}
        </Card.Body>
      </Card>
    );
  }
}

export default App;
