import { LEDSegment, SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import {
  addSegmentToGroup,
} from 'Shared/store';
import { RootStateDispatch, andEmitAction, useShallowRootSelector } from 'components/RootStateProvider';
import Button from 'react-bootstrap/Button';
import React from 'react';

/**
 * Add Segment to Group
 */
interface AddSegmentToGroupButtonProps {
  segmentId: LEDSegment['segmentId'];
  groupId: SegmentGroup['segmentGroupId'];
}
const AddSegmentToGroupButton:
React.FunctionComponent<AddSegmentToGroupButtonProps> = (
  { segmentId, groupId },
) => {
  const dispatch = useDispatch<RootStateDispatch>();
  const microId = useShallowRootSelector((state) => (
    state.remoteLightsEntity.segments.byId[segmentId].microId));
  function addSegment(): void {
    dispatch(
      andEmitAction(
        addSegmentToGroup({ segmentId, groupId }), microId.toString(),
      ),
    );
  }
  return (
    <Button
      variant="primary"
      onClick={addSegment}
    >
      {`Add Segment ${segmentId}`}
    </Button>
  );
};

export default AddSegmentToGroupButton;
