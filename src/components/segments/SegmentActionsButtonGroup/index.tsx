import { MicroState, LEDSegment, Direction } from 'Shared/store/types';
import React from 'react';
import { ButtonGroup } from 'react-bootstrap';
import segmentTabWidth from 'components/utils';
import { useShallowRootSelector } from 'components/RootStateProvider';
import MergeButton from './MergeSegmentsButton';
import SplitSegmentButtons from './SplitSegmentButtons';

interface SegmentActionsButtonGroup {
  segmentIds: MicroState['segmentIds'];
  totalLEDs: MicroState['totalLEDs'];
}

const SegmentActionsButtonGroup:
React.FunctionComponent<SegmentActionsButtonGroup> = ({
  segmentIds, totalLEDs,
}) => {
  const LEDSegments: LEDSegment[] = useShallowRootSelector(
    (state) => segmentIds.map(
      (segId) => state.remoteLightsEntity.segments.byId[segId],
    ),
  );
  return (
    <div className="w-100">
      {LEDSegments.map((segment, segmentIndex) => {
        const buttons: JSX.Element[] = [];
        if (segmentIndex !== 0) {
          buttons.push((
            <MergeButton
              key={`mergeLeft${segment.segmentId}`}
              {...{ direction: Direction.Left, segmentIndex, segment }}
            />
          ));
        }
        const { microId, segmentId } = segment;
        buttons.push((
          <SplitSegmentButtons
            key={`splitLeft${segment.segmentId}`}
            {...{ microId, segmentIndex, segmentId }}
          />
        ));
        if (segmentIndex !== (LEDSegments.length - 1)) {
          buttons.push((
            <MergeButton
              key={`mergeRight${segment.segmentId}`}
              {...{ direction: Direction.Right, segmentIndex, segment }}
            />
          ));
        }
        const { numLEDs, offset } = segment;
        return (
          <ButtonGroup
            key={`actionButtons${segment.segmentId}`}
            className="justify-content-center"
            style={segmentTabWidth(totalLEDs, numLEDs, segmentIndex, offset)}
          >
            {buttons}
          </ButtonGroup>
        );
      })}
    </div>
  );
};

export default SegmentActionsButtonGroup;
