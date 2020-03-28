import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { WebMicroSegment, SplitSegment, MergeSegments } from 'src/Shared/MicroTypes';
import { DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlusCircle, faChevronLeft, faChevronRight,
  faExpandAlt,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { WebEffect, SegmentCommand } from 'src/Shared/MicroCommands';
import {segmentTabWidth} from './LEDSegments';


enum Direction {
  Left,
  Right
}
const mergeAddIcons = [faChevronLeft, faPlusCircle, faChevronRight];
const splitIcons = [faChevronLeft, faExpandAlt, faChevronRight];

function iconProps(direction: Direction, icons: IconDefinition[]) {
  return {
    icons,
    direction
  }
}
export interface SegmentSplitterProps {
  totalLEDs: number;
  segments: WebMicroSegment[];
  splitSegment: SplitSegment;
  mergeSegments: MergeSegments;
}
const mergeButtonStyles: React.CSSProperties = {
  maxWidth: '60px'
}
function SegmentSplitter({
  segments, totalLEDs, mergeSegments, splitSegment
}: SegmentSplitterProps) {
  
  return (
  <div className="w-100">
  {segments.map(({offset, numLEDs}, index, segments) => {
    const buttons: JSX.Element[] = [];
    const mergeAddLeftProps = iconProps(Direction.Left, mergeAddIcons);
    const mergeLeftFn = mergeOnClick(index, Direction.Left, mergeSegments);
    const mergeLeftButton = (
      <Button
        key={`mergeLeft${index}`}
        onClick={mergeLeftFn}
        style={mergeButtonStyles}
        id={`mergeLeft${index}`}>
          <SegmentIcons {...mergeAddLeftProps}/>
      </Button>
    )
    const splitLeftProps = iconProps(Direction.Left, splitIcons);
    const splitRightProps = iconProps(Direction.Right, splitIcons);
    const splitLeftOptionProps = {
      segmentIndex: index,
      direction: Direction.Left,
      splitSegment
    }
    const splitRightOptionProps = {
      segmentIndex: index,
      direction: Direction.Right,
      splitSegment
    }
    const splitButtons = (
      <React.Fragment key={`splitRightOrLeft${index}`}>
        <DropdownButton
          as={ButtonGroup}
          title={<SegmentIcons {...splitLeftProps}/>}
          id="add-start">
          <SplitOptions {...splitLeftOptionProps}/>
        </DropdownButton>
        <DropdownButton
          as={ButtonGroup}
          title={<SegmentIcons {...splitRightProps}/>}
          id="add-end">
          <SplitOptions  {...splitRightOptionProps}/>
        </DropdownButton>
      </React.Fragment>
    )
    const mergeAddRightProps = iconProps(Direction.Right, mergeAddIcons);
    const mergeRightFn = mergeOnClick(index, Direction.Right, mergeSegments);
    const mergeRightButton = (
      <Button
        key={`mergeRight${index}`}
        onClick={mergeRightFn}
        style={mergeButtonStyles}
        id={`mergeRight${index}`}>
          <SegmentIcons {...mergeAddRightProps}/>
      </Button>
      )
    if(index !== 0) {
      buttons.push(mergeLeftButton);
    }
    buttons.push(splitButtons);
    if(index !== (segments.length - 1)) {
      buttons.push(mergeRightButton);
    }
    
    return (
    <ButtonGroup
      key={`SplitMergeButtons${index}`}
      className="justify-content-center"
      style={segmentTabWidth(totalLEDs, numLEDs, index, offset)}>
      {buttons}
    </ButtonGroup>
  )})}
  </div>
)}
function mergeOnClick(
  index: number, direction: Direction, onClick: MergeSegments
) {
  return function() {
    onClick(index, direction);
  }
}
interface SplitOptionsProps {
  segmentIndex: number;
  direction: Direction;
  splitSegment: SplitSegment;
}
const POSSIBLE_EFFECTS = Object.values(WebEffect) as WebEffect[];
function SplitOptions({
  segmentIndex, direction, splitSegment
}: SplitOptionsProps) {

  return (
    <>
      {POSSIBLE_EFFECTS.map((effect, index) => {
        const splitFn = splitOnClick(segmentIndex, direction, effect, splitSegment);

        return (
        <Dropdown.Item
          key={index}
          onClick={splitFn}
        >{effect}</Dropdown.Item>
      )})}
    </>
)}
function splitOnClick(
  index: number, direction: Direction,
  effect: WebEffect, onClick: SplitSegment
) {
  return function() {
    onClick(index, direction, effect);
  }
}

interface SegmentIconProps {
  direction: Direction;
  icons: IconDefinition[];
}
function SegmentIcons({direction, icons}: SegmentIconProps) {
  const [leftIcon, actionIcon, rightIcon] = icons;
  return (
    <>
    {direction === Direction.Left ?
    (<>
    <FontAwesomeIcon icon={leftIcon}/>
    <FontAwesomeIcon icon={actionIcon}/>
    </>) :
    (<>
    <FontAwesomeIcon icon={actionIcon}/>
    <FontAwesomeIcon icon={rightIcon}/>
    </>)}
    </>
  )
}
// export function AddToSegmentEnds() {
//   return (
//     <div className="p-relative d-flex justify-content-between w-100">
//     <DropdownButton
//       title={<SegmentIcons {...mergeAddLeft}/>}
//       id="add-start">
//       <SplitOptions/>
//     </DropdownButton>
//     <DropdownButton
//       title={<SegmentIcons {...mergeAddRight}/>}
//       id="add-end">
//       <SplitOptions/>
//     </DropdownButton>
//   </div>
// )}
export default SegmentSplitter;