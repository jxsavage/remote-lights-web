import React, { createFactory } from 'react';
import {
  MicroEffect, setSegmentEffect,
} from 'Shared/store';
import { LEDSegment } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useShallowRootSelector, andEmitAction, RootStateDispatch } from 'components/RootStateProvider';

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
  const segment = useShallowRootSelector((
    state,
  ) => state.remoteLightsEntity.segments.byId[segmentId]);
  const currentEffect = segment.effect;
  const { microId } = segment;
  const setEffect = (): void => {
    dispatch(andEmitAction(setSegmentEffect({
      microId, newEffect, segmentId,
    }), microId.toString()));
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
