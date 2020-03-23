import React from 'react';
import { Slider, Rail, Handles, Tracks } from 'react-compound-slider';
import { Handle, Track, TooltipRail } from './BrightnessComponents';
import { Card } from 'react-bootstrap';
export interface BrightnessSliderProps {
  brightness: number;
  onUpdate: (brightness:readonly number[]) => void;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
const brightnessDomain = [0, 255];
function BrightnessSlider(
  {onUpdate, brightness}: BrightnessSliderProps
) {
  return (
    <Card>
      <Card.Header className="h3">{`Brightness: ${calcPercent(brightness)}%`}</Card.Header>
      <Card.Body style={{ height: 'fit-content', width: '100%', paddingBottom: '3rem' }}>
      <Slider
        mode={1}
        step={1}
        domain={brightnessDomain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        // onChange={this.onChange}
        values={[brightness]}
      >
        <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
        <Handles>
          {({ handles, activeHandleID, getHandleProps }) => (
            <div className="slider-handles">
              {handles.map(handle => (
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
        <Tracks left={true} right={false}>
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
)}
function calcPercent(brightness: number) {
  let percent = brightness / 255 * 1000;
  percent = Math.round(percent) / 10;
  return percent;
}
export default BrightnessSlider;