/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Slider, Rail, Handles, Tracks,
} from 'react-compound-slider';
import { Card } from 'react-bootstrap';

import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import { MicroState } from 'Shared/types';
import { setMicroBrightness } from 'Shared/store';
import { Handle, Track, TooltipRail } from './children';

export interface BrightnessSliderProps {
  microId: MicroState['microId'];
  brightness: number;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
const brightnessDomain = [0, 255];

function calcPercent(brightness: number): number {
  let percent = (brightness / 255) * 1000;
  percent = Math.round(percent) / 10;
  return percent;
}

function BrightnessSlider(
  { brightness, microId }: BrightnessSliderProps,
): JSX.Element {
  const dispatch = useDispatch<RootStateDispatch>();
  const updateBrightness = (slider: readonly number[]): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const [brightness] = slider;
    dispatch(andEmitAction(setMicroBrightness({
      microId, brightness,
    }), microId.toString()));
  };
  return (
    <Card className="mb-3 border border-light rounded overflow-hidden">
      <Card.Header className="h3">{`Brightness: ${calcPercent(brightness)}%`}</Card.Header>
      <Card.Body className="pb-5 w-100 bg-primary" style={{ height: 'fit-content' }}>
        <Slider
          mode={1}
          step={1}
          domain={brightnessDomain}
          rootStyle={sliderStyle}
          onUpdate={updateBrightness}
        // onChange={this.onChange}
          values={[brightness] as readonly number[]}
        >
          <Rail>{(railProps) => <TooltipRail {...railProps} />}</Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={brightnessDomain}
                    isActive={handle.id === activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                ))}
              </div>
            )}
          </Tracks>
        </Slider>
      </Card.Body>
    </Card>
  );
}

export default BrightnessSlider;
