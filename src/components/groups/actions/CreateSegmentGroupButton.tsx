import React from 'react';
import Button from 'react-bootstrap/Button';
import { createGroup } from 'Shared/store';
import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import { useDispatch } from 'react-redux';
import { SocketDestination } from 'Shared/socket';

const { SERVER } = SocketDestination;
/**
 * Create Segment Group
 */
const CreateSegmentGroupButton:
React.FunctionComponent = () => {
  const dispatch = useDispatch<RootStateDispatch>();
  function createOnClick(): void {
    dispatch(
      andEmitAction(
        createGroup(),
        SERVER,
      ),
    );
  }
  return (
    <Button
      variant="primary"
      onClick={createOnClick}
    >
      New Group
    </Button>
  );
};

export default CreateSegmentGroupButton;
