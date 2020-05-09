import React from 'react';
import { SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { deleteGroup } from 'Shared/store';
import { Button } from 'react-bootstrap';
import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import { SocketDestination } from 'Shared/socket';

const { SERVER } = SocketDestination;
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
      andEmitAction(
        deleteGroup({ groupId }),
        SERVER,
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
