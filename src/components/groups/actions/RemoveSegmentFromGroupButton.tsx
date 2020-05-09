import { LEDSegment, SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { removeSegmentFromGroup } from 'Shared/store';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import { SocketDestination } from 'Shared/socket';

const { SERVER } = SocketDestination;

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
      andEmitAction(
        removeSegmentFromGroup({ segmentId, groupId }),
        SERVER,
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
