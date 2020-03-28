
import React from 'react';
import { Slider, Rail, Handles, Tracks, SliderItem } from 'react-compound-slider';
import { Handle, Track, TooltipRail } from './ResizerComponents';
export interface SegmentResizerProps {
  domain: number[];
  segmentBoundaries: number[];
  onUpdate: (segmentBoundaries:readonly number[]) => void;
  handleIsActive: (handle: SliderItem) => boolean;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
function SegmentResizer(
  {domain, segmentBoundaries,
    onUpdate, handleIsActive}: SegmentResizerProps
) {
  return (
  <div style={{ height: 'fit-content', width: '100%', paddingBottom: '3rem', paddingTop: '1rem' }}>
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
      <Tracks left={true} right={true}>
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
)}
export default SegmentResizer;