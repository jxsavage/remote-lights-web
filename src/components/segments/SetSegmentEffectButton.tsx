import React, { createFactory } from 'react';
import {
  MicroEffect, RootStateDispatch, convertToEmittableAction, setSegmentEffect,
} from 'Shared/store';
import { LEDSegment } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useShallowRootSelector } from 'components/RootStateProvider';

interface SetSegmentEffectButtonProps {
  id: LEDSegment['segmentId'];
  newEffect: MicroEffect;
}
const SetSegmentEffectButton:
React.FunctionComponent<SetSegmentEffectButtonProps> = (
  { id, newEffect },
) => {
  const segmentId = id;
  const dispatch = useDispatch<RootStateDispatch>();
  const [segment, segmentIndex] = useShallowRootSelector((
    { remoteLightsEntity: { micros, segments } },
  ) => {
    const seg = segments.byId[segmentId];
    const segIndex = micros.byId[seg.microId].segmentIds.indexOf(seg.segmentId);
    return [
      seg,
      segIndex,
    ];
  });
  const currentEffect = segment.effect;
  const { microId } = segment;
  const setEffect = (): void => {
    dispatch(convertToEmittableAction(setSegmentEffect({
      microId, newEffect, segmentId, segmentIndex,
    })));
  };
  return (
    <Button
      disabled={newEffect === currentEffect}
      onClick={setEffect}
      variant="info"
    >
      {`Activate ${MicroEffect[newEffect]}`}
    </Button>
  );
};
const setSegmentEffectButtonFactory = createFactory<
SetSegmentEffectButtonProps>(SetSegmentEffectButton);

export { setSegmentEffectButtonFactory, SetSegmentEffectButton };
