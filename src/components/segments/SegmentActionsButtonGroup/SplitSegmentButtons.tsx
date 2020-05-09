/* eslint-disable react/no-array-index-key */
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import {
  faChevronLeft, faChevronRight,
  faExpandAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { RootStateDispatch, andEmitAction } from 'components/RootStateProvider';
import {
  splitSegment, MicroState, MicroEffect, Direction,
  POSSIBLE_EFFECTS_STRINGS, LEDSegment,
} from 'Shared/store';
import ActionIcons from './SegmentActionIcons';

/**
 * Split Segment Buttons
 */
interface SplitSegmentButtonsProps {
  segmentId: LEDSegment['segmentId'];
  microId: MicroState['microId'];
}
const splitIcons = [faChevronLeft, faExpandAlt, faChevronRight];
const SplitSegmentButtons:
React.FunctionComponent<SplitSegmentButtonsProps> = (
  { microId, segmentId },
) => (
  <React.Fragment key={`splitRightOrLeft${segmentId}`}>
    <DropdownButton
      as={ButtonGroup}
      title={<ActionIcons {...{ direction: Direction.Left, icons: splitIcons }} />}
      id="add-start"
    >
      <SplitOptions {...{ direction: Direction.Left, segmentId, microId }} />
    </DropdownButton>
    <DropdownButton
      as={ButtonGroup}
      title={<ActionIcons {...{ direction: Direction.Right, icons: splitIcons }} />}
      id="add-end"
    >
      <SplitOptions {...{ direction: Direction.Right, segmentId, microId }} />
    </DropdownButton>
  </React.Fragment>
);
interface SplitOptionsProps {
  microId: MicroState['microId'];
  segmentId: LEDSegment['segmentId'];
  direction: Direction;
}
const SplitOptions:
React.FunctionComponent<SplitOptionsProps> = ({
  microId, segmentId, direction,
}: SplitOptionsProps) => (
  <>
    {POSSIBLE_EFFECTS_STRINGS.map((effectName, newEffect) => (
      <SplitSegmentDropdownItem {...{
        direction, effectName, newEffect, microId, key: effectName, segmentId,
      }}
      />
    ))}
  </>
);
interface SplitSegmentDropdownItemProps {
  direction: Direction; newEffect: MicroEffect;
  microId: MicroState['microId']; effectName: string | MicroEffect;
  segmentId: LEDSegment['segmentId'];
}
const SplitSegmentDropdownItem:
React.FunctionComponent<SplitSegmentDropdownItemProps> = ({
  direction, microId, segmentId, newEffect, effectName,
}) => {
  const dispatch: RootStateDispatch = useDispatch();
  const splitOnClick = (): void => {
    dispatch(andEmitAction(splitSegment({
      direction, newEffect, microId, segmentId,
    }), microId.toString()));
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
