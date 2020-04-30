/* eslint-disable react/no-array-index-key */
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle, faChevronLeft, faChevronRight,
  faExpandAlt, IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { RootStateDispatch, useShallowRootSelector } from 'components/RootStateProvider';
import {
  splitSegment, mergeSegments, convertToEmittableAction,
  MicroState, LEDSegment, MicroEffect, Direction, POSSIBLE_EFFECTS_STRINGS,
} from 'Shared/store';
import { segmentTabWidth } from './LEDSegments';


interface SegmentSplitterProps {
  segments: MicroState['segments'];
  totalLEDs: MicroState['totalLEDs'];
}
const mergeButtonStyles: React.CSSProperties = {
  maxWidth: '60px',
};
const SegmentSplitter: React.FunctionComponent<SegmentSplitterProps> = ({
  segments, totalLEDs,
}) => {
  const LEDSegments: LEDSegment[] = useShallowRootSelector(
    (state) => segments.map(
      (segId) => state.remoteLightsEntity.segments.byId[segId],
    ),
  );
  return (
    <div className="w-100">
      {LEDSegments.map((segment, segmentIndex) => {
        const buttons: JSX.Element[] = [];
        if (segmentIndex !== 0) {
          buttons.push((
            <MergeButton
              key={`mergeLeft${segment.segmentId}`}
              {...{ direction: Direction.Left, segmentIndex, segment }}
            />
          ));
        }
        const { microId } = segment;
        buttons.push((
          <SplitSegmentButtons
            key={`splitLeft${segment.segmentId}`}
            {...{ microId, segmentIndex }}
          />
        ));
        if (segmentIndex !== (LEDSegments.length - 1)) {
          buttons.push((
            <MergeButton
              key={`mergeRight${segment.segmentId}`}
              {...{ direction: Direction.Right, segmentIndex, segment }}
            />
          ));
        }
        const { numLEDs, offset } = segment;
        return (
          <ButtonGroup
            key={`SplitMergeButtons${segmentIndex}`}
            className="justify-content-center"
            style={segmentTabWidth(totalLEDs, numLEDs, segmentIndex, offset)}
          >
            {buttons}
          </ButtonGroup>
        );
      })}
    </div>
  );
};
/**
 * Merge Button
 */
const mergeIcons = [faChevronLeft, faPlusCircle, faChevronRight];
interface MergeButtonProps {
  direction: Direction; segmentIndex: number; segment: LEDSegment;
}
const MergeButton: React.FunctionComponent<MergeButtonProps> = (
  { direction, segmentIndex, segment: { microId, segmentId } },
) => {
  const dispatch: RootStateDispatch = useDispatch();
  const mergeOnClick = (): void => {
    dispatch(convertToEmittableAction(mergeSegments({
      direction, microId, segmentId, segmentIndex,
    })));
  };
  return (
    <Button
      onClick={mergeOnClick}
      style={mergeButtonStyles}
    >
      <SegmentIcons {...{ direction, icons: mergeIcons }} />
    </Button>
  );
};
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
      title={<SegmentIcons {...{ direction: Direction.Left, icons: splitIcons }} />}
      id="add-start"
    >
      <SplitOptions {...{ direction: Direction.Left, segmentIndex, microId }} />
    </DropdownButton>
    <DropdownButton
      as={ButtonGroup}
      title={<SegmentIcons {...{ direction: Direction.Right, icons: splitIcons }} />}
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

interface SegmentIconProps {
  direction: Direction;
  icons: IconDefinition[];
}
function SegmentIcons({ direction, icons }: SegmentIconProps): JSX.Element {
  const [leftIcon, actionIcon, rightIcon] = icons;
  return (
    <>
      {direction === Direction.Left
        ? (
          <>
            <FontAwesomeIcon icon={leftIcon} />
            <FontAwesomeIcon icon={actionIcon} />
          </>
        )
        : (
          <>
            <FontAwesomeIcon icon={actionIcon} />
            <FontAwesomeIcon icon={rightIcon} />
          </>
        )}
    </>
  );
}
export default SegmentSplitter;
