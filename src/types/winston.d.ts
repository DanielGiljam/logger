import {Transform} from "stream"

import logform from "logform"
import winston from "winston"
import Transport from "winston-transport"

export type Info<
  LVL extends string,
  META extends {[key: string]: any} = {[key: string]: any},
  MSG = any
> = {
  level: string;
  message: string;
  LEVEL_SYMBOL: LVL;
  MESSAGE_SYMBOL: MSG;
  SPLAT_SYMBOL: any[];
} & {
  [K in keyof META]: META[K]
}

export class Logger extends Transform {
  silent: boolean
  format: logform.Format
  levels: winston.config.AbstractConfigSetLevels
  level: string
  transports: Transport[]
  exceptions: winston.ExceptionHandler
  profilers: object
  exitOnError: Function | boolean

  log: winston.LogMethod
  add(transport: Transport): Logger
  remove(transport: Transport): Logger
  clear(): Logger
  close(): Logger

  // for browser console levels
  error: winston.LeveledLogMethod
  warn: winston.LeveledLogMethod
  info: winston.LeveledLogMethod
  debug: winston.LeveledLogMethod
  assert: winston.LeveledLogMethod
  count: winston.LeveledLogMethod
  countReset: winston.LeveledLogMethod
  group: winston.LeveledLogMethod
  groupCollapsed: winston.LeveledLogMethod
  groupEnd: winston.LeveledLogMethod
  profile: winston.LeveledLogMethod
  profileEnd: winston.LeveledLogMethod
  table: winston.LeveledLogMethod
  time: winston.LeveledLogMethod
  timeEnd: winston.LeveledLogMethod
  timeLog: winston.LeveledLogMethod
  timeStamp: winston.LeveledLogMethod
  trace: winston.LeveledLogMethod

  query(
    options?: winston.QueryOptions,
    callback?: (err: Error, results: any) => void
  ): any

  stream(options?: any): NodeJS.ReadableStream

  startTimer(): winston.Profiler
  profile(id: string | number, meta?: winston.LogEntry): Logger

  configure(options: winston.LoggerOptions): void

  child(options: Record<string, any>): Logger
}
