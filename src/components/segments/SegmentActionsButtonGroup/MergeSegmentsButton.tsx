import React from 'react';
import { faChevronLeft, faPlusCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { LEDSegment, Direction } from 'Shared/store/types';
import { RootStateDispatch, convertToEmittableAction, mergeSegments } from 'Shared/store';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import ActionIcons from './SegmentActionIcons';

const mergeButtonStyles: React.CSSProperties = {
  maxWidth: '60px',
};
/**
 * Merge Button
 */
const mergeIcons = [faChevronLeft, faPlusCircle, faChevronRight];
interface MergeButtonProps {
  direction: Direction; segment: LEDSegment;
}
const MergeButton: React.FunctionComponent<MergeButtonProps> = (
  { direction, segment: { microId, segmentId } },
) => {
  const dispatch: RootStateDispatch = useDispatch();
  const mergeOnClick = (): void => {
    dispatch(convertToEmittableAction(mergeSegments({
      direction, microId, segmentId,
    })));
  };
  return (
    <Button
      onClick={mergeOnClick}
      style={mergeButtonStyles}
    >
      <ActionIcons {...{ direction, icons: mergeIcons }} />
    </Button>
  );
};

export default MergeButton;
