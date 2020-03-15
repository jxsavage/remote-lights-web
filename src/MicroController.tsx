import React, { Component } from 'react';
import Card from "react-bootstrap/Card";
import EffectsTab, { EffectType } from "./EffectsTab";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { Handle, Track, TooltipRail } from "./SliderComponents";
import LEDSegment from './LEDSegment';

interface MicroControllerProps {
  socket: SocketIOClient.Socket;
  microId: string;
}
interface MicroControllerState {
  brightness: number;
  segments: SegmentSocketResponse[];
  values: number[];
  update: number[];
  domain: number[];
}
interface SegmentSocketResponse {
  offset: number;
  numLEDs: number;
  effect: EffectType;
}
const sliderStyle: React.CSSProperties = {
  position: "relative",
  width: "90%",
  margin: "3rem auto"
};
class MicroController extends Component<MicroControllerProps> {
  microId: string;
  state: MicroControllerState;
  socket: SocketIOClient.Socket;
  constructor(props: MicroControllerProps) {
    super(props);
    this.socket = props.socket;
    this.microId = props.microId;
    this.state = {
      brightness: 0,
      segments: [],
      values: [200, 400, 500],
      update: [200, 400],
      domain: [100, 500]
    }
    this.socket.on(`setBrightness.${this.microId}`, this.setBrightness);
    this.socket.on(`setSegments.${this.microId}`, this.setSegments);
  }
  componentDidMount = () => {
    this.getMicroBrightness();
    this.getMicroSegments();
  };
  setBrightness = (brightness: number) => {
    console.log('setBrightness', brightness);
    this.setState({ brightness });
  }
  setSegments = (segments: SegmentSocketResponse[]) => {
    console.log('setSegments', segments);
    this.setState({ segments });
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
  getMicroSegments = () => {
    this.socket.emit('getMicroSegments', {
      microId: this.microId
    })
  }
  changeBrightness = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = Number(event.target.value)
    this.setState({ brightness });
    this.setMicroBrightness(brightness);
  }
  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
  };
  render() {
    const {
      state: { values, domain }
    } = this;
    return (
      <Card.Body>
        <input type="range" className="custom-range" id="cowbell" name="cowbell"
          min="0" max="255" value={this.state.brightness.toString()} onChange={this.changeBrightness}></input>
        <hr></hr>
        <div style={{ height: 120, width: "100%" }}>
          <Slider
            mode={1}
            step={1}
            domain={domain}
            rootStyle={sliderStyle}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            values={values}
          >
            <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
            <Handles>
              {({ handles, activeHandleID, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      isActive={handle.id === activeHandleID}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>
        {/* {this.state.segments.map((segment: SegmentSocketResponse, index) => (
          <LEDSegment socket={this.socket} index={index} {...segment}></LEDSegment>
        ))} */}
        {/* <EffectsTab microId={this.microId} socket={this.socket}></EffectsTab> */}
      </Card.Body>
    );
  }
}
export default MicroController;