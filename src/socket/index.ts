import io from 'socket.io-client';
import { WebEmitEvent, SharedEmitEvent } from 'Shared/socket';
import { AnyAction } from 'redux';

const socket = io.connect('http://192.168.0.104:3001/server');

const { ROOT_ACTION } = SharedEmitEvent;
export const emitAnyAction = (action: AnyAction): void => {
  socket.emit(ROOT_ACTION, action);
};

const { INIT_WEB_CLIENT } = WebEmitEvent;
export function initWebClient(): void {
  socket.emit(INIT_WEB_CLIENT);
}
export default socket;
