import React from 'react';
import {
  Rail, Handles, Tracks, Slider,
} from 'react-compound-slider';
import { useDispatch } from 'react-redux';
import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import {
  resizeSegmentsFromBoundaries, MicroState,
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
  const {
    microId, totalLEDs, segmentBoundaries,
  } = micro;

  const resizeOnClick = (boundaries: readonly number[]): void => {
    const bounds = boundaries.slice();
    dispatch(andEmitAction(resizeSegmentsFromBoundaries({
      microId, segmentBoundaries: bounds,
    }), microId.toString()));
  };
  return (
    <div style={{
      height: 'fit-content', width: '100%', paddingBottom: '3rem', paddingTop: '1rem',
    }}
    >
      <Slider
        mode={2}
        step={1}
        domain={[1, totalLEDs]}
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
                  domain={[1, totalLEDs]}
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

export default SegmentResizer;

// function handleDomain(
//   segmentIds: MicroState['segmentIds'], boundaries: number[],
//   boundaryIndex: number, totalLEDs: number,
// ): number[] {
//   if (segmentIds.length === 1) {
//     return [totalLEDs, totalLEDs];
//   }
//   if (segmentIds.length === 2) {
//     return [5, totalLEDs - 5];
//   }
//   const start = boundaryIndex === 0;
//   const end = boundaryIndex === boundaries.length;
//   const middle = !start && !end;
//   if (start) {
//     return [5, boundaries[boundaryIndex + 1] - 5];
//   }
//   if (middle) {
//     return [boundaries[boundaryIndex - 1] + 5, boundaries[boundaryIndex + 1] - 5];
//   }
//   if (end) {
//     return [boundaries[boundaryIndex - 1] + 5, totalLEDs - 5];
//   }
//   return [0, totalLEDs];
// }
