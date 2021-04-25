import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import { MicroActionType } from 'Shared/types';
import { AllActions } from 'Shared/store';
import {
  splitSegmentRedis, mergeSegmentsRedis,
  setMicroBrightnessRedis, setSegmentEffectRedis,
  resizeSegmentsFromBoundariesRedis,
} from 'Shared/redis';
import { socket } from 'socket';
import { RootState } from 'store';

// eslint-disable-next-line import/prefer-default-export
export function addRedisActionMiddleware(): Middleware<{}, RootState> {
  const addRedisAction: Middleware<{}, RootState> = (
    api: MiddlewareAPI<Dispatch<AnyAction>, RootState>,
  ) => (
    next: Dispatch<AllActions>,
  ) => (
    action: AllActions,
  ) => {
    const prevState = api.getState().remoteLightsEntity;
    next(action);
    const nextState = api.getState().remoteLightsEntity;
    const {
      MERGE_SEGMENTS, SPLIT_SEGMENT, SET_SEGMENT_EFFECT,
      RESIZE_SEGMENTS_FROM_BOUNDARIES, SET_MICRO_BRIGHTNESS,
    } = MicroActionType;
    switch (action.type) {
      case SPLIT_SEGMENT:
        socket.emit(
          action.type,
          splitSegmentRedis(nextState, action),
        );
        break;
      case MERGE_SEGMENTS:
        socket.emit(
          action.type,
          mergeSegmentsRedis(prevState, nextState, action),
        );
        break;
      case SET_SEGMENT_EFFECT:
        socket.emit(
          action.type,
          setSegmentEffectRedis(action),
        );
        break;
      case SET_MICRO_BRIGHTNESS:
        socket.emit(
          action.type,
          setMicroBrightnessRedis(action),
        );
        break;
      case RESIZE_SEGMENTS_FROM_BOUNDARIES:
        socket.emit(
          action.type,
          resizeSegmentsFromBoundariesRedis(action, nextState),
        );
        break;
      default:
        break;
    }
  };
  return addRedisAction;
}
