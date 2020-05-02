import { MicroState, LEDSegment } from 'Shared/store/types';
import { useShallowRootSelector } from 'components/RootStateProvider';
import React from 'react';
import { Direction } from 'Shared/store';
import { ButtonGroup } from 'react-bootstrap';
import segmentTabWidth from 'components/utils';
import MergeButton from './Merge';
import SplitSegmentButtons from './Split';


interface SegmentActionsButtonGroup {
  segmentIds: MicroState['segmentIds'];
  totalLEDs: MicroState['totalLEDs'];
}

const SegmentActionsButtonGroup: React.FunctionComponent<SegmentActionsButtonGroup> = ({
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
        const { microId } = segment;
        buttons.push((
          <SplitSegmentButtons
            key={`splitLeft${segment.segmentId}`}
            {...{ microId, segmentIndex }}
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
