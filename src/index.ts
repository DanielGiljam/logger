import winston from "winston"
import Transport from "winston-transport"

import clientSideLoggerHandler from "./clientSideLoggerHandler"
import BrowserConsole from "./transports/BrowserConsole"
import browserConsoleFormat from "./transports/BrowserConsole/format"
import browserConsoleLevels, {
  Level as BrowserConsoleLevels,
} from "./transports/BrowserConsole/levels"
import Logger from "./types/logger"
import {CustomWinstonLogger} from "./types/winston"

interface LoggerOptions {
  level?: Level;
  label?: string;
  serverSideTransports?: Transport | Transport[];
  clientSideTransports?: Transport | Transport[];
  detectEnvironment?: () => "server-side" | "client-side";
}

export type Level = BrowserConsoleLevels

// TODO: figure out how to make library entry point (createLogger) as bare as possible
const createLogger = ({
  level,
  label,
  detectEnvironment,
}: LoggerOptions = {}): Logger => {
  // TODO: implement a default detect environment
  const environment = detectEnvironment?.() || "client-side"
  if (environment === "server-side") {
    return (undefined as unknown) as Logger
  } else {
    return (new Proxy(
      (winston.createLogger({
        level: ((): Level => {
          // TODO: implement function that calculates highest of all levels
          return level || "trace"
        })(),
        levels: {...browserConsoleLevels},
        transports: new BrowserConsole({
          format: winston.format.combine(
            winston.format.label({label}),
            winston.format.timestamp({
              format: "THH:MM:ss.SSS",
              alias: "time",
            }),
            browserConsoleFormat(),
          ),
        }),
      }) as unknown) as CustomWinstonLogger,
      clientSideLoggerHandler,
    ) as unknown) as Logger
  }
}

export default createLogger
