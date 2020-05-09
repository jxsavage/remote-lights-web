import React, { createFactory } from 'react';
import {
  MicroEffect, setGroupEffect,
} from 'Shared/store';
import { SegmentGroup } from 'Shared/store/types';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useShallowRootSelector, andEmitAction, RootStateDispatch } from 'components/RootStateProvider';
import { SocketDestination } from 'Shared/socket';

const { SERVER } = SocketDestination;
interface SetGroupEffectButtonProps {
  id: SegmentGroup['segmentGroupId'];
  newEffect: MicroEffect;
}
const SetGroupEffectButton:
React.FunctionComponent<SetGroupEffectButtonProps> = (
  { id, newEffect },
) => {
  const groupId = id;
  const dispatch = useDispatch<RootStateDispatch>();
  const group = useShallowRootSelector((
    { remoteLightsEntity: { segmentGroups } },
  ) => segmentGroups.byId[groupId]);
  const currentEffect = group.groupEffect;
  const setEffect = (): void => {
    dispatch(andEmitAction(setGroupEffect({
      newEffect, groupId,
    }), SERVER));
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
const setGroupEffectButtonFactory = createFactory<SetGroupEffectButtonProps>(SetGroupEffectButton);

export { SetGroupEffectButton, setGroupEffectButtonFactory };
