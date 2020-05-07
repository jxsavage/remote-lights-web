import { LEDSegment, SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import {
  RootStateDispatch, convertToEmittableAction, addSegmentToGroup,
} from 'Shared/store';
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
  function addSegment(): void {
    dispatch(
      convertToEmittableAction(
        addSegmentToGroup({ segmentId, groupId }),
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
