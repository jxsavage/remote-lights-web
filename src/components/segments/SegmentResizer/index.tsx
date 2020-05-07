import React from 'react';
import {
  Rail, Handles, Tracks, Slider,
} from 'react-compound-slider';
import { useDispatch } from 'react-redux';
import { RootStateDispatch } from 'components/RootStateProvider';
import {
  resizeSegmentsFromBoundaries, convertToEmittableAction,
  MicroState,
} from 'Shared/store';
import { Handle, Track, TooltipRail } from './children';

interface SegmentResizerProps {
  micro: MicroState;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
const SegmentResizer:
React.FunctionComponent<SegmentResizerProps> = ({ micro }) => {
  const dispatch = useDispatch<RootStateDispatch>();
  const { microId, totalLEDs, segmentBoundaries } = micro;
  const resizeOnClick = (boundaries: readonly number[]): void => {
    const bounds = boundaries.slice();
    dispatch(convertToEmittableAction(resizeSegmentsFromBoundaries({
      microId, segmentBoundaries: bounds,
    })));
  };
  return (
    <div style={{
      height: 'fit-content', width: '100%', paddingBottom: '3rem', paddingTop: '1rem',
    }}
    >
      <Slider
        mode={1}
        step={1}
        domain={[0, totalLEDs]}
        rootStyle={sliderStyle}
        onUpdate={resizeOnClick}
      // onChange={this.onChange}
        values={segmentBoundaries}
      >
        {/* eslint-disable-next-line max-len */}
        <Rail>{({ activeHandleID, getEventData, getRailProps }): JSX.Element => <TooltipRail {...{ activeHandleID, getEventData, getRailProps }} />}</Rail>
        <Handles>
          {({ handles, activeHandleID, getHandleProps }): JSX.Element => (
            <div className="slider-handles">
              {handles.map((handle) => (
                <Handle
                  key={handle.id}
                  handle={handle}
                  domain={[0, totalLEDs]}
                  disabled={handle.value === totalLEDs}
                  isActive={handle.id === activeHandleID}
                  getHandleProps={getHandleProps}
                />
              ))}
            </div>
          )}
        </Handles>
        <Tracks left right>
          {({ tracks, getTrackProps }): JSX.Element => (
            <div className="slider-tracks">
              {/* eslint-disable-next-line no-shadow */}
              {tracks.map(({ id, source, target }) => (
                <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
              ))}
            </div>
          )}
        </Tracks>
      </Slider>
    </div>
  );
};

function handleDomain(boundaries: number[], totalLEDs: number): number[] {
  if (boundaries.length === 1) {
    return [totalLEDs, totalLEDs];
  }
  return [0, totalLEDs];
}

export default SegmentResizer;
