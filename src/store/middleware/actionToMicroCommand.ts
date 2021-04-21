/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import {
  MicroState, MicroActionsInterface, MicroActionType, MicroActions,
} from 'Shared/store';

const {
  SPLIT_SEGMENT, MERGE_SEGMENTS, SET_SEGMENT_EFFECT,
  RESET_MICRO_STATE, SET_MICRO_BRIGHTNESS,
  RESIZE_SEGMENTS_FROM_BOUNDARIES,
} = MicroActionType;
type MicroActionsMap = Map<MicroState['microId'], MicroActionsInterface>;
// eslint-disable-next-line import/prefer-default-export
export function actionToMicroCommandMiddleware<
  S>(map: MicroActionsMap): Middleware<{}, S
> {
  const actionToMicroCommand: Middleware<MicroActions, S> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: MiddlewareAPI<Dispatch<AnyAction>, S>,
  ) => (
    next: Dispatch<AnyAction>,
  ) => (
    action: MicroActions,
  ) => {
    const microId = action?.payload.microId;
    switch (action.type) {
      case SPLIT_SEGMENT:
        map.get(microId)?.splitSegment(action.payload);
        break;
      case MERGE_SEGMENTS:
        map.get(microId)?.mergeSegments(action.payload);
        break;
      case SET_SEGMENT_EFFECT:
        map.get(microId)?.setSegmentEffect(action.payload);
        break;
      case SET_MICRO_BRIGHTNESS:
        map.get(microId)?.setMicroBrightness(action.payload);
        break;
      case RESIZE_SEGMENTS_FROM_BOUNDARIES:
        map.get(microId)?.resizeSegmentsFromBoundaries(action.payload);
        break;
      default:
        console.log(`default case hit in with ${JSON.stringify(action)} in actionToMicroCommand middleware...`);
    }
    next(action);
  };
  return actionToMicroCommand;
}
