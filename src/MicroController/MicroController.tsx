import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { SliderItem } from 'react-compound-slider';
import {WebMicroSegment, WebMicroInfo} from '../Shared/MicroTypes';
import { SharedMicroState } from 'src/Shared/MicroShared';
import { WebEffect } from 'src/Shared/MicroCommands';
import LEDSegments from './Children/LEDSegments';
import SegmentResizer, { SegmentResizerProps } from './Children/SegmentResizer';
import BrightnessSlider, { BrightnessSliderProps } from './Children/BrightnessSlider';
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
  updateSegments = (segmentBoundaries: ReadonlyArray<number>) => {
    this.micro.resizeSegmentsFromBoundaries(segmentBoundaries as number[]);
    const segments = this.micro.getSegments();
    this.setState({
      segments,
      segmentBoundaries
    });
  };
  updateBrightness = ([brightness]: ReadonlyArray<number>) => {
    this.setState({ brightness });
    this.setMicroBrightness(brightness);
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
      updateSegments,
      updateBrightness,
      handleIsActive,
      state: { segmentBoundaries, domain, segments, brightness },
    } = this;
    const totalLEDs = micro.getTotalLEDs();
    const segmentTabProps = {
      totalLEDs,
      segments,
      setEffect
    };
    const brightnessSliderProps: BrightnessSliderProps = {
      brightness,
      onUpdate: updateBrightness
    }
    const segmentResizerProps: SegmentResizerProps = {
      domain,
      totalLEDs,
      handleIsActive,
      segmentBoundaries,
      onUpdate: updateSegments,
    }
    
    return (
      <Card.Body>
        <BrightnessSlider 
          {...brightnessSliderProps}>
        </BrightnessSlider>
        <hr></hr>
        <SegmentResizer
          {...segmentResizerProps}>
        </SegmentResizer>
        <hr></hr>
        <LEDSegments
          {...segmentTabProps}
        ></LEDSegments>
      </Card.Body>
    );
  }
}

export default MicroController;
