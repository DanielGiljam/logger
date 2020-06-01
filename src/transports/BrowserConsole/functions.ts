import {SPLAT} from "triple-beam"

import {Level} from "./levels"

import {BrowserConsoleFunction} from "./index"

const functions: {[K in Level]: BrowserConsoleFunction} = {
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
