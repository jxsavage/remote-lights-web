import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Slider, Rail, Handles, Tracks, SliderItem } from 'react-compound-slider';
import { Handle, Track, TooltipRail } from '../SliderComponents';
import {WebMicroSegment, WebMicroInfo} from '../Shared/MicroTypes';
import { SharedMicroState } from 'src/Shared/MicroShared';
import { WebEffect } from 'src/Shared/MicroCommands';
import LEDSegments from './Children/LEDSegments';
interface MicroControllerProps {
  socket: SocketIOClient.Socket;
  micro: WebMicroInfo;
}
interface MicroControllerState {
  brightness: number;
  segments: WebMicroSegment[];
  segmentBoundaries: number[];
  domain: number[];
}

const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};

class MicroController extends Component<MicroControllerProps> {
  micro: SharedMicroState;
  state: MicroControllerState;
  socket: SocketIOClient.Socket;
  constructor(props: MicroControllerProps) {
    super(props);
    this.socket = props.socket;
    this.micro = new SharedMicroState(props.micro);
    const {socket, micro} = this;
    this.state = {
      brightness: micro.getBrightness(),
      segments: micro.getSegments(),
      segmentBoundaries: micro.getSegmentBoundaries(),
      domain: [0, micro.getTotalLEDs()],
    };
    
    socket.on(`setBrightness.${micro.getId()}`, this.setBrightness);
    socket.on(`setSegments.${micro.getId()}`, this.setSegments);
  }
  componentDidMount = () => {
    // this.getMicroBrightness();
    // this.getMicroSegments();
  };
  setBrightness = (brightness: number) => {
    console.log('setBrightness', brightness);
    this.setState({ brightness });
  };
  setSegments = (segments: WebMicroSegment[]) => {
  };
  setMicroBrightness = (brightness: number) => {
    const microId = this.micro.getId();
    console.log('CLIENT: settingMicroBrightness', microId);
    this.socket.emit('setMicroBrightness', {
      microId,
      brightness,
    });
  };
  getMicroBrightness = () => {
    const microId = this.micro.getId();
    this.socket.emit('getMicroBrightness', {
      microId,
    });
  };
  getMicroSegments = () => {
    const microId = this.micro.getId();
    this.socket.emit('getMicroSegments', {
      microId,
    });
  };
  changeBrightness = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = Number(event.target.value);
    this.setState({ brightness });
    this.setMicroBrightness(brightness);
  };
  onUpdate = (segmentBoundaries: ReadonlyArray<number>) => {
    this.micro.resizeSegmentsFromBoundaries(segmentBoundaries as number[]);
    const segments = this.micro.getSegments();
    this.setState({
      segments,
      segmentBoundaries
    });
  };

  onChange = (segmentBoundaries: ReadonlyArray<number>) => {
    this.setState({ segmentBoundaries });
  };
  handleIsActive = (handle: SliderItem) => {
    const isMin = handle.value === 0 ? true : false;
    const isMax = handle.value === this.micro.getTotalLEDs() ? true : false;
    const minOrMax = isMin || isMax ? true : false;
    return minOrMax;
  }
  setEffect = (index: number, effect: WebEffect) => {
    const {micro} = this;
    micro.setEffect(index, effect);
    const segments = micro.getSegments();
    this.setState({segments});
  }
  render() {
    const {
      micro,
      setEffect,
      handleIsActive,
      state: { segmentBoundaries, domain, segments },
    } = this;
    const totalLEDs = micro.getTotalLEDs();
    const segmentTabProps = {
      totalLEDs,
      segments,
      setEffect
    };
    
    return (
      <Card.Body>
        <input
          type="range"
          className="custom-range"
          id="cowbell"
          name="cowbell"
          min="0"
          max="255"
          value={this.state.brightness.toString()}
          onChange={this.changeBrightness}
        ></input>
        <hr></hr>
        <div style={{ height: 120, width: '100%' }}>
          <Slider
            mode={1}
            step={1}
            domain={domain}
            rootStyle={sliderStyle}
            onUpdate={this.onUpdate}
            // onChange={this.onChange}
            values={segmentBoundaries}
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
                      disabled={handleIsActive(handle)}
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
                    <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>
        <LEDSegments
          {...segmentTabProps}
        ></LEDSegments>
      </Card.Body>
    );
  }
}

export default MicroController;
