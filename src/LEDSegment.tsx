import { Component } from 'react';
import {EffectType} from './EffectsTab';
interface LEDSegmentProps {
  index: number;
  offset: number;
  numLEDs: number;
  effect: EffectType;
  socket: SocketIOClient.Socket;
}
interface LEDSegmentState {
  index: number;
  offset: number;
  numLEDs: number;
  effect: EffectType;
}
class LEDSegment extends Component<LEDSegmentProps> {
  socket: SocketIOClient.Socket;
  state: LEDSegmentState;
  constructor(props: LEDSegmentProps) {
    super(props);
    this.socket = props.socket;
    this.state = {
      index: props.index,
      offset: props.offset,
      numLEDs: props.numLEDs,
      effect: props.effect,
    }
  }

}

export default LEDSegment;