import {SPLAT} from "triple-beam"

import {Level} from "./levels"

import {BrowserConsoleFunction} from "./index"

type TableData = {[K in string | number]: any} | any[]

export interface FunctionMap {
  error(...args: any[]): void;
  warn(...args: any[]): void;
  info(...args: any[]): void;
  debug(...args: any[]): void;
  assert(assertion?: boolean, ...args: any[]): void;
  clear(): void;
  count(label?: string): void;
  countReset(label?: string): void;
  group(...args: any[]): void;
  groupCollapsed(...args: any[]): void;
  groupEnd(): void;
  profile(name?: string): void;
  profileEnd(name?: string): void;
  table(data?: TableData, columns?: string[]): void;
  time(label?: string): void;
  timeEnd(label?: string): void;
  timeLog(label?: string): void;
  timeStamp(label?: string): void;
  trace(...args: any[]): void;
}

const functions: {[K in Level]: BrowserConsoleFunction<Level>} = {
  error(info) {
    // TODO: implement handling of Error objects
    console.error(info.message, ...info[SPLAT])
  },
  warn(info) {
    console.warn(info.message, ...info[SPLAT])
  },
  info(info) {
    console.info(info.message, ...info[SPLAT])
  },
  debug(info) {
    console.log(info.message, ...info[SPLAT])
  },
  assert(info) {
    if (typeof info.assertion !== "undefined") {
      console.assert(info.assertion, info.message, ...info[SPLAT])
    } else {
      console.assert(info.message, ...info[SPLAT])
    }
  },
  // TODO: figure out if clear is conflicting with winston.Logger#clear
  clear() {
    console.clear()
  },
  count(info) {
    console.count(info.message)
  },
  countReset(info) {
    console.countReset(info.message)
  },
  group(info) {
    console.group(info.message, ...info[SPLAT])
  },
  groupCollapsed(info) {
    console.groupCollapsed(info.message, ...info[SPLAT])
  },
  groupEnd() {
    console.groupEnd()
  },
  // TODO: figure out if profile and profileEnd can be integrated with winston.Logger#profile
  profile(info) {
    console.profile(info.message)
  },
  profileEnd(info) {
    console.profileEnd(info.message)
  },
  table(info) {
    console.table(info.message, ...(info[SPLAT] || []))
  },
  // TODO: figure out if time, timeEnd and timeLog can be integrated with winston.Logger#startTimer
  time(info) {
    console.time(info.message)
  },
  timeEnd(info) {
    console.timeEnd(info.message)
  },
  timeLog(info) {
    console.timeLog(info.message)
  },
  timeStamp(info) {
    console.timeStamp(info.message)
  },
  trace(info) {
    console.trace(info.message, ...info[SPLAT])
  },
}

export default functions
