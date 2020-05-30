import {Levels} from "../../levels"

import BrowserConsole, {BrowserConsoleFunction} from "./index"

const functions: {[K in Levels]: BrowserConsoleFunction} = {
  error(this: BrowserConsole, info) {
    console.error(info)
  },

  warn(this: BrowserConsole, info) {
    console.warn(info)
  },

  info(this: BrowserConsole, info) {
    console.info(info)
  },

  debug(this: BrowserConsole, info) {
    console.log(info)
  },

  assert(this: BrowserConsole) {
    // TODO: implement assert function
  },

  // TODO: figure out if clear is conflicting with winston.Logger#clear
  clear: () => console.clear(),

  count(this: BrowserConsole) {
    // TODO: implement count function
  },

  countReset(this: BrowserConsole) {
    // TODO: implement countReset function
  },

  group: ({message}) => console.group(message),

  groupCollapsed: ({message}) => console.groupCollapsed(message),

  groupEnd: () => console.groupEnd(),

  // TODO: figure out if profile and profileEnd can be integrated with winston.Logger#profile
  profile: ({message}) => console.profile(message),

  profileEnd: ({message}) => console.profileEnd(message),

  table(this: BrowserConsole) {
    // TODO: implement table function
  },

  // TODO: figure out if time, timeEnd and timeLog can be integrated with winston.Logger#startTimer
  time: ({message}) => console.time(message),

  timeEnd: ({message}) => console.timeEnd(message),

  timeLog: ({message}) => console.timeLog(message),

  timeStamp: ({message}) => console.timeStamp(message),

  trace(this: BrowserConsole, info) {
    console.trace(info)
  },
}

export default functions
