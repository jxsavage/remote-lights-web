import io from 'socket.io-client';
import { AnyAction, Dispatch } from 'redux';
import { WebEmitEvent, SharedEmitEvent } from 'Shared/socket';
import { MicroActionType, MicroId } from 'Shared/types';
import { AllActions } from 'Shared/store';
import { MicroCommand } from 'Shared/types/micro';

interface ClientEnv {
  REACT_APP_SOCKET_IP: string;
  REACT_APP_SOCKET_PORT: string;
}
const {
  REACT_APP_SOCKET_IP,
  REACT_APP_SOCKET_PORT,
} = process.env as unknown as ClientEnv;

export const socket = io.connect(`http://${REACT_APP_SOCKET_IP}:${REACT_APP_SOCKET_PORT}/server`);

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
export function writeEEPROM(microId: MicroId): void {
  socket.emit(MicroActionType.WRITE_EEPROM, microId);
}
export function loadEEPROM(microId: MicroId): void {
  socket.emit(MicroCommand.LOAD_EEPROM, microId);
}
export function resetMicro(microId: MicroId): void {
  socket.emit(MicroCommand.RESET, microId);
}
export function restoreDefault(microId: MicroId): void {
  socket.emit(MicroCommand.RESTORE_DEFAULT, microId);
}

export default socket;
