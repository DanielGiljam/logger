import {Transform} from "stream"

import logform from "logform"
import winston from "winston"
import Transport from "winston-transport"

export type Info<
  L extends string,
  MS = any,
  ME extends {[key: string]: any} = {[key: string]: any}
> = {
  level: string;
  message: string;
  LEVEL_SYMBOL: L;
  MESSAGE_SYMBOL: MS;
  SPLAT_SYMBOL: any[];
} & {
  [K in keyof ME]: ME[K]
}

export class CustomWinstonLogger extends Transform {
  silent: boolean
  format: logform.Format
  levels: winston.config.AbstractConfigSetLevels
  level: string
  transports: Transport[]
  exceptions: winston.ExceptionHandler
  profilers: object
  exitOnError: Function | boolean

  log: winston.LogMethod
  add(transport: Transport): CustomWinstonLogger
  remove(transport: Transport): CustomWinstonLogger
  // NOTE: see TODO about clear()
  // clear(): CustomWinstonLogger
  close(): CustomWinstonLogger

  // for browser console levels
  error: winston.LeveledLogMethod
  warn: winston.LeveledLogMethod
  info: winston.LeveledLogMethod
  debug: winston.LeveledLogMethod
  assert: winston.LeveledLogMethod
  clear: winston.LeveledLogMethod
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
  // NOTE: see TODO about profile()
  // profile(id: string | number, meta?: winston.LogEntry): CustomWinstonLogger

  configure(options: winston.LoggerOptions): void

  child(options: Record<string, any>): CustomWinstonLogger
}
