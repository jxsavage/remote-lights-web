import React from 'react';
import { SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { RootStateDispatch, convertToEmittableAction, deleteGroup } from 'Shared/store';
import { Button } from 'react-bootstrap';

/**
 * Delete Segment Group
 */
interface DeleteSegmentGroupButtonProps {
  groupId: SegmentGroup['segmentGroupId'];
}
const DeleteSegmentGroupButton:
React.FunctionComponent<DeleteSegmentGroupButtonProps> = (
  { groupId },
) => {
  const dispatch = useDispatch<RootStateDispatch>();
  function deleteOnClick(): void {
    dispatch(
      convertToEmittableAction(
        deleteGroup({ groupId }),
      ),
    );
  }
  return (
    <Button
      variant="primary"
      onClick={deleteOnClick}
    >
      Delete Group
    </Button>
  );
};

export default DeleteSegmentGroupButton;
