/* eslint-disable @typescript-eslint/naming-convention */
import { combineReducers } from 'redux';
import { AllActions, remoteLightsEntityReducer } from 'Shared/store';

// eslint-disable-next-line no-underscore-dangle
const _rootReducerType = combineReducers({
  remoteLightsEntity: remoteLightsEntityReducer,
});
export type RootState = ReturnType<typeof _rootReducerType>;
export const rootReducer = combineReducers<RootState, AllActions>({
  remoteLightsEntity: remoteLightsEntityReducer,
});
