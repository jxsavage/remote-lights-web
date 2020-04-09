import React, {
  useEffect, useReducer, Dispatch, useContext,
} from 'react';
import io from 'socket.io-client';
import remoteLights,
{
  resetState, RemoteLightsState,
  StateActions, StatePayloads,
} from 'Shared/reducers/remoteLights';
import { ActionCreator } from 'Shared/reducers/actions';

const socket = io.connect('http://192.168.0.104:3001/server');

const initialState: RemoteLightsState = {
  allMicroIds: [],
  byMicroId: {},
};
type RemoteLightsStateContextProps = RemoteLightsState;
const RemoteLightsStateContext = React
  .createContext<RemoteLightsStateContextProps | undefined>(undefined);

type RemoteLightDispatchContextProps = React.Dispatch<StateActions>;
const RemoteLightsDispatchContext = React
  .createContext<RemoteLightDispatchContextProps | undefined>(undefined);

const RemoteLightsProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(remoteLights, initialState);
  useEffect(() => {
    socket.emit('initWebClient');
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-shadow
    socket.on('remoteLightsStateAction', (stateAction: StateActions) => {
      console.log(`useEffect stateAction: ${JSON.stringify(state, null, '  ')}`);
      dispatch(stateAction);
    });
    return function removeListeners(): void {
      socket.removeAllListeners();
    };
  });
  return (
    <RemoteLightsStateContext.Provider value={state}>
      <RemoteLightsDispatchContext.Provider value={dispatch}>
        {children}
      </RemoteLightsDispatchContext.Provider>
    </RemoteLightsStateContext.Provider>
  );
};

const emitAndDispatchMicroStateAction = <A extends StateActions, P extends StatePayloads>(
  dispatch: Dispatch<StateActions>,
  actionCreator: ActionCreator<P, A>,
  payload: P,
): void => {
  const action = actionCreator(payload);
  socket.emit('remoteLightsStateAction', action);
  dispatch(action);
};
function useRemoteLightsState(): RemoteLightsStateContextProps {
  const context = useContext(RemoteLightsStateContext);
  if (context === undefined) {
    throw new Error('useRemoteLightsState must be used within RemoteLightsProvider');
  }
  return context;
}
function useRemoteLightsDispatch(): RemoteLightDispatchContextProps {
  const context = useContext(RemoteLightsDispatchContext);
  if (context === undefined) {
    throw new Error('useRemoteLightsState must be used within RemoteLightsProvider');
  }
  return context;
}
export { emitAndDispatchMicroStateAction, useRemoteLightsDispatch, useRemoteLightsState };
export default RemoteLightsProvider;
