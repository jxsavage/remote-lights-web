/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import { SocketDestination, SocketSource } from 'Shared/socket';
import { AllActions, EmittableAction, EmittableActionSocketMeta } from 'Shared/store';
import log from 'Shared/logger';

type Emittable = AllActions & EmittableAction;

export function isEmittableAction(action: AnyAction): action is Emittable {
  return action.meta?.socket !== undefined;
}
interface EmittableActionSettings {
  REACT_APP_EMITTALBE_ACTION_SHOULD_EMIT: string;
}
const {
  REACT_APP_EMITTALBE_ACTION_SHOULD_EMIT,
} = process.env as unknown as EmittableActionSettings;

const emitterOn = REACT_APP_EMITTALBE_ACTION_SHOULD_EMIT === '1';
type EmitAction = (action: AnyAction & EmittableAction) => void;
export function emitActionMiddleware<S>(emit: EmitAction, source: SocketSource):
[<A extends AnyAction>(action: A, destination: string, hasEmitted?: boolean) =>
A & EmittableAction, Middleware<{}, S>] {
  const convertToEmittableAction = function convert<A extends AnyAction>(
    action: A, destination: string | SocketDestination, hasEmitted = false,
  ): A & EmittableAction {
    const meta = action?.meta ? action.meta : {};
    const socket: EmittableActionSocketMeta = {
      shouldEmit: true,
      hasEmitted,
      destination,
      source,
    };
    return {
      ...action,
      meta: {
        ...meta,
        socket,
      },
    };
  };
  const emitAction: Middleware<EmittableAction, S> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: MiddlewareAPI<Dispatch<AnyAction>, S>,
  ) => (
    next: Dispatch<AnyAction>,
  ) => (
    action: AllActions | AllActions & Emittable,
  ) => {
    next(action);
    if (isEmittableAction(action)) {
      const { hasEmitted, shouldEmit } = action.meta.socket;
      if (shouldEmit && !hasEmitted) {
        // eslint-disable-next-line no-param-reassign
        action.meta.socket.hasEmitted = true;
        if (emitterOn) {
          emit(action);
        } else {
          log('bgYellow', 'Warning: Emitter Off via REACT_APP_EMITTALBE_ACTION_SHOULD_EMIT');
        }
      }
    }
  };
  return [convertToEmittableAction, emitAction];
}
