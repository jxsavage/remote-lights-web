/* eslint-disable react/no-array-index-key */
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { WebMicroSegment } from 'Shared/MicroTypes';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlusCircle, faChevronLeft, faChevronRight,
  faExpandAlt,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { WebEffect } from 'Shared/MicroCommands';
import {
  splitSegment, mergeSegments, StateActions, MergeSegmentsStatePayload, SplitSegmentStatePayload,
} from 'Shared/reducers/remoteLights';
import { emitAndDispatchMicroStateAction, useRemoteLightsDispatch } from 'components/AppState';
import { segmentTabWidth } from './LEDSegments';


enum Direction {
  Left,
  Right
}
const mergeAddIcons = [faChevronLeft, faPlusCircle, faChevronRight];
const splitIcons = [faChevronLeft, faExpandAlt, faChevronRight];

function iconProps(direction: Direction, icons: IconDefinition[]) {
  return {
    icons,
    direction,
  };
}
interface SegmentSplitterProps {
  microId: string;
  totalLEDs: number;
  segments: WebMicroSegment[];
}
const mergeButtonStyles: React.CSSProperties = {
  maxWidth: '60px',
};
const SegmentSplitter: React.FunctionComponent<SegmentSplitterProps> = ({
  segments, totalLEDs, microId,
}) => {
  const dispatch = useRemoteLightsDispatch();
  function mergeOnClick(
    payload: MergeSegmentsStatePayload,
  ) {
    return function merge(): void {
      emitAndDispatchMicroStateAction(dispatch, mergeSegments, payload);
    };
  }
  return (
    <div className="w-100">
      {/* eslint-disable-next-line no-shadow */}
      {segments.map(({ offset, numLEDs }, segmentIndex, segments) => {
        const buttons: JSX.Element[] = [];
        const mergeAddLeftProps = iconProps(Direction.Left, mergeAddIcons);
        const mergeLeftFn = mergeOnClick(
          { microId, payload: { direction: Direction.Left, segmentIndex } },
        );
        const mergeLeftButton = (
          <Button
            key={`mergeLeft${segmentIndex}`}
            onClick={mergeLeftFn}
            style={mergeButtonStyles}
            id={`mergeLeft${segmentIndex}`}
          >
            <SegmentIcons {...mergeAddLeftProps} />
          </Button>
        );
        const splitLeftProps = iconProps(Direction.Left, splitIcons);
        const splitRightProps = iconProps(Direction.Right, splitIcons);
        const splitLeftOptionProps = {
          microId,
          segmentIndex,
          direction: Direction.Left,
          dispatch,
        };
        const splitRightOptionProps = {
          microId,
          segmentIndex,
          direction: Direction.Right,
          dispatch,
        };
        const splitButtons = (
          <React.Fragment key={`splitRightOrLeft${segmentIndex}`}>
            <DropdownButton
              as={ButtonGroup}
              title={<SegmentIcons {...splitLeftProps} />}
              id="add-start"
            >
              <SplitOptions {...splitLeftOptionProps} />
            </DropdownButton>
            <DropdownButton
              as={ButtonGroup}
              title={<SegmentIcons {...splitRightProps} />}
              id="add-end"
            >
              <SplitOptions {...splitRightOptionProps} />
            </DropdownButton>
          </React.Fragment>
        );
        const mergeAddRightProps = iconProps(Direction.Right, mergeAddIcons);
        const mergeRightFn = mergeOnClick(
          { microId, payload: { direction: Direction.Right, segmentIndex } },
        );
        const mergeRightButton = (
          <Button
            key={`mergeRight${segmentIndex}`}
            onClick={mergeRightFn}
            style={mergeButtonStyles}
            id={`mergeRight${segmentIndex}`}
          >
            <SegmentIcons {...mergeAddRightProps} />
          </Button>
        );
        if (segmentIndex !== 0) {
          buttons.push(mergeLeftButton);
        }
        buttons.push(splitButtons);
        if (segmentIndex !== (segments.length - 1)) {
          buttons.push(mergeRightButton);
        }

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

interface SplitOptionsProps {
  microId: string;
  segmentIndex: number;
  direction: Direction;
  dispatch: React.Dispatch<StateActions>;
}
const POSSIBLE_EFFECTS = Object.values(WebEffect) as WebEffect[];
function SplitOptions({
  microId, segmentIndex, direction, dispatch,
}: SplitOptionsProps) {
  function splitOnClick(
    payload: SplitSegmentStatePayload,
  ) {
    return function () {
      emitAndDispatchMicroStateAction(dispatch, splitSegment, payload);
    };
  }
  return (
    <>
      {POSSIBLE_EFFECTS.map((newEffect, index) => {
        const splitFn = splitOnClick({
          microId, payload: { segmentIndex, direction, newEffect },
        });

        return (
          <Dropdown.Item
            key={index}
            onClick={splitFn}
          >
            {newEffect}
          </Dropdown.Item>
        );
      })}
    </>
  );
}


interface SegmentIconProps {
  direction: Direction;
  icons: IconDefinition[];
}
function SegmentIcons({ direction, icons }: SegmentIconProps) {
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
