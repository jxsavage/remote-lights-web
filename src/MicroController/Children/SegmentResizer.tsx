
import React from 'react';
import { Slider, Rail, Handles, Tracks, SliderItem } from 'react-compound-slider';
import { Handle, Track, TooltipRail } from './ResizerComponents';
import { Card } from 'react-bootstrap';
export interface SegmentResizerProps {
  domain: number[];
  segmentBoundaries: number[];
  totalLEDs: number;
  onUpdate: (segmentBoundaries:readonly number[]) => void;
  handleIsActive: (handle: SliderItem) => boolean;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
function SegmentResizer(
  {domain, segmentBoundaries, onUpdate,
  totalLEDs, handleIsActive}: SegmentResizerProps
) {
  return (
    <Card>
      <Card.Header className="h3">Resize Segments</Card.Header>
      <Card.Body style={{ height: 'fit-content', width: '100%', paddingBottom: '3rem' }}>
      <Slider
        mode={1}
        step={1}
        domain={domain}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
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
    </Card.Body>
  </Card>
)}
export default SegmentResizer;