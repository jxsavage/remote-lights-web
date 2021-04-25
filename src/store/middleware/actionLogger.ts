/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Middleware, MiddlewareAPI, Dispatch, AnyAction,
} from 'redux';
import chalk from 'chalk';
import { detailedDiff } from 'deep-object-diff';

enum LogLevel {
  Silent,
  Info,
  Verbose,
  VeryVerbose,
}
interface ActionLoggerSettings {
  REACT_APP_ACTION_LOGGER_LEVEL: LogLevel;
  NODE_ENV: 'production' | 'development';
}
interface DetailedDiff {
  added: any;
  deleted: any;
  updated: any;
}
const {
  REACT_APP_ACTION_LOGGER_LEVEL,
} = process.env as unknown as ActionLoggerSettings;
const { log } = console;
const chalkColors = new chalk.Instance({ level: 3 });
const info = chalkColors.black.bgBlue;
const infoHeader = chalkColors.black.bgCyan;
const textGreen = chalkColors.green;
const bgGreen = chalkColors.black.bgGreen;
const textRed = chalkColors.red;
const bgRed = chalkColors.bgRed;
const textYellow = chalkColors.yellow;
const bgYellow = chalkColors.black.bgYellow;
const currentLogLevel = Number(REACT_APP_ACTION_LOGGER_LEVEL);
const {
  Info, Verbose,
} = LogLevel;
export function logActionMiddleware<S = any>(): Middleware<{}, S> {
  const logAction: Middleware<AnyAction, S> = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    api: MiddlewareAPI<Dispatch<AnyAction>, S>,
  ) => (
    next: Dispatch<AnyAction>,
  ) => (
    action: AnyAction,
  ) => {
    if (currentLogLevel >= Info) {
      log(info(` Action ${action.type} Dispatched \n`));
    }
    if (currentLogLevel >= Verbose) {
      log(
        `${infoHeader(' Action Body ')}\n${textGreen(JSON.stringify(action, null, '  '))}`,
      );
    }
    const prevState: any = api.getState();
    next(action);
    const nextState: any = api.getState();
    if (currentLogLevel >= Verbose) {
      log(
        `${infoHeader(' Previous State ')}\n${textGreen(JSON.stringify(prevState, null, '  '))}`,
      );
      log(
        `${infoHeader(' Next State ')}\n${textGreen(JSON.stringify(nextState, null, '  '))}`,
      );
    }
    if (currentLogLevel >= Verbose) {
      log(infoHeader(' State Changes: '));
      const {
        added, deleted, updated,
      } = detailedDiff(prevState, nextState) as DetailedDiff;
      const hasAdded = Object.keys(added).length !== 0;
      const hasUpdated = Object.keys(updated).length !== 0;
      const hasDeleted = Object.keys(updated).length !== 0;

      if (hasAdded) {
        log(
          `${bgGreen(' Items Added: ')}
          ${textGreen(JSON.stringify(added, null, '  '))}
          `,
        );
      } else { log(bgGreen(' No Items Added ')); }
      if (hasUpdated) {
        log(bgYellow(' Items Updated: \n'));
        log(textYellow(`${JSON.stringify(updated, null, '  ')}\n`));
      } else { log(bgYellow(' No Items Updated ')); }
      if (hasDeleted) {
        log(bgRed(' Items Deleted: \n'));
        log(textRed(`${JSON.stringify(deleted, null, '  ')}\n`));
      } else { log(bgRed(' No Items Deleted \n')); }
    }
  };
  return logAction;
}

export default logActionMiddleware;
