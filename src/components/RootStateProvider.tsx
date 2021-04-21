import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  Provider, TypedUseSelectorHook, useSelector, shallowEqual,
} from 'react-redux';
import {
  rootReducer, RootState,
} from 'store';
import {
  emitActionMiddleware, logActionMiddleware,
} from 'store/middleware';
import { emitAnyAction, addRootActionListener } from 'socket';
import { SocketSource } from 'Shared/socket';

const [
  andEmitAction, emitterMiddleware,
] = emitActionMiddleware<RootState>(emitAnyAction, SocketSource.WEB_CLIENT);

const middleware = applyMiddleware(
  logActionMiddleware(),
  emitterMiddleware,
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
export { andEmitAction };
export default RootStateProvider;
