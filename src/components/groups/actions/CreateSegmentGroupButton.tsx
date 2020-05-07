import React from 'react';
import Button from 'react-bootstrap/Button';
import { convertToEmittableAction, RootStateDispatch, createGroup } from 'Shared/store';
import { useDispatch } from 'react-redux';

/**
 * Create Segment Group
 */
const CreateSegmentGroupButton:
React.FunctionComponent = () => {
  const dispatch = useDispatch<RootStateDispatch>();
  function createOnClick(): void {
    dispatch(
      convertToEmittableAction(
        createGroup(),
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
