import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import EffectsTab from '../EffectsTab';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { Handle, Track, TooltipRail } from '../SliderComponents';
import { Nav, Tab } from 'react-bootstrap';
import {WebMicroSegment} from '../Shared/MicroTypes';
interface MicroControllerProps {
  socket: SocketIOClient.Socket;
  microId: string;
}
interface MicroControllerState {
  brightness: number;
  segments: WebMicroSegment[];
  segmentBoundaries: number[];
  update: number[];
  domain: number[];
}

const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
const segmentButtonStyle: React.CSSProperties = {
  width: '100%',
  margin: 0,
};
function segmentTabWidth(totalLEDs: number, segmentLEDs: number): React.CSSProperties {
  return {
    width: `${(segmentLEDs / totalLEDs) * 100}%`,
  };
}
class MicroController extends Component<MicroControllerProps> {
  microId: string;
  totalLEDs: number;
  state: MicroControllerState;
  socket: SocketIOClient.Socket;
  constructor(props: MicroControllerProps) {
    super(props);
    this.socket = props.socket;
    this.microId = props.microId;
    this.totalLEDs = 288;
    this.state = {
      brightness: 0,
      segments: [],
      segmentBoundaries: [],
      update: [],
      domain: [0, this.totalLEDs],
    };
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
  };
  setSegments = (segments: WebMicroSegment[]) => {
    console.log('setSegments', segments);
    const iterations = segments.length - 1;
    const boundaries: number[] = segments.reduce((boundaries, segment, index) => {
      if (index < iterations) {
        boundaries.push(segment.offset + segment.numLEDs);
      }

      return boundaries;
    }, [] as number[]);
    this.setState({
      segments,
      segmentBoundaries: boundaries,
    });
  };
  setMicroBrightness = (brightness: number) => {
    console.log('CLIENT: settingMicroBrightness', this.microId);
    this.socket.emit('setMicroBrightness', {
      microId: this.microId,
      brightness,
    });
  };
  getMicroBrightness = () => {
    this.socket.emit('getMicroBrightness', {
      microId: this.microId,
    });
  };
  getMicroSegments = () => {
    this.socket.emit('getMicroSegments', {
      microId: this.microId,
    });
  };
  changeBrightness = (event: React.ChangeEvent<HTMLInputElement>) => {
    const brightness = Number(event.target.value);
    this.setState({ brightness });
    this.setMicroBrightness(brightness);
  };
  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (segmentBoundaries: ReadonlyArray<number>) => {
    this.setState({ segmentBoundaries });
  };
  render() {
    const {
      microId,
      socket,
      totalLEDs,
      state: { segmentBoundaries, domain, segments },
    } = this;
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
            onChange={this.onChange}
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
        <Tab.Container defaultActiveKey="segment1Tab">
          <Nav style={segmentButtonStyle} variant="tabs">
            {segments.map(({ numLEDs }, index) => (
              <Nav.Item style={segmentTabWidth(totalLEDs, numLEDs)}>
                <Nav.Link eventKey={`segment${index + 1}Tab`}>{`Segment ${index + 1}`}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <hr></hr>
          <Tab.Content>
            {segments.map((segment, index) => (
              <Tab.Pane eventKey={`segment${index + 1}Tab`}>
                <Card>
                  <Card.Header>Segment {index + 1} Settings</Card.Header>
                  <Card.Body>
                    <EffectsTab
                      {...segment}
                      segmentIndex={index}
                      microId={microId}
                      socket={socket}
                    ></EffectsTab>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
        {/* {this.state.segments.map((segment: SegmentSocketResponse, index) => (
          <LEDSegment socket={this.socket} index={index} {...segment}></LEDSegment>
        ))} */}
        {/* <EffectsTab microId={this.microId} socket={this.socket}></EffectsTab> */}
      </Card.Body>
    );
  }
}
export default MicroController;
