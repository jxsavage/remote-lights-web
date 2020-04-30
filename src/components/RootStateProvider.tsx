import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import {
  Provider, TypedUseSelectorHook, useSelector, shallowEqual,
} from 'react-redux';
import { rootReducer, RootState, emitActionMiddleware } from 'Shared/store';
import { emitAnyAction, addRootActionListener } from 'socket';

const store = createStore(
  rootReducer,
  applyMiddleware(emitActionMiddleware<RootState>(emitAnyAction)),
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
