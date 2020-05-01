import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  Provider, TypedUseSelectorHook, useSelector, shallowEqual,
} from 'react-redux';
import {
  rootReducer, RootState, emitActionMiddleware, logActionMiddleware,
} from 'Shared/store';
import { emitAnyAction, addRootActionListener } from 'socket';

const middleware = applyMiddleware(
  logActionMiddleware(),
  emitActionMiddleware<RootState>(emitAnyAction),
);
const store = createStore(
  rootReducer,
  middleware,
);
export type RootStateDispatch = typeof store.dispatch;
export const useRootStateSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useShallowRootSelector: TypedUseSelectorHook<RootState> = (
  selector,
) => useRootStateSelector(selector, shallowEqual);
addRootActionListener(store.dispatch);
const RootStateProvider: React.FunctionComponent = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
export default RootStateProvider;
