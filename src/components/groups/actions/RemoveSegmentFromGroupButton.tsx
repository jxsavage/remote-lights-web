import { LEDSegment, SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { RootStateDispatch, convertToEmittableAction, removeSegmentFromGroup } from 'Shared/store';
import Button from 'react-bootstrap/Button';
import React from 'react';

/**
 * Remove Segment from Group
 */
interface RemoveSegmentFromGroupButtonProps {
  segmentId: LEDSegment['segmentId'];
  groupId: SegmentGroup['segmentGroupId'];
}
const RemoveSegmentFromGroupButton:
React.FunctionComponent<RemoveSegmentFromGroupButtonProps> = (
  { segmentId, groupId },
) => {
  const dispatch = useDispatch<RootStateDispatch>();
  function removeSegment(): void {
    dispatch(
      convertToEmittableAction(
        removeSegmentFromGroup({ segmentId, groupId }),
      ),
    );
  }
  return (
    <Button
      variant="primary"
      onClick={removeSegment}
    >
      {`Remove Segment ${segmentId}`}
    </Button>
  );
};

export default RemoveSegmentFromGroupButton;
