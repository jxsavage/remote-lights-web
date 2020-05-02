import { Direction } from 'Shared/store';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


interface SegmentIconProps {
  direction: Direction;
  icons: IconDefinition[];
}
function ActionIcons({ direction, icons }: SegmentIconProps): JSX.Element {
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
export default ActionIcons;
