import io from 'socket.io-client';
import { WebEmitEvent, SharedEmitEvent } from 'Shared/socket';
import { AnyAction, Dispatch } from 'redux';
import { AllActions } from 'Shared/store';

const socket = io.connect('http://192.168.0.104:3001/server');

const { ROOT_ACTION, RE_INIT_APP_STATE } = SharedEmitEvent;
export const emitAnyAction = (action: AnyAction): void => {
  socket.emit(ROOT_ACTION, action);
};
export function addRootActionListener(dispatch: Dispatch<AllActions>): void {
  socket.on(ROOT_ACTION, dispatch);
}
export function reInitAppState(): void {
  socket.emit(RE_INIT_APP_STATE);
}
const { INIT_WEB_CLIENT } = WebEmitEvent;
export function initWebClient(): void {
  socket.emit(INIT_WEB_CLIENT);
}

export default socket;
