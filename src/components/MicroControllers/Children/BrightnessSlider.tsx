import React from 'react';
import {
  Slider, Rail, Handles, Tracks,
} from 'react-compound-slider';
import { Card } from 'react-bootstrap';
import { setBrightness } from 'Shared/reducers/remoteLights';
import { emitAndDispatchMicroStateAction, useRemoteLightsDispatch } from 'components/AppState';
import { MicroId } from 'Shared/MicroTypes';
import { Handle, Track, TooltipRail } from './BrightnessComponents';

export interface BrightnessSliderProps {
  microId: MicroId;
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
  const dispatch = useRemoteLightsDispatch();
  function updateBrightness(slider: readonly number[]): void {
    // eslint-disable-next-line no-shadow
    const [brightness] = slider;
    emitAndDispatchMicroStateAction(dispatch, setBrightness, { payload: { brightness }, microId });
  }
  return (
    <Card>
      <Card.Header className="h3">{`Brightness: ${calcPercent(brightness)}%`}</Card.Header>
      <Card.Body style={{ height: 'fit-content', width: '100%', paddingBottom: '3rem' }}>
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
