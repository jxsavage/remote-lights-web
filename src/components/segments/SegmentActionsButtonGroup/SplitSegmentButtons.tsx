/* eslint-disable react/no-array-index-key */
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {
  faChevronLeft, faChevronRight,
  faExpandAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { RootStateDispatch } from 'components/RootStateProvider';
import {
  splitSegment, convertToEmittableAction,
  MicroState, MicroEffect, Direction, POSSIBLE_EFFECTS_STRINGS,
} from 'Shared/store';
import ActionIcons from './SegmentActionIcons';

/**
 * Split Segment Buttons
 */
interface SplitSegmentButtonsProps {
  segmentIndex: number;
  microId: MicroState['microId'];
}
const splitIcons = [faChevronLeft, faExpandAlt, faChevronRight];
const SplitSegmentButtons:
React.FunctionComponent<SplitSegmentButtonsProps> = (
  { microId, segmentIndex },
) => (
  <React.Fragment key={`splitRightOrLeft${segmentIndex}`}>
    <DropdownButton
      as={ButtonGroup}
      title={<ActionIcons {...{ direction: Direction.Left, icons: splitIcons }} />}
      id="add-start"
    >
      <SplitOptions {...{ direction: Direction.Left, segmentIndex, microId }} />
    </DropdownButton>
    <DropdownButton
      as={ButtonGroup}
      title={<ActionIcons {...{ direction: Direction.Right, icons: splitIcons }} />}
      id="add-end"
    >
      <SplitOptions {...{ direction: Direction.Right, segmentIndex, microId }} />
    </DropdownButton>
  </React.Fragment>
);
interface SplitOptionsProps {
  microId: MicroState['microId'];
  segmentIndex: number;
  direction: Direction;
}
const SplitOptions:
React.FunctionComponent<SplitOptionsProps> = ({
  microId, segmentIndex, direction,
}: SplitOptionsProps) => (
  <>
    {POSSIBLE_EFFECTS_STRINGS.map((effectName, newEffect) => (
      <SplitSegmentDropdownItem {...{
        direction, effectName, segmentIndex, newEffect, microId, key: effectName,
      }}
      />
    ))}
  </>
);
interface SplitSegmentDropdownItemProps {
  direction: Direction; segmentIndex: number; newEffect: MicroEffect;
  microId: MicroState['microId']; effectName: string | MicroEffect;
}
const SplitSegmentDropdownItem:
React.FunctionComponent<SplitSegmentDropdownItemProps> = ({
  direction, microId, newEffect, segmentIndex, effectName,
}) => {
  const dispatch: RootStateDispatch = useDispatch();
  const splitOnClick = (): void => {
    dispatch(convertToEmittableAction(splitSegment({
      direction, segmentIndex, newEffect, microId,
    })));
  };
  return (
    <Dropdown.Item
      onClick={splitOnClick}
    >
      {effectName}
    </Dropdown.Item>
  );
};

export default SplitSegmentButtons;
