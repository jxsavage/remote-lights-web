/* eslint-disable max-len */
import React from 'react';
import {
  Rail, Handles, Tracks, Slider,
} from 'react-compound-slider';
import {
  StateActions, resizeSegmentsFromBoundaries,
  ResizeSegmentsFromBoundariesStatePayload,
} from 'Shared/reducers/remoteLights';
import { MicroState } from 'Shared/MicroTypes';
import { emitAndDispatchMicroStateAction, useRemoteLightsDispatch } from 'components/AppState';
import { Handle, Track, TooltipRail } from './ResizerComponents';

interface SegmentResizerProps {
  micro: MicroState;
}
const sliderStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  margin: '3rem auto',
};
function updateSegments(
  microId: string, dispatch: React.Dispatch<StateActions>,
) {
  return function updateSegment(segmentBoundaries: number[]): void {
    const payload: ResizeSegmentsFromBoundariesStatePayload = {
      microId,
      payload: { segmentBoundaries },
    };
    emitAndDispatchMicroStateAction(dispatch, resizeSegmentsFromBoundaries, payload);
  };
}
const SegmentResizer:
React.FunctionComponent<SegmentResizerProps> = ({ micro }) => {
  const dispatch = useRemoteLightsDispatch();
  const { microId, totalLEDs, segmentBoundaries } = micro;
  const boundaries = segmentBoundaries.slice();

  return (
    <div style={{
      height: 'fit-content', width: '100%', paddingBottom: '3rem', paddingTop: '1rem',
    }}
    >
      <Slider
        microId={microId}
        mode={1}
        step={1}
        domain={[0, totalLEDs]}
        rootStyle={sliderStyle}
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
        onUpdate={updateSegments(microId, dispatch)}
      // onChange={this.onChange}
        values={boundaries}
      >
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
