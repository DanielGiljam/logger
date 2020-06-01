import {Transform} from "stream"

import logform from "logform"
import winston from "winston"
import Transport from "winston-transport"

import {CustomWinstonLogger} from "./winston"

type TableData = {[K in string | number]: any} | any[]

export default class Logger extends Transform {
  silent: boolean
  format: logform.Format
  levels: winston.config.AbstractConfigSetLevels
  level: string
  transports: Transport[]
  exceptions: winston.ExceptionHandler
  profilers: object
  exitOnError: Function | boolean

  // TODO: make proxy redirect to debug
  // NOTE: proxy redirects to debug()
  // log: winston.LogMethod
  add(transport: Transport): CustomWinstonLogger
  remove(transport: Transport): CustomWinstonLogger
  // NOTE: see TODO about clear()
  // clear(): CustomWinstonLogger
  close(): CustomWinstonLogger

  error(...args: any[]): void
  warn(...args: any[]): void
  info(...args: any[]): void
  debug(...args: any[]): void
  assert(assertion: boolean, ...args: any[]): void
  clear(): void
  count(...args: any[]): void
  countReset(...args: any[]): void
  group(...args: any[]): void
  groupCollapsed(...args: any[]): void
  groupEnd(): void
  profile(name?: string): void
  profileEnd(name?: string): void
  table(data: TableData, columns: string[]): void
  time(label?: string): void
  timeEnd(label?: string): void
  timeLog(label?: string): void
  timeStamp(label?: string): void
  trace(...args: any[]): void

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
